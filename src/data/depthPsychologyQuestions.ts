// Depth Psychology Assessment Questions
// 20 free-form questions analyzed through different philosophical frameworks:
// Freudian, Jungian, or Nietzschean perspectives

export type AnalysisFramework = 'freudian' | 'jungian' | 'nietzschean';

export interface DepthQuestion {
  id: number;
  question: string;
  category: 'drives' | 'self' | 'morality' | 'shadow' | 'meaning';
  probes: string[];
}

export const depthQuestions: DepthQuestion[] = [
  // DRIVES / INSTINCTS
  {
    id: 1,
    question: "Describe a recurring dream you've had, or one that stands out vividly in your memory. What happens in it, and how does it make you feel?",
    category: 'shadow',
    probes: ['unconscious content', 'symbolic representations', 'hidden desires'],
  },
  {
    id: 2,
    question: "When you're completely alone with no obligations, what do you find yourself doing or thinking about most often?",
    category: 'drives',
    probes: ['authentic impulses', 'unfiltered desires', 'true nature'],
  },
  {
    id: 3,
    question: "What is something you've wanted intensely but felt you shouldn't want? How did you handle that conflict?",
    category: 'drives',
    probes: ['forbidden desires', 'internal conflict', 'value tension'],
  },
  {
    id: 4,
    question: "Describe a time when you acted impulsively and later regretted it. What drove you in that moment?",
    category: 'drives',
    probes: ['impulse expression', 'instinct vs reason', 'moment of truth'],
  },
  
  // SELF / IDENTITY
  {
    id: 5,
    question: "How do you typically make important decisions? Walk me through your internal process.",
    category: 'self',
    probes: ['self-knowledge', 'decision architecture', 'inner dialogue'],
  },
  {
    id: 6,
    question: "When you face a conflict between what you want and what others expect of you, how do you usually resolve it?",
    category: 'self',
    probes: ['authenticity', 'social adaptation', 'self-assertion'],
  },
  {
    id: 7,
    question: "Describe a situation where you had to delay gratification for a long-term goal. How did that feel?",
    category: 'self',
    probes: ['self-mastery', 'willpower', 'future orientation'],
  },
  {
    id: 8,
    question: "When you're under significant stress, what happens to your ability to think clearly and make good decisions?",
    category: 'self',
    probes: ['resilience', 'breakdown patterns', 'core stability'],
  },
  
  // MORALITY / VALUES
  {
    id: 9,
    question: "Whose voice do you hear in your head when you're about to do something questionable? What does it say?",
    category: 'morality',
    probes: ['internalized authority', 'moral compass', 'value origins'],
  },
  {
    id: 10,
    question: "Describe something you feel guilty about that others might consider trivial. Why does it bother you?",
    category: 'morality',
    probes: ['guilt sensitivity', 'personal ethics', 'moral perfectionism'],
  },
  {
    id: 11,
    question: "What would your ideal version of yourself look like? How far do you feel from that ideal?",
    category: 'morality',
    probes: ['ego ideal', 'aspirations', 'self-evaluation'],
  },
  {
    id: 12,
    question: "When you fall short of your own standards, how do you treat yourself internally?",
    category: 'morality',
    probes: ['self-criticism', 'shame dynamics', 'inner judge'],
  },
  
  // SHADOW / UNCONSCIOUS
  {
    id: 13,
    question: "Think of someone who really irritates you. What specifically about them bothers you, and could any of those traits be things you struggle with yourself?",
    category: 'shadow',
    probes: ['projection', 'disowned traits', 'mirror recognition'],
  },
  {
    id: 14,
    question: "When something painful happens, what's your go-to way of coping in the first few hours or days?",
    category: 'shadow',
    probes: ['defense style', 'coping mechanisms', 'pain response'],
  },
  {
    id: 15,
    question: "Is there a memory from childhood that you can recall factually but feel emotionally detached from?",
    category: 'shadow',
    probes: ['emotional numbing', 'split experiences', 'protective distance'],
  },
  {
    id: 16,
    question: "When you're angry at someone you love, what do you do with that anger?",
    category: 'shadow',
    probes: ['anger management', 'love-hate dynamics', 'emotional complexity'],
  },
  
  // MEANING / EXISTENCE
  {
    id: 17,
    question: "What is your earliest memory? Describe it in as much detail as you can, including how it makes you feel now.",
    category: 'meaning',
    probes: ['origin story', 'formative experiences', 'life narrative'],
  },
  {
    id: 18,
    question: "How would you describe your relationship with each of your parents (or primary caregivers) during childhood?",
    category: 'meaning',
    probes: ['attachment patterns', 'primary relationships', 'early influences'],
  },
  {
    id: 19,
    question: "What patterns do you notice repeating in your close relationships? Do they remind you of anything from your past?",
    category: 'meaning',
    probes: ['repetition patterns', 'relationship dynamics', 'inherited patterns'],
  },
  {
    id: 20,
    question: "If your deepest self could speak directly to you, what do you think it would want you to know or face?",
    category: 'meaning',
    probes: ['inner wisdom', 'suppressed knowledge', 'self-confrontation'],
  },

  // NARCISSISTIC SIGNALING (grandiose / vulnerable / empathy / admiration)
  {
    id: 21,
    question: "When you imagine your ideal future self, what role do you play and how do others see, recognize, or respond to you in it?",
    category: 'self',
    probes: ['grandiose fantasy', 'specialness', 'need for recognition'],
  },
  {
    id: 22,
    question: "How do you typically react — internally and externally — when someone criticizes you, ignores you, or fails to acknowledge something you did well?",
    category: 'self',
    probes: ['narcissistic injury', 'rage vs withdrawal', 'fragility of self-esteem'],
  },
  {
    id: 23,
    question: "When a close friend describes a painful experience that has nothing to do with you, what actually happens inside you while they talk?",
    category: 'morality',
    probes: ['empathy capacity', 'attunement vs self-reference', 'emotional resonance'],
  },
  {
    id: 24,
    question: "Be honest: in what ways do you feel meaningfully different from, more capable than, or misunderstood by 'most people' — and where does that sense come from?",
    category: 'self',
    probes: ['entitlement', 'specialness vs isolation', 'grandiose vs vulnerable presentation'],
  },
];

// Shared narcissism signaling profile — non-diagnostic, educational only.
// Surfaces tendencies along grandiose/vulnerable spectra across all
// depth psychology frameworks. NOT a clinical NPD assessment.
export interface NarcissismProfile {
  grandiositySpectrum: number;        // 0-100: overt grandiose signaling
  vulnerableSpectrum: number;         // 0-100: covert/vulnerable signaling
  empathyCapacity: number;            // 0-100: attunement to others
  admirationNeed: number;             // 0-100: dependence on external validation
  overallElevation: 'low' | 'moderate' | 'elevated' | 'pronounced';
  presentationStyle: 'healthy-confidence' | 'grandiose-leaning' | 'vulnerable-leaning' | 'mixed' | 'minimal';
  signalingPatterns: string[];        // 2-4 short concrete patterns observed
  educationalNote: string;            // plain-language, non-diagnostic interpretation
}

// Framework-specific result structures
export interface FreudianResults {
  framework: 'freudian';
  idStrength: number;
  egoStrength: number;
  superegoStrength: number;
  structuralBalance: 'id-dominant' | 'ego-dominant' | 'superego-dominant' | 'balanced' | 'conflicted';
  primaryDefenses: string[];
  defenseMaturity: 'primitive' | 'neurotic' | 'mature';
  coreConflicts: string[];
  unconsciousThemes: string[];
  profileSummary: string;
  strengths: string[];
  growthAreas: string[];
  narcissismProfile?: NarcissismProfile;
  answers: { questionId: number; answer: string }[];
}

export interface JungianResults {
  framework: 'jungian';
  dominantArchetypes: string[];
  shadowContent: string[];
  personaMask: string;
  animaAnimusBalance: 'anima-leaning' | 'animus-leaning' | 'integrated' | 'undeveloped';
  individuationStage: 'unconscious' | 'shadow-work' | 'anima-animus' | 'self-realization';
  collectiveUnconscious: string[];
  primaryFunction: 'thinking' | 'feeling' | 'sensation' | 'intuition';
  auxiliaryFunction: 'thinking' | 'feeling' | 'sensation' | 'intuition';
  profileSummary: string;
  strengths: string[];
  growthAreas: string[];
  narcissismProfile?: NarcissismProfile;
  answers: { questionId: number; answer: string }[];
}

export interface NietzscheanResults {
  framework: 'nietzschean';
  willToPower: number;
  lifeAffirmation: number;
  overcomingCapacity: number;
  slaveVsMasterMorality: 'master' | 'slave' | 'transitional' | 'beyond';
  resentimentLevel: 'low' | 'moderate' | 'high' | 'overcome';
  authenticityScore: number;
  ubermenschTraits: string[];
  lastManTraits: string[];
  eternalRecurrence: 'embrace' | 'struggle' | 'reject';
  nihilismStance: 'passive' | 'active' | 'creative' | 'transcended';
  profileSummary: string;
  strengths: string[];
  growthAreas: string[];
  narcissismProfile?: NarcissismProfile;
  answers: { questionId: number; answer: string }[];
}

export type DepthPsychologyResults = FreudianResults | JungianResults | NietzscheanResults;

export const frameworkInfo: Record<AnalysisFramework, {
  name: string;
  thinker: string;
  description: string;
  icon: string;
  color: string;
}> = {
  freudian: {
    name: 'Freudian Psychoanalysis',
    thinker: 'Sigmund Freud',
    description: 'Explore your unconscious drives, defense mechanisms, and the interplay between Id, Ego, and Superego.',
    icon: '🛋️',
    color: 'text-red-500',
  },
  jungian: {
    name: 'Analytical Psychology',
    thinker: 'Carl Jung',
    description: 'Explore archetypes, shadow material, and individuation themes as part of your structured self-assessment.',
    icon: '🌓',
    color: 'text-purple-500',
  },
  nietzschean: {
    name: 'Will to Power Analysis',
    thinker: 'Friedrich Nietzsche',
    description: 'Examine your will to power, authenticity, and capacity for self-overcoming and life affirmation.',
    icon: '⚡',
    color: 'text-amber-500',
  },
};

export const categoryLabels: Record<DepthQuestion['category'], string> = {
  drives: 'Drives & Instincts',
  self: 'Self & Identity',
  morality: 'Values & Morality',
  shadow: 'Shadow & Unconscious',
  meaning: 'Meaning & Existence',
};
