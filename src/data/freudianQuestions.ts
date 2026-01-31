// Freudian Psychoanalytic Assessment Questions
// 20 free-form questions designed to explore unconscious motivations, defense mechanisms,
// and psychodynamic structures based on Freudian theory

export interface FreudianQuestion {
  id: number;
  question: string;
  category: 'id' | 'ego' | 'superego' | 'defense' | 'unconscious';
  probes: string[]; // What this question explores
}

export const freudianQuestions: FreudianQuestion[] = [
  // ID-focused questions (primal desires, pleasure principle)
  {
    id: 1,
    question: "Describe a recurring dream you've had, or one that stands out vividly in your memory. What happens in it, and how does it make you feel?",
    category: 'unconscious',
    probes: ['unconscious wishes', 'repressed content', 'symbolic representations'],
  },
  {
    id: 2,
    question: "When you're completely alone with no obligations, what do you find yourself doing or thinking about most often?",
    category: 'id',
    probes: ['pleasure principle', 'unfiltered desires', 'authentic impulses'],
  },
  {
    id: 3,
    question: "What is something you've wanted intensely but felt you shouldn't want? How did you handle that conflict?",
    category: 'id',
    probes: ['forbidden desires', 'id-superego conflict', 'repression'],
  },
  {
    id: 4,
    question: "Describe a time when you acted impulsively and later regretted it. What drove you in that moment?",
    category: 'id',
    probes: ['impulse control', 'id dominance', 'reality principle failures'],
  },
  
  // EGO-focused questions (reality principle, mediation)
  {
    id: 5,
    question: "How do you typically make important decisions? Walk me through your internal process.",
    category: 'ego',
    probes: ['ego strength', 'reality testing', 'rational mediation'],
  },
  {
    id: 6,
    question: "When you face a conflict between what you want and what others expect of you, how do you usually resolve it?",
    category: 'ego',
    probes: ['ego mediation', 'compromise formation', 'adaptation strategies'],
  },
  {
    id: 7,
    question: "Describe a situation where you had to delay gratification for a long-term goal. How did that feel?",
    category: 'ego',
    probes: ['reality principle', 'impulse regulation', 'ego maturity'],
  },
  {
    id: 8,
    question: "When you're under significant stress, what happens to your ability to think clearly and make good decisions?",
    category: 'ego',
    probes: ['ego resilience', 'regression potential', 'defensive operations'],
  },
  
  // SUPEREGO-focused questions (moral standards, guilt, ideals)
  {
    id: 9,
    question: "Whose voice do you hear in your head when you're about to do something questionable? What does it say?",
    category: 'superego',
    probes: ['internalized authority', 'parental introjection', 'moral compass'],
  },
  {
    id: 10,
    question: "Describe something you feel guilty about that others might consider trivial. Why does it bother you?",
    category: 'superego',
    probes: ['guilt sensitivity', 'superego harshness', 'moral anxiety'],
  },
  {
    id: 11,
    question: "What would your ideal version of yourself look like? How far do you feel from that ideal?",
    category: 'superego',
    probes: ['ego ideal', 'narcissistic aspirations', 'self-criticism'],
  },
  {
    id: 12,
    question: "When you fall short of your own standards, how do you treat yourself internally?",
    category: 'superego',
    probes: ['superego severity', 'self-punishment', 'shame dynamics'],
  },
  
  // DEFENSE MECHANISM questions
  {
    id: 13,
    question: "Think of someone who really irritates you. What specifically about them bothers you, and could any of those traits be things you struggle with yourself?",
    category: 'defense',
    probes: ['projection', 'shadow content', 'disowned traits'],
  },
  {
    id: 14,
    question: "When something painful happens, what's your go-to way of coping in the first few hours or days?",
    category: 'defense',
    probes: ['primary defenses', 'coping style', 'emotional regulation'],
  },
  {
    id: 15,
    question: "Is there a memory from childhood that you can recall factually but feel emotionally detached from?",
    category: 'defense',
    probes: ['isolation of affect', 'intellectualization', 'emotional numbing'],
  },
  {
    id: 16,
    question: "When you're angry at someone you love, what do you do with that anger?",
    category: 'defense',
    probes: ['reaction formation', 'displacement', 'passive aggression'],
  },
  
  // UNCONSCIOUS / EARLY EXPERIENCE questions
  {
    id: 17,
    question: "What is your earliest memory? Describe it in as much detail as you can, including how it makes you feel now.",
    category: 'unconscious',
    probes: ['screen memories', 'early object relations', 'formative experiences'],
  },
  {
    id: 18,
    question: "How would you describe your relationship with each of your parents (or primary caregivers) during childhood?",
    category: 'unconscious',
    probes: ['Oedipal dynamics', 'attachment patterns', 'parental identification'],
  },
  {
    id: 19,
    question: "What patterns do you notice repeating in your close relationships? Do they remind you of anything from your past?",
    category: 'unconscious',
    probes: ['repetition compulsion', 'transference patterns', 'object relations'],
  },
  {
    id: 20,
    question: "If your unconscious mind could speak directly to you, what do you think it would want you to know or face?",
    category: 'unconscious',
    probes: ['repressed content', 'unconscious wishes', 'self-insight'],
  },
];

// Result structure for Freudian assessment
export interface FreudianResults {
  // Structural model scores (0-100)
  idStrength: number;
  egoStrength: number;
  superegoStrength: number;
  
  // Balance indicators
  structuralBalance: 'id-dominant' | 'ego-dominant' | 'superego-dominant' | 'balanced' | 'conflicted';
  
  // Defense style
  primaryDefenses: string[];
  defenseMaturity: 'primitive' | 'neurotic' | 'mature';
  
  // Core dynamics
  coreConflicts: string[];
  unconsciousThemes: string[];
  
  // Summary
  profileSummary: string;
  strengths: string[];
  growthAreas: string[];
  
  // Raw answers for reference
  answers: { questionId: number; answer: string }[];
}

export const categoryLabels: Record<FreudianQuestion['category'], string> = {
  id: 'Primal Drives',
  ego: 'Reality Adaptation',
  superego: 'Moral Conscience',
  defense: 'Defense Mechanisms',
  unconscious: 'Unconscious Patterns',
};
