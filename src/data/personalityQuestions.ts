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

// 50 Questions based on validated IPIP-NEO framework (10 per trait)
export const personalityQuestions: PersonalityQuestion[] = [
  // OPENNESS TO EXPERIENCE (10 questions)
  // Facets: Fantasy, Aesthetics, Feelings, Actions, Ideas, Values
  { id: 1, trait: 'openness', question: 'I have a vivid imagination.', reversed: false },
  { id: 2, trait: 'openness', question: 'I enjoy hearing new ideas and perspectives.', reversed: false },
  { id: 3, trait: 'openness', question: 'I prefer to stick with things I know rather than try new things.', reversed: true },
  { id: 4, trait: 'openness', question: 'I am curious about many different things.', reversed: false },
  { id: 5, trait: 'openness', question: 'I believe in the importance of art.', reversed: false },
  { id: 6, trait: 'openness', question: 'I tend to vote for conservative political candidates.', reversed: true },
  { id: 7, trait: 'openness', question: 'I enjoy thinking about abstract concepts and theories.', reversed: false },
  { id: 8, trait: 'openness', question: 'I have difficulty understanding abstract ideas.', reversed: true },
  { id: 9, trait: 'openness', question: 'I like to visit new places and experience different cultures.', reversed: false },
  { id: 10, trait: 'openness', question: 'I avoid philosophical discussions.', reversed: true },

  // CONSCIENTIOUSNESS (10 questions)
  // Facets: Competence, Order, Dutifulness, Achievement-Striving, Self-Discipline, Deliberation
  { id: 11, trait: 'conscientiousness', question: 'I am always prepared and plan ahead.', reversed: false },
  { id: 12, trait: 'conscientiousness', question: 'I pay attention to details in my work.', reversed: false },
  { id: 13, trait: 'conscientiousness', question: 'I often leave my belongings around.', reversed: true },
  { id: 14, trait: 'conscientiousness', question: 'I follow through on my commitments.', reversed: false },
  { id: 15, trait: 'conscientiousness', question: 'I make plans and stick to them.', reversed: false },
  { id: 16, trait: 'conscientiousness', question: 'I waste my time on unimportant things.', reversed: true },
  { id: 17, trait: 'conscientiousness', question: 'I complete tasks successfully.', reversed: false },
  { id: 18, trait: 'conscientiousness', question: 'I have difficulty starting tasks.', reversed: true },
  { id: 19, trait: 'conscientiousness', question: 'I like order and follow a schedule.', reversed: false },
  { id: 20, trait: 'conscientiousness', question: 'I often forget to put things back in their proper place.', reversed: true },

  // EXTRAVERSION (10 questions)
  // Facets: Warmth, Gregariousness, Assertiveness, Activity, Excitement-Seeking, Positive Emotions
  { id: 21, trait: 'extraversion', question: 'I feel comfortable around people I don\'t know.', reversed: false },
  { id: 22, trait: 'extraversion', question: 'I prefer to stay in the background at social events.', reversed: true },
  { id: 23, trait: 'extraversion', question: 'I enjoy being the center of attention.', reversed: false },
  { id: 24, trait: 'extraversion', question: 'I start conversations easily.', reversed: false },
  { id: 25, trait: 'extraversion', question: 'I talk to a lot of different people at parties.', reversed: false },
  { id: 26, trait: 'extraversion', question: 'I don\'t like to draw attention to myself.', reversed: true },
  { id: 27, trait: 'extraversion', question: 'I am skilled in handling social situations.', reversed: false },
  { id: 28, trait: 'extraversion', question: 'I prefer to be alone rather than with others.', reversed: true },
  { id: 29, trait: 'extraversion', question: 'I feel energized when I\'m around other people.', reversed: false },
  { id: 30, trait: 'extraversion', question: 'I find it difficult to approach others.', reversed: true },

  // AGREEABLENESS (10 questions)
  // Facets: Trust, Straightforwardness, Altruism, Compliance, Modesty, Tender-Mindedness
  { id: 31, trait: 'agreeableness', question: 'I take time to help others.', reversed: false },
  { id: 32, trait: 'agreeableness', question: 'I believe most people have good intentions.', reversed: false },
  { id: 33, trait: 'agreeableness', question: 'I sometimes find it hard to understand others\' feelings.', reversed: true },
  { id: 34, trait: 'agreeableness', question: 'I try to avoid arguments and confrontation.', reversed: false },
  { id: 35, trait: 'agreeableness', question: 'I am interested in other people\'s problems.', reversed: false },
  { id: 36, trait: 'agreeableness', question: 'I am not really interested in others.', reversed: true },
  { id: 37, trait: 'agreeableness', question: 'I feel others\' emotions and try to help.', reversed: false },
  { id: 38, trait: 'agreeableness', question: 'I tend to be critical of others.', reversed: true },
  { id: 39, trait: 'agreeableness', question: 'I make people feel at ease.', reversed: false },
  { id: 40, trait: 'agreeableness', question: 'I suspect hidden motives in others.', reversed: true },

  // NEUROTICISM / EMOTIONAL STABILITY (10 questions)
  // Facets: Anxiety, Angry Hostility, Depression, Self-Consciousness, Impulsiveness, Vulnerability
  // Note: We score as Emotional Stability, so high = stable (reversed items become positive)
  { id: 41, trait: 'neuroticism', question: 'I rarely feel anxious or stressed.', reversed: false },
  { id: 42, trait: 'neuroticism', question: 'I get upset easily.', reversed: true },
  { id: 43, trait: 'neuroticism', question: 'I stay calm under pressure.', reversed: false },
  { id: 44, trait: 'neuroticism', question: 'I often worry about things that might go wrong.', reversed: true },
  { id: 45, trait: 'neuroticism', question: 'I am relaxed most of the time.', reversed: false },
  { id: 46, trait: 'neuroticism', question: 'I get irritated easily.', reversed: true },
  { id: 47, trait: 'neuroticism', question: 'I seldom feel blue or depressed.', reversed: false },
  { id: 48, trait: 'neuroticism', question: 'I often feel overwhelmed by my emotions.', reversed: true },
  { id: 49, trait: 'neuroticism', question: 'I handle stress well.', reversed: false },
  { id: 50, trait: 'neuroticism', question: 'I am easily disturbed by unexpected events.', reversed: true },
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
