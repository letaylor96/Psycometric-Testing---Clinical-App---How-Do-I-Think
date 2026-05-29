import { motion } from 'framer-motion';
import {
  Sparkles,
  AlertCircle,
  HeartHandshake,
  MapPin,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SIDEBAR_ITEMS = [
  'Profile Summary',
  'Cognitive Style',
  'Learning Pattern',
  'Problem-Solving',
  'Communication',
  'AI Workflow Fit',
  'Support Needs',
  'Starting Point',
];

const STRENGTHS = [
  'Systems thinking',
  'Analytical reasoning',
  'Attention to detail',
  'Strategic planning',
  'Independent problem-solving',
];

const FRICTION = [
  'Overthinking complexity',
  'Starting without full clarity',
  'Working in unstructured environments',
  'Delegation',
  'Perfectionism',
];

const SUPPORTS = ['Clear structure', 'Worked examples', 'Pacing prompts', 'Decision checkpoints'];

export const SampleReportPreview = () => {
  const fitScore = 82;

  const scrollToTop = () => {
    document.getElementById('sample-report')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="sample-report"
      className="relative py-16 sm:py-24 bg-cream-warm/40 border-y border-border scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-14 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
            Sample report
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            Your profile translates insight into next steps.
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            The profile turns how you think into practical guidance: where you are likely to thrive,
            where friction may show up, and which AI-enabled workflows or supports may help you move forward.
          </p>
        </div>

        {/* Report panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-card border border-navy-deep/10 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header strip */}
          <div
            className="px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-3 border-b border-cream/10"
            style={{ background: 'var(--gradient-hero)' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-md bg-cream/10 border border-cream/15 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-cream" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-0.5">
                  Generated from 4 modules
                </p>
                <h3 className="font-serif text-cream text-sm sm:text-base font-medium leading-tight truncate">
                  Sample Cognitive &amp; AI-Readiness Profile
                </h3>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-medium whitespace-nowrap">
                Sample · For illustration
              </span>
            </span>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <aside className="bg-navy-deep/[0.03] md:border-r border-b md:border-b-0 border-navy-deep/10 p-3 sm:p-4">
              <p className="hidden md:block text-[10px] uppercase tracking-[0.22em] text-ink-muted px-3 pt-2 pb-3">
                Report sections
              </p>
              <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
                {SIDEBAR_ITEMS.map((item, i) => {
                  const isActive = i === 0;
                  return (
                    <div
                      key={item}
                      className={`relative flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] whitespace-nowrap md:whitespace-normal transition-colors ${
                        isActive
                          ? 'bg-cream text-navy-deep font-medium shadow-sm'
                          : 'text-ink-muted'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-gold" />
                      )}
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          isActive ? 'bg-teal' : 'bg-ink-muted/40'
                        }`}
                      />
                      <span className="font-serif">{item}</span>
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* Main panel */}
            <div className="p-6 sm:p-9">
              {/* Top: section label + fit indicator */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-teal mb-1.5">
                    Profile Summary
                  </p>
                  <h4 className="font-serif text-lg sm:text-xl font-medium text-foreground leading-tight">
                    Systems-oriented thinker
                  </h4>
                </div>
                <div className="hidden sm:flex flex-wrap justify-end gap-1.5 max-w-[260px]">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-teal-soft/60 text-teal border border-teal/20">
                    Systems thinker
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gold-soft/70 text-gold border border-gold/20">
                    Reflective learner
                  </span>
                </div>
              </div>

              {/* Overall Fit */}
              <div className="mb-6 p-4 sm:p-5 rounded-xl bg-cream-warm/60 border border-navy-deep/10">
                <div className="flex items-end justify-between mb-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    Overall fit · sample
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl sm:text-3xl font-semibold text-navy-deep dark:text-cream leading-none">
                      {fitScore}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                      / 100
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-navy-deep/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${fitScore}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, hsl(var(--teal)), hsl(var(--gold)))',
                    }}
                  />
                </div>
                <p className="mt-2 text-[11px] text-ink-muted">
                  Strong fit for structured, pattern-led AI workflows.
                </p>
              </div>

              {/* Narrative paragraph */}
              <p className="font-serif text-[15px] sm:text-base text-foreground/90 leading-relaxed mb-7 pl-4 border-l-2 border-teal/40">
                You are a systems-oriented thinker who excels at seeing patterns, organizing
                complexity, and building practical solutions. You may benefit from structure,
                clear logic, and examples before taking action.
              </p>

              {/* 2-column mini cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Top Strengths */}
                <div className="p-5 rounded-xl bg-card border border-navy-deep/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-teal-soft/70 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-teal" strokeWidth={1.6} />
                    </div>
                    <h5 className="font-serif text-sm font-medium text-foreground">
                      Top Strengths
                    </h5>
                  </div>
                  <ul className="space-y-1.5 text-[13px] text-ink-muted leading-relaxed">
                    {STRENGTHS.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-teal mt-0.5">·</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Friction Points */}
                <div className="p-5 rounded-xl bg-card border border-navy-deep/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-gold-soft/70 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-gold" strokeWidth={1.6} />
                    </div>
                    <h5 className="font-serif text-sm font-medium text-foreground">
                      Common Friction Points
                    </h5>
                  </div>
                  <ul className="space-y-1.5 text-[13px] text-ink-muted leading-relaxed">
                    {FRICTION.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-gold mt-0.5">·</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Supports */}
                <div className="p-5 rounded-xl bg-teal-soft/30 border border-teal/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-cream flex items-center justify-center border border-teal/20">
                      <HeartHandshake className="w-4 h-4 text-teal" strokeWidth={1.6} />
                    </div>
                    <h5 className="font-serif text-sm font-medium text-foreground">
                      Suggested Supports
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUPPORTS.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-full text-[12px] font-medium bg-cream text-teal border border-teal/25"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Starting Point */}
                <div className="p-5 rounded-xl bg-gold-soft/40 border border-gold/25">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-cream flex items-center justify-center border border-gold/30">
                      <MapPin className="w-4 h-4 text-gold" strokeWidth={1.6} />
                    </div>
                    <h5 className="font-serif text-sm font-medium text-foreground">
                      Suggested Starting Point
                    </h5>
                  </div>
                  <p className="text-[13px] text-ink-muted leading-relaxed">
                    Begin with a structured AI workflow that supports planning and pattern
                    recognition — for example, a guided research or analysis assistant with
                    clear scaffolding.
                  </p>
                </div>
              </div>

              {/* Inline disclaimer */}
              <p className="mt-6 text-[11px] text-ink-muted/70 leading-relaxed">
                Sample content for illustration. Not a diagnostic or clinical assessment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="lg"
            className="border-navy-deep/30 text-foreground hover:bg-cream-warm font-medium px-7 py-5 text-sm group"
          >
            View full sample report
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
