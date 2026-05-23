import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sun, Zap, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { generateOptimalConditionInsights, OptimalConditionInsight } from '@/lib/cognitiveInsightsIntelligence';
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
  
  const insights = generateOptimalConditionInsights(
    iqResults || null,
    personalityResults || null,
    adhdResults || null,
    cognitiveStyleResults || null
  );
  
  if (insights.length === 0) return null;
  
  const hasMoreInsights = insights.length > 2;
  const displayedInsights = isExpanded ? insights : insights.slice(0, 2);
  const hiddenCount = insights.length - 2;
  
  return (
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
          <AnimatePresence mode="wait">
            {displayedInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
          </AnimatePresence>
          
          {hasMoreInsights && (
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between text-muted-foreground hover:text-foreground"
            >
              <span>{isExpanded ? 'Show Less' : `Show ${hiddenCount} More Insights`}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
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
