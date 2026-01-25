import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalityQuestions, personalityOptions, personalityTraitLabels } from '@/data/personalityQuestions';
import { cn } from '@/lib/utils';
import { ArrowLeft, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PersonalityQuizProps {
  onComplete: (answers: number[]) => void;
  onBack: () => void;
}

export const PersonalityQuiz = ({ onComplete, onBack }: PersonalityQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = personalityQuestions[currentIndex];
  const progress = ((currentIndex + 1) / personalityQuestions.length) * 100;

  const handleSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    
    if (currentIndex < personalityQuestions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Big Five Personality</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {personalityQuestions.length}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl mt-16"
        >
          <div className="card-elevated rounded-2xl p-6 md:p-8 border border-border">
            {/* Trait indicator */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
              {personalityTraitLabels[question.trait].label}
            </div>

            {/* Question */}
            <h2 className="font-display text-xl md:text-2xl font-semibold mb-8">
              {question.question}
            </h2>

            {/* Likert Scale Options */}
            <div className="space-y-3">
              {personalityOptions.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSelect(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2',
                    selectedAnswer === index
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                      selectedAnswer === index ? 'border-primary bg-primary' : 'border-muted-foreground'
                    )}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
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
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-6 py-2.5 font-semibold',
                  selectedAnswer !== null ? 'bg-primary hover:bg-primary/90' : 'bg-muted cursor-not-allowed'
                )}
              >
                {currentIndex === personalityQuestions.length - 1 ? 'See Results' : 'Next →'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};