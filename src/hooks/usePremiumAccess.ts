import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const CACHE_KEY = 'premiumAccessCache';
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

interface CacheData {
  hasPremiumAccess: boolean;
  timestamp: number;
}

export interface PremiumAccessState {
  hasPremiumAccess: boolean;
  isLoading: boolean;
  unlockWithCode: (code: string) => Promise<boolean>;
  refreshAccess: () => Promise<void>;
}

const getCache = (): CacheData | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const data = JSON.parse(cached) as CacheData;
    // Check if cache is still valid
    if (Date.now() - data.timestamp < CACHE_TTL_MS) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
};

const setCache = (hasPremiumAccess: boolean) => {
  try {
    const data: CacheData = {
      hasPremiumAccess,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore cache errors
  }
};

const clearCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore cache errors
  }
};

export const usePremiumAccess = (): PremiumAccessState => {
  const { user, session } = useAuth();
  const [hasPremiumAccess, setHasPremiumAccess] = useState<boolean>(() => {
    // Use cached value for initial render to prevent flicker
    const cached = getCache();
    return cached?.hasPremiumAccess ?? false;
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkPremiumAccess = useCallback(async () => {
    if (!user || !session) {
      setHasPremiumAccess(false);
      clearCache();
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-premium-access');
      
      if (error) {
        console.error('Error checking premium access:', error);
        setIsLoading(false);
        return;
      }

      const hasAccess = data?.hasPremiumAccess === true;
      setHasPremiumAccess(hasAccess);
      setCache(hasAccess);
    } catch (err) {
      console.error('Failed to check premium access:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, session]);

  // Check premium access on mount and when user changes
  useEffect(() => {
    checkPremiumAccess();
  }, [checkPremiumAccess]);

  // Periodically refresh (every minute)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      checkPremiumAccess();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [user, checkPremiumAccess]);

  const unlockWithCode = useCallback(async (code: string): Promise<boolean> => {
    if (!user || !session) {
      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke('check-premium-access', {
        body: { promoCode: code },
      });

      if (error) {
        console.error('Error applying promo code:', error);
        return false;
      }

      if (data?.promoCodeApplied && data?.hasPremiumAccess) {
        setHasPremiumAccess(true);
        setCache(true);
        return true;
      }

      return false;
    } catch (err) {
      console.error('Failed to apply promo code:', err);
      return false;
    }
  }, [user, session]);

  const refreshAccess = useCallback(async () => {
    clearCache();
    setIsLoading(true);
    await checkPremiumAccess();
  }, [checkPremiumAccess]);

  return {
    hasPremiumAccess,
    isLoading,
    unlockWithCode,
    refreshAccess,
  };
};
