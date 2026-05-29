import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain, UserCheck, Check, Sparkles, Crown, Zap, Clock, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';

interface AssessmentPreviewProps {
  type: AssessmentType;
  onStart: (tier: 'free' | 'premium') => void;
  onBack: () => void;
}

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  'cognitive-profile': Compass,
  personality: UserCheck,
  iq: Brain,
  neurodivergent: Zap,
  depth: Sparkles,
};

const assessmentTiers: Record<AssessmentType, {
  paid: string[];
}> = {
  'cognitive-profile': {
    paid: [
      'Eight cognitive archetypes with primary + secondary match',
      'Ten category scores across the full profile',
      'Strengths, friction points, and AI workflow recommendations',
      'Suggested starting point in Applied AI Works Canada',
      'Practitioner-ready report layout',
    ],
  },
  personality: {
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
  },
  iq: {
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
  },
  neurodivergent: {
    paid: [
      'Complete 6-dimension cognitive map',
      'Full ASRS-v1.1 clinical screening report',
      'Inattention vs Hyperactivity breakdown',
      'Hyperfocus pattern analysis',
      'Integrated neurodivergent profile',
      'Evidence-based coping strategies',
      'Career Match Recommendations',
      'Workplace accommodation guide',
    ],
  },
  depth: {
    paid: [
      'Choose your framework: Freud, Jung, or Nietzsche',
      'AI-powered depth psychology analysis',
      'Interactive clarification for deeper insight',
      'Complete psychological structure mapping',
      'Defense mechanisms & coping patterns',
      'Unconscious themes & conflicts',
      'Personalized growth recommendations',
      'Exportable clinical summary',
    ],
  },
};

const assessmentDescriptions: Record<AssessmentType, { tagline: string; what: string; isTimed?: boolean }> = {
  'cognitive-profile': {
    tagline: 'A structured profile of how you think, learn, and work with AI',
    what: 'Forty self-report items grouped into ten categories — information processing, learning style, problem-solving, communication, structure, ambiguity tolerance, divergent thinking, AI readiness, support preferences, and program-fit. Grounded in established psychometric instruments.',
  },
  personality: {
    tagline: 'Discover what makes you uniquely you',
    what: 'This 30-question assessment maps your personality across the Big Five dimensions (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) and derives your Myers-Briggs type.',
  },
  iq: {
    tagline: 'Measure your cognitive potential',
    what: "This Mensa-style assessment uses 25 progressive pattern recognition puzzles based on Raven's Matrices to estimate your IQ and cognitive ranking.",
    isTimed: true,
  },
  neurodivergent: {
    tagline: 'Understand your unique cognitive style and attention patterns',
    what: 'This comprehensive 38-question assessment combines cognitive style profiling (thinking patterns, hyperfocus, divergent thinking) with the WHO ASRS-v1.1 clinical ADHD screening.',
  },
  depth: {
    tagline: 'Journey into the depths of your unconscious mind',
    what: 'Choose your philosophical lens—Freud, Jung, or Nietzsche—and explore your unconscious patterns through 20 free-form questions analyzed by AI using rigorous psychoanalytic frameworks.',
  },
};


export const AssessmentPreview = ({ type, onStart, onBack }: AssessmentPreviewProps) => {
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
          
          {/* Timed Assessment Warning - IQ Only */}
          {desc.isTimed && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400"
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Timed Assessment — {info.timeMinutes} minute limit</span>
            </motion.div>
          )}
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

        {/* Features included */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-primary/40 bg-gradient-to-b from-primary/5 to-transparent p-6 mb-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-lg font-semibold text-foreground">Full Report Included</span>
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

        {/* Start CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={() => onStart('free')}
            size="lg"
            className="group font-semibold text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-primary/25 hover:shadow-primary/30"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <p className="text-muted-foreground text-sm mt-3">100% free. No signup required to begin.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
