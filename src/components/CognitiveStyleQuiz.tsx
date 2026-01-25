import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  cognitiveStyleQuestions, 
  CognitiveStyleQuestion,
  dimensionLabels,
  ThinkingDimension
} from '@/data/cognitiveStyleQuestions';

interface CognitiveStyleQuizProps {
  onComplete: (answers: number[]) => void;
  onBack: () => void;
}

const dimensionColors: Record<ThinkingDimension, string> = {
  visual_spatial: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
  pattern_recognition: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
  hyperfocus: 'bg-neon-pink/10 text-neon-pink border-neon-pink/30',
  divergent_thinking: 'bg-primary/10 text-primary border-primary/30',
  detail_orientation: 'bg-secondary/10 text-secondary border-secondary/30',
  big_picture: 'bg-green-500/10 text-green-500 border-green-500/30',
};

export const CognitiveStyleQuiz = ({ onComplete, onBack }: CognitiveStyleQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentQuestion = cognitiveStyleQuestions[currentIndex];
  const progressPercentage = ((currentIndex + 1) / cognitiveStyleQuestions.length) * 100;

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentIndex < cognitiveStyleQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(newAnswers);
    }
  }, [selectedAnswer, answers, currentIndex, onComplete]);

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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Cognitive Style Assessment</h1>
            <p className="text-xs text-muted-foreground">Discover how your mind naturally processes information</p>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {currentIndex + 1} of {cognitiveStyleQuestions.length}</span>
          <span>{Math.round(progressPercentage)}% complete</span>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="card-elevated rounded-2xl p-6 md:p-8 border border-border">
            {/* Dimension Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                dimensionColors[currentQuestion.dimension]
              )}>
                {dimensionLabels[currentQuestion.dimension].label}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                <span>Thinking Style</span>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="font-display text-lg md:text-xl font-semibold mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="grid gap-2.5">
              {currentQuestion.options.map((option, index) => (
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
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-6 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-300',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:scale-105'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                {currentIndex === cognitiveStyleQuestions.length - 1 ? 'See Results' : 'Next →'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dimension indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {(['visual_spatial', 'pattern_recognition', 'hyperfocus', 'divergent_thinking', 'detail_orientation', 'big_picture'] as const).map((dim) => (
          <div
            key={dim}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              currentQuestion.dimension === dim
                ? 'scale-150 ring-2 ring-offset-1 ring-offset-background'
                : 'opacity-30',
              dim === 'visual_spatial' && 'bg-neon-cyan ring-neon-cyan',
              dim === 'pattern_recognition' && 'bg-neon-purple ring-neon-purple',
              dim === 'hyperfocus' && 'bg-neon-pink ring-neon-pink',
              dim === 'divergent_thinking' && 'bg-primary ring-primary',
              dim === 'detail_orientation' && 'bg-secondary ring-secondary',
              dim === 'big_picture' && 'bg-green-500 ring-green-500',
            )}
            title={dimensionLabels[dim].label}
          />
        ))}
      </div>
    </div>
  );
};
