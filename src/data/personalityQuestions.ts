// Big Five Personality Assessment (OCEAN Model)
// Based on IPIP-NEO framework

export type PersonalityTrait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';

export interface PersonalityQuestion {
  id: number;
  trait: PersonalityTrait;
  question: string;
  reversed: boolean; // If true, scoring is inverted
}

export const personalityTraitLabels: Record<PersonalityTrait, { label: string; high: string; low: string }> = {
  openness: { 
    label: 'Openness', 
    high: 'Creative, curious, open to new experiences',
    low: 'Practical, conventional, prefers routine'
  },
  conscientiousness: { 
    label: 'Conscientiousness', 
    high: 'Organized, disciplined, goal-oriented',
    low: 'Flexible, spontaneous, adaptable'
  },
  extraversion: { 
    label: 'Extraversion', 
    high: 'Outgoing, energetic, talkative',
    low: 'Reserved, reflective, prefers solitude'
  },
  agreeableness: { 
    label: 'Agreeableness', 
    high: 'Cooperative, trusting, helpful',
    low: 'Competitive, skeptical, challenging'
  },
  neuroticism: { 
    label: 'Emotional Stability', 
    high: 'Calm, secure, confident',
    low: 'Sensitive, emotionally reactive'
  },
};

// Likert scale options (same for all questions)
export const personalityOptions = [
  'Strongly Disagree',
  'Disagree', 
  'Neutral',
  'Agree',
  'Strongly Agree'
];

export const personalityQuestions: PersonalityQuestion[] = [
  // OPENNESS (4 questions)
  { id: 1, trait: 'openness', question: 'I have a vivid imagination.', reversed: false },
  { id: 2, trait: 'openness', question: 'I enjoy hearing new ideas and perspectives.', reversed: false },
  { id: 3, trait: 'openness', question: 'I prefer to stick with things I know rather than try new things.', reversed: true },
  { id: 4, trait: 'openness', question: 'I am curious about many different things.', reversed: false },

  // CONSCIENTIOUSNESS (4 questions)
  { id: 5, trait: 'conscientiousness', question: 'I am always prepared and plan ahead.', reversed: false },
  { id: 6, trait: 'conscientiousness', question: 'I pay attention to details in my work.', reversed: false },
  { id: 7, trait: 'conscientiousness', question: 'I often leave my belongings around.', reversed: true },
  { id: 8, trait: 'conscientiousness', question: 'I follow through on my commitments.', reversed: false },

  // EXTRAVERSION (4 questions)
  { id: 9, trait: 'extraversion', question: 'I feel comfortable around people I don\'t know.', reversed: false },
  { id: 10, trait: 'extraversion', question: 'I prefer to stay in the background at social events.', reversed: true },
  { id: 11, trait: 'extraversion', question: 'I enjoy being the center of attention.', reversed: false },
  { id: 12, trait: 'extraversion', question: 'I start conversations easily.', reversed: false },

  // AGREEABLENESS (4 questions)
  { id: 13, trait: 'agreeableness', question: 'I take time to help others.', reversed: false },
  { id: 14, trait: 'agreeableness', question: 'I believe most people have good intentions.', reversed: false },
  { id: 15, trait: 'agreeableness', question: 'I sometimes find it hard to understand others\' feelings.', reversed: true },
  { id: 16, trait: 'agreeableness', question: 'I try to avoid arguments and confrontation.', reversed: false },

  // NEUROTICISM (4 questions - note: we score as Emotional Stability, so high = stable)
  { id: 17, trait: 'neuroticism', question: 'I rarely feel anxious or stressed.', reversed: false },
  { id: 18, trait: 'neuroticism', question: 'I get upset easily.', reversed: true },
  { id: 19, trait: 'neuroticism', question: 'I stay calm under pressure.', reversed: false },
  { id: 20, trait: 'neuroticism', question: 'I often worry about things that might go wrong.', reversed: true },
];

export interface PersonalityResults {
  scores: Record<PersonalityTrait, number>; // 0-100 percentage
  dominantTrait: PersonalityTrait;
  personalityType: string;
  description: string;
}

export const calculatePersonalityResults = (answers: number[]): PersonalityResults => {
  const traitScores: Record<PersonalityTrait, { total: number; count: number }> = {
    openness: { total: 0, count: 0 },
    conscientiousness: { total: 0, count: 0 },
    extraversion: { total: 0, count: 0 },
    agreeableness: { total: 0, count: 0 },
    neuroticism: { total: 0, count: 0 },
  };

  personalityQuestions.forEach((q, index) => {
    const answer = answers[index];
    if (answer === undefined) return;
    
    // Convert 0-4 to 1-5, then apply reversal if needed
    let score = answer + 1;
    if (q.reversed) {
      score = 6 - score; // Reverse: 1->5, 2->4, 3->3, 4->2, 5->1
    }
    
    traitScores[q.trait].total += score;
    traitScores[q.trait].count++;
  });

  const scores: Record<PersonalityTrait, number> = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };

  // Convert to percentages (1-5 scale → 0-100)
  Object.keys(traitScores).forEach((trait) => {
    const t = trait as PersonalityTrait;
    if (traitScores[t].count > 0) {
      const avg = traitScores[t].total / traitScores[t].count;
      scores[t] = Math.round(((avg - 1) / 4) * 100);
    }
  });

  // Find dominant trait
  const dominantTrait = (Object.keys(scores) as PersonalityTrait[]).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );

  // Generate personality type
  const { personalityType, description } = getPersonalityType(scores);

  return { scores, dominantTrait, personalityType, description };
};

const getPersonalityType = (scores: Record<PersonalityTrait, number>): { personalityType: string; description: string } => {
  const high = (trait: PersonalityTrait) => scores[trait] >= 60;
  const low = (trait: PersonalityTrait) => scores[trait] < 40;

  // Archetypal personality types based on combinations
  if (high('openness') && high('extraversion') && high('agreeableness')) {
    return {
      personalityType: 'The Visionary Leader',
      description: 'You combine creativity with social charisma and genuine care for others. Natural at inspiring teams, you excel in roles requiring innovation and people management.'
    };
  }
  
  if (high('conscientiousness') && high('neuroticism') && low('extraversion')) {
    return {
      personalityType: 'The Strategic Architect',
      description: 'Methodical and emotionally steady, you thrive in roles requiring deep focus and systematic problem-solving. Your calm under pressure makes you invaluable in high-stakes situations.'
    };
  }

  if (high('openness') && high('conscientiousness')) {
    return {
      personalityType: 'The Creative Executive',
      description: 'You blend imagination with discipline—a rare combination that allows you to not just dream big but execute flawlessly. Ideal for leadership roles in innovation-driven fields.'
    };
  }

  if (high('extraversion') && high('agreeableness')) {
    return {
      personalityType: 'The Relationship Builder',
      description: 'Your natural warmth and social energy make you exceptional at building networks and fostering collaboration. You thrive in team environments and client-facing roles.'
    };
  }

  if (high('conscientiousness') && high('neuroticism')) {
    return {
      personalityType: 'The Reliable Performer',
      description: 'Dependable and emotionally grounded, you consistently deliver results. Your stability and work ethic make you a cornerstone of any team.'
    };
  }

  if (high('openness') && low('conscientiousness')) {
    return {
      personalityType: 'The Free Spirit',
      description: 'Creative and spontaneous, you see possibilities others miss. Best suited for roles that value innovation over rigid structure.'
    };
  }

  if (low('extraversion') && high('openness')) {
    return {
      personalityType: 'The Deep Thinker',
      description: 'Introspective and imaginative, you process ideas deeply. You excel in analytical and creative roles that don\'t require constant social interaction.'
    };
  }

  // Default balanced type
  return {
    personalityType: 'The Adaptive Professional',
    description: 'Your balanced personality profile gives you versatility across situations. You can adjust your approach based on context, making you effective in diverse roles.'
  };
};
