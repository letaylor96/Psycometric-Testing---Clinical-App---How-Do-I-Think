import { motion } from 'framer-motion';
import { Brain, Target, Zap, Sparkles, Activity, Puzzle, ArrowRight } from 'lucide-react';
import { SelectableTestKey } from '@/data/assessmentTypes';
import { cn } from '@/lib/utils';

interface SingleTestPickerProps {
  onSelectTest: (key: SelectableTestKey) => void;
}

interface TestOption {
  key: SelectableTestKey;
  title: string;
  blurb: string;
  meta: string;
  icon: React.ElementType;
  text: string;
  iconBg: string;
  border: string;
  hoverBorder: string;
  note?: string;
}

const OPTIONS: TestOption[] = [
  {
    key: 'iq',

    title: 'IQ',
    blurb: 'Mensa-style pattern recognition and abstract reasoning.',
    meta: '25 questions · ~13 min',
    icon: Brain,
    text: 'text-blue-400',
    iconBg: 'bg-blue-500/15',
    border: 'border-blue-500/25',
    hoverBorder: 'hover:border-blue-500/60',
  },
  {
    key: 'neurodivergent',

    title: 'Neurodivergence Level',
    blurb: 'Cognitive style + attention screening across the full spectrum.',
    meta: '38 questions · ~19 min',
    icon: Zap,
    text: 'text-emerald-400',
    iconBg: 'bg-emerald-500/15',
    border: 'border-emerald-500/25',
    hoverBorder: 'hover:border-emerald-500/60',
  },
  {
    key: 'personality',

    title: 'Personality Type',
    blurb: 'Big Five + MBTI archetype and trait breakdown.',
    meta: '30 questions · ~15 min',
    icon: Target,
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/15',
    border: 'border-amber-500/25',
    hoverBorder: 'hover:border-amber-500/60',
  },
  {
    key: 'adhd',

    title: 'ADHD Evaluation',
    blurb: 'WHO ASRS-v1.1 screening — the standard 18-item adult ADHD self-report scale.',
    meta: '18 questions · ~9 min',
    icon: Activity,
    text: 'text-rose-400',
    iconBg: 'bg-rose-500/15',
    border: 'border-rose-500/25',
    hoverBorder: 'hover:border-rose-500/60',
    note: 'Standalone WHO ASRS-v1.1 (Part A + Part B)',
  },
  {
    key: 'autism',
    title: 'Autism Spectrum Evaluation',
    blurb: 'AQ-50 by Baron-Cohen et al. — 5 subscales mapping the autism spectrum.',
    meta: '50 questions · ~25 min',
    icon: Puzzle,
    text: 'text-cyan-400',
    iconBg: 'bg-cyan-500/15',
    border: 'border-cyan-500/25',
    hoverBorder: 'hover:border-cyan-500/60',
    note: 'Standalone AQ-50 with subscale breakdown',
  },
  {
    key: 'depth',

    title: 'Psychoanalytical Insights',
    blurb: 'Freud · Jung · Nietzsche lenses with AI-powered analysis.',
    meta: '24 questions · ~20 min',
    icon: Sparkles,
    text: 'text-purple-400',
    iconBg: 'bg-purple-500/15',
    border: 'border-purple-500/25',
    hoverBorder: 'hover:border-purple-500/60',
  },
];

export const SingleTestPicker = ({ onSelectTest }: SingleTestPickerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="relative max-w-5xl mx-auto mb-6 sm:mb-8"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 sm:p-7">
        {/* Divider with label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
            Or just pick a single test
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <div className="text-center mb-5 sm:mb-6">
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground leading-tight">
            Take One Test on Its Own
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Prefer a specific lens? Jump straight into any single evaluation — no full profile required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <motion.button
                key={opt.key}
                onClick={() => onSelectTest(opt.key)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'group relative text-left rounded-xl border bg-card/60 p-3.5 sm:p-4 transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  opt.border,
                  opt.hoverBorder,
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      opt.iconBg,
                    )}
                  >
                    <Icon className={cn('w-4 h-4 sm:w-5 sm:h-5', opt.text)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-sm font-semibold text-foreground leading-tight">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{opt.meta}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground/90 mt-2.5 leading-snug">
                  {opt.blurb}
                </p>

                {opt.note && (
                  <p className="text-[10px] text-muted-foreground/60 italic mt-1.5">
                    {opt.note}
                  </p>
                )}

                <span
                  className={cn(
                    'inline-flex items-center gap-1 text-[11px] font-medium mt-2.5 transition-all',
                    opt.text,
                    'opacity-70 group-hover:opacity-100',
                  )}
                >
                  Start
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
