import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Sparkles, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  CognitiveStyleQuestion,
  dimensionLabels,
  ThinkingDimension
} from '@/data/cognitiveStyleQuestions';
import { adhdQuestions, adhdOptions, adhdDomainLabels } from '@/data/adhdQuestions';
import { cognitiveStyleQuestionVariants } from '@/data/cognitiveStyleQuestionVariants';
import { selectRandomVariants } from '@/lib/questionVariants';
import { TOTAL_QUESTION_COUNT } from '@/data/neurodivergentMindQuestions';

interface NeurodivergentMindQuizProps {
  onComplete: (cognitiveAnswers: number[], adhdAnswers: number[]) => void;
  onBack: () => void;
}

type Phase = 'cognitive' | 'adhd';

const dimensionColors: Record<ThinkingDimension, string> = {
  visual_spatial: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
  pattern_recognition: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  hyperfocus: 'bg-pink-500/10 text-pink-500 border-pink-500/30',
  divergent_thinking: 'bg-primary/10 text-primary border-primary/30',
  detail_orientation: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  big_picture: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
};

export const NeurodivergentMindQuiz = ({ onComplete, onBack }: NeurodivergentMindQuizProps) => {
  // Generate randomized cognitive questions for this session
  const cognitiveQuestions = useMemo(() => selectRandomVariants(cognitiveStyleQuestionVariants), []);
  
  const [phase, setPhase] = useState<Phase>('cognitive');
  const [cognitiveIndex, setCognitiveIndex] = useState(0);
  const [adhdIndex, setAdhdIndex] = useState(0);
  const [cognitiveAnswers, setCognitiveAnswers] = useState<number[]>([]);
  const [adhdAnswers, setAdhdAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const totalProgress = phase === 'cognitive' 
    ? cognitiveIndex + 1 
    : cognitiveQuestions.length + adhdIndex + 1;
  const progressPercentage = (totalProgress / TOTAL_QUESTION_COUNT) * 100;

  const currentCognitiveQuestion = cognitiveQuestions[cognitiveIndex];
  const currentAdhdQuestion = adhdQuestions[adhdIndex];

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) return;

    if (phase === 'cognitive') {
      const newAnswers = [...cognitiveAnswers, selectedAnswer];
      setCognitiveAnswers(newAnswers);
      setSelectedAnswer(null);

      if (cognitiveIndex < cognitiveQuestions.length - 1) {
        setCognitiveIndex(prev => prev + 1);
      } else {
        // Move to ADHD phase
        setPhase('adhd');
      }
    } else {
      const newAnswers = [...adhdAnswers, selectedAnswer];
      setAdhdAnswers(newAnswers);
      setSelectedAnswer(null);

      if (adhdIndex < adhdQuestions.length - 1) {
        setAdhdIndex(prev => prev + 1);
      } else {
        // Complete assessment
        onComplete(cognitiveAnswers, newAnswers);
      }
    }
  }, [selectedAnswer, phase, cognitiveAnswers, adhdAnswers, cognitiveIndex, adhdIndex, cognitiveQuestions.length, onComplete]);

  // Transition screen between phases
  const [showingTransition, setShowingTransition] = useState(false);
  
  const handlePhaseTransition = useCallback(() => {
    if (phase === 'cognitive' && cognitiveIndex === cognitiveQuestions.length - 1 && selectedAnswer !== null) {
      const newAnswers = [...cognitiveAnswers, selectedAnswer];
      setCognitiveAnswers(newAnswers);
      setSelectedAnswer(null);
      setShowingTransition(true);
      setTimeout(() => {
        setShowingTransition(false);
        setPhase('adhd');
      }, 2000);
    }
  }, [phase, cognitiveIndex, cognitiveQuestions.length, selectedAnswer, cognitiveAnswers]);

  if (showingTransition) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Cognitive Style Complete
          </h2>
          <p className="text-muted-foreground mb-4">
            Now let's explore your attention patterns...
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="text-emerald-500">✓</span>
            <span>Part 1: Thinking Patterns</span>
            <span className="mx-2">→</span>
            <span className="text-purple-400 font-medium">Part 2: Attention & Focus</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-2xl mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to assessments</span>
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            phase === 'cognitive' 
              ? 'bg-gradient-to-br from-purple-500 to-cyan-500' 
              : 'bg-gradient-to-br from-violet-500 to-purple-500'
          )}>
            {phase === 'cognitive' ? (
              <Brain className="w-5 h-5 text-white" />
            ) : (
              <Activity className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold">
              {phase === 'cognitive' ? 'Part 1: Thinking Patterns' : 'Part 2: Attention & Focus'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {phase === 'cognitive' 
                ? 'How your mind naturally processes information' 
                : 'Clinical attention and hyperactivity screening (ASRS-v1.1)'
              }
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
          <motion.div
            className={cn(
              'h-full',
              phase === 'cognitive' 
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {totalProgress} of {TOTAL_QUESTION_COUNT}</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        {phase === 'cognitive' ? (
          <motion.div
            key={`cognitive-${currentCognitiveQuestion.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="rounded-2xl p-6 md:p-8 border border-border bg-card">
              {/* Dimension Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                  dimensionColors[currentCognitiveQuestion.dimension]
                )}>
                  {dimensionLabels[currentCognitiveQuestion.dimension].label}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>Thinking Style</span>
                </div>
              </div>

              {/* Question Text */}
              <h2 className="font-serif text-lg md:text-xl font-semibold mb-6 leading-relaxed">
                {currentCognitiveQuestion.question}
              </h2>

              {/* Options */}
              <div className="grid gap-2.5">
                {currentCognitiveQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2',
                      selectedAnswer === index
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
                    )}
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted text-xs font-bold mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option.text}
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedAnswer !== null ? 1 : 0.3 }}
                className="mt-6 flex justify-end"
              >
                <button
                  onClick={cognitiveIndex === cognitiveQuestions.length - 1 ? handlePhaseTransition : handleNext}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300',
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  {cognitiveIndex === cognitiveQuestions.length - 1 ? 'Continue to Part 2 →' : 'Next →'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`adhd-${currentAdhdQuestion.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="rounded-2xl p-6 md:p-8 border border-border bg-card">
              {/* Domain Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {adhdDomainLabels[currentAdhdQuestion.domain]}
                </span>
                {currentAdhdQuestion.isPartA && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                    Screening
                  </span>
                )}
              </div>

              {/* Question */}
              <h2 className="font-serif text-lg md:text-xl font-semibold mb-8 leading-relaxed">
                {currentAdhdQuestion.question}
              </h2>

              {/* Frequency Scale Options */}
              <div className="space-y-3">
                {adhdOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2',
                      selectedAnswer === index
                        ? 'border-violet-500 bg-violet-500/10 text-foreground'
                        : 'border-border bg-muted/30 text-muted-foreground hover:border-violet-500/50 hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        selectedAnswer === index ? 'border-violet-500 bg-violet-500' : 'border-muted-foreground'
                      )}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedAnswer !== null ? 1 : 0.3 }}
                className="mt-6 flex justify-end"
              >
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300',
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:scale-105'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  {adhdIndex === adhdQuestions.length - 1 ? 'See Results' : 'Next →'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase indicator */}
      <div className="flex items-center gap-4 mt-6 text-sm">
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all',
          phase === 'cognitive' 
            ? 'border-purple-500/50 bg-purple-500/10 text-purple-400' 
            : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
        )}>
          {phase === 'adhd' && <span>✓</span>}
          <span>Thinking Patterns</span>
        </div>
        <div className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all',
          phase === 'adhd' 
            ? 'border-violet-500/50 bg-violet-500/10 text-violet-400' 
            : 'border-border text-muted-foreground'
        )}>
          <span>Attention & Focus</span>
        </div>
      </div>
    </div>
  );
};
