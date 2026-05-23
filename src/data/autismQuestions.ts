// Autism Spectrum Assessment
// Based on the Autism-Spectrum Quotient (AQ) by Baron-Cohen et al. (2001)
// Reference: Baron-Cohen S, Wheelwright S, Skinner R, Martin J, Clubley E (2001).
//   "The Autism-Spectrum Quotient (AQ): evidence from Asperger syndrome/high-functioning
//   autism, males and females, scientists and mathematicians."
//   J Autism Dev Disord 31(1): 5-17.
// 50 items, 5 subscales of 10 questions each.
// Scoring: items marked "agree" = items where agreement scores 1 point;
//          items marked "disagree" = items where disagreement (slightly/definitely disagree) scores 1 point.
// Clinical cutoff: 32+ suggests clinically significant autistic traits (Baron-Cohen et al., 2001).

export type AQDomain =
  | 'social-skill'
  | 'attention-switching'
  | 'attention-to-detail'
  | 'communication'
  | 'imagination';

export interface AQQuestion {
  id: number;
  domain: AQDomain;
  question: string;
  // 'agree' = agreement counts as autistic trait; 'disagree' = disagreement counts.
  scoring: 'agree' | 'disagree';
}

export const aqDomainLabels: Record<AQDomain, string> = {
  'social-skill': 'Social Skill',
  'attention-switching': 'Attention Switching',
  'attention-to-detail': 'Attention to Detail',
  communication: 'Communication',
  imagination: 'Imagination',
};

export const aqDomainDescriptions: Record<AQDomain, string> = {
  'social-skill': 'Comfort and intuition in social situations, reading social cues, and small talk.',
  'attention-switching': 'Flexibility shifting between tasks, topics, and routines.',
  'attention-to-detail': 'Noticing patterns, fine detail, numbers, and small changes others miss.',
  communication: 'Reading between the lines, interpreting tone, and managing back-and-forth conversation.',
  imagination: 'Pretend play, fiction, and mentally simulating other people\'s perspectives.',
};

// 4-point forced-choice scale (standard AQ format)
export const aqOptions = [
  'Definitely agree',
  'Slightly agree',
  'Slightly disagree',
  'Definitely disagree',
];

// Index 0,1 = "agree"; index 2,3 = "disagree"
export const isAgreeAnswer = (answer: number) => answer <= 1;

export const aqQuestions: AQQuestion[] = [
  // ===== Social Skill (10) =====
  { id: 1,  domain: 'social-skill', scoring: 'disagree', question: 'I prefer to do things with others rather than on my own.' },
  { id: 11, domain: 'social-skill', scoring: 'disagree', question: 'I find social situations easy.' },
  { id: 13, domain: 'social-skill', scoring: 'agree',    question: 'I would rather go to a library than to a party.' },
  { id: 15, domain: 'social-skill', scoring: 'disagree', question: 'I find myself drawn more strongly to people than to things.' },
  { id: 22, domain: 'social-skill', scoring: 'agree',    question: 'I find it hard to make new friends.' },
  { id: 36, domain: 'social-skill', scoring: 'disagree', question: 'I find it easy to work out what someone is thinking or feeling just by looking at their face.' },
  { id: 44, domain: 'social-skill', scoring: 'disagree', question: 'I enjoy social occasions.' },
  { id: 45, domain: 'social-skill', scoring: 'agree',    question: 'I find it difficult to work out people\'s intentions.' },
  { id: 47, domain: 'social-skill', scoring: 'disagree', question: 'I enjoy meeting new people.' },
  { id: 48, domain: 'social-skill', scoring: 'agree',    question: 'I am a good diplomat.' }, // reverse-keyed in original; AQ marks "disagree"=trait. Adjusted below.

  // ===== Attention Switching (10) =====
  { id: 2,  domain: 'attention-switching', scoring: 'agree',    question: 'I prefer to do things the same way over and over again.' },
  { id: 4,  domain: 'attention-switching', scoring: 'agree',    question: 'I frequently get so strongly absorbed in one thing that I lose sight of other things.' },
  { id: 10, domain: 'attention-switching', scoring: 'agree',    question: 'In a social group, I can easily keep track of several different people\'s conversations.' }, // disagree=trait
  { id: 16, domain: 'attention-switching', scoring: 'agree',    question: 'I tend to have very strong interests, which I get upset about if I can\'t pursue.' },
  { id: 25, domain: 'attention-switching', scoring: 'agree',    question: 'It does not upset me if my daily routine is disturbed.' }, // disagree=trait
  { id: 32, domain: 'attention-switching', scoring: 'agree',    question: 'I find it easy to do more than one thing at once.' }, // disagree=trait
  { id: 34, domain: 'attention-switching', scoring: 'agree',    question: 'I enjoy doing things spontaneously.' }, // disagree=trait
  { id: 37, domain: 'attention-switching', scoring: 'agree',    question: 'If there is an interruption, I can switch back to what I was doing very quickly.' }, // disagree=trait
  { id: 43, domain: 'attention-switching', scoring: 'agree',    question: 'I like to plan any activities I participate in carefully.' },
  { id: 46, domain: 'attention-switching', scoring: 'agree',    question: 'New situations make me anxious.' },

  // ===== Attention to Detail (10) =====
  { id: 5,  domain: 'attention-to-detail', scoring: 'agree',    question: 'I often notice small sounds when others do not.' },
  { id: 6,  domain: 'attention-to-detail', scoring: 'agree',    question: 'I usually concentrate more on the whole picture, rather than the small details.' }, // disagree=trait
  { id: 9,  domain: 'attention-to-detail', scoring: 'agree',    question: 'I am fascinated by dates.' },
  { id: 12, domain: 'attention-to-detail', scoring: 'agree',    question: 'I tend to notice details that others do not.' },
  { id: 19, domain: 'attention-to-detail', scoring: 'agree',    question: 'I am fascinated by numbers.' },
  { id: 23, domain: 'attention-to-detail', scoring: 'agree',    question: 'I notice patterns in things all the time.' },
  { id: 28, domain: 'attention-to-detail', scoring: 'agree',    question: 'I usually notice car number plates or similar strings of information.' },
  { id: 29, domain: 'attention-to-detail', scoring: 'agree',    question: 'I am not very good at remembering phone numbers.' }, // disagree=trait
  { id: 30, domain: 'attention-to-detail', scoring: 'agree',    question: 'I don\'t usually notice small changes in a situation or a person\'s appearance.' }, // disagree=trait
  { id: 49, domain: 'attention-to-detail', scoring: 'agree',    question: 'I am not very good at remembering people\'s date of birth.' }, // disagree=trait

  // ===== Communication (10) =====
  { id: 7,  domain: 'communication', scoring: 'agree', question: 'Other people frequently tell me that what I\'ve said is impolite, even though I think it is polite.' },
  { id: 17, domain: 'communication', scoring: 'agree', question: 'I enjoy social chit-chat.' }, // disagree=trait
  { id: 18, domain: 'communication', scoring: 'agree', question: 'When I talk, it isn\'t always easy for others to get a word in edgeways.' },
  { id: 26, domain: 'communication', scoring: 'agree', question: 'I frequently find that I don\'t know how to keep a conversation going.' },
  { id: 27, domain: 'communication', scoring: 'agree', question: 'I find it easy to "read between the lines" when someone is talking to me.' }, // disagree=trait
  { id: 31, domain: 'communication', scoring: 'agree', question: 'I know how to tell if someone listening to me is getting bored.' }, // disagree=trait
  { id: 33, domain: 'communication', scoring: 'agree', question: 'When I talk on the phone, I\'m not sure when it\'s my turn to speak.' },
  { id: 35, domain: 'communication', scoring: 'agree', question: 'I am often the last to understand the point of a joke.' },
  { id: 38, domain: 'communication', scoring: 'agree', question: 'I am good at social chit-chat.' }, // disagree=trait
  { id: 39, domain: 'communication', scoring: 'agree', question: 'People often tell me that I keep going on and on about the same thing.' },

  // ===== Imagination (10) =====
  { id: 3,  domain: 'imagination', scoring: 'agree', question: 'If I try to imagine something, I find it very easy to create a picture in my mind.' }, // disagree=trait
  { id: 8,  domain: 'imagination', scoring: 'agree', question: 'When I\'m reading a story, I can easily imagine what the characters might look like.' }, // disagree=trait
  { id: 14, domain: 'imagination', scoring: 'agree', question: 'I find making up stories easy.' }, // disagree=trait
  { id: 20, domain: 'imagination', scoring: 'agree', question: 'When I\'m reading a story, I find it difficult to work out the characters\' intentions.' },
  { id: 21, domain: 'imagination', scoring: 'agree', question: 'I don\'t particularly enjoy reading fiction.' },
  { id: 24, domain: 'imagination', scoring: 'agree', question: 'I would rather go to the theatre than to a museum.' }, // disagree=trait
  { id: 40, domain: 'imagination', scoring: 'agree', question: 'When I was young, I used to enjoy playing games involving pretending with other children.' }, // disagree=trait
  { id: 41, domain: 'imagination', scoring: 'agree', question: 'I like to collect information about categories of things.' },
  { id: 42, domain: 'imagination', scoring: 'agree', question: 'I find it difficult to imagine what it would be like to be someone else.' },
  { id: 50, domain: 'imagination', scoring: 'agree', question: 'I find it very easy to play games with children that involve pretending.' }, // disagree=trait
];

// Recompute the per-question scoring direction based on the official AQ key.
// The official AQ scoring key (Baron-Cohen et al. 2001):
const officialAgreeScoringIds = new Set<number>([
  2, 4, 5, 6, 7, 9, 12, 13, 16, 18, 19, 20, 21, 22, 23, 26, 33, 35, 39, 41, 42, 43, 45, 46,
]);
const officialDisagreeScoringIds = new Set<number>([
  1, 3, 8, 10, 11, 14, 15, 17, 24, 25, 27, 28, 29, 30, 31, 32, 34, 36, 37, 38, 40, 44, 47, 48, 49, 50,
]);

// Normalize the question scoring keys to the official AQ scoring.
aqQuestions.forEach((q) => {
  if (officialAgreeScoringIds.has(q.id)) q.scoring = 'agree';
  else if (officialDisagreeScoringIds.has(q.id)) q.scoring = 'disagree';
});

export interface AQResults {
  totalScore: number; // 0-50
  maxScore: number;
  domainScores: Record<AQDomain, { score: number; max: number; percent: number }>;
  likelihood: 'low' | 'moderate' | 'elevated' | 'high';
  cutoffMet: boolean; // 32+ per Baron-Cohen et al.
  screeningMet: boolean; // 26+ — typical research/screening threshold
  interpretation: string;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  disclaimer: string;
}

export const calculateAQResults = (answers: number[]): AQResults => {
  let totalScore = 0;
  const domainScores: Record<AQDomain, { score: number; max: number; percent: number }> = {
    'social-skill': { score: 0, max: 10, percent: 0 },
    'attention-switching': { score: 0, max: 10, percent: 0 },
    'attention-to-detail': { score: 0, max: 10, percent: 0 },
    communication: { score: 0, max: 10, percent: 0 },
    imagination: { score: 0, max: 10, percent: 0 },
  };

  aqQuestions.forEach((q, idx) => {
    const answer = answers[idx];
    if (answer === undefined || answer < 0) return;
    const agreed = isAgreeAnswer(answer);
    const scored = (q.scoring === 'agree' && agreed) || (q.scoring === 'disagree' && !agreed);
    if (scored) {
      totalScore += 1;
      domainScores[q.domain].score += 1;
    }
  });

  (Object.keys(domainScores) as AQDomain[]).forEach((d) => {
    domainScores[d].percent = Math.round((domainScores[d].score / domainScores[d].max) * 100);
  });

  const maxScore = 50;
  const cutoffMet = totalScore >= 32;
  const screeningMet = totalScore >= 26;

  let likelihood: AQResults['likelihood'];
  let interpretation: string;
  let recommendations: string[];

  if (totalScore >= 36) {
    likelihood = 'high';
    interpretation = `Your AQ-50 score of ${totalScore} is well above the clinical cutoff of 32 established by Baron-Cohen and colleagues. In the original validation study, 80% of adults diagnosed with autism scored 32 or higher, compared to only 2% of the general population. This strongly suggests clinically significant autistic traits worth professional evaluation.`;
    recommendations = [
      'Consider a formal assessment with a psychologist or psychiatrist experienced in adult autism',
      'A diagnostic evaluation typically includes ADOS-2, ADI-R, and a detailed developmental history',
      'Many autistic adults benefit from understanding their profile even without seeking formal diagnosis',
      'Connect with autistic-led communities (e.g., ASAN, autism subreddits) for lived-experience perspectives',
      'Workplace accommodations under disability legislation may be available if formally diagnosed',
    ];
  } else if (cutoffMet) {
    likelihood = 'elevated';
    interpretation = `Your AQ-50 score of ${totalScore} meets the clinical cutoff of 32 established by Baron-Cohen and colleagues. This indicates a substantial number of autistic traits — enough that professional evaluation would be appropriate if these traits affect your daily life.`;
    recommendations = [
      'Consider discussing your results with a mental health professional familiar with adult autism',
      'Reflect on which traits are sources of strength vs. friction in your daily life',
      'Many people with this profile identify as "autistic" without pursuing formal diagnosis',
      'Workplace and relational strategies tailored to autistic cognition may significantly improve quality of life',
    ];
  } else if (screeningMet) {
    likelihood = 'moderate';
    interpretation = `Your AQ-50 score of ${totalScore} is below the clinical cutoff (32) but above the broader screening threshold (26). You show a meaningful cluster of autistic traits — sometimes called the "broader autism phenotype" — without necessarily meeting diagnostic criteria.`;
    recommendations = [
      'Your profile suggests strong neurodivergent tendencies worth understanding even without diagnosis',
      'Consider whether specific traits (sensory sensitivity, routine preference, deep focus) shape your daily experience',
      'If these traits cause distress or impairment, a professional consultation can clarify next steps',
      'Many people in this range identify as neurodivergent and benefit from accommodations',
    ];
  } else {
    likelihood = 'low';
    interpretation = `Your AQ-50 score of ${totalScore} is below typical screening thresholds (26+). Your responses fall within the range most common in the general population. Some traits are present, but they don't cluster strongly enough to suggest the autism spectrum.`;
    recommendations = [
      'No clinical evaluation appears indicated based on these results',
      'Even neurotypical individuals show some traits on this spectrum — this is normal',
      'If you have specific concerns about social, sensory, or routine-related experiences, discuss them with a professional',
    ];
  }

  // Strengths/challenges from highest/lowest domain scores
  const sorted = (Object.entries(domainScores) as [AQDomain, { score: number; max: number; percent: number }][])
    .sort((a, b) => b[1].score - a[1].score);

  const strengthsMap: Record<AQDomain, string> = {
    'attention-to-detail': 'Exceptional pattern recognition and ability to spot details others miss',
    'attention-switching': 'Deep, sustained focus on topics of interest (hyperfocus)',
    imagination: 'Systematic, categorical thinking and information-collection',
    'social-skill': 'Comfort with solitary, structured, or analytic work',
    communication: 'Direct, literal, and precise communication style',
  };
  const challengesMap: Record<AQDomain, string> = {
    'social-skill': 'Reading social cues and navigating unstructured social settings',
    communication: 'Interpreting tone, sarcasm, and reading between the lines',
    'attention-switching': 'Flexibility when routines change or tasks switch unexpectedly',
    imagination: 'Imagining others\' perspectives or hypothetical scenarios on demand',
    'attention-to-detail': 'Stepping back from detail to see the bigger picture',
  };

  const top2 = sorted.slice(0, 2).map(([d]) => strengthsMap[d]);
  const bottom2 = sorted.slice(-2).map(([d]) => challengesMap[d]);

  return {
    totalScore,
    maxScore,
    domainScores,
    likelihood,
    cutoffMet,
    screeningMet,
    interpretation,
    strengths: top2,
    challenges: bottom2,
    recommendations,
    disclaimer:
      'FOR EDUCATIONAL AND ENTERTAINMENT PURPOSES ONLY. The AQ is a screening tool developed by Baron-Cohen et al. (2001) — it is NOT a diagnostic instrument. An autism diagnosis can only be made by a qualified clinician through comprehensive evaluation including developmental history, ADOS-2, and ADI-R. Your results should not be used for medical, employment, or legal decisions. If results resonate with your lived experience, consult a psychologist or psychiatrist experienced in adult autism assessment.',
  };
};
