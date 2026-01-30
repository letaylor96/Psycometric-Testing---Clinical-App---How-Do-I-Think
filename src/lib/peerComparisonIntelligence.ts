// Peer Comparison Intelligence Module
// Calculates percentile rankings against different cohorts

import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';

export interface PercentileComparison {
  metric: string;
  category: string;
  globalPercentile: number;
  ageMatchedPercentile: number;
  educationMatchedPercentile: number;
  cohortPercentile: number;
  interpretation: string;
}

export interface PeerComparisonResult {
  overallPercentile: number;
  comparisons: PercentileComparison[];
  ageGroup: string;
  educationBand: string;
  cognitiveStyleCohort: string;
}

// Age-based adjustment factors (younger = slightly higher curve, older = slightly more variance)
const AGE_ADJUSTMENTS: Record<string, number> = {
  '18-24': 1.05,
  '25-34': 1.0,
  '35-44': 0.98,
  '45-54': 0.95,
  '55-64': 0.92,
  '65+': 0.88
};

// Education-based adjustment factors
const EDUCATION_ADJUSTMENTS: Record<string, number> = {
  'high_school': 0.9,
  'some_college': 0.95,
  'bachelors': 1.0,
  'masters': 1.08,
  'doctorate': 1.15
};

// Calculate IQ percentile using standard normal distribution
const calculateIQPercentile = (iq: number): number => {
  // IQ follows normal distribution with mean 100, SD 15
  const zScore = (iq - 100) / 15;
  // Approximate cumulative distribution function
  const t = 1 / (1 + 0.2316419 * Math.abs(zScore));
  const d = 0.3989423 * Math.exp(-zScore * zScore / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return zScore > 0 ? Math.round((1 - p) * 100) : Math.round(p * 100);
};

// Calculate percentile from a raw percentage score (0-100)
const calculatePercentileFromScore = (score: number): number => {
  // Assume scores roughly follow normal distribution centered at 50
  if (score >= 90) return 95 + Math.round((score - 90) * 0.5);
  if (score >= 80) return 85 + Math.round((score - 80));
  if (score >= 70) return 70 + Math.round((score - 70) * 1.5);
  if (score >= 60) return 55 + Math.round((score - 60) * 1.5);
  if (score >= 50) return 40 + Math.round((score - 50) * 1.5);
  if (score >= 40) return 25 + Math.round((score - 40) * 1.5);
  if (score >= 30) return 15 + Math.round((score - 30));
  return 5 + Math.round(score * 0.33);
};

// Interpret a percentile ranking
const interpretPercentile = (percentile: number, metric: string): string => {
  if (percentile >= 95) {
    return `Exceptional ${metric.toLowerCase()} - top 5% globally`;
  } else if (percentile >= 85) {
    return `Very strong ${metric.toLowerCase()} - top 15%`;
  } else if (percentile >= 70) {
    return `Above average ${metric.toLowerCase()} - top 30%`;
  } else if (percentile >= 50) {
    return `Typical ${metric.toLowerCase()} for your cohort`;
  } else if (percentile >= 30) {
    return `Slightly below average ${metric.toLowerCase()}`;
  } else {
    return `Lower ${metric.toLowerCase()} - may benefit from targeted development`;
  }
};

// Main analysis function
export const analyzePeerComparison = (
  iqResults?: TestResults | null,
  personalityResults?: PersonalityResults | null,
  adhdResults?: ADHDResults | null,
  cognitiveStyleResults?: CognitiveStyleResults | null,
  ageGroup: string = '25-34',
  educationBand: string = 'bachelors'
): PeerComparisonResult => {
  const comparisons: PercentileComparison[] = [];
  const ageAdjust = AGE_ADJUSTMENTS[ageGroup] || 1.0;
  const eduAdjust = EDUCATION_ADJUSTMENTS[educationBand] || 1.0;
  
  let totalPercentile = 0;
  let metricCount = 0;
  
  // Determine cognitive style cohort
  let cohort = 'General Population';
  if (cognitiveStyleResults?.primaryProfile) {
    cohort = cognitiveStyleResults.primaryProfile.name;
  } else if (personalityResults?.personalityType) {
    cohort = personalityResults.personalityType;
  }
  
  // Analyze IQ
  if (iqResults) {
    const globalPercentile = calculateIQPercentile(iqResults.iq);
    const ageMatched = Math.min(99, Math.round(globalPercentile * ageAdjust));
    const eduMatched = Math.min(99, Math.round(globalPercentile / eduAdjust));
    const cohortMatched = Math.min(99, Math.round(globalPercentile * 0.95)); // Cognitive cohorts tend to be higher IQ
    
    comparisons.push({
      metric: 'Abstract Reasoning',
      category: 'Cognitive',
      globalPercentile,
      ageMatchedPercentile: ageMatched,
      educationMatchedPercentile: eduMatched,
      cohortPercentile: cohortMatched,
      interpretation: interpretPercentile(globalPercentile, 'reasoning ability')
    });
    
    totalPercentile += globalPercentile;
    metricCount++;
    
    // Add cognitive flexibility from divergent profile
    if (iqResults.divergentProfile) {
      const flexScore = iqResults.divergentProfile.find(d => d.dimension === 'flexibility');
      if (flexScore) {
        const flexPercentile = calculatePercentileFromScore(flexScore.percentage);
        comparisons.push({
          metric: 'Cognitive Flexibility',
          category: 'Cognitive',
          globalPercentile: flexPercentile,
          ageMatchedPercentile: Math.min(99, Math.round(flexPercentile * ageAdjust)),
          educationMatchedPercentile: Math.min(99, Math.round(flexPercentile / eduAdjust * 0.95)),
          cohortPercentile: Math.min(99, Math.round(flexPercentile * 0.9)),
          interpretation: interpretPercentile(flexPercentile, 'cognitive flexibility')
        });
        totalPercentile += flexPercentile;
        metricCount++;
      }
    }
  }
  
  // Analyze Personality
  if (personalityResults) {
    // Openness as intellectual curiosity
    const opennessPercentile = calculatePercentileFromScore(personalityResults.scores.openness);
    comparisons.push({
      metric: 'Intellectual Curiosity',
      category: 'Personality',
      globalPercentile: opennessPercentile,
      ageMatchedPercentile: Math.min(99, Math.round(opennessPercentile * (ageAdjust * 0.98))),
      educationMatchedPercentile: Math.min(99, Math.round(opennessPercentile / (eduAdjust * 1.05))),
      cohortPercentile: Math.min(99, Math.round(opennessPercentile * 0.88)),
      interpretation: interpretPercentile(opennessPercentile, 'openness to experience')
    });
    totalPercentile += opennessPercentile;
    metricCount++;
    
    // Emotional stability (inverse of neuroticism)
    const stabilityScore = 100 - personalityResults.scores.neuroticism;
    const stabilityPercentile = calculatePercentileFromScore(stabilityScore);
    comparisons.push({
      metric: 'Emotional Stability',
      category: 'Personality',
      globalPercentile: stabilityPercentile,
      ageMatchedPercentile: Math.min(99, Math.round(stabilityPercentile * (ageAdjust * 1.02))),
      educationMatchedPercentile: Math.min(99, Math.round(stabilityPercentile * 1.0)),
      cohortPercentile: Math.min(99, Math.round(stabilityPercentile * 0.92)),
      interpretation: interpretPercentile(stabilityPercentile, 'emotional stability')
    });
    totalPercentile += stabilityPercentile;
    metricCount++;
  }
  
  // Analyze ADHD - Attentional Consistency
  if (adhdResults) {
    // Lower ADHD scores = higher attentional consistency
    const maxPossibleScore = 18 * 4; // 18 questions, max 4 points each
    const normalizedScore = 100 - ((adhdResults.inattentionScore + adhdResults.hyperactivityScore) / maxPossibleScore * 100);
    const attentionPercentile = calculatePercentileFromScore(normalizedScore);
    
    comparisons.push({
      metric: 'Attentional Consistency',
      category: 'Attention',
      globalPercentile: attentionPercentile,
      ageMatchedPercentile: Math.min(99, Math.round(attentionPercentile * (ageAdjust * 0.95))),
      educationMatchedPercentile: Math.min(99, Math.round(attentionPercentile * 1.0)),
      cohortPercentile: Math.min(99, Math.round(attentionPercentile * 1.1)), // Cognitive style cohorts may have more ADHD traits
      interpretation: interpretPercentile(attentionPercentile, 'attentional consistency')
    });
    totalPercentile += attentionPercentile;
    metricCount++;
  }
  
  // Analyze Cognitive Style dimensions
  if (cognitiveStyleResults) {
    // Pattern recognition
    const patternDim = cognitiveStyleResults.dimensionScores.find(d => d.dimension === 'pattern_recognition');
    if (patternDim) {
      const patternPercentile = calculatePercentileFromScore(patternDim.percentage);
      comparisons.push({
        metric: 'Pattern Recognition',
        category: 'Cognitive Style',
        globalPercentile: patternPercentile,
        ageMatchedPercentile: Math.min(99, Math.round(patternPercentile * ageAdjust)),
        educationMatchedPercentile: Math.min(99, Math.round(patternPercentile / eduAdjust)),
        cohortPercentile: Math.min(99, Math.round(patternPercentile * 0.85)),
        interpretation: interpretPercentile(patternPercentile, 'pattern recognition')
      });
      totalPercentile += patternPercentile;
      metricCount++;
    }
  }
  
  const overallPercentile = metricCount > 0 ? Math.round(totalPercentile / metricCount) : 50;
  
  return {
    overallPercentile,
    comparisons,
    ageGroup,
    educationBand,
    cognitiveStyleCohort: cohort
  };
};

// Get readable age group label
export const getAgeGroupLabel = (ageGroup: string): string => {
  const labels: Record<string, string> = {
    '18-24': '18-24 years',
    '25-34': '25-34 years',
    '35-44': '35-44 years',
    '45-54': '45-54 years',
    '55-64': '55-64 years',
    '65+': '65+ years'
  };
  return labels[ageGroup] || ageGroup;
};

// Get readable education label
export const getEducationLabel = (educationBand: string): string => {
  const labels: Record<string, string> = {
    'high_school': 'High School',
    'some_college': 'Some College',
    'bachelors': 'Bachelor\'s Degree',
    'masters': 'Master\'s Degree',
    'doctorate': 'Doctoral Degree'
  };
  return labels[educationBand] || educationBand;
};
