import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Clock, UserCheck, Lightbulb, Target, Activity, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onStart: () => void;
}

const assessments = [
  { 
    icon: UserCheck, 
    title: 'Big Five Personality', 
    desc: 'OCEAN model assessment',
    badge: 'Most Popular',
    color: 'primary'
  },
  { 
    icon: Brain, 
    title: 'IQ Assessment', 
    desc: 'Raven\'s-style matrices',
    badge: null,
    color: 'accent'
  },
  { 
    icon: Lightbulb, 
    title: 'Cognitive Style', 
    desc: 'Divergent thinking profile',
    badge: null,
    color: 'primary'
  },
  { 
    icon: Activity, 
    title: 'ADHD Screening', 
    desc: 'Based on ASRS-v1.1',
    badge: 'New',
    color: 'accent'
  },
];

export const LandingHero = ({ onStart }: LandingHeroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 max-w-5xl w-full"
      >
        {/* Key benefits - prominent */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          {[
            { icon: Zap, text: 'Instant Results' },
            { icon: UserCheck, text: 'No Sign Up Required' },
            { icon: Clock, text: '100% Free' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-primary font-medium">
              <item.icon className="w-5 h-5" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05]"
        >
          <span className="text-foreground">Know Yourself</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Completely
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          A comprehensive suite of scientifically-validated assessments. 
          Get your personality profile, IQ score, cognitive style, and ADHD screening — 
          <span className="text-foreground font-medium"> all in one session</span>.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 py-7 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all"
          >
            Start Your Assessment
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            Takes ~25 minutes • Results delivered instantly • No email required
          </p>
        </motion.div>

        {/* Assessment cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14"
        >
          {assessments.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              whileHover={{ y: -4 }}
              className="relative group p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all text-left"
            >
              {item.badge && (
                <span className={`absolute -top-2 right-3 px-2 py-0.5 text-xs font-medium rounded-full ${item.badge === 'New' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
                  {item.badge}
                </span>
              )}
              <div className={`w-10 h-10 rounded-lg bg-${item.color}/10 flex items-center justify-center mb-3`}>
                <item.icon className={`w-5 h-5 text-${item.color}`} />
              </div>
              <p className="font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Research backing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-muted-foreground/70 text-sm font-medium">Backed by established research</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted-foreground/50 text-xs">
            {['Big Five / OCEAN Model', 'Raven\'s Progressive Matrices', 'Guilford\'s Divergent Thinking', 'ASRS-v1.1 (WHO)'].map((name, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-primary/70" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
