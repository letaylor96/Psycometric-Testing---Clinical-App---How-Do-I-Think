// Cognitive Insights Intelligence
// Generates "When Your Mind Works Best" insights and Cognitive Friction Alerts

import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface OptimalConditionInsight {
  id: string;
  category: 'timing' | 'environment' | 'task_type' | 'pressure' | 'load';
  icon: string;
  title: string;
  insight: string;
  confidence: number; // 0-100
  source: string; // Which assessment(s) contributed
}

export interface CognitiveFrictionAlert {
  id: string;
  type: 'warning' | 'tip' | 'strength';
  icon: string;
  situation: string;
  advice: string;
  basedOn: string;
}

export interface StressResponse {
  degradesFirst: string;
  compensatesWith: string;
  recoveryAdvice: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// WHEN YOUR MIND WORKS BEST
// ═══════════════════════════════════════════════════════════════════════════════

export function generateOptimalConditionInsights(
  iqResults: TestResults | null,
  personalityResults: PersonalityResults | null,
  adhdResults: ADHDResults | null,
  cognitiveStyleResults: CognitiveStyleResults | null
): OptimalConditionInsight[] {
  const insights: OptimalConditionInsight[] = [];
  
  // Need at least one assessment
  if (!iqResults && !personalityResults && !adhdResults && !cognitiveStyleResults) {
    return [];
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Time Pressure Insights (from IQ + ADHD)
  // ─────────────────────────────────────────────────────────────────────────────
  if (iqResults) {
    const abstractScore = iqResults.categoryScores.find(c => c.category === 'abstract')?.percentage || 0;
    const spatialScore = iqResults.categoryScores.find(c => c.category === 'spatial')?.percentage || 0;
    const matrixScore = iqResults.categoryScores.find(c => c.category === 'matrix')?.percentage || 0;
    
    // High abstract thinkers often need more time
    if (abstractScore > 75) {
      insights.push({
        id: 'timing-abstract',
        category: 'timing',
        icon: '🕐',
        title: 'Time Pressure Response',
        insight: 'Your abstract reasoning strength suggests you build complex mental models before acting. Your error rate likely increases significantly under time pressure—give yourself buffer time for important decisions.',
        confidence: 78,
        source: 'IQ Assessment'
      });
    }
    
    // Spatial thinkers perform better with visualization time
    if (spatialScore > 70) {
      insights.push({
        id: 'timing-spatial',
        category: 'timing',
        icon: '🎯',
        title: 'Visualization Processing',
        insight: 'You reason best when given time to mentally visualize problems. Quick decisions that require spatial judgment (like parking, design layouts) benefit from an extra moment of mental rehearsal.',
        confidence: 72,
        source: 'IQ Assessment'
      });
    }
    
    // Pattern recognition strength
    if (matrixScore > 75 || abstractScore > 75) {
      insights.push({
        id: 'task-novel',
        category: 'task_type',
        icon: '✨',
        title: 'Novel vs Routine Performance',
        insight: 'You overperform on novel problems but may underperform on routine ones. Your mind craves complexity—consider gamifying repetitive tasks or alternating between routine and novel work.',
        confidence: 85,
        source: 'IQ Assessment'
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Personality-Based Insights
  // ─────────────────────────────────────────────────────────────────────────────
  if (personalityResults) {
    const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = personalityResults.scores;
    
    // High openness = morning creativity vs evening analysis
    if (openness > 70) {
      insights.push({
        id: 'timing-creative',
        category: 'timing',
        icon: '🌅',
        title: 'Creative Windows',
        insight: 'High openness minds often have distinct creative peaks. You likely generate best ideas when slightly tired (evening for early risers, morning for night owls) when your analytical filter is relaxed.',
        confidence: 68,
        source: 'Personality Assessment'
      });
    }
    
    // Neuroticism (inverse: resilience) affects emotional load
    if (neuroticism < 40) {
      insights.push({
        id: 'load-emotional',
        category: 'load',
        icon: '💭',
        title: 'Emotional Load Sensitivity',
        insight: 'Your cognition degrades faster under emotional load than physical fatigue. Schedule difficult cognitive work during emotionally neutral periods—not right after stressful interactions.',
        confidence: 82,
        source: 'Personality Assessment'
      });
    }
    
    // Introversion and environment
    if (extraversion < 40) {
      insights.push({
        id: 'environment-solitude',
        category: 'environment',
        icon: '🏔️',
        title: 'Optimal Environment',
        insight: 'You reason best in low-stimulation environments. Extended social interaction depletes your cognitive resources—schedule your most demanding thinking for after periods of solitude.',
        confidence: 88,
        source: 'Personality Assessment'
      });
    } else if (extraversion > 70) {
      insights.push({
        id: 'environment-social',
        category: 'environment',
        icon: '👥',
        title: 'Optimal Environment',
        insight: 'You think best with some ambient social energy around you. Pure isolation can actually decrease your performance—consider cafes, co-working spaces, or background activity.',
        confidence: 85,
        source: 'Personality Assessment'
      });
    }
    
    // Conscientiousness and pressure
    if (conscientiousness > 75) {
      insights.push({
        id: 'pressure-deadline',
        category: 'pressure',
        icon: '⏱️',
        title: 'Deadline Response',
        insight: 'You perform well under structured pressure with clear deadlines, but open-ended pressure without clear goals degrades your performance. Set artificial deadlines for ambiguous projects.',
        confidence: 75,
        source: 'Personality Assessment'
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ADHD-Informed Insights
  // ─────────────────────────────────────────────────────────────────────────────
  if (adhdResults) {
    // Calculate percentages from the raw scores
    const inattentionPercentage = (adhdResults.inattentionScore / (9 * 4)) * 100; // 9 inattention questions, max 4 each
    const hyperactivityPercentage = (adhdResults.hyperactivityScore / (9 * 4)) * 100; // 9 hyperactivity questions, max 4 each
    const hasHighInattention = inattentionPercentage > 50;
    const hasHighHyperactivity = hyperactivityPercentage > 50;
    
    if (hasHighInattention) {
      insights.push({
        id: 'timing-interest',
        category: 'timing',
        icon: '⚡',
        title: 'Interest-Driven Attention',
        insight: 'Your attention is interest-driven, not importance-driven. You work best in shorter bursts with high-interest starts. "Eat the frog" advice works against your neurology—start with something engaging.',
        confidence: 90,
        source: 'ADHD Screening'
      });
    }
    
    if (hasHighHyperactivity) {
      insights.push({
        id: 'environment-movement',
        category: 'environment',
        icon: '🚶',
        title: 'Movement Requirements',
        insight: 'Your cognition benefits from movement breaks. Standing desks, walking meetings, or fidget tools aren\'t distractions—they\'re cognitive enhancers. Build motion into your work setup.',
        confidence: 85,
        source: 'ADHD Screening'
      });
    }
    
    if (adhdResults.likelihood === 'high' || adhdResults.likelihood === 'moderate') {
      insights.push({
        id: 'pressure-urgency',
        category: 'pressure',
        icon: '🎢',
        title: 'Urgency Activation',
        insight: 'You may rely on urgency/deadline pressure to activate focus. This works but is exhausting. Consider artificial urgency: timers, body doubles, or gamification to activate without crisis.',
        confidence: 88,
        source: 'ADHD Screening'
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Cognitive Style Insights
  // ─────────────────────────────────────────────────────────────────────────────
  if (cognitiveStyleResults) {
    // Extract scores from dimensionScores array
    const getScore = (dimension: string) => {
      const found = cognitiveStyleResults.dimensionScores.find(d => d.dimension === dimension);
      return found?.percentage || 0;
    };
    const hyperfocus = getScore('hyperfocus');
    const divergent_thinking = getScore('divergent_thinking');
    const detail_orientation = getScore('detail_orientation');
    const big_picture = getScore('big_picture');
    
    if (hyperfocus > 70) {
      insights.push({
        id: 'timing-flow',
        category: 'timing',
        icon: '🌊',
        title: 'Flow State Management',
        insight: 'You have strong flow state capacity. Protect these windows fiercely—your best work happens in 2-4 hour uninterrupted blocks. Context switching costs you more than others.',
        confidence: 92,
        source: 'Cognitive Style Assessment'
      });
    }
    
    if (divergent_thinking > 70) {
      insights.push({
        id: 'task-ideation',
        category: 'task_type',
        icon: '💡',
        title: 'Ideation vs Execution',
        insight: 'You excel at generating possibilities but may struggle with narrowing down. Separate ideation (no limits) from evaluation (structured criteria) into distinct sessions.',
        confidence: 80,
        source: 'Cognitive Style Assessment'
      });
    }
    
    if (detail_orientation > 70 && big_picture < 50) {
      insights.push({
        id: 'load-context',
        category: 'load',
        icon: '🔍',
        title: 'Context Switching Cost',
        insight: 'Your detail-oriented processing means task switching is expensive. Batch similar tasks together and use transition rituals between different types of work.',
        confidence: 78,
        source: 'Cognitive Style Assessment'
      });
    }
    
    if (big_picture > 70 && detail_orientation < 50) {
      insights.push({
        id: 'task-strategy',
        category: 'task_type',
        icon: '🗺️',
        title: 'Strategic vs Tactical',
        insight: 'You excel at strategy and systems thinking but may miss implementation details. Pair with detail-oriented collaborators or build explicit checklists for execution phases.',
        confidence: 82,
        source: 'Cognitive Style Assessment'
      });
    }
  }

  // Sort by confidence
  return insights.sort((a, b) => b.confidence - a.confidence);
}

// ═══════════════════════════════════════════════════════════════════════════════
// COGNITIVE FRICTION ALERTS
// ═══════════════════════════════════════════════════════════════════════════════

export function generateCognitiveFrictionAlerts(
  iqResults: TestResults | null,
  personalityResults: PersonalityResults | null,
  adhdResults: ADHDResults | null,
  cognitiveStyleResults: CognitiveStyleResults | null
): CognitiveFrictionAlert[] {
  const alerts: CognitiveFrictionAlert[] = [];
  
  if (!iqResults && !personalityResults && !adhdResults && !cognitiveStyleResults) {
    return [];
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // IQ-Based Friction Alerts
  // ─────────────────────────────────────────────────────────────────────────────
  if (iqResults) {
    const abstractScore = iqResults.categoryScores.find(c => c.category === 'abstract')?.percentage || 0;
    const numberScore = iqResults.categoryScores.find(c => c.category === 'number_sequence')?.percentage || 0;
    
    if (abstractScore > 80) {
      alerts.push({
        id: 'friction-overthinking',
        type: 'warning',
        icon: '🤔',
        situation: 'Simple decisions taking too long',
        advice: 'You\'re likely overthinking this. Your pattern-matching strength sometimes finds complexity where none exists. Set a 2-minute timer for low-stakes decisions.',
        basedOn: 'High abstract reasoning'
      });
    }
    
    if (numberScore > 75 && abstractScore > 75) {
      alerts.push({
        id: 'friction-analysis-paralysis',
        type: 'warning',
        icon: '📊',
        situation: 'Gathering excessive data before deciding',
        advice: 'You tend to want complete information before acting. For most decisions, 70% certainty is enough—additional data has diminishing returns.',
        basedOn: 'High analytical capacity'
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Personality-Based Friction Alerts
  // ─────────────────────────────────────────────────────────────────────────────
  if (personalityResults) {
    const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = personalityResults.scores;
    
    if (openness > 75) {
      alerts.push({
        id: 'friction-shiny-object',
        type: 'warning',
        icon: '✨',
        situation: 'Attracted to new projects mid-task',
        advice: 'Your curiosity is a strength, but not mid-project. Capture new ideas in a "later" list and review them only after completing current work.',
        basedOn: 'High openness'
      });
    }
    
    if (agreeableness > 75) {
      alerts.push({
        id: 'friction-people-pleasing',
        type: 'warning',
        icon: '🤝',
        situation: 'Avoiding necessary conflict',
        advice: 'Not all harmony is healthy. Your instinct to accommodate may be masking important disagreements. Ask yourself: "What am I not saying?"',
        basedOn: 'High agreeableness'
      });
    }
    
    if (conscientiousness < 40) {
      alerts.push({
        id: 'friction-structure',
        type: 'tip',
        icon: '📋',
        situation: 'Feeling overwhelmed by options',
        advice: 'You tend to freeze when options exceed 3-4. Actively reduce choices before deciding—eliminate obviously wrong options first.',
        basedOn: 'Low structure preference'
      });
    }
    
    if (neuroticism > 60) {
      alerts.push({
        id: 'friction-emotional-decisions',
        type: 'warning',
        icon: '💭',
        situation: 'Making important decisions when stressed',
        advice: 'Sleep on it. Your decisions during emotional peaks don\'t represent your settled judgment. Build in a mandatory delay for significant choices.',
        basedOn: 'Emotional sensitivity'
      });
    }
    
    // Intuition strength alert
    if (openness > 60 && neuroticism < 50) {
      alerts.push({
        id: 'strength-intuition',
        type: 'strength',
        icon: '🎯',
        situation: 'Problems with incomplete information',
        advice: 'This is where your intuition outperforms analysis. Trust your gut more than your spreadsheet—your pattern matching is working below conscious awareness.',
        basedOn: 'Balanced intuition'
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ADHD-Based Friction Alerts
  // ─────────────────────────────────────────────────────────────────────────────
  if (adhdResults && (adhdResults.likelihood === 'high' || adhdResults.likelihood === 'moderate')) {
    alerts.push({
      id: 'friction-starting',
      type: 'tip',
      icon: '🚀',
      situation: 'Difficulty starting tasks',
      advice: 'Don\'t wait for motivation—it follows action, not the reverse. Commit to just 2 minutes. The hardest part is starting; once moving, momentum helps.',
      basedOn: 'ADHD-related initiation challenges'
    });
    
    alerts.push({
      id: 'friction-transitions',
      type: 'warning',
      icon: '🔄',
      situation: 'Difficulty stopping one task to start another',
      advice: 'Transition friction is real. Use a physical ritual (stand up, walk to window) to signal the shift. Don\'t rely on willpower alone.',
      basedOn: 'Task-switching difficulty'
    });
    
    const hyperactivityPercentage = (adhdResults.hyperactivityScore / (9 * 4)) * 100;
    if (hyperactivityPercentage > 50) {
      alerts.push({
        id: 'friction-sitting',
        type: 'tip',
        icon: '🏃',
        situation: 'Long sedentary meetings or tasks',
        advice: 'Your body needs to move for your brain to work. Take a movement break every 25-30 minutes, or use a standing desk with a balance board.',
        basedOn: 'High hyperactivity score'
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Cognitive Style Friction Alerts
  // ─────────────────────────────────────────────────────────────────────────────
  if (cognitiveStyleResults) {
    const getScore = (dimension: string) => {
      const found = cognitiveStyleResults.dimensionScores.find(d => d.dimension === dimension);
      return found?.percentage || 0;
    };
    const hyperfocus = getScore('hyperfocus');
    const divergent_thinking = getScore('divergent_thinking');
    const detail_orientation = getScore('detail_orientation');
    
    if (hyperfocus > 75) {
      alerts.push({
        id: 'friction-tunnel-vision',
        type: 'warning',
        icon: '🕳️',
        situation: 'Deep in a problem for hours',
        advice: 'Set external interrupts (alarms, check-ins) to surface periodically. Hyperfocus can cause you to miss important signals—hunger, fatigue, changing priorities.',
        basedOn: 'Strong hyperfocus capacity'
      });
    }
    
    if (divergent_thinking > 75) {
      alerts.push({
        id: 'strength-brainstorming',
        type: 'strength',
        icon: '🧠',
        situation: 'Early-stage problem solving',
        advice: 'Your ideation strength means you see possibilities others miss. In brainstorming, speak early—your unconventional ideas open new directions for the group.',
        basedOn: 'High divergent thinking'
      });
    }
    
    if (detail_orientation > 75) {
      alerts.push({
        id: 'friction-perfectionism',
        type: 'warning',
        icon: '🔬',
        situation: 'Polishing work beyond useful improvement',
        advice: 'Perfect is the enemy of done. Your detail orientation can tip into diminishing returns. Set explicit "done" criteria before starting.',
        basedOn: 'High detail orientation'
      });
    }
  }

  return alerts;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STRESS RESPONSE PROFILE
// ═══════════════════════════════════════════════════════════════════════════════

export function generateStressResponse(
  personalityResults: PersonalityResults | null,
  adhdResults: ADHDResults | null,
  cognitiveStyleResults: CognitiveStyleResults | null
): StressResponse | null {
  if (!personalityResults) return null;
  
  const { neuroticism, conscientiousness, openness } = personalityResults.scores;
  
  let degradesFirst = 'Flexibility';
  let compensatesWith = 'Routine patterns';
  let recoveryAdvice = 'Restore through familiar activities';
  
  if (neuroticism > 60) {
    degradesFirst = 'Emotional regulation';
    compensatesWith = 'Hyper-vigilance and rumination';
    recoveryAdvice = 'Physical activity and social support accelerate your recovery';
  } else if (conscientiousness > 70) {
    degradesFirst = 'Flexibility and creativity';
    compensatesWith = 'Rigid adherence to structure';
    recoveryAdvice = 'Introduce small novelty to break rigid patterns';
  } else if (openness > 70) {
    degradesFirst = 'Focus and follow-through';
    compensatesWith = 'Idea generation (often avoiding the stressor)';
    recoveryAdvice = 'Ground yourself in concrete, completable tasks';
  }
  
  // ADHD modifiers
  if (adhdResults?.likelihood === 'high') {
    degradesFirst = 'Executive function and working memory';
    compensatesWith = 'Urgency-driven hyperfocus or complete avoidance';
    recoveryAdvice = 'External structure and accountability help you most during recovery';
  }
  
  // Cognitive style modifiers
  if (cognitiveStyleResults) {
    const hyperfocusScore = cognitiveStyleResults.dimensionScores.find(d => d.dimension === 'hyperfocus')?.percentage || 0;
    if (hyperfocusScore > 70) {
      compensatesWith = 'Escape into hyperfocus on unrelated interests';
    }
  }
  
  return { degradesFirst, compensatesWith, recoveryAdvice };
}
