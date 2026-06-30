import { motion } from 'framer-motion';
import { Brain, Target, Zap, Sparkles, Activity, Puzzle, ArrowRight, Compass } from 'lucide-react';
import { SelectableTestKey } from '@/data/assessmentTypes';
import { cn } from '@/lib/utils';

interface SingleTestPickerProps {
  onSelectTest: (key: SelectableTestKey) => void;
}

type Accent = 'teal' | 'gold' | 'navy' | 'plum' | 'sage' | 'amber' | 'rose';

interface TestOption {
  key: SelectableTestKey;
  title: string;
  blurb: string;
  meta: string;
  icon: React.ElementType;
  note?: string;
  accent: Accent;
  tag: string;
}

const OPTIONS: TestOption[] = [
  {
    key: 'cognitive-profile',
    title: 'Cognitive Profile',
    blurb: 'How you think, learn, communicate, and adapt to AI-enabled work.',
    meta: '40 questions · ~12 min',
    icon: Compass,
    note: 'Grounded in Kolb, Sternberg, KAI, MSTAT-II, and TRI 2.0.',
    accent: 'teal',
    tag: 'Flagship',
  },
  {
    key: 'personality',
    title: 'Personality Profile',
    blurb: 'Big Five (OCEAN) trait inventory with MBTI archetype mapping.',
    meta: '30 questions · ~15 min',
    icon: Target,
    accent: 'gold',
    tag: 'Most popular',
  },
  {
    key: 'neurodivergent',
    title: 'Cognitive Style & Attention',
    blurb: 'Self-report inventory mapping thinking style and attention patterns.',
    meta: '38 questions · ~19 min',
    icon: Zap,
    accent: 'plum',
    tag: 'In-depth',
  },
  {
    key: 'adhd',
    title: 'Attention & Focus Patterns',
    blurb: 'Structured self-report of adult attention and focus patterns.',
    meta: '18 questions · ~9 min',
    icon: Activity,
    note: 'WHO ASRS-v1.1 (Part A + Part B). Self-report, not a diagnosis.',
    accent: 'amber',
    tag: 'Quick',
  },
  {
    key: 'autism',
    title: 'Social & Sensory Processing',
    blurb: 'Reflection module across five domains of social and sensory processing.',
    meta: '50 questions · ~25 min',
    icon: Puzzle,
    note: 'Based on the AQ-50 inventory (Baron-Cohen et al.). Self-report, not a diagnosis.',
    accent: 'sage',
    tag: 'Comprehensive',
  },
  {
    key: 'depth',
    title: 'Depth-Psychology Reflection',
    blurb: 'Free-form reflection analysed through Freudian, Jungian, and Nietzschean lenses.',
    meta: '24 prompts · ~20 min',
    icon: Sparkles,
    accent: 'rose',
    tag: 'Reflective',
  },
  {
    key: 'iq',
    title: 'Cognitive Reasoning',
    blurb: 'Pattern recognition and abstract reasoning module.',
    meta: '25 questions · ~13 min',
    icon: Brain,
    accent: 'navy',
    tag: 'Timed',
  },
];

const ACCENT_STYLES: Record<Accent, { bar: string; icon: string; iconBg: string; tag: string; hoverBorder: string; glow: string }> = {
  teal:  { bar: 'from-teal to-teal/40',         icon: 'text-teal',          iconBg: 'bg-teal/10 border-teal/30',        tag: 'bg-teal/10 text-teal border-teal/20',           hoverBorder: 'group-hover:border-teal/50',         glow: 'group-hover:shadow-[0_12px_40px_-12px_hsl(var(--teal)/0.35)]' },
  gold:  { bar: 'from-gold to-gold/40',         icon: 'text-gold',          iconBg: 'bg-gold/10 border-gold/30',        tag: 'bg-gold/15 text-gold-dark border-gold/30',      hoverBorder: 'group-hover:border-gold/60',         glow: 'group-hover:shadow-[0_12px_40px_-12px_hsl(var(--gold)/0.4)]' },
  navy:  { bar: 'from-navy-deep to-navy-deep/40', icon: 'text-navy-deep',   iconBg: 'bg-navy-deep/8 border-navy-deep/25', tag: 'bg-navy-deep/10 text-navy-deep border-navy-deep/20', hoverBorder: 'group-hover:border-navy-deep/40', glow: 'group-hover:shadow-[0_12px_40px_-12px_hsl(var(--navy-deep)/0.35)]' },
  plum:  { bar: 'from-purple-700 to-purple-400',icon: 'text-purple-700',    iconBg: 'bg-purple-700/10 border-purple-700/25', tag: 'bg-purple-700/10 text-purple-800 border-purple-700/20', hoverBorder: 'group-hover:border-purple-700/40', glow: 'group-hover:shadow-[0_12px_40px_-12px_rgb(126_34_206/0.3)]' },
  sage:  { bar: 'from-emerald-600 to-emerald-400', icon: 'text-emerald-700', iconBg: 'bg-emerald-600/10 border-emerald-600/25', tag: 'bg-emerald-600/10 text-emerald-800 border-emerald-600/20', hoverBorder: 'group-hover:border-emerald-600/40', glow: 'group-hover:shadow-[0_12px_40px_-12px_rgb(5_150_105/0.3)]' },
  amber: { bar: 'from-amber-500 to-amber-300',  icon: 'text-amber-700',     iconBg: 'bg-amber-500/10 border-amber-500/30', tag: 'bg-amber-500/15 text-amber-800 border-amber-500/30', hoverBorder: 'group-hover:border-amber-500/50', glow: 'group-hover:shadow-[0_12px_40px_-12px_rgb(245_158_11/0.35)]' },
  rose:  { bar: 'from-rose-500 to-rose-300',    icon: 'text-rose-700',      iconBg: 'bg-rose-500/10 border-rose-500/25', tag: 'bg-rose-500/10 text-rose-800 border-rose-500/20', hoverBorder: 'group-hover:border-rose-500/40', glow: 'group-hover:shadow-[0_12px_40px_-12px_rgb(244_63_94/0.3)]' },
};

export const SingleTestPicker = ({ onSelectTest }: SingleTestPickerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 }}
      className="relative max-w-6xl mx-auto mb-6 sm:mb-8"
    >
      <div className="relative rounded-2xl border border-navy-deep/10 bg-cream-warm/40 dark:bg-card/40 p-4 sm:p-7">
        <p className="text-center text-ink-muted text-xs sm:text-sm mb-5">
          {OPTIONS.length} tests · click any card to begin
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">
          {OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            const a = ACCENT_STYLES[opt.accent];
            return (
              <motion.button
                key={opt.key}
                onClick={() => onSelectTest(opt.key)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.04 * i }}
                className={cn(
                  'group relative h-full flex flex-col text-left overflow-hidden',
                  'rounded-2xl border border-navy-deep/10 bg-card',
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-1',
                  a.hoverBorder,
                  a.glow,
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
              >
                {/* Accent bar */}
                <div className={cn('h-1 w-full bg-gradient-to-r', a.bar)} />

                <div className="flex flex-col flex-1 p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={cn('w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110', a.iconBg)}>
                      <Icon className={cn('w-5 h-5', a.icon)} strokeWidth={1.75} />
                    </div>
                    <span className={cn('text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full border', a.tag)}>
                      {opt.tag}
                    </span>
                  </div>

                  {/* Title + meta */}
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-foreground leading-tight">
                    {opt.title}
                  </h4>
                  <p className="text-[11px] text-ink-muted mt-1 font-medium">{opt.meta}</p>

                  {/* Blurb */}
                  <p className="text-sm text-ink-muted mt-3 leading-relaxed">
                    {opt.blurb}
                  </p>

                  {opt.note && (
                    <p className="text-[10px] text-ink-muted/70 italic mt-2 leading-relaxed">
                      {opt.note}
                    </p>
                  )}

                  {/* CTA pinned to bottom */}
                  <div className="mt-auto pt-4">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all',
                      a.tag,
                      'group-hover:gap-2.5',
                    )}>
                      Begin module
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
