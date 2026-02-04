import { useState } from 'react';
import { Save, Check, Crown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSavedAssessments, AssessmentTypeKey, SaveAssessmentParams } from '@/hooks/useSavedAssessments';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from '@/components/PremiumGate';
import { useAuth } from '@/contexts/AuthContext';
import { Json } from '@/integrations/supabase/types';
import { AnalysisFramework } from '@/data/depthPsychologyQuestions';

interface SaveAssessmentButtonProps {
  assessmentType: AssessmentTypeKey;
  answers: unknown;
  results: unknown;
  framework?: AnalysisFramework;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SaveAssessmentButton({
  assessmentType,
  answers,
  results,
  framework,
  className = '',
  variant = 'outline',
  size = 'default',
}: SaveAssessmentButtonProps) {
  const { user } = useAuth();
  const { saveAssessment, isSaving } = useSavedAssessments();
  const { hasPremiumAccess } = usePremiumAccess();
  const [showDialog, setShowDialog] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    if (!user) {
      // Could navigate to auth, for now just show premium gate
      setShowPremiumGate(true);
      return;
    }
    
    if (!hasPremiumAccess) {
      setShowPremiumGate(true);
      return;
    }

    setShowDialog(true);
  };

  const handleSave = async () => {
    const params: SaveAssessmentParams = {
      type: assessmentType,
      name: name.trim() || undefined,
      answers: answers as Json,
      results: results as Json,
      framework,
    };

    const result = await saveAssessment(params);
    
    if (result) {
      setSaved(true);
      setShowDialog(false);
      setName('');
      
      // Reset saved indicator after 3 seconds
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (saved) {
    return (
      <Button
        variant="outline"
        size={size}
        className={`gap-2 text-emerald-500 border-emerald-500/30 ${className}`}
        disabled
      >
        <Check className="w-4 h-4" />
        Saved
      </Button>
    );
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        onClick={handleClick}
        disabled={isSaving}
      >
        {isSaving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        Save Results
        {!hasPremiumAccess && <Crown className="w-3 h-3 ml-1 text-amber-400" />}
      </Button>

      {/* Name dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Assessment Results</DialogTitle>
            <DialogDescription>
              Give this assessment a name to easily find it later, or leave blank for auto-naming.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Pre-therapy baseline, Career exploration..."
              className="w-full"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Premium gate */}
      <PremiumGate
        isOpen={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onUnlocked={() => {
          setShowPremiumGate(false);
          setShowDialog(true);
        }}
        feature="Save Assessment Results"
        currentGameState="dashboard"
      />
    </>
  );
}
