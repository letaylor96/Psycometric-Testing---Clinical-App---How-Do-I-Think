import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Activity,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NeurodivergentMindResults, processingStyleLabels, dimensionLabels } from '@/data/neurodivergentMindQuestions';
import { SaveAssessmentButton } from '@/components/SaveAssessmentButton';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { InstallAppBanner } from '@/components/InstallAppBanner';
import { percentileFor, percentileLabel, NORM_SOURCE } from '@/lib/ndNorms';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface NeurodivergentMindResultsScreenProps {
  results: NeurodivergentMindResults;
  cognitiveAnswers?: number[];
  adhdAnswers?: number[];
  onRestart: () => void;
  onViewDashboard?: () => void;
}

const bandConfig = {
  typical:    { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', ring: 'ring-emerald-500/40' },
  emerging:   { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   ring: 'ring-amber-500/40' },
  pronounced: { color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/30',  ring: 'ring-violet-500/40' },
  pervasive:  { color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30', ring: 'ring-fuchsia-500/40' },
} as const;

const PercentilePill = ({ percentile, modeled }: { percentile: number; modeled?: boolean }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border',
      percentile >= 80
        ? 'bg-violet-500/10 border-violet-500/30 text-violet-300'
        : percentile >= 60
        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        : 'bg-muted/50 border-border text-muted-foreground'
    )}
    title={modeled ? 'Modeled distribution — not a clinical norm' : 'Population norm'}
  >
    <TrendingUp className="w-3 h-3" />
    {percentileLabel(percentile)}
    {modeled && <span className="opacity-60">·modeled</span>}
  </span>
);

export const NeurodivergentMindResultsScreen = ({
  results,
  cognitiveAnswers,
  adhdAnswers,
  onRestart,
  onViewDashboard,
}: NeurodivergentMindResultsScreenProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('scorecard');
  const [showFormula, setShowFormula] = useState(false);

  const { cognitiveStyle, adhd, autismShort, dyslexia, dyscalculia, dyspraxia, sensoryRsd, composite, integratedInsights } = results;
  const band = bandConfig[composite.band];

  const radarData = cognitiveStyle.dimensionScores.map((score) => ({
    dimension: dimensionLabels[score.dimension].label.split(' ')[0],
    value: score.percentage,
    fullMark: 100,
  }));

  // Per-sub-score percentile values
  const adhdTotalPositive = adhd.partAScore + adhd.partBPositiveCount;
  const pAdhdTotal = percentileFor('asrsTotalPositive', adhdTotalPositive);
  const pAdhdPartA = percentileFor('asrsPartA', adhd.partAScore);
  const pAq10 = autismShort ? percentileFor('aq10', autismShort.totalScore) : null;
  const pDyslexia = dyslexia ? percentileFor('dyslexiaRawCount', dyslexia.rawCount) : null;
  const pDyscalculia = dyscalculia ? percentileFor('dyscalculiaRawCount', dyscalculia.rawCount) : null;
  const pDyspraxia = dyspraxia ? percentileFor('dyspraxiaRawCount', dyspraxia.rawCount) : null;
  const pSensory = sensoryRsd ? percentileFor('sensoryPct', sensoryRsd.sensoryPercent) : null;
  const pRsd = sensoryRsd ? percentileFor('rsdPct', sensoryRsd.rsdPercent) : null;

  const shareText = `🧠 My Neurodivergent Index: ${composite.index}/100 — ${composite.bandLabel}

Cognitive Style: ${cognitiveStyle.primaryProfile.name}
ADHD signal: ${adhd.likelihood} · ${adhdTotalPositive}/18 symptoms

Build your cognitive style profile →`;

  const linkedInText = `Completed the Cognitive Style & Attention module 🧠
ND Index: ${composite.index}/100 — ${composite.bandLabel}
Cognitive Style: ${cognitiveStyle.primaryProfile.name}`;

  const twitterText = `ND Index: ${composite.index}/100 — ${composite.bandLabel}. Cognitive style: ${cognitiveStyle.primaryProfile.name} 🧠`;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Neurodivergent Mind Profile</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Cognitive Profile
          </h1>
          <p className="text-muted-foreground">
            A scored, norm-referenced view of how your mind works
          </p>
        </motion.div>

        {/* === ND INDEX HERO === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className={cn(
            'rounded-3xl p-6 md:p-8 border-2 mb-6 relative overflow-hidden',
            band.bg, band.border
          )}
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className={cn('absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl', band.bg)} />
          </div>
          <div className="relative grid md:grid-cols-[auto_1fr] gap-6 items-center">
            {/* Big number */}
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Neurodivergent Index</p>
              <div className="flex items-baseline gap-1">
                <span className={cn('font-serif text-6xl md:text-7xl font-bold tabular-nums', band.color)}>
                  {composite.index}
                </span>
                <span className="text-2xl text-muted-foreground font-medium">/100</span>
              </div>
              <div className={cn('mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full ring-1', band.ring, band.bg)}>
                <Sparkles className={cn('w-3.5 h-3.5', band.color)} />
                <span className={cn('text-sm font-semibold', band.color)}>{composite.bandLabel}</span>
              </div>
            </div>

            {/* Interpretation */}
            <div>
              <p className="text-foreground leading-relaxed mb-3">{composite.bandDescription}</p>
              <p className="text-sm text-muted-foreground mb-3">
                Composite of {composite.includedModules.length} module{composite.includedModules.length === 1 ? '' : 's'}:{' '}
                {composite.includedModules.map((m, i) => (
                  <span key={m}>
                    <span className="text-foreground font-medium">
                      {m === 'cognitiveStyle' ? 'cognitive style' :
                       m === 'sensoryRsd' ? 'sensory/RSD' :
                       m === 'adhd' ? 'ADHD (ASRS)' :
                       m === 'autism' ? 'autism (AQ)' : m}
                    </span>
                    {i < composite.includedModules.length - 1 && ', '}
                  </span>
                ))}.
              </p>
              <button
                onClick={() => setShowFormula((v) => !v)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Info className="w-3 h-3" />
                {showFormula ? 'Hide' : 'How is this computed?'}
              </button>
              <AnimatePresence>
                {showFormula && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-3 rounded-lg bg-background/40 border border-border text-xs text-muted-foreground space-y-2">
                      <p>
                        Each module is z-scored against published validation norms (where available) or modeled
                        distributions (clearly tagged below). The weighted blend is mapped through a normal CDF to a 0–100 scale.
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {composite.contributions.map((c) => (
                          <div key={c.module} className="flex justify-between">
                            <span>{c.module}</span>
                            <span className="tabular-nums">w={c.weight.toFixed(2)} · z={c.z.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <p className="italic">
                        Self-report aggregate — not a clinical metric. Bands: 0–39 Typical · 40–59 Emerging · 60–79 Pronounced · 80–100 Pervasive.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* === NUMERIC SCORE CARD === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card overflow-hidden mb-6"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === 'scorecard' ? null : 'scorecard')}
            className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">Your scores at a glance</h3>
                <p className="text-sm text-muted-foreground">Every sub-score with population context</p>
              </div>
            </div>
            {expandedSection === 'scorecard' ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>

          <AnimatePresence>
            {expandedSection === 'scorecard' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border"
              >
                <div className="p-6 grid sm:grid-cols-2 gap-3">
                  {/* ADHD */}
                  <ScoreRow
                    label="ADHD — ASRS Part A"
                    value={`${adhd.partAScore}/6`}
                    sub={`${adhd.likelihood} likelihood`}
                    percentile={pAdhdPartA}
                  />
                  <ScoreRow
                    label="ADHD — Total positive symptoms"
                    value={`${adhdTotalPositive}/18`}
                    sub={`Inattention ${adhd.inattentionPositive} · Hyper ${adhd.hyperactivityPositive}`}
                    percentile={pAdhdTotal}
                  />
                  {/* Cognitive Style dimensions */}
                  {cognitiveStyle.dimensionScores.map((d) => {
                    const p = percentileFor('cogDimensionPct', d.percentage);
                    return (
                      <ScoreRow
                        key={d.dimension}
                        label={dimensionLabels[d.dimension].label}
                        value={`${d.percentage}%`}
                        sub="Cognitive dimension"
                        percentile={p}
                        modeled={NORM_SOURCE.cogDimensionPct === 'modeled'}
                      />
                    );
                  })}
                  {/* Autism short */}
                  {autismShort && pAq10 !== null && (
                    <ScoreRow
                      label="Autism — AQ-10"
                      value={`${autismShort.totalScore}/10`}
                      sub={autismShort.cutoffMet ? 'Meets referral cutoff' : 'Below cutoff'}
                      percentile={pAq10}
                    />
                  )}
                  {/* Dyslexia */}
                  {dyslexia && pDyslexia !== null && (
                    <ScoreRow
                      label="Dyslexia indicators"
                      value={`${dyslexia.rawCount}/15`}
                      sub={dyslexia.likelihood}
                      percentile={pDyslexia}
                      modeled
                    />
                  )}
                  {/* Dyscalculia */}
                  {dyscalculia && pDyscalculia !== null && (
                    <ScoreRow
                      label="Dyscalculia indicators"
                      value={`${dyscalculia.rawCount}/10`}
                      sub={dyscalculia.likelihood}
                      percentile={pDyscalculia}
                      modeled
                    />
                  )}
                  {/* Dyspraxia */}
                  {dyspraxia && pDyspraxia !== null && (
                    <ScoreRow
                      label="Dyspraxia / DCD indicators"
                      value={`${dyspraxia.rawCount}/10`}
                      sub={dyspraxia.likelihood}
                      percentile={pDyspraxia}
                      modeled
                    />
                  )}
                  {/* Sensory + RSD */}
                  {sensoryRsd && pSensory !== null && (
                    <ScoreRow
                      label="Sensory sensitivity"
                      value={`${sensoryRsd.sensoryPercent}%`}
                      sub={sensoryRsd.sensoryLikelihood}
                      percentile={pSensory}
                      modeled
                    />
                  )}
                  {sensoryRsd && pRsd !== null && (
                    <ScoreRow
                      label="Rejection sensitivity"
                      value={`${sensoryRsd.rsdPercent}%`}
                      sub={sensoryRsd.rsdLikelihood}
                      percentile={pRsd}
                      modeled
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* === Integrated insights === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border bg-card p-6 mb-6"
        >
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Integrated Insights</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-sm font-medium text-purple-400 mb-1">Attentional Profile</p>
              <p className="text-foreground">{integratedInsights.attentionalProfile}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="text-sm font-medium text-emerald-400 mb-2">Cognitive Strengths</p>
                <ul className="space-y-1">
                  {integratedInsights.cognitiveStrengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-emerald-400">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="text-sm font-medium text-amber-400 mb-2">Key Recommendations</p>
                <ul className="space-y-1">
                  {integratedInsights.recommendations.slice(0, 3).map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-amber-400 mt-0.5">→</span>{rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {integratedInsights.synergyInsights.length > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-400 mb-2">Synergy Insights</p>
                {integratedInsights.synergyInsights.map((insight, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{insight}</p>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* === Expandable per-module deep-dive sections === */}
        <div className="space-y-4 mb-8">
          {/* Cognitive Style */}
          <CollapsibleSection
            id="cognitive"
            icon={<Brain className="w-6 h-6 text-purple-400" />}
            title="Cognitive Style Profile"
            subtitle={`${cognitiveStyle.primaryProfile.name} • 6 dimensions analyzed`}
            expanded={expandedSection === 'cognitive'}
            onToggle={() => setExpandedSection(expandedSection === 'cognitive' ? null : 'cognitive')}
          >
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="value" stroke="hsl(280, 100%, 70%)" fill="hsl(280, 100%, 70%)" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border mb-4">
              <h4 className="font-semibold text-foreground mb-2">{cognitiveStyle.primaryProfile.name}</h4>
              <p className="text-sm text-muted-foreground italic mb-3">"{cognitiveStyle.primaryProfile.tagline}"</p>
              <p className="text-sm text-muted-foreground">{cognitiveStyle.primaryProfile.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cognitiveStyle.dimensionScores.map((score) => (
                <div key={score.dimension} className="p-3 rounded-lg bg-muted/20 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{dimensionLabels[score.dimension].label}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${score.percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{score.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* ADHD */}
          <CollapsibleSection
            id="adhd"
            icon={<Activity className="w-6 h-6 text-violet-400" />}
            title="ADHD Screening (ASRS-v1.1)"
            subtitle={`${adhd.likelihood} likelihood · Part A ${adhd.partAScore}/6`}
            expanded={expandedSection === 'adhd'}
            onToggle={() => setExpandedSection(expandedSection === 'adhd' ? null : 'adhd')}
          >
            <div className="flex gap-2 mb-4">
              <PercentilePill percentile={pAdhdPartA} />
              <PercentilePill percentile={pAdhdTotal} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <DomainBar label="Inattention" pct={Math.round((adhd.inattentionScore / (9 * 4)) * 100)} count={adhd.inattentionPositive} color="violet" />
              <DomainBar label="Hyperactivity/Impulsivity" pct={Math.round((adhd.hyperactivityScore / (9 * 4)) * 100)} count={adhd.hyperactivityPositive} color="pink" />
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border mb-4">
              <p className="text-sm text-muted-foreground">{adhd.interpretation}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Recommendations</p>
              <ul className="space-y-2">
                {adhd.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-violet-400 mt-0.5">→</span>{rec}
                  </li>
                ))}
              </ul>
            </div>
            <Disclaimer text={adhd.disclaimer} />
          </CollapsibleSection>

          {/* Autism (AQ-10) */}
          {autismShort && pAq10 !== null && (
            <CollapsibleSection
              id="autism"
              icon={<Sparkles className="w-6 h-6 text-cyan-400" />}
              title="Autism Spectrum (AQ-10)"
              subtitle={`${autismShort.totalScore}/10 · ${autismShort.cutoffMet ? 'meets cutoff' : 'below cutoff'}`}
              expanded={expandedSection === 'autism'}
              onToggle={() => setExpandedSection(expandedSection === 'autism' ? null : 'autism')}
            >
              <div className="flex gap-2 mb-4"><PercentilePill percentile={pAq10} /></div>
              <p className="text-sm text-muted-foreground mb-4">{autismShort.interpretation}</p>
              <Disclaimer text={autismShort.disclaimer} />
            </CollapsibleSection>
          )}

          {/* Dyslexia */}
          {dyslexia && pDyslexia !== null && (
            <CollapsibleSection
              id="dyslexia"
              icon={<Brain className="w-6 h-6 text-amber-400" />}
              title="Dyslexia indicators"
              subtitle={`${dyslexia.rawCount}/15 strong indicators · ${dyslexia.likelihood}`}
              expanded={expandedSection === 'dyslexia'}
              onToggle={() => setExpandedSection(expandedSection === 'dyslexia' ? null : 'dyslexia')}
            >
              <div className="flex gap-2 mb-4"><PercentilePill percentile={pDyslexia} modeled /></div>
              <p className="text-sm text-muted-foreground mb-4">{dyslexia.interpretation}</p>
              <Disclaimer text={dyslexia.disclaimer} />
            </CollapsibleSection>
          )}

          {/* Dyscalculia */}
          {dyscalculia && pDyscalculia !== null && (
            <CollapsibleSection
              id="dyscalculia"
              icon={<Brain className="w-6 h-6 text-emerald-400" />}
              title="Dyscalculia indicators"
              subtitle={`${dyscalculia.rawCount}/10 strong indicators · ${dyscalculia.likelihood}`}
              expanded={expandedSection === 'dyscalculia'}
              onToggle={() => setExpandedSection(expandedSection === 'dyscalculia' ? null : 'dyscalculia')}
            >
              <div className="flex gap-2 mb-4"><PercentilePill percentile={pDyscalculia} modeled /></div>
              <p className="text-sm text-muted-foreground mb-4">{dyscalculia.interpretation}</p>
              <Disclaimer text={dyscalculia.disclaimer} />
            </CollapsibleSection>
          )}

          {/* Dyspraxia */}
          {dyspraxia && pDyspraxia !== null && (
            <CollapsibleSection
              id="dyspraxia"
              icon={<Activity className="w-6 h-6 text-pink-400" />}
              title="Dyspraxia / DCD indicators"
              subtitle={`${dyspraxia.rawCount}/10 strong indicators · ${dyspraxia.likelihood}`}
              expanded={expandedSection === 'dyspraxia'}
              onToggle={() => setExpandedSection(expandedSection === 'dyspraxia' ? null : 'dyspraxia')}
            >
              <div className="flex gap-2 mb-4"><PercentilePill percentile={pDyspraxia} modeled /></div>
              <p className="text-sm text-muted-foreground mb-4">{dyspraxia.interpretation}</p>
              <Disclaimer text={dyspraxia.disclaimer} />
            </CollapsibleSection>
          )}

          {/* Sensory + RSD */}
          {sensoryRsd && pSensory !== null && pRsd !== null && (
            <CollapsibleSection
              id="sensoryRsd"
              icon={<Sparkles className="w-6 h-6 text-fuchsia-400" />}
              title="Sensory + Rejection Sensitivity"
              subtitle={`Sensory ${sensoryRsd.sensoryPercent}% · RSD ${sensoryRsd.rsdPercent}%`}
              expanded={expandedSection === 'sensoryRsd'}
              onToggle={() => setExpandedSection(expandedSection === 'sensoryRsd' ? null : 'sensoryRsd')}
            >
              <div className="flex gap-2 mb-4 flex-wrap">
                <PercentilePill percentile={pSensory} modeled />
                <PercentilePill percentile={pRsd} modeled />
              </div>
              <p className="text-sm text-muted-foreground mb-4">{sensoryRsd.interpretation}</p>
              <Disclaimer text={sensoryRsd.disclaimer} />
            </CollapsibleSection>
          )}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="card-elevated rounded-2xl p-6 border border-border">
            <h3 className="font-display font-semibold text-lg mb-4 text-center">Share Your Profile</h3>
            <div className="flex justify-center">
              <SocialShareButtons shareText={shareText} linkedInText={linkedInText} twitterText={twitterText} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            {cognitiveAnswers && adhdAnswers && (
              <SaveAssessmentButton
                assessmentType="neurodivergent"
                answers={{ cognitiveAnswers, adhdAnswers }}
                results={{ cognitiveStyle: results.cognitiveStyle, adhd: results.adhd }}
              />
            )}
            {onViewDashboard && (
              <Button
                onClick={onViewDashboard}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white flex items-center gap-2"
              >
                View Full Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
            <Button onClick={onRestart} variant="ghost" className="flex items-center gap-2 text-muted-foreground">
              <RotateCcw className="w-4 h-4" />
              Take Another Assessment
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// === Helper subcomponents ===
const ScoreRow = ({
  label, value, sub, percentile, modeled,
}: { label: string; value: string; sub: string; percentile: number; modeled?: boolean }) => (
  <div className="p-3 rounded-lg bg-muted/20 border border-border">
    <div className="flex items-baseline justify-between gap-2 mb-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-lg font-bold text-foreground tabular-nums">{value}</span>
    </div>
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] text-muted-foreground capitalize">{sub}</span>
      <PercentilePill percentile={percentile} modeled={modeled} />
    </div>
  </div>
);

const DomainBar = ({ label, pct, count, color }: { label: string; pct: number; count: number; color: 'violet' | 'pink' }) => (
  <div className="p-4 rounded-xl bg-muted/30 border border-border">
    <p className={cn('text-sm font-medium mb-2', color === 'violet' ? 'text-violet-400' : 'text-pink-400')}>{label}</p>
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full', color === 'violet' ? 'bg-violet-500' : 'bg-pink-500')} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-lg font-bold text-foreground tabular-nums">{pct}%</span>
    </div>
    <p className="text-xs text-muted-foreground mt-1">{count} positive indicators</p>
  </div>
);

const Disclaimer = ({ text }: { text: string }) => (
  <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
    <div className="flex items-start gap-2">
      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
      <p className="text-xs text-amber-200/80">{text}</p>
    </div>
  </div>
);

const CollapsibleSection = ({
  id, icon, title, subtitle, expanded, onToggle, children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-border bg-card overflow-hidden"
  >
    <button onClick={onToggle} className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <div className="text-left">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
    </button>
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-border"
        >
          <div className="p-6">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
