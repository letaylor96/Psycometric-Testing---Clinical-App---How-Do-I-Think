import { motion } from 'framer-motion';
import { Brain, Target, Zap, Sparkles, Check, ArrowRight, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';
import { MAP_MY_MIND_ORDER, DiscoverMyMindStatus } from '@/hooks/useDiscoverMyMind';
import { cn } from '@/lib/utils';

const stepIcons: Record<AssessmentType, React.ElementType> = {
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
      <div className="relative overflow-hidden rounded-2xl border border-yellow/30 bg-gradient-to-br from-yellow/[0.08] via-card to-card p-5 sm:p-7 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yellow/15 border border-yellow/30 flex items-center justify-center flex-shrink-0">
              <Map className="w-5 h-5 text-yellow" />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif text-base sm:text-lg font-semibold text-foreground leading-tight">
                {isFinished
                  ? 'Your Full Profile is Ready'
                  : active
                    ? 'Continue Mapping Your Mind'
                    : 'Discover My Mind — Full Guided Profile'}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm leading-snug mt-0.5">
                {isFinished
                  ? 'All 4 assessments complete. Open your integrated dashboard.'
                  : active
                    ? `${completedCount} of ${totalSteps} done · pick any step to continue`
                    : 'Four assessments. Start and Resume Anytime — take them in order or jump straight to whichever interests you.'}
              </p>
            </div>
          </div>
          {completedCount > 0 && !isFinished && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow/10 border border-yellow/30 flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse" />
              <span className="text-xs font-medium text-yellow">{completedCount}/{totalSteps}</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative h-1 rounded-full bg-border/50 mb-5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow/80 to-yellow rounded-full"
          />
        </div>

        {/* Step cards — each is independently clickable */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          {MAP_MY_MIND_ORDER.map((type, idx) => {
            const Icon = stepIcons[type];
            const isDone = completed.includes(type);
            const isNext = type === nextStep;
            const info = assessmentInfo[type];
            const theme = stepTheme[type];

            return (
              <motion.button
                key={type}
                onClick={() => onStart(type)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'group relative text-left rounded-xl border bg-card/60 p-3.5 sm:p-4 transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isDone
                    ? 'border-emerald-500/40 bg-emerald-500/[0.04]'
                    : isNext
                      ? cn('border-yellow/50 ring-2 ring-offset-2 ring-offset-background', theme.ring)
                      : cn(theme.border, theme.hoverBorder),
                )}
              >
                {/* Step number ribbon */}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {isDone && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold">
                      <Check className="w-3 h-3" strokeWidth={3} />
                      Done
                    </span>
                  )}
                  {isNext && !isDone && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-yellow/15 text-yellow text-[10px] font-semibold">
                      <span className="w-1 h-1 rounded-full bg-yellow animate-pulse" />
                      Up next
                    </span>
                  )}
                  {!isDone && !isNext && (
                    <span className="text-[10px] font-mono text-muted-foreground/50">
                      0{idx + 1}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div
                  className={cn(
                    'w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2.5 transition-colors',
                    isDone ? 'bg-emerald-500/15' : theme.iconBg,
                  )}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" strokeWidth={2.5} />
                  ) : (
                    <Icon className={cn('w-4 h-4 sm:w-5 sm:h-5', theme.text)} />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif text-sm font-semibold text-foreground leading-tight mb-1">
                  {info.shortTitle}
                </h3>

                {/* Meta */}
                <p className="text-[11px] text-muted-foreground mb-2.5">
                  {info.questionCount} questions · ~{info.timeMinutes} min
                </p>

                {/* Hover CTA */}
                <span
                  className={cn(
                    'inline-flex items-center gap-1 text-[11px] font-medium transition-all',
                    isDone
                      ? 'text-emerald-400/80'
                      : isNext
                        ? 'text-yellow'
                        : cn(theme.text, 'opacity-70 group-hover:opacity-100'),
                  )}
                >
                  {isDone ? 'Review' : isNext ? 'Continue' : 'Start'}
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* CTA bar — primary action + helper text */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <Button
            onClick={handlePrimary}
            size="lg"
            className="flex-1 bg-yellow hover:bg-yellow/90 text-yellow-foreground font-semibold py-5 sm:py-6"
          >
            {isFinished
              ? 'Open Integrated Dashboard'
              : active && nextInfo
                ? `Continue: ${nextInfo.shortTitle} (~${nextInfo.timeMinutes} min)`
                : 'Start the Full Guided Map'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          {!isFinished && (
            <p className="text-center sm:text-left text-muted-foreground/70 text-[11px] sm:text-xs sm:max-w-[200px] leading-snug">
              Or tap any step above to start there — no order required
            </p>
          )}
        </div>

        {!isFinished && (
          <p className="text-center text-muted-foreground/50 text-[11px] mt-3 pt-3 border-t border-border/30">
            Each step tags ADHD, autism-spectrum, gifted, and defense indicators across your profile
          </p>
        )}
      </div>
    </motion.div>
  );
};
