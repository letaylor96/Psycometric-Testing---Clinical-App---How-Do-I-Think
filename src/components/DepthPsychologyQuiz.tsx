import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { depthQuestions, categoryLabels, AnalysisFramework, frameworkInfo } from '@/data/depthPsychologyQuestions';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Brain, Loader2, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClarificationRequest {
  question: string;
  context: string;
  conversationHistory: any[];
}

interface DepthPsychologyQuizProps {
  framework: AnalysisFramework;
  onComplete: (answers: { questionId: number; answer: string }[]) => void;
  onBack: () => void;
  isAnalyzing?: boolean;
  clarificationRequest?: ClarificationRequest | null;
  onClarificationResponse?: (response: string) => void;
}

const categoryColors: Record<string, string> = {
  drives: 'bg-red-500/10 text-red-500 border-red-500/30',
  self: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  morality: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  shadow: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  meaning: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
};

const categoryIcons: Record<string, string> = {
  drives: '🔥',
  self: '🪞',
  morality: '⚖️',
  shadow: '🌑',
  meaning: '✨',
};

export const DepthPsychologyQuiz = ({ 
  framework, 
  onComplete, 
  onBack, 
  isAnalyzing = false,
  clarificationRequest = null,
  onClarificationResponse,
}: DepthPsychologyQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; answer: string }[]>(
    depthQuestions.map(q => ({ questionId: q.id, answer: '' }))
  );
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [clarificationAnswer, setClarificationAnswer] = useState('');

  const currentQuestion = depthQuestions[currentIndex];
  const progress = ((currentIndex + 1) / depthQuestions.length) * 100;
  const fwInfo = frameworkInfo[framework];

  const handleNext = useCallback(() => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = { questionId: currentQuestion.id, answer: currentAnswer };
    setAnswers(newAnswers);

    if (currentIndex < depthQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentAnswer(newAnswers[currentIndex + 1]?.answer || '');
    } else {
      onComplete(newAnswers);
    }
  }, [currentIndex, currentAnswer, answers, currentQuestion.id, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = { questionId: currentQuestion.id, answer: currentAnswer };
      setAnswers(newAnswers);
      
      setCurrentIndex(prev => prev - 1);
      setCurrentAnswer(answers[currentIndex - 1]?.answer || '');
    }
  }, [currentIndex, currentAnswer, answers, currentQuestion.id]);

  const canProceed = currentAnswer.trim().length >= 20;
  const isLastQuestion = currentIndex === depthQuestions.length - 1;

  const handleSendClarification = useCallback(() => {
    if (clarificationAnswer.trim().length >= 10 && onClarificationResponse) {
      onClarificationResponse(clarificationAnswer);
      setClarificationAnswer('');
    }
  }, [clarificationAnswer, onClarificationResponse]);

  // Show clarification dialog
  if (clarificationRequest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                <span className="text-lg">{fwInfo.icon}</span>
              </div>
              <CardTitle className="font-display text-xl">
                {fwInfo.thinker} Seeks Clarification
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {clarificationRequest.context}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-foreground leading-relaxed">
                  {clarificationRequest.question}
                </p>
              </div>
              
              <Textarea
                value={clarificationAnswer}
                onChange={(e) => setClarificationAnswer(e.target.value)}
                placeholder="Take your time to provide additional clarity..."
                className="min-h-[120px] resize-none"
                autoFocus
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {clarificationAnswer.length < 10 
                    ? `At least ${10 - clarificationAnswer.length} more characters` 
                    : '✓ Ready to submit'}
                </span>
                <Button
                  onClick={handleSendClarification}
                  disabled={clarificationAnswer.trim().length < 10}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Continue Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <div className="text-6xl mb-4">{fwInfo.icon}</div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full" />
            </motion.div>
          </div>
          <h2 className="font-display text-2xl font-bold mb-2">
            Analyzing Through {fwInfo.thinker}'s Lens
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-4">
            {framework === 'freudian' && 'Applying psychoanalytic theory: structural model, defense mechanisms, drive theory...'}
            {framework === 'jungian' && 'Examining archetypes, shadow integration, typology, and individuation stage...'}
            {framework === 'nietzschean' && 'Evaluating will to power, ressentiment, master/slave morality, eternal recurrence...'}
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Deep analysis in progress...</span>
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
          <div className="flex items-center gap-2">
            <span className="text-lg">{fwInfo.icon}</span>
            <span className="text-sm text-muted-foreground font-medium">
              {fwInfo.thinker} • Q{currentIndex + 1}/{depthQuestions.length}
            </span>
          </div>
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
        {depthQuestions.map((q, idx) => (
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
