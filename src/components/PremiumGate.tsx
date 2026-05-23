import { useEffect } from 'react';

interface PremiumGateProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked?: () => void;
  feature?: string;
  currentGameState?: string;
  currentAssessmentType?: string;
}

export const PremiumGate = ({ isOpen, onClose, onUnlocked }: PremiumGateProps) => {
  // App is 100% free — auto-unlock and dismiss immediately
  useEffect(() => {
    if (isOpen) {
      onUnlocked?.();
      onClose();
    }
  }, [isOpen, onClose, onUnlocked]);

  return null;
};
