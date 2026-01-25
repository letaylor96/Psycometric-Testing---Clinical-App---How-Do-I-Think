import { motion } from 'framer-motion';
import { Brain, Zap, Clock, Sparkles, Target, Award, TrendingUp, Users, Shield, Linkedin, ArrowRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onStart: () => void;
}

export const LandingHero = ({ onStart }: LandingHeroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/40 via-primary/20 to-transparent rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-secondary/40 via-secondary/20 to-transparent rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-accent/20 via-transparent to-transparent rounded-full blur-[100px]" 
        />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 max-w-5xl"
      >
        {/* Premium trust badges with glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8 flex-wrap"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary text-sm font-semibold shadow-lg shadow-primary/10 backdrop-blur-sm"
          >
            <Crown className="w-4 h-4" />
            Executive-Level Assessment
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 text-secondary text-sm font-semibold shadow-lg shadow-secondary/10 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4" />
            Research-Backed Methodology
          </motion.div>
        </motion.div>

        {/* Animated Icon with pulse ring */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 15 }}
          className="relative inline-flex items-center justify-center w-28 h-28 mb-10"
        >
          {/* Pulse rings */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-3xl bg-primary/20"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            className="absolute inset-0 rounded-3xl bg-primary/30"
          />
          {/* Main icon container */}
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-primary/30 flex items-center justify-center shadow-2xl shadow-primary/20">
            <Brain className="w-14 h-14 text-primary" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg shadow-secondary/30"
          >
            <Sparkles className="w-5 h-5 text-secondary-foreground" />
          </motion.div>
        </motion.div>

        {/* Title with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1]"
        >
          <span className="text-foreground">What's Your</span>
          <br />
          <motion.span 
            className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            Cognitive Edge?
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-muted-foreground text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed font-light"
        >
          The assessment <span className="text-foreground font-medium">top performers</span> use to understand their mental strengths.
          <br className="hidden md:block" />
          Discover your <span className="text-primary font-semibold">cognitive archetype</span> and 
          how you compare to <span className="text-secondary font-semibold">high achievers</span>.
        </motion.p>

        {/* Social proof with avatars */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-background flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {['JD', 'MK', 'AS', 'TR'][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">50,000+</p>
              <p className="text-xs text-muted-foreground">Professionals Tested</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-border" />
          <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            <span className="text-sm">Shared by Industry Leaders</span>
          </div>
        </motion.div>

        {/* What you'll discover - Premium cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 max-w-4xl mx-auto"
        >
          {[
            { icon: Target, title: 'Cognitive DNA', desc: 'Your unique mental fingerprint across 5 dimensions', color: 'primary' },
            { icon: Award, title: 'Executive Archetype', desc: 'Your thinking style among top performers', color: 'secondary' },
            { icon: TrendingUp, title: 'Percentile Ranking', desc: 'See how you stack up globally', color: 'accent' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative flex flex-col items-center p-7 rounded-2xl bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm border border-border hover:border-${item.color}/40 transition-all duration-500 shadow-xl shadow-black/5`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-${item.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`relative w-14 h-14 rounded-2xl bg-${item.color}/15 flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-${item.color}/20 transition-all duration-300`}
              >
                <item.icon className={`w-7 h-7 text-${item.color}`} />
              </motion.div>
              <p className="font-display font-bold text-lg text-foreground mb-2">{item.title}</p>
              <p className="text-muted-foreground text-sm text-center leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Zap, text: '25 High-IQ Challenges', color: 'primary' },
            { icon: Clock, text: '25 Min Timed Assessment', color: 'secondary' },
            { icon: Shield, text: 'Instant Premium Report', color: 'accent' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full bg-card/50 border border-border text-muted-foreground hover:text-foreground hover:border-${item.color}/30 transition-all duration-300`}
            >
              <item.icon className={`w-5 h-5 text-${item.color}`} />
              <span className="text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button - Premium styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="relative group"
        >
          {/* Animated glow */}
          <motion.div 
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" 
          />
          <Button
            onClick={onStart}
            size="lg"
            className="relative bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground font-display font-bold text-xl px-14 py-8 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Discover Your Edge
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
            />
          </Button>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
          <p className="text-muted-foreground text-sm font-medium">
            ✓ No signup required &nbsp;•&nbsp; ✓ Results in under 30 minutes &nbsp;•&nbsp; ✓ 100% Free
          </p>
          <div className="flex items-center gap-6 text-muted-foreground/60 text-xs">
            <span>Based on cognitive science research</span>
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            <span>Used by Fortune 500 professionals</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
