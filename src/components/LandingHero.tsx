import { motion } from 'framer-motion';
import { Brain, Target, Award, TrendingUp, Shield, Linkedin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onStart: () => void;
}

export const LandingHero = ({ onStart }: LandingHeroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-background">
      {/* Premium dark background with subtle gradients */}
      <div className="absolute inset-0">
        {/* Main gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[80px]" />
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl"
      >
        {/* Premium badge with glow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm text-sm text-primary mb-10"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Trusted by 50,000+ executives worldwide</span>
        </motion.div>

        {/* Title with gradient accent */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-7 leading-[1.05]"
        >
          <span className="text-foreground">Discover Your</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Cognitive Edge
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The research-backed assessment top performers use to unlock their 
          executive archetype and benchmark against global leaders.
        </motion.p>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col items-center gap-5 mb-16"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 py-7 rounded-xl shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]"
          >
            <span className="flex items-center gap-2.5">
              Start Free Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Free</span>
            <span className="text-border">•</span>
            <span>25 minutes</span>
            <span className="text-border">•</span>
            <span>No signup required</span>
          </div>
        </motion.div>

        {/* Feature cards with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14"
        >
          {[
            { icon: Target, title: 'Cognitive Profile', desc: '5 dimensions of mental ability', color: 'primary' },
            { icon: Award, title: 'Executive Archetype', desc: 'Your leadership thinking style', color: 'accent' },
            { icon: TrendingUp, title: 'Global Percentile', desc: 'Benchmark against peers', color: 'primary' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-${item.color}/10 flex items-center justify-center mb-4 group-hover:bg-${item.color}/15 transition-colors`}>
                <item.icon className={`w-5 h-5 text-${item.color}`} />
              </div>
              <p className="font-semibold text-foreground mb-1.5">{item.title}</p>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-8 text-muted-foreground/70 text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Research-backed methodology</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border" />
          <div className="hidden sm:flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            <span>LinkedIn-ready results</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
