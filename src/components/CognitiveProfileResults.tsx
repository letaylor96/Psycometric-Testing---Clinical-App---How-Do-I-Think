import { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CognitiveProfileResults, ARCHETYPE_BY_KEY } from '@/data/cognitiveProfileQuestions';
import { InstallAppBanner } from '@/components/InstallAppBanner';

interface Props {
  results: CognitiveProfileResults;
  onRestart: () => void;
  onViewDashboard?: () => void;
}

const DISCLAIMER =
  'These results are intended to support self-understanding and program guidance. They are not a diagnosis and should not be used as a substitute for medical, psychological, educational, or career counselling advice.';

export const CognitiveProfileResultsScreen = ({ results, onRestart, onViewDashboard }: Props) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const primary = ARCHETYPE_BY_KEY[results.primary.key];
  const secondary = results.secondary ? ARCHETYPE_BY_KEY[results.secondary.key] : null;

  const generatedDate = new Date(results.completedAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="border-b border-border bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={onRestart} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
          {onViewDashboard && (
            <Button variant="outline" size="sm" onClick={onViewDashboard}>
              Combined dashboard
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* 1. Header card */}
        <section className="text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
            Your Cognitive Profile
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
            {primary.label}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {primary.summary}
          </p>
          <p className="text-muted-foreground text-xs mt-4">Generated {generatedDate}</p>
        </section>

        {/* 2. Primary + Secondary cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ArchetypeCard label="Primary" archetype={primary} score={results.primary.score} emphasis />
          {secondary ? (
            <ArchetypeCard label="Secondary" archetype={secondary} score={results.secondary!.score} />
          ) : (
            <div className="p-6 rounded-lg border border-dashed border-border bg-card/30 flex items-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your primary profile is clearly distinct from your second-ranked archetype. See the full breakdown below for the complete picture.
              </p>
            </div>
          )}
        </section>

        {/* 3. Thinking profile */}
        <ReportSection title="Your thinking profile">
          <p className="text-foreground/90 text-[15px] leading-relaxed whitespace-pre-line">
            {primary.thinkingProfile}
          </p>
          {secondary && (
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              You also show meaningful tendencies of a <span className="text-foreground font-medium">{secondary.label.toLowerCase()}</span>, which can complement your primary style.
            </p>
          )}
        </ReportSection>

        {/* 4. Strengths */}
        <ReportSection title="Strengths to build from">
          <ul className="space-y-2.5">
            {primary.strengths.map((s) => (
              <li key={s} className="flex gap-3 text-[15px] text-foreground/90 leading-relaxed">
                <span className="text-muted-foreground mt-1.5 text-[10px]">●</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </ReportSection>

        {/* 5. Friction points */}
        <ReportSection title="Common friction points">
          <ul className="space-y-2.5">
            {primary.frictionPoints.map((s) => (
              <li key={s} className="flex gap-3 text-[15px] text-foreground/90 leading-relaxed">
                <span className="text-muted-foreground mt-1.5 text-[10px]">●</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </ReportSection>

        {/* 6. AI workflows */}
        <ReportSection title="AI workflows that may fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {primary.aiWorkflows.map((w) => (
              <div key={w} className="p-4 rounded-md border border-border bg-card">
                <p className="text-[15px] text-foreground capitalize">{w}</p>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* 7. Supports */}
        <ReportSection title="Supports that may help">
          <div className="flex flex-wrap gap-2">
            {primary.supports.map((s) => (
              <span
                key={s}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-card text-sm text-foreground capitalize"
              >
                {s}
              </span>
            ))}
          </div>
        </ReportSection>

        {/* 8. Starting point */}
        <section className="p-6 sm:p-8 rounded-lg border border-foreground/20 bg-accent/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-foreground/70" strokeWidth={1.5} />
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Suggested starting point in Applied AI Works Canada
            </p>
          </div>
          <p className="text-foreground text-base sm:text-lg leading-relaxed">
            {primary.startingPoint}
          </p>
        </section>

        {/* 9. Full breakdown */}
        <section className="rounded-lg border border-border bg-card">
          <button
            onClick={() => setShowBreakdown((v) => !v)}
            className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-1">
                Full profile breakdown
              </p>
              <h2 className="font-serif text-lg font-medium text-foreground">
                All eight archetype scores and ten category scores
              </h2>
            </div>
            {showBreakdown ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          {showBreakdown && (
            <div className="px-5 sm:px-6 pb-6 space-y-8 border-t border-border pt-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
                  Archetype match scores
                </p>
                <div className="space-y-2.5">
                  {results.archetypeScores.map((a, i) => (
                    <ScoreBar key={a.key} label={a.label} score={a.score} highlight={i === 0} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
                  Category scores
                </p>
                <div className="space-y-2.5">
                  {results.categoryScores.map((c) => (
                    <ScoreBar key={c.key} label={c.label} score={c.score} sub={c.basis} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 10. Next steps */}
        <section className="text-center pt-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
            Continue your profile
          </p>
          <h2 className="font-serif text-2xl font-medium text-foreground mb-3">
            Add depth with the other modules.
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            Each module adds a lens. Personality, attention and focus patterns, depth psychology, and cognitive reasoning each contribute to your integrated profile.
          </p>
          {onViewDashboard && (
            <Button onClick={onViewDashboard} size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              Open dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </section>

        <InstallAppBanner />



        {/* 11. Disclaimer */}
        <section className="border-t border-border pt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70 mb-3">
            Disclaimer
          </p>
          <p className="text-muted-foreground/80 text-xs sm:text-sm leading-relaxed italic max-w-2xl mx-auto">
            {DISCLAIMER}
          </p>
        </section>
      </main>
    </div>
  );
};

// — helpers ——————————————————————————————

interface ArchetypeCardProps {
  label: string;
  archetype: { label: string; summary: string };
  score: number;
  emphasis?: boolean;
}

const ArchetypeCard = ({ label, archetype, score, emphasis }: ArchetypeCardProps) => (
  <div
    className={cn(
      'p-6 rounded-lg border bg-card',
      emphasis ? 'border-foreground/30' : 'border-border',
    )}
  >
    <div className="flex items-center justify-between mb-3">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
      <span className="text-[11px] font-mono text-muted-foreground tabular-nums">
        match {score}
      </span>
    </div>
    <h3 className="font-serif text-xl font-medium text-foreground mb-2 leading-tight">
      {archetype.label}
    </h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{archetype.summary}</p>
  </div>
);

const ReportSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground tracking-tight mb-4">
      {title}
    </h2>
    <div>{children}</div>
  </section>
);

const ScoreBar = ({
  label,
  score,
  sub,
  highlight,
}: {
  label: string;
  score: number;
  sub?: string;
  highlight?: boolean;
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-1 gap-3">
      <div className="min-w-0">
        <span
          className={cn(
            'text-sm',
            highlight ? 'text-foreground font-medium' : 'text-foreground/85',
          )}
        >
          {label}
        </span>
        {sub && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground ml-2">
            {sub}
          </span>
        )}
      </div>
      <span className="text-xs font-mono text-muted-foreground tabular-nums">{score}</span>
    </div>
    <div className="h-[6px] bg-border/60 rounded-full overflow-hidden">
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500',
          highlight ? 'bg-foreground/80' : 'bg-foreground/40',
        )}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);
