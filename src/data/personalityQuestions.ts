// Big Five Personality Assessment (OCEAN Model)
// Based on IPIP-NEO framework with extended facet-level analysis

export type PersonalityTrait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';

export type PersonalityFacet = 
  // Openness facets
  | 'fantasy' | 'aesthetics' | 'feelings' | 'actions' | 'ideas' | 'values'
  // Conscientiousness facets
  | 'competence' | 'order' | 'dutifulness' | 'achievement' | 'self_discipline' | 'deliberation'
  // Extraversion facets
  | 'warmth' | 'gregariousness' | 'assertiveness' | 'activity' | 'excitement' | 'positive_emotions'
  // Agreeableness facets
  | 'trust' | 'straightforwardness' | 'altruism' | 'compliance' | 'modesty' | 'tender_mindedness'
  // Neuroticism facets
  | 'anxiety' | 'hostility' | 'depression' | 'self_consciousness' | 'impulsiveness' | 'vulnerability';

export interface PersonalityQuestion {
  id: number;
  trait: PersonalityTrait;
  facet: PersonalityFacet;
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

export const facetLabels: Record<PersonalityFacet, { label: string; trait: PersonalityTrait; description: string }> = {
  // Openness facets
  fantasy: { label: 'Fantasy', trait: 'openness', description: 'Vivid imagination and rich fantasy life' },
  aesthetics: { label: 'Aesthetics', trait: 'openness', description: 'Appreciation for art and beauty' },
  feelings: { label: 'Feelings', trait: 'openness', description: 'Receptivity to inner emotional states' },
  actions: { label: 'Actions', trait: 'openness', description: 'Willingness to try new activities' },
  ideas: { label: 'Ideas', trait: 'openness', description: 'Intellectual curiosity and open-mindedness' },
  values: { label: 'Values', trait: 'openness', description: 'Readiness to re-examine social and political values' },
  // Conscientiousness facets
  competence: { label: 'Competence', trait: 'conscientiousness', description: 'Belief in one\'s own capability' },
  order: { label: 'Order', trait: 'conscientiousness', description: 'Need for structure and organization' },
  dutifulness: { label: 'Dutifulness', trait: 'conscientiousness', description: 'Adherence to ethical principles' },
  achievement: { label: 'Achievement-Striving', trait: 'conscientiousness', description: 'Drive for accomplishment' },
  self_discipline: { label: 'Self-Discipline', trait: 'conscientiousness', description: 'Ability to persist despite obstacles' },
  deliberation: { label: 'Deliberation', trait: 'conscientiousness', description: 'Tendency to think before acting' },
  // Extraversion facets
  warmth: { label: 'Warmth', trait: 'extraversion', description: 'Affectionate and friendly manner' },
  gregariousness: { label: 'Gregariousness', trait: 'extraversion', description: 'Preference for social company' },
  assertiveness: { label: 'Assertiveness', trait: 'extraversion', description: 'Social dominance and forcefulness' },
  activity: { label: 'Activity', trait: 'extraversion', description: 'Pace and vigor of life' },
  excitement: { label: 'Excitement-Seeking', trait: 'extraversion', description: 'Need for stimulation and thrill' },
  positive_emotions: { label: 'Positive Emotions', trait: 'extraversion', description: 'Tendency to experience joy and optimism' },
  // Agreeableness facets
  trust: { label: 'Trust', trait: 'agreeableness', description: 'Belief in the honesty of others' },
  straightforwardness: { label: 'Straightforwardness', trait: 'agreeableness', description: 'Frankness and sincerity' },
  altruism: { label: 'Altruism', trait: 'agreeableness', description: 'Active concern for others\' welfare' },
  compliance: { label: 'Compliance', trait: 'agreeableness', description: 'Deference to others in conflict' },
  modesty: { label: 'Modesty', trait: 'agreeableness', description: 'Humility and self-effacement' },
  tender_mindedness: { label: 'Tender-Mindedness', trait: 'agreeableness', description: 'Sympathy and concern for others' },
  // Neuroticism facets (scored as Emotional Stability - high = stable)
  anxiety: { label: 'Anxiety', trait: 'neuroticism', description: 'Level of free-floating anxiety' },
  hostility: { label: 'Hostility', trait: 'neuroticism', description: 'Tendency to experience anger' },
  depression: { label: 'Depression', trait: 'neuroticism', description: 'Tendency to experience depressive affect' },
  self_consciousness: { label: 'Self-Consciousness', trait: 'neuroticism', description: 'Sensitivity to social evaluation' },
  impulsiveness: { label: 'Impulsiveness', trait: 'neuroticism', description: 'Inability to control cravings' },
  vulnerability: { label: 'Vulnerability', trait: 'neuroticism', description: 'Susceptibility to stress' },
};

// Likert scale options (same for all questions)
export const personalityOptions = [
  'Strongly Disagree',
  'Disagree', 
  'Neutral',
  'Agree',
  'Strongly Agree'
];

// 50 Questions based on validated IPIP-NEO framework with facet-level granularity
export const personalityQuestions: PersonalityQuestion[] = [
  // OPENNESS TO EXPERIENCE (10 questions - covering all 6 facets)
  { id: 1, trait: 'openness', facet: 'fantasy', question: 'I have a vivid imagination and often daydream about possibilities.', reversed: false },
  { id: 2, trait: 'openness', facet: 'aesthetics', question: 'I am deeply moved by art, music, or poetry.', reversed: false },
  { id: 3, trait: 'openness', facet: 'feelings', question: 'I experience my emotions intensely and pay attention to them.', reversed: false },
  { id: 4, trait: 'openness', facet: 'actions', question: 'I prefer to stick with things I know rather than try new things.', reversed: true },
  { id: 5, trait: 'openness', facet: 'ideas', question: 'I am curious about many different things and love learning.', reversed: false },
  { id: 6, trait: 'openness', facet: 'values', question: 'I believe there are many valid ways to look at important issues.', reversed: false },
  { id: 7, trait: 'openness', facet: 'fantasy', question: 'I rarely engage in imaginative or hypothetical thinking.', reversed: true },
  { id: 8, trait: 'openness', facet: 'ideas', question: 'I enjoy thinking about abstract concepts and theoretical problems.', reversed: false },
  { id: 9, trait: 'openness', facet: 'actions', question: 'I like to visit new places and experience different cultures.', reversed: false },
  { id: 10, trait: 'openness', facet: 'values', question: 'I avoid philosophical discussions about life and meaning.', reversed: true },

  // CONSCIENTIOUSNESS (10 questions - covering all 6 facets)
  { id: 11, trait: 'conscientiousness', facet: 'competence', question: 'I am confident in my ability to handle challenges effectively.', reversed: false },
  { id: 12, trait: 'conscientiousness', facet: 'order', question: 'I keep my belongings organized and in their proper place.', reversed: false },
  { id: 13, trait: 'conscientiousness', facet: 'dutifulness', question: 'I follow through on my commitments even when it\'s inconvenient.', reversed: false },
  { id: 14, trait: 'conscientiousness', facet: 'achievement', question: 'I set ambitious goals and work hard to achieve them.', reversed: false },
  { id: 15, trait: 'conscientiousness', facet: 'self_discipline', question: 'I have difficulty starting tasks and often procrastinate.', reversed: true },
  { id: 16, trait: 'conscientiousness', facet: 'deliberation', question: 'I carefully consider the consequences before making decisions.', reversed: false },
  { id: 17, trait: 'conscientiousness', facet: 'order', question: 'I often leave my belongings around without putting them away.', reversed: true },
  { id: 18, trait: 'conscientiousness', facet: 'achievement', question: 'I strive for excellence in everything I do.', reversed: false },
  { id: 19, trait: 'conscientiousness', facet: 'self_discipline', question: 'I persist with tasks even when they become difficult or tedious.', reversed: false },
  { id: 20, trait: 'conscientiousness', facet: 'deliberation', question: 'I often act impulsively without thinking things through.', reversed: true },

  // EXTRAVERSION (10 questions - covering all 6 facets)
  { id: 21, trait: 'extraversion', facet: 'warmth', question: 'I make friends easily and enjoy close relationships.', reversed: false },
  { id: 22, trait: 'extraversion', facet: 'gregariousness', question: 'I prefer to spend time alone rather than with groups.', reversed: true },
  { id: 23, trait: 'extraversion', facet: 'assertiveness', question: 'I naturally take charge in group situations.', reversed: false },
  { id: 24, trait: 'extraversion', facet: 'activity', question: 'I lead a fast-paced, busy life with many activities.', reversed: false },
  { id: 25, trait: 'extraversion', facet: 'excitement', question: 'I seek out thrilling experiences and adventures.', reversed: false },
  { id: 26, trait: 'extraversion', facet: 'positive_emotions', question: 'I often feel joyful and enthusiastic about life.', reversed: false },
  { id: 27, trait: 'extraversion', facet: 'warmth', question: 'I find it difficult to approach and connect with new people.', reversed: true },
  { id: 28, trait: 'extraversion', facet: 'gregariousness', question: 'I enjoy being in crowds and at large social gatherings.', reversed: false },
  { id: 29, trait: 'extraversion', facet: 'assertiveness', question: 'I tend to hold back and let others lead conversations.', reversed: true },
  { id: 30, trait: 'extraversion', facet: 'positive_emotions', question: 'I rarely experience strong feelings of happiness or excitement.', reversed: true },

  // AGREEABLENESS (10 questions - covering all 6 facets)
  { id: 31, trait: 'agreeableness', facet: 'trust', question: 'I believe most people have good intentions and can be trusted.', reversed: false },
  { id: 32, trait: 'agreeableness', facet: 'straightforwardness', question: 'I am direct and honest, even when it might be uncomfortable.', reversed: false },
  { id: 33, trait: 'agreeableness', facet: 'altruism', question: 'I go out of my way to help others even when there\'s no benefit to me.', reversed: false },
  { id: 34, trait: 'agreeableness', facet: 'compliance', question: 'I avoid confrontation and prefer to keep the peace.', reversed: false },
  { id: 35, trait: 'agreeableness', facet: 'modesty', question: 'I prefer to downplay my achievements rather than boast.', reversed: false },
  { id: 36, trait: 'agreeableness', facet: 'tender_mindedness', question: 'I am deeply moved by others\' suffering and feel compelled to help.', reversed: false },
  { id: 37, trait: 'agreeableness', facet: 'trust', question: 'I am suspicious of others\' motives and intentions.', reversed: true },
  { id: 38, trait: 'agreeableness', facet: 'altruism', question: 'I am not particularly interested in other people\'s problems.', reversed: true },
  { id: 39, trait: 'agreeableness', facet: 'compliance', question: 'I don\'t mind engaging in conflict to get my point across.', reversed: true },
  { id: 40, trait: 'agreeableness', facet: 'tender_mindedness', question: 'I prioritize logic over feelings when making decisions about others.', reversed: true },

  // NEUROTICISM / EMOTIONAL STABILITY (10 questions - covering all 6 facets)
  // Note: We score as Emotional Stability, so high = stable
  { id: 41, trait: 'neuroticism', facet: 'anxiety', question: 'I rarely feel anxious or worried about things.', reversed: false },
  { id: 42, trait: 'neuroticism', facet: 'hostility', question: 'I get irritated easily and often feel angry.', reversed: true },
  { id: 43, trait: 'neuroticism', facet: 'depression', question: 'I generally feel content and rarely experience sadness.', reversed: false },
  { id: 44, trait: 'neuroticism', facet: 'self_consciousness', question: 'I worry a lot about what others think of me.', reversed: true },
  { id: 45, trait: 'neuroticism', facet: 'impulsiveness', question: 'I have strong control over my urges and cravings.', reversed: false },
  { id: 46, trait: 'neuroticism', facet: 'vulnerability', question: 'I stay calm and composed under pressure.', reversed: false },
  { id: 47, trait: 'neuroticism', facet: 'anxiety', question: 'I often worry about things that might go wrong.', reversed: true },
  { id: 48, trait: 'neuroticism', facet: 'depression', question: 'I frequently feel blue or down without clear reason.', reversed: true },
  { id: 49, trait: 'neuroticism', facet: 'impulsiveness', question: 'I often give in to temptations that I later regret.', reversed: true },
  { id: 50, trait: 'neuroticism', facet: 'vulnerability', question: 'I feel overwhelmed when facing stressful situations.', reversed: true },
];

export interface FacetScore {
  facet: PersonalityFacet;
  score: number;
  label: string;
  description: string;
}

export interface TraitInsight {
  trait: PersonalityTrait;
  score: number;
  interpretation: string;
  strengths: string[];
  challenges: string[];
  facets: FacetScore[];
}

export interface PersonalityResults {
  scores: Record<PersonalityTrait, number>; // 0-100 percentage
  facetScores: Record<PersonalityFacet, number>; // 0-100 percentage
  dominantTrait: PersonalityTrait;
  personalityType: string;
  description: string;
  archetype: PersonalityArchetype;
  traitInsights: TraitInsight[];
  careerFit: string[];
  communicationStyle: string;
  leadershipStyle: string;
  stressResponse: string;
}

export interface PersonalityArchetype {
  name: string;
  tagline: string;
  description: string;
  famousExamples: string[];
  rarity: string;
  strengths: string[];
  blindSpots: string[];
}

export const calculatePersonalityResults = (answers: number[]): PersonalityResults => {
  const traitScores: Record<PersonalityTrait, { total: number; count: number }> = {
    openness: { total: 0, count: 0 },
    conscientiousness: { total: 0, count: 0 },
    extraversion: { total: 0, count: 0 },
    agreeableness: { total: 0, count: 0 },
    neuroticism: { total: 0, count: 0 },
  };

  const facetScoresRaw: Partial<Record<PersonalityFacet, { total: number; count: number }>> = {};

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

    // Track facet scores
    if (!facetScoresRaw[q.facet]) {
      facetScoresRaw[q.facet] = { total: 0, count: 0 };
    }
    facetScoresRaw[q.facet]!.total += score;
    facetScoresRaw[q.facet]!.count++;
  });

  const scores: Record<PersonalityTrait, number> = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  };

  const facetScores: Record<PersonalityFacet, number> = {} as Record<PersonalityFacet, number>;

  // Convert trait scores to percentages (1-5 scale → 0-100)
  Object.keys(traitScores).forEach((trait) => {
    const t = trait as PersonalityTrait;
    if (traitScores[t].count > 0) {
      const avg = traitScores[t].total / traitScores[t].count;
      scores[t] = Math.round(((avg - 1) / 4) * 100);
    }
  });

  // Convert facet scores to percentages
  Object.keys(facetScoresRaw).forEach((facet) => {
    const f = facet as PersonalityFacet;
    const data = facetScoresRaw[f];
    if (data && data.count > 0) {
      const avg = data.total / data.count;
      facetScores[f] = Math.round(((avg - 1) / 4) * 100);
    }
  });

  // Find dominant trait
  const dominantTrait = (Object.keys(scores) as PersonalityTrait[]).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );

  // Generate personality type and archetype
  const { personalityType, description, archetype } = getPersonalityType(scores, facetScores);

  // Generate trait insights
  const traitInsights = generateTraitInsights(scores, facetScores);

  // Generate career fit
  const careerFit = generateCareerFit(scores);

  // Generate communication style
  const communicationStyle = getCommunicationStyle(scores);

  // Generate leadership style
  const leadershipStyle = getLeadershipStyle(scores);

  // Generate stress response
  const stressResponse = getStressResponse(scores);

  return { 
    scores, 
    facetScores, 
    dominantTrait, 
    personalityType, 
    description, 
    archetype,
    traitInsights,
    careerFit,
    communicationStyle,
    leadershipStyle,
    stressResponse,
  };
};

const generateTraitInsights = (
  scores: Record<PersonalityTrait, number>,
  facetScores: Record<PersonalityFacet, number>
): TraitInsight[] => {
  const insights: TraitInsight[] = [];
  const traits: PersonalityTrait[] = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

  const traitInterpretations: Record<PersonalityTrait, { high: string; mid: string; low: string }> = {
    openness: {
      high: 'You have an exceptionally creative and imaginative mind. You\'re drawn to novelty, appreciate complexity, and actively seek out new experiences and ideas.',
      mid: 'You balance creativity with practicality. You appreciate new experiences but also value proven approaches.',
      low: 'You prefer practical, concrete approaches over abstract thinking. You find comfort in routine and proven methods.',
    },
    conscientiousness: {
      high: 'You\'re highly disciplined and goal-oriented. Your strong work ethic and attention to detail make you exceptionally reliable and effective.',
      mid: 'You balance structure with flexibility. You can focus when needed but also adapt to changing circumstances.',
      low: 'You prefer spontaneity over rigid structure. You\'re adaptable and comfortable with ambiguity.',
    },
    extraversion: {
      high: 'You thrive in social settings and draw energy from interactions. Your outgoing nature makes you a natural connector and communicator.',
      mid: 'You\'re socially versatile—comfortable in groups but also appreciating solitude. You can adapt your energy to the situation.',
      low: 'You prefer deeper one-on-one connections over large social gatherings. You recharge through solitude and reflection.',
    },
    agreeableness: {
      high: 'You\'re naturally empathetic and cooperative. Your warmth and trust in others creates harmony in your relationships.',
      mid: 'You balance cooperation with healthy skepticism. You can be both supportive and appropriately assertive.',
      low: 'You prioritize directness and independence. You\'re comfortable challenging ideas and standing your ground.',
    },
    neuroticism: {
      high: 'You maintain exceptional emotional equilibrium. Stress rarely disrupts your composure, giving you resilience in challenging situations.',
      mid: 'You experience a normal range of emotions. You can feel stress but generally manage it effectively.',
      low: 'You experience emotions intensely and may be more reactive to stress. This sensitivity can also make you highly empathetic.',
    },
  };

  const traitStrengths: Record<PersonalityTrait, { high: string[]; low: string[] }> = {
    openness: {
      high: ['Creative problem-solving', 'Adaptability to change', 'Intellectual curiosity', 'Appreciation for diversity'],
      low: ['Practical focus', 'Consistency', 'Efficient execution', 'Reliability'],
    },
    conscientiousness: {
      high: ['Strong work ethic', 'Reliability', 'Attention to detail', 'Long-term planning'],
      low: ['Flexibility', 'Spontaneity', 'Adaptability', 'Comfort with ambiguity'],
    },
    extraversion: {
      high: ['Networking ability', 'Persuasion skills', 'Team energy', 'Communication'],
      low: ['Deep focus', 'Independent work', 'Listening skills', 'Thoughtful analysis'],
    },
    agreeableness: {
      high: ['Team collaboration', 'Conflict resolution', 'Emotional support', 'Building trust'],
      low: ['Negotiation', 'Objective decision-making', 'Constructive criticism', 'Boundary setting'],
    },
    neuroticism: {
      high: ['Emotional stability', 'Stress resilience', 'Calm leadership', 'Crisis management'],
      low: ['Emotional awareness', 'Empathy depth', 'Vigilance', 'Motivation through urgency'],
    },
  };

  const traitChallenges: Record<PersonalityTrait, { high: string[]; low: string[] }> = {
    openness: {
      high: ['May overlook practical details', 'Can be seen as impractical', 'Difficulty with routine tasks'],
      low: ['May resist beneficial changes', 'Can miss creative solutions', 'May appear closed-minded'],
    },
    conscientiousness: {
      high: ['Perfectionism', 'Difficulty delegating', 'May be inflexible'],
      low: ['May miss deadlines', 'Disorganization', 'Difficulty with long-term projects'],
    },
    extraversion: {
      high: ['May dominate conversations', 'Difficulty with solitary work', 'Can be seen as attention-seeking'],
      low: ['May miss networking opportunities', 'Can seem aloof', 'Difficulty in group settings'],
    },
    agreeableness: {
      high: ['Difficulty saying no', 'May avoid necessary conflict', 'Can be taken advantage of'],
      low: ['May seem uncaring', 'Difficulty building rapport', 'Can create unnecessary conflict'],
    },
    neuroticism: {
      high: ['May miss warning signs', 'Can seem detached', 'May underestimate risks'],
      low: ['Emotional volatility', 'Stress vulnerability', 'Difficulty recovering from setbacks'],
    },
  };

  traits.forEach((trait) => {
    const score = scores[trait];
    const isHigh = score >= 60;
    const isMid = score >= 40 && score < 60;

    let interpretation: string;
    if (isHigh) interpretation = traitInterpretations[trait].high;
    else if (isMid) interpretation = traitInterpretations[trait].mid;
    else interpretation = traitInterpretations[trait].low;

    const strengths = isHigh ? traitStrengths[trait].high : traitStrengths[trait].low;
    const challenges = isHigh ? traitChallenges[trait].high : traitChallenges[trait].low;

    // Get facets for this trait
    const traitFacets = Object.entries(facetLabels)
      .filter(([_, data]) => data.trait === trait)
      .map(([facet, data]) => ({
        facet: facet as PersonalityFacet,
        score: facetScores[facet as PersonalityFacet] || 50,
        label: data.label,
        description: data.description,
      }));

    insights.push({
      trait,
      score,
      interpretation,
      strengths,
      challenges,
      facets: traitFacets,
    });
  });

  return insights;
};

const generateCareerFit = (scores: Record<PersonalityTrait, number>): string[] => {
  const careers: string[] = [];
  const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = scores;

  // High Openness + High Conscientiousness = Innovation Leadership
  if (openness >= 60 && conscientiousness >= 60) {
    careers.push('Product Strategy', 'Innovation Director', 'R&D Leadership');
  }

  // High Extraversion + High Agreeableness = People-Centric Roles
  if (extraversion >= 60 && agreeableness >= 60) {
    careers.push('Executive Coaching', 'HR Leadership', 'Customer Success');
  }

  // High Conscientiousness + High Neuroticism (Stability) = Operations
  if (conscientiousness >= 60 && neuroticism >= 60) {
    careers.push('Operations Executive', 'Risk Management', 'Quality Assurance');
  }

  // High Openness + Low Conscientiousness = Creative Roles
  if (openness >= 60 && conscientiousness < 40) {
    careers.push('Creative Director', 'Startup Founder', 'Artistic Direction');
  }

  // High Extraversion + High Openness = Visionary Leadership
  if (extraversion >= 60 && openness >= 60) {
    careers.push('Venture Capital', 'Public Speaking', 'Brand Strategy');
  }

  // Low Extraversion + High Conscientiousness = Specialized Expertise
  if (extraversion < 40 && conscientiousness >= 60) {
    careers.push('Technical Architecture', 'Research Scientist', 'Financial Analysis');
  }

  // Low Agreeableness + High Conscientiousness = Strategic Roles
  if (agreeableness < 40 && conscientiousness >= 60) {
    careers.push('Corporate Strategy', 'Turnaround Management', 'Investment Banking');
  }

  // Default balanced profile
  if (careers.length === 0) {
    careers.push('General Management', 'Business Development', 'Consulting');
  }

  return careers.slice(0, 4); // Return top 4 careers
};

const getCommunicationStyle = (scores: Record<PersonalityTrait, number>): string => {
  const { openness, extraversion, agreeableness } = scores;

  if (extraversion >= 60 && agreeableness >= 60) {
    return 'Enthusiastic Collaborator: You communicate with warmth and energy, naturally building rapport and encouraging participation. Best in team settings and client-facing roles.';
  }
  if (extraversion >= 60 && agreeableness < 40) {
    return 'Direct Influencer: You communicate with confidence and assertiveness. You excel at persuasion and aren\'t afraid to challenge ideas. Best in negotiations and leadership.';
  }
  if (extraversion < 40 && agreeableness >= 60) {
    return 'Thoughtful Supporter: You communicate with care and depth, listening actively and responding with empathy. Best in counseling, mentoring, and one-on-one settings.';
  }
  if (extraversion < 40 && openness >= 60) {
    return 'Strategic Analyst: You communicate with precision and insight, preferring written or structured formats. Best in research, technical, and advisory roles.';
  }

  return 'Adaptive Communicator: You adjust your style based on context, balancing directness with diplomacy. Effective across diverse settings.';
};

const getLeadershipStyle = (scores: Record<PersonalityTrait, number>): string => {
  const { conscientiousness, extraversion, agreeableness, neuroticism } = scores;

  if (extraversion >= 60 && conscientiousness >= 60) {
    return 'Transformational Leader: You inspire through vision and example, setting high standards while energizing your team. You drive change through charisma and discipline.';
  }
  if (agreeableness >= 60 && neuroticism >= 60) {
    return 'Servant Leader: You lead by supporting and developing others. Your calm, caring approach creates psychological safety and long-term loyalty.';
  }
  if (conscientiousness >= 60 && agreeableness < 40) {
    return 'Results-Driven Leader: You focus on objectives and hold people accountable. Your directness cuts through ambiguity and drives execution.';
  }
  if (extraversion < 40 && conscientiousness >= 60) {
    return 'Technical Leader: You lead through expertise and quiet competence. You prefer to empower through knowledge rather than personal magnetism.';
  }

  return 'Situational Leader: You adapt your approach based on team needs and context. This flexibility allows you to be effective across diverse situations.';
};

const getStressResponse = (scores: Record<PersonalityTrait, number>): string => {
  const { neuroticism, conscientiousness, extraversion } = scores;

  if (neuroticism >= 60) {
    if (extraversion >= 60) {
      return 'Under stress, you maintain composure and may seek social support. You process stress through connection and activity, rarely letting anxiety show externally.';
    }
    return 'Under stress, you remain remarkably stable. You may process challenges internally and maintain productivity even in crisis, though you should ensure you\'re not suppressing emotions.';
  }
  if (neuroticism < 40) {
    if (conscientiousness >= 60) {
      return 'Under stress, you may become more controlling or perfectionistic. Building in flexibility and self-compassion can help you navigate challenging periods.';
    }
    return 'Under stress, you may feel overwhelmed more quickly than others. Building stress management routines and support systems is especially important for you.';
  }

  return 'Under stress, you experience a moderate response that you can generally manage. You have both the sensitivity to recognize when you need support and the resources to seek it.';
};

const getPersonalityType = (
  scores: Record<PersonalityTrait, number>,
  facetScores: Record<PersonalityFacet, number>
): { personalityType: string; description: string; archetype: PersonalityArchetype } => {
  const high = (trait: PersonalityTrait) => scores[trait] >= 60;
  const low = (trait: PersonalityTrait) => scores[trait] < 40;
  const veryHigh = (trait: PersonalityTrait) => scores[trait] >= 75;
  const veryLow = (trait: PersonalityTrait) => scores[trait] < 25;

  // Enhanced archetypal personality types based on combinations
  if (veryHigh('openness') && veryHigh('extraversion')) {
    return {
      personalityType: 'The Visionary Catalyst',
      description: 'You combine exceptional creativity with magnetic charisma. You don\'t just have ideas—you evangelize them, rally others around them, and make them contagious.',
      archetype: {
        name: 'The Visionary Catalyst',
        tagline: 'Igniting movements through ideas',
        description: 'Your rare combination of creative vision and social influence positions you to lead paradigm shifts. You see what others can\'t and have the charisma to make them see it too.',
        famousExamples: ['Steve Jobs', 'Oprah Winfrey', 'Richard Branson'],
        rarity: 'Top 3% of population',
        strengths: ['Inspirational communication', 'Pattern recognition across domains', 'Building movements', 'Attracting talent'],
        blindSpots: ['Impatience with details', 'May overlook operational realities', 'Can pursue too many ideas at once'],
      },
    };
  }
  
  if (veryHigh('conscientiousness') && high('neuroticism') && low('extraversion')) {
    return {
      personalityType: 'The Strategic Mastermind',
      description: 'You combine deep analytical ability with emotional steadiness and disciplined execution. You see systems others miss and build plans that actually work.',
      archetype: {
        name: 'The Strategic Mastermind',
        tagline: 'Engineering success through systems thinking',
        description: 'Your methodical approach to complex problems, combined with unshakeable composure, makes you invaluable in high-stakes strategic roles.',
        famousExamples: ['Warren Buffett', 'Angela Merkel', 'Bill Gates'],
        rarity: 'Top 5% of population',
        strengths: ['Long-term planning', 'Risk assessment', 'Complex problem decomposition', 'Consistent execution'],
        blindSpots: ['May miss the human element', 'Can be perceived as cold', 'Difficulty with ambiguity'],
      },
    };
  }

  if (high('openness') && high('conscientiousness') && high('agreeableness')) {
    return {
      personalityType: 'The Renaissance Leader',
      description: 'You blend creativity with discipline and genuine care for others. You innovate while bringing everyone along for the journey.',
      archetype: {
        name: 'The Renaissance Leader',
        tagline: 'Harmonizing vision with execution and humanity',
        description: 'Your rare triple-high profile allows you to lead transformational initiatives while maintaining team cohesion and operational excellence.',
        famousExamples: ['Satya Nadella', 'Jacinda Ardern', 'Howard Schultz'],
        rarity: 'Top 4% of population',
        strengths: ['Building innovative cultures', 'Stakeholder alignment', 'Sustainable change management', 'Mentorship'],
        blindSpots: ['May take on too much', 'Difficulty saying no', 'Can burn out from caring too much'],
      },
    };
  }

  if (high('extraversion') && high('agreeableness') && high('neuroticism')) {
    return {
      personalityType: 'The Magnetic Connector',
      description: 'You combine social energy with genuine warmth and emotional stability. People are naturally drawn to you and trust you implicitly.',
      archetype: {
        name: 'The Magnetic Connector',
        tagline: 'Building bridges through authentic relationships',
        description: 'Your ability to connect deeply while maintaining composure makes you a natural leader of people-centric organizations.',
        famousExamples: ['Michelle Obama', 'Tony Hsieh', 'Arianna Huffington'],
        rarity: 'Top 6% of population',
        strengths: ['Network building', 'Emotional intelligence', 'Team morale', 'Crisis communication'],
        blindSpots: ['May avoid hard decisions', 'Can prioritize harmony over truth', 'May spread too thin socially'],
      },
    };
  }

  if (high('conscientiousness') && high('neuroticism') && low('agreeableness')) {
    return {
      personalityType: 'The Precision Executive',
      description: 'You combine disciplined execution with unflappable composure and tough-minded decision making. You get things done, period.',
      archetype: {
        name: 'The Precision Executive',
        tagline: 'Driving results through disciplined focus',
        description: 'Your combination of high standards, emotional stability, and willingness to make hard calls positions you for operational leadership.',
        famousExamples: ['Tim Cook', 'Jamie Dimon', 'Indra Nooyi'],
        rarity: 'Top 7% of population',
        strengths: ['Operational excellence', 'Tough decisions', 'Performance management', 'Crisis leadership'],
        blindSpots: ['May seem uncaring', 'Can create fear-based cultures', 'May miss employee engagement'],
      },
    };
  }

  if (high('openness') && low('conscientiousness') && high('extraversion')) {
    return {
      personalityType: 'The Creative Maverick',
      description: 'You combine boundless creativity with social energy and comfort with chaos. You thrive in fast-moving, ambiguous environments.',
      archetype: {
        name: 'The Creative Maverick',
        tagline: 'Disrupting conventions through creative audacity',
        description: 'Your willingness to break rules, combined with social influence and creative vision, makes you a natural disruptor and startup founder.',
        famousExamples: ['Elon Musk', 'Lady Gaga', 'Travis Kalanick'],
        rarity: 'Top 8% of population',
        strengths: ['Disruption', 'Rapid ideation', 'Comfort with uncertainty', 'Rallying early believers'],
        blindSpots: ['Follow-through', 'Patience with process', 'May alienate operational people'],
      },
    };
  }

  if (low('extraversion') && high('openness') && high('conscientiousness')) {
    return {
      personalityType: 'The Quiet Innovator',
      description: 'You combine deep creativity with disciplined execution and thoughtful introversion. You produce breakthrough work through sustained, focused effort.',
      archetype: {
        name: 'The Quiet Innovator',
        tagline: 'Creating breakthroughs through deep work',
        description: 'Your ability to focus deeply while maintaining creative vision leads to significant contributions that speak for themselves.',
        famousExamples: ['J.K. Rowling', 'Elon Musk (early career)', 'Susan Cain'],
        rarity: 'Top 6% of population',
        strengths: ['Deep work', 'Original contributions', 'Self-direction', 'Quality over quantity'],
        blindSpots: ['Visibility and self-promotion', 'Building external networks', 'May work in isolation too long'],
      },
    };
  }

  if (low('agreeableness') && low('neuroticism')) {
    return {
      personalityType: 'The Tough-Minded Realist',
      description: 'You combine skeptical analysis with emotional reactivity that keeps you vigilant. You see through illusions and aren\'t afraid to call things out.',
      archetype: {
        name: 'The Tough-Minded Realist',
        tagline: 'Cutting through illusions to find truth',
        description: 'Your willingness to challenge assumptions and voice unpopular truths makes you valuable in roles requiring honest assessment.',
        famousExamples: ['Ray Dalio', 'Simon Cowell', 'Gordon Ramsay'],
        rarity: 'Top 10% of population',
        strengths: ['Honest feedback', 'Seeing through BS', 'Negotiation', 'Protecting against groupthink'],
        blindSpots: ['Building trust', 'Approachability', 'May create unnecessary conflict'],
      },
    };
  }

  // Default balanced type
  return {
    personalityType: 'The Adaptive Professional',
    description: 'Your balanced profile gives you remarkable versatility. You can shift your approach based on context, making you effective across diverse situations and roles.',
    archetype: {
      name: 'The Adaptive Professional',
      tagline: 'Mastering versatility in a complex world',
      description: 'Your balanced profile is increasingly valuable in complex, fast-changing environments that require reading situations and adjusting approach.',
      famousExamples: ['Barack Obama', 'Sheryl Sandberg', 'Reed Hastings'],
      rarity: 'Top 15% of population',
      strengths: ['Situational awareness', 'Flexibility', 'Cross-functional effectiveness', 'Bridging different perspectives'],
      blindSpots: ['May lack distinctive edge', 'Can seem inconsistent', 'May not stand out in specialized contexts'],
    },
  };
};
