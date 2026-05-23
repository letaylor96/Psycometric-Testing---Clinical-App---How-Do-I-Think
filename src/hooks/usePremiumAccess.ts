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
  // App is 100% free for now — always grant premium access
  const [hasPremiumAccess] = useState<boolean>(true);
  const [isLoading] = useState<boolean>(false);

  const unlockWithCode = useCallback(async (): Promise<boolean> => {
    return true;
  }, []);

  const refreshAccess = useCallback(async () => {
    // No-op — access is always granted
  }, []);

  return {
    hasPremiumAccess,
    isLoading,
    unlockWithCode,
    refreshAccess,
  };
};
