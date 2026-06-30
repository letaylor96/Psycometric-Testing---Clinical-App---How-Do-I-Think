// AQ-10 Adult — short-form autism screener
// Reference: Allison, Auyeung & Baron-Cohen (2012). "Toward brief 'red flags' for autism screening:
// the Short Autism Spectrum Quotient and the Short Quantitative Checklist..."
// J Am Acad Child Adolesc Psychiatry 51(2): 202-212.
// 10 items, 4-point agree/disagree; cutoff 6/10 = refer for full assessment.

export interface AQ10Question {
  id: number;
  question: string;
  scoring: 'agree' | 'disagree'; // which direction counts as +1
}

export const aq10Options = [
  'Definitely agree',
  'Slightly agree',
  'Slightly disagree',
  'Definitely disagree',
];

const isAgreeAnswer = (answer: number) => answer <= 1;

export const aq10Questions: AQ10Question[] = [
  { id: 1,  scoring: 'agree',    question: 'I often notice small sounds when others do not.' },
  { id: 2,  scoring: 'disagree', question: 'I usually concentrate more on the whole picture, rather than the small details.' },
  { id: 3,  scoring: 'agree',    question: 'I find it easy to do more than one thing at once.' }, // agree=non-trait → invert below
  { id: 4,  scoring: 'agree',    question: 'If there is an interruption, I can switch back to what I was doing very quickly.' },
  { id: 5,  scoring: 'disagree', question: 'I find it easy to "read between the lines" when someone is talking to me.' },
  { id: 6,  scoring: 'disagree', question: 'I know how to tell if someone listening to me is getting bored.' },
  { id: 7,  scoring: 'agree',    question: 'When I\'m reading a story, I find it difficult to work out the characters\' intentions.' },
  { id: 8,  scoring: 'disagree', question: 'I like to collect information about categories of things (e.g. types of car, bird, train, plant).' },
  { id: 9,  scoring: 'disagree', question: 'I find it easy to work out what someone is thinking or feeling just by looking at their face.' },
  { id: 10, scoring: 'agree',    question: 'I find it difficult to work out people\'s intentions.' },
];

// Official AQ-10 keying (Allison 2012): items 1,7,8,10 → agree; 2,3,4,5,6,9 → disagree
const officialAgreeIds = new Set<number>([1, 7, 8, 10]);
aq10Questions.forEach((q) => {
  q.scoring = officialAgreeIds.has(q.id) ? 'agree' : 'disagree';
});

export interface AQ10Results {
  totalScore: number; // 0-10
  maxScore: 10;
  cutoffMet: boolean; // 6+ suggests referral
  likelihood: 'low' | 'moderate' | 'high';
  interpretation: string;
  disclaimer: string;
}

export const calculateAQ10Results = (answers: number[]): AQ10Results => {
  let totalScore = 0;
  aq10Questions.forEach((q, idx) => {
    const a = answers[idx];
    if (a === undefined || a < 0) return;
    const agreed = isAgreeAnswer(a);
    if ((q.scoring === 'agree' && agreed) || (q.scoring === 'disagree' && !agreed)) {
      totalScore += 1;
    }
  });

  const cutoffMet = totalScore >= 6;
  let likelihood: AQ10Results['likelihood'];
  let interpretation: string;

  if (totalScore >= 7) {
    likelihood = 'high';
    interpretation = `Your AQ-10 score of ${totalScore}/10 is at or above the validated cutoff (6) and suggests autistic traits substantial enough that a full clinical assessment would be appropriate.`;
  } else if (cutoffMet) {
    likelihood = 'high';
    interpretation = `Your AQ-10 score of ${totalScore}/10 meets the validated screening cutoff of 6. Allison et al. (2012) recommend referral for full assessment at this level.`;
  } else if (totalScore >= 4) {
    likelihood = 'moderate';
    interpretation = `Your AQ-10 score of ${totalScore}/10 is below the cutoff (6) but shows a cluster of autistic traits worth understanding even without a diagnosis.`;
  } else {
    likelihood = 'low';
    interpretation = `Your AQ-10 score of ${totalScore}/10 is below the screening threshold. Your responses fall within the range most common in the general population.`;
  }

  return {
    totalScore,
    maxScore: 10,
    cutoffMet,
    likelihood,
    interpretation,
    disclaimer:
      'AQ-10 is a brief screening tool, not a diagnostic instrument. An autism diagnosis can only be made by a qualified clinician through comprehensive evaluation.',
  };
};
