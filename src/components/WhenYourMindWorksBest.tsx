import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sun, Zap, Brain, ChevronDown, ChevronUp, Lock, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { generateOptimalConditionInsights, OptimalConditionInsight } from '@/lib/cognitiveInsightsIntelligence';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from './PremiumGate';
import { cn } from '@/lib/utils';

interface WhenYourMindWorksBestProps {
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
  className?: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  timing: <Clock className="w-4 h-4" />,
  environment: <Sun className="w-4 h-4" />,
  task_type: <Zap className="w-4 h-4" />,
  pressure: <Brain className="w-4 h-4" />,
  load: <Brain className="w-4 h-4" />,
};

const categoryLabels: Record<string, string> = {
  timing: 'Timing',
  environment: 'Environment',
  task_type: 'Task Type',
  pressure: 'Pressure',
  load: 'Cognitive Load',
};

export const WhenYourMindWorksBest = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
  className
}: WhenYourMindWorksBestProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const { hasPremiumAccess } = usePremiumAccess();
  
  const insights = generateOptimalConditionInsights(
    iqResults || null,
    personalityResults || null,
    adhdResults || null,
    cognitiveStyleResults || null
  );
  
  if (insights.length === 0) return null;
  
  // Show first 2 insights free, rest premium
  const freeInsights = insights.slice(0, 2);
  const premiumInsights = insights.slice(2);
  const hasMoreInsights = premiumInsights.length > 0;
  
  const handleUnlock = () => {
    if (!hasPremiumAccess) {
      setShowPremiumGate(true);
      return;
    }
    setIsExpanded(true);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("", className)}
      >
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-lg">When Your Mind Works Best</h3>
        </div>
        
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sun className="w-5 h-5 text-primary" />
              Optimal Conditions
            </CardTitle>
            <CardDescription>
              Dynamic insights based on your unique cognitive profile
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Free Insights */}
            {freeInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
            
            {/* Premium Insights */}
            {hasMoreInsights && (
              <>
                {hasPremiumAccess ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="w-full justify-between text-muted-foreground hover:text-foreground"
                    >
                      <span>{isExpanded ? 'Show Less' : `Show ${premiumInsights.length} More Insights`}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden space-y-4"
                        >
                          {premiumInsights.map((insight, index) => (
                            <InsightCard key={insight.id} insight={insight} index={index + 2} />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="relative">
                    {/* Blurred Preview */}
                    <div className="p-4 rounded-xl bg-muted/30 border border-border blur-[6px] select-none pointer-events-none">
                      <p className="text-sm text-foreground">
                        {premiumInsights.length} more personalized insights about your optimal working conditions...
                      </p>
                    </div>
                    
                    {/* Lock Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] rounded-xl">
                      <Button
                        onClick={handleUnlock}
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Unlock All Insights
                        <Crown className="w-3 h-3 ml-2 text-primary" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      <PremiumGate
        isOpen={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onUnlocked={() => {
          setIsExpanded(true);
          setShowPremiumGate(false);
        }}
        feature="Optimal Condition Insights"
        currentGameState="dashboard"
      />
    </>
  );
};

// Sub-component for individual insight cards
function InsightCard({ insight, index }: { insight: OptimalConditionInsight; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{insight.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold text-sm">{insight.title}</h4>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs flex items-center gap-1">
              {categoryIcons[insight.category]}
              {categoryLabels[insight.category]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {insight.insight}
          </p>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Based on: {insight.source}</span>
            <span className="text-primary">{insight.confidence}% confidence</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
