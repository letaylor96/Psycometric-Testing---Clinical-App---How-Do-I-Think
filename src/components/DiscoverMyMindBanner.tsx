import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';
import { DiscoverMyMindStatus } from '@/hooks/useDiscoverMyMind';

interface DiscoverMyMindBannerProps {
  status: DiscoverMyMindStatus;
  onContinue: (next: AssessmentType) => void;
  onViewDashboard?: () => void;
  onDismiss?: () => void;
}

/**
 * Sticky bottom banner shown on result screens when the guided
 * "Discover My Mind" funnel is active. Surfaces the next step so users
 * don't have to navigate back to the landing page.
 */
export const DiscoverMyMindBanner = ({
  status,
  onContinue,
  onViewDashboard,
  onDismiss,
}: DiscoverMyMindBannerProps) => {
  if (!status.active) return null;

  const { nextStep, completedCount, totalSteps, isFinished } = status;
  const nextInfo = nextStep ? assessmentInfo[nextStep] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] sm:w-auto sm:max-w-2xl"
      >
        <div className="relative flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border border-yellow/40 bg-card/95 backdrop-blur-md shadow-2xl shadow-yellow/10">
          <div className="hidden sm:flex w-9 h-9 rounded-full bg-yellow/15 border border-yellow/30 items-center justify-center flex-shrink-0">
            <Map className="w-4 h-4 text-yellow" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-yellow text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                Discover My Mind
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < completedCount ? 'bg-yellow' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-[10px] sm:text-xs">
                {completedCount}/{totalSteps}
              </span>
            </div>
            <p className="text-foreground text-xs sm:text-sm font-medium leading-tight truncate">
              {isFinished
                ? 'Profile complete — view your integrated dashboard'
                : `Next: ${nextInfo?.shortTitle} · ~${nextInfo?.timeMinutes} min`}
            </p>
          </div>

          {isFinished ? (
            <Button
              onClick={onViewDashboard}
              size="sm"
              className="bg-yellow hover:bg-yellow/90 text-yellow-foreground font-semibold flex-shrink-0"
            >
              <Check className="w-3.5 h-3.5 mr-1.5" />
              Dashboard
            </Button>
          ) : (
            nextStep && (
              <Button
                onClick={() => onContinue(nextStep)}
                size="sm"
                className="bg-yellow hover:bg-yellow/90 text-yellow-foreground font-semibold flex-shrink-0"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            )
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              aria-label="Dismiss Discover My Mind"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
