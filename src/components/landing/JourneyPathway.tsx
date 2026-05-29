import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    label: 'Answer',
    title: 'Answer structured questions',
    body: 'Validated psychometric prompts across cognitive style, personality, and reasoning.',
    accent: 'teal-soft',
    ring: 'ring-teal/30',
    fill: 'bg-teal-soft',
    text: 'text-teal',
    anchor: 'profile-includes',
  },
  {
    n: '02',
    label: 'Map',
    title: 'Map your thinking pattern',
    body: 'Your responses are translated into a structured cognitive and learning profile.',
    accent: 'teal',
    ring: 'ring-teal/40',
    fill: 'bg-teal text-cream',
    text: 'text-teal',
    anchor: 'thinking-map',
  },
  {
    n: '03',
    label: 'Understand',
    title: 'Understand your profile',
    body: 'See your strengths, support needs, and how you adapt to AI-enabled work.',
    accent: 'navy',
    ring: 'ring-navy-deep/30',
    fill: 'bg-navy-deep text-cream',
    text: 'text-navy-deep dark:text-cream',
    anchor: 'modules',
  },
  {
    n: '04',
    label: 'Start',
    title: 'Start with the right supports',
    body: 'Begin Applied AI Works Canada with the workflows and scaffolding that fit you.',
    accent: 'gold',
    ring: 'ring-gold/40',
    fill: 'bg-gold text-navy-deep',
    text: 'text-gold',
    anchor: 'program-connection',
  },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const JourneyPathway = () => {
  return (
    <section className="relative py-14 sm:py-20 bg-cream-warm/60 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-teal mb-3">
            The journey · uncertainty to clarity
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight">
            Four steps from how you think to what to do next.
          </h2>
        </div>

        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          {/* connecting line */}
          <div className="absolute top-7 left-[7%] right-[7%] h-px bg-gradient-to-r from-teal-soft via-navy-deep/30 to-gold" />
          <div className="grid grid-cols-4 gap-6 relative">
            {STEPS.map((s, i) => (
              <motion.button
                key={s.n}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => scrollTo(s.anchor)}
                className="group text-left flex flex-col items-start"
              >
                <div className={`relative z-10 w-14 h-14 rounded-full ${s.fill} ring-4 ring-background flex items-center justify-center font-serif text-sm font-semibold shadow-md group-hover:-translate-y-1 transition-transform`}>
                  {s.n}
                </div>
                <div className="mt-5">
                  <p className={`text-[10px] uppercase tracking-[0.22em] font-medium mb-2 ${s.text}`}>
                    Stage {s.n} · {s.label}
                  </p>
                  <h3 className="font-serif text-base font-medium text-foreground leading-snug mb-2">
                    {s.title}
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile vertical rail */}
        <div className="md:hidden relative">
          <div className="absolute top-0 bottom-0 left-7 w-px bg-gradient-to-b from-teal-soft via-navy-deep/30 to-gold" />
          <div className="space-y-7">
            {STEPS.map((s) => (
              <button
                key={s.n}
                onClick={() => scrollTo(s.anchor)}
                className="flex gap-5 items-start text-left w-full"
              >
                <div className={`relative z-10 w-14 h-14 flex-shrink-0 rounded-full ${s.fill} ring-4 ring-background flex items-center justify-center font-serif text-sm font-semibold shadow-md`}>
                  {s.n}
                </div>
                <div className="pt-1">
                  <p className={`text-[10px] uppercase tracking-[0.22em] font-medium mb-1 ${s.text}`}>
                    Stage {s.n} · {s.label}
                  </p>
                  <h3 className="font-serif text-base font-medium text-foreground leading-snug mb-1">
                    {s.title}
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{s.body}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
