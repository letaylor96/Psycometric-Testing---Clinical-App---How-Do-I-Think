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
  explanation: string; // Explanation for the correct answer (shown in premium review)
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

// ═══════════════════════════════════════════════════════════════════════════════
// 25 PROGRESSIVE IQ QUESTIONS - Professional Psychometric Assessment
// ═══════════════════════════════════════════════════════════════════════════════
// Based on established cognitive assessment frameworks:
// • Raven's Progressive Matrices (non-verbal reasoning)
// • Wechsler Adult Intelligence Scale patterns (matrix completion)
// • Cattell Culture Fair Intelligence Test (fluid reasoning)
// • Mensa admission test formats (progressive difficulty)
//
// Question types follow validated psychometric categories:
// 1. Number Sequences - Mathematical pattern recognition
// 2. Matrix Reasoning - 3×3 grid completion (Raven's style)
// 3. Spatial Reasoning - Mental rotation and transformation
// 4. Abstract Logic - Rule inference and application
// ═══════════════════════════════════════════════════════════════════════════════

export const quizQuestions: Question[] = [
  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ LEVEL 1: FOUNDATIONAL (IQ 85-100) - ~50th percentile                      ║
  // ║ Simple single-rule patterns accessible to most test-takers                 ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  
  {
    id: 1,
    category: 'number_sequence',
    difficulty: 'easy',
    question: `Identify the pattern and find the missing number:

    2,  4,  6,  8,  __`,
    options: ['10', '9', '12', '11'],
    correctAnswer: 0, // Arithmetic progression: +2
    timeLimit: 30,
    explanation: 'This is an arithmetic progression where each number increases by 2. Starting from 2: 2+2=4, 4+2=6, 6+2=8, 8+2=10.',
  },
  {
    id: 2,
    category: 'matrix',
    difficulty: 'easy',
    question: `Each row and column must contain each symbol exactly once.
What belongs in the empty cell?

    ○   △   □
    △   □   ○
    □   ○   __`,
    options: ['△', '○', '□', '●'],
    correctAnswer: 0, // Latin square completion
    timeLimit: 30,
    explanation: 'This is a Latin Square puzzle. Row 3 already has □ and ○, so it needs △. Column 3 has □ and ○, confirming △ is the missing symbol.',
  },
  {
    id: 3,
    category: 'number_sequence',
    difficulty: 'easy',
    question: `What number continues this sequence?

    1,  3,  5,  7,  __`,
    options: ['9', '8', '10', '11'],
    correctAnswer: 0, // Odd numbers: +2
    timeLimit: 30,
    explanation: 'These are consecutive odd numbers. Each number increases by 2: 1, 3, 5, 7... The next odd number is 9.',
  },
  {
    id: 4,
    category: 'shape_pattern',
    difficulty: 'easy',
    question: `The arrow rotates 90° clockwise each step. What comes next?

    ↑  →  ↓  __`,
    options: ['← (Left)', '↑ (Up)', '↘ (Diagonal)', '→ (Right)'],
    correctAnswer: 0, // 90° clockwise rotation
    timeLimit: 30,
    explanation: 'The arrow rotates 90° clockwise each step: Up → Right → Down → Left. After pointing down (↓), the next rotation gives left (←).',
  },
  {
    id: 5,
    category: 'number_sequence',
    difficulty: 'easy',
    question: `Each number is double the previous. What comes next?

    1,  2,  4,  8,  __`,
    options: ['16', '10', '12', '15'],
    correctAnswer: 0, // Geometric progression: ×2
    timeLimit: 30,
    explanation: 'This is a geometric progression where each term is multiplied by 2: 1×2=2, 2×2=4, 4×2=8, 8×2=16.',
  },

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ LEVEL 2: STANDARD (IQ 100-115) - ~75th percentile                         ║
  // ║ Multi-step patterns requiring active pattern detection                     ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  
  {
    id: 6,
    category: 'matrix',
    difficulty: 'medium',
    question: `In each row, the third symbol combines elements from the first two.
What completes the pattern?

    ○   ●   ◐
    △   ▲   ◭
    □   ■   __`,
    options: ['◧ (Half-filled)', '□ (Empty)', '■ (Filled)', '▣ (Dotted)'],
    correctAnswer: 0, // Rule: empty + filled = half-filled
    timeLimit: 30,
    explanation: 'The pattern shows: empty shape + filled shape = half-filled shape. Circle: ○+●=◐. Triangle: △+▲=◭. Square: □+■=◧.',
  },
  {
    id: 7,
    category: 'number_sequence',
    difficulty: 'medium',
    question: `Find the rule governing this sequence:

    2,  5,  10,  17,  26,  __`,
    options: ['37', '35', '38', '40'],
    correctAnswer: 0, // n² + 1 sequence: 1²+1, 2²+1, 3²+1, 4²+1, 5²+1, 6²+1=37
    timeLimit: 30,
    explanation: 'This follows the pattern n² + 1. Position 1: 1²+1=2. Position 2: 2²+1=5. Position 6: 6²+1=37.',
  },
  {
    id: 8,
    category: 'spatial',
    difficulty: 'medium',
    divergentDimension: 'fluency',
    question: `Which shape does NOT belong with the others?

    A: ◇ (Diamond)    B: □ (Square)
    C: ▬ (Rectangle)  D: △ (Triangle)`,
    options: ['D - Different number of sides', 'A - Different orientation', 'B - Regular polygon', 'C - Elongated shape'],
    correctAnswer: 0, // Triangle = 3 sides; others = 4 sides
    divergentScores: [3, 1, 1, 1],
    timeLimit: 30,
    explanation: 'The triangle has 3 sides while all other shapes (diamond, square, rectangle) have 4 sides. This makes the triangle the odd one out.',
  },
  {
    id: 9,
    category: 'number_sequence',
    difficulty: 'medium',
    question: `These are perfect squares. What comes next?

    1,  4,  9,  16,  25,  __`,
    options: ['36', '30', '35', '49'],
    correctAnswer: 0, // Square numbers: 1², 2², 3², 4², 5², 6²=36
    timeLimit: 30,
    explanation: 'These are perfect squares: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. The next number is 36.',
  },
  {
    id: 10,
    category: 'matrix',
    difficulty: 'medium',
    divergentDimension: 'flexibility',
    question: `Each row follows the pattern: n, 2n, 3n. What is the missing value?

    2    4    6
    3    6    9
    5   10   __`,
    options: ['15', '20', '12', '25'],
    correctAnswer: 0, // 5×3 = 15
    divergentScores: [3, 1, 2, 0],
    timeLimit: 30,
    explanation: 'Each row multiplies the first number by 1, 2, and 3. Row 3: 5×1=5, 5×2=10, 5×3=15.',
  },

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ LEVEL 3: ADVANCED (IQ 115-130) - ~90th percentile                         ║
  // ║ Complex multi-rule patterns and transformational reasoning                 ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  
  {
    id: 11,
    category: 'number_sequence',
    difficulty: 'hard',
    question: `In this famous sequence, each term is the sum of the two preceding terms:

    1,  1,  2,  3,  5,  8,  13,  __`,
    options: ['21', '18', '20', '15'],
    correctAnswer: 0, // Fibonacci sequence: 8+13=21
    timeLimit: 30,
    explanation: 'This is the Fibonacci sequence where each number is the sum of the two preceding ones: 8+13=21.',
  },
  {
    id: 12,
    category: 'matrix',
    difficulty: 'hard',
    divergentDimension: 'originality',
    question: `In this Raven's-style matrix, each row adds one element. What completes Row 3?

    Row 1: ○·    ○··    ○···
    Row 2: □—    □——    □———
    Row 3: △·    △··     __`,
    options: ['△··· (3 dots)', '△···· (4 dots)', '△· (1 dot)', '□··· (wrong shape)'],
    correctAnswer: 0, // Pattern: add one element per column
    divergentScores: [3, 1, 0, 1],
    timeLimit: 30,
    explanation: 'Each column adds one more element to the shape. Column 1: 1 element, Column 2: 2 elements, Column 3: 3 elements. So △··· (3 dots).',
  },
  {
    id: 13,
    category: 'number_sequence',
    difficulty: 'hard',
    question: `These are pronic numbers (n × (n+1)). What comes next?

    2,  6,  12,  20,  30,  __`,
    options: ['42', '40', '44', '36'],
    correctAnswer: 0, // 1×2, 2×3, 3×4, 4×5, 5×6, 6×7=42
    timeLimit: 30,
    explanation: 'Pronic numbers are n×(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.',
  },
  {
    id: 14,
    category: 'spatial',
    difficulty: 'hard',
    divergentDimension: 'flexibility',
    question: `A square sheet of paper is folded in half, then folded in half again (creating 4 layers). A single hole is punched through all layers. When unfolded, how many holes are visible?`,
    options: ['4', '2', '8', '1'],
    correctAnswer: 0, // 2 folds = 2² = 4 layers = 4 holes
    divergentScores: [3, 1, 2, 0],
    timeLimit: 30,
    explanation: 'Each fold doubles the layers. 2 folds = 2² = 4 layers. Punching through all 4 layers creates 4 holes when unfolded.',
  },
  {
    id: 15,
    category: 'matrix',
    difficulty: 'hard',
    question: `Each row shows a progressive filling transformation. What completes the sequence?

    ○  →  ◐  →  ●
    □  →  ◧  →  ■
    △  →  ◭  →  __`,
    options: ['▲ (Filled)', '△ (Empty)', '◭ (Half)', '▽ (Inverted)'],
    correctAnswer: 0, // Empty → Half-filled → Fully filled
    timeLimit: 30,
    explanation: 'Each row shows: empty → half-filled → fully filled. The triangle follows this pattern: △ → ◭ → ▲.',
  },

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ LEVEL 4: SUPERIOR (IQ 130-145) - ~98th percentile                         ║
  // ║ Complex multi-dimensional reasoning and abstract rule inference            ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  
  {
    id: 16,
    category: 'number_sequence',
    difficulty: 'expert',
    question: `This sequence contains only prime numbers:

    2,  3,  5,  7,  11,  13,  __`,
    options: ['17', '15', '19', '14'],
    correctAnswer: 0, // Next prime after 13 is 17
    timeLimit: 30,
    explanation: 'Prime numbers are only divisible by 1 and themselves. After 13, the next prime is 17 (14, 15, 16 are not prime).',
  },
  {
    id: 17,
    category: 'matrix',
    difficulty: 'expert',
    divergentDimension: 'elaboration',
    question: `In this multiplication table, each cell = (row × column). What is the missing value?

    ×   1   2   3
    ─────────────
    1 │ 1   2   3
    2 │ 2   4   6
    3 │ 3   6   __`,
    options: ['9', '8', '12', '7'],
    correctAnswer: 0, // 3 × 3 = 9
    divergentScores: [3, 1, 2, 0],
    timeLimit: 30,
    explanation: 'In a multiplication table, each cell is row × column. Position (3,3) = 3 × 3 = 9.',
  },
  {
    id: 18,
    category: 'number_sequence',
    difficulty: 'expert',
    question: `These are factorials (n!). What comes next?

    1,  2,  6,  24,  120,  __`,
    options: ['720', '600', '240', '144'],
    correctAnswer: 0, // 1!, 2!, 3!, 4!, 5!, 6!=720
    timeLimit: 30,
    explanation: 'Factorials: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720. Each factorial is n × (n-1)!, so 6! = 6×120 = 720.',
  },
  {
    id: 19,
    category: 'abstract',
    difficulty: 'expert',
    divergentDimension: 'originality',
    question: `Given these symbol values, apply standard mathematical order of operations:

    ★ = 5    ◆ = 3    ● = 2

    ★ + ◆ × ● = __`,
    options: ['11', '16', '13', '10'],
    correctAnswer: 0, // Order of operations: 5 + (3×2) = 5 + 6 = 11
    divergentScores: [3, 1, 1, 0],
    timeLimit: 30,
    explanation: 'Order of operations (PEMDAS): multiplication before addition. 5 + (3×2) = 5 + 6 = 11.',
  },
  {
    id: 20,
    category: 'spatial',
    difficulty: 'expert',
    question: `A cube is painted red on all 6 faces, then cut into 27 identical smaller cubes (3×3×3 grid). How many small cubes have exactly 2 painted faces?`,
    options: ['12', '8', '6', '24'],
    correctAnswer: 0, // Edge cubes (not corners): 12 edges × 1 middle cube = 12
    timeLimit: 30,
    explanation: 'Cubes with exactly 2 painted faces are on the edges (not corners). A cube has 12 edges, each with 1 middle cube = 12 cubes.',
  },

  // ╔═══════════════════════════════════════════════════════════════════════════╗
  // ║ LEVEL 5: EXCEPTIONAL (IQ 145+) - ~99.9th percentile                       ║
  // ║ Genius-level pattern recognition - Mensa qualifying difficulty             ║
  // ╚═══════════════════════════════════════════════════════════════════════════╝
  
  {
    id: 21,
    category: 'number_sequence',
    difficulty: 'genius',
    divergentDimension: 'fluency',
    question: `This is the "Look-and-Say" sequence. Each term describes the previous term. What comes next?

    1  →  "one 1"  →  11
    11 →  "two 1s" →  21
    21 →  "one 2, one 1" → 1211
    1211 → 111221 → __`,
    options: ['312211', '122211', '211211', '112121'],
    correctAnswer: 0, // Describe "111221": three 1s, two 2s, one 1 = 312211
    divergentScores: [3, 1, 1, 0],
    timeLimit: 30,
    explanation: 'Describe "111221": three 1s (31), two 2s (22), one 1 (11) = 312211.',
  },
  {
    id: 22,
    category: 'abstract',
    difficulty: 'genius',
    question: `The sum of the first n cubes always equals the square of the n-th triangular number:

    1³ + 2³ = 9 = 3²
    1³ + 2³ + 3³ = 36 = 6²
    1³ + 2³ + 3³ + 4³ = 100 = 10²
    
    What is 1³ + 2³ + 3³ + 4³ + 5³ = __²`,
    options: ['225 (15²)', '196 (14²)', '256 (16²)', '169 (13²)'],
    correctAnswer: 0, // Triangular(5) = 15, so answer = 15² = 225
    timeLimit: 30,
    explanation: 'The 5th triangular number is 1+2+3+4+5=15. Sum of first 5 cubes = 15² = 225.',
  },
  {
    id: 23,
    category: 'number_sequence',
    difficulty: 'genius',
    divergentDimension: 'flexibility',
    question: `In this Tribonacci sequence, each term is the sum of the three preceding terms:

    0,  1,  1,  2,  4,  7,  13,  __`,
    options: ['24', '20', '21', '26'],
    correctAnswer: 0, // 4+7+13 = 24
    divergentScores: [3, 1, 2, 0],
    timeLimit: 30,
    explanation: 'Tribonacci adds the previous three terms: 4 + 7 + 13 = 24.',
  },
  {
    id: 24,
    category: 'matrix',
    difficulty: 'genius',
    divergentDimension: 'elaboration',
    question: `This matrix has TWO rules operating simultaneously:
• Row rule: Each row increases by +2
• Column rule: Each column doubles

        Col1   Col2   Col3
    R1:   1      2      4
    R2:   3      4      8
    R3:   5      6     __`,
    options: ['12', '10', '14', '8'],
    correctAnswer: 0, // Column 3 follows doubling: Col2 × 2 = 6 × 2 = 12
    divergentScores: [3, 2, 1, 0],
    timeLimit: 30,
    explanation: 'Following the column doubling rule: Column 3 = Column 2 × 2. So 6 × 2 = 12.',
  },
  {
    id: 25,
    category: 'abstract',
    difficulty: 'genius',
    question: `This sequence represents something you encounter every year. What comes after N?

    J,  F,  M,  A,  M,  J,  J,  A,  S,  O,  N,  __`,
    options: ['D', 'J', 'M', 'L'],
    correctAnswer: 0, // First letters of months: January through December
    timeLimit: 30,
    explanation: 'These are the first letters of the months: January, February, March... November, December. D for December.',
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
  answers: number[]; // User's answers for question review
  questions: Question[]; // The actual questions used (for variant support)
}

export const calculateResults = (answers: number[], timeUsed: number, questions: Question[] = quizQuestions): TestResults => {
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

  questions.forEach((question, index) => {
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
  const overallPercentage = (totalCorrect / questions.length) * 100;
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
    totalQuestions: questions.length,
    iq,
    categoryScores: categoryResults,
    divergentProfile,
    primaryStrength,
    divergentType,
    divergentDescription,
    timeUsed,
    timeBonusApplied,
    answers,
    questions, // Store the questions used for variant-aware review
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
