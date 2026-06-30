import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, categoryLabels, TOTAL_TEST_TIME } from '@/data/quizQuestions';
import { cn } from '@/lib/utils';
import { Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  onPrevious?: () => void;
  canGoPrevious?: boolean;
  totalTimeRemaining: number;
  onTimeUp: () => void;
}

const categoryColors: Record<string, string> = {
  verbal: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
  numerical: 'bg-neon-pink/10 text-neon-pink border-neon-pink/30',
  spatial: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
  pattern: 'bg-primary/10 text-primary border-primary/30',
  logical: 'bg-secondary/10 text-secondary border-secondary/30',
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const QuizQuestion = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  canGoPrevious = false,
  totalTimeRemaining,
  onTimeUp,
}: QuizQuestionProps) => {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  const timePercentage = (totalTimeRemaining / TOTAL_TEST_TIME) * 100;
  const isLowTime = totalTimeRemaining <= 60;
  const isCriticalTime = totalTimeRemaining <= 30;

  useEffect(() => {
    if (totalTimeRemaining <= 0) {
      onTimeUp();
    }
  }, [totalTimeRemaining, onTimeUp]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Timer Bar - Fixed at top - MORE PROMINENT */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-colors duration-300",
        isCriticalTime 
          ? "bg-destructive/10 border-destructive/30" 
          : isLowTime 
            ? "bg-amber-500/10 border-amber-500/30" 
            : "bg-background/90 border-border"
      )}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            {/* Timer - More Prominent */}
            <div className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-xl border transition-all",
              isCriticalTime 
                ? "bg-destructive/20 border-destructive/50 animate-pulse" 
                : isLowTime 
                  ? "bg-amber-500/20 border-amber-500/40" 
                  : "bg-primary/10 border-primary/30"
            )}>
              <Clock className={cn(
                "w-5 h-5 transition-colors",
                isCriticalTime ? "text-destructive" : isLowTime ? "text-amber-500" : "text-primary"
              )} />
              <span className={cn(
                "font-mono font-bold text-xl tracking-wide transition-colors",
                isCriticalTime ? "text-destructive" : isLowTime ? "text-amber-500" : "text-foreground"
              )}>
                {formatTime(totalTimeRemaining)}
              </span>
              {isCriticalTime && (
                <span className="text-xs text-destructive font-semibold flex items-center gap-1 bg-destructive/20 px-2 py-0.5 rounded-full">
                  <AlertTriangle className="w-3 h-3" />
                  Hurry!
                </span>
              )}
              {isLowTime && !isCriticalTime && (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  Low time
                </span>
              )}
            </div>
            
            <span className="text-sm text-muted-foreground font-medium">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          
          {/* Time Progress Bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={cn(
                "h-full transition-colors duration-300",
                isCriticalTime ? "bg-destructive" : isLowTime ? "bg-amber-500" : "bg-gradient-to-r from-primary to-secondary"
              )}
              initial={{ width: '100%' }}
              animate={{ width: `${timePercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="w-full max-w-2xl mb-6 mt-16">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        {/* Category indicators */}
        <div className="flex justify-center gap-2">
          {(['verbal', 'numerical', 'spatial', 'pattern', 'logical'] as const).map((cat) => (
            <div
              key={cat}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                question.category === cat
                  ? 'scale-150 ring-2 ring-offset-1 ring-offset-background'
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
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="card-elevated rounded-2xl p-6 md:p-8 border border-border">
            {/* Question Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                categoryColors[question.category]
              )}>
                {categoryLabels[question.category]}
              </div>
              {question.divergentDimension && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  + Divergent Thinking
                </span>
              )}
            </div>

            {/* Question Text */}
            <h2 className="font-display text-lg md:text-xl font-semibold mb-6 leading-relaxed whitespace-pre-line">
              {question.question}
            </h2>

            {/* Options */}
            <div className="grid gap-2.5">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => onSelectAnswer(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    'w-full p-3.5 rounded-xl text-left font-medium transition-all duration-200 border-2',
                    selectedAnswer === index
                      ? 'border-primary bg-primary/10 text-foreground glow-primary'
                      : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
                  )}
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted text-xs font-bold mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                  canGoPrevious
                    ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    : 'text-muted-foreground/40 cursor-not-allowed',
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={onNext}
                disabled={selectedAnswer === null}
                className={cn(
                  'px-6 py-2.5 rounded-xl font-display font-semibold text-sm transition-all duration-300',
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:scale-105 glow-primary'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                {currentIndex === totalQuestions - 1 ? 'See Results' : 'Next →'}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
