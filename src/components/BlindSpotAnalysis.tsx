import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Lock, AlertTriangle, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { analyzeBlindSpot, BlindSpotAnalysisResult } from '@/lib/blindSpotIntelligence';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from './PremiumGate';
import { cn } from '@/lib/utils';

interface BlindSpotAnalysisProps {
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
  className?: string;
}

export const BlindSpotAnalysis = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
  className
}: BlindSpotAnalysisProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const { hasPremiumAccess } = usePremiumAccess();
  
  const result: BlindSpotAnalysisResult | null = analyzeBlindSpot(
    iqResults,
    personalityResults,
    adhdResults,
    cognitiveStyleResults
  );
  
  if (!result) return null;
  
  const handleReveal = () => {
    setIsRevealed(true);
  };
  
  const handleUnlockDetails = () => {
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
            <Eye className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="font-display font-semibold text-lg">Hidden Patterns</h3>
        </div>
        
        <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Blind Spot Analysis
                </CardTitle>
                <CardDescription className="mt-1">
                  Every cognitive profile has one dominant blind spot.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Pre-reveal State */}
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.div
                  key="hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
                    Based on your assessment data, we've identified a recurring cognitive pattern 
                    that may operate below your awareness.
                  </p>
                  <Button 
                    onClick={handleReveal}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Reveal My Blind Spot
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Blind Spot Name - Always Visible */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Your Dominant Blind Spot
                      </span>
                      <span className="text-xs text-amber-500 font-medium">
                        {result.confidence}% confidence
                      </span>
                    </div>
                    <h4 className="font-display text-xl font-bold text-amber-500">
                      {result.blindSpot.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Detected via {result.detectionSource}
                    </p>
                  </div>
                  
                  {/* Premium Content - Locked or Expanded */}
                  {!hasPremiumAccess ? (
                    <div className="relative">
                      {/* Blurred Preview */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-border blur-[6px] select-none pointer-events-none">
                        <p className="text-sm text-foreground">
                          {result.blindSpot.description.substring(0, 80)}...
                        </p>
                        <div className="mt-3 space-y-2">
                          <div className="h-3 bg-muted rounded w-3/4" />
                          <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                      
                      {/* Lock Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] rounded-xl">
                        <Button
                          onClick={handleUnlockDetails}
                          variant="outline"
                          className="border-amber-500/30 hover:bg-amber-500/10"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Unlock Full Analysis
                          <Crown className="w-3 h-3 ml-2 text-amber-500" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Toggle Button */}
                      <Button
                        variant="ghost"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full justify-between text-muted-foreground hover:text-foreground"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Full Analysis'}</span>
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
                            {/* What It Is */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border">
                              <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-xs text-amber-500">1</span>
                                What It Is
                              </h5>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {result.blindSpot.description}
                              </p>
                            </div>
                            
                            {/* How It Shows Up */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border">
                              <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-xs text-amber-500">2</span>
                                How It Shows Up
                              </h5>
                              <ul className="space-y-2">
                                {result.blindSpot.howItShowsUp.map((item, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">→</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Where It Causes Friction */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border">
                              <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-xs text-amber-500">3</span>
                                Where It Causes Friction
                              </h5>
                              <ul className="space-y-2">
                                {result.blindSpot.frictionPoints.map((item, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Awareness Cue */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20">
                              <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-xs">💡</span>
                                Awareness Cue
                              </h5>
                              <p className="text-sm text-amber-100/90 italic">
                                "{result.blindSpot.awarenessCue}"
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
        feature="Blind Spot Analysis"
        currentGameState="dashboard"
      />
    </>
  );
};
