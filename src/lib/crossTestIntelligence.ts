// Cross-Test Intelligence Module
// Adjusts assessment results based on insights from other completed tests

import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';

export interface CrossTestContext {
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
}

export interface AdjustmentInsight {
  source: string;
  insight: string;
  adjustment: number;
  reason: string;
}

export interface EnhancedIQResults extends TestResults {
  adjustedIQ: number;
  adjustmentInsights: AdjustmentInsight[];
  crossTestSynergies: string[];
}

export interface EnhancedPersonalityResults extends PersonalityResults {
  crossTestInsights: string[];
  cognitiveCorrelations: Record<string, string>;
}

export interface EnhancedADHDResults extends ADHDResults {
  crossTestInsights: string[];
  compensatingStrengths: string[];
}

export interface EnhancedCognitiveResults extends CognitiveStyleResults {
  crossTestInsights: string[];
  iqCorrelation: string | null;
}

// Enhance IQ results based on other test data
export const enhanceIQResults = (
  iqResults: TestResults,
  context: CrossTestContext
): EnhancedIQResults => {
  const adjustmentInsights: AdjustmentInsight[] = [];
  const crossTestSynergies: string[] = [];
  let totalAdjustment = 0;

  // Adjust based on Cognitive Style results
  if (context.cognitiveStyleResults) {
    const cog = context.cognitiveStyleResults;
    
    // Pattern recognition alignment
    const patternScore = cog.dimensionScores.find(d => d.dimension === 'pattern_recognition');
    if (patternScore && patternScore.percentage >= 70) {
      const boost = Math.round((patternScore.percentage - 60) / 10);
      totalAdjustment += boost;
      adjustmentInsights.push({
        source: 'Cognitive Style',
        insight: 'Strong pattern recognition',
        adjustment: boost,
        reason: `Your ${patternScore.percentage}% pattern recognition ability suggests your IQ score may slightly underrepresent your logical reasoning capacity`
      });
      crossTestSynergies.push('Your pattern recognition strength in Cognitive Style aligns with matrix reasoning in IQ');
    }

    // Visual-spatial boost for spatial IQ questions
    const visualScore = cog.dimensionScores.find(d => d.dimension === 'visual_spatial');
    if (visualScore && visualScore.percentage >= 70) {
      const spatialCategory = iqResults.categoryScores.find(c => c.category === 'spatial');
      if (spatialCategory && spatialCategory.percentage >= 60) {
        totalAdjustment += 2;
        adjustmentInsights.push({
          source: 'Cognitive Style',
          insight: 'Visual-spatial thinking confirmed',
          adjustment: 2,
          reason: 'Strong visual-spatial ability validated across both assessments'
        });
      }
    }

    // Processing style impact
    if (cog.processingStyle === 'nonlinear' || cog.processingStyle === 'parallel') {
      crossTestSynergies.push('Your nonlinear processing style may indicate creative problem-solving that traditional IQ tests undervalue');
    }
  }

  // Adjust based on ADHD results
  if (context.adhdResults) {
    const adhd = context.adhdResults;
    
    // High ADHD likelihood might indicate time pressure impact
    if (adhd.likelihood === 'high') {
      // Check if person scored well despite ADHD indicators
      if (iqResults.iq >= 115) {
        totalAdjustment += 3;
        adjustmentInsights.push({
          source: 'ADHD Screening',
          insight: 'Performance under attention challenges',
          adjustment: 3,
          reason: 'Strong IQ performance despite attention challenges suggests even higher cognitive potential in optimal conditions'
        });
        crossTestSynergies.push('Your ability to score well despite attention challenges indicates strong fluid intelligence');
      }
      
      // Hyperfocus correlation
      if (context.cognitiveStyleResults) {
        const hyperfocusScore = context.cognitiveStyleResults.dimensionScores.find(d => d.dimension === 'hyperfocus');
        if (hyperfocusScore && hyperfocusScore.percentage >= 70) {
          crossTestSynergies.push('Your hyperfocus capacity (ADHD + Cognitive Style) can produce exceptional depth in areas of interest');
        }
      }
    } else if (adhd.likelihood === 'moderate') {
      crossTestSynergies.push('Moderate attention variability may have minor impact on timed test performance');
    }
  }

  // Adjust based on Personality results
  if (context.personalityResults) {
    const personality = context.personalityResults;
    
    // High openness correlates with divergent thinking
    if (personality.scores.openness >= 75) {
      crossTestSynergies.push('High openness suggests creative problem-solving abilities beyond traditional IQ measures');
    }
    
    // Conscientiousness affects test-taking strategy
    if (personality.scores.conscientiousness >= 80) {
      crossTestSynergies.push('High conscientiousness likely contributed to careful, strategic test-taking');
    }
    
    // Low neuroticism = better test performance under pressure
    if (personality.scores.neuroticism <= 30) {
      totalAdjustment += 1;
      adjustmentInsights.push({
        source: 'Personality',
        insight: 'High emotional stability',
        adjustment: 1,
        reason: 'Low anxiety during testing optimized your performance'
      });
    } else if (personality.scores.neuroticism >= 70) {
      // High anxiety might have suppressed score
      crossTestSynergies.push('Higher anxiety may have slightly impacted timed test performance');
    }
  }

  return {
    ...iqResults,
    adjustedIQ: Math.min(160, iqResults.iq + totalAdjustment),
    adjustmentInsights,
    crossTestSynergies
  };
};

// Enhance Personality results based on other test data
export const enhancePersonalityResults = (
  personalityResults: PersonalityResults,
  context: CrossTestContext
): EnhancedPersonalityResults => {
  const crossTestInsights: string[] = [];
  const cognitiveCorrelations: Record<string, string> = {};

  // Correlate with Cognitive Style
  if (context.cognitiveStyleResults) {
    const cog = context.cognitiveStyleResults;
    
    // High openness + divergent thinking
    if (personalityResults.scores.openness >= 70) {
      const divergentScore = cog.dimensionScores.find(d => d.dimension === 'divergent_thinking');
      if (divergentScore && divergentScore.percentage >= 60) {
        cognitiveCorrelations['openness'] = 'Confirmed creative thinker';
        crossTestInsights.push('Your high Openness aligns with your divergent thinking style - you are a natural innovator');
      }
    }
    
    // Conscientiousness + detail orientation
    if (personalityResults.scores.conscientiousness >= 70) {
      const detailScore = cog.dimensionScores.find(d => d.dimension === 'detail_orientation');
      if (detailScore && detailScore.percentage >= 60) {
        cognitiveCorrelations['conscientiousness'] = 'Detail-oriented achiever';
        crossTestInsights.push('Your Conscientiousness is supported by strong detail orientation - you naturally maintain high standards');
      }
    }
    
    // Introversion + hyperfocus
    if (personalityResults.scores.extraversion <= 40) {
      const hyperfocusScore = cog.dimensionScores.find(d => d.dimension === 'hyperfocus');
      if (hyperfocusScore && hyperfocusScore.percentage >= 60) {
        cognitiveCorrelations['extraversion'] = 'Deep work specialist';
        crossTestInsights.push('Your introversion combined with hyperfocus ability makes you ideal for deep, focused work');
      }
    }
  }

  // Correlate with IQ
  if (context.iqResults) {
    if (context.iqResults.iq >= 120 && personalityResults.scores.openness >= 70) {
      crossTestInsights.push('High IQ combined with high Openness suggests strong intellectual curiosity and learning capacity');
    }
    
    if (context.iqResults.iq >= 115 && personalityResults.scores.conscientiousness >= 70) {
      crossTestInsights.push('Your intelligence paired with conscientiousness predicts high achievement potential');
    }
  }

  // Correlate with ADHD
  if (context.adhdResults) {
    if (context.adhdResults.likelihood === 'high') {
      if (personalityResults.scores.openness >= 70) {
        crossTestInsights.push('ADHD traits combined with high Openness often produce exceptional creativity and entrepreneurial thinking');
      }
      if (personalityResults.scores.conscientiousness <= 40) {
        crossTestInsights.push('Lower conscientiousness may reflect ADHD-related executive function challenges rather than lack of motivation');
      }
    }
  }

  return {
    ...personalityResults,
    crossTestInsights,
    cognitiveCorrelations
  };
};

// Enhance ADHD results based on other test data
export const enhanceADHDResults = (
  adhdResults: ADHDResults,
  context: CrossTestContext
): EnhancedADHDResults => {
  const crossTestInsights: string[] = [];
  const compensatingStrengths: string[] = [];

  // Add cognitive style insights
  if (context.cognitiveStyleResults) {
    const cog = context.cognitiveStyleResults;
    
    const hyperfocusScore = cog.dimensionScores.find(d => d.dimension === 'hyperfocus');
    if (hyperfocusScore && hyperfocusScore.percentage >= 60) {
      compensatingStrengths.push('Strong hyperfocus ability - can achieve exceptional depth in engaging tasks');
    }
    
    const divergentScore = cog.dimensionScores.find(d => d.dimension === 'divergent_thinking');
    if (divergentScore && divergentScore.percentage >= 60) {
      compensatingStrengths.push('High divergent thinking - natural ability to generate creative solutions');
    }
    
    if (cog.processingStyle === 'parallel') {
      crossTestInsights.push('Your parallel processing style aligns with ADHD patterns - you may excel at juggling multiple projects');
    }
    
    if (cog.processingStyle === 'nonlinear') {
      crossTestInsights.push('Nonlinear processing is common in ADHD minds and supports creative problem-solving');
    }
  }

  // Add IQ insights
  if (context.iqResults) {
    if (context.iqResults.iq >= 115) {
      compensatingStrengths.push(`Above-average intelligence (IQ: ${context.iqResults.iq}) helps compensate for attention challenges`);
      crossTestInsights.push('High intelligence often masks ADHD symptoms - you may have developed sophisticated coping strategies');
    }
    
    const patternCategory = context.iqResults.categoryScores.find(c => c.category === 'number_sequence' || c.category === 'matrix');
    if (patternCategory && patternCategory.percentage >= 70) {
      compensatingStrengths.push('Strong pattern recognition ability supports quick understanding of systems');
    }
  }

  // Add personality insights
  if (context.personalityResults) {
    const personality = context.personalityResults;
    
    if (personality.scores.openness >= 70) {
      compensatingStrengths.push('High openness fuels creativity and interest-driven engagement');
    }
    
    if (personality.scores.conscientiousness >= 60) {
      crossTestInsights.push('Higher conscientiousness despite ADHD traits suggests effective coping mechanisms');
    }
    
    if (personality.scores.extraversion >= 70) {
      crossTestInsights.push('High extraversion combined with ADHD often produces charismatic, energetic leadership');
    }
  }

  return {
    ...adhdResults,
    crossTestInsights,
    compensatingStrengths
  };
};

// Enhance Cognitive Style results based on other test data
export const enhanceCognitiveResults = (
  cognitiveResults: CognitiveStyleResults,
  context: CrossTestContext
): EnhancedCognitiveResults => {
  const crossTestInsights: string[] = [];
  let iqCorrelation: string | null = null;

  // Add IQ insights
  if (context.iqResults) {
    const iq = context.iqResults;
    
    // Pattern recognition correlation
    const patternDim = cognitiveResults.dimensionScores.find(d => d.dimension === 'pattern_recognition');
    const patternIQ = iq.categoryScores.find(c => c.category === 'matrix' || c.category === 'number_sequence');
    
    if (patternDim && patternIQ && patternDim.percentage >= 60 && patternIQ.percentage >= 60) {
      iqCorrelation = `Your pattern recognition is validated: ${patternDim.percentage}% on cognitive style, ${patternIQ.percentage}% on IQ patterns`;
      crossTestInsights.push('Strong pattern recognition confirmed across both cognitive style and IQ assessments');
    }
    
    // Visual-spatial correlation
    const visualDim = cognitiveResults.dimensionScores.find(d => d.dimension === 'visual_spatial');
    const spatialIQ = iq.categoryScores.find(c => c.category === 'spatial' || c.category === 'shape_pattern');
    
    if (visualDim && spatialIQ && visualDim.percentage >= 60 && spatialIQ.percentage >= 60) {
      crossTestInsights.push('Visual-spatial thinking strength confirmed through IQ shape pattern performance');
    }
    
    // IQ level insight
    if (iq.iq >= 125) {
      crossTestInsights.push(`Your high IQ (${iq.iq}) amplifies your cognitive style strengths`);
    }
  }

  // Add ADHD insights
  if (context.adhdResults) {
    const adhd = context.adhdResults;
    
    if (adhd.likelihood === 'high' || adhd.likelihood === 'moderate') {
      const hyperfocusDim = cognitiveResults.dimensionScores.find(d => d.dimension === 'hyperfocus');
      if (hyperfocusDim && hyperfocusDim.percentage >= 60) {
        crossTestInsights.push('ADHD screening + high hyperfocus score confirms interest-based attention system');
      }
      
      const divergentDim = cognitiveResults.dimensionScores.find(d => d.dimension === 'divergent_thinking');
      if (divergentDim && divergentDim.percentage >= 60) {
        crossTestInsights.push('ADHD + divergent thinking suggests enhanced creative problem-solving capacity');
      }
    }
  }

  // Add personality insights
  if (context.personalityResults) {
    const personality = context.personalityResults;
    
    const detailDim = cognitiveResults.dimensionScores.find(d => d.dimension === 'detail_orientation');
    if (detailDim && detailDim.percentage >= 60 && personality.scores.conscientiousness >= 70) {
      crossTestInsights.push('Detail orientation + conscientiousness creates exceptional quality focus');
    }
    
    const bigPictureDim = cognitiveResults.dimensionScores.find(d => d.dimension === 'big_picture');
    if (bigPictureDim && bigPictureDim.percentage >= 60 && personality.scores.openness >= 70) {
      crossTestInsights.push('Systems thinking + openness suggests strategic visionary capacity');
    }
  }

  return {
    ...cognitiveResults,
    crossTestInsights,
    iqCorrelation
  };
};

// Get a summary of all cross-test patterns
export const getCrossTestSummary = (context: CrossTestContext): string[] => {
  const summary: string[] = [];
  
  const completedTests: string[] = [];
  if (context.iqResults) completedTests.push('IQ');
  if (context.personalityResults) completedTests.push('Personality');
  if (context.adhdResults) completedTests.push('ADHD');
  if (context.cognitiveStyleResults) completedTests.push('Cognitive Style');
  
  if (completedTests.length < 2) {
    return ['Complete additional assessments to unlock cross-test insights'];
  }
  
  // Look for mega-patterns
  if (context.cognitiveStyleResults && context.iqResults && context.adhdResults) {
    const hyperfocus = context.cognitiveStyleResults.dimensionScores.find(d => d.dimension === 'hyperfocus');
    if (hyperfocus && hyperfocus.percentage >= 60 && context.adhdResults.likelihood !== 'low' && context.iqResults.iq >= 115) {
      summary.push('🧠 "Twice Exceptional" Profile: High intelligence + ADHD traits + hyperfocus = intense creative/analytical potential');
    }
  }
  
  if (context.personalityResults && context.cognitiveStyleResults && context.iqResults) {
    const divergentDim = context.cognitiveStyleResults.dimensionScores.find(d => d.dimension === 'divergent_thinking');
    if (context.personalityResults.scores.openness >= 70 && 
        divergentDim && divergentDim.percentage >= 60 &&
        context.iqResults.iq >= 115) {
      summary.push('💡 Innovator Profile: High openness + divergent thinking + intelligence = natural innovator');
    }
  }
  
  if (context.personalityResults && context.cognitiveStyleResults) {
    const detailDim = context.cognitiveStyleResults.dimensionScores.find(d => d.dimension === 'detail_orientation');
    if (context.personalityResults.scores.conscientiousness >= 70 &&
        detailDim && detailDim.percentage >= 60) {
      summary.push('🎯 Precision Achiever: Conscientiousness + detail orientation = exceptional execution ability');
    }
  }

  return summary.length > 0 ? summary : [`Analysis based on ${completedTests.join(', ')} assessments`];
};
