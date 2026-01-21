import { motion } from 'framer-motion';
import { Brain, Zap, Clock, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onStart: () => void;
}

export const LandingHero = ({ onStart }: LandingHeroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-3xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          100% Free • Detailed Results
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass glow-primary mb-8"
        >
          <Brain className="w-10 h-10 text-primary" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          <span className="text-foreground">Discover Your </span>
          <span className="text-gradient">Thinking Style</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Not just another IQ test. Discover your cognitive strengths across 5 categories 
          and find out what kind of <span className="text-primary font-medium">divergent thinker</span> you are.
        </motion.p>

        {/* What you'll discover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto text-left"
        >
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border">
            <Target className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">5 Cognitive Categories</p>
              <p className="text-muted-foreground text-xs">Verbal, Numerical, Spatial, Pattern, Logical</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border">
            <Sparkles className="w-5 h-5 text-secondary mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Divergent Thinking Profile</p>
              <p className="text-muted-foreground text-xs">Are you a Catalyst, Maverick, or Strategist?</p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="w-5 h-5 text-primary" />
            <span>25 Questions</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-secondary" />
            <span>8 Min Timer</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Brain className="w-5 h-5 text-accent" />
            <span>Personalized Insights</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-semibold text-lg px-10 py-6 rounded-xl glow-primary hover:scale-105 transition-transform duration-300"
          >
            Start Free Assessment
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-muted-foreground/60 text-sm mt-8"
        >
          No signup required • Results shown instantly
        </motion.p>
      </motion.div>
    </div>
  );
};
