import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { freudianQuestions, FreudianQuestion, categoryLabels } from '@/data/freudianQuestions';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Brain, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

interface FreudianQuizProps {
  onComplete: (answers: { questionId: number; answer: string }[]) => void;
  onBack: () => void;
  isAnalyzing?: boolean;
}

const categoryColors: Record<FreudianQuestion['category'], string> = {
  id: 'bg-red-500/10 text-red-500 border-red-500/30',
  ego: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  superego: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  defense: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  unconscious: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
};

const categoryIcons: Record<FreudianQuestion['category'], string> = {
  id: '🔥',
  ego: '⚖️',
  superego: '👁️',
  defense: '🛡️',
  unconscious: '🌊',
};

export const FreudianQuiz = ({ onComplete, onBack, isAnalyzing = false }: FreudianQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; answer: string }[]>(
    freudianQuestions.map(q => ({ questionId: q.id, answer: '' }))
  );
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentQuestion = freudianQuestions[currentIndex];
  const progress = ((currentIndex + 1) / freudianQuestions.length) * 100;

  const handleNext = useCallback(() => {
    // Save current answer
    const newAnswers = [...answers];
    newAnswers[currentIndex] = { questionId: currentQuestion.id, answer: currentAnswer };
    setAnswers(newAnswers);

    if (currentIndex < freudianQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentAnswer(newAnswers[currentIndex + 1]?.answer || '');
    } else {
      // Complete the quiz
      onComplete(newAnswers);
    }
  }, [currentIndex, currentAnswer, answers, currentQuestion.id, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      // Save current answer before going back
      const newAnswers = [...answers];
      newAnswers[currentIndex] = { questionId: currentQuestion.id, answer: currentAnswer };
      setAnswers(newAnswers);
      
      setCurrentIndex(prev => prev - 1);
      setCurrentAnswer(answers[currentIndex - 1]?.answer || '');
    }
  }, [currentIndex, currentAnswer, answers, currentQuestion.id]);

  const canProceed = currentAnswer.trim().length >= 20; // Minimum 20 characters
  const isLastQuestion = currentIndex === freudianQuestions.length - 1;

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <Brain className="w-24 h-24 text-primary mx-auto" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full" />
            </motion.div>
          </div>
          <h2 className="font-display text-2xl font-bold mb-4">Analyzing Your Responses</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our AI is applying Freudian psychoanalytic principles to understand your unconscious patterns, 
            defense mechanisms, and psychological structures...
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>This may take a moment</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
      {/* Progress Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Exit
          </Button>
          <span className="text-sm text-muted-foreground font-medium">
            Question {currentIndex + 1} of {freudianQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
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
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border',
                categoryColors[currentQuestion.category]
              )}>
                <span>{categoryIcons[currentQuestion.category]}</span>
                {categoryLabels[currentQuestion.category]}
              </div>
            </div>

            {/* Question Text */}
            <h2 className="font-display text-xl md:text-2xl font-semibold mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Free-form Answer Input */}
            <div className="space-y-3">
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Take your time to reflect and write honestly. There are no right or wrong answers..."
                className="min-h-[180px] resize-none text-base leading-relaxed"
                autoFocus
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {currentAnswer.length < 20 
                    ? `At least ${20 - currentAnswer.length} more characters needed` 
                    : '✓ Ready to continue'}
                </span>
                <span>{currentAnswer.length} characters</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="gap-2"
              >
                {isLastQuestion ? 'Complete Assessment' : 'Next'}
                {!isLastQuestion && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Question dots indicator */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-8 max-w-lg">
        {freudianQuestions.map((q, idx) => (
          <div
            key={q.id}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              idx === currentIndex
                ? 'scale-150 ring-2 ring-offset-1 ring-offset-background ring-primary bg-primary'
                : answers[idx]?.answer?.length >= 20
                  ? 'bg-primary/60'
                  : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  );
};
