import { motion, AnimatePresence } from 'framer-motion';
import { Brain, UserCheck, Lightbulb, Activity, Check, Lock, Sparkles } from 'lucide-react';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { AssessmentType, assessmentInfo } from '@/data/assessmentTypes';

interface AssessmentProgressProps {
  iqResults: TestResults | null;
  personalityResults: PersonalityResults | null;
  adhdResults: ADHDResults | null;
  cognitiveStyleResults: CognitiveStyleResults | null;
  onSelectAssessment?: (type: AssessmentType) => void;
  onViewDashboard?: () => void;
}

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  personality: UserCheck,
  iq: Brain,
  cognitive: Lightbulb,
  adhd: Activity,
};

export const AssessmentProgress = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
  onSelectAssessment,
  onViewDashboard,
}: AssessmentProgressProps) => {
  const completionStatus: Record<AssessmentType, boolean> = {
    personality: !!personalityResults,
    iq: !!iqResults,
    cognitive: !!cognitiveStyleResults,
    adhd: !!adhdResults,
  };

  const completedCount = Object.values(completionStatus).filter(Boolean).length;
  const hasAnyCompleted = completedCount > 0;
  const hasCrossTestInsights = completedCount >= 2;
  const allCompleted = completedCount === 4;

  if (!hasAnyCompleted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-8"
    >
      {/* Progress Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-6">
        {/* Background glow for completed state */}
        {hasCrossTestInsights && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedCount}/4 assessments completed
                </p>
              </div>
            </div>
            
            {/* View Dashboard button */}
            {hasCrossTestInsights && onViewDashboard && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onViewDashboard}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View Insights
              </motion.button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-muted/50 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>

          {/* Assessment Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(['personality', 'iq', 'cognitive', 'adhd'] as AssessmentType[]).map((type) => {
              const Icon = assessmentIcons[type];
              const isCompleted = completionStatus[type];
              const info = assessmentInfo[type];
              
              return (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isCompleted && onSelectAssessment?.(type)}
                  disabled={isCompleted}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${isCompleted 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-foreground cursor-pointer'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                  <span>{info.shortTitle}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Cross-Test Insights Unlock Message */}
          <AnimatePresence mode="wait">
            {!hasCrossTestInsights ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30"
              >
                <Lock className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Complete <span className="text-foreground font-medium">{2 - completedCount} more</span> assessment{2 - completedCount > 1 ? 's' : ''} to unlock cross-test insights
                </p>
              </motion.div>
            ) : !allCompleted ? (
              <motion.div
                key="partial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">Cross-test insights unlocked!</span>
                  {' '}Complete all 4 for the full picture.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-sm">
                  <span className="text-primary font-medium">All assessments complete!</span>
                  {' '}
                  <span className="text-muted-foreground">View your comprehensive cross-test analysis.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
