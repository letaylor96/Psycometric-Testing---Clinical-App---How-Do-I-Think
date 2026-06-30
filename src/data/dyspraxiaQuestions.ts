// Adult Developmental Coordination Disorder (DCD / dyspraxia) screener
// Inspired by the Adult Developmental Coordination Disorder Checklist (ADC) — Kirby, Edwards, Sugden 2010.
// 10 items, 3-point frequency. Cutoff 6+ "often" answers warrants further evaluation.

export interface DyspraxiaQuestion {
  id: number;
  question: string;
}

export const dyspraxiaOptions = ['No / Rarely', 'Sometimes', 'Yes / Often'];

export const dyspraxiaQuestions: DyspraxiaQuestion[] = [
  { id: 1,  question: 'Are you clumsy — do you bump into things or drop things more than other people?' },
  { id: 2,  question: 'Do you find it hard to learn new physical skills (e.g., dance steps, sports moves, driving)?' },
  { id: 3,  question: 'Is your handwriting messy, slow, or tiring to produce?' },
  { id: 4,  question: 'Do you find it hard to judge distances when reaching, parking, or pouring?' },
  { id: 5,  question: 'Do you find it hard to organize your time, possessions, or daily tasks?' },
  { id: 6,  question: 'Do you find activities involving balance (cycling, ladders, uneven ground) more difficult than your peers do?' },
  { id: 7,  question: 'Do you struggle with tasks needing fine motor control (buttons, laces, threading a needle, using tools)?' },
  { id: 8,  question: 'Do you find it tiring or effortful to carry out everyday physical routines that others do automatically?' },
  { id: 9,  question: 'Do you confuse left and right, or struggle with directions and map-reading?' },
  { id: 10, question: 'Do you tend to be late, lose track of time, or underestimate how long tasks will take?' },
];

export interface DyspraxiaResults {
  totalScore: number; // 0-20
  rawCount: number;  // "often" answers count
  maxScore: 20;
  cutoffMet: boolean;
  likelihood: 'low' | 'moderate' | 'high';
  interpretation: string;
  disclaimer: string;
}

export const calculateDyspraxiaResults = (answers: number[]): DyspraxiaResults => {
  let totalScore = 0;
  let rawCount = 0;
  dyspraxiaQuestions.forEach((_, idx) => {
    const a = answers[idx];
    if (a === undefined || a < 0) return;
    totalScore += a;
    if (a >= 2) rawCount += 1;
  });

  const cutoffMet = rawCount >= 6;
  let likelihood: DyspraxiaResults['likelihood'];
  let interpretation: string;

  if (rawCount >= 8) {
    likelihood = 'high';
    interpretation = `Your responses (${rawCount}/10 strong indicators) are well above the screening threshold and suggest patterns consistent with adult dyspraxia/DCD worth formal evaluation.`;
  } else if (cutoffMet) {
    likelihood = 'high';
    interpretation = `Your responses (${rawCount}/10 strong indicators) meet the screening threshold for adult DCD.`;
  } else if (rawCount >= 3) {
    likelihood = 'moderate';
    interpretation = `Your responses (${rawCount}/10) suggest some coordination/organization friction below the screening threshold.`;
  } else {
    likelihood = 'low';
    interpretation = `Your responses (${rawCount}/10) fall within the typical range. Dyspraxia indicators are not prominent in your profile.`;
  }

  return {
    totalScore,
    rawCount,
    maxScore: 20,
    cutoffMet,
    likelihood,
    interpretation,
    disclaimer:
      'This is a self-report screener, not a diagnostic test. Adult DCD/dyspraxia diagnosis requires evaluation by an occupational therapist or specialist.',
  };
};
