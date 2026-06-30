// Sensory Processing + Rejection Sensitive Dysphoria (RSD) self-report
// Sensory items inspired by Adult/Adolescent Sensory Profile (AASP — Brown & Dunn 2002).
// RSD items inspired by Dodson's clinical observations and the RSD-7 working items.
// 12 items total (6 sensory + 6 RSD). 5-point frequency.

export interface SensoryRsdQuestion {
  id: number;
  domain: 'sensory' | 'rsd';
  question: string;
}

export const sensoryRsdOptions = ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'];

export const sensoryRsdQuestions: SensoryRsdQuestion[] = [
  // ===== Sensory Processing (6) =====
  { id: 1,  domain: 'sensory', question: 'I find certain everyday sounds (chewing, fluorescent lights, traffic) painful or overwhelming when others seem unbothered.' },
  { id: 2,  domain: 'sensory', question: 'Specific clothing textures, tags, or seams distract or distress me throughout the day.' },
  { id: 3,  domain: 'sensory', question: 'Bright lights, busy patterns, or fluorescent lighting tire me or make it hard to think.' },
  { id: 4,  domain: 'sensory', question: 'Strong smells (perfume, food, cleaning products) bother me far more than they bother others.' },
  { id: 5,  domain: 'sensory', question: 'I need to retreat to a quiet, low-stimulus environment to recover after busy social situations.' },
  { id: 6,  domain: 'sensory', question: 'Unexpected touch, crowds, or being in noisy environments makes me anxious or shut down.' },

  // ===== Rejection Sensitive Dysphoria (6) =====
  { id: 7,  domain: 'rsd', question: 'Real or perceived criticism causes a sudden, intense emotional reaction out of proportion to the situation.' },
  { id: 8,  domain: 'rsd', question: 'I replay social interactions for hours or days, hunting for signs that someone is upset with me.' },
  { id: 9,  domain: 'rsd', question: 'I avoid situations where I might be judged, rejected, or fail — even ones I want to do.' },
  { id: 10, domain: 'rsd', question: 'A small slight, ignored message, or change in someone\'s tone can ruin my day.' },
  { id: 11, domain: 'rsd', question: 'I work extremely hard to please others or be "perfect" to avoid the possibility of rejection.' },
  { id: 12, domain: 'rsd', question: 'When I feel rejected, the emotional pain feels physical — like a punch or a wound.' },
];

export interface SensoryRsdResults {
  sensoryScore: number;       // 0-24 (4 max × 6)
  sensoryMax: 24;
  sensoryPercent: number;     // 0-100
  rsdScore: number;           // 0-24
  rsdMax: 24;
  rsdPercent: number;         // 0-100
  totalScore: number;         // 0-48
  totalMax: 48;
  sensoryLikelihood: 'low' | 'moderate' | 'high';
  rsdLikelihood: 'low' | 'moderate' | 'high';
  interpretation: string;
  disclaimer: string;
}

export const calculateSensoryRsdResults = (answers: number[]): SensoryRsdResults => {
  let sensoryScore = 0;
  let rsdScore = 0;
  sensoryRsdQuestions.forEach((q, idx) => {
    const a = answers[idx];
    if (a === undefined || a < 0) return;
    if (q.domain === 'sensory') sensoryScore += a;
    else rsdScore += a;
  });

  const sensoryMax = 24;
  const rsdMax = 24;
  const sensoryPercent = Math.round((sensoryScore / sensoryMax) * 100);
  const rsdPercent = Math.round((rsdScore / rsdMax) * 100);

  const band = (pct: number): 'low' | 'moderate' | 'high' =>
    pct >= 65 ? 'high' : pct >= 40 ? 'moderate' : 'low';

  const sensoryLikelihood = band(sensoryPercent);
  const rsdLikelihood = band(rsdPercent);

  const parts: string[] = [];
  if (sensoryLikelihood === 'high') {
    parts.push('strong sensory-processing sensitivity that likely affects daily functioning');
  } else if (sensoryLikelihood === 'moderate') {
    parts.push('moderate sensory sensitivity in specific contexts');
  } else {
    parts.push('typical sensory regulation');
  }
  if (rsdLikelihood === 'high') {
    parts.push('a strong rejection-sensitivity pattern that warrants attention');
  } else if (rsdLikelihood === 'moderate') {
    parts.push('some rejection sensitivity worth tracking');
  } else {
    parts.push('typical resilience to social criticism');
  }
  const interpretation = `Your responses indicate ${parts[0]} and ${parts[1]}.`;

  return {
    sensoryScore,
    sensoryMax: 24,
    sensoryPercent,
    rsdScore,
    rsdMax: 24,
    rsdPercent,
    totalScore: sensoryScore + rsdScore,
    totalMax: 48,
    sensoryLikelihood,
    rsdLikelihood,
    interpretation,
    disclaimer:
      'Sensory processing and Rejection Sensitive Dysphoria are not standalone DSM diagnoses. These items describe experiential patterns commonly reported alongside ADHD and autism. Consult a qualified clinician if these patterns affect daily life.',
  };
};
