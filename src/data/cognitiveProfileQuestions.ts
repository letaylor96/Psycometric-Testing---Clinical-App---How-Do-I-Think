// Cognitive Profile question bank — 40 items, 10 categories, 5-point Likert.
// Items paraphrased from published instruments (see basis in cognitiveProfileArchetypes.CATEGORIES).
// Not a verbatim reproduction of any copyrighted scale.

import { ARCHETYPES, CATEGORIES, CategoryKey, ArchetypeKey, ARCHETYPE_BY_KEY } from './cognitiveProfileArchetypes';

export interface CPQuestion {
  id: number;
  category: CategoryKey;
  text: string;
  reversed?: boolean;
}

export const COGNITIVE_PROFILE_SCALE = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
] as const;

export const CP_QUESTIONS: CPQuestion[] = [
  // Information processing (4)
  { id: 1, category: 'info_processing', text: 'I understand new ideas more easily when I can see them drawn or diagrammed.' },
  { id: 2, category: 'info_processing', text: 'I remember information better when I encounter it in more than one format (text, visual, audio).' },
  { id: 3, category: 'info_processing', text: 'I find long blocks of unbroken text hard to absorb.' },
  { id: 4, category: 'info_processing', text: 'I prefer to read a detailed written explanation before looking at examples.', reversed: true },

  // Learning style (4)
  { id: 5, category: 'learning_style', text: 'I learn best by trying something and adjusting as I go.' },
  { id: 6, category: 'learning_style', text: 'I prefer to observe and reflect before I act in a new situation.' },
  { id: 7, category: 'learning_style', text: 'A worked example is more useful to me than an abstract explanation.' },
  { id: 8, category: 'learning_style', text: 'I learn well from group discussion and dialogue.' },

  // Problem-solving approach (4)
  { id: 9, category: 'problem_solving', text: 'When facing a new problem, my first instinct is to break it into parts and analyze it.' },
  { id: 10, category: 'problem_solving', text: 'I often find unconventional solutions that others have not considered.' },
  { id: 11, category: 'problem_solving', text: 'I focus on what will work in practice, even if it is not the most elegant answer.' },
  { id: 12, category: 'problem_solving', text: 'I prefer to follow a known method rather than invent a new one.', reversed: true },

  // Communication style (4)
  { id: 13, category: 'communication', text: 'I think more clearly when I talk an idea through with someone.' },
  { id: 14, category: 'communication', text: 'I tend to get straight to the point in conversations and writing.' },
  { id: 15, category: 'communication', text: 'I pay close attention to how people are feeling, not just what they are saying.' },
  { id: 16, category: 'communication', text: 'I find it easier to write my ideas than to speak them.', reversed: true },

  // Structure & organization needs (4)
  { id: 17, category: 'structure_need', text: 'I work best when my day has a clear plan and priorities.' },
  { id: 18, category: 'structure_need', text: 'I feel uncomfortable when expectations or deadlines are unclear.' },
  { id: 19, category: 'structure_need', text: 'I keep my workspace and files highly organized.' },
  { id: 20, category: 'structure_need', text: 'I am comfortable starting work without a clear plan and figuring it out as I go.', reversed: true },

  // Comfort with ambiguity (4)
  { id: 21, category: 'ambiguity_tolerance', text: 'I enjoy problems that do not have a single right answer.' },
  { id: 22, category: 'ambiguity_tolerance', text: 'I can stay focused on a question even when I am not sure where it will lead.' },
  { id: 23, category: 'ambiguity_tolerance', text: 'I find it stressful when situations are unclear or open-ended.', reversed: true },
  { id: 24, category: 'ambiguity_tolerance', text: 'I am comfortable changing direction when new information arrives.' },

  // Creative & divergent thinking (4)
  { id: 25, category: 'divergent_thinking', text: 'I can usually come up with many possible solutions to a problem.' },
  { id: 26, category: 'divergent_thinking', text: 'I often notice connections between ideas from very different fields.' },
  { id: 27, category: 'divergent_thinking', text: 'I prefer to refine and improve an existing approach rather than invent a new one.', reversed: true },
  { id: 28, category: 'divergent_thinking', text: 'I enjoy brainstorming and generating ideas, even ones I will not use.' },

  // Technology & AI readiness (4)
  { id: 29, category: 'ai_readiness', text: 'I am curious to learn what AI tools can do for my work.' },
  { id: 30, category: 'ai_readiness', text: 'I am comfortable trying new software without being shown first.' },
  { id: 31, category: 'ai_readiness', text: 'I worry that AI tools will produce work I cannot trust.', reversed: true },
  { id: 32, category: 'ai_readiness', text: 'I look for ways to automate tasks I find repetitive.' },

  // Support preferences (4)
  { id: 33, category: 'support_pref', text: 'I make better progress when I have regular check-ins with someone.' },
  { id: 34, category: 'support_pref', text: 'Step-by-step instructions help me get started faster.' },
  { id: 35, category: 'support_pref', text: 'I prefer to figure things out independently rather than ask for help.', reversed: true },
  { id: 36, category: 'support_pref', text: 'Templates and examples make a noticeable difference to my output.' },

  // Program-fit indicators (4)
  { id: 37, category: 'program_fit', text: 'I enjoy thinking hard about ideas, even when there is no immediate use for them.' },
  { id: 38, category: 'program_fit', text: 'When I commit to learning something new, I usually see it through.' },
  { id: 39, category: 'program_fit', text: 'I am confident in my ability to handle unexpected challenges.' },
  { id: 40, category: 'program_fit', text: 'I would rather avoid tasks that require sustained mental effort.', reversed: true },
];

// Sections grouped for the quiz UI.
export const CP_SECTIONS = CATEGORIES.map((cat) => ({
  ...cat,
  questions: CP_QUESTIONS.filter((q) => q.category === cat.key),
}));

export const CP_TOTAL_QUESTIONS = CP_QUESTIONS.length;

export interface ArchetypeScore {
  key: ArchetypeKey;
  label: string;
  score: number; // 0–100
}

export interface CognitiveProfileResults {
  primary: ArchetypeScore;
  secondary: ArchetypeScore | null;
  archetypeScores: ArchetypeScore[]; // full sorted desc
  categoryScores: Array<{ key: CategoryKey; label: string; score: number; basis: string; description: string }>;
  completedAt: number;
}

/**
 * Score answers and produce a CognitiveProfileResults object.
 * @param answers Map of questionId -> 1..5 (matches COGNITIVE_PROFILE_SCALE values)
 */
export function calculateCognitiveProfile(answers: Record<number, number>): CognitiveProfileResults {
  // 1. Per-category normalized score 0–100.
  const categoryScores = CATEGORIES.map((cat) => {
    const items = CP_QUESTIONS.filter((q) => q.category === cat.key);
    const sum = items.reduce((acc, q) => {
      const raw = answers[q.id] ?? 3; // neutral default
      const v = q.reversed ? 6 - raw : raw;
      return acc + v;
    }, 0);
    const min = items.length * 1;
    const max = items.length * 5;
    const score = Math.round(((sum - min) / (max - min)) * 100);
    return { key: cat.key, label: cat.label, score, basis: cat.basis, description: cat.description };
  });

  const byKey: Record<CategoryKey, number> = categoryScores.reduce(
    (acc, c) => ({ ...acc, [c.key]: c.score }),
    {} as Record<CategoryKey, number>,
  );

  // 2. Archetype scores = weighted mean of category scores.
  const archetypeScores: ArchetypeScore[] = ARCHETYPES.map((a) => {
    const totalWeight = Object.values(a.weights).reduce((s, w) => s + w, 0);
    const weighted = (Object.keys(a.weights) as CategoryKey[]).reduce((s, k) => s + a.weights[k] * byKey[k], 0);
    const score = totalWeight > 0 ? Math.round(weighted / totalWeight) : 0;
    return { key: a.key, label: a.label, score };
  }).sort((a, b) => b.score - a.score);

  const primary = archetypeScores[0];
  const secondCandidate = archetypeScores[1];
  // Secondary qualifies only if within 15 pts of primary.
  const secondary = secondCandidate && primary.score - secondCandidate.score <= 15 ? secondCandidate : null;

  return {
    primary,
    secondary,
    archetypeScores,
    categoryScores,
    completedAt: Date.now(),
  };
}

export { ARCHETYPE_BY_KEY };
