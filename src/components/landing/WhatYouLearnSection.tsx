import { motion } from 'framer-motion';
import {
  Brain,
  BookOpen,
  Sparkles,
  AlertCircle,
  Workflow,
  HeartHandshake,
  MapPin,
  LucideIcon,
} from 'lucide-react';

type Chip = {
  title: string;
  icon: LucideIcon;
  bg: string;
  iconColor: string;
};

const CHIPS: Chip[] = [
  { title: 'Cognitive Style', icon: Brain, bg: 'bg-teal-soft/70', iconColor: 'text-teal' },
  { title: 'Learning Pattern', icon: BookOpen, bg: 'bg-gold-soft/70', iconColor: 'text-gold' },
  { title: 'Strengths', icon: Sparkles, bg: 'bg-cream-warm', iconColor: 'text-navy-deep dark:text-cream' },
  { title: 'Friction Points', icon: AlertCircle, bg: 'bg-teal-soft/50', iconColor: 'text-teal' },
  { title: 'AI Workflow Fit', icon: Workflow, bg: 'bg-navy-deep/5 dark:bg-cream/5', iconColor: 'text-navy-deep dark:text-cream' },
  { title: 'Support Needs', icon: HeartHandshake, bg: 'bg-gold-soft/60', iconColor: 'text-gold' },
  { title: 'Starting Point', icon: MapPin, bg: 'bg-teal-soft/60', iconColor: 'text-teal' },
];

export const WhatYouLearnSection = () => {
  return (
    <section className="relative py-14 sm:py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
            Outcomes
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-3">
            What you'll learn.
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            A practical, structured view of how you think and where to start.
          </p>
        </div>

        {/* Chip grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {CHIPS.map((chip) => {
            const Icon = chip.icon;
            return (
              <motion.div
                key={chip.title}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                className="group flex items-center gap-3 p-4 sm:p-5 rounded-xl bg-card border border-navy-deep/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${chip.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-[18px] h-[18px] ${chip.iconColor}`} strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-sm sm:text-[15px] font-medium text-foreground leading-snug">
                  {chip.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
