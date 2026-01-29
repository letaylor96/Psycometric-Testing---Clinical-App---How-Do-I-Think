// Who Am I? Personality Assessment
// Deep personality profiling based on the Big Five model + Myers-Briggs Type Indicator

export type PersonalityTrait = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';

// MBTI Types
export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface MBTIResult {
  type: MBTIType;
  name: string;
  nickname: string;
  description: string;
  dimensions: {
    EI: { letter: 'E' | 'I'; score: number; label: string };
    SN: { letter: 'S' | 'N'; score: number; label: string };
    TF: { letter: 'T' | 'F'; score: number; label: string };
    JP: { letter: 'J' | 'P'; score: number; label: string };
  };
  strengths: string[];
  challenges: string[];
  famousExamples: string[];
  careerPaths: string[];
  compatibility: string[];
}

export type PersonalityFacet = 
  // Openness facets
  | 'imagination' | 'curiosity' | 'creativity'
  // Conscientiousness facets
  | 'organization' | 'ambition' | 'discipline'
  // Extraversion facets
  | 'sociability' | 'assertiveness' | 'energy'
  // Agreeableness facets
  | 'empathy' | 'cooperation' | 'trust'
  // Neuroticism facets (scored as Resilience)
  | 'composure' | 'confidence' | 'stability';

export interface PersonalityQuestion {
  id: number;
  trait: PersonalityTrait;
  facet: PersonalityFacet;
  question: string;
  reversed: boolean;
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
    label: 'Resilience', 
    high: 'Calm, secure, emotionally stable',
    low: 'Sensitive, emotionally reactive'
  },
};

export const facetLabels: Record<PersonalityFacet, { label: string; trait: PersonalityTrait; description: string }> = {
  // Openness facets
  imagination: { label: 'Imagination', trait: 'openness', description: 'Vivid inner world and creative vision' },
  curiosity: { label: 'Curiosity', trait: 'openness', description: 'Drive to explore and understand' },
  creativity: { label: 'Creativity', trait: 'openness', description: 'Original thinking and artistic sensibility' },
  // Conscientiousness facets
  organization: { label: 'Organization', trait: 'conscientiousness', description: 'Structure and systematic approach' },
  ambition: { label: 'Ambition', trait: 'conscientiousness', description: 'Drive for achievement and excellence' },
  discipline: { label: 'Discipline', trait: 'conscientiousness', description: 'Self-control and follow-through' },
  // Extraversion facets
  sociability: { label: 'Sociability', trait: 'extraversion', description: 'Comfort in social situations' },
  assertiveness: { label: 'Assertiveness', trait: 'extraversion', description: 'Confidence in expressing views' },
  energy: { label: 'Energy', trait: 'extraversion', description: 'Vitality and enthusiasm' },
  // Agreeableness facets
  empathy: { label: 'Empathy', trait: 'agreeableness', description: 'Understanding others\' perspectives' },
  cooperation: { label: 'Cooperation', trait: 'agreeableness', description: 'Preference for harmony' },
  trust: { label: 'Trust', trait: 'agreeableness', description: 'Faith in others\' intentions' },
  // Resilience facets
  composure: { label: 'Composure', trait: 'neuroticism', description: 'Calm under pressure' },
  confidence: { label: 'Confidence', trait: 'neuroticism', description: 'Self-assurance and security' },
  stability: { label: 'Stability', trait: 'neuroticism', description: 'Emotional consistency' },
};

// Likert scale options (IPIP-NEO standard 5-point scale)
export const personalityOptions = [
  'Very Inaccurate',
  'Moderately Inaccurate', 
  'Neither Accurate Nor Inaccurate',
  'Moderately Accurate',
  'Very Accurate'
];

// 30 Validated Questions based on IPIP-NEO-120 and NEO-PI-R research
// Each item is adapted from peer-reviewed personality inventories
// Reference: Goldberg, L.R. (1999) International Personality Item Pool
export const personalityQuestions: PersonalityQuestion[] = [
  // ═══════════════════════════════════════════════════════════════
  // OPENNESS TO EXPERIENCE (6 questions)
  // Measures intellectual curiosity, creativity, and preference for novelty
  // ═══════════════════════════════════════════════════════════════
  
  // Imagination facet - Fantasy and imaginative capacity
  { id: 1, trait: 'openness', facet: 'imagination', question: 'I have a vivid imagination that I use to create rich inner worlds.', reversed: false },
  { id: 2, trait: 'openness', facet: 'imagination', question: 'I seldom daydream or let my mind wander into fantasy.', reversed: true },
  
  // Curiosity facet - Intellectual engagement and learning drive
  { id: 3, trait: 'openness', facet: 'curiosity', question: 'I enjoy hearing new ideas, even if they challenge my existing beliefs.', reversed: false },
  { id: 4, trait: 'openness', facet: 'curiosity', question: 'I have little interest in speculating about the nature of the universe or the human condition.', reversed: true },
  
  // Creativity facet - Aesthetic sensitivity and original thinking
  { id: 5, trait: 'openness', facet: 'creativity', question: 'I see beauty in things that others might not notice.', reversed: false },
  { id: 6, trait: 'openness', facet: 'creativity', question: 'I believe that art and music are essential to a rich life.', reversed: false },

  // ═══════════════════════════════════════════════════════════════
  // CONSCIENTIOUSNESS (6 questions)
  // Measures self-discipline, organization, and achievement orientation
  // ═══════════════════════════════════════════════════════════════
  
  // Organization facet - Order, planning, and systematic behavior
  { id: 7, trait: 'conscientiousness', facet: 'organization', question: 'I like to have a place for everything and everything in its place.', reversed: false },
  { id: 8, trait: 'conscientiousness', facet: 'organization', question: 'I often leave my belongings scattered around.', reversed: true },
  
  // Ambition facet - Achievement striving and competence
  { id: 9, trait: 'conscientiousness', facet: 'ambition', question: 'I work hard to accomplish my goals, even when it requires significant effort.', reversed: false },
  { id: 10, trait: 'conscientiousness', facet: 'ambition', question: 'I do just enough work to get by.', reversed: true },
  
  // Discipline facet - Self-regulation and persistence
  { id: 11, trait: 'conscientiousness', facet: 'discipline', question: 'I complete tasks successfully, even when they become difficult or tedious.', reversed: false },
  { id: 12, trait: 'conscientiousness', facet: 'discipline', question: 'I have difficulty starting tasks and often procrastinate.', reversed: true },

  // ═══════════════════════════════════════════════════════════════
  // EXTRAVERSION (6 questions)
  // Measures social engagement, assertiveness, and positive emotionality
  // ═══════════════════════════════════════════════════════════════
  
  // Sociability facet - Gregariousness and social comfort
  { id: 13, trait: 'extraversion', facet: 'sociability', question: 'I feel comfortable around people and enjoy making new acquaintances.', reversed: false },
  { id: 14, trait: 'extraversion', facet: 'sociability', question: 'I find it difficult to approach others and start conversations.', reversed: true },
  
  // Assertiveness facet - Social dominance and leadership tendency
  { id: 15, trait: 'extraversion', facet: 'assertiveness', question: 'I take charge of situations and direct group activities.', reversed: false },
  { id: 16, trait: 'extraversion', facet: 'assertiveness', question: 'I wait for others to lead the way in social or professional settings.', reversed: true },
  
  // Energy facet - Activity level and positive affect
  { id: 17, trait: 'extraversion', facet: 'energy', question: 'I am full of energy and always on the go.', reversed: false },
  { id: 18, trait: 'extraversion', facet: 'energy', question: 'I prefer a slow-paced, quiet lifestyle.', reversed: true },

  // ═══════════════════════════════════════════════════════════════
  // AGREEABLENESS (6 questions)
  // Measures cooperation, trust, and interpersonal harmony
  // ═══════════════════════════════════════════════════════════════
  
  // Empathy facet - Tender-mindedness and emotional attunement
  { id: 19, trait: 'agreeableness', facet: 'empathy', question: 'I sympathize with others\' feelings and try to understand their perspective.', reversed: false },
  { id: 20, trait: 'agreeableness', facet: 'empathy', question: 'I am not particularly moved by others\' hardships or emotional struggles.', reversed: true },
  
  // Cooperation facet - Compliance and conflict avoidance
  { id: 21, trait: 'agreeableness', facet: 'cooperation', question: 'I try to accommodate others and avoid confrontation.', reversed: false },
  { id: 22, trait: 'agreeableness', facet: 'cooperation', question: 'I have no problem telling people exactly what I think, even if it upsets them.', reversed: true },
  
  // Trust facet - Faith in others' intentions
  { id: 23, trait: 'agreeableness', facet: 'trust', question: 'I believe that most people are fundamentally honest and well-intentioned.', reversed: false },
  { id: 24, trait: 'agreeableness', facet: 'trust', question: 'I suspect hidden motives in people I interact with.', reversed: true },

  // ═══════════════════════════════════════════════════════════════
  // EMOTIONAL STABILITY (6 questions) - Inverse of Neuroticism
  // Measures resilience, calmness, and emotional regulation
  // ═══════════════════════════════════════════════════════════════
  
  // Composure facet - Calmness under pressure
  { id: 25, trait: 'neuroticism', facet: 'composure', question: 'I remain calm and composed when faced with stressful situations.', reversed: false },
  { id: 26, trait: 'neuroticism', facet: 'composure', question: 'I get stressed out easily and feel overwhelmed by minor problems.', reversed: true },
  
  // Confidence facet - Self-assurance and security
  { id: 27, trait: 'neuroticism', facet: 'confidence', question: 'I feel comfortable with who I am and rarely worry about others\' opinions.', reversed: false },
  { id: 28, trait: 'neuroticism', facet: 'confidence', question: 'I often feel inferior to others and doubt my abilities.', reversed: true },
  
  // Stability facet - Emotional consistency and mood regulation
  { id: 29, trait: 'neuroticism', facet: 'stability', question: 'My mood remains relatively stable from day to day.', reversed: false },
  { id: 30, trait: 'neuroticism', facet: 'stability', question: 'I experience frequent mood swings and emotional ups and downs.', reversed: true },
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
  mbti: MBTIResult; // Myers-Briggs Type Indicator
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

  // Calculate MBTI type from Big Five scores
  const mbti = calculateMBTI(scores);

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
    mbti,
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

// MBTI Type Definitions
const mbtiTypeDetails: Record<MBTIType, Omit<MBTIResult, 'type' | 'dimensions'>> = {
  INTJ: {
    name: 'The Architect',
    nickname: 'Strategic Mastermind',
    description: 'Imaginative and strategic thinkers with a plan for everything. You combine creativity with high standards and drive.',
    strengths: ['Strategic planning', 'Independent thinking', 'High standards', 'Innovative problem-solving'],
    challenges: ['Can appear cold or dismissive', 'Perfectionism', 'Impatience with inefficiency'],
    famousExamples: ['Elon Musk', 'Michelle Obama', 'Isaac Newton'],
    careerPaths: ['Executive Leadership', 'Strategic Consulting', 'Scientific Research', 'Systems Architecture'],
    compatibility: ['ENFP', 'ENTP', 'INTJ', 'ENTJ'],
  },
  INTP: {
    name: 'The Logician',
    nickname: 'Objective Analyst',
    description: 'Innovative inventors with an unquenchable thirst for knowledge. You love theoretical and abstract ideas.',
    strengths: ['Analytical thinking', 'Objectivity', 'Creativity', 'Complex problem-solving'],
    challenges: ['Social situations', 'Following rules', 'Expressing emotions'],
    famousExamples: ['Albert Einstein', 'Bill Gates', 'Marie Curie'],
    careerPaths: ['Software Development', 'Research Science', 'Philosophy', 'Data Analysis'],
    compatibility: ['ENTJ', 'ESTJ', 'INFJ', 'ENFJ'],
  },
  ENTJ: {
    name: 'The Commander',
    nickname: 'Decisive Leader',
    description: 'Bold, imaginative, and strong-willed leaders who always find a way. You thrive on challenge and drive for results.',
    strengths: ['Leadership', 'Strategic thinking', 'Efficiency', 'Confidence'],
    challenges: ['Impatience', 'Stubbornness', 'Dominance', 'Emotional expression'],
    famousExamples: ['Steve Jobs', 'Margaret Thatcher', 'Napoleon Bonaparte'],
    careerPaths: ['CEO/Executive', 'Management Consulting', 'Entrepreneurship', 'Law'],
    compatibility: ['INTP', 'ISTP', 'ENTJ', 'INTJ'],
  },
  ENTP: {
    name: 'The Debater',
    nickname: 'Innovative Challenger',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge. You love to explore new ideas.',
    strengths: ['Quick thinking', 'Charisma', 'Innovation', 'Debate skills'],
    challenges: ['Follow-through', 'Routine tasks', 'Sensitivity to others'],
    famousExamples: ['Mark Twain', 'Thomas Edison', 'Céline Dion'],
    careerPaths: ['Entrepreneurship', 'Creative Direction', 'Consulting', 'Venture Capital'],
    compatibility: ['INFJ', 'INTJ', 'ENFP', 'ENTP'],
  },
  INFJ: {
    name: 'The Advocate',
    nickname: 'Insightful Visionary',
    description: 'Quiet and mystical, yet inspiring and tireless idealists. You\'re driven by a deep sense of purpose.',
    strengths: ['Insightfulness', 'Idealism', 'Compassion', 'Determination'],
    challenges: ['Burnout', 'Perfectionism', 'Sensitivity to criticism'],
    famousExamples: ['Martin Luther King Jr.', 'Nelson Mandela', 'Mother Teresa'],
    careerPaths: ['Counseling', 'Writing', 'Nonprofit Leadership', 'Psychology'],
    compatibility: ['ENTP', 'ENFP', 'INFJ', 'INTJ'],
  },
  INFP: {
    name: 'The Mediator',
    nickname: 'Idealistic Healer',
    description: 'Poetic, kind, and altruistic people, always eager to help a good cause. You seek harmony and authenticity.',
    strengths: ['Empathy', 'Creativity', 'Open-mindedness', 'Passion'],
    challenges: ['Practicality', 'Self-criticism', 'Conflict avoidance'],
    famousExamples: ['William Shakespeare', 'J.R.R. Tolkien', 'Princess Diana'],
    careerPaths: ['Writing', 'Art Therapy', 'Social Work', 'UX Design'],
    compatibility: ['ENFJ', 'ENTJ', 'INFP', 'ISFP'],
  },
  ENFJ: {
    name: 'The Protagonist',
    nickname: 'Charismatic Leader',
    description: 'Charismatic and inspiring leaders who mesmerize their listeners. You\'re driven to help others achieve their potential.',
    strengths: ['Natural leadership', 'Empathy', 'Reliability', 'Charisma'],
    challenges: ['Overly idealistic', 'People-pleasing', 'Self-neglect'],
    famousExamples: ['Oprah Winfrey', 'Barack Obama', 'Jennifer Lawrence'],
    careerPaths: ['Executive Coaching', 'Politics', 'Teaching', 'HR Leadership'],
    compatibility: ['INFP', 'ISFP', 'ENFJ', 'INFJ'],
  },
  ENFP: {
    name: 'The Campaigner',
    nickname: 'Enthusiastic Idealist',
    description: 'Enthusiastic, creative, and sociable free spirits who can always find a reason to smile. You inspire others.',
    strengths: ['Enthusiasm', 'Creativity', 'Sociability', 'Optimism'],
    challenges: ['Focus', 'Overthinking', 'Follow-through'],
    famousExamples: ['Robin Williams', 'Robert Downey Jr.', 'Will Smith'],
    careerPaths: ['Creative Direction', 'Public Relations', 'Entrepreneurship', 'Coaching'],
    compatibility: ['INTJ', 'INFJ', 'ENFP', 'ENTP'],
  },
  ISTJ: {
    name: 'The Logistician',
    nickname: 'Responsible Realist',
    description: 'Practical and fact-minded individuals whose reliability cannot be doubted. You value tradition and loyalty.',
    strengths: ['Honesty', 'Dedication', 'Responsibility', 'Calmness'],
    challenges: ['Stubbornness', 'Insensitivity', 'Resistance to change'],
    famousExamples: ['George Washington', 'Queen Elizabeth II', 'Warren Buffett'],
    careerPaths: ['Finance', 'Law', 'Military', 'Project Management'],
    compatibility: ['ESFP', 'ESTP', 'ISTJ', 'ISFJ'],
  },
  ISFJ: {
    name: 'The Defender',
    nickname: 'Protective Guardian',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones. You combine service with care.',
    strengths: ['Supportive', 'Reliable', 'Patient', 'Observant'],
    challenges: ['Overloading self', 'Shyness', 'Repressing feelings'],
    famousExamples: ['Beyoncé', 'Kate Middleton', 'Rosa Parks'],
    careerPaths: ['Healthcare', 'Social Work', 'Education', 'Administration'],
    compatibility: ['ESFP', 'ESTP', 'ISFJ', 'ISTJ'],
  },
  ESTJ: {
    name: 'The Executive',
    nickname: 'Efficient Organizer',
    description: 'Excellent administrators, unsurpassed at managing things and people. You bring order and structure.',
    strengths: ['Dedication', 'Strong will', 'Direct', 'Honest'],
    challenges: ['Inflexibility', 'Difficulty relaxing', 'Judgmental'],
    famousExamples: ['Sonia Sotomayor', 'John D. Rockefeller', 'Judge Judy'],
    careerPaths: ['Business Management', 'Law', 'Politics', 'Operations'],
    compatibility: ['ISTP', 'ISFP', 'ESTJ', 'ENTJ'],
  },
  ESFJ: {
    name: 'The Consul',
    nickname: 'Supportive Contributor',
    description: 'Extraordinarily caring, social, and popular people, always eager to help. You create harmony in communities.',
    strengths: ['Loyalty', 'Kindness', 'Practical skills', 'Warmth'],
    challenges: ['Worry about status', 'Inflexibility', 'Selflessness to a fault'],
    famousExamples: ['Taylor Swift', 'Bill Clinton', 'Jennifer Garner'],
    careerPaths: ['Healthcare', 'Event Planning', 'Customer Success', 'Teaching'],
    compatibility: ['ISTP', 'ISFP', 'ESFJ', 'ENFJ'],
  },
  ISTP: {
    name: 'The Virtuoso',
    nickname: 'Practical Problem-Solver',
    description: 'Bold and practical experimenters, masters of all kinds of tools. You love to explore with your hands.',
    strengths: ['Optimistic', 'Creative', 'Practical', 'Spontaneous'],
    challenges: ['Stubbornness', 'Insensitivity', 'Risk-prone behavior'],
    famousExamples: ['Bear Grylls', 'Clint Eastwood', 'Michael Jordan'],
    careerPaths: ['Engineering', 'Mechanics', 'Forensics', 'Piloting'],
    compatibility: ['ESTJ', 'ESFJ', 'ISTP', 'ESTP'],
  },
  ISFP: {
    name: 'The Adventurer',
    nickname: 'Versatile Creator',
    description: 'Flexible and charming artists, always ready to explore and experience something new. You live in the moment.',
    strengths: ['Charming', 'Artistic', 'Curious', 'Passionate'],
    challenges: ['Easily stressed', 'Overly competitive', 'Unpredictable'],
    famousExamples: ['Michael Jackson', 'Frida Kahlo', 'Lana Del Rey'],
    careerPaths: ['Art & Design', 'Music', 'Culinary Arts', 'Physical Therapy'],
    compatibility: ['ESTJ', 'ESFJ', 'ISFP', 'ESFP'],
  },
  ESTP: {
    name: 'The Entrepreneur',
    nickname: 'Energetic Problem-Solver',
    description: 'Smart, energetic, and perceptive people who truly enjoy living on the edge. You thrive in action.',
    strengths: ['Bold', 'Rational', 'Practical', 'Perceptive'],
    challenges: ['Impatient', 'Risk-prone', 'Unstructured', 'Defiant'],
    famousExamples: ['Donald Trump', 'Madonna', 'Ernest Hemingway'],
    careerPaths: ['Sales', 'Entrepreneurship', 'Sports', 'Emergency Services'],
    compatibility: ['ISTJ', 'ISFJ', 'ESTP', 'ISTP'],
  },
  ESFP: {
    name: 'The Entertainer',
    nickname: 'Spontaneous Energizer',
    description: 'Spontaneous, energetic, and enthusiastic people who make life exciting. You light up every room.',
    strengths: ['Bold', 'Original', 'Practical', 'Observant'],
    challenges: ['Sensitive', 'Conflict-averse', 'Easily bored', 'Unfocused'],
    famousExamples: ['Marilyn Monroe', 'Jamie Foxx', 'Adele'],
    careerPaths: ['Entertainment', 'Event Planning', 'Sales', 'Public Relations'],
    compatibility: ['ISTJ', 'ISFJ', 'ESFP', 'ESTP'],
  },
};

// Calculate MBTI from Big Five scores
const calculateMBTI = (scores: Record<PersonalityTrait, number>): MBTIResult => {
  // Map Big Five to MBTI dimensions:
  // E/I ← Extraversion (high = E, low = I)
  // S/N ← Openness (high = N, low = S) - Intuition correlates with Openness
  // T/F ← Agreeableness (high = F, low = T) - Thinking vs Feeling
  // J/P ← Conscientiousness (high = J, low = P) - Judging vs Perceiving
  
  const EI = scores.extraversion >= 50 ? 'E' : 'I';
  const SN = scores.openness >= 50 ? 'N' : 'S';
  const TF = scores.agreeableness >= 50 ? 'F' : 'T';
  const JP = scores.conscientiousness >= 50 ? 'J' : 'P';
  
  const mbtiType = `${EI}${SN}${TF}${JP}` as MBTIType;
  
  const typeDetails = mbtiTypeDetails[mbtiType];
  
  return {
    type: mbtiType,
    ...typeDetails,
    dimensions: {
      EI: {
        letter: EI,
        score: EI === 'E' ? scores.extraversion : (100 - scores.extraversion),
        label: EI === 'E' ? 'Extraversion' : 'Introversion',
      },
      SN: {
        letter: SN,
        score: SN === 'N' ? scores.openness : (100 - scores.openness),
        label: SN === 'N' ? 'Intuition' : 'Sensing',
      },
      TF: {
        letter: TF,
        score: TF === 'F' ? scores.agreeableness : (100 - scores.agreeableness),
        label: TF === 'F' ? 'Feeling' : 'Thinking',
      },
      JP: {
        letter: JP,
        score: JP === 'J' ? scores.conscientiousness : (100 - scores.conscientiousness),
        label: JP === 'J' ? 'Judging' : 'Perceiving',
      },
    },
  };
};
