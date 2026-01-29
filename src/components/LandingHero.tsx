import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Clock, UserCheck, Lightbulb, Activity, ArrowRight, Check, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo, allAssessmentTypes } from '@/data/assessmentTypes';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { AuthButton } from '@/components/AuthButton';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
interface LandingHeroProps {
  onStart: () => void;
  onSelectAssessment: (type: AssessmentType) => void;
  onViewDashboard?: () => void;
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
}

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  personality: UserCheck,
  iq: Brain,
  cognitive: Lightbulb,
  adhd: Activity,
};

const badgeLabels: Partial<Record<AssessmentType, string>> = {
  personality: 'Most Popular',
  adhd: 'New',
};

export const LandingHero = ({ 
  onStart, 
  onSelectAssessment, 
  onViewDashboard,
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
}: LandingHeroProps) => {
  const completionStatus: Record<AssessmentType, boolean> = {
    personality: !!personalityResults,
    iq: !!iqResults,
    cognitive: !!cognitiveStyleResults,
    adhd: !!adhdResults,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-background">
      {/* Auth Button - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <AuthButton />
      </div>

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
        {/* Progress Indicator - shows after any test is completed */}
        <AssessmentProgress
          iqResults={iqResults ?? null}
          personalityResults={personalityResults ?? null}
          adhdResults={adhdResults ?? null}
          cognitiveStyleResults={cognitiveStyleResults ?? null}
          onSelectAssessment={onSelectAssessment}
          onViewDashboard={onViewDashboard}
        />

        {/* Key benefits - Marketing optimized with visual hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-10 flex-wrap"
        >
          {[
            { icon: Zap, text: 'Instant Results', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { icon: Gift, text: 'First Test Free', color: 'text-emerald-400', bg: 'bg-emerald-400/10', highlight: true },
            { icon: Clock, text: '~10 min each', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${item.bg} ${item.color} font-medium text-sm ${item.highlight ? 'ring-1 ring-emerald-400/30' : ''}`}
            >
              <item.icon className="w-4 h-4" />
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
          <span className="bg-gradient-to-r from-primary via-yellow to-accent bg-clip-text text-transparent">
            How I Think
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Scientifically-validated assessments for personality, IQ, cognitive style, and ADHD screening.
          <span className="text-foreground font-medium"> Choose one or take them all.</span>
        </motion.p>

        {/* Assessment cards - clickable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          {allAssessmentTypes.map((type, i) => {
            const info = assessmentInfo[type];
            const Icon = assessmentIcons[type];
            const badge = badgeLabels[type];
            
            return (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAssessment(type)}
                className="relative group p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80 transition-all text-left cursor-pointer"
              >
                {badge && (
                  <span className={`absolute -top-2 right-3 px-2 py-0.5 text-xs font-medium rounded-full ${badge === 'New' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {badge}
                  </span>
                )}
                <div className={`w-10 h-10 rounded-lg bg-${info.color}/10 flex items-center justify-center mb-3 group-hover:bg-${info.color}/20 transition-colors`}>
                  <Icon className={`w-5 h-5 text-${info.color}`} />
                </div>
                <p className="font-semibold text-foreground mb-1">{info.title}</p>
                <p className="text-muted-foreground text-sm mb-2">{info.framework}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                  <span>{info.questionCount} questions</span>
                  <span>•</span>
                  <span>{info.timeMinutes} min</span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Full Assessment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 py-7 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all"
          >
            Take Complete Assessment
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            All 4 assessments • ~50 minutes total • Comprehensive report
          </p>
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
            {['OCEAN Deep Profile', "Raven's Matrices", 'Neurodivergent Patterns', 'ASRS-v1.1'].map((name, i) => (
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
