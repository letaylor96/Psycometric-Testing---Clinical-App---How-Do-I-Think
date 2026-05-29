import { motion } from 'framer-motion';
import { Brain, TrendingUp, Compass, ShieldAlert } from 'lucide-react';

const VALUES = [
  {
    icon: Brain,
    title: 'Self-awareness that is practical',
    body: 'Understand how you think, not just what you know.',
    iconClass: 'text-teal',
    iconBg: 'bg-teal-soft/70',
    cardClass: 'bg-card border-teal/15',
  },
  {
    icon: TrendingUp,
    title: 'Stronger learning and outcomes',
    body: 'Use your strengths. Get support where it matters. Make faster progress.',
    iconClass: 'text-gold',
    iconBg: 'bg-gold-soft/70',
    cardClass: 'bg-card border-gold/20',
  },
  {
    icon: Compass,
    title: 'Start with confidence',
    body: 'Begin with the right tools, supports, and learning path.',
    iconClass: 'text-navy-deep dark:text-cream',
    iconBg: 'bg-cream border border-navy-deep/15',
    cardClass: 'bg-card border-navy-deep/12',
  },
];

export const WhyThisMattersCompanion = () => {
  return (
    <section className="relative py-14 sm:py-20 bg-cream-warm/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
            Why it matters
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight">
            Why this matters
          </h2>
        </div>

        {/* Value cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
        >
          {VALUES.map((v) => (
            <motion.div
              key={v.title}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className={`group p-6 sm:p-7 rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${v.cardClass}`}
            >
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center mb-5 ${v.iconBg}`}
              >
                <v.icon className={`w-5 h-5 ${v.iconClass}`} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-medium text-foreground mb-2 leading-snug">
                {v.title}
              </h3>
              <p className="text-ink-muted text-[14px] leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3 p-5 sm:p-6 rounded-xl bg-card border border-navy-deep/15 shadow-sm">
            <div className="w-9 h-9 rounded-md bg-cream-warm flex items-center justify-center flex-shrink-0 border border-navy-deep/10">
              <ShieldAlert className="w-4 h-4 text-navy-deep dark:text-cream" strokeWidth={1.6} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1">
                Important
              </p>
              <p className="text-[13px] sm:text-[14px] text-ink-muted leading-relaxed">
                This tool is for self-understanding, learning support, and program guidance. It is
                not a medical, psychological, educational, or diagnostic assessment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
