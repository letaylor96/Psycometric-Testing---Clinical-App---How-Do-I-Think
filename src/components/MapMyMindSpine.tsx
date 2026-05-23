import { motion } from 'framer-motion';
import { Brain, Target, Zap, Sparkles, Check, ArrowRight, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';
import { MAP_MY_MIND_ORDER, MapMyMindStatus } from '@/hooks/useMapMyMind';
import { cn } from '@/lib/utils';

const stepIcons: Record<AssessmentType, React.ElementType> = {
  iq: Brain,
  neurodivergent: Zap,
  personality: Target,
  depth: Sparkles,
};

const stepAccent: Record<AssessmentType, string> = {
  iq: 'text-blue-400',
  neurodivergent: 'text-emerald-400',
  personality: 'text-amber-400',
  depth: 'text-purple-400',
};

interface MapMyMindSpineProps {
  status: MapMyMindStatus;
  onStart: (type: AssessmentType) => void;
  onViewDashboard?: () => void;
}

export const MapMyMindSpine = ({
  status,
  onStart,
  onViewDashboard,
}: MapMyMindSpineProps) => {
  const { active, completed, nextStep, completedCount, totalSteps, isFinished, start } = status;

  const handlePrimary = () => {
    if (isFinished) {
      onViewDashboard?.();
      return;
    }
    if (!active) {
      const first = start();
      onStart(first);
    } else if (nextStep) {
      onStart(nextStep);
    }
  };

  const pct = (completedCount / totalSteps) * 100;
  const nextInfo = nextStep ? assessmentInfo[nextStep] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative max-w-3xl mx-auto mb-6 sm:mb-8"
    >
      <div className="relative overflow-hidden rounded-2xl border border-yellow/30 bg-gradient-to-br from-yellow/[0.08] via-card to-card p-5 sm:p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow/15 border border-yellow/30 flex items-center justify-center flex-shrink-0">
              <Map className="w-4 h-4 sm:w-5 sm:h-5 text-yellow" />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif text-base sm:text-lg font-semibold text-foreground leading-tight">
                {isFinished
                  ? 'Your Full Profile is Ready'
                  : active
                    ? 'Continue Mapping Your Mind'
                    : 'Map My Mind — Full Guided Profile'}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-snug mt-0.5">
                {isFinished
                  ? 'All 4 assessments complete. Open your integrated dashboard.'
                  : active
                    ? `${completedCount} of ${totalSteps} done · ~${totalSteps - completedCount * 1} steps left`
                    : 'IQ → Neurodivergence → Personality → Unconscious. ~45 min total, resume anytime.'}
              </p>
            </div>
          </div>
        </div>

        {/* Step spine */}
        <div className="relative mb-4">
          <div className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 bg-border" />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-4 sm:top-5 left-0 h-0.5 bg-yellow"
          />
          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            {MAP_MY_MIND_ORDER.map((type, idx) => {
              const Icon = stepIcons[type];
              const isDone = completed.includes(type);
              const isNext = type === nextStep;
              const info = assessmentInfo[type];

              return (
                <button
                  key={type}
                  onClick={() => onStart(type)}
                  className="group flex flex-col items-center gap-1.5 sm:gap-2 text-center"
                >
                  <div
                    className={cn(
                      'relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all',
                      isDone
                        ? 'bg-yellow border-yellow text-background'
                        : isNext
                          ? 'bg-card border-yellow ring-4 ring-yellow/20 text-yellow'
                          : 'bg-card border-border text-muted-foreground group-hover:border-yellow/50',
                    )}
                  >
                    {isDone ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                    ) : (
                      <Icon className={cn('w-3.5 h-3.5 sm:w-4 sm:h-4', !isNext && stepAccent[type])} />
                    )}
                    {isNext && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow animate-pulse" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] sm:text-xs font-medium leading-tight max-w-[80px]',
                      isDone || isNext ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {info.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={handlePrimary}
          size="lg"
          className="w-full bg-yellow hover:bg-yellow/90 text-yellow-foreground font-semibold py-5 sm:py-6"
        >
          {isFinished
            ? 'Open Integrated Dashboard'
            : active && nextInfo
              ? `Continue: ${nextInfo.shortTitle} (${nextInfo.timeMinutes} min)`
              : 'Start Your Full Map'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {!isFinished && (
          <p className="text-center text-muted-foreground/60 text-[11px] mt-2">
            Each step tags ADHD, autism-spectrum, gifted, and defense indicators across your profile
          </p>
        )}
      </div>
    </motion.div>
  );
};
