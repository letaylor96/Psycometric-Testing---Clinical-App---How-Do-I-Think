// Neurodivergent Mind Assessment - Combined Cognitive Style + ADHD + optional deeper modules
// Core: cognitive style + ADHD (ASRS). Optional add-on screeners: autism (AQ-10),
// dyslexia, dyscalculia, dyspraxia, sensory/RSD.

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

import { AQ10Results, calculateAQ10Results } from './aq10Questions';
import { DyslexiaResults, calculateDyslexiaResults } from './dyslexiaQuestions';
import { DyscalculiaResults, calculateDyscalculiaResults } from './dyscalculiaQuestions';
import { DyspraxiaResults, calculateDyspraxiaResults } from './dyspraxiaQuestions';
import { SensoryRsdResults, calculateSensoryRsdResults } from './sensoryRsdQuestions';
import { calculateNDComposite, NDComposite, NDModuleKey } from '@/lib/ndComposite';

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

export type DeeperModuleKey = 'autism' | 'dyslexia' | 'dyscalculia' | 'dyspraxia' | 'sensoryRsd';

export type NeurodivergentQuestion =
  | { type: 'cognitive'; question: CognitiveStyleQuestion }
  | { type: 'adhd'; question: ADHDQuestion };

export interface DeeperAnswers {
  autism?: number[];
  dyslexia?: number[];
  dyscalculia?: number[];
  dyspraxia?: number[];
  sensoryRsd?: number[];
}

// Combined results
export interface NeurodivergentMindResults {
  cognitiveStyle: CognitiveStyleResults;
  adhd: ADHDResults;
  // Optional deeper screeners
  autismShort?: AQ10Results;
  dyslexia?: DyslexiaResults;
  dyscalculia?: DyscalculiaResults;
  dyspraxia?: DyspraxiaResults;
  sensoryRsd?: SensoryRsdResults;
  // Composite ND index
  composite: NDComposite;
  // Legacy integrated insights
  integratedInsights: {
    neurodivergentLikelihood: 'low' | 'moderate' | 'high';
    cognitiveStrengths: string[];
    attentionalProfile: string;
    synergyInsights: string[];
    recommendations: string[];
  };
}

// Counts
export const COGNITIVE_QUESTION_COUNT = 20;
export const ADHD_QUESTION_COUNT = adhdQuestions.length; // 18
export const TOTAL_QUESTION_COUNT = COGNITIVE_QUESTION_COUNT + ADHD_QUESTION_COUNT;

export const DEEPER_MODULE_META: Record<DeeperModuleKey, { label: string; description: string; questionCount: number; minutes: number }> = {
  autism: {
    label: 'Autism spectrum (AQ-10)',
    description: 'Brief screener for autistic traits in adults — Allison & Baron-Cohen 2012.',
    questionCount: 10,
    minutes: 2,
  },
  dyslexia: {
    label: 'Dyslexia (Adult Dyslexia Checklist)',
    description: 'Literacy and word-processing indicators in adults.',
    questionCount: 15,
    minutes: 3,
  },
  dyscalculia: {
    label: 'Dyscalculia',
    description: 'Numerical-processing friction and math anxiety patterns.',
    questionCount: 10,
    minutes: 2,
  },
  dyspraxia: {
    label: 'Dyspraxia / DCD',
    description: 'Coordination, organization, and motor-planning patterns in adults.',
    questionCount: 10,
    minutes: 2,
  },
  sensoryRsd: {
    label: 'Sensory + Rejection Sensitivity',
    description: 'Sensory-processing sensitivity and rejection-sensitive dysphoria patterns.',
    questionCount: 12,
    minutes: 3,
  },
};

export const calculateNeurodivergentMindResults = (
  cognitiveAnswers: number[],
  adhdAnswers: number[],
  deeperAnswers: DeeperAnswers = {}
): NeurodivergentMindResults => {
  const cognitiveStyle = calculateCognitiveStyleResults(cognitiveAnswers);
  const adhd = calculateADHDResults(adhdAnswers);

  const autismShort = deeperAnswers.autism ? calculateAQ10Results(deeperAnswers.autism) : undefined;
  const dyslexia = deeperAnswers.dyslexia ? calculateDyslexiaResults(deeperAnswers.dyslexia) : undefined;
  const dyscalculia = deeperAnswers.dyscalculia ? calculateDyscalculiaResults(deeperAnswers.dyscalculia) : undefined;
  const dyspraxia = deeperAnswers.dyspraxia ? calculateDyspraxiaResults(deeperAnswers.dyspraxia) : undefined;
  const sensoryRsd = deeperAnswers.sensoryRsd ? calculateSensoryRsdResults(deeperAnswers.sensoryRsd) : undefined;

  const composite = calculateNDComposite({
    cognitiveStyle,
    adhd,
    autismShort,
    dyslexia,
    dyscalculia,
    dyspraxia,
    sensoryRsd,
  });

  const integratedInsights = generateIntegratedInsights(cognitiveStyle, adhd, composite);

  return {
    cognitiveStyle,
    adhd,
    autismShort,
    dyslexia,
    dyscalculia,
    dyspraxia,
    sensoryRsd,
    composite,
    integratedInsights,
  };
};

function generateIntegratedInsights(
  cognitive: CognitiveStyleResults,
  adhd: ADHDResults,
  composite: NDComposite
): NeurodivergentMindResults['integratedInsights'] {
  const hyperfocusScore = cognitive.dimensionScores.find(d => d.dimension === 'hyperfocus')?.percentage || 0;
  const divergentScore = cognitive.dimensionScores.find(d => d.dimension === 'divergent_thinking')?.percentage || 0;

  let neurodivergentLikelihood: 'low' | 'moderate' | 'high';
  if (composite.index >= 60) neurodivergentLikelihood = 'high';
  else if (composite.index >= 40) neurodivergentLikelihood = 'moderate';
  else neurodivergentLikelihood = 'low';

  const cognitiveStrengths = cognitive.insights.strengths;

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
