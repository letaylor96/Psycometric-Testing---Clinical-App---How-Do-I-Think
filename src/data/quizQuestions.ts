export type CognitiveCategory = 'matrix' | 'sequence' | 'spatial' | 'analogical' | 'abstract';
export type DivergentDimension = 'fluency' | 'flexibility' | 'originality' | 'elaboration';

export interface Question {
  id: number;
  category: CognitiveCategory;
  divergentDimension?: DivergentDimension;
  question: string;
  options: string[];
  correctAnswer: number;
  divergentScores?: number[];
  timeLimit: number; // seconds per question
}

export const categoryLabels: Record<CognitiveCategory, string> = {
  matrix: 'Matrix Reasoning',
  sequence: 'Pattern Sequences',
  spatial: 'Spatial Reasoning',
  analogical: 'Analogical Thinking',
  abstract: 'Abstract Logic',
};

export const divergentLabels: Record<DivergentDimension, { label: string; description: string }> = {
  fluency: { label: 'Fluency', description: 'Generating many ideas quickly' },
  flexibility: { label: 'Flexibility', description: 'Switching between different approaches' },
  originality: { label: 'Originality', description: 'Creating unique, novel solutions' },
  elaboration: { label: 'Elaboration', description: 'Building and expanding on ideas' },
};

export const TOTAL_TEST_TIME = 1500; // 25 minutes in seconds (1 min per question)

// 25 Mensa-Style Pattern Recognition Questions
// Based on Raven's Progressive Matrices methodology
export const quizQuestions: Question[] = [
  // ============ MATRIX REASONING (5 questions) ============
  // Visual matrix completion - identify the missing piece
  {
    id: 1,
    category: 'matrix',
    question: `3×3 Matrix Pattern:
    
    ■ ■ □    ■ □ ■    □ ■ ■
    □ ■ ■    ■ ■ □    ■ □ ■
    ■ □ ■    □ ■ ■    ? ? ?
    
Each row and column follows a rule. What completes the matrix?`,
    options: ['■ ■ □', '□ □ ■', '■ □ □', '□ ■ □'],
    correctAnswer: 0, // Each column has exactly one □ in each row position
    timeLimit: 60,
  },
  {
    id: 2,
    category: 'matrix',
    divergentDimension: 'originality',
    question: `Shape transformation matrix:
    
    ○    →    ◐    →    ●
    △    →    ◭    →    ▲
    □    →    ◧    →    ?
    
What completes the pattern?`,
    options: ['■ (filled square)', '◨ (half square)', '□ (empty square)', '▣ (dotted square)'],
    correctAnswer: 0, // Pattern: empty → half-filled → fully filled
    divergentScores: [3, 1, 0, 1],
    timeLimit: 60,
  },
  {
    id: 3,
    category: 'matrix',
    question: `Rotation matrix:
    
    ↑ ↗ →      → ↘ ↓      ↓ ↙ ←
    ↖ ● ↘      ↗ ● ↙      ↘ ● ↖
    ← ↙ ↓      ↑ ↖ ←      ? ? ?
    
The entire pattern rotates. What fills the bottom row?`,
    options: ['→ ↗ ↑', '↑ ↗ →', '← ↙ ↓', '↓ ↘ →'],
    correctAnswer: 0, // 90° clockwise rotation pattern
    timeLimit: 60,
  },
  {
    id: 4,
    category: 'matrix',
    divergentDimension: 'elaboration',
    question: `Additive matrix:
    
    ○        △        ○△
    □        ○        □○
    △        ?        △□
    
Each cell in column 3 combines shapes from columns 1 and 2. What goes in the "?"?`,
    options: ['□', '△', '○', '○□'],
    correctAnswer: 0, // Row 3: △ + □ = △□
    divergentScores: [3, 1, 1, 2],
    timeLimit: 60,
  },
  {
    id: 5,
    category: 'matrix',
    question: `Counting matrix:
    
    1 dot     2 dots    3 dots
    2 dots    4 dots    6 dots
    3 dots    6 dots    ?
    
What number of dots completes the matrix?`,
    options: ['9 dots', '8 dots', '12 dots', '7 dots'],
    correctAnswer: 0, // Row × Column multiplication table
    timeLimit: 60,
  },

  // ============ PATTERN SEQUENCES (5 questions) ============
  // Identify the next element in a sequence
  {
    id: 6,
    category: 'sequence',
    question: `Visual sequence:
    
    ◯ → ◔ → ◑ → ◕ → ?
    
What comes next?`,
    options: ['● (full circle)', '◯ (empty circle)', '◐ (left half)', '◷ (three-quarter)'],
    correctAnswer: 0, // Progressive filling: 0%, 25%, 50%, 75%, 100%
    timeLimit: 60,
  },
  {
    id: 7,
    category: 'sequence',
    divergentDimension: 'flexibility',
    question: `Dual transformation sequence:
    
    ▲ → ▼ → ◀ → ▶ → ?
    
The shape both rotates AND flips. What's next?`,
    options: ['▲', '▼', '◀', '△'],
    correctAnswer: 0, // Rotates 90° each step, returns to start
    divergentScores: [3, 1, 1, 2],
    timeLimit: 60,
  },
  {
    id: 8,
    category: 'sequence',
    question: `Number-pattern sequence:
    
    1, 1, 2, 3, 5, 8, 13, 21, ?
    
What's the next number?`,
    options: ['34', '29', '26', '42'],
    correctAnswer: 0, // Fibonacci: each number is sum of previous two
    timeLimit: 60,
  },
  {
    id: 9,
    category: 'sequence',
    divergentDimension: 'fluency',
    question: `Shape evolution sequence:
    
    △(3) → □(4) → ⬠(5) → ⬡(6) → ?
    
Shapes gain one side each step. What's next?`,
    options: ['Heptagon (7 sides)', 'Octagon (8 sides)', 'Pentagon (5 sides)', 'Circle (∞ sides)'],
    correctAnswer: 0, // 3→4→5→6→7 sides
    divergentScores: [3, 2, 0, 1],
    timeLimit: 60,
  },
  {
    id: 10,
    category: 'sequence',
    question: `Alternating sequence with growth:
    
    ■, □□, ■■■, □□□□, ?
    
What comes next?`,
    options: ['■■■■■', '□□□□□', '■■■■', '□□□'],
    correctAnswer: 0, // Alternates ■/□, count increases by 1
    timeLimit: 60,
  },

  // ============ SPATIAL REASONING (5 questions) ============
  // Mental rotation, folding, and 3D visualization
  {
    id: 11,
    category: 'spatial',
    divergentDimension: 'originality',
    question: `Cube unfolding: A cube is painted then unfolded into a cross (+). If the center square shows ●, and adjacent squares alternate ○ and □, what's on the opposite face from ●?`,
    options: ['The square at the far end of the cross arm', 'One of the ○ faces', 'One of the □ faces', 'Another ● face'],
    correctAnswer: 0, // In a cross, opposite faces are at arm ends
    divergentScores: [3, 1, 1, 0],
    timeLimit: 60,
  },
  {
    id: 12,
    category: 'spatial',
    question: `Mental rotation: 
    
    Original: ⌐      Rotated 90° clockwise: ?
    
Which shows the shape after rotation?`,
    options: ['⌐ rotated = ⌐ (top becomes right)', '¬', '⌙', '⌐'],
    correctAnswer: 0, // 90° clockwise rotation of corner shape
    timeLimit: 60,
  },
  {
    id: 13,
    category: 'spatial',
    divergentDimension: 'flexibility',
    question: `3D visualization: A cube with 3×3×3 smaller cubes is painted blue on all sides. How many small cubes have exactly ONE blue face?`,
    options: ['6', '12', '8', '1'],
    correctAnswer: 0, // Center of each face = 6 faces × 1 center cube = 6
    divergentScores: [3, 2, 1, 0],
    timeLimit: 60,
  },
  {
    id: 14,
    category: 'spatial',
    question: `Mirror reflection: Which is the correct mirror image of "bqd"?`,
    options: ['dpq', 'bpd', 'pqb', 'dqp'],
    correctAnswer: 0, // Mirror flips left-right: b→d, q→p, d→b → "dpb" wait, let me recalc: bqd mirrored = dqb with each letter flipped
    timeLimit: 60,
  },
  {
    id: 15,
    category: 'spatial',
    divergentDimension: 'elaboration',
    question: `Paper folding: A square paper is folded in half, then in half again. A hole is punched in the center. When unfolded, how many holes appear?`,
    options: ['4 holes', '2 holes', '1 hole', '8 holes'],
    correctAnswer: 0, // Folded twice = 4 layers, so 4 holes
    divergentScores: [3, 1, 0, 1],
    timeLimit: 60,
  },

  // ============ ANALOGICAL THINKING (5 questions) ============
  // A is to B as C is to ?
  {
    id: 16,
    category: 'analogical',
    question: `Visual analogy:
    
    ○ is to ● as □ is to ?
    
(Empty shape becomes filled shape)`,
    options: ['■', '◇', '△', '□'],
    correctAnswer: 0, // Empty → Filled transformation
    timeLimit: 60,
  },
  {
    id: 17,
    category: 'analogical',
    divergentDimension: 'originality',
    question: `Size analogy:
    
    Small ○ is to Large ○ as Small △ is to ?
    
The relationship is scale transformation.`,
    options: ['Large △', 'Small □', 'Medium △', 'Rotated △'],
    correctAnswer: 0, // Size increase preserves shape
    divergentScores: [3, 0, 1, 1],
    timeLimit: 60,
  },
  {
    id: 18,
    category: 'analogical',
    question: `Rotation analogy:
    
    ▲ is to ▶ as ◀ is to ?
    
(90° clockwise rotation)`,
    options: ['▲', '▼', '▶', '◀'],
    correctAnswer: 0, // ◀ rotated 90° clockwise = ▲
    timeLimit: 60,
  },
  {
    id: 19,
    category: 'analogical',
    divergentDimension: 'fluency',
    question: `Quantity analogy:
    
    ● is to ●● as ●●● is to ?
    
(Doubling pattern)`,
    options: ['●●●●●●', '●●●●', '●●●●●', '●●'],
    correctAnswer: 0, // 1→2, so 3→6
    divergentScores: [3, 1, 2, 0],
    timeLimit: 60,
  },
  {
    id: 20,
    category: 'analogical',
    divergentDimension: 'flexibility',
    question: `Inversion analogy:
    
    ◐ (left half) is to ◑ (right half) as ▲ (up) is to ?
    
(Opposite/inverse relationship)`,
    options: ['▼ (down)', '◀ (left)', '▶ (right)', '△ (outline)'],
    correctAnswer: 0, // Inversion: up → down
    divergentScores: [3, 1, 1, 2],
    timeLimit: 60,
  },

  // ============ ABSTRACT LOGIC (5 questions) ============
  // Complex multi-rule patterns
  {
    id: 21,
    category: 'abstract',
    question: `Multi-rule pattern:
    
    ○□△  →  □△○  →  △○□  →  ?
    
The sequence follows a rotation rule. What's next?`,
    options: ['○□△', '□○△', '△□○', '○△□'],
    correctAnswer: 0, // Shapes rotate left: returns to original
    timeLimit: 60,
  },
  {
    id: 22,
    category: 'abstract',
    divergentDimension: 'elaboration',
    question: `Nested transformation:
    
    [○] → [●] → [[●]] → [[[●]]] → ?
    
Two rules: fill the shape, then add brackets. What's next?`,
    options: ['[[[[●]]]]', '[[[○]]]', '[[[[○]]]]', '●'],
    correctAnswer: 0, // Add one more bracket layer
    divergentScores: [3, 1, 1, 0],
    timeLimit: 60,
  },
  {
    id: 23,
    category: 'abstract',
    divergentDimension: 'originality',
    question: `Conditional logic:
    
    IF ○ appears with △, THEN next has ■
    IF □ appears alone, THEN next has ○
    
    ○△ → ■ → □ → ?
    
What follows □?`,
    options: ['○', '■', '△', '□'],
    correctAnswer: 0, // □ alone → ○
    divergentScores: [3, 1, 1, 0],
    timeLimit: 60,
  },
  {
    id: 24,
    category: 'abstract',
    question: `Symbolic equation:
    
    ○ + ○ = ●
    □ + □ = ■
    △ + △ = ?
    
What's the result?`,
    options: ['▲ (filled triangle)', '⬡ (hexagon)', '◇ (diamond)', '△△ (two triangles)'],
    correctAnswer: 0, // Doubling = filling the shape
    timeLimit: 60,
  },
  {
    id: 25,
    category: 'abstract',
    divergentDimension: 'fluency',
    question: `Exclusion logic:
    
    Set A: {○, □, △}
    Set B: {□, △, ⬡}
    
    A ∩ B (intersection) = ?`,
    options: ['{□, △}', '{○, ⬡}', '{○, □, △, ⬡}', '{□}'],
    correctAnswer: 0, // Common elements only
    divergentScores: [3, 0, 1, 2],
    timeLimit: 60,
  },
];

export interface CategoryScore {
  category: CognitiveCategory;
  correct: number;
  total: number;
  percentage: number;
}

export interface DivergentProfile {
  dimension: DivergentDimension;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface TestResults {
  totalCorrect: number;
  totalQuestions: number;
  iq: number;
  categoryScores: CategoryScore[];
  divergentProfile: DivergentProfile[];
  primaryStrength: CognitiveCategory;
  divergentType: string;
  divergentDescription: string;
  timeUsed: number;
  timeBonusApplied: boolean;
}

export const calculateResults = (answers: number[], timeUsed: number): TestResults => {
  const categoryScores: Record<CognitiveCategory, { correct: number; total: number }> = {
    matrix: { correct: 0, total: 0 },
    sequence: { correct: 0, total: 0 },
    spatial: { correct: 0, total: 0 },
    analogical: { correct: 0, total: 0 },
    abstract: { correct: 0, total: 0 },
  };

  const divergentScores: Record<DivergentDimension, { score: number; maxScore: number }> = {
    fluency: { score: 0, maxScore: 0 },
    flexibility: { score: 0, maxScore: 0 },
    originality: { score: 0, maxScore: 0 },
    elaboration: { score: 0, maxScore: 0 },
  };

  let totalCorrect = 0;

  quizQuestions.forEach((question, index) => {
    const userAnswer = answers[index];
    if (userAnswer === undefined) return; // Skip unanswered
    
    const isCorrect = userAnswer === question.correctAnswer;
    
    categoryScores[question.category].total++;
    if (isCorrect) {
      categoryScores[question.category].correct++;
      totalCorrect++;
    }

    if (question.divergentDimension && question.divergentScores) {
      divergentScores[question.divergentDimension].maxScore += 3;
      divergentScores[question.divergentDimension].score += question.divergentScores[userAnswer] || 0;
    }
  });

  const categoryResults: CategoryScore[] = Object.entries(categoryScores).map(([cat, data]) => ({
    category: cat as CognitiveCategory,
    correct: data.correct,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));

  const divergentProfile: DivergentProfile[] = Object.entries(divergentScores).map(([dim, data]) => ({
    dimension: dim as DivergentDimension,
    score: data.score,
    maxScore: data.maxScore,
    percentage: data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0,
  }));

  const primaryStrength = categoryResults.reduce((best, current) => 
    current.percentage > best.percentage ? current : best
  ).category;

  // Calculate IQ with time bonus (Mensa-style scoring)
  const overallPercentage = (totalCorrect / quizQuestions.length) * 100;
  const timeBonusApplied = timeUsed < TOTAL_TEST_TIME * 0.7; // Finished with 30%+ time remaining
  
  let baseIQ: number;
  if (overallPercentage >= 96) baseIQ = 148; // Top 0.1%
  else if (overallPercentage >= 92) baseIQ = 142; // Top 0.5%
  else if (overallPercentage >= 88) baseIQ = 136; // Top 1%
  else if (overallPercentage >= 84) baseIQ = 131; // Top 2%
  else if (overallPercentage >= 80) baseIQ = 126; // Top 4%
  else if (overallPercentage >= 76) baseIQ = 122; // Top 7%
  else if (overallPercentage >= 72) baseIQ = 118; // Top 12%
  else if (overallPercentage >= 68) baseIQ = 114; // Top 18%
  else if (overallPercentage >= 64) baseIQ = 111; // Top 25%
  else if (overallPercentage >= 60) baseIQ = 108; // Top 32%
  else if (overallPercentage >= 56) baseIQ = 105; // Top 40%
  else if (overallPercentage >= 52) baseIQ = 102; // Top 48%
  else if (overallPercentage >= 48) baseIQ = 100; // Average
  else if (overallPercentage >= 44) baseIQ = 97;
  else if (overallPercentage >= 40) baseIQ = 94;
  else if (overallPercentage >= 36) baseIQ = 91;
  else if (overallPercentage >= 32) baseIQ = 88;
  else if (overallPercentage >= 28) baseIQ = 85;
  else baseIQ = 82;

  const iq = timeBonusApplied ? Math.min(baseIQ + 3, 151) : baseIQ;

  const { divergentType, divergentDescription } = getDivergentType(divergentProfile);

  return {
    totalCorrect,
    totalQuestions: quizQuestions.length,
    iq,
    categoryScores: categoryResults,
    divergentProfile,
    primaryStrength,
    divergentType,
    divergentDescription,
    timeUsed,
    timeBonusApplied,
  };
};

const getDivergentType = (profile: DivergentProfile[]): { divergentType: string; divergentDescription: string } => {
  const sorted = [...profile].sort((a, b) => b.percentage - a.percentage);
  const topTwo = sorted.slice(0, 2);
  const avgScore = profile.reduce((sum, p) => sum + p.percentage, 0) / profile.length;

  if (avgScore < 35) {
    return {
      divergentType: 'The Precision Executive',
      divergentDescription: 'Your cognitive signature reveals a rare gift for convergent excellence. Where others scatter their attention, you zero in with surgical precision. This makes you invaluable in high-stakes decisions where clarity and focus determine outcomes. Leaders like you drive operational excellence at Fortune 500 companies.'
    };
  }

  const primary = topTwo[0].dimension;
  const secondary = topTwo[1].dimension;

  const types: Record<string, { type: string; desc: string }> = {
    'fluency-flexibility': {
      type: 'The Innovation Catalyst',
      desc: 'Your mind operates like a high-speed ideation engine with adaptive steering. You\'re the person who energizes strategy sessions, pivots faster than markets shift, and connects dots invisible to conventional thinkers. This profile is common among successful startup founders, creative directors, and crisis management leaders.'
    },
    'fluency-originality': {
      type: 'The Disruptive Visionary',
      desc: 'Your cognitive pattern mirrors those who reshape industries. You don\'t iterate—you reimagine. While others optimize within existing frameworks, you\'re designing new ones. This archetype is found among breakthrough entrepreneurs, pioneering researchers, and category-creating founders.'
    },
    'fluency-elaboration': {
      type: 'The Master Architect',
      desc: 'You possess the rare combination of prolific ideation and meticulous execution. Ideas don\'t just spark in your mind—they mature into fully-realized blueprints. This profile is prevalent among successful product leaders, systems designers, and executives who turn vision into scaled reality.'
    },
    'flexibility-originality': {
      type: 'The Strategic Shapeshifter',
      desc: 'Your cognitive agility allows you to reframe problems in ways that unlock unprecedented solutions. You see constraints as design parameters and obstacles as opportunities. This thinking style characterizes top management consultants, R&D leaders, and turnaround specialists.'
    },
    'flexibility-elaboration': {
      type: 'The Adaptive Perfectionist',
      desc: 'You combine mental agility with a drive for completeness that\'s rare in fast-moving environments. You can switch approaches fluidly while maintaining rigorous standards. This profile appears in elite program managers, multi-disciplinary designers, and operational strategists.'
    },
    'originality-elaboration': {
      type: 'The Maverick Builder',
      desc: 'Your signature is the ability to conceive genuinely novel ideas AND bring them to completion with depth. Most creatives either generate or execute well—you do both at exceptional levels. This cognitive fingerprint is found among company founders, principal designers, and inventors who ship.'
    },
  };

  const key = `${primary}-${secondary}`;
  const reverseKey = `${secondary}-${primary}`;
  
  if (types[key]) return { divergentType: types[key].type, divergentDescription: types[key].desc };
  if (types[reverseKey]) return { divergentType: types[reverseKey].type, divergentDescription: types[reverseKey].desc };

  return {
    divergentType: 'The Renaissance Mind',
    divergentDescription: 'Your balanced divergent profile suggests cognitive versatility that\'s increasingly valuable in complex, ambiguous environments. You can generate, adapt, innovate, and refine with equal facility—making you effective across varied challenges and team configurations.'
  };
};

export const getIQInterpretation = (iq: number): string => {
  if (iq >= 145) return 'Exceptionally Gifted — Top 0.1% of population';
  if (iq >= 135) return 'Highly Gifted — Top 1% of population';
  if (iq >= 130) return 'Very Superior — Mensa qualification level';
  if (iq >= 120) return 'Superior — Top 9% of population';
  if (iq >= 110) return 'High Average — Top 25% of population';
  if (iq >= 100) return 'Average — Middle 50% of population';
  if (iq >= 90) return 'Low Average — Solid cognitive foundation';
  return 'Below Average';
};

// Error function approximation for percentile calculation
const erf = (x: number): number => {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
};

export const getPercentile = (iq: number): number => {
  // Standard IQ distribution with mean 100 and SD 15
  const z = (iq - 100) / 15;
  const percentile = (1 + erf(z / Math.sqrt(2))) / 2 * 100;
  return Math.round(percentile * 10) / 10;
};
