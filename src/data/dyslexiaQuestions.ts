// Adult Dyslexia Checklist (ADC)-inspired screener
// Reference: Vinegrad (1994), Smythe & Everatt — Adult Dyslexia Checklist.
// 15 yes/no items. Score 9+ = strong indicators consistent with dyslexia.

export interface DyslexiaQuestion {
  id: number;
  question: string;
}

export const dyslexiaOptions = ['No / Rarely', 'Sometimes', 'Yes / Often'];

export const dyslexiaQuestions: DyslexiaQuestion[] = [
  { id: 1,  question: 'Do you find it difficult to take messages on the telephone and pass them on correctly?' },
  { id: 2,  question: 'Do you find it hard to remember the sense of what you have just read?' },
  { id: 3,  question: 'When you are reading aloud, do you find it difficult to read with expression?' },
  { id: 4,  question: 'Do you mix up dates and times and miss appointments?' },
  { id: 5,  question: 'Do you find it difficult to fill out forms?' },
  { id: 6,  question: 'Do you mix up details such as bus numbers, phone numbers, or PIN codes?' },
  { id: 7,  question: 'Is your spelling poor or inconsistent (e.g., you spell the same word differently in the same document)?' },
  { id: 8,  question: 'Do you find it hard to listen and take notes at the same time?' },
  { id: 9,  question: 'When you are reading, do you find that you lose your place or skip lines?' },
  { id: 10, question: 'Do you confuse left and right?' },
  { id: 11, question: 'Do you find map-reading or finding your way to a new place confusing?' },
  { id: 12, question: 'Do you find it difficult to say months of the year forwards in a fluent manner?' },
  { id: 13, question: 'Do you find it difficult to say months of the year backwards?' },
  { id: 14, question: 'Do you mix up the order of letters or numbers (e.g., write 36 for 63, or "form" for "from")?' },
  { id: 15, question: 'Do you take longer than you think you should to read a page of a book?' },
];

export interface DyslexiaResults {
  totalScore: number; // 0-30 (3-point scale × 15)
  rawCount: number; // count of "Yes/Often" responses (0-15) — closest to validated ADC scoring
  maxScore: 30;
  cutoffMet: boolean; // 9+ "yes" answers
  likelihood: 'low' | 'moderate' | 'high';
  interpretation: string;
  disclaimer: string;
}

export const calculateDyslexiaResults = (answers: number[]): DyslexiaResults => {
  let totalScore = 0;
  let rawCount = 0;
  dyslexiaQuestions.forEach((_, idx) => {
    const a = answers[idx];
    if (a === undefined || a < 0) return;
    totalScore += a; // 0..2
    if (a >= 2) rawCount += 1;
  });

  const cutoffMet = rawCount >= 9;
  let likelihood: DyslexiaResults['likelihood'];
  let interpretation: string;

  if (rawCount >= 12) {
    likelihood = 'high';
    interpretation = `Your responses (${rawCount}/15 strong indicators) are well above the validated dyslexia screening threshold of 9. A formal assessment by an educational psychologist would be appropriate.`;
  } else if (cutoffMet) {
    likelihood = 'high';
    interpretation = `Your responses (${rawCount}/15 strong indicators) meet the validated dyslexia screening threshold of 9 used in the Adult Dyslexia Checklist.`;
  } else if (rawCount >= 5) {
    likelihood = 'moderate';
    interpretation = `Your responses (${rawCount}/15) suggest some literacy-related traits below the screening threshold (9). Worth tracking, particularly if these affect work or study.`;
  } else {
    likelihood = 'low';
    interpretation = `Your responses (${rawCount}/15) fall within the typical range. Dyslexia indicators are not prominent in your profile.`;
  }

  return {
    totalScore,
    rawCount,
    maxScore: 30,
    cutoffMet,
    likelihood,
    interpretation,
    disclaimer:
      'This is a self-report screener, not a diagnostic test. A dyslexia diagnosis requires assessment by a qualified educational psychologist or specialist teacher.',
  };
};
