import { motion } from 'framer-motion';
import { AQResults, aqDomainLabels, aqDomainDescriptions, AQDomain } from '@/data/autismQuestions';
import { Button } from '@/components/ui/button';
import { RotateCcw, LayoutDashboard, Puzzle, AlertTriangle, Sparkles, ShieldCheck, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutismResultsScreenProps {
  results: AQResults;
  onRestart: () => void;
  onViewDashboard?: () => void;
}

const likelihoodConfig = {
  low: {
    label: 'Low autistic-trait profile',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    Icon: ShieldCheck,
  },
  moderate: {
    label: 'Broader autism phenotype',
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    Icon: Info,
  },
  elevated: {
    label: 'Clinical cutoff met (32+)',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    Icon: AlertTriangle,
  },
  high: {
    label: 'Strong autistic-trait profile (36+)',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    Icon: Sparkles,
  },
} as const;

export const AutismResultsScreen = ({ results, onRestart, onViewDashboard }: AutismResultsScreenProps) => {
  const cfg = likelihoodConfig[results.likelihood];
  const Icon = cfg.Icon;
  const domains = Object.keys(results.domainScores) as AQDomain[];

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium mb-4">
            <Puzzle className="w-3.5 h-3.5" />
            AQ-50 · Baron-Cohen et al. (2001)
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Your Autism Spectrum Profile
          </h1>
          <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full border', cfg.bg, cfg.border)}>
            <Icon className={cn('w-4 h-4', cfg.color)} />
            <span className={cn('text-sm font-semibold', cfg.color)}>{cfg.label}</span>
          </div>
        </motion.div>

        {/* Total score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-6 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">AQ-50 Total Score</p>
          <div className="flex items-end justify-center gap-2 mb-4">
            <span className="font-serif text-6xl sm:text-7xl font-bold text-foreground">{results.totalScore}</span>
            <span className="text-muted-foreground text-lg mb-2">/ {results.maxScore}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4 max-w-md mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(results.totalScore / results.maxScore) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-primary"
            />
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className={cn(results.screeningMet ? 'text-foreground font-medium' : '')}>
              Screening threshold: 26+
            </span>
            <span>·</span>
            <span className={cn(results.cutoffMet ? 'text-amber-500 font-medium' : '')}>
              Clinical cutoff: 32+
            </span>
          </div>
        </motion.div>

        {/* Interpretation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border bg-card p-6 mb-6"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground mb-3">What this means</h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{results.interpretation}</p>
        </motion.div>

        {/* Subscale breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 mb-6"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground mb-1">Five-Subscale Breakdown</h2>
          <p className="text-xs text-muted-foreground mb-5">Each subscale has 10 items. Higher scores indicate stronger autistic-trait signal in that domain.</p>
          <div className="space-y-4">
            {domains.map((d) => {
              const s = results.domainScores[d];
              return (
                <div key={d}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-foreground text-sm">{aqDomainLabels[d]}</span>
                    <span className="text-xs font-mono text-muted-foreground">{s.score} / {s.max}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.percent}%` }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className={cn(
                        'h-full rounded-full',
                        s.percent >= 70 ? 'bg-violet-500' : s.percent >= 50 ? 'bg-amber-500' : 'bg-cyan-500',
                      )}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground/80">{aqDomainDescriptions[d]}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5"
          >
            <h3 className="font-serif text-base font-semibold text-emerald-500 mb-3">Likely Strengths</h3>
            <ul className="space-y-2">
              {results.strengths.map((s, i) => (
                <li key={i} className="text-sm text-foreground/90 leading-snug flex gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>{s}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5"
          >
            <h3 className="font-serif text-base font-semibold text-amber-500 mb-3">Likely Friction Points</h3>
            <ul className="space-y-2">
              {results.challenges.map((c, i) => (
                <li key={i} className="text-sm text-foreground/90 leading-snug flex gap-2">
                  <span className="text-amber-500 mt-0.5">!</span>{c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-border bg-card p-6 mb-6"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Next Steps</h2>
          <ul className="space-y-2.5">
            {results.recommendations.map((r, i) => (
              <li key={i} className="text-sm text-foreground/90 leading-snug flex gap-2.5">
                <span className="text-primary font-mono text-xs mt-0.5">{(i + 1).toString().padStart(2, '0')}</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border/50 bg-muted/30 p-4 mb-8"
        >
          <p className="text-xs text-muted-foreground leading-relaxed">{results.disclaimer}</p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onViewDashboard && (
            <Button onClick={onViewDashboard} variant="outline" className="flex-1">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              View Full Dashboard
            </Button>
          )}
          <Button onClick={onRestart} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            <RotateCcw className="w-4 h-4 mr-2" />
            Back to All Tests
          </Button>
        </div>
      </div>
    </div>
  );
};
