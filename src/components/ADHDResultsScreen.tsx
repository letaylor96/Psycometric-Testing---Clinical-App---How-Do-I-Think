import { motion } from 'framer-motion';
import { ADHDResults, adhdDomainLabels } from '@/data/adhdQuestions';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertTriangle, CheckCircle, Activity, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ADHDResultsScreenProps {
  results: ADHDResults;
  onRestart: () => void;
}

const likelihoodConfig = {
  low: {
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    icon: CheckCircle,
    label: 'Low Likelihood',
  },
  moderate: {
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    icon: Info,
    label: 'Moderate Indicators',
  },
  high: {
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    icon: AlertTriangle,
    label: 'Further Evaluation Suggested',
  },
};

export const ADHDResultsScreen = ({ results, onRestart }: ADHDResultsScreenProps) => {
  const config = likelihoodConfig[results.likelihood];
  const Icon = config.icon;

  const inattentionPercentage = Math.round((results.inattentionScore / (10 * 4)) * 100); // 10 inattention questions, max 4 each
  const hyperactivityPercentage = Math.round((results.hyperactivityScore / (8 * 4)) * 100); // 8 hyperactivity questions, max 4 each

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            <Activity className="w-4 h-4" />
            ADHD Screening Results
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Screening Complete
          </h1>
          <p className="text-muted-foreground">Based on the ASRS-v1.1 (WHO) framework</p>
        </motion.div>

        {/* Main Result Card */}
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
              <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Result</p>
              <h2 className={cn('font-display text-2xl font-bold', config.color)}>{config.label}</h2>
            </div>
          </div>
          
          <p className="text-foreground text-lg leading-relaxed mb-6">{results.interpretation}</p>

          {/* Score Breakdown */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-sm mb-1">Part A Score</p>
              <p className="font-display text-3xl font-bold text-foreground">{results.partAScore}/6</p>
              <p className="text-xs text-muted-foreground mt-1">
                {results.partAThreshold ? 'Above threshold' : 'Below threshold'}
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-muted-foreground text-sm mb-1">Total Score</p>
              <p className="font-display text-3xl font-bold text-foreground">{results.totalScore}/{results.maxScore}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((results.totalScore / results.maxScore) * 100)}% symptom frequency
              </p>
            </div>
          </div>

          {/* Domain Breakdown */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{adhdDomainLabels.inattention}</span>
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
                <span className="font-medium text-foreground">{adhdDomainLabels.hyperactivity}</span>
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

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Important Disclaimer</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {results.disclaimer}
              </p>
            </div>
          </div>
        </motion.div>

        {/* What Next */}
        {results.likelihood !== 'low' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-elevated rounded-2xl p-6 border border-primary/20 mb-8"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Suggested Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span className="text-muted-foreground">Consider discussing these results with your primary care physician or a mental health professional.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                <span className="text-muted-foreground">Keep track of symptoms and how they affect your daily life, work, and relationships.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                <span className="text-muted-foreground">A comprehensive evaluation typically includes clinical interviews, medical history, and sometimes neuropsychological testing.</span>
              </li>
            </ul>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button onClick={onRestart} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Assessment
          </Button>
        </motion.div>
      </div>
    </div>
  );
};