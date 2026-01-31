// IQ Question Variants - 3 variants per question slot
// Maintains progressive difficulty while ensuring unique test experiences

import { Question } from './quizQuestions';
import { QuestionVariant } from '@/lib/questionVariants';

// Each slot has the base question + 2 variants at the same difficulty level
export const iqQuestionVariants: QuestionVariant<Question>[] = [
  // LEVEL 1: FOUNDATIONAL (IQ 85-100) - Questions 1-5
  {
    base: {
      id: 1, category: 'number_sequence', difficulty: 'easy',
      question: `Identify the pattern and find the missing number:\n\n    2,  4,  6,  8,  __`,
      options: ['10', '9', '12', '11'], correctAnswer: 0, timeLimit: 30,
      explanation: 'This is an arithmetic progression where each number increases by 2. Starting from 2: 2+2=4, 4+2=6, 6+2=8, 8+2=10.',
    },
    variants: [
      {
        id: 1, category: 'number_sequence', difficulty: 'easy',
        question: `Identify the pattern and find the missing number:\n\n    3,  6,  9,  12,  __`,
        options: ['15', '14', '18', '13'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is an arithmetic progression where each number increases by 3. Starting from 3: 3+3=6, 6+3=9, 9+3=12, 12+3=15.',
      },
      {
        id: 1, category: 'number_sequence', difficulty: 'easy',
        question: `Identify the pattern and find the missing number:\n\n    5,  10,  15,  20,  __`,
        options: ['25', '22', '30', '24'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is an arithmetic progression where each number increases by 5. Starting from 5: 5+5=10, 10+5=15, 15+5=20, 20+5=25.',
      },
    ],
  },
  {
    base: {
      id: 2, category: 'matrix', difficulty: 'easy',
      question: `Each row and column must contain each symbol exactly once.\nWhat belongs in the empty cell?\n\n    ○   △   □\n    △   □   ○\n    □   ○   __`,
      options: ['△', '○', '□', '●'], correctAnswer: 0, timeLimit: 30,
      explanation: 'This is a Latin Square puzzle. Row 3 already has □ and ○, so it needs △. Column 3 has □ and ○, confirming △ is the missing symbol.',
    },
    variants: [
      {
        id: 2, category: 'matrix', difficulty: 'easy',
        question: `Each row and column must contain each symbol exactly once.\nWhat belongs in the empty cell?\n\n    ★   ◆   ●\n    ◆   ●   ★\n    ●   __   ◆`,
        options: ['★', '●', '◆', '○'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is a Latin Square puzzle. Row 3 already has ● and ◆, so it needs ★. Column 2 has ◆ and ●, confirming ★ is the missing symbol.',
      },
      {
        id: 2, category: 'matrix', difficulty: 'easy',
        question: `Each row and column must contain each symbol exactly once.\nWhat belongs in the empty cell?\n\n    A   B   C\n    C   __  B\n    B   C   A`,
        options: ['A', 'B', 'C', 'D'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is a Latin Square puzzle. Row 2 already has C and B, so it needs A. Column 2 has B and C, confirming A is the missing symbol.',
      },
    ],
  },
  {
    base: {
      id: 3, category: 'number_sequence', difficulty: 'easy',
      question: `What number continues this sequence?\n\n    1,  3,  5,  7,  __`,
      options: ['9', '8', '10', '11'], correctAnswer: 0, timeLimit: 30,
      explanation: 'These are consecutive odd numbers. Each number increases by 2: 1, 3, 5, 7... The next odd number is 9.',
    },
    variants: [
      {
        id: 3, category: 'number_sequence', difficulty: 'easy',
        question: `What number continues this sequence?\n\n    2,  4,  6,  8,  __`,
        options: ['10', '9', '12', '11'], correctAnswer: 0, timeLimit: 30,
        explanation: 'These are consecutive even numbers. Each number increases by 2: 2, 4, 6, 8... The next even number is 10.',
      },
      {
        id: 3, category: 'number_sequence', difficulty: 'easy',
        question: `What number continues this sequence?\n\n    5,  10,  15,  20,  __`,
        options: ['25', '22', '30', '24'], correctAnswer: 0, timeLimit: 30,
        explanation: 'These are multiples of 5. Each number increases by 5: 5, 10, 15, 20... The next multiple is 25.',
      },
    ],
  },
  {
    base: {
      id: 4, category: 'shape_pattern', difficulty: 'easy',
      question: `The arrow rotates 90° clockwise each step. What comes next?\n\n    ↑  →  ↓  __`,
      options: ['← (Left)', '↑ (Up)', '↘ (Diagonal)', '→ (Right)'], correctAnswer: 0, timeLimit: 30,
      explanation: 'The arrow rotates 90° clockwise each step: Up → Right → Down → Left. After pointing down (↓), the next rotation gives left (←).',
    },
    variants: [
      {
        id: 4, category: 'shape_pattern', difficulty: 'easy',
        question: `The arrow rotates 90° counter-clockwise each step. What comes next?\n\n    ↑  ←  ↓  __`,
        options: ['→ (Right)', '↑ (Up)', '← (Left)', '↓ (Down)'], correctAnswer: 0, timeLimit: 30,
        explanation: 'The arrow rotates 90° counter-clockwise each step: Up → Left → Down → Right. After pointing down (↓), the next rotation gives right (→).',
      },
      {
        id: 4, category: 'shape_pattern', difficulty: 'easy',
        question: `The shape rotates 45° clockwise each step. What comes next?\n\n    |  /  —  __`,
        options: ['\\ (Diagonal)', '| (Vertical)', '/ (Forward slash)', '— (Horizontal)'], correctAnswer: 0, timeLimit: 30,
        explanation: 'The line rotates 45° clockwise each step: Vertical → Forward slash → Horizontal → Backslash.',
      },
    ],
  },
  {
    base: {
      id: 5, category: 'number_sequence', difficulty: 'easy',
      question: `Each number is double the previous. What comes next?\n\n    1,  2,  4,  8,  __`,
      options: ['16', '10', '12', '15'], correctAnswer: 0, timeLimit: 30,
      explanation: 'This is a geometric progression where each term is multiplied by 2: 1×2=2, 2×2=4, 4×2=8, 8×2=16.',
    },
    variants: [
      {
        id: 5, category: 'number_sequence', difficulty: 'easy',
        question: `Each number is triple the previous. What comes next?\n\n    1,  3,  9,  27,  __`,
        options: ['81', '54', '36', '72'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is a geometric progression where each term is multiplied by 3: 1×3=3, 3×3=9, 9×3=27, 27×3=81.',
      },
      {
        id: 5, category: 'number_sequence', difficulty: 'easy',
        question: `Each number is half the previous. What comes next?\n\n    64,  32,  16,  8,  __`,
        options: ['4', '6', '2', '0'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is a geometric progression where each term is divided by 2: 64÷2=32, 32÷2=16, 16÷2=8, 8÷2=4.',
      },
    ],
  },

  // LEVEL 2: STANDARD (IQ 100-115) - Questions 6-10
  {
    base: {
      id: 6, category: 'matrix', difficulty: 'medium',
      question: `In each row, the third symbol combines elements from the first two.\nWhat completes the pattern?\n\n    ○   ●   ◐\n    △   ▲   ◭\n    □   ■   __`,
      options: ['◧ (Half-filled)', '□ (Empty)', '■ (Filled)', '▣ (Dotted)'], correctAnswer: 0, timeLimit: 30,
      explanation: 'The pattern shows: empty shape + filled shape = half-filled shape. Circle: ○+●=◐. Triangle: △+▲=◭. Square: □+■=◧.',
    },
    variants: [
      {
        id: 6, category: 'matrix', difficulty: 'medium',
        question: `In each row, the third number is the sum of the first two.\nWhat completes the pattern?\n\n    3   4   7\n    5   6   11\n    2   9   __`,
        options: ['11', '7', '18', '12'], correctAnswer: 0, timeLimit: 30,
        explanation: 'The pattern is: first + second = third. Row 1: 3+4=7. Row 2: 5+6=11. Row 3: 2+9=11.',
      },
      {
        id: 6, category: 'matrix', difficulty: 'medium',
        question: `In each row, the third number is the difference of the first two.\nWhat completes the pattern?\n\n    10   3   7\n    15   8   7\n    20   __   8`,
        options: ['12', '28', '10', '8'], correctAnswer: 0, timeLimit: 30,
        explanation: 'The pattern is: first - second = third. Row 1: 10-3=7. Row 2: 15-8=7. Row 3: 20-12=8.',
      },
    ],
  },
  {
    base: {
      id: 7, category: 'number_sequence', difficulty: 'medium',
      question: `Find the rule governing this sequence:\n\n    2,  5,  10,  17,  26,  __`,
      options: ['37', '35', '38', '40'], correctAnswer: 0, timeLimit: 30,
      explanation: 'This follows the pattern n² + 1. Position 1: 1²+1=2. Position 2: 2²+1=5. Position 6: 6²+1=37.',
    },
    variants: [
      {
        id: 7, category: 'number_sequence', difficulty: 'medium',
        question: `Find the rule governing this sequence:\n\n    1,  4,  9,  16,  25,  __`,
        options: ['36', '30', '49', '32'], correctAnswer: 0, timeLimit: 30,
        explanation: 'These are perfect squares: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36.',
      },
      {
        id: 7, category: 'number_sequence', difficulty: 'medium',
        question: `Find the rule governing this sequence:\n\n    0,  3,  8,  15,  24,  __`,
        options: ['35', '33', '36', '30'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This follows the pattern n² - 1. Position 1: 1²-1=0. Position 2: 2²-1=3. Position 6: 6²-1=35.',
      },
    ],
  },
  {
    base: {
      id: 8, category: 'spatial', difficulty: 'medium', divergentDimension: 'fluency',
      question: `Which shape does NOT belong with the others?\n\n    A: ◇ (Diamond)    B: □ (Square)\n    C: ▬ (Rectangle)  D: △ (Triangle)`,
      options: ['D - Different number of sides', 'A - Different orientation', 'B - Regular polygon', 'C - Elongated shape'],
      correctAnswer: 0, divergentScores: [3, 1, 1, 1], timeLimit: 30,
      explanation: 'The triangle has 3 sides while all other shapes (diamond, square, rectangle) have 4 sides. This makes the triangle the odd one out.',
    },
    variants: [
      {
        id: 8, category: 'spatial', difficulty: 'medium', divergentDimension: 'fluency',
        question: `Which shape does NOT belong with the others?\n\n    A: ○ (Circle)    B: ◯ (Ring)\n    C: ◐ (Half-circle)  D: □ (Square)`,
        options: ['D - Not curved', 'A - Filled shape', 'B - Empty inside', 'C - Partial shape'],
        correctAnswer: 0, divergentScores: [3, 1, 1, 1], timeLimit: 30,
        explanation: 'The square has straight edges and corners while all other shapes (circle, ring, half-circle) have curved edges.',
      },
      {
        id: 8, category: 'spatial', difficulty: 'medium', divergentDimension: 'fluency',
        question: `Which item does NOT belong with the others?\n\n    A: 2    B: 4\n    C: 6    D: 9`,
        options: ['D - Not even', 'A - Smallest', 'B - Perfect square', 'C - Divisible by 3'],
        correctAnswer: 0, divergentScores: [3, 1, 1, 1], timeLimit: 30,
        explanation: '9 is the only odd number while 2, 4, and 6 are all even numbers.',
      },
    ],
  },
  {
    base: {
      id: 9, category: 'number_sequence', difficulty: 'medium',
      question: `These are perfect squares. What comes next?\n\n    1,  4,  9,  16,  25,  __`,
      options: ['36', '30', '35', '49'], correctAnswer: 0, timeLimit: 30,
      explanation: 'These are perfect squares: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. The next number is 36.',
    },
    variants: [
      {
        id: 9, category: 'number_sequence', difficulty: 'medium',
        question: `These are perfect cubes. What comes next?\n\n    1,  8,  27,  64,  __`,
        options: ['125', '100', '81', '216'], correctAnswer: 0, timeLimit: 30,
        explanation: 'These are perfect cubes: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125. The next number is 125.',
      },
      {
        id: 9, category: 'number_sequence', difficulty: 'medium',
        question: `These follow a pattern. What comes next?\n\n    1,  4,  10,  20,  35,  __`,
        options: ['56', '50', '55', '45'], correctAnswer: 0, timeLimit: 30,
        explanation: 'These are tetrahedral numbers: T(n) = n(n+1)(n+2)/6. The differences increase by 4, 6, 10, 15, 21. Next: 35+21=56.',
      },
    ],
  },
  {
    base: {
      id: 10, category: 'matrix', difficulty: 'medium', divergentDimension: 'flexibility',
      question: `Each row follows the pattern: n, 2n, 3n. What is the missing value?\n\n    2    4    6\n    3    6    9\n    5   10   __`,
      options: ['15', '20', '12', '25'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
      explanation: 'Each row multiplies the first number by 1, 2, and 3. Row 3: 5×1=5, 5×2=10, 5×3=15.',
    },
    variants: [
      {
        id: 10, category: 'matrix', difficulty: 'medium', divergentDimension: 'flexibility',
        question: `Each row follows the pattern: n, n+3, n+6. What is the missing value?\n\n    1    4    7\n    5    8   11\n    3    6   __`,
        options: ['9', '12', '8', '10'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'Each row adds 3 to each subsequent number. Row 3: 3+3=6, 6+3=9.',
      },
      {
        id: 10, category: 'matrix', difficulty: 'medium', divergentDimension: 'flexibility',
        question: `Each row doubles. What is the missing value?\n\n    1    2    4\n    3    6   12\n    5   10   __`,
        options: ['20', '15', '25', '30'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'Each column doubles the previous. Row 3: 5×2=10, 10×2=20.',
      },
    ],
  },

  // LEVEL 3: ADVANCED (IQ 115-130) - Questions 11-15
  {
    base: {
      id: 11, category: 'number_sequence', difficulty: 'hard',
      question: `In this famous sequence, each term is the sum of the two preceding terms:\n\n    1,  1,  2,  3,  5,  8,  13,  __`,
      options: ['21', '18', '20', '15'], correctAnswer: 0, timeLimit: 30,
      explanation: 'This is the Fibonacci sequence where each number is the sum of the two preceding ones: 8+13=21.',
    },
    variants: [
      {
        id: 11, category: 'number_sequence', difficulty: 'hard',
        question: `Each term is the sum of the two preceding terms:\n\n    2,  2,  4,  6,  10,  16,  __`,
        options: ['26', '22', '24', '32'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is a Fibonacci-like sequence starting with 2, 2: 10+16=26.',
      },
      {
        id: 11, category: 'number_sequence', difficulty: 'hard',
        question: `Each term is the sum of the two preceding terms:\n\n    1,  3,  4,  7,  11,  18,  __`,
        options: ['29', '25', '27', '36'], correctAnswer: 0, timeLimit: 30,
        explanation: 'This is a Lucas sequence: 11+18=29.',
      },
    ],
  },
  {
    base: {
      id: 12, category: 'matrix', difficulty: 'hard', divergentDimension: 'originality',
      question: `In this Raven's-style matrix, each row adds one element. What completes Row 3?\n\n    Row 1: ○·    ○··    ○···\n    Row 2: □—    □——    □———\n    Row 3: △·    △··     __`,
      options: ['△··· (3 dots)', '△···· (4 dots)', '△· (1 dot)', '□··· (wrong shape)'],
      correctAnswer: 0, divergentScores: [3, 1, 0, 1], timeLimit: 30,
      explanation: 'Each column adds one more element to the shape. Column 1: 1 element, Column 2: 2 elements, Column 3: 3 elements. So △··· (3 dots).',
    },
    variants: [
      {
        id: 12, category: 'matrix', difficulty: 'hard', divergentDimension: 'originality',
        question: `In this matrix, shading increases each column. What completes Row 3?\n\n    Row 1: ○    ◐    ●\n    Row 2: □    ◧    ■\n    Row 3: △    ◭    __`,
        options: ['▲ (Filled)', '△ (Empty)', '◭ (Half)', '▽ (Inverted)'],
        correctAnswer: 0, divergentScores: [3, 1, 0, 1], timeLimit: 30,
        explanation: 'Each row progresses from empty to half-filled to fully filled: △ → ◭ → ▲.',
      },
      {
        id: 12, category: 'matrix', difficulty: 'hard', divergentDimension: 'originality',
        question: `In this matrix, size increases each column. What completes Row 3?\n\n    Row 1: small ○    medium ○    large ○\n    Row 2: small □    medium □    large □\n    Row 3: small △    medium △    __`,
        options: ['large △', 'small △', 'medium □', 'large ○'],
        correctAnswer: 0, divergentScores: [3, 1, 0, 1], timeLimit: 30,
        explanation: 'Each row follows the pattern small → medium → large. Row 3 needs large △.',
      },
    ],
  },
  {
    base: {
      id: 13, category: 'number_sequence', difficulty: 'hard',
      question: `These are pronic numbers (n × (n+1)). What comes next?\n\n    2,  6,  12,  20,  30,  __`,
      options: ['42', '40', '44', '36'], correctAnswer: 0, timeLimit: 30,
      explanation: 'Pronic numbers are n×(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.',
    },
    variants: [
      {
        id: 13, category: 'number_sequence', difficulty: 'hard',
        question: `These are triangular numbers. What comes next?\n\n    1,  3,  6,  10,  15,  __`,
        options: ['21', '18', '20', '25'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Triangular numbers: T(n) = n(n+1)/2. T(6) = 6×7/2 = 21.',
      },
      {
        id: 13, category: 'number_sequence', difficulty: 'hard',
        question: `These follow n(n+2). What comes next?\n\n    3,  8,  15,  24,  35,  __`,
        options: ['48', '42', '50', '45'], correctAnswer: 0, timeLimit: 30,
        explanation: 'The pattern is n(n+2): 1×3=3, 2×4=8, 3×5=15, 4×6=24, 5×7=35, 6×8=48.',
      },
    ],
  },
  {
    base: {
      id: 14, category: 'spatial', difficulty: 'hard', divergentDimension: 'flexibility',
      question: `A square sheet of paper is folded in half, then folded in half again (creating 4 layers). A single hole is punched through all layers. When unfolded, how many holes are visible?`,
      options: ['4', '2', '8', '1'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
      explanation: 'Each fold doubles the layers. 2 folds = 2² = 4 layers. Punching through all 4 layers creates 4 holes when unfolded.',
    },
    variants: [
      {
        id: 14, category: 'spatial', difficulty: 'hard', divergentDimension: 'flexibility',
        question: `A square sheet of paper is folded in half three times (creating 8 layers). A single hole is punched through all layers. When unfolded, how many holes are visible?`,
        options: ['8', '4', '16', '6'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'Each fold doubles the layers. 3 folds = 2³ = 8 layers. Punching through all 8 layers creates 8 holes when unfolded.',
      },
      {
        id: 14, category: 'spatial', difficulty: 'hard', divergentDimension: 'flexibility',
        question: `A ribbon is folded in half, then in half again. If you make one cut across all layers, how many pieces do you get?`,
        options: ['5', '4', '3', '8'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'With 4 layers, one cut creates 4 cut pieces + 1 uncut piece = 5 pieces total.',
      },
    ],
  },
  {
    base: {
      id: 15, category: 'matrix', difficulty: 'hard',
      question: `Each row shows a progressive filling transformation. What completes the sequence?\n\n    ○  →  ◐  →  ●\n    □  →  ◧  →  ■\n    △  →  ◭  →  __`,
      options: ['▲ (Filled)', '△ (Empty)', '◭ (Half)', '▽ (Inverted)'], correctAnswer: 0, timeLimit: 30,
      explanation: 'Each row shows: empty → half-filled → fully filled. The triangle follows this pattern: △ → ◭ → ▲.',
    },
    variants: [
      {
        id: 15, category: 'matrix', difficulty: 'hard',
        question: `Each row shows size decreasing. What completes the sequence?\n\n    Large ○  →  Medium ○  →  Small ○\n    Large □  →  Medium □  →  Small □\n    Large △  →  Medium △  →  __`,
        options: ['Small △', 'Large △', 'Medium □', 'Tiny △'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Each row shows: Large → Medium → Small. The triangle follows: Large △ → Medium △ → Small △.',
      },
      {
        id: 15, category: 'matrix', difficulty: 'hard',
        question: `Each row shows rotation. What completes the sequence?\n\n    ◁  →  △  →  ▷\n    ◀  →  □  →  ▶\n    ◣  →  ▣  →  __`,
        options: ['◢ (Bottom-right)', '◤ (Top-left)', '◥ (Top-right)', '◣ (Same)'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Each row shows 90° clockwise rotation. ◣ rotates to ◢.',
      },
    ],
  },

  // LEVEL 4: SUPERIOR (IQ 130-145) - Questions 16-20
  {
    base: {
      id: 16, category: 'number_sequence', difficulty: 'expert',
      question: `This sequence contains only prime numbers:\n\n    2,  3,  5,  7,  11,  13,  __`,
      options: ['17', '15', '19', '14'], correctAnswer: 0, timeLimit: 30,
      explanation: 'Prime numbers are only divisible by 1 and themselves. After 13, the next prime is 17 (14, 15, 16 are not prime).',
    },
    variants: [
      {
        id: 16, category: 'number_sequence', difficulty: 'expert',
        question: `This sequence contains only prime numbers:\n\n    23,  29,  31,  37,  41,  __`,
        options: ['43', '45', '47', '49'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Prime numbers after 41: 43, 47, 53... The next prime after 41 is 43.',
      },
      {
        id: 16, category: 'number_sequence', difficulty: 'expert',
        question: `These are twin primes (primes that differ by 2). What is the next twin prime pair after (11, 13)?`,
        options: ['(17, 19)', '(13, 15)', '(15, 17)', '(19, 21)'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Twin primes differ by 2. After (11, 13), the next pair is (17, 19). Both 17 and 19 are prime and differ by 2.',
      },
    ],
  },
  {
    base: {
      id: 17, category: 'matrix', difficulty: 'expert', divergentDimension: 'elaboration',
      question: `In this multiplication table, each cell = (row × column). What is the missing value?\n\n    ×   1   2   3\n    ─────────────\n    1 │ 1   2   3\n    2 │ 2   4   6\n    3 │ 3   6   __`,
      options: ['9', '8', '12', '7'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
      explanation: 'In a multiplication table, each cell is row × column. Position (3,3) = 3 × 3 = 9.',
    },
    variants: [
      {
        id: 17, category: 'matrix', difficulty: 'expert', divergentDimension: 'elaboration',
        question: `In this addition table, each cell = (row + column). What is the missing value?\n\n    +   1   2   3\n    ─────────────\n    1 │ 2   3   4\n    2 │ 3   4   5\n    3 │ 4   5   __`,
        options: ['6', '7', '8', '9'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'In an addition table, each cell is row + column. Position (3,3) = 3 + 3 = 6.',
      },
      {
        id: 17, category: 'matrix', difficulty: 'expert', divergentDimension: 'elaboration',
        question: `In this power table, each cell = row^column. What is the missing value?\n\n    ^   1   2   3\n    ─────────────\n    2 │ 2   4   8\n    3 │ 3   9  27\n    4 │ 4  16   __`,
        options: ['64', '48', '32', '12'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'In this power table, cell = row^column. Position (4,3) = 4³ = 64.',
      },
    ],
  },
  {
    base: {
      id: 18, category: 'number_sequence', difficulty: 'expert',
      question: `These are factorials (n!). What comes next?\n\n    1,  2,  6,  24,  120,  __`,
      options: ['720', '600', '240', '144'], correctAnswer: 0, timeLimit: 30,
      explanation: 'Factorials: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720. Each factorial is n × (n-1)!, so 6! = 6×120 = 720.',
    },
    variants: [
      {
        id: 18, category: 'number_sequence', difficulty: 'expert',
        question: `These follow n! / (n-2)!. What comes next?\n\n    2,  6,  12,  20,  30,  __`,
        options: ['42', '40', '36', '48'], correctAnswer: 0, timeLimit: 30,
        explanation: 'n!/(n-2)! = n(n-1). For n=7: 7×6=42.',
      },
      {
        id: 18, category: 'number_sequence', difficulty: 'expert',
        question: `These are double factorials (n!!). What comes next?\n\n    1,  2,  3,  8,  15,  __`,
        options: ['48', '24', '30', '45'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Double factorial: n!! = n × (n-2) × (n-4)... For 6!! = 6×4×2 = 48.',
      },
    ],
  },
  {
    base: {
      id: 19, category: 'abstract', difficulty: 'expert', divergentDimension: 'originality',
      question: `Given these symbol values, apply standard mathematical order of operations:\n\n    ★ = 5    ◆ = 3    ● = 2\n\n    ★ + ◆ × ● = __`,
      options: ['11', '16', '13', '10'], correctAnswer: 0, divergentScores: [3, 1, 1, 0], timeLimit: 30,
      explanation: 'Order of operations (PEMDAS): multiplication before addition. 5 + (3×2) = 5 + 6 = 11.',
    },
    variants: [
      {
        id: 19, category: 'abstract', difficulty: 'expert', divergentDimension: 'originality',
        question: `Given these symbol values, apply standard mathematical order of operations:\n\n    ★ = 4    ◆ = 6    ● = 2\n\n    ◆ ÷ ● + ★ = __`,
        options: ['7', '5', '2', '12'], correctAnswer: 0, divergentScores: [3, 1, 1, 0], timeLimit: 30,
        explanation: 'Order of operations (PEMDAS): division before addition. (6÷2) + 4 = 3 + 4 = 7.',
      },
      {
        id: 19, category: 'abstract', difficulty: 'expert', divergentDimension: 'originality',
        question: `Given these symbol values, apply standard mathematical order of operations:\n\n    ★ = 8    ◆ = 2    ● = 3\n\n    ★ - ◆ × ● = __`,
        options: ['2', '18', '6', '14'], correctAnswer: 0, divergentScores: [3, 1, 1, 0], timeLimit: 30,
        explanation: 'Order of operations (PEMDAS): multiplication before subtraction. 8 - (2×3) = 8 - 6 = 2.',
      },
    ],
  },
  {
    base: {
      id: 20, category: 'spatial', difficulty: 'expert',
      question: `A cube is painted red on all 6 faces, then cut into 27 identical smaller cubes (3×3×3 grid). How many small cubes have exactly 2 painted faces?`,
      options: ['12', '8', '6', '24'], correctAnswer: 0, timeLimit: 30,
      explanation: 'Cubes with exactly 2 painted faces are on the edges (not corners). A cube has 12 edges, each with 1 middle cube = 12 cubes.',
    },
    variants: [
      {
        id: 20, category: 'spatial', difficulty: 'expert',
        question: `A cube is painted red on all 6 faces, then cut into 27 identical smaller cubes (3×3×3 grid). How many small cubes have exactly 3 painted faces?`,
        options: ['8', '12', '6', '4'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Cubes with exactly 3 painted faces are at the corners. A cube has 8 corners, so 8 cubes.',
      },
      {
        id: 20, category: 'spatial', difficulty: 'expert',
        question: `A cube is painted red on all 6 faces, then cut into 27 identical smaller cubes (3×3×3 grid). How many small cubes have exactly 1 painted face?`,
        options: ['6', '8', '12', '24'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Cubes with exactly 1 painted face are in the center of each face. 6 faces × 1 center cube = 6 cubes.',
      },
    ],
  },

  // LEVEL 5: EXCEPTIONAL (IQ 145+) - Questions 21-25
  {
    base: {
      id: 21, category: 'number_sequence', difficulty: 'genius', divergentDimension: 'fluency',
      question: `This is the "Look-and-Say" sequence. Each term describes the previous term. What comes next?\n\n    1  →  "one 1"  →  11\n    11 →  "two 1s" →  21\n    21 →  "one 2, one 1" → 1211\n    1211 → 111221 → __`,
      options: ['312211', '122211', '211211', '112121'], correctAnswer: 0, divergentScores: [3, 1, 1, 0], timeLimit: 30,
      explanation: 'Describe "111221": three 1s (31), two 2s (22), one 1 (11) = 312211.',
    },
    variants: [
      {
        id: 21, category: 'number_sequence', difficulty: 'genius', divergentDimension: 'fluency',
        question: `In the "Look-and-Say" sequence starting with 2:\n\n    2 → 12 → 1112 → 3112 → __`,
        options: ['211213', '132112', '211312', '123112'], correctAnswer: 1, divergentScores: [1, 3, 1, 0], timeLimit: 30,
        explanation: 'Describe "3112": one 3 (13), two 1s (21), one 2 (12) = 132112.',
      },
      {
        id: 21, category: 'number_sequence', difficulty: 'genius', divergentDimension: 'fluency',
        question: `In this recursive sequence, each term is formed by reading the digits of the previous:\n\n    1 → 11 → 21 → 1211 → __`,
        options: ['111221', '122111', '211211', '112211'], correctAnswer: 0, divergentScores: [3, 1, 1, 0], timeLimit: 30,
        explanation: 'Describe "1211": one 1 (11), one 2 (12), two 1s (21) = 111221.',
      },
    ],
  },
  {
    base: {
      id: 22, category: 'abstract', difficulty: 'genius',
      question: `The sum of the first n cubes always equals the square of the n-th triangular number:\n\n    1³ + 2³ = 9 = 3²\n    1³ + 2³ + 3³ = 36 = 6²\n    1³ + 2³ + 3³ + 4³ = 100 = 10²\n    \n    What is 1³ + 2³ + 3³ + 4³ + 5³ = __²`,
      options: ['225 (15²)', '196 (14²)', '256 (16²)', '169 (13²)'], correctAnswer: 0, timeLimit: 30,
      explanation: 'The 5th triangular number is 1+2+3+4+5=15. Sum of first 5 cubes = 15² = 225.',
    },
    variants: [
      {
        id: 22, category: 'abstract', difficulty: 'genius',
        question: `The sum of the first n odd numbers equals n²:\n\n    1 = 1²\n    1 + 3 = 4 = 2²\n    1 + 3 + 5 = 9 = 3²\n    \n    What is 1 + 3 + 5 + 7 + 9 + 11 + 13 = __`,
        options: ['49', '36', '64', '81'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Sum of first 7 odd numbers = 7² = 49.',
      },
      {
        id: 22, category: 'abstract', difficulty: 'genius',
        question: `The sum of the first n natural numbers is n(n+1)/2:\n\n    1+2 = 3\n    1+2+3 = 6\n    1+2+3+4 = 10\n    \n    What is 1+2+3+...+10 = __`,
        options: ['55', '45', '50', '60'], correctAnswer: 0, timeLimit: 30,
        explanation: 'Sum of 1 to 10 = 10(11)/2 = 55.',
      },
    ],
  },
  {
    base: {
      id: 23, category: 'number_sequence', difficulty: 'genius', divergentDimension: 'flexibility',
      question: `In this Tribonacci sequence, each term is the sum of the three preceding terms:\n\n    0,  1,  1,  2,  4,  7,  13,  __`,
      options: ['24', '20', '21', '26'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
      explanation: 'Tribonacci adds the previous three terms: 4 + 7 + 13 = 24.',
    },
    variants: [
      {
        id: 23, category: 'number_sequence', difficulty: 'genius', divergentDimension: 'flexibility',
        question: `In this Tetranacci sequence, each term is the sum of the four preceding terms:\n\n    0,  0,  1,  1,  2,  4,  8,  __`,
        options: ['15', '14', '16', '12'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'Tetranacci adds the previous four terms: 1 + 2 + 4 + 8 = 15.',
      },
      {
        id: 23, category: 'number_sequence', difficulty: 'genius', divergentDimension: 'flexibility',
        question: `In this Padovan sequence, P(n) = P(n-2) + P(n-3):\n\n    1,  1,  1,  2,  2,  3,  4,  __`,
        options: ['5', '6', '7', '4'], correctAnswer: 0, divergentScores: [3, 1, 2, 0], timeLimit: 30,
        explanation: 'Padovan: P(8) = P(6) + P(5) = 3 + 2 = 5.',
      },
    ],
  },
  {
    base: {
      id: 24, category: 'matrix', difficulty: 'genius', divergentDimension: 'elaboration',
      question: `This matrix has TWO rules operating simultaneously:\n• Row rule: Each row increases by +2\n• Column rule: Each column doubles\n\n        Col1   Col2   Col3\n    R1:   1      2      4\n    R2:   3      4      8\n    R3:   5      6     __`,
      options: ['12', '10', '14', '8'], correctAnswer: 0, divergentScores: [3, 2, 1, 0], timeLimit: 30,
      explanation: 'Following the column doubling rule: Column 3 = Column 2 × 2. So 6 × 2 = 12.',
    },
    variants: [
      {
        id: 24, category: 'matrix', difficulty: 'genius', divergentDimension: 'elaboration',
        question: `This matrix has TWO rules operating simultaneously:\n• Row rule: Each row multiplies by 2\n• Column rule: Each column adds 1\n\n        Col1   Col2   Col3\n    R1:   1      2      3\n    R2:   2      4      6\n    R3:   4      8     __`,
        options: ['12', '16', '10', '9'], correctAnswer: 0, divergentScores: [3, 2, 1, 0], timeLimit: 30,
        explanation: 'Row 3 doubles Row 2: 6 × 2 = 12. Alternatively, Col3 = Col2 + Col1 in pattern.',
      },
      {
        id: 24, category: 'matrix', difficulty: 'genius', divergentDimension: 'elaboration',
        question: `This matrix follows two patterns:\n• Rows: arithmetic (+3)\n• Columns: geometric (×2)\n\n        Col1   Col2   Col3\n    R1:   2      4      8\n    R2:   5      7     14\n    R3:   8     10     __`,
        options: ['20', '16', '24', '12'], correctAnswer: 0, divergentScores: [3, 2, 1, 0], timeLimit: 30,
        explanation: 'Column 3 = Column 2 × 2. So 10 × 2 = 20.',
      },
    ],
  },
  {
    base: {
      id: 25, category: 'abstract', difficulty: 'genius',
      question: `This sequence represents something you encounter every year. What comes after N?\n\n    J,  F,  M,  A,  M,  J,  J,  A,  S,  O,  N,  __`,
      options: ['D', 'J', 'M', 'L'], correctAnswer: 0, timeLimit: 30,
      explanation: 'These are the first letters of the months: January, February, March... November, December. D for December.',
    },
    variants: [
      {
        id: 25, category: 'abstract', difficulty: 'genius',
        question: `This sequence represents something you encounter every week. What comes after F?\n\n    M,  T,  W,  T,  F,  __`,
        options: ['S', 'M', 'T', 'W'], correctAnswer: 0, timeLimit: 30,
        explanation: 'These are the first letters of weekdays: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. S for Saturday.',
      },
      {
        id: 25, category: 'abstract', difficulty: 'genius',
        question: `This sequence represents musical notes. What comes after B?\n\n    C,  D,  E,  F,  G,  A,  B,  __`,
        options: ['C', 'D', 'A', 'H'], correctAnswer: 0, timeLimit: 30,
        explanation: 'These are musical notes in order: C, D, E, F, G, A, B, then it cycles back to C.',
      },
    ],
  },
];
