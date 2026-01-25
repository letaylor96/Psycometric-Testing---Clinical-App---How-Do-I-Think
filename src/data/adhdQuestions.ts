// ADHD Screening Assessment
// Based on Adult ADHD Self-Report Scale (ASRS-v1.1) by WHO

export type ADHDDomain = 'inattention' | 'hyperactivity';

export interface ADHDQuestion {
  id: number;
  domain: ADHDDomain;
  question: string;
  isPartA: boolean; // Part A (6 questions) is the screening threshold
}

export const adhdDomainLabels: Record<ADHDDomain, string> = {
  inattention: 'Inattention',
  hyperactivity: 'Hyperactivity/Impulsivity',
};

// Frequency scale options
export const adhdOptions = [
  'Never',
  'Rarely',
  'Sometimes',
  'Often',
  'Very Often'
];

// Based on ASRS-v1.1 (Adult ADHD Self-Report Scale)
export const adhdQuestions: ADHDQuestion[] = [
  // PART A - Screening (6 questions)
  { id: 1, domain: 'inattention', isPartA: true,
    question: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?' },
  { id: 2, domain: 'inattention', isPartA: true,
    question: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?' },
  { id: 3, domain: 'inattention', isPartA: true,
    question: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?' },
  { id: 4, domain: 'hyperactivity', isPartA: true,
    question: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?' },
  { id: 5, domain: 'hyperactivity', isPartA: true,
    question: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?' },
  { id: 6, domain: 'inattention', isPartA: true,
    question: 'How often do you have problems remembering appointments or obligations?' },

  // PART B - Extended (12 questions)
  { id: 7, domain: 'inattention', isPartA: false,
    question: 'How often do you make careless mistakes when you have to work on a boring or difficult project?' },
  { id: 8, domain: 'inattention', isPartA: false,
    question: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?' },
  { id: 9, domain: 'inattention', isPartA: false,
    question: 'How often do you misplace or have difficulty finding things at home or at work?' },
  { id: 10, domain: 'inattention', isPartA: false,
    question: 'How often are you distracted by activity or noise around you?' },
  { id: 11, domain: 'inattention', isPartA: false,
    question: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?' },
  { id: 12, domain: 'hyperactivity', isPartA: false,
    question: 'How often do you feel restless or fidgety?' },
  { id: 13, domain: 'hyperactivity', isPartA: false,
    question: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?' },
  { id: 14, domain: 'hyperactivity', isPartA: false,
    question: 'How often do you find yourself talking too much when you are in social situations?' },
  { id: 15, domain: 'hyperactivity', isPartA: false,
    question: 'How often do you finish the sentences of the people you are talking to before they can finish them themselves?' },
  { id: 16, domain: 'hyperactivity', isPartA: false,
    question: 'How often do you have difficulty waiting your turn in situations when turn-taking is required?' },
  { id: 17, domain: 'hyperactivity', isPartA: false,
    question: 'How often do you interrupt others when they are busy?' },
  { id: 18, domain: 'inattention', isPartA: false,
    question: 'How often do you avoid or delay getting started on tasks that require a lot of thought?' },
];

export interface ADHDResults {
  partAScore: number;
  partAThreshold: boolean; // true if 4+ symptoms in Part A
  totalScore: number;
  maxScore: number;
  inattentionScore: number;
  hyperactivityScore: number;
  likelihood: 'low' | 'moderate' | 'high';
  interpretation: string;
  disclaimer: string;
}

export const calculateADHDResults = (answers: number[]): ADHDResults => {
  let partAScore = 0;
  let totalScore = 0;
  let inattentionScore = 0;
  let hyperactivityScore = 0;

  adhdQuestions.forEach((q, index) => {
    const answer = answers[index];
    if (answer === undefined) return;
    
    // Scoring: Never=0, Rarely=1, Sometimes=2, Often=3, Very Often=4
    // For ASRS, "Often" and "Very Often" count as positive symptoms
    const isPositive = answer >= 3; // Often or Very Often
    
    if (q.isPartA && isPositive) {
      partAScore++;
    }
    
    totalScore += answer;
    
    if (q.domain === 'inattention') {
      inattentionScore += answer;
    } else {
      hyperactivityScore += answer;
    }
  });

  const maxScore = adhdQuestions.length * 4;
  const partAThreshold = partAScore >= 4;
  
  // Determine likelihood
  let likelihood: 'low' | 'moderate' | 'high';
  let interpretation: string;
  
  const percentageScore = (totalScore / maxScore) * 100;
  
  if (partAThreshold && percentageScore >= 50) {
    likelihood = 'high';
    interpretation = 'Your responses suggest patterns that are commonly associated with ADHD. Many of the symptoms you reported occur frequently in your daily life.';
  } else if (partAThreshold || percentageScore >= 35) {
    likelihood = 'moderate';
    interpretation = 'Your responses indicate some patterns that may be worth discussing with a healthcare professional. Some symptoms appear to affect your daily functioning.';
  } else {
    likelihood = 'low';
    interpretation = 'Your responses suggest that ADHD-related symptoms are not significantly impacting your daily life. Most people experience occasional attention or restlessness issues.';
  }

  return {
    partAScore,
    partAThreshold,
    totalScore,
    maxScore,
    inattentionScore,
    hyperactivityScore,
    likelihood,
    interpretation,
    disclaimer: 'This is a screening tool only, not a diagnostic instrument. ADHD can only be diagnosed by a qualified healthcare professional through comprehensive evaluation. If you have concerns, please consult a doctor or mental health specialist.',
  };
};
