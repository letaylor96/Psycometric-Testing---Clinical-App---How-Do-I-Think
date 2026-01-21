import { motion } from 'framer-motion';
import { Brain, Zap, Clock, Sparkles, Target, Award, TrendingUp, Users, Shield, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onStart: () => void;
}

export const LandingHero = ({ onStart }: LandingHeroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-[120px]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        {/* Premium trust badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6 flex-wrap"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Award className="w-4 h-4" />
            Executive-Level Assessment
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium">
            <Shield className="w-4 h-4" />
            Research-Backed
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-2xl glass glow-primary mb-8 relative"
        >
          <Brain className="w-12 h-12 text-primary" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-secondary-foreground" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
        >
          <span className="text-foreground">What's Your</span>
          <br />
          <span className="text-gradient">Cognitive Edge?</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed"
        >
          The assessment top performers use to understand their mental strengths.
          Discover your <span className="text-primary font-semibold">cognitive archetype</span> and 
          how you compare to <span className="text-secondary font-semibold">high achievers</span>.
        </motion.p>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="flex items-center justify-center gap-6 mb-10 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>50K+ Professionals Tested</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/50" />
          <div className="hidden sm:flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            <span>Shared by Industry Leaders</span>
          </div>
        </motion.div>

        {/* What you'll discover - Premium grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto"
        >
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <p className="font-display font-semibold text-foreground mb-1">Cognitive DNA</p>
            <p className="text-muted-foreground text-sm text-center">Your unique mental fingerprint across 5 dimensions</p>
          </div>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border hover:border-secondary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-secondary" />
            </div>
            <p className="font-display font-semibold text-foreground mb-1">Executive Archetype</p>
            <p className="text-muted-foreground text-sm text-center">Your thinking style among top performers</p>
          </div>
          <div className="group flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border hover:border-accent/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <p className="font-display font-semibold text-foreground mb-1">Percentile Ranking</p>
            <p className="text-muted-foreground text-sm text-center">See how you stack up globally</p>
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
            <span>25 High-IQ Challenges</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-secondary" />
            <span>25 Min Timed Assessment</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-accent" />
            <span>Instant Premium Report</span>
          </div>
        </motion.div>

        {/* CTA Button - Premium styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
          <Button
            onClick={onStart}
            size="lg"
            className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-bold text-xl px-12 py-7 rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/20"
          >
            Discover Your Edge
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col items-center gap-3 mt-10"
        >
          <p className="text-muted-foreground/70 text-sm">
            No signup required • Results in under 30 minutes • 100% Free
          </p>
          <div className="flex items-center gap-4 text-muted-foreground/50 text-xs">
            <span>Based on cognitive science research</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Used by Fortune 500 professionals</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
