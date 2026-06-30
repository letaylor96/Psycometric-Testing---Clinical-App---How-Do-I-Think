// Adult Dyscalculia self-report screener
// Inspired by Adult Dyscalculia Checklist (Trott & Beacham) and DSM-5 criteria for
// specific learning disorder with impairment in mathematics.
// 10 items, 3-point frequency. Cutoff 6+ "often" responses suggests further assessment.

export interface DyscalculiaQuestion {
  id: number;
  question: string;
}

export const dyscalculiaOptions = ['No / Rarely', 'Sometimes', 'Yes / Often'];

export const dyscalculiaQuestions: DyscalculiaQuestion[] = [
  { id: 1,  question: 'Do you find mental arithmetic (adding, subtracting in your head) much harder than your peers seem to?' },
  { id: 2,  question: 'Do you struggle to estimate quantities — for example, how many people are in a room, or how much something costs?' },
  { id: 3,  question: 'Do you mix up numbers (e.g., write 24 for 42) or transpose digits when copying numbers?' },
  { id: 4,  question: 'Do you find it hard to read an analogue clock or calculate elapsed time?' },
  { id: 5,  question: 'Do you avoid situations that involve numbers — splitting a bill, calculating tips, budgeting?' },
  { id: 6,  question: 'Do you struggle to remember sequences like phone numbers or PINs even after using them often?' },
  { id: 7,  question: 'Do you find it difficult to follow directions involving distances, times, or measurements?' },
  { id: 8,  question: 'Do you experience anxiety or "freeze up" when asked to do math under pressure?' },
  { id: 9,  question: 'Do you rely heavily on fingers, written tallies, or a calculator for calculations others do mentally?' },
  { id: 10, question: 'Do you find graphs, charts, or statistics confusing to interpret quickly?' },
];

export interface DyscalculiaResults {
  totalScore: number; // 0-20
  rawCount: number;  // count of "Yes/Often" answers
  maxScore: 20;
  cutoffMet: boolean; // 6+ often answers
  likelihood: 'low' | 'moderate' | 'high';
  interpretation: string;
  disclaimer: string;
}

export const calculateDyscalculiaResults = (answers: number[]): DyscalculiaResults => {
  let totalScore = 0;
  let rawCount = 0;
  dyscalculiaQuestions.forEach((_, idx) => {
    const a = answers[idx];
    if (a === undefined || a < 0) return;
    totalScore += a;
    if (a >= 2) rawCount += 1;
  });

  const cutoffMet = rawCount >= 6;
  let likelihood: DyscalculiaResults['likelihood'];
  let interpretation: string;

  if (rawCount >= 8) {
    likelihood = 'high';
    interpretation = `Your responses (${rawCount}/10 strong indicators) are well above the screening threshold and suggest patterns consistent with dyscalculia worth formal evaluation.`;
  } else if (cutoffMet) {
    likelihood = 'high';
    interpretation = `Your responses (${rawCount}/10 strong indicators) meet the screening threshold (6+). Consider an evaluation with a specialist if these traits affect daily life.`;
  } else if (rawCount >= 3) {
    likelihood = 'moderate';
    interpretation = `Your responses (${rawCount}/10) suggest some numerical-processing friction below the screening threshold.`;
  } else {
    likelihood = 'low';
    interpretation = `Your responses (${rawCount}/10) fall within the typical range. Dyscalculia indicators are not prominent in your profile.`;
  }

  return {
    totalScore,
    rawCount,
    maxScore: 20,
    cutoffMet,
    likelihood,
    interpretation,
    disclaimer:
      'This is a self-report screener, not a diagnostic test. Dyscalculia diagnosis requires evaluation by a qualified educational psychologist.',
  };
};
