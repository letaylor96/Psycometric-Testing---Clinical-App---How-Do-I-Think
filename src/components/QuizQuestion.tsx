import { motion, AnimatePresence } from 'framer-motion';
import { Question, categoryLabels } from '@/data/quizQuestions';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
}

const categoryColors: Record<string, string> = {
  verbal: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
  numerical: 'bg-neon-pink/10 text-neon-pink border-neon-pink/30',
  spatial: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
  pattern: 'bg-primary/10 text-primary border-primary/30',
  logical: 'bg-secondary/10 text-secondary border-secondary/30',
};

export const QuizQuestion = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
}: QuizQuestionProps) => {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        {/* Category indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {(['verbal', 'numerical', 'spatial', 'pattern', 'logical'] as const).map((cat) => (
            <div
              key={cat}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                question.category === cat
                  ? 'scale-125 ring-2 ring-offset-2 ring-offset-background'
                  : 'opacity-30',
                cat === 'verbal' && 'bg-neon-cyan ring-neon-cyan',
                cat === 'numerical' && 'bg-neon-pink ring-neon-pink',
                cat === 'spatial' && 'bg-neon-purple ring-neon-purple',
                cat === 'pattern' && 'bg-primary ring-primary',
                cat === 'logical' && 'bg-secondary ring-secondary',
              )}
              title={categoryLabels[cat]}
            />
          ))}
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl"
        >
          <div className="card-elevated rounded-2xl p-8 border border-border">
            {/* Question Category Badge */}
            <div className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-6 border',
              categoryColors[question.category]
            )}>
              {categoryLabels[question.category]}
            </div>

            {/* Question Text */}
            <h2 className="font-display text-xl md:text-2xl font-semibold mb-8 leading-relaxed whitespace-pre-line">
              {question.question}
            </h2>

            {/* Options */}
            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => onSelectAnswer(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    'w-full p-4 rounded-xl text-left font-medium transition-all duration-300 border-2',
                    selectedAnswer === index
                      ? 'border-primary bg-primary/10 text-foreground glow-primary'
                      : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
                  )}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-sm font-bold mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedAnswer !== null ? 1 : 0.3 }}
              className="mt-8 flex justify-end"
            >
              <button
                onClick={onNext}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-8 py-3 rounded-xl font-display font-semibold transition-all duration-300',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:scale-105 glow-primary'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                {currentIndex === totalQuestions - 1 ? 'See My Results' : 'Next Question'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
