import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain, UserCheck, Lightbulb, Activity, Check, Lock, Sparkles, Crown, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';

interface AssessmentPreviewProps {
  type: AssessmentType;
  isFree: boolean;
  onStart: () => void;
  onBack: () => void;
}

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  personality: UserCheck,
  iq: Brain,
  cognitive: Lightbulb,
  adhd: Activity,
};

// What users get for free vs paid for each assessment
const assessmentTiers: Record<AssessmentType, { free: string[]; paid: string[] }> = {
  personality: {
    free: [
      'Your primary personality type',
      'Basic Big Five scores (OCEAN)',
      'Your Myers-Briggs type indicator',
      'Key strengths summary',
    ],
    paid: [
      'Deep facet-level personality analysis',
      'Leadership style breakdown',
      'Communication preferences',
      'Career fit recommendations',
      'Relationship compatibility insights',
      'Executive persona archetype',
    ],
  },
  iq: {
    free: [
      'Your IQ score estimate',
      'Global percentile ranking',
      'Basic cognitive category',
      'Pattern recognition score',
    ],
    paid: [
      'Detailed cognitive breakdown',
      'Verbal vs spatial intelligence split',
      'Processing speed analysis',
      'Problem-solving style profile',
      'Comparison to professional benchmarks',
      'LinkedIn-ready achievement badge',
    ],
  },
  cognitive: {
    free: [
      'Your cognitive style type',
      'Primary thinking pattern',
      'Processing style (linear/nonlinear)',
      'Basic strengths overview',
    ],
    paid: [
      'Full 6-dimension cognitive profile',
      'Hyperfocus pattern analysis',
      'Divergent thinking score',
      'Detail orientation metrics',
      'Personalized productivity strategies',
      'Cognitive archetype (e.g., "Visual Architect")',
    ],
  },
  adhd: {
    free: [
      'ADHD likelihood indicator',
      'Part A screening score',
      'Inattention vs Hyperactivity split',
      'Basic recommendations',
    ],
    paid: [
      'Full ASRS-v1.1 clinical report',
      'Domain-specific breakdown',
      'Symptom severity analysis',
      'Coping strategy recommendations',
      'When to seek professional help',
      'Workplace accommodation suggestions',
    ],
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

export const AssessmentPreview = ({ type, isFree, onStart, onBack }: AssessmentPreviewProps) => {
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
          <div className={`w-16 h-16 rounded-2xl bg-${info.color}/10 flex items-center justify-center mx-auto mb-4`}>
            <Icon className={`w-8 h-8 text-${info.color}`} />
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

        {/* Results comparison */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {/* Free tier */}
          <div className={`rounded-xl border p-5 ${isFree ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-border/50 bg-card/50'}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`px-2 py-1 rounded-full text-xs font-bold ${isFree ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                {isFree ? 'YOUR TIER' : 'FREE'}
              </div>
              {isFree && (
                <span className="text-emerald-400 text-xs font-medium">First test free!</span>
              )}
            </div>
            <h4 className="font-semibold text-foreground mb-3">Basic Results</h4>
            <ul className="space-y-2">
              {tiers.free.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paid tier */}
          <div className={`rounded-xl border p-5 ${!isFree ? 'border-primary/40 bg-primary/5 ring-1 ring-primary/20' : 'border-border/50 bg-card/50'}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="px-2 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1">
                <Crown className="w-3 h-3" />
                PREMIUM
              </div>
              <span className="text-foreground text-xs font-medium">$3</span>
            </div>
            <h4 className="font-semibold text-foreground mb-3">Full Report</h4>
            <ul className="space-y-2">
              {tiers.paid.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  {isFree ? (
                    <Lock className="w-4 h-4 text-muted-foreground/50 mt-0.5 shrink-0" />
                  ) : (
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  )}
                  <span className={isFree ? 'text-muted-foreground/50' : 'text-muted-foreground'}>{item}</span>
                </li>
              ))}
            </ul>
            {isFree && (
              <p className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border/50">
                Upgrade after completing to unlock full insights
              </p>
            )}
          </div>
        </motion.div>

        {/* Trust badges */}
        {!isFree && (
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
              <svg className="w-10 h-4" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.31 5.84H5.28L3.33 14.86L1.5 5.84H0L2.42 17.16H4.11L6.09 8.04L8.04 17.16H9.78L12.18 5.84H10.68L8.88 14.86L8.31 5.84Z" fill="currentColor" className="text-muted-foreground"/>
                <path d="M15.93 17.34C17.85 17.34 19.29 15.84 19.29 13.68C19.29 11.52 17.85 10.02 15.93 10.02C14.01 10.02 12.57 11.52 12.57 13.68C12.57 15.84 14.01 17.34 15.93 17.34ZM15.93 16.02C14.79 16.02 13.95 15.06 13.95 13.68C13.95 12.3 14.79 11.34 15.93 11.34C17.07 11.34 17.91 12.3 17.91 13.68C17.91 15.06 17.07 16.02 15.93 16.02Z" fill="currentColor" className="text-muted-foreground"/>
                <path d="M23.52 10.2L22.8 12.66C22.56 13.5 22.38 14.22 22.2 14.94H22.14C21.96 14.22 21.75 13.5 21.48 12.66L20.7 10.2H19.2L21.42 17.16H22.86L25.08 10.2H23.52Z" fill="currentColor" className="text-muted-foreground"/>
                <path d="M28.89 17.34C30.27 17.34 31.35 16.68 31.77 15.6L30.51 15.12C30.21 15.78 29.61 16.14 28.89 16.14C27.81 16.14 27.03 15.3 26.97 14.1H31.89V13.56C31.89 11.46 30.57 10.02 28.77 10.02C26.85 10.02 25.53 11.58 25.53 13.68C25.53 15.84 26.91 17.34 28.89 17.34ZM28.77 11.22C29.73 11.22 30.39 11.94 30.51 12.96H27.03C27.21 11.88 27.87 11.22 28.77 11.22Z" fill="currentColor" className="text-muted-foreground"/>
                <path d="M35.16 17.16H36.48V13.26C36.48 11.7 37.32 11.1 38.7 11.34V10.02C37.56 9.9 36.78 10.5 36.42 11.46H36.36L36.24 10.2H35.16V17.16Z" fill="currentColor" className="text-muted-foreground"/>
                <path d="M42.27 17.34C43.65 17.34 44.73 16.68 45.15 15.6L43.89 15.12C43.59 15.78 42.99 16.14 42.27 16.14C41.19 16.14 40.41 15.3 40.35 14.1H45.27V13.56C45.27 11.46 43.95 10.02 42.15 10.02C40.23 10.02 38.91 11.58 38.91 13.68C38.91 15.84 40.29 17.34 42.27 17.34ZM42.15 11.22C43.11 11.22 43.77 11.94 43.89 12.96H40.41C40.59 11.88 41.25 11.22 42.15 11.22Z" fill="currentColor" className="text-muted-foreground"/>
                <path d="M49.02 17.34C50.1 17.34 50.88 16.86 51.3 16.14H51.36L51.48 17.16H52.56V5.52H51.24V11.1H51.18C50.76 10.44 49.98 10.02 49.02 10.02C47.22 10.02 45.96 11.52 45.96 13.68C45.96 15.84 47.22 17.34 49.02 17.34ZM49.26 16.02C48.12 16.02 47.34 15.06 47.34 13.68C47.34 12.3 48.12 11.34 49.26 11.34C50.4 11.34 51.24 12.3 51.24 13.68C51.24 15.06 50.4 16.02 49.26 16.02Z" fill="currentColor" className="text-muted-foreground"/>
                <path d="M59.64 13.68C59.64 11.52 58.2 10.02 56.28 10.02C54.36 10.02 52.92 11.52 52.92 13.68C52.92 15.84 54.36 17.34 56.28 17.34C57.36 17.34 58.26 16.86 58.74 16.08L57.66 15.36C57.36 15.78 56.88 16.02 56.28 16.02C55.2 16.02 54.42 15.18 54.3 14.1H59.58C59.61 13.95 59.64 13.8 59.64 13.68ZM56.28 11.22C57.24 11.22 57.9 11.94 58.02 12.96H54.36C54.54 11.88 55.32 11.22 56.28 11.22Z" fill="currentColor" className="text-muted-foreground"/>
              </svg>
              <span className="text-muted-foreground">by Stripe</span>
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
            onClick={onStart}
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 py-6 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <p className="text-muted-foreground/70 text-sm mt-4">
            {isFree ? 'No payment required • Get basic results free' : 'Payment required after completion for full results'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
