import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  TrendingUp, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Target, 
  DollarSign,
  Users,
  Zap,
  Crown,
  Star,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  CareerMatch, 
  CareerMatchContext, 
  getTopCareerMatches,
  getCareerCategoryBreakdown 
} from '@/lib/careerMatchIntelligence';

interface CareerMatchRecommendationsProps {
  context: CareerMatchContext;
  isPremium: boolean;
  onUnlockPremium?: () => void;
}

const growthColors = {
  high: 'text-emerald-400',
  moderate: 'text-yellow-400',
  stable: 'text-blue-400'
};

const growthLabels = {
  high: 'High Growth',
  moderate: 'Moderate Growth',
  stable: 'Stable'
};

export const CareerMatchRecommendations = ({ 
  context, 
  isPremium, 
  onUnlockPremium 
}: CareerMatchRecommendationsProps) => {
  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Check if user has completed required assessments
  const hasIQ = !!context.iqResults;
  const hasPersonality = !!context.personalityResults;
  const completedCount = [context.iqResults, context.personalityResults, context.adhdResults, context.cognitiveStyleResults].filter(Boolean).length;
  const canShowRecommendations = hasIQ || hasPersonality;

  // Get recommendations
  const allMatches = getTopCareerMatches(context, 10);
  const categoryBreakdown = getCareerCategoryBreakdown(context);
  
  // For free users, show limited results with blur
  const visibleMatches = isPremium ? (showAll ? allMatches : allMatches.slice(0, 5)) : allMatches.slice(0, 3);
  const hiddenCount = allMatches.length - 3;

  // Get top categories
  const topCategories = Object.entries(categoryBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  if (!canShowRecommendations) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated rounded-2xl p-8 border border-primary/20 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">Career Match Recommendations</h3>
        <p className="text-muted-foreground mb-4">
          Complete at least one assessment to unlock personalized career recommendations based on your cognitive profile.
        </p>
        <Button variant="outline" onClick={onUnlockPremium}>
          Get Started
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Card */}
      <div className="card-elevated rounded-2xl p-6 border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />
        
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-7 h-7 text-yellow-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
                {isPremium ? 'Premium' : 'Preview'}
              </span>
              {completedCount >= 3 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {completedCount} Assessments
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Career Match Intelligence</h3>
            <p className="text-muted-foreground text-sm">
              AI-powered profession recommendations based on Lumosity cognitive research & Holland Codes
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {topCategories.map(([category, score]) => (
            <div key={category} className="p-3 rounded-xl bg-muted/30 text-center">
              <p className="text-2xl font-display font-bold text-foreground">{score}%</p>
              <p className="text-xs text-muted-foreground truncate">{category}</p>
            </div>
          ))}
        </div>

        {!isPremium && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <Lock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Unlock Full Career Analysis</p>
              <p className="text-xs text-muted-foreground">See all {allMatches.length} matched careers with detailed insights</p>
            </div>
            <Button 
              size="sm" 
              onClick={onUnlockPremium}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
            >
              Unlock $3
            </Button>
          </div>
        )}
      </div>

      {/* Career Cards */}
      <div className="space-y-4">
        {visibleMatches.map((career, index) => (
          <CareerCard 
            key={career.title}
            career={career}
            rank={index + 1}
            isExpanded={expandedCareer === career.title}
            onToggle={() => setExpandedCareer(expandedCareer === career.title ? null : career.title)}
            isPremium={isPremium}
            isBlurred={!isPremium && index >= 2}
          />
        ))}
      </div>

      {/* Show More / Locked State */}
      {isPremium ? (
        allMatches.length > 5 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show ${allMatches.length - 5} More Careers`}
            {showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </Button>
        )
      ) : (
        <div className="relative">
          {/* Blurred preview of locked careers */}
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-background via-background/80 to-transparent z-10 flex flex-col items-center justify-center rounded-2xl">
            <Lock className="w-8 h-8 text-yellow-400 mb-3" />
            <p className="font-display font-bold text-lg mb-1">+{hiddenCount} More Career Matches</p>
            <p className="text-sm text-muted-foreground mb-4">Unlock premium to see all recommendations</p>
            <Button 
              onClick={onUnlockPremium}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Unlock Full Analysis
            </Button>
          </div>
          <div className="opacity-30 pointer-events-none">
            {allMatches.slice(3, 5).map((career, index) => (
              <div key={career.title} className="card-elevated rounded-xl p-4 mb-3 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <span className="font-bold text-muted-foreground">#{index + 4}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{career.title}</p>
                    <p className="text-sm text-muted-foreground">{career.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Individual Career Card Component
interface CareerCardProps {
  career: CareerMatch;
  rank: number;
  isExpanded: boolean;
  onToggle: () => void;
  isPremium: boolean;
  isBlurred?: boolean;
}

const CareerCard = ({ career, rank, isExpanded, onToggle, isPremium, isBlurred }: CareerCardProps) => {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black';
    if (rank === 2) return 'bg-gradient-to-br from-slate-300 to-slate-500 text-black';
    if (rank === 3) return 'bg-gradient-to-br from-orange-400 to-orange-600 text-black';
    return 'bg-muted text-muted-foreground';
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 65) return 'text-primary';
    if (score >= 50) return 'text-yellow-400';
    return 'text-muted-foreground';
  };

  return (
    <motion.div
      layout
      className={cn(
        "card-elevated rounded-xl border transition-all cursor-pointer hover:border-primary/30",
        isExpanded ? 'border-primary/40' : 'border-border',
        isBlurred && 'opacity-40 blur-[2px] pointer-events-none'
      )}
      onClick={onToggle}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Rank Badge */}
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold",
            getRankStyle(rank)
          )}>
            {rank <= 3 ? (
              <Crown className="w-5 h-5" />
            ) : (
              `#${rank}`
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h4 className="font-display font-semibold text-lg text-foreground">{career.title}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">{career.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className={cn("text-sm font-medium", growthColors[career.growthOutlook])}>
                    {growthLabels[career.growthOutlook]}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={cn("font-display text-2xl font-bold", getMatchColor(career.matchScore))}>
                  {career.matchScore}%
                </p>
                <p className="text-xs text-muted-foreground">Match</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>{career.salaryRange}</span>
              </div>
            </div>

            {/* Key Strengths Tags */}
            {career.keyStrengths.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {career.keyStrengths.slice(0, 3).map((strength, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Expand Arrow */}
          <div className="flex-shrink-0 mt-2">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && isPremium && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-border">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Cognitive Alignment */}
                {career.cognitiveAlignment.length > 0 && (
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Cognitive Alignment</span>
                    </div>
                    <ul className="space-y-1">
                      {career.cognitiveAlignment.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Zap className="w-3 h-3 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Personality Fit */}
                {career.personalityFit.length > 0 && (
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">Personality Fit</span>
                    </div>
                    <ul className="space-y-1">
                      {career.personalityFit.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Star className="w-3 h-3 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Daily Activities */}
              <div className="mt-4 p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-foreground">Typical Day</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {career.dailyActivities.map((activity, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-background/50 text-xs text-muted-foreground">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Famous Examples */}
              {career.famousExamples && career.famousExamples.length > 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Notable examples:</span>
                  <div className="flex flex-wrap gap-2">
                    {career.famousExamples.map((name, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-xs font-medium">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
