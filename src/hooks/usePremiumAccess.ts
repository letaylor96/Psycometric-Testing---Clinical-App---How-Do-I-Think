import { useState, useEffect, useCallback } from 'react';

const PROMO_CODE = 'LHT';
const STORAGE_KEY = 'premiumAccess';

export interface PremiumAccessState {
  hasPremiumAccess: boolean;
  isLoading: boolean;
  unlockWithCode: (code: string) => boolean;
  resetAccess: () => void;
}

export const usePremiumAccess = (): PremiumAccessState => {
  const [hasPremiumAccess, setHasPremiumAccess] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync with localStorage changes (e.g., other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setHasPremiumAccess(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const unlockWithCode = useCallback((code: string): boolean => {
    if (code.toUpperCase() === PROMO_CODE) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setHasPremiumAccess(true);
      return true;
    }
    return false;
  }, []);

  const resetAccess = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasPremiumAccess(false);
  }, []);

  return {
    hasPremiumAccess,
    isLoading,
    unlockWithCode,
    resetAccess,
  };
};
