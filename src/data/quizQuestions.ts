export type CognitiveCategory = 'number_sequence' | 'shape_pattern' | 'matrix' | 'spatial' | 'abstract';
export type DivergentDimension = 'fluency' | 'flexibility' | 'originality' | 'elaboration';

export interface Question {
  id: number;
  category: CognitiveCategory;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert' | 'genius'; // IQ ranges: 85-100, 100-115, 115-130, 130-145, 145+
  divergentDimension?: DivergentDimension;
  question: string;
  options: string[];
  correctAnswer: number;
  divergentScores?: number[];
  timeLimit: number;
}

export const categoryLabels: Record<CognitiveCategory, string> = {
  number_sequence: 'Number Sequences',
  shape_pattern: 'Shape Patterns',
  matrix: 'Matrix Reasoning',
  spatial: 'Spatial Reasoning',
  abstract: 'Abstract Logic',
};

export const divergentLabels: Record<DivergentDimension, { label: string; description: string }> = {
  fluency: { label: 'Fluency', description: 'Generating many ideas quickly' },
  flexibility: { label: 'Flexibility', description: 'Switching between different approaches' },
  originality: { label: 'Originality', description: 'Creating unique, novel solutions' },
  elaboration: { label: 'Elaboration', description: 'Building and expanding on ideas' },
};

export const TIME_PER_QUESTION = 30; // 30 seconds per question
export const TOTAL_TEST_TIME = 25 * TIME_PER_QUESTION; // 25 questions × 30 seconds = 750 seconds (12.5 min)

// 25 Progressive IQ Questions - Mensa-Style Pattern Recognition
// Based on official Mensa admission test formats: Raven's Matrices, number sequences, spatial reasoning
export const quizQuestions: Question[] = [
  // ============ LEVEL 1: EASY (IQ 85-100) ============
  // Foundational patterns - accessible to most test-takers
  {
    id: 1,
    category: 'number_sequence',
    difficulty: 'easy',
    question: `What number comes next?

    2, 4, 6, 8, ?`,
    options: ['10', '9', '12', '11'],
    correctAnswer: 0, // +2 each time
    timeLimit: 45,
  },
  {
    id: 2,
    category: 'matrix',
    difficulty: 'easy',
    question: `Complete the 3×3 grid. Each row and column contains ○, △, □ exactly once.

    ○    △    □
    △    □    ○
    □    ○    ?`,
    options: ['△', '○', '□', '●'],
    correctAnswer: 0, // Latin square completion
    timeLimit: 45,
  },
  {
    id: 3,
    category: 'number_sequence',
    difficulty: 'easy',
    question: `What number comes next?

    3, 6, 9, 12, ?`,
    options: ['15', '14', '18', '13'],
    correctAnswer: 0, // +3 each time (multiples of 3)
    timeLimit: 45,
  },
  {
    id: 4,
    category: 'shape_pattern',
    difficulty: 'easy',
    question: `What comes next in the rotation sequence?

    ⬆ → ➡ → ⬇ → ?`,
    options: ['⬅ (Left)', '⬆ (Up)', '↗ (Diagonal)', '⬇ (Down)'],
    correctAnswer: 0, // 90° clockwise rotation
    timeLimit: 45,
  },
  {
    id: 5,
    category: 'number_sequence',
    difficulty: 'easy',
    question: `What number comes next?

    1, 2, 4, 8, ?`,
    options: ['16', '10', '12', '15'],
    correctAnswer: 0, // ×2 each time (powers of 2)
    timeLimit: 45,
  },

  // ============ LEVEL 2: MEDIUM (IQ 100-115) ============
  // Standard Mensa-style questions requiring pattern detection
  {
    id: 6,
    category: 'matrix',
    difficulty: 'medium',
    question: `In each row, the third figure combines elements from the first two. What goes in the blank?

    ○    ●    ◐
    △    ▲    ◭
    □    ■    ?`,
    options: ['◧ (Half-filled square)', '□ (Empty)', '■ (Filled)', '▣ (Dotted)'],
    correctAnswer: 0, // Pattern: empty + filled = half-filled
    timeLimit: 60,
  },
  {
    id: 7,
    category: 'number_sequence',
    difficulty: 'medium',
    question: `What number comes next?

    2, 5, 10, 17, 26, ?`,
    options: ['37', '35', '38', '40'],
    correctAnswer: 0, // n² + 1: 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26, 6²+1=37
    timeLimit: 60,
  },
  {
    id: 8,
    category: 'spatial',
    difficulty: 'medium',
    divergentDimension: 'fluency',
    question: `Which shape is the odd one out?

    A: ◇ (Diamond rotated 45°)
    B: □ (Square)
    C: ▭ (Rectangle)
    D: △ (Triangle)`,
    options: ['D - Triangle (3 sides, others have 4)', 'A - Diamond (rotated)', 'B - Square (regular)', 'C - Rectangle (elongated)'],
    correctAnswer: 0, // Triangle has 3 sides, others have 4
    divergentScores: [3, 1, 1, 1],
    timeLimit: 60,
  },
  {
    id: 9,
    category: 'number_sequence',
    difficulty: 'medium',
    question: `What number comes next?

    1, 4, 9, 16, 25, ?`,
    options: ['36', '30', '35', '49'],
    correctAnswer: 0, // Perfect squares: 1², 2², 3², 4², 5², 6²
    timeLimit: 60,
  },
  {
    id: 10,
    category: 'matrix',
    difficulty: 'medium',
    divergentDimension: 'flexibility',
    question: `In this 3×3 matrix, each row follows a rule. What goes in the blank?

    2    4    6
    3    6    9
    5    10   ?`,
    options: ['15', '20', '12', '25'],
    correctAnswer: 0, // Each row: n, 2n, 3n
    divergentScores: [3, 1, 2, 0],
    timeLimit: 60,
  },

  // ============ LEVEL 3: HARD (IQ 115-130) ============
  // Multi-rule patterns and complex transformations
  {
    id: 11,
    category: 'number_sequence',
    difficulty: 'hard',
    question: `What number comes next?

    1, 1, 2, 3, 5, 8, 13, ?`,
    options: ['21', '18', '20', '15'],
    correctAnswer: 0, // Fibonacci: each = sum of previous two
    timeLimit: 60,
  },
  {
    id: 12,
    category: 'matrix',
    difficulty: 'hard',
    divergentDimension: 'originality',
    question: `In this Mensa-style matrix, shapes transform across rows. What completes it?

    Row 1: ○ with 1 dot → ○ with 2 dots → ○ with 3 dots
    Row 2: □ with 1 line → □ with 2 lines → □ with 3 lines  
    Row 3: △ with 1 dot → △ with 2 dots → ?`,
    options: ['△ with 3 dots', '△ with 4 dots', '△ with 1 dot', '□ with 3 dots'],
    correctAnswer: 0, // Pattern: add one element per column
    divergentScores: [3, 1, 0, 1],
    timeLimit: 60,
  },
  {
    id: 13,
    category: 'number_sequence',
    difficulty: 'hard',
    question: `What number comes next?

    2, 6, 12, 20, 30, ?`,
    options: ['42', '40', '44', '36'],
    correctAnswer: 0, // n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42
    timeLimit: 60,
  },
  {
    id: 14,
    category: 'spatial',
    difficulty: 'hard',
    divergentDimension: 'flexibility',
    question: `A square paper is folded in half, then in half again. A single hole is punched through all layers. When unfolded, how many holes are there?`,
    options: ['4', '2', '8', '1'],
    correctAnswer: 0, // 2 folds = 4 layers = 4 holes
    divergentScores: [3, 1, 2, 0],
    timeLimit: 60,
  },
  {
    id: 15,
    category: 'matrix',
    difficulty: 'hard',
    question: `Complete this Raven's-style matrix. Each row shows a transformation:

    ○ → ◐ → ●
    □ → ◧ → ■
    △ → ◭ → ?`,
    options: ['▲ (Filled triangle)', '△ (Empty)', '◭ (Half)', '▽ (Inverted)'],
    correctAnswer: 0, // Empty → Half-filled → Filled
    timeLimit: 60,
  },

  // ============ LEVEL 4: EXPERT (IQ 130-145) ============
  // Complex multi-dimensional reasoning
  {
    id: 16,
    category: 'number_sequence',
    difficulty: 'expert',
    question: `What number comes next?

    2, 3, 5, 7, 11, 13, ?`,
    options: ['17', '15', '19', '14'],
    correctAnswer: 0, // Prime numbers
    timeLimit: 75,
  },
  {
    id: 17,
    category: 'matrix',
    difficulty: 'expert',
    divergentDimension: 'elaboration',
    question: `In this matrix, each cell = row number × column number. What is the missing value?

    1    2    3
    2    4    6
    3    6    ?`,
    options: ['9', '8', '12', '7'],
    correctAnswer: 0, // 3 × 3 = 9
    divergentScores: [3, 1, 2, 0],
    timeLimit: 75,
  },
  {
    id: 18,
    category: 'number_sequence',
    difficulty: 'expert',
    question: `What number comes next?

    1, 2, 6, 24, 120, ?`,
    options: ['720', '600', '240', '144'],
    correctAnswer: 0, // Factorials: 1!, 2!, 3!, 4!, 5!, 6!
    timeLimit: 75,
  },
  {
    id: 19,
    category: 'abstract',
    difficulty: 'expert',
    divergentDimension: 'originality',
    question: `If these symbols follow a rule:
    
    ★ = 5, ◆ = 3, ● = 2
    
    What is ★ + ◆ × ● = ?`,
    options: ['11', '16', '13', '10'],
    correctAnswer: 0, // Order of operations: 5 + (3 × 2) = 5 + 6 = 11
    divergentScores: [3, 1, 1, 0],
    timeLimit: 75,
  },
  {
    id: 20,
    category: 'spatial',
    difficulty: 'expert',
    question: `A cube is painted red on all sides, then cut into 27 smaller cubes (3×3×3). How many small cubes have exactly 2 painted faces?`,
    options: ['12', '8', '6', '24'],
    correctAnswer: 0, // Edge cubes (not corners): 12 edges × 1 cube each = 12
    timeLimit: 75,
  },

  // ============ LEVEL 5: GENIUS (IQ 145+) ============
  // Exceptional pattern recognition - Mensa qualifying level
  {
    id: 21,
    category: 'number_sequence',
    difficulty: 'genius',
    divergentDimension: 'fluency',
    question: `What number comes next? (Look-and-Say sequence)

    1, 11, 21, 1211, 111221, ?`,
    options: ['312211', '122211', '211211', '112121'],
    correctAnswer: 0, // Describe what you see: "three 1s, two 2s, one 1"
    divergentScores: [3, 1, 1, 0],
    timeLimit: 90,
  },
  {
    id: 22,
    category: 'abstract',
    difficulty: 'genius',
    question: `Complete the pattern (sum of cubes):

    1³ + 2³ = 9 = 3²
    1³ + 2³ + 3³ = 36 = 6²
    1³ + 2³ + 3³ + 4³ = 100 = 10²
    1³ + 2³ + 3³ + 4³ + 5³ = ? = 15²`,
    options: ['225', '200', '250', '175'],
    correctAnswer: 0, // Sum of first n cubes = (n(n+1)/2)²
    timeLimit: 90,
  },
  {
    id: 23,
    category: 'number_sequence',
    difficulty: 'genius',
    divergentDimension: 'flexibility',
    question: `What number comes next? (Tribonacci sequence)

    0, 1, 1, 2, 4, 7, 13, ?`,
    options: ['24', '20', '21', '26'],
    correctAnswer: 0, // Sum of previous 3: 2+4+7=13, 4+7+13=24
    divergentScores: [3, 1, 2, 0],
    timeLimit: 90,
  },
  {
    id: 24,
    category: 'matrix',
    difficulty: 'genius',
    divergentDimension: 'elaboration',
    question: `In this Mensa matrix, two operations occur: Row operation (+2) and Column operation (×2). Find the missing value:

        Col1   Col2   Col3
    R1:  1      2      4
    R2:  3      4      8
    R3:  5      6      ?`,
    options: ['12', '10', '14', '8'],
    correctAnswer: 0, // Column 3 = Column 2 × 2: 6 × 2 = 12
    divergentScores: [3, 2, 1, 0],
    timeLimit: 90,
  },
  {
    id: 25,
    category: 'abstract',
    difficulty: 'genius',
    question: `This sequence follows a hidden rule. What comes next?

    J, F, M, A, M, J, J, A, S, O, N, ?`,
    options: ['D', 'J', 'M', 'L'],
    correctAnswer: 0, // First letters of months: January→December
    timeLimit: 90,
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
    number_sequence: { correct: 0, total: 0 },
    shape_pattern: { correct: 0, total: 0 },
    matrix: { correct: 0, total: 0 },
    spatial: { correct: 0, total: 0 },
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
