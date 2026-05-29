import { motion } from 'framer-motion';
import { Brain, Target, Zap, Sparkles, Check, ArrowRight, Layers, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';
import { MAP_MY_MIND_ORDER, DiscoverMyMindStatus } from '@/hooks/useDiscoverMyMind';
import { cn } from '@/lib/utils';

const stepIcons: Record<AssessmentType, React.ElementType> = {
  'cognitive-profile': Compass,
  iq: Brain,
  neurodivergent: Zap,
  personality: Target,
  depth: Sparkles,
};


interface DiscoverMyMindSpineProps {
  status: DiscoverMyMindStatus;
  onStart: (type: AssessmentType) => void;
  onViewDashboard?: () => void;
}

export const DiscoverMyMindSpine = ({
  status,
  onStart,
  onViewDashboard,
}: DiscoverMyMindSpineProps) => {
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
      className="relative max-w-5xl mx-auto mb-6 sm:mb-8"
    >
      <div className="relative rounded-lg border border-border bg-card p-5 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center flex-shrink-0">
              <Layers className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80 mb-0.5">
                Guided Profile
              </p>
              <h2 className="font-serif text-base sm:text-lg font-medium text-foreground leading-tight">
                {isFinished
                  ? 'Your full profile is ready.'
                  : active
                    ? 'Continue your profile.'
                    : 'Full Cognitive & AI-Readiness Profile'}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-snug mt-1">
                {isFinished
                  ? 'All four modules complete. Open your integrated dashboard.'
                  : active
                    ? `${completedCount} of ${totalSteps} modules complete — continue any time.`
                    : 'Four structured modules. Complete in any order — your profile builds as you go.'}
              </p>
            </div>
          </div>
          {completedCount > 0 && !isFinished && (
            <div className="hidden sm:flex items-center px-3 py-1 rounded-md border border-border bg-background flex-shrink-0">
              <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
                {completedCount} / {totalSteps}
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative h-[3px] bg-border/60 mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-foreground/70"
          />
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
          {MAP_MY_MIND_ORDER.map((type, idx) => {
            const Icon = stepIcons[type];
            const isDone = completed.includes(type);
            const isNext = type === nextStep;
            const info = assessmentInfo[type];

            return (
              <button
                key={type}
                onClick={() => onStart(type)}
                className={cn(
                  'group relative text-left rounded-md border bg-background p-4 transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isDone
                    ? 'border-foreground/30'
                    : isNext
                      ? 'border-foreground/50'
                      : 'border-border hover:border-foreground/30',
                )}
              >
                {/* Step ribbon */}
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  {isDone && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      <Check className="w-3 h-3" strokeWidth={2} />
                      Done
                    </span>
                  )}
                  {isNext && !isDone && (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/70">
                      Next module
                    </span>
                  )}
                  {!isDone && !isNext && (
                    <span className="text-[10px] font-mono text-muted-foreground/50">
                      0{idx + 1}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="w-8 h-8 rounded-md border border-border bg-card flex items-center justify-center mb-3">
                  {isDone ? (
                    <Check className="w-4 h-4 text-foreground/70" strokeWidth={2} />
                  ) : (
                    <Icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-sm font-medium text-foreground leading-tight mb-1">
                  {info.shortTitle}
                </h3>

                {/* Meta */}
                <p className="text-[11px] text-muted-foreground mb-3">
                  {info.questionCount} questions · ~{info.timeMinutes} min
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground/80">
                  {isDone ? 'Review' : isNext ? 'Continue' : 'Begin'}
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            onClick={handlePrimary}
            size="lg"
            className="flex-1 bg-foreground text-background hover:bg-foreground/90 font-medium py-5 sm:py-6"
          >
            {isFinished
              ? 'Open integrated dashboard'
              : active && nextInfo
                ? `Continue: ${nextInfo.shortTitle} (~${nextInfo.timeMinutes} min)`
                : 'Begin the assessment'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          {!isFinished && (
            <p className="text-center sm:text-left text-muted-foreground text-[11px] sm:text-xs sm:max-w-[200px] leading-snug">
              Or select any module above — no required order.
            </p>
          )}
        </div>

        {!isFinished && (
          <p className="text-center text-muted-foreground/70 text-[11px] mt-4 pt-4 border-t border-border/60 leading-relaxed">
            Each module surfaces cognitive style, learning preferences, and potential support needs — not a clinical diagnosis.
          </p>
        )}
      </div>

    </motion.div>
  );
};
