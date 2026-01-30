import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Crown, Check, Brain, Target, MessageCircle, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PremiumGate } from '@/components/PremiumGate';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';

interface PremiumFeatureTeaserProps {
  className?: string;
}

const premiumFeatures = [
  { 
    icon: Crown, 
    title: 'Historical Mind Match', 
    description: 'Discover which great minds from history share your cognitive patterns',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  { 
    icon: FileText, 
    title: 'Therapist Report', 
    description: 'Generate a professional clinical summary for healthcare providers',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  { 
    icon: MessageCircle, 
    title: 'Ask AI About Results', 
    description: 'Get personalized insights and answers about your cognitive profile',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
  },
  { 
    icon: Sparkles, 
    title: 'Cross-Test Synergy Analysis', 
    description: 'See how your results across all assessments work together',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
];

export const PremiumFeatureTeaser = ({ className }: PremiumFeatureTeaserProps) => {
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | undefined>();
  const { hasPremiumAccess } = usePremiumAccess();

  if (hasPremiumAccess) {
    return null; // Don't show teaser if already premium
  }

  const handleFeatureClick = (featureTitle: string) => {
    setSelectedFeature(featureTitle);
    setGateOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`card-elevated rounded-2xl p-6 border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent ${className}`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Unlock Full Insights</h3>
            <p className="text-muted-foreground text-sm">Get deeper analysis with Premium</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {premiumFeatures.map((feature, i) => (
            <motion.button
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              onClick={() => handleFeatureClick(feature.title)}
              className={`group relative p-4 rounded-xl ${feature.bgColor} border ${feature.borderColor} text-left hover:scale-[1.02] transition-all`}
            >
              {/* Lock icon */}
              <div className="absolute top-3 right-3 opacity-50">
                <Lock className="w-3 h-3 text-muted-foreground" />
              </div>
              
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${feature.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={() => setGateOpen(true)}
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-6"
        >
          <Crown className="w-4 h-4 mr-2" />
          Unlock All Premium Features
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <p className="text-center text-muted-foreground text-xs mt-3">
          One-time payment · Lifetime access · All assessments included
        </p>
      </motion.div>

      <PremiumGate
        isOpen={gateOpen}
        onClose={() => setGateOpen(false)}
        feature={selectedFeature}
      />
    </>
  );
};
