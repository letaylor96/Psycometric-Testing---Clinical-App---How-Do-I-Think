import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Brain, Lightbulb, Sparkles, Target, Zap, ChevronDown, Crown, MessageCircle, FileText, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo, allAssessmentTypes } from '@/data/assessmentTypes';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { AuthButton } from '@/components/AuthButton';
import { QuizTeaser } from '@/components/QuizTeaser';
import { HomeFAQ } from '@/components/HomeFAQ';
import { SEOFooter } from '@/components/SEOFooter';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  personality: Target,
  iq: Brain,
  neurodivergent: Zap,
  depth: Sparkles,
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

  const completionStatus: Record<AssessmentType, boolean> = {
    personality: !!personalityResults,
    iq: !!iqResults,
    neurodivergent: !!cognitiveStyleResults, // Combined assessment
    depth: false, // TODO: Add depth psychology results prop
  };

  const completedCount = Object.values(completionStatus).filter(Boolean).length;
  const hasStarted = completedCount > 0;

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
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-20 min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center">
        {/* Subtle gradient background with gold accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow/[0.04] via-transparent to-transparent" />
        <div className="absolute top-40 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-yellow/5 rounded-full blur-[60px] sm:blur-[100px]" />
        <div className="absolute bottom-40 right-1/4 w-24 sm:w-48 h-24 sm:h-48 bg-primary/5 rounded-full blur-[50px] sm:blur-[80px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Progress if started */}
          <div className="mb-6 sm:mb-8">
            <AssessmentProgress
              iqResults={iqResults ?? null}
              personalityResults={personalityResults ?? null}
              adhdResults={adhdResults ?? null}
              cognitiveStyleResults={cognitiveStyleResults ?? null}
              onSelectAssessment={onSelectAssessment}
              onViewDashboard={onViewDashboard}
            />
          </div>

          {/* Brain Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow/20 to-yellow/5 border border-yellow/30 flex items-center justify-center">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-yellow" />
            </div>
          </motion.div>

          {/* Main Headline - Serif, Grand */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-6 sm:mb-8"
          >
            How Do I
            <br />
            <span className="text-primary">Think?</span>
          </motion.h1>

          {/* Subtitle - Clean, Professional */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          >
            Free IQ test, learning style quiz, and scientifically-validated psychology assessments. 
            Discover your cognitive style, personality, and thinking patterns.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6 px-4 sm:px-0"
          >
            <Button
              onClick={onStart}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
            >
              {hasStarted ? 'Continue Assessment' : 'Start Free IQ Test'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground/70 text-sm"
          >
            {hasPremiumAccess ? (
              <span className="text-emerald-500 font-medium">✓ Premium access active</span>
            ) : (
              'First assessment free · Premium unlocks all features'
            )}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 sm:mt-10 flex flex-col items-center"
          >
            <span className="text-muted-foreground/50 text-[10px] sm:text-xs uppercase tracking-wider mb-2">Choose your assessment</span>
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById('assessment-grid');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              aria-label="Scroll down to assessment options"
              className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border border-primary/30 cursor-pointer hover:bg-primary/20 hover:border-primary/50 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quiz Teaser - Hook visitors with an interactive sample */}
      <QuizTeaser onStartQuiz={onStart} />

      {/* About Button & Modal */}
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
              className="relative max-w-2xl w-full bg-card border border-yellow/20 p-8 md:p-12"
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

      {/* Assessment Grid */}
      <section id="assessment-grid" className="py-12 sm:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-yellow text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
              Assessment Suite
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 sm:mb-4">
              Choose Your Assessment
            </h2>
            <button
              onClick={() => setShowAbout(true)}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-yellow transition-colors text-xs sm:text-sm"
            >
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>About our assessments</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {allAssessmentTypes.map((type, i) => {
              const info = assessmentInfo[type];
              const Icon = assessmentIcons[type];
              const isCompleted = completionStatus[type];
              
              const methodologies: Record<AssessmentType, string> = {
                personality: 'Based on the Big Five Factor Model (OCEAN), the gold standard in personality psychology research.',
                iq: "Derived from Raven's Progressive Matrices, measuring fluid intelligence and abstract reasoning.",
                neurodivergent: 'Combines Cognitive Style profiling with the WHO ASRS-v1.1 clinical screening for comprehensive neurodivergent assessment.',
                depth: 'AI-powered depth psychology through the lens of Freud, Jung, or Nietzsche. Premium only.',
              };
              
              const isPremiumOnly = info.isPremiumOnly;

              return (
                <motion.button
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => onSelectAssessment(type)}
                className={`group relative text-left p-5 sm:p-8 border transition-all rounded-lg sm:rounded-none ${
                  isCompleted 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : isPremiumOnly
                      ? 'border-purple-500/30 hover:border-purple-500/50 bg-gradient-to-br from-purple-500/5 to-purple-500/10 hover:from-purple-500/10 hover:to-purple-500/15'
                      : 'border-border hover:border-yellow/40 bg-card hover:bg-card/80'
                }`}
              >
                {isPremiumOnly && !isCompleted && (
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 sm:gap-2 text-purple-400">
                    <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Premium</span>
                  </div>
                )}
                {isCompleted && (
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 sm:gap-2 text-emerald-500">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Done</span>
                  </div>
                )}
                
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 ${
                  isPremiumOnly ? 'bg-purple-500/20' : 'bg-yellow/10'
                }`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isPremiumOnly ? 'text-purple-400' : 'text-yellow'}`} />
                </div>
                
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-yellow transition-colors pr-16 sm:pr-20">
                  {info.title}
                </h3>
                <p className="text-yellow/80 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  {info.framework}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  {methodologies[type]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground/60 text-[10px] sm:text-xs">
                    {info.questionCount} questions · {info.timeMinutes} min
                  </span>
                  <span className="text-yellow text-xs sm:text-sm font-medium sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    Begin →
                  </span>
                </div>
                </motion.button>
              );
            })}
          </div>

          {/* Incomplete notice */}
          {hasStarted && completedCount < 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 max-w-2xl mx-auto text-center"
            >
              <div className="inline-block px-6 py-4 bg-muted/30 border border-border/50">
                <p className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">{completedCount} of 4 assessments complete.</span>
                  {' '}Complete all four to unlock your integrated cognitive profile and cross-domain insights.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* AI Insights Section - NEW */}
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
            {/* Historical Mind Match */}
            <div className="p-5 sm:p-8 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                Historical Mind Match
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Discover which great minds from history share your cognitive patterns.
              </p>
              <span className="text-amber-500 text-xs sm:text-sm font-medium">
                20+ historical figures
              </span>
            </div>

            {/* Therapist Report */}
            <div className="p-5 sm:p-8 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                Therapist Report
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Professional clinical summary for mental health providers.
              </p>
              <span className="text-emerald-500 text-xs sm:text-sm font-medium">
                Export-ready format
              </span>
            </div>

            {/* Ask AI */}
            <div className="p-5 sm:p-8 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 text-center sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                Ask AI About Results
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Chat with AI to understand what your results mean for your life.
              </p>
              <span className="text-violet-500 text-xs sm:text-sm font-medium">
                Personalized insights
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-12 sm:py-20 bg-card border-y border-yellow/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-yellow text-xs sm:text-sm font-medium tracking-widest uppercase mb-3 sm:mb-4">
              Scientific Foundation
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4 sm:mb-6">
              Research-Based Methodology
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">
              Our assessments are built on decades of peer-reviewed research in cognitive 
              psychology, psychometrics, and neuroscience.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                title: 'Big Five Model',
                icon: Target,
                description: 'The most validated personality framework in modern psychology.',
              },
              {
                title: "Raven's Matrices",
                icon: Brain,
                description: 'Non-verbal assessment of fluid intelligence used globally.',
              },
              {
                title: 'ASRS-v1.1',
                icon: Zap,
                description: 'WHO screening for attention patterns.',
              },
              {
                title: 'Cognitive Load',
                icon: Lightbulb,
                description: 'How you process information.',
              },
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
            Start with a free IQ test and discover insights about your cognitive profile.
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

      {/* Footer with internal links */}
      <SEOFooter />
    </div>
  );
};
