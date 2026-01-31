// Neurodivergent Mind Assessment - Combined Cognitive Style + ADHD Screening
// This unified assessment measures thinking patterns AND clinical ADHD indicators

import { 
  CognitiveStyleQuestion, 
  CognitiveStyleResults,
  ThinkingDimension,
  ProcessingStyle,
  calculateCognitiveStyleResults,
  dimensionLabels,
  processingStyleLabels,
} from './cognitiveStyleQuestions';

import {
  ADHDQuestion,
  ADHDResults,
  ADHDDomain,
  adhdQuestions,
  adhdOptions,
  adhdDomainLabels,
  calculateADHDResults,
} from './adhdQuestions';

// Re-export for convenience
export { 
  dimensionLabels, 
  processingStyleLabels,
  adhdOptions,
  adhdDomainLabels,
  type ThinkingDimension,
  type ProcessingStyle,
  type ADHDDomain,
};

// Combined question type - can be either cognitive style or ADHD
export type NeurodivergentQuestion = 
  | { type: 'cognitive'; question: CognitiveStyleQuestion }
  | { type: 'adhd'; question: ADHDQuestion };

// Combined results containing both assessments
export interface NeurodivergentMindResults {
  cognitiveStyle: CognitiveStyleResults;
  adhd: ADHDResults;
  // Cross-assessment insights
  integratedInsights: {
    neurodivergentLikelihood: 'low' | 'moderate' | 'high';
    cognitiveStrengths: string[];
    attentionalProfile: string;
    synergyInsights: string[];
    recommendations: string[];
  };
}

// Get total question count
export const COGNITIVE_QUESTION_COUNT = 20; // From cognitiveStyleQuestions
export const ADHD_QUESTION_COUNT = adhdQuestions.length; // 18
export const TOTAL_QUESTION_COUNT = COGNITIVE_QUESTION_COUNT + ADHD_QUESTION_COUNT;

// Calculate combined results from both answer sets
export const calculateNeurodivergentMindResults = (
  cognitiveAnswers: number[],
  adhdAnswers: number[]
): NeurodivergentMindResults => {
  const cognitiveStyle = calculateCognitiveStyleResults(cognitiveAnswers);
  const adhd = calculateADHDResults(adhdAnswers);

  // Generate integrated insights
  const integratedInsights = generateIntegratedInsights(cognitiveStyle, adhd);

  return {
    cognitiveStyle,
    adhd,
    integratedInsights,
  };
};

function generateIntegratedInsights(
  cognitive: CognitiveStyleResults,
  adhd: ADHDResults
): NeurodivergentMindResults['integratedInsights'] {
  // Determine overall neurodivergent likelihood
  let neurodivergentLikelihood: 'low' | 'moderate' | 'high';
  
  // High hyperfocus + high ADHD likelihood = strong neurodivergent pattern
  const hyperfocusScore = cognitive.dimensionScores.find(d => d.dimension === 'hyperfocus')?.percentage || 0;
  const divergentScore = cognitive.dimensionScores.find(d => d.dimension === 'divergent_thinking')?.percentage || 0;
  
  if (adhd.likelihood === 'high' || (adhd.likelihood === 'moderate' && hyperfocusScore >= 70)) {
    neurodivergentLikelihood = 'high';
  } else if (adhd.likelihood === 'moderate' || hyperfocusScore >= 60 || divergentScore >= 70) {
    neurodivergentLikelihood = 'moderate';
  } else {
    neurodivergentLikelihood = 'low';
  }

  // Cognitive strengths from profile
  const cognitiveStrengths = cognitive.insights.strengths;

  // Attentional profile description
  let attentionalProfile: string;
  if (adhd.partAThreshold && hyperfocusScore >= 70) {
    attentionalProfile = 'Hyperfocus-Dominant: Your attention operates in extremes—deep immersion on engaging tasks, difficulty with mundane ones.';
  } else if (adhd.likelihood === 'high') {
    attentionalProfile = 'Variable Attention: Your attention fluctuates significantly based on task interest and environmental factors.';
  } else if (hyperfocusScore >= 60) {
    attentionalProfile = 'Interest-Based: Your focus is strongly driven by intrinsic motivation and engagement.';
  } else {
    attentionalProfile = 'Balanced Attention: You show typical attention patterns with flexibility across task types.';
  }

  // Generate synergy insights
  const synergyInsights: string[] = [];
  
  if (hyperfocusScore >= 70 && adhd.inattentionPositive >= 3) {
    synergyInsights.push('Your hyperfocus capacity combined with attention variability suggests a classic neurodivergent pattern—leverage deep work periods.');
  }
  
  if (divergentScore >= 70 && adhd.hyperactivityPositive >= 3) {
    synergyInsights.push('High divergent thinking paired with restlessness can fuel creative breakthroughs—channel this energy into brainstorming and innovation.');
  }
  
  const patternScore = cognitive.dimensionScores.find(d => d.dimension === 'pattern_recognition')?.percentage || 0;
  if (patternScore >= 70 && adhd.likelihood !== 'low') {
    synergyInsights.push('Strong pattern recognition with attention differences is common in systems thinkers—structured environments help you thrive.');
  }

  if (synergyInsights.length === 0) {
    synergyInsights.push(`Your ${cognitive.primaryProfile.name} cognitive style shapes how you naturally approach tasks and problems.`);
  }

  // Combined recommendations
  const recommendations: string[] = [];
  
  if (adhd.likelihood === 'high') {
    recommendations.push('Consider professional ADHD evaluation—your screening results suggest clinical assessment may be valuable.');
  }
  
  if (hyperfocusScore >= 70) {
    recommendations.push('Design your work around hyperfocus periods—protect deep work time and minimize interruptions during flow states.');
  }
  
  if (cognitive.processingStyle === 'nonlinear' || cognitive.processingStyle === 'parallel') {
    recommendations.push(`Your ${processingStyleLabels[cognitive.processingStyle]} style thrives with flexible structures rather than rigid linear workflows.`);
  }
  
  if (divergentScore >= 70) {
    recommendations.push('Channel your divergent thinking into roles requiring creativity and innovation—traditional structured environments may feel constraining.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Your cognitive profile suggests adaptability across different work and learning environments.');
  }

  return {
    neurodivergentLikelihood,
    cognitiveStrengths,
    attentionalProfile,
    synergyInsights,
    recommendations,
  };
}
