// Blind Spot Intelligence Module
// Detects cognitive blind spots based on cross-metric imbalances

import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';

export interface BlindSpot {
  id: string;
  name: string;
  description: string;
  howItShowsUp: string[];
  frictionPoints: string[];
  awarenessCue: string;
}

export interface BlindSpotAnalysisResult {
  blindSpot: BlindSpot;
  confidence: number;
  detectionSource: string;
}

// Define all possible blind spots with neutral, clinical language
const BLIND_SPOTS: Record<string, BlindSpot> = {
  cognitive_overcontrol: {
    id: 'cognitive_overcontrol',
    name: 'Cognitive Overcontrol',
    description: 'A tendency to over-analyze and over-plan, which can create delays in action and difficulty with spontaneous decision-making. Your mind seeks certainty before committing, which is a strength in complex situations but can become a hindrance in fast-moving environments.',
    howItShowsUp: [
      'Spending excessive time researching before making decisions',
      'Difficulty delegating tasks because of high internal standards',
      'Procrastination disguised as "needing more information"',
      'Analysis paralysis in situations requiring quick judgment'
    ],
    frictionPoints: [
      'Time-sensitive environments where speed beats precision',
      'Collaborative settings where others have different quality standards',
      'Creative work that requires experimentation over planning',
      'Leadership situations requiring decisive action'
    ],
    awarenessCue: 'Notice when you\'re on your third "just one more thing to check" before making a decision.'
  },
  strategic_avoidance: {
    id: 'strategic_avoidance',
    name: 'Strategic Avoidance',
    description: 'A pattern of unconsciously steering away from situations that feel emotionally or cognitively uncomfortable, often rationalized as logical prioritization. This preserves mental energy but can limit growth and create blind spots around challenges.',
    howItShowsUp: [
      'Consistently deprioritizing tasks that feel uncomfortable',
      'Finding logical reasons to avoid confrontation or difficult conversations',
      'Deferring decisions on emotionally charged issues',
      'Gravitating only toward problems that match your strengths'
    ],
    frictionPoints: [
      'Career advancement requiring uncomfortable skill development',
      'Relationships needing direct emotional communication',
      'Projects requiring tolerance of ambiguity',
      'Situations where avoidance compounds the original problem'
    ],
    awarenessCue: 'Notice when you\'re explaining why something "isn\'t a priority right now" for the third time.'
  },
  insight_execution_gap: {
    id: 'insight_execution_gap',
    name: 'Insight–Execution Gap',
    description: 'A disconnect between understanding what needs to be done and actually doing it. You can clearly see the path forward but struggle with the bridge between knowing and acting. This often appears as incomplete projects or abandoned ideas.',
    howItShowsUp: [
      'Having many started but few finished projects',
      'Feeling frustrated because you "know exactly what to do" but don\'t do it',
      'Giving excellent advice to others that you don\'t follow yourself',
      'Losing motivation once the intellectual challenge is solved'
    ],
    frictionPoints: [
      'Long-term projects requiring sustained execution',
      'Goals that require consistent daily action',
      'Career paths where delivery matters more than vision',
      'Relationships requiring consistent follow-through'
    ],
    awarenessCue: 'Notice when you feel excitement about a new insight but no pull toward action.'
  },
  attentional_drift: {
    id: 'attentional_drift',
    name: 'Attentional Drift Under Load',
    description: 'A pattern where focus becomes diffuse under cognitive or emotional load, leading to scattered attention and difficulty maintaining direction. This isn\'t about intelligence—it\'s about how your attention system responds to pressure.',
    howItShowsUp: [
      'Starting multiple tasks when stressed instead of completing one',
      'Difficulty returning to focus after interruptions during busy periods',
      'Making more errors when deadlines approach',
      'Feeling mentally scattered during high-stakes situations'
    ],
    frictionPoints: [
      'High-pressure environments with multiple simultaneous demands',
      'Roles requiring sustained attention during crisis',
      'Projects with tight timelines and many moving parts',
      'Situations where errors have significant consequences'
    ],
    awarenessCue: 'Notice when you\'re opening new tabs instead of finishing current tasks under pressure.'
  },
  empathy_override: {
    id: 'empathy_override',
    name: 'Empathy Override',
    description: 'A tendency to absorb others\' emotional states so strongly that it interferes with your own judgment and decision-making. Your strength in understanding others can become a weakness when it overrides your own needs and perspectives.',
    howItShowsUp: [
      'Difficulty saying no because you feel others\' disappointment',
      'Changing your opinion based on who you\'re with',
      'Feeling exhausted after social interactions',
      'Making decisions based on others\' comfort over your own interests'
    ],
    frictionPoints: [
      'Leadership requiring unpopular decisions',
      'Negotiations where you must advocate for yourself',
      'Situations requiring clear personal boundaries',
      'Environments with strong personalities who may dominate'
    ],
    awarenessCue: 'Notice when you\'re about to agree to something while feeling internal resistance.'
  },
  novelty_dependency: {
    id: 'novelty_dependency',
    name: 'Novelty Dependency',
    description: 'A reliance on novelty and stimulation to maintain engagement, making routine work feel disproportionately draining. While this drives exploration and innovation, it can undermine consistency and follow-through on established processes.',
    howItShowsUp: [
      'Losing interest in projects once the "new" phase is over',
      'Constantly seeking new information, tools, or approaches',
      'Difficulty with maintenance tasks or routine responsibilities',
      'Feeling trapped by commitments that require repetition'
    ],
    frictionPoints: [
      'Roles requiring consistent execution of established processes',
      'Long-term commitments where novelty fades',
      'Career paths requiring deep expertise over breadth',
      'Situations where reliability is valued over innovation'
    ],
    awarenessCue: 'Notice when you\'re researching alternatives to something that\'s working fine.'
  },
  perfectionist_paralysis: {
    id: 'perfectionist_paralysis',
    name: 'Perfectionist Paralysis',
    description: 'An internal standard so high that it prevents completion or even starting. This isn\'t about quality—it\'s about the gap between your vision of "good enough" and what\'s actually required, which can create chronic underdelivery despite high capability.',
    howItShowsUp: [
      'Delaying work because you\'re not in the "right" mindset',
      'Feeling that your work is never truly ready to share',
      'Spending disproportionate time on minor details',
      'Avoiding starting because you can\'t do it "perfectly"'
    ],
    frictionPoints: [
      'Iterative environments where "done" beats "perfect"',
      'Fast-paced roles requiring quick turnaround',
      'Collaboration where others have different standards',
      'Situations where visibility is more important than polish'
    ],
    awarenessCue: 'Notice when you\'re editing something for the fifth time that was good on the second pass.'
  },
  confidence_calibration: {
    id: 'confidence_calibration',
    name: 'Confidence Miscalibration',
    description: 'A mismatch between your actual competence and your perceived competence. This can manifest as either overconfidence (blind spots about limitations) or underconfidence (underselling genuine capabilities), creating friction in how you\'re perceived.',
    howItShowsUp: [
      'Being surprised when others perceive you differently than you see yourself',
      'Either over-volunteering or under-volunteering for opportunities',
      'Difficulty accurately predicting your performance',
      'Receiving feedback that contradicts your self-assessment'
    ],
    frictionPoints: [
      'Job interviews and self-promotion situations',
      'Salary negotiations and performance reviews',
      'Team settings where accurate self-assessment matters',
      'Situations requiring you to accurately scope your capabilities'
    ],
    awarenessCue: 'Notice when someone\'s reaction to your work consistently surprises you.'
  }
};

// Analyze all test results to determine the dominant blind spot
export const analyzeBlindSpot = (
  iqResults?: TestResults | null,
  personalityResults?: PersonalityResults | null,
  adhdResults?: ADHDResults | null,
  cognitiveStyleResults?: CognitiveStyleResults | null
): BlindSpotAnalysisResult | null => {
  const scores: Record<string, number> = {};
  
  // Initialize all blind spot scores
  Object.keys(BLIND_SPOTS).forEach(key => {
    scores[key] = 0;
  });
  
  // Analyze based on IQ results
  if (iqResults) {
    // High IQ with low execution in certain areas suggests insight-execution gap
    if (iqResults.iq >= 115) {
      scores.insight_execution_gap += 15;
    }
    
    // Strong abstract reasoning might correlate with cognitive overcontrol
    const abstractScore = iqResults.categoryScores.find(c => c.category === 'abstract');
    if (abstractScore && abstractScore.percentage >= 70) {
      scores.cognitive_overcontrol += 20;
    }
    
    // Pattern recognition strength with matrix weakness might indicate perfectionism
    const matrixScore = iqResults.categoryScores.find(c => c.category === 'matrix');
    const patternScore = iqResults.categoryScores.find(c => c.category === 'number_sequence');
    if (patternScore && matrixScore && patternScore.percentage - matrixScore.percentage > 20) {
      scores.perfectionist_paralysis += 15;
    }
  }
  
  // Analyze based on personality results
  if (personalityResults) {
    const { scores: traits } = personalityResults;
    
    // High conscientiousness + high openness = potential overcontrol
    if (traits.conscientiousness >= 70 && traits.openness >= 60) {
      scores.cognitive_overcontrol += 25;
    }
    
    // Low extraversion + high agreeableness = strategic avoidance
    if (traits.extraversion <= 40 && traits.agreeableness >= 70) {
      scores.strategic_avoidance += 25;
    }
    
    // High agreeableness + high neuroticism = empathy override
    if (traits.agreeableness >= 75 && traits.neuroticism >= 60) {
      scores.empathy_override += 30;
    }
    
    // High openness + low conscientiousness = novelty dependency
    if (traits.openness >= 75 && traits.conscientiousness <= 45) {
      scores.novelty_dependency += 30;
    }
    
    // High conscientiousness + high neuroticism = perfectionist paralysis
    if (traits.conscientiousness >= 70 && traits.neuroticism >= 60) {
      scores.perfectionist_paralysis += 30;
    }
    
    // Low neuroticism + high extraversion = potential confidence miscalibration (overconfidence)
    if (traits.neuroticism <= 30 && traits.extraversion >= 70) {
      scores.confidence_calibration += 20;
    }
    
    // High neuroticism + low extraversion = potential confidence miscalibration (underconfidence)
    if (traits.neuroticism >= 70 && traits.extraversion <= 40) {
      scores.confidence_calibration += 20;
    }
  }
  
  // Analyze based on ADHD results
  if (adhdResults) {
    // High inattention = attentional drift
    if (adhdResults.likelihood === 'high' || adhdResults.likelihood === 'moderate') {
      scores.attentional_drift += 25;
      scores.novelty_dependency += 15;
      scores.insight_execution_gap += 10;
    }
    
    // Hyperactivity component suggests novelty seeking
    if (adhdResults.hyperactivityScore >= adhdResults.inattentionScore) {
      scores.novelty_dependency += 15;
    }
  }
  
  // Analyze based on cognitive style results
  if (cognitiveStyleResults) {
    const dimensions = cognitiveStyleResults.dimensionScores;
    
    // High pattern recognition + high detail orientation = overcontrol
    const patternRec = dimensions.find(d => d.dimension === 'pattern_recognition');
    const detailOri = dimensions.find(d => d.dimension === 'detail_orientation');
    
    if (patternRec && detailOri && patternRec.percentage >= 70 && detailOri.percentage >= 70) {
      scores.cognitive_overcontrol += 20;
    }
    
    // High divergent thinking + low detail = novelty dependency
    const divergent = dimensions.find(d => d.dimension === 'divergent_thinking');
    if (divergent && divergent.percentage >= 70 && detailOri && detailOri.percentage <= 40) {
      scores.novelty_dependency += 20;
    }
    
    // High big picture + low detail = insight-execution gap
    const bigPicture = dimensions.find(d => d.dimension === 'big_picture');
    if (bigPicture && bigPicture.percentage >= 70 && detailOri && detailOri.percentage <= 40) {
      scores.insight_execution_gap += 20;
    }
    
    // High hyperfocus = could mask attentional drift
    const hyperfocus = dimensions.find(d => d.dimension === 'hyperfocus');
    if (hyperfocus && hyperfocus.percentage >= 70) {
      scores.attentional_drift -= 10;
      scores.novelty_dependency += 10;
    }
  }
  
  // Find the dominant blind spot
  let maxScore = 0;
  let dominantBlindSpot: string | null = null;
  
  Object.entries(scores).forEach(([key, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantBlindSpot = key;
    }
  });
  
  // Require minimum confidence threshold
  if (!dominantBlindSpot || maxScore < 15) {
    // Default fallback based on what tests are available
    if (personalityResults) {
      if (personalityResults.scores.conscientiousness >= 60) {
        dominantBlindSpot = 'cognitive_overcontrol';
        maxScore = 20;
      } else {
        dominantBlindSpot = 'insight_execution_gap';
        maxScore = 18;
      }
    } else {
      dominantBlindSpot = 'insight_execution_gap';
      maxScore = 15;
    }
  }
  
  // Determine detection source
  const sources: string[] = [];
  if (iqResults) sources.push('IQ');
  if (personalityResults) sources.push('Personality');
  if (adhdResults) sources.push('ADHD');
  if (cognitiveStyleResults) sources.push('Cognitive Style');
  
  return {
    blindSpot: BLIND_SPOTS[dominantBlindSpot],
    confidence: Math.min(95, Math.round(maxScore * 1.5)),
    detectionSource: sources.length > 1 
      ? `Cross-analysis of ${sources.join(' + ')}` 
      : sources[0] || 'Assessment data'
  };
};
