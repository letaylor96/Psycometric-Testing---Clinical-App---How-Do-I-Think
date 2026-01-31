import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Lightbulb, Star, ChevronDown, ChevronUp, Lock, Crown, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { generateCognitiveFrictionAlerts, CognitiveFrictionAlert } from '@/lib/cognitiveInsightsIntelligence';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from './PremiumGate';
import { cn } from '@/lib/utils';

interface CognitiveFrictionAlertsProps {
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
  className?: string;
}

const typeConfig = {
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    label: 'Watch For',
  },
  tip: {
    icon: Lightbulb,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    label: 'Tip',
  },
  strength: {
    icon: Star,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    label: 'Strength',
  },
};

export const CognitiveFrictionAlerts = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
  className
}: CognitiveFrictionAlertsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const { hasPremiumAccess } = usePremiumAccess();
  
  const alerts = generateCognitiveFrictionAlerts(
    iqResults || null,
    personalityResults || null,
    adhdResults || null,
    cognitiveStyleResults || null
  );
  
  if (alerts.length === 0) return null;
  
  // Show first 2 alerts free
  const freeAlerts = alerts.slice(0, 2);
  const premiumAlerts = alerts.slice(2);
  const hasMoreAlerts = premiumAlerts.length > 0;
  
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
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="font-display font-semibold text-lg">Your Inner Coach</h3>
        </div>
        
        <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Cognitive Friction Alerts
            </CardTitle>
            <CardDescription>
              Personalized warnings and tips based on your cognitive patterns
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Free Alerts */}
            {freeAlerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
            
            {/* Premium Alerts */}
            {hasMoreAlerts && (
              <>
                {hasPremiumAccess ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="w-full justify-between text-muted-foreground hover:text-foreground"
                    >
                      <span>{isExpanded ? 'Show Less' : `Show ${premiumAlerts.length} More Alerts`}</span>
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
                          {premiumAlerts.map((alert, index) => (
                            <AlertCard key={alert.id} alert={alert} index={index + 2} />
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
                        {premiumAlerts.length} more personalized coaching alerts based on your profile...
                      </p>
                    </div>
                    
                    {/* Lock Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] rounded-xl">
                      <Button
                        onClick={handleUnlock}
                        variant="outline"
                        className="border-amber-500/30 hover:bg-amber-500/10"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Unlock All Alerts
                        <Crown className="w-3 h-3 ml-2 text-amber-500" />
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
        feature="Cognitive Friction Alerts"
      />
    </>
  );
};

// Sub-component for individual alert cards
function AlertCard({ alert, index }: { alert: CognitiveFrictionAlert; index: number }) {
  const config = typeConfig[alert.type];
  const IconComponent = config.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "p-4 rounded-xl border transition-colors",
        config.bg,
        config.border,
        "hover:border-opacity-50"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("text-2xl flex-shrink-0")}>{alert.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs flex items-center gap-1",
              config.bg,
              config.color
            )}>
              <IconComponent className="w-3 h-3" />
              {config.label}
            </span>
            <h4 className="font-medium text-sm text-muted-foreground">{alert.situation}</h4>
          </div>
          <p className="text-sm leading-relaxed font-medium">
            {alert.advice}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on: {alert.basedOn}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
