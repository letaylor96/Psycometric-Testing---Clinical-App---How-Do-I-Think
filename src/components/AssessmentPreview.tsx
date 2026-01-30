import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain, UserCheck, Lightbulb, Activity, Check, X, Sparkles, Crown, Shield, CreditCard, Users, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';

interface AssessmentPreviewProps {
  type: AssessmentType;
  isFree: boolean;
  onStart: (tier: 'free' | 'premium') => void;
  onBack: () => void;
}

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  personality: UserCheck,
  iq: Brain,
  cognitive: Lightbulb,
  adhd: Activity,
};

// What users get for free vs paid for each assessment
const assessmentTiers: Record<AssessmentType, { 
  free: { included: string[]; excluded: string[] }; 
  paid: string[];
  premiumStats: { percentage: number; benefit: string };
}> = {
  personality: {
    free: {
      included: [
        'Basic personality type',
        'Simplified Big Five scores',
      ],
      excluded: [
        'Detailed facet analysis',
        'Leadership style insights',
        'Career recommendations',
        'Relationship compatibility',
        'Executive persona archetype',
      ],
    },
    paid: [
      'Full Big Five + all 30 facets',
      'Your Myers-Briggs type with confidence %',
      'Leadership & communication style',
      'Career fit recommendations',
      'Relationship compatibility matrix',
      'Your executive persona archetype',
      'Career Match Recommendations',
      'Shareable profile card',
    ],
    premiumStats: { percentage: 78, benefit: 'discovered career insights they never considered' },
  },
  iq: {
    free: {
      included: [
        'Approximate IQ range',
        'Basic percentile',
      ],
      excluded: [
        'Exact IQ score',
        'Cognitive breakdown',
        'Processing speed analysis',
        'Professional benchmarks',
        'Achievement badge',
      ],
    },
    paid: [
      'Precise IQ score (not just range)',
      'Global percentile with confidence interval',
      'Verbal vs spatial intelligence split',
      'Processing speed & working memory',
      'Comparison to 50+ professions',
      'Career Match Recommendations',
      'LinkedIn-ready achievement badge',
      'Mensa eligibility indicator',
    ],
    premiumStats: { percentage: 84, benefit: 'scored higher than they expected' },
  },
  cognitive: {
    free: {
      included: [
        'Primary thinking style',
        'Basic processing type',
      ],
      excluded: [
        'Full 6-dimension profile',
        'Hyperfocus analysis',
        'Productivity strategies',
        'Cognitive archetype',
        'Strengths deep-dive',
      ],
    },
    paid: [
      'Complete 6-dimension cognitive map',
      'Hyperfocus pattern analysis',
      'Divergent thinking score',
      'Sensory processing insights',
      'Personalized productivity strategies',
      'Your cognitive archetype title',
      'Career Match Recommendations',
      'Work environment recommendations',
    ],
    premiumStats: { percentage: 91, benefit: 'finally understood why they think differently' },
  },
  adhd: {
    free: {
      included: [
        'Basic ADHD indicator',
        'General attention score',
      ],
      excluded: [
        'Clinical-grade report',
        'Domain breakdown',
        'Severity analysis',
        'Coping strategies',
        'Professional guidance',
      ],
    },
    paid: [
      'Full ASRS-v1.1 clinical report',
      'Inattention vs Hyperactivity breakdown',
      'Symptom severity by domain',
      'Evidence-based coping strategies',
      'When to seek professional help',
      'Career Match Recommendations',
      'Workplace accommodation guide',
      'PDF report for healthcare providers',
    ],
    premiumStats: { percentage: 73, benefit: 'took their results to a healthcare provider' },
  },
};

const assessmentDescriptions: Record<AssessmentType, { tagline: string; what: string }> = {
  personality: {
    tagline: 'Discover what makes you uniquely you',
    what: 'This 30-question assessment maps your personality across the Big Five dimensions (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) and derives your Myers-Briggs type.',
  },
  iq: {
    tagline: 'Measure your cognitive potential',
    what: "This Mensa-style assessment uses 25 progressive pattern recognition puzzles based on Raven's Matrices to estimate your IQ and cognitive ranking.",
  },
  cognitive: {
    tagline: 'Understand how your mind processes information',
    what: 'This 25-question assessment explores thinking patterns often associated with neurodivergent minds, measuring dimensions like hyperfocus, divergent thinking, and sensory processing.',
  },
  adhd: {
    tagline: 'Explore your attention and focus patterns',
    what: "This screening uses the WHO's validated ASRS-v1.1 framework with 18 questions to assess attention patterns and identify potential ADHD indicators.",
  },
};

export const AssessmentPreview = ({ type, onStart, onBack }: AssessmentPreviewProps) => {
  // Default to premium (psychological: default effect)
  const [selectedTier, setSelectedTier] = useState<'free' | 'premium'>('premium');
  
  const info = assessmentInfo[type];
  const Icon = assessmentIcons[type];
  const tiers = assessmentTiers[type];
  const desc = assessmentDescriptions[type];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl z-10"
      >
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            {info.title}
          </h1>
          <p className="text-primary font-medium mb-2">{desc.tagline}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>{info.questionCount} questions</span>
            <span>•</span>
            <span>~{info.timeMinutes} minutes</span>
            <span>•</span>
            <span className="text-muted-foreground/70">{info.framework}</span>
          </div>
        </div>

        {/* What this test measures */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 mb-6"
        >
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            What this test measures
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {desc.what}
          </p>
        </motion.div>

        {/* Tier Selection Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
            <button
              onClick={() => setSelectedTier('free')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                selectedTier === 'free'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Free Version
              </span>
            </button>
            <button
              onClick={() => setSelectedTier('premium')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all relative ${
                selectedTier === 'premium'
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Crown className="w-4 h-4" />
                Premium Report — $3
              </span>
              {selectedTier !== 'premium' && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                  RECOMMENDED
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Tier Content */}
        <AnimatePresence mode="wait">
          {selectedTier === 'free' ? (
            <motion.div
              key="free"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border/50 bg-card/30 p-6 mb-6"
            >
              {/* Free Version Features */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-semibold text-foreground">Free Version</span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {tiers.free.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Premium Version Features */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="text-lg font-semibold text-foreground">Premium Version</span>
                  <span className="text-primary font-medium">$3</span>
                </div>
                <ul className="space-y-2">
                  {tiers.paid.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="premium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border-2 border-primary/40 bg-gradient-to-b from-primary/5 to-transparent p-6 mb-6 relative overflow-hidden"
            >
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-white text-xs font-bold px-4 py-1 rounded-bl-lg flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                MOST POPULAR
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-semibold text-foreground">Full Premium Report</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground line-through">$9</span>
                  <span className="text-primary font-bold">$3</span>
                </div>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span><strong className="text-foreground">2,847</strong> people unlocked full insights this week</span>
              </div>
              
              <ul className="space-y-2 mb-4">
                {tiers.paid.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Value proposition */}
              <div className="flex items-center gap-3 pt-4 border-t border-primary/20">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Instant results</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust badges - Always show for premium */}
        {selectedTier === 'premium' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-center gap-6 mb-6 py-4 px-6 rounded-xl bg-muted/30 border border-border/30"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-12 h-5" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4 6.6C5.28 6.6 5.16 6.66 5.1 6.78L2.4 12.6C2.34 12.72 2.34 12.84 2.4 12.96L5.1 18.78C5.16 18.9 5.28 18.96 5.4 18.96H7.2C7.44 18.96 7.62 18.72 7.5 18.48L5.04 13.08H9.6V12.48H5.04L7.5 7.08C7.62 6.84 7.44 6.6 7.2 6.6H5.4Z" fill="#635BFF"/>
                <path d="M14.7 10.2C13.02 10.2 11.7 11.52 11.7 13.2V13.8C11.7 15.48 13.02 16.8 14.7 16.8C15.72 16.8 16.62 16.32 17.16 15.54L16.02 14.82C15.72 15.24 15.24 15.48 14.7 15.48C13.86 15.48 13.14 14.88 13.02 14.1H17.52V13.5C17.52 11.7 16.32 10.2 14.7 10.2ZM13.02 12.9C13.14 12.06 13.8 11.52 14.7 11.52C15.54 11.52 16.14 12.12 16.26 12.9H13.02Z" fill="#635BFF"/>
                <path d="M22.38 10.2C21.36 10.2 20.52 10.68 20.1 11.4V10.38H18.72V19.8H20.16V15.96C20.58 16.56 21.36 16.98 22.32 16.98C24 16.98 25.32 15.6 25.32 13.56C25.32 11.52 24.06 10.2 22.38 10.2ZM22.08 15.54C21.12 15.54 20.28 14.76 20.16 13.68V13.44C20.28 12.36 21.12 11.64 22.08 11.64C23.16 11.64 23.88 12.48 23.88 13.56C23.88 14.7 23.16 15.54 22.08 15.54Z" fill="#635BFF"/>
              </svg>
              <span className="text-muted-foreground font-medium">Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Secure checkout</span>
            </div>
          </motion.div>
        )}

        {/* Start CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={() => onStart(selectedTier)}
            size="lg"
            className={`group font-semibold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all ${
              selectedTier === 'premium' 
                ? 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-primary/25 hover:shadow-primary/30'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            {selectedTier === 'premium' ? (
              <>
                Start Premium Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </>
            ) : (
              <>
                Start Free Version
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </Button>
          <p className="text-muted-foreground/70 text-sm mt-4">
            {selectedTier === 'premium' 
              ? 'Payment processed securely after you complete the assessment'
              : 'Limited insights • Upgrade anytime for full report'
            }
          </p>
        </motion.div>

        {/* Legal Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-6 border-t border-border/30"
        >
          <p className="text-xs text-muted-foreground/60 text-center leading-relaxed max-w-lg mx-auto">
            <strong className="text-muted-foreground/80">For educational and entertainment purposes only.</strong>{' '}
            This assessment is not a medical or psychological diagnostic tool and does not constitute professional advice. 
            Results should not be used for clinical decisions. If you have concerns about your mental health, 
            please consult a qualified healthcare professional.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
