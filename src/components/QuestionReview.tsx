import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp, Lock, Crown, Lightbulb, BookOpen } from 'lucide-react';
import { Question, categoryLabels } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';

interface QuestionReviewProps {
  answers: number[];
  questions: Question[]; // Now receives the actual questions used
}

export const QuestionReview = ({ answers, questions }: QuestionReviewProps) => {
  const { hasPremiumAccess, isLoading } = usePremiumAccess();
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showOnlyWrong, setShowOnlyWrong] = useState(false);

  const reviewData = questions.map((question, index) => ({
    question,
    userAnswer: answers[index],
    isCorrect: answers[index] === question.correctAnswer,
  }));

  const correctCount = reviewData.filter(r => r.isCorrect).length;
  const incorrectCount = reviewData.filter(r => !r.isCorrect).length;

  // Apply filters for display
  const filteredQuestions = showOnlyWrong 
    ? reviewData.filter(r => !r.isCorrect)
    : reviewData;

  // Free users can only see summary, premium users see full review
  const displayedQuestions = showAll ? filteredQuestions : filteredQuestions.slice(0, 3);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated rounded-2xl p-6 border border-border mb-8"
      >
        <div className="animate-pulse flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (!hasPremiumAccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated rounded-2xl p-6 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <Lock className="w-6 h-6 text-amber-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-display font-semibold text-lg">Question Review</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-semibold">Premium</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              See exactly which questions you got right and wrong, with detailed explanations for every answer. 
              Understand your cognitive patterns and learn from your mistakes.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-emerald-500" />
                </div>
                <span className="text-emerald-500 font-medium">{correctCount} correct</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-2.5 h-2.5 text-red-500" />
                </div>
                <span className="text-red-500 font-medium">{incorrectCount} incorrect</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated rounded-2xl p-6 border border-border mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-lg">Question Review</h3>
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-muted-foreground text-sm">
            {correctCount} correct • {incorrectCount} incorrect
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-emerald-500/10 rounded-xl p-4 text-center border border-emerald-500/20">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Check className="w-5 h-5 text-emerald-500" />
            <span className="font-display text-2xl font-bold text-emerald-500">{correctCount}</span>
          </div>
          <p className="text-xs text-muted-foreground">Correct</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 text-center border border-red-500/20">
          <div className="flex items-center justify-center gap-2 mb-1">
            <X className="w-5 h-5 text-red-500" />
            <span className="font-display text-2xl font-bold text-red-500">{incorrectCount}</span>
          </div>
          <p className="text-xs text-muted-foreground">Incorrect</p>
        </div>
        <button 
          onClick={() => setShowOnlyWrong(!showOnlyWrong)}
          className={cn(
            "rounded-xl p-4 text-center border transition-colors",
            showOnlyWrong 
              ? "bg-red-500/20 border-red-500/40 text-red-500" 
              : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Lightbulb className="w-5 h-5" />
          </div>
          <p className="text-xs">{showOnlyWrong ? 'Showing Wrong' : 'Show Wrong Only'}</p>
        </button>
      </div>

      {/* Question List */}
      <div className="space-y-3">
        {displayedQuestions.map((item, index) => (
          <motion.div
            key={item.question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "rounded-xl border overflow-hidden transition-colors",
              item.isCorrect 
                ? "border-emerald-500/20 bg-emerald-500/5" 
                : "border-red-500/20 bg-red-500/5"
            )}
          >
            <button
              onClick={() => setExpandedQuestion(expandedQuestion === item.question.id ? null : item.question.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/20 transition-colors"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                item.isCorrect ? "bg-emerald-500/20" : "bg-red-500/20"
              )}>
                {item.isCorrect ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Q{item.question.id}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                    {categoryLabels[item.question.category]}
                  </span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    item.question.difficulty === 'easy' && "bg-green-500/20 text-green-500",
                    item.question.difficulty === 'medium' && "bg-blue-500/20 text-blue-500",
                    item.question.difficulty === 'hard' && "bg-orange-500/20 text-orange-500",
                    item.question.difficulty === 'expert' && "bg-purple-500/20 text-purple-500",
                    item.question.difficulty === 'genius' && "bg-pink-500/20 text-pink-500"
                  )}>
                    {item.question.difficulty}
                  </span>
                </div>
                <p className="text-sm text-foreground truncate">
                  {item.question.question.split('\n')[0].substring(0, 60)}...
                </p>
              </div>
              {expandedQuestion === item.question.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {expandedQuestion === item.question.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4">
                    {/* Question */}
                    <div className="bg-muted/30 rounded-lg p-3">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Question:</p>
                      <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                        {item.question.question}
                      </pre>
                    </div>

                    {/* Answers */}
                    <div className="space-y-2">
                      {item.question.options.map((option, optIndex) => {
                        const isCorrectAnswer = optIndex === item.question.correctAnswer;
                        const isUserAnswer = optIndex === item.userAnswer;
                        
                        return (
                          <div
                            key={optIndex}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-lg text-sm",
                              isCorrectAnswer && "bg-emerald-500/20 border border-emerald-500/30",
                              isUserAnswer && !isCorrectAnswer && "bg-red-500/20 border border-red-500/30",
                              !isCorrectAnswer && !isUserAnswer && "bg-muted/20"
                            )}
                          >
                            <span className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-xs font-medium">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="flex-1">{option}</span>
                            {isCorrectAnswer && (
                              <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Correct
                              </span>
                            )}
                            {isUserAnswer && !isCorrectAnswer && (
                              <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                                <X className="w-3 h-3" />
                                Your answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation - shown for all questions in premium */}
                    {item.question.explanation && (
                      <div className={cn(
                        "rounded-lg p-3 border",
                        item.isCorrect 
                          ? "bg-emerald-500/10 border-emerald-500/20" 
                          : "bg-amber-500/10 border-amber-500/20"
                      )}>
                        <div className="flex items-start gap-2">
                          <Lightbulb className={cn(
                            "w-4 h-4 mt-0.5 flex-shrink-0",
                            item.isCorrect ? "text-emerald-500" : "text-amber-500"
                          )} />
                          <div>
                            <p className={cn(
                              "text-xs font-semibold mb-1",
                              item.isCorrect ? "text-emerald-500" : "text-amber-500"
                            )}>
                              {item.isCorrect ? 'Why this is correct' : 'Explanation'}
                            </p>
                            <p className="text-sm text-foreground">{item.question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less */}
      {filteredQuestions.length > 3 && (
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show All {filteredQuestions.length} Questions
            </>
          )}
        </Button>
      )}
    </motion.div>
  );
};
