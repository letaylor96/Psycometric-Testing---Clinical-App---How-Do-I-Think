import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { findTopMatches, HistoricalMatch } from '@/data/historicalThinkers';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { Scroll, Crown, Brain, Sparkles, ChevronRight, Quote, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { PremiumGate } from '@/components/PremiumGate';

interface HistoricalThinkerMatchProps {
  iqResults: TestResults | null;
  personalityResults: PersonalityResults | null;
  adhdResults: ADHDResults | null;
  cognitiveStyleResults: CognitiveStyleResults | null;
}

export const HistoricalThinkerMatch = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
}: HistoricalThinkerMatchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [matches, setMatches] = useState<HistoricalMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<HistoricalMatch | null>(null);
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const { hasPremiumAccess } = usePremiumAccess();

  const hasAnyResults = iqResults || personalityResults || adhdResults || cognitiveStyleResults;

  const handleClick = () => {
    if (!hasPremiumAccess) {
      setShowPremiumGate(true);
      return;
    }
    handleGenerateReport();
  };

  const handleGenerateReport = () => {
    setIsLoading(true);
    setIsOpen(true);
    
    // Simulate processing time for dramatic effect
    setTimeout(() => {
      const userIQ = iqResults?.iq ?? null;
      const userPersonality = personalityResults?.scores ?? null;
      
      // Convert cognitive style results to dimension scores
      const userCognitive = cognitiveStyleResults?.dimensionScores 
        ? Object.fromEntries(
            cognitiveStyleResults.dimensionScores.map(d => [d.dimension, d.score])
          )
        : null;
      
      // Convert ADHD results to percentage scores
      const userADHD = adhdResults 
        ? {
            inattention: (adhdResults.inattentionPositive / 9) * 100,
            hyperactivity: (adhdResults.hyperactivityPositive / 9) * 100,
          }
        : null;
      
      const topMatches = findTopMatches(userIQ, userPersonality, userCognitive, userADHD, 5);
      setMatches(topMatches);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={!hasAnyResults}
        className={cn(
          "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white",
          !hasPremiumAccess && "opacity-90"
        )}
      >
        {!hasPremiumAccess && <Lock className="w-3 h-3 mr-1.5" />}
        <Scroll className="w-4 h-4 mr-2" />
        Historical Mind Match
      </Button>

      <PremiumGate
        isOpen={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onUnlocked={handleGenerateReport}
        feature="Historical Mind Match"
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 font-serif text-2xl">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-500" />
              </div>
              Historical Mind Match
            </DialogTitle>
            <DialogDescription>
              Discover which great minds from history share your cognitive patterns
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 mx-auto mb-6"
                />
                <p className="text-muted-foreground">Analyzing cognitive patterns across history...</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {matches.map((match, index) => (
                  <motion.div
                    key={match.thinker.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedMatch(selectedMatch?.thinker.id === match.thinker.id ? null : match)}
                    className={cn(
                      "p-5 rounded-xl border transition-all cursor-pointer",
                      index === 0 
                        ? "bg-gradient-to-r from-amber-500/10 to-amber-500/5 border-amber-500/30" 
                        : "bg-card border-border hover:border-primary/30",
                      selectedMatch?.thinker.id === match.thinker.id && "ring-2 ring-primary"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Rank & Symbol */}
                      <div className="flex flex-col items-center gap-2">
                        <span className={cn(
                          "text-2xl font-bold",
                          index === 0 ? "text-amber-500" : "text-muted-foreground"
                        )}>
                          #{index + 1}
                        </span>
                        <span className="text-3xl">{match.thinker.imageSymbol}</span>
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-serif text-lg font-semibold">{match.thinker.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {match.thinker.field} · {match.thinker.era}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={cn(
                              "text-2xl font-bold",
                              match.overallScore >= 80 ? "text-amber-500" :
                              match.overallScore >= 60 ? "text-primary" :
                              "text-muted-foreground"
                            )}>
                              {Math.round(match.overallScore)}%
                            </span>
                            <p className="text-xs text-muted-foreground">match</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{match.thinker.description}</p>

                        {/* Match Reasons */}
                        {match.matchReasons.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {match.matchReasons.map((reason, i) => (
                              <span 
                                key={i}
                                className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                              >
                                {reason}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Expanded View */}
                        <AnimatePresence>
                          {selectedMatch?.thinker.id === match.thinker.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-border"
                            >
                              {/* Quote */}
                              {match.thinker.quote && (
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 mb-4">
                                  <Quote className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm italic text-foreground">"{match.thinker.quote}"</p>
                                </div>
                              )}

                              {/* Match Breakdown */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {iqResults && (
                                  <div className="text-center p-3 rounded-lg bg-primary/5">
                                    <Brain className="w-4 h-4 mx-auto mb-1 text-primary" />
                                    <p className="text-lg font-bold">{Math.round(match.iqMatch)}%</p>
                                    <p className="text-xs text-muted-foreground">IQ Match</p>
                                  </div>
                                )}
                                {personalityResults && (
                                  <div className="text-center p-3 rounded-lg bg-accent/5">
                                    <Sparkles className="w-4 h-4 mx-auto mb-1 text-accent" />
                                    <p className="text-lg font-bold">{Math.round(match.personalityMatch)}%</p>
                                    <p className="text-xs text-muted-foreground">Personality</p>
                                  </div>
                                )}
                                {cognitiveStyleResults && (
                                  <div className="text-center p-3 rounded-lg bg-purple-500/5">
                                    <Brain className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                                    <p className="text-lg font-bold">{Math.round(match.cognitiveMatch)}%</p>
                                    <p className="text-xs text-muted-foreground">Cognitive</p>
                                  </div>
                                )}
                                {adhdResults && (
                                  <div className="text-center p-3 rounded-lg bg-yellow-500/5">
                                    <Sparkles className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
                                    <p className="text-lg font-bold">{Math.round(match.adhdMatch)}%</p>
                                    <p className="text-xs text-muted-foreground">Attention</p>
                                  </div>
                                )}
                              </div>

                              <p className="text-sm text-muted-foreground mt-4">
                                <strong>Known for:</strong> {match.thinker.famousFor}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Expand hint */}
                        <div className="flex items-center justify-end mt-2 text-xs text-muted-foreground">
                          <span>{selectedMatch?.thinker.id === match.thinker.id ? 'Click to collapse' : 'Click to expand'}</span>
                          <ChevronRight className={cn(
                            "w-4 h-4 transition-transform",
                            selectedMatch?.thinker.id === match.thinker.id && "rotate-90"
                          )} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Note */}
                <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
                  Historical cognitive profiles are estimates based on biographical analysis and should be considered illustrative rather than definitive.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};
