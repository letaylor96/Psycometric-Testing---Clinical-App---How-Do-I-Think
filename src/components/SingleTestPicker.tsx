import { motion } from 'framer-motion';
import { Brain, Target, Zap, Sparkles, Activity, Puzzle, ArrowRight, Compass } from 'lucide-react';
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
  note?: string;
}

const OPTIONS: TestOption[] = [
  {
    key: 'cognitive-profile',
    title: 'Cognitive Profile',
    blurb: 'Structured profile of how you think, learn, communicate, and adapt to AI-enabled work.',
    meta: '40 questions · ~12 min',
    icon: Compass,
    note: 'Grounded in Kolb, Sternberg, KAI, MSTAT-II, and TRI 2.0.',
  },
  {
    key: 'personality',
    title: 'Personality Profile',
    blurb: 'Big Five (OCEAN) trait inventory with MBTI archetype mapping.',
    meta: '30 questions · ~15 min',
    icon: Target,
  },
  {
    key: 'neurodivergent',
    title: 'Cognitive Style & Attention',
    blurb: 'Self-report inventory mapping thinking style and attention patterns.',
    meta: '38 questions · ~19 min',
    icon: Zap,
  },
  {
    key: 'adhd',
    title: 'Attention & Focus Patterns',
    blurb: 'A structured self-report inventory of adult attention and focus patterns.',
    meta: '18 questions · ~9 min',
    icon: Activity,
    note: 'WHO ASRS-v1.1 (Part A + Part B). Self-report, not a diagnosis.',
  },
  {
    key: 'autism',
    title: 'Social & Sensory Processing Patterns',
    blurb: 'A reflection module across five domains of social and sensory processing.',
    meta: '50 questions · ~25 min',
    icon: Puzzle,
    note: 'Based on the AQ-50 inventory (Baron-Cohen et al.). Self-report, not a diagnosis.',
  },
  {
    key: 'depth',
    title: 'Depth-Psychology Reflection',
    blurb: 'Free-form reflection module analysed through Freudian, Jungian, and Nietzschean lenses.',
    meta: '24 prompts · ~20 min',
    icon: Sparkles,
  },
  {
    key: 'iq',
    title: 'Cognitive Reasoning',
    blurb: 'Pattern recognition and abstract reasoning module.',
    meta: '25 questions · ~13 min',
    icon: Brain,
  },
];

export const SingleTestPicker = ({ onSelectTest }: SingleTestPickerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 }}
      className="relative max-w-5xl mx-auto mb-6 sm:mb-8"
    >
      <div className="relative rounded-2xl border border-navy-deep/10 bg-cream-warm/40 dark:bg-card/40 p-5 sm:p-7">
        {/* Divider with label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-navy-deep/10" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-teal font-medium">
            Or take a single module
          </span>
          <div className="h-px flex-1 bg-navy-deep/10" />
        </div>

        <div className="text-center mb-6">
          <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground leading-tight">
            Focus on one lens at a time.
          </h3>
          <p className="text-ink-muted text-xs sm:text-sm mt-1.5">
            Each module stands on its own and contributes to your overall profile when you continue.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.key}
                onClick={() => onSelectTest(opt.key)}
                className={cn(
                  'group relative text-left rounded-xl border border-navy-deep/10 bg-card p-4 transition-all duration-200',
                  'hover:border-teal/40 hover:shadow-md hover:-translate-y-0.5',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg border border-teal/20 bg-cream-warm flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-teal" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-sm font-medium text-foreground leading-tight">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-ink-muted mt-0.5">{opt.meta}</p>
                  </div>
                </div>

                <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                  {opt.blurb}
                </p>

                {opt.note && (
                  <p className="text-[10px] text-ink-muted/70 italic mt-2 leading-relaxed">
                    {opt.note}
                  </p>
                )}

                <span className="inline-flex items-center gap-1 text-[11px] font-medium mt-3 text-teal">
                  Begin module
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
