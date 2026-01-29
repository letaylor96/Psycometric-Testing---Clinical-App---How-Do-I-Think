import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Clock, UserCheck, Lightbulb, Activity, ArrowRight, Check, Gift, Users, TrendingUp, Lock, Unlock } from 'lucide-react';
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

// Social proof - generates believable random numbers
const generateSocialProof = () => {
  const base = 2847;
  const variance = Math.floor(Math.random() * 200);
  return base + variance;
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
  const [todayCount, setTodayCount] = useState(generateSocialProof());
  
  // Simulate live activity (social proof + urgency)
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayCount(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const completionStatus: Record<AssessmentType, boolean> = {
    personality: !!personalityResults,
    iq: !!iqResults,
    cognitive: !!cognitiveStyleResults,
    adhd: !!adhdResults,
  };

  const completedCount = Object.values(completionStatus).filter(Boolean).length;
  const hasStarted = completedCount > 0;

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

        {/* SOCIAL PROOF - Bandwagon Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-emerald-400 text-sm font-medium">
              <span className="font-bold">{todayCount.toLocaleString()}</span> people assessed today
            </span>
          </div>
        </motion.div>

        {/* Key benefits - Optimized with value hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-8 flex-wrap"
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

        {/* Subtitle - CURIOSITY GAP */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4"
        >
          Discover what 97% of people don't know about themselves.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground/70 text-base max-w-xl mx-auto mb-10"
        >
          Scientifically-validated assessments for personality, IQ, cognitive style & ADHD screening.
        </motion.p>

        {/* Assessment cards with UNLOCK/LOCK visual + ANCHORING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-6"
        >
          {allAssessmentTypes.map((type, i) => {
            const info = assessmentInfo[type];
            const Icon = assessmentIcons[type];
            const badge = badgeLabels[type];
            const isCompleted = completionStatus[type];
            
            return (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAssessment(type)}
                className={`relative group p-5 rounded-xl border backdrop-blur-sm transition-all text-left cursor-pointer ${
                  isCompleted 
                    ? 'border-emerald-500/40 bg-emerald-500/5' 
                    : 'border-border/50 bg-card/50 hover:border-primary/40 hover:bg-card/80'
                }`}
              >
                {/* Badge */}
                {badge && !isCompleted && (
                  <span className={`absolute -top-2 right-3 px-2 py-0.5 text-xs font-medium rounded-full ${badge === 'New' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {badge}
                  </span>
                )}

                {/* Completed check */}
                {isCompleted && (
                  <span className="absolute -top-2 right-3 px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500 text-white flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Done
                  </span>
                )}

                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isCompleted ? 'bg-emerald-500/20' : `bg-${info.color}/10 group-hover:bg-${info.color}/20`
                }`}>
                  <Icon className={`w-5 h-5 ${isCompleted ? 'text-emerald-400' : `text-${info.color}`}`} />
                </div>
                <p className="font-semibold text-foreground mb-1">{info.title}</p>
                <p className="text-muted-foreground text-sm mb-2">{info.framework}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                  <span>{info.questionCount} questions • {info.timeMinutes} min</span>
                  {isCompleted && (
                    <span className="text-emerald-400 font-medium">Complete</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ANCHORING - Bundle savings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm">
              <span className="text-muted-foreground line-through">$12</span>
              <span className="text-foreground font-bold ml-2">$9.99 for all 4</span>
              <span className="text-emerald-400 font-medium ml-2">Save 17%</span>
            </span>
          </div>
        </motion.div>

        {/* Full Assessment CTA - LOSS AVERSION */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onStart}
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 py-7 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all"
            >
              {hasStarted ? 'Continue Your Assessment' : 'Start Free Assessment'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              onClick={onStart}
              size="lg"
              className="group bg-gradient-to-r from-yellow to-yellow/80 hover:from-yellow/90 hover:to-yellow/70 text-yellow-foreground font-semibold text-lg px-10 py-7 rounded-xl shadow-lg shadow-yellow/25 hover:shadow-xl hover:shadow-yellow/30 hover:scale-[1.02] transition-all"
            >
              Start Paid Assessment
              <Sparkles className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            {hasStarted 
              ? `${completedCount}/4 complete • Unlock your full Cognitive DNA report` 
              : 'Free: Limited insights • Paid: Full premium report'
            }
          </p>
        </motion.div>

        {/* INCOMPLETE PROFILE warning - ZEIGARNIK EFFECT */}
        {hasStarted && completedCount < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mb-10 max-w-md mx-auto"
          >
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-left">
                  <p className="text-amber-300 font-medium text-sm">Your profile is incomplete</p>
                  <p className="text-amber-400/70 text-xs mt-1">
                    Complete all 4 assessments to unlock cross-test insights, synergy profiles, and your full Career Intelligence Report.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Research backing - AUTHORITY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-muted-foreground/70 text-sm font-medium">Backed by peer-reviewed research</p>
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
