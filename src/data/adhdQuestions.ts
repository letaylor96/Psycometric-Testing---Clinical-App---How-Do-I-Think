// ADHD Screening Assessment
// Based on Adult ADHD Self-Report Scale (ASRS-v1.1) by WHO
// Reference: Kessler RC, et al. The World Health Organization Adult ADHD Self-Report Scale (ASRS)

export type ADHDDomain = 'inattention' | 'hyperactivity';

export interface ADHDQuestion {
  id: number;
  domain: ADHDDomain;
  question: string;
  isPartA: boolean; // Part A (6 questions) is the screening threshold
  // ASRS uses different thresholds for different questions
  // Some questions count as positive at "Sometimes", others at "Often"
  threshold: number; // The minimum score (0-4) that counts as a positive symptom
}

export const adhdDomainLabels: Record<ADHDDomain, string> = {
  inattention: 'Inattention',
  hyperactivity: 'Hyperactivity/Impulsivity',
};

// Frequency scale options (ASRS standard)
export const adhdOptions = [
  'Never',
  'Rarely',
  'Sometimes',
  'Often',
  'Very Often'
];

// Complete ASRS-v1.1 (Adult ADHD Self-Report Scale) - 18 Questions
// Questions are based on DSM-IV-TR criteria for ADHD
// Thresholds vary by question as per official ASRS scoring guidelines
export const adhdQuestions: ADHDQuestion[] = [
  // PART A - Screening (6 questions) - Used for initial screening
  // These 6 questions are the most predictive of ADHD
  { 
    id: 1, 
    domain: 'inattention', 
    isPartA: true,
    threshold: 2, // Sometimes or higher
    question: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?' 
  },
  { 
    id: 2, 
    domain: 'inattention', 
    isPartA: true,
    threshold: 2, // Sometimes or higher
    question: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?' 
  },
  { 
    id: 3, 
    domain: 'inattention', 
    isPartA: true,
    threshold: 2, // Sometimes or higher
    question: 'How often do you have problems remembering appointments or obligations?' 
  },
  { 
    id: 4, 
    domain: 'inattention', 
    isPartA: true,
    threshold: 3, // Often or higher
    question: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?' 
  },
  { 
    id: 5, 
    domain: 'hyperactivity', 
    isPartA: true,
    threshold: 3, // Often or higher
    question: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?' 
  },
  { 
    id: 6, 
    domain: 'hyperactivity', 
    isPartA: true,
    threshold: 3, // Often or higher
    question: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?' 
  },

  // PART B - Extended Assessment (12 questions) - Provides additional clinical information
  { 
    id: 7, 
    domain: 'inattention', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you make careless mistakes when you have to work on a boring or difficult project?' 
  },
  { 
    id: 8, 
    domain: 'inattention', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?' 
  },
  { 
    id: 9, 
    domain: 'inattention', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?' 
  },
  { 
    id: 10, 
    domain: 'inattention', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you misplace or have difficulty finding things at home or at work?' 
  },
  { 
    id: 11, 
    domain: 'inattention', 
    isPartA: false,
    threshold: 3,
    question: 'How often are you distracted by activity or noise around you?' 
  },
  { 
    id: 12, 
    domain: 'hyperactivity', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?' 
  },
  { 
    id: 13, 
    domain: 'hyperactivity', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you feel restless or fidgety?' 
  },
  { 
    id: 14, 
    domain: 'hyperactivity', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?' 
  },
  { 
    id: 15, 
    domain: 'hyperactivity', 
    isPartA: false,
    threshold: 2, // Sometimes or higher
    question: 'How often do you find yourself talking too much when you are in social situations?' 
  },
  { 
    id: 16, 
    domain: 'hyperactivity', 
    isPartA: false,
    threshold: 2, // Sometimes or higher
    question: 'When you\'re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to before they can finish them themselves?' 
  },
  { 
    id: 17, 
    domain: 'hyperactivity', 
    isPartA: false,
    threshold: 3,
    question: 'How often do you have difficulty waiting your turn in situations when turn-taking is required?' 
  },
  { 
    id: 18, 
    domain: 'hyperactivity', 
    isPartA: false,
    threshold: 2, // Sometimes or higher
    question: 'How often do you interrupt others when they are busy?' 
  },
];

export interface ADHDResults {
  partAScore: number;
  partAThreshold: boolean; // true if 4+ symptoms in Part A
  partBPositiveCount: number;
  totalPositiveSymptoms: number;
  totalScore: number;
  maxScore: number;
  inattentionScore: number;
  inattentionPositive: number;
  hyperactivityScore: number;
  hyperactivityPositive: number;
  likelihood: 'low' | 'moderate' | 'high';
  interpretation: string;
  recommendations: string[];
  disclaimer: string;
}

export const calculateADHDResults = (answers: number[]): ADHDResults => {
  let partAScore = 0;
  let partBPositiveCount = 0;
  let totalScore = 0;
  let inattentionScore = 0;
  let hyperactivityScore = 0;
  let inattentionPositive = 0;
  let hyperactivityPositive = 0;

  adhdQuestions.forEach((q, index) => {
    const answer = answers[index];
    if (answer === undefined) return;
    
    // Check if answer meets the threshold for this specific question
    const isPositive = answer >= q.threshold;
    
    if (q.isPartA && isPositive) {
      partAScore++;
    }
    
    if (!q.isPartA && isPositive) {
      partBPositiveCount++;
    }
    
    totalScore += answer;
    
    if (q.domain === 'inattention') {
      inattentionScore += answer;
      if (isPositive) inattentionPositive++;
    } else {
      hyperactivityScore += answer;
      if (isPositive) hyperactivityPositive++;
    }
  });

  const maxScore = adhdQuestions.length * 4;
  const partAThreshold = partAScore >= 4; // WHO standard: 4+ positive in Part A suggests ADHD
  const totalPositiveSymptoms = partAScore + partBPositiveCount;
  
  // Determine likelihood based on WHO ASRS scoring guidelines
  let likelihood: 'low' | 'moderate' | 'high';
  let interpretation: string;
  let recommendations: string[] = [];
  
  if (partAThreshold) {
    // 4+ positive symptoms in Part A is highly suggestive of ADHD
    likelihood = 'high';
    interpretation = 'Your responses on the screening portion (Part A) are highly consistent with adult ADHD. You reported frequent occurrence of ' + partAScore + ' out of 6 key symptoms that are most predictive of the disorder.';
    recommendations = [
      'Consider scheduling an evaluation with a psychiatrist, psychologist, or other qualified professional',
      'Bring these results to your appointment for discussion',
      'A comprehensive evaluation typically includes clinical interview, rating scales, and sometimes neuropsychological testing',
      'Treatment options may include medication, cognitive behavioral therapy, coaching, or a combination'
    ];
  } else if (partAScore >= 2 || totalPositiveSymptoms >= 6) {
    likelihood = 'moderate';
    interpretation = 'Your responses suggest some patterns that may warrant further evaluation. While you did not meet the screening threshold, you reported ' + totalPositiveSymptoms + ' symptoms occurring frequently, which may affect your daily functioning.';
    recommendations = [
      'Consider discussing these symptoms with your primary care physician',
      'Keep a log of situations where you notice attention or hyperactivity difficulties',
      'Some symptoms may be related to other conditions like anxiety, depression, or sleep disorders',
      'Lifestyle strategies (exercise, sleep hygiene, organization systems) may help manage symptoms'
    ];
  } else {
    likelihood = 'low';
    interpretation = 'Your responses do not suggest significant ADHD symptoms. Most adults occasionally experience attention difficulties or restlessness, but your reported frequency falls within typical ranges.';
    recommendations = [
      'No clinical evaluation appears necessary based on these results',
      'If symptoms are causing concern in specific situations, consider discussing with a healthcare provider',
      'General strategies like adequate sleep, regular exercise, and stress management support attention and focus'
    ];
  }

  return {
    partAScore,
    partAThreshold,
    partBPositiveCount,
    totalPositiveSymptoms,
    totalScore,
    maxScore,
    inattentionScore,
    inattentionPositive,
    hyperactivityScore,
    hyperactivityPositive,
    likelihood,
    interpretation,
    recommendations,
    disclaimer: 'IMPORTANT: This is a screening tool based on the WHO Adult ADHD Self-Report Scale (ASRS-v1.1), not a diagnostic instrument. ADHD can only be diagnosed by a qualified healthcare professional through comprehensive evaluation including clinical interview, developmental history, and ruling out other conditions. This tool is intended for educational purposes only. If you have concerns about ADHD, please consult a psychiatrist, psychologist, or other qualified mental health professional.',
  };
};
