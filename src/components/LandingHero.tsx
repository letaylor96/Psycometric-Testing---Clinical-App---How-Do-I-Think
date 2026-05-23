import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Brain, Lightbulb, Sparkles, Target, Zap, Crown, MessageCircle, FileText, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo, allAssessmentTypes } from '@/data/assessmentTypes';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { AuthButton } from '@/components/AuthButton';
import { HomeFAQ } from '@/components/HomeFAQ';
import { SEOFooter } from '@/components/SEOFooter';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useDiscoverMyMind } from '@/hooks/useDiscoverMyMind';
import { DiscoverMyMindSpine } from '@/components/DiscoverMyMindSpine';
import { cn } from '@/lib/utils';

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  personality: Target,
  iq: Brain,
  neurodivergent: Zap,
  depth: Sparkles,
};

const assessmentGradients: Record<AssessmentType, { bg: string; border: string; text: string; icon: string }> = {
  iq: { bg: 'from-blue-500/10 to-cyan-500/5', border: 'border-blue-500/25 hover:border-blue-500/50', text: 'text-blue-400', icon: 'bg-blue-500/15' },
  personality: { bg: 'from-amber-500/10 to-orange-500/5', border: 'border-amber-500/25 hover:border-amber-500/50', text: 'text-amber-400', icon: 'bg-amber-500/15' },
  neurodivergent: { bg: 'from-emerald-500/10 to-teal-500/5', border: 'border-emerald-500/25 hover:border-emerald-500/50', text: 'text-emerald-400', icon: 'bg-emerald-500/15' },
  depth: { bg: 'from-purple-500/10 to-violet-500/5', border: 'border-purple-500/25 hover:border-purple-500/50', text: 'text-purple-400', icon: 'bg-purple-500/15' },
};

// Inline sample question for instant engagement
const SAMPLE_QUESTION = {
  question: `2,  4,  8,  16,  __`,
  options: ['24', '32', '20', '18'],
  correctAnswer: 1,
  explanation: 'Each number doubles: 2×2=4, 4×2=8, 8×2=16, 16×2=32',
};

interface LandingHeroProps {
  onStart: () => void;
  onSelectAssessment: (type: AssessmentType) => void;
  onViewDashboard?: () => void;
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
}

export const LandingHero = ({ 
  onStart, 
  onSelectAssessment, 
  onViewDashboard,
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
}: LandingHeroProps) => {
  const { hasPremiumAccess } = usePremiumAccess();
  const [showAbout, setShowAbout] = useState(false);
  const [teaserAnswer, setTeaserAnswer] = useState<number | null>(null);
  const [teaserRevealed, setTeaserRevealed] = useState(false);

  const completionStatus: Record<AssessmentType, boolean> = {
    personality: !!personalityResults,
    iq: !!iqResults,
    neurodivergent: !!cognitiveStyleResults,
    depth: false,
  };

  const completedCount = Object.values(completionStatus).filter(Boolean).length;
  const hasStarted = completedCount > 0;

  const completedAssessments = (Object.entries(completionStatus) as [AssessmentType, boolean][])
    .filter(([, done]) => done)
    .map(([t]) => t);
  const mapStatus = useDiscoverMyMind(completedAssessments);

  const handleTeaserAnswer = (index: number) => {
    if (teaserRevealed) return;
    setTeaserAnswer(index);
    setTeaserRevealed(true);
  };

  const teaserIsCorrect = teaserAnswer === SAMPLE_QUESTION.correctAnswer;

  // Secondary assessments (everything except IQ)
  const secondaryAssessments: AssessmentType[] = ['personality', 'neurodivergent', 'depth'];

  const assessmentTooltips: Record<AssessmentType, string> = {
    iq: 'Mensa-style pattern recognition & abstract reasoning',
    personality: 'Big Five traits + Myers-Briggs archetype — what makes you, you',
    neurodivergent: 'Cognitive style + clinical ADHD screening (ASRS-v1.1)',
    depth: 'Psychoanalytic-style analysis through Freud, Jung, or Nietzsche',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-yellow" />
            </div>
            <span className="font-serif text-base sm:text-lg font-semibold text-foreground tracking-tight">
              How Do I Think
            </span>
          </div>
          <AuthButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-6 sm:pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow/[0.04] via-transparent to-transparent" />
        <div className="absolute top-40 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-yellow/5 rounded-full blur-[60px] sm:blur-[100px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Progress bar for returning users */}
          {hasStarted && (
            <div className="mb-4 sm:mb-6">
              <AssessmentProgress
                iqResults={iqResults ?? null}
                personalityResults={personalityResults ?? null}
                adhdResults={adhdResults ?? null}
                cognitiveStyleResults={cognitiveStyleResults ?? null}
                onSelectAssessment={onSelectAssessment}
                onViewDashboard={onViewDashboard}
              />
            </div>
          )}

          {/* Headline */}
          <div className="text-center mb-5 sm:mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-2 sm:mb-3"
            >
              How Do I <span className="text-primary">Think?</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            >
              Uncover How Your Mind Works & How to Set Yourself Up for Success
            </motion.p>
          </div>

          {/* ===== MAP MY MIND — Unified Guided Funnel ===== */}
          <DiscoverMyMindSpine
            status={mapStatus}
            onStart={onSelectAssessment}
            onViewDashboard={onViewDashboard}
          />



          {/* ===== PRIMARY CTA: Interactive Quiz Teaser ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-lg mx-auto mb-6 sm:mb-10"
          >
            <div className="bg-card border border-blue-500/20 rounded-2xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
              
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                  <Brain className="w-3.5 h-3.5" />
                  Try it now — free
                </div>
                <span className="text-muted-foreground/50 text-xs">25 questions · 10 min</span>
              </div>

              {/* Question */}
              <p className="text-muted-foreground text-xs mb-2">What comes next?</p>
              <p className="font-mono text-lg sm:text-xl text-foreground mb-5 tracking-wider">
                {SAMPLE_QUESTION.question}
              </p>

              {/* Answer grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
                {SAMPLE_QUESTION.options.map((option, index) => {
                  const isSelected = teaserAnswer === index;
                  const isCorrectOption = index === SAMPLE_QUESTION.correctAnswer;
                  
                  let style = 'border-border hover:border-blue-500/50 hover:bg-blue-500/5';
                  if (teaserRevealed) {
                    if (isCorrectOption) {
                      style = 'border-emerald-500 bg-emerald-500/10';
                    } else if (isSelected && !isCorrectOption) {
                      style = 'border-red-500 bg-red-500/10';
                    } else {
                      style = 'border-border opacity-40';
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleTeaserAnswer(index)}
                      disabled={teaserRevealed}
                      whileHover={!teaserRevealed ? { scale: 1.05 } : {}}
                      whileTap={!teaserRevealed ? { scale: 0.95 } : {}}
                      className={cn(
                        'p-3 rounded-xl border-2 text-base sm:text-lg font-mono font-bold text-foreground transition-all',
                        style,
                        !teaserRevealed && 'cursor-pointer'
                      )}
                    >
                      {option}
                      {teaserRevealed && isCorrectOption && (
                        <Check className="w-3 h-3 text-emerald-500 mx-auto mt-1" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Result or prompt */}
              <AnimatePresence mode="wait">
                {teaserRevealed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <p className={cn(
                      'text-sm font-medium',
                      teaserIsCorrect ? 'text-emerald-500' : 'text-amber-500'
                    )}>
                      {teaserIsCorrect ? '✓ Correct!' : 'Not quite.'} {SAMPLE_QUESTION.explanation}
                    </p>
                    <Button
                      onClick={() => onSelectAssessment('iq')}
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 sm:py-6 text-sm sm:text-base"
                    >
                      {teaserIsCorrect ? 'Take the Full 25-Question Test' : 'Try the Full Assessment'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground text-xs"
                  >
                    Tap an answer — no sign-up needed
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ===== SECONDARY ASSESSMENTS ===== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-center text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
              Or explore our other assessments
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto">
              {secondaryAssessments.map((type) => {
                const info = assessmentInfo[type];
                const Icon = assessmentIcons[type];
                const isCompleted = completionStatus[type];
                const isPremiumOnly = info.isPremiumOnly;
                const colors = assessmentGradients[type];

                return (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectAssessment(type)}
                    className={cn(
                      'group relative text-center p-3 sm:p-4 rounded-xl border bg-gradient-to-br transition-all duration-200',
                      colors.bg,
                      isCompleted ? 'border-emerald-500/40 ring-1 ring-emerald-500/20' : colors.border
                    )}
                  >
                    {/* Thought bubble tooltip */}
                    <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 z-20 w-48 sm:w-52">
                      <div className="relative bg-popover border border-border rounded-2xl px-3 py-2 shadow-xl">
                        <p className="text-[11px] sm:text-xs text-foreground leading-snug">
                          {assessmentTooltips[type]}
                        </p>
                        {/* Bubble tail dots */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-popover border-r border-b border-border rotate-45" />
                        <div className="absolute -bottom-3 left-[calc(50%-10px)] w-1.5 h-1.5 rounded-full bg-popover border border-border" />
                        <div className="absolute -bottom-5 left-[calc(50%-14px)] w-1 h-1 rounded-full bg-popover border border-border" />
                      </div>
                    </div>

                    {isCompleted && (
                      <div className="absolute top-1.5 right-1.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                        </div>
                      </div>
                    )}
                    {isPremiumOnly && !isCompleted && (
                      <div className="absolute top-1.5 right-1.5">
                        <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Crown className="w-2.5 h-2.5 text-purple-400" />
                        </div>
                      </div>
                    )}

                    <div className={cn('w-8 h-8 sm:w-10 sm:h-10 rounded-lg mx-auto mb-2', colors.icon, 'flex items-center justify-center')}>
                      <Icon className={cn('w-4 h-4 sm:w-5 sm:h-5', colors.text)} />
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-semibold text-foreground leading-tight group-hover:text-yellow transition-colors">
                      {info.title}
                    </h3>
                    <span className="text-muted-foreground/50 text-[9px] sm:text-[10px] mt-1 block">
                      {info.questionCount}q · {info.timeMinutes}m
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Completion progress for returning users */}
          {hasStarted && completedCount < 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-4">
              <p className="text-muted-foreground text-xs sm:text-sm">
                <span className="text-foreground font-medium">{completedCount}/4 complete</span>
                {' '}— finish all four for your integrated profile.
              </p>
            </motion.div>
          )}

          {!hasPremiumAccess && !hasStarted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-muted-foreground/50 text-xs mt-4"
            >
              First assessment free · No sign-up required
            </motion.p>
          )}
        </div>
      </section>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-2xl w-full bg-card border border-yellow/20 rounded-xl p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAbout(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-yellow" />
                </div>
              </div>
              <p className="text-yellow text-sm font-medium tracking-widest uppercase mb-4 text-center">
                About Our Assessments
              </p>
              <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-relaxed text-center">
                Four validated instruments providing a comprehensive analysis of your cognitive 
                architecture, personality structure, and neurological processing patterns.
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Insights Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-background via-purple-500/[0.03] to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              AI-Powered Insights
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 sm:mb-4">
              Go Beyond the Numbers
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
              After completing your assessments, unlock powerful AI-driven tools to 
              understand your unique cognitive profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="p-5 sm:p-8 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Historical Mind Match</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">Discover which great minds from history share your cognitive patterns.</p>
              <span className="text-amber-500 text-xs sm:text-sm font-medium">20+ historical figures</span>
            </div>

            <div className="p-5 sm:p-8 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Therapist Report</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">Professional clinical summary for mental health providers.</p>
              <span className="text-emerald-500 text-xs sm:text-sm font-medium">Export-ready format</span>
            </div>

            <div className="p-5 sm:p-8 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Ask AI About Results</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">Chat with AI to understand what your results mean for your life.</p>
              <span className="text-violet-500 text-xs sm:text-sm font-medium">Personalized insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-12 sm:py-20 bg-card border-y border-yellow/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-yellow text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">Scientific Foundation</p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4 sm:mb-6">Research-Based Methodology</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
              Our assessments are built on decades of peer-reviewed research in cognitive psychology, psychometrics, and neuroscience.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { title: 'Big Five Model', icon: Target, description: 'The most validated personality framework in modern psychology.' },
              { title: "Raven's Matrices", icon: Brain, description: 'Non-verbal assessment of fluid intelligence used globally.' },
              { title: 'ASRS-v1.1', icon: Zap, description: 'WHO screening for attention patterns.' },
              { title: 'Cognitive Load', icon: Lightbulb, description: 'How you process information.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-yellow/10 border border-yellow/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow" />
                </div>
                <h3 className="font-semibold text-foreground text-xs sm:text-base mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-[10px] sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 sm:py-20 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow/[0.03] to-transparent" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow/10 border border-yellow/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-yellow" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4 sm:mb-6">
            Ready to Begin?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 px-2">
            Start with the free IQ test, or pick any assessment above.
          </p>
          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
          >
            Start Free IQ Test
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <HomeFAQ />

      {/* Footer */}
      <SEOFooter />
    </div>
  );
};
