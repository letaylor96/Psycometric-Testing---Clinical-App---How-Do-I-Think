import { motion } from 'framer-motion';
import { TestResults, categoryLabels } from '@/data/quizQuestions';
import { PersonalityResults, PersonalityTrait, personalityTraitLabels } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { TrendingUp, Users, BarChart3, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PopulationComparisonProps {
  iqResults: TestResults | null;
  personalityResults: PersonalityResults | null;
  adhdResults: ADHDResults | null;
}

// Population averages based on research data
const populationAverages = {
  iq: {
    overall: 100,
    verbal: 50,
    numerical: 50,
    spatial: 50,
    pattern: 50,
    logical: 50,
  },
  personality: {
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50,
  },
  adhd: {
    inattention: 25, // Average % of max score in general population
    hyperactivity: 20,
    totalSymptoms: 3, // Average positive symptoms in general population
  },
};

// Calculate IQ percentile using standard normal distribution approximation
const getIQPercentile = (iq: number): number => {
  // IQ has mean 100, SD 15
  const z = (iq - 100) / 15;
  // Approximate CDF using logistics function
  const percentile = 100 / (1 + Math.exp(-1.702 * z));
  return Math.round(percentile * 10) / 10;
};

// Get personality trait percentile (assuming normal distribution, mean 50, SD ~20)
const getTraitPercentile = (score: number): number => {
  const z = (score - 50) / 20;
  const percentile = 100 / (1 + Math.exp(-1.702 * z));
  return Math.round(percentile * 10) / 10;
};

// Get comparison text
const getComparisonText = (userValue: number, average: number): { text: string; icon: 'up' | 'down' | 'same'; color: string } => {
  const diff = userValue - average;
  const percentDiff = Math.abs(Math.round((diff / average) * 100));
  
  if (percentDiff < 10) {
    return { text: 'Average', icon: 'same', color: 'text-muted-foreground' };
  } else if (diff > 0) {
    return { text: `${percentDiff}% above avg`, icon: 'up', color: 'text-emerald-500' };
  } else {
    return { text: `${percentDiff}% below avg`, icon: 'down', color: 'text-orange-500' };
  }
};

interface ComparisonBarProps {
  label: string;
  userValue: number;
  populationAvg: number;
  percentile: number;
  color: string;
  maxValue?: number;
}

const ComparisonBar = ({ label, userValue, populationAvg, percentile, color, maxValue = 100 }: ComparisonBarProps) => {
  const comparison = getComparisonText(userValue, populationAvg);
  const userPercent = (userValue / maxValue) * 100;
  const avgPercent = (populationAvg / maxValue) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className={cn('flex items-center gap-1 text-xs', comparison.color)}>
            {comparison.icon === 'up' && <ArrowUp className="w-3 h-3" />}
            {comparison.icon === 'down' && <ArrowDown className="w-3 h-3" />}
            {comparison.icon === 'same' && <Minus className="w-3 h-3" />}
            {comparison.text}
          </span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Top {(100 - percentile).toFixed(1)}%
          </span>
        </div>
      </div>
      
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        {/* Population average marker */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-foreground/50 z-10"
          style={{ left: `${avgPercent}%` }}
        />
        <div 
          className="absolute -top-5 text-[10px] text-muted-foreground whitespace-nowrap"
          style={{ left: `${avgPercent}%`, transform: 'translateX(-50%)' }}
        >
          Avg
        </div>
        
        {/* User score bar */}
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${userPercent}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Your score: {Math.round(userValue)}</span>
        <span>Pop. avg: {Math.round(populationAvg)}</span>
      </div>
    </div>
  );
};

interface PercentileGaugeProps {
  percentile: number;
  label: string;
  sublabel?: string;
}

const PercentileGauge = ({ percentile, label, sublabel }: PercentileGaugeProps) => {
  const rotation = (percentile / 100) * 180 - 90; // -90 to 90 degrees
  
  return (
    <div className="text-center">
      <div className="relative w-32 h-16 mx-auto overflow-hidden">
        {/* Background arc */}
        <div className="absolute inset-0 border-8 border-muted rounded-t-full" />
        
        {/* Colored segments */}
        <div className="absolute inset-0 border-8 border-transparent border-t-red-500/30 border-l-orange-500/30 rounded-t-full" style={{ clipPath: 'polygon(0 100%, 0 0, 25% 0, 25% 100%)' }} />
        <div className="absolute inset-0 border-8 border-transparent border-t-yellow-500/30 rounded-t-full" style={{ clipPath: 'polygon(25% 100%, 25% 0, 50% 0, 50% 100%)' }} />
        <div className="absolute inset-0 border-8 border-transparent border-t-emerald-500/30 rounded-t-full" style={{ clipPath: 'polygon(50% 100%, 50% 0, 75% 0, 75% 100%)' }} />
        <div className="absolute inset-0 border-8 border-transparent border-t-primary/30 rounded-t-full" style={{ clipPath: 'polygon(75% 100%, 75% 0, 100% 0, 100% 100%)' }} />
        
        {/* Needle */}
        <motion.div 
          className="absolute bottom-0 left-1/2 w-1 h-14 bg-gradient-to-t from-foreground to-transparent origin-bottom rounded-full"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ marginLeft: '-2px' }}
        />
        
        {/* Center dot */}
        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-foreground rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <p className="font-display text-2xl font-bold mt-2 text-foreground">{percentile.toFixed(1)}%</p>
      <p className="text-sm font-medium text-foreground">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
    </div>
  );
};

export const PopulationComparison = ({ iqResults, personalityResults, adhdResults }: PopulationComparisonProps) => {
  const hasAnyResults = iqResults || personalityResults || adhdResults;
  
  if (!hasAnyResults) return null;

  // Calculate overall percentiles
  const iqPercentile = iqResults ? getIQPercentile(iqResults.iq) : null;
  
  const personalityPercentiles = personalityResults 
    ? (Object.entries(personalityResults.scores) as [PersonalityTrait, number][]).map(([trait, score]) => ({
        trait,
        percentile: getTraitPercentile(score),
        score,
      }))
    : [];

  // ADHD comparison (lower is better for general population comparison)
  const adhdSeverityPercent = adhdResults 
    ? (adhdResults.totalScore / adhdResults.maxScore) * 100 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card-elevated rounded-2xl p-6 border border-border mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Population Comparison</h3>
          <p className="text-xs text-muted-foreground">See how you compare to the general population</p>
        </div>
      </div>

      {/* Percentile Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 pb-6 border-b border-border">
        {iqPercentile !== null && (
          <PercentileGauge 
            percentile={iqPercentile} 
            label="Cognitive Ability" 
            sublabel={`Top ${(100 - iqPercentile).toFixed(1)}% globally`}
          />
        )}
        
        {personalityResults && (
          <PercentileGauge 
            percentile={getTraitPercentile(personalityResults.scores[personalityResults.dominantTrait])} 
            label={personalityTraitLabels[personalityResults.dominantTrait].label}
            sublabel="Dominant trait"
          />
        )}
        
        {adhdResults && (
          <PercentileGauge 
            percentile={100 - (adhdSeverityPercent || 0)} 
            label="Focus & Attention"
            sublabel={adhdResults.likelihood === 'low' ? 'Typical range' : 'Some indicators'}
          />
        )}
      </div>

      {/* Detailed Comparisons */}
      <div className="space-y-8">
        {/* IQ Category Comparisons */}
        {iqResults && (
          <div>
            <h4 className="font-medium text-sm text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Cognitive Categories vs Population
            </h4>
            <div className="space-y-6">
              {iqResults.categoryScores.map((cat, i) => (
                <ComparisonBar
                  key={cat.category}
                  label={categoryLabels[cat.category]}
                  userValue={cat.percentage}
                  populationAvg={populationAverages.iq[cat.category as keyof typeof populationAverages.iq] || 50}
                  percentile={getTraitPercentile(cat.percentage)}
                  color={['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(252, 100%, 69%)', 'hsl(170, 100%, 50%)', 'hsl(340, 100%, 60%)'][i % 5]}
                />
              ))}
            </div>
          </div>
        )}

        {/* Personality Trait Comparisons */}
        {personalityResults && (
          <div>
            <h4 className="font-medium text-sm text-foreground mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              Personality Traits vs Population
            </h4>
            <div className="space-y-6">
              {(Object.entries(personalityResults.scores) as [PersonalityTrait, number][]).map(([trait, score], i) => (
                <ComparisonBar
                  key={trait}
                  label={personalityTraitLabels[trait].label}
                  userValue={score}
                  populationAvg={populationAverages.personality[trait]}
                  percentile={getTraitPercentile(score)}
                  color={['#A855F7', '#3B82F6', '#F59E0B', '#10B981', '#EC4899'][i % 5]}
                />
              ))}
            </div>
          </div>
        )}

        {/* ADHD Domain Comparisons */}
        {adhdResults && (
          <div>
            <h4 className="font-medium text-sm text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-yellow-500" />
              Attention Patterns vs Population
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Symptoms</span>
                  <span className="text-2xl font-bold text-foreground">{adhdResults.totalPositiveSymptoms}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  General population average: ~{populationAverages.adhd.totalSymptoms} symptoms
                </p>
                <div className="mt-2 flex items-center gap-2">
                  {adhdResults.totalPositiveSymptoms <= populationAverages.adhd.totalSymptoms ? (
                    <span className="text-xs text-emerald-500 flex items-center gap-1">
                      <ArrowDown className="w-3 h-3" /> Within typical range
                    </span>
                  ) : (
                    <span className="text-xs text-orange-500 flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" /> Above average frequency
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Severity Index</span>
                  <span className="text-2xl font-bold text-foreground">
                    {Math.round((adhdResults.totalScore / adhdResults.maxScore) * 100)}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on frequency of all 18 symptoms
                </p>
                <div className="mt-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        'h-full rounded-full',
                        adhdResults.likelihood === 'low' && 'bg-emerald-500',
                        adhdResults.likelihood === 'moderate' && 'bg-yellow-500',
                        adhdResults.likelihood === 'high' && 'bg-orange-500'
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${(adhdResults.totalScore / adhdResults.maxScore) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interpretation Note */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Note:</strong> Population averages are based on standardized norms from research literature. 
          IQ percentiles follow the standard normal distribution (mean=100, SD=15). Personality percentiles 
          assume a normal distribution around the population mean. These comparisons are for informational 
          purposes and should not be used for clinical diagnosis.
        </p>
      </div>
    </motion.div>
  );
};
