import { motion } from 'framer-motion';
import { ADHDResults, adhdDomainLabels } from '@/data/adhdQuestions';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertTriangle, CheckCircle, Activity, Info, LayoutDashboard, Brain, Sparkles, HelpCircle, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PremiumFeatureTeaser } from '@/components/PremiumFeatureTeaser';
import { ShareableResultCard } from '@/components/ShareableResultCard';

interface ADHDResultsScreenProps {
  results: ADHDResults;
  onRestart: () => void;
  onViewDashboard?: () => void;
}

// Direct answer configuration - answers the question "Am I Neurodivergent?"
const answerConfig = {
  low: {
    answer: 'Probably Not',
    emoji: '✓',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-teal-500/20',
    icon: ThumbsDown,
    explanation: 'Your responses suggest neurotypical attention patterns',
    subtitle: 'Your screening indicates typical attention and focus patterns',
  },
  moderate: {
    answer: 'Possibly',
    emoji: '?',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    gradientFrom: 'from-amber-500/20',
    gradientTo: 'to-orange-500/20',
    icon: HelpCircle,
    explanation: 'Your responses show some neurodivergent traits worth exploring',
    subtitle: 'Some indicators present — professional evaluation recommended',
  },
  high: {
    answer: 'Likely Yes',
    emoji: '!',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    gradientFrom: 'from-violet-500/20',
    gradientTo: 'to-purple-500/20',
    icon: Sparkles,
    explanation: 'Your responses strongly suggest neurodivergent thinking patterns',
    subtitle: 'Strong indicators present — professional confirmation recommended',
  },
};

export const ADHDResultsScreen = ({ results, onRestart, onViewDashboard }: ADHDResultsScreenProps) => {
  const config = answerConfig[results.likelihood];
  const Icon = config.icon;

  // Count inattention and hyperactivity questions for accurate percentage calculation
  const inattentionQuestionCount = 9; // 9 inattention questions in ASRS
  const hyperactivityQuestionCount = 9; // 9 hyperactivity questions in ASRS
  
  const inattentionPercentage = Math.round((results.inattentionScore / (inattentionQuestionCount * 4)) * 100);
  const hyperactivityPercentage = Math.round((results.hyperactivityScore / (hyperactivityQuestionCount * 4)) * 100);

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={cn("absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]", config.bgColor)} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header - Direct Answer to the Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-muted-foreground text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Am I Neurodivergent?
          </div>
          
          {/* The Big Answer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={cn(
              "inline-flex items-center gap-4 px-8 py-4 rounded-2xl border-2 mb-4",
              config.borderColor,
              `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`
            )}
          >
            <span className={cn("text-5xl md:text-6xl font-bold font-display", config.color)}>
              {config.answer}
            </span>
          </motion.div>
          
          <p className="text-lg text-muted-foreground mb-2">{config.explanation}</p>
          <p className="text-sm text-muted-foreground">{config.subtitle}</p>
        </motion.div>

        {/* Visual Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={cn(
            'card-elevated rounded-2xl p-8 border mb-8',
            config.borderColor
          )}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', config.bgColor)}>
              <Icon className={cn('w-8 h-8', config.color)} />
            </div>
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">What This Means</p>
              <h2 className="font-display text-xl font-bold text-foreground">Understanding Your Results</h2>
            </div>
          </div>
          
          <p className="text-foreground text-lg leading-relaxed mb-6">{results.interpretation}</p>

          {/* Score Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-xs mb-1">Part A Score</p>
              <p className="font-display text-2xl font-bold text-foreground">{results.partAScore}/6</p>
              <p className="text-xs text-muted-foreground mt-1">
                {results.partAThreshold ? '⚠️ Above threshold' : '✓ Below threshold'}
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-xs mb-1">Part B Positive</p>
              <p className="font-display text-2xl font-bold text-foreground">{results.partBPositiveCount}/12</p>
              <p className="text-xs text-muted-foreground mt-1">
                Extended symptoms
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-xs mb-1">Total Symptoms</p>
              <p className="font-display text-2xl font-bold text-foreground">{results.totalPositiveSymptoms}/18</p>
              <p className="text-xs text-muted-foreground mt-1">
                Above threshold
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-xs mb-1">Severity Index</p>
              <p className="font-display text-2xl font-bold text-foreground">{Math.round((results.totalScore / results.maxScore) * 100)}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                Frequency score
              </p>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{adhdDomainLabels.inattention}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {results.inattentionPositive} symptoms
                  </span>
                </div>
                <span className="text-muted-foreground">{inattentionPercentage}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${inattentionPercentage}%` }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{adhdDomainLabels.hyperactivity}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                    {results.hyperactivityPositive} symptoms
                  </span>
                </div>
                <span className="text-muted-foreground">{hyperactivityPercentage}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${hyperactivityPercentage}%` }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-2xl p-6 border border-primary/20 mb-8"
        >
          <h3 className="font-display font-semibold text-lg mb-4">Recommendations</h3>
          <ul className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Shareable Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <h3 className="font-display font-semibold text-lg mb-4 text-center">Share Your Results</h3>
          <div className="flex justify-center">
            <ShareableResultCard
              variant="neurodivergent"
              adhdLikelihood={config.answer}
              inattentionPct={inattentionPercentage}
              hyperactivityPct={hyperactivityPercentage}
              shareText={`🧠 My Neurodivergent Screening Results\n\nResult: ${config.answer}\nInattention: ${inattentionPercentage}% | Hyperactivity: ${hyperactivityPercentage}%\n\n${config.explanation}\n\nTake the free screening 👇`}
              linkedInText={`Just completed a neurodivergent screening! Result: ${config.answer}. Fascinating insights into how my mind works. Try it yourself!`}
              twitterText={`My neurodivergent screening: ${config.answer} 🧠 Inattention ${inattentionPercentage}% | Hyperactivity ${hyperactivityPercentage}%. Discover your thinking patterns:`}
            />
          </div>
        </motion.div>

        {/* Premium Features Teaser */}
        <PremiumFeatureTeaser className="mb-8" />

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-elevated rounded-2xl p-6 border border-yellow-500/20 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Important Clinical Disclaimer</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {results.disclaimer}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button onClick={onRestart} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Assessment
          </Button>
          {onViewDashboard && (
            <Button onClick={onViewDashboard} size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              View Full Dashboard
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};