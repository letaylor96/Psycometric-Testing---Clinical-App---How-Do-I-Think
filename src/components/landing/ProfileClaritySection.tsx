import { motion } from 'framer-motion';
import { ListChecks, GitBranch, FileText, Flag, LucideIcon } from 'lucide-react';

type Step = {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
  // visual tokens
  circle: string; // bg + text classes for the numbered circle
  iconWrap: string; // bg + text for the icon chip
  iconColor: string;
  accentBar: string; // top accent strip on the card
};

const STEPS: Step[] = [
  {
    n: '01',
    title: 'You answer structured questions',
    body: 'Plain-language questions help identify how you process information, learn, solve problems, and respond to new tools.',
    icon: ListChecks,
    circle: 'bg-teal-soft text-teal',
    iconWrap: 'bg-teal-soft/70',
    iconColor: 'text-teal',
    accentBar: 'bg-teal-soft',
  },
  {
    n: '02',
    title: 'Your thinking pattern is mapped',
    body: 'The assessment organizes your responses into a practical profile of strengths, preferences, friction points, and support needs.',
    icon: GitBranch,
    circle: 'bg-teal text-cream',
    iconWrap: 'bg-teal/10',
    iconColor: 'text-teal',
    accentBar: 'bg-teal',
  },
  {
    n: '03',
    title: 'You receive a useful profile',
    body: 'Your result explains how you tend to think, where you may thrive, and where extra structure or guidance may help.',
    icon: FileText,
    circle: 'bg-navy-deep text-cream',
    iconWrap: 'bg-navy-deep/10',
    iconColor: 'text-navy-deep dark:text-cream',
    accentBar: 'bg-navy-deep',
  },
  {
    n: '04',
    title: 'You get a starting path',
    body: 'Your profile connects to Applied AI Works Canada by suggesting AI tools, workflows, and supports that may fit you best.',
    icon: Flag,
    circle: 'bg-gold text-navy-deep',
    iconWrap: 'bg-gold-soft',
    iconColor: 'text-gold',
    accentBar: 'bg-gold',
  },
];

export const ProfileClaritySection = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-teal mb-3">
            The process · four connected steps
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            How the profile creates clarity.
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            A short, structured journey from your answers to a profile you can act on.
          </p>
        </div>

        {/* Desktop: horizontal cards with connecting line above */}
        <div className="hidden md:block relative">
          {/* connecting progress line behind the numbered circles */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-5 h-px"
            style={{
              backgroundImage:
                'linear-gradient(to right, hsl(var(--teal-soft)), hsl(var(--teal) / 0.6), hsl(var(--navy-deep) / 0.4), hsl(var(--gold)))',
            }}
          />

          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group flex flex-col items-center"
                >
                  {/* Numbered circle (sits on the line) */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full ${s.circle} ring-4 ring-background flex items-center justify-center font-serif text-[13px] font-semibold shadow-md group-hover:-translate-y-0.5 transition-transform`}
                  >
                    {s.n}
                  </div>

                  {/* Card */}
                  <div className="relative mt-6 w-full bg-card border border-navy-deep/10 rounded-2xl p-6 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    {/* top accent strip */}
                    <div className={`absolute inset-x-0 top-0 h-[3px] ${s.accentBar}`} />

                    <div
                      className={`w-11 h-11 rounded-xl ${s.iconWrap} flex items-center justify-center mb-5`}
                    >
                      <Icon className={`w-5 h-5 ${s.iconColor}`} strokeWidth={1.6} />
                    </div>

                    <h3 className="font-serif text-base font-medium text-foreground leading-snug mb-2">
                      {s.title}
                    </h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{s.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack with rail */}
        <div className="md:hidden relative">
          <div
            aria-hidden
            className="absolute left-5 top-2 bottom-2 w-px"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, hsl(var(--teal-soft)), hsl(var(--teal) / 0.6), hsl(var(--navy-deep) / 0.4), hsl(var(--gold)))',
            }}
          />
          <div className="space-y-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative pl-14"
                >
                  <div
                    className={`absolute left-0 top-1 w-10 h-10 rounded-full ${s.circle} ring-4 ring-background flex items-center justify-center font-serif text-[13px] font-semibold shadow-md`}
                  >
                    {s.n}
                  </div>
                  <div className="relative bg-card border border-navy-deep/10 rounded-2xl p-5 shadow-sm overflow-hidden">
                    <div className={`absolute inset-x-0 top-0 h-[3px] ${s.accentBar}`} />
                    <div className="flex items-start gap-3 mb-2">
                      <div
                        className={`w-9 h-9 rounded-lg ${s.iconWrap} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`w-4 h-4 ${s.iconColor}`} strokeWidth={1.6} />
                      </div>
                      <h3 className="font-serif text-base font-medium text-foreground leading-snug pt-1.5">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-ink-muted text-sm leading-relaxed">{s.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
