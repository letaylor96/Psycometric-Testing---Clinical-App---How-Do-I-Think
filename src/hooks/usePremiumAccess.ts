import { useState, useCallback } from 'react';

export interface PremiumAccessState {
  hasPremiumAccess: boolean;
  isLoading: boolean;
  unlockWithCode: (code: string) => Promise<boolean>;
  refreshAccess: () => Promise<void>;
}

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
