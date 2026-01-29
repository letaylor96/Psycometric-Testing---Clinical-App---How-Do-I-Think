import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain, UserCheck, Lightbulb, Activity, Check, Lock, Sparkles, Crown } from 'lucide-react';
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
