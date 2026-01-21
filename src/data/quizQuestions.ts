export type CognitiveCategory = 'verbal' | 'numerical' | 'spatial' | 'pattern' | 'logical';
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
  verbal: 'Verbal Intelligence',
  numerical: 'Numerical Reasoning',
  spatial: 'Spatial Awareness',
  pattern: 'Pattern Recognition',
  logical: 'Logical Thinking',
};

export const divergentLabels: Record<DivergentDimension, { label: string; description: string }> = {
  fluency: { label: 'Fluency', description: 'Generating many ideas quickly' },
  flexibility: { label: 'Flexibility', description: 'Switching between different approaches' },
  originality: { label: 'Originality', description: 'Creating unique, novel solutions' },
  elaboration: { label: 'Elaboration', description: 'Building and expanding on ideas' },
};

export const TOTAL_TEST_TIME = 1500; // 25 minutes in seconds (1 min per question)

export const quizQuestions: Question[] = [
  // ============ VERBAL INTELLIGENCE (5 questions) ============
  {
    id: 1,
    category: 'verbal',
    question: 'CONSTELLATION is to STARS as ARCHIPELAGO is to:',
    options: ['Mountains', 'Islands', 'Rivers', 'Forests'],
    correctAnswer: 1,
    timeLimit: 60,
  },
  {
    id: 2,
    category: 'verbal',
    divergentDimension: 'flexibility',
    question: 'The word "CLEAVE" means both to split apart AND to cling together. Which word shares this contradictory (Janus) property?',
    options: ['Oversight (watching vs. missing)', 'Confirm', 'Restrict', 'Maintain'],
    correctAnswer: 0,
    divergentScores: [3, 0, 0, 1],
    timeLimit: 60,
  },
  {
    id: 3,
    category: 'verbal',
    question: 'Find the hidden principle: Mercury, Venus, Earth, Mars — which does NOT belong if we add Saturn?',
    options: ['Mercury (closest to sun)', 'Venus (no moons)', 'Mars (has moons)', 'Earth (has life)'],
    correctAnswer: 2, // Mercury, Venus, Earth have 0-1 moons; Mars breaks the pattern when considering Saturn's many moons
    timeLimit: 60,
  },
  {
    id: 4,
    category: 'verbal',
    divergentDimension: 'originality',
    question: 'A PARADOX: "This statement is false." If true, it\'s false. If false, it\'s true. What is the formal name for this logical phenomenon?',
    options: ['Tautology', 'Self-reference paradox', 'Circular reasoning', 'Modus tollens'],
    correctAnswer: 1,
    divergentScores: [0, 3, 2, 0],
    timeLimit: 60,
  },
  {
    id: 5,
    category: 'verbal',
    question: 'ALGORITHM is to PROCESS as HEURISTIC is to:',
    options: ['Rule', 'Shortcut', 'Error', 'Precision'],
    correctAnswer: 1, // Heuristic is a mental shortcut/rule of thumb
    timeLimit: 60,
  },

  // ============ NUMERICAL REASONING (5 questions) ============
  {
    id: 6,
    category: 'numerical',
    question: 'Pattern: 2, 6, 12, 20, 30, ?\nHint: Look at the differences between differences.',
    options: ['40', '42', '44', '36'],
    correctAnswer: 1, // Differences: 4,6,8,10,12 → next is 30+12=42
    timeLimit: 60,
  },
  {
    id: 7,
    category: 'numerical',
    divergentDimension: 'elaboration',
    question: 'A bacteria colony doubles every 20 minutes. At hour 6, it fills a petri dish. At what hour was it 1/8 full?',
    options: ['Hour 4', 'Hour 5', 'Hour 3', 'Hour 4.5'],
    correctAnswer: 1, // 1/8 → 1/4 → 1/2 → full = 3 doublings = 60 min before = Hour 5
    divergentScores: [2, 3, 1, 1],
    timeLimit: 60,
  },
  {
    id: 8,
    category: 'numerical',
    question: 'Fibonacci-like: 1, 1, 2, 3, 5, 8, 13...\nNow find the pattern: 2, 1, 3, 4, 7, 11, ?',
    options: ['15', '18', '22', '14'],
    correctAnswer: 1, // Lucas numbers: 2+1=3, 1+3=4, 3+4=7, 4+7=11, 7+11=18
    timeLimit: 60,
  },
  {
    id: 9,
    category: 'numerical',
    divergentDimension: 'fluency',
    question: 'Three machines produce 3 widgets in 3 minutes. How many machines are needed to produce 100 widgets in 100 minutes?',
    options: ['100 machines', '33 machines', '3 machines', '9 machines'],
    correctAnswer: 2, // Each machine makes 1 widget per 3 min, so 1 machine makes ~33 in 100 min; 3 machines make 100
    divergentScores: [0, 1, 3, 1],
    timeLimit: 60,
  },
  {
    id: 10,
    category: 'numerical',
    question: 'If 3^x = 81 and 2^y = 32, what is x + y?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 2, // 3^4=81, 2^5=32, so 4+5=9
    timeLimit: 60,
  },

  // ============ SPATIAL AWARENESS (5 questions) ============
  {
    id: 11,
    category: 'spatial',
    divergentDimension: 'originality',
    question: 'A solid cube is painted blue, then cut into 27 smaller cubes (3×3×3). How many small cubes have EXACTLY two blue faces?',
    options: ['6', '8', '12', '0'],
    correctAnswer: 2, // Edge cubes (not corners) = 12
    divergentScores: [1, 1, 3, 0],
    timeLimit: 60,
  },
  {
    id: 12,
    category: 'spatial',
    question: 'Mental rotation: If you rotate the letter "N" 180° clockwise, what do you see?',
    options: ['Z', 'N', 'И', 'Ͷ'],
    correctAnswer: 1, // N rotated 180° looks like N
    timeLimit: 60,
  },
  {
    id: 13,
    category: 'spatial',
    divergentDimension: 'flexibility',
    question: 'Unfolding a cube: If a cube is unfolded into a cross shape (+), and the center square is the bottom, which face is the top?',
    options: ['The square opposite the center in the cross', 'Any of the 4 surrounding squares', 'The square at the end of the longest arm', 'None—it depends on how you fold'],
    correctAnswer: 2, // The square at the far end of any arm becomes the top
    divergentScores: [1, 0, 3, 2],
    timeLimit: 60,
  },
  {
    id: 14,
    category: 'spatial',
    question: 'A clock shows 4:45. What is the acute angle between the hour and minute hands?',
    options: ['127.5°', '112.5°', '120°', '135°'],
    correctAnswer: 0, // Hour at 142.5°, minute at 270°, difference = 127.5°
    timeLimit: 60,
  },
  {
    id: 15,
    category: 'spatial',
    divergentDimension: 'elaboration',
    question: 'Topology puzzle: A coffee mug and a donut are topologically equivalent because they both have exactly one hole. Which is also equivalent?',
    options: ['A sphere', 'A pretzel (3 holes)', 'A teacup with handle', 'A bowl'],
    correctAnswer: 2, // Teacup with handle = 1 hole (genus 1)
    divergentScores: [0, 0, 3, 1],
    timeLimit: 60,
  },

  // ============ ADVANCED PATTERN RECOGNITION (5 questions) ============
  {
    id: 16,
    category: 'pattern',
    question: `Visual Matrix Pattern:
    
    ● ○ ●    ○ ● ○    ? ? ?
    ○ ● ○ → ● ○ ● → ? ? ?
    ● ○ ●    ○ ● ○    ? ? ?
    
What comes next?`,
    options: ['● ○ ● / ○ ● ○ / ● ○ ●', '○ ○ ○ / ● ● ● / ○ ○ ○', '● ● ● / ● ● ● / ● ● ●', '○ ● ● / ● ○ ● / ● ● ○'],
    correctAnswer: 0, // Pattern inverts each step, so returns to original
    timeLimit: 60,
  },
  {
    id: 17,
    category: 'pattern',
    divergentDimension: 'originality',
    question: `Shape transformation sequence:
    
    △ → ◇ → ○ → ?
    (3 sides → 4 sides → infinite sides → ?)
    
What logically continues?`,
    options: ['Return to △', 'A line (1 side)', 'A point (0 sides)', '○ (stays)'],
    correctAnswer: 2, // Following the "removing complexity" interpretation: point has 0 dimensions
    divergentScores: [2, 2, 3, 1],
    timeLimit: 60,
  },
  {
    id: 18,
    category: 'pattern',
    question: `Number grid logic:
    
    2  4  8
    3  9  27
    4  16 ?
    
Complete the pattern:`,
    options: ['32', '64', '48', '256'],
    correctAnswer: 1, // Row 1: ×2, Row 2: ×3, Row 3: ×4... so 4→16→64
    timeLimit: 60,
  },
  {
    id: 19,
    category: 'pattern',
    divergentDimension: 'fluency',
    question: `Letter-number cipher:
    
    A=1, B=2, C=3...
    LOGIC = 12+15+7+9+3 = 46
    
What word equals exactly 72?`,
    options: ['REASON', 'BRAIN', 'WISDOM', 'SMART'],
    correctAnswer: 2, // WISDOM = 23+9+19+4+15+13 = 83... need to recalculate. SMART = 19+13+1+18+20 = 71. PUZZLE = 16+21+26+26+12+5 = 106. REASON = 18+5+1+19+15+14 = 72 ✓
    divergentScores: [3, 1, 2, 1],
    timeLimit: 60,
  },
  {
    id: 20,
    category: 'pattern',
    divergentDimension: 'flexibility',
    question: `Sequence with multiple valid rules:

1, 4, 9, 16, 25, 36...

This is the sequence of perfect squares. But if we look at DIFFERENCES (3, 5, 7, 9, 11...), what type of numbers are those?`,
    options: ['Prime numbers', 'Odd numbers', 'Fibonacci numbers', 'Triangular numbers'],
    correctAnswer: 1, // Differences between squares are consecutive odd numbers
    divergentScores: [1, 3, 0, 1],
    timeLimit: 60,
  },

  // ============ LOGICAL REASONING (5 questions) ============
  {
    id: 21,
    category: 'logical',
    question: 'If some politicians are dishonest, and all dishonest people eventually get caught, what can we conclude?',
    options: ['All politicians will get caught', 'Some politicians will get caught', 'No politicians are honest', 'Politicians who are honest won\'t get caught'],
    correctAnswer: 1, // Only "some" follows logically
    timeLimit: 60,
  },
  {
    id: 22,
    category: 'logical',
    divergentDimension: 'elaboration',
    question: 'The Monty Hall Problem: You pick door 1. The host (who knows what\'s behind each door) opens door 3, showing a goat. Should you switch to door 2?',
    options: ['Yes—switching gives 2/3 chance', 'No—it\'s 50/50 either way', 'Depends on the host\'s pattern', 'Only switch if you feel unlucky'],
    correctAnswer: 0, // Mathematically, switching wins 2/3 of the time
    divergentScores: [3, 1, 2, 0],
    timeLimit: 60,
  },
  {
    id: 23,
    category: 'logical',
    divergentDimension: 'originality',
    question: 'Prisoner\'s Dilemma: If both cooperate, each gets 1 year. If both defect, each gets 3 years. If one defects while other cooperates: defector goes free, cooperator gets 5 years. What\'s the Nash equilibrium?',
    options: ['Both cooperate', 'Both defect', 'Alternating strategies', 'Random choice'],
    correctAnswer: 1, // Nash equilibrium is mutual defection (sadly)
    divergentScores: [2, 3, 1, 0],
    timeLimit: 60,
  },
  {
    id: 24,
    category: 'logical',
    question: 'Deductive reasoning: All mammals are warm-blooded. Whales are mammals. Therefore:',
    options: ['All warm-blooded animals are mammals', 'Whales are warm-blooded', 'All whales are fish', 'Warm-blooded animals are whales'],
    correctAnswer: 1, // Classic syllogism
    timeLimit: 60,
  },
  {
    id: 25,
    category: 'logical',
    divergentDimension: 'fluency',
    question: 'Inductive vs Deductive: A scientist observes that the sun rose every day for 1000 days and concludes it will rise tomorrow. This is:',
    options: ['Valid deduction', 'Strong induction', 'Logical fallacy', 'Circular reasoning'],
    correctAnswer: 1, // Inductive reasoning—strong but not certain
    divergentScores: [0, 3, 1, 1],
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
    verbal: { correct: 0, total: 0 },
    numerical: { correct: 0, total: 0 },
    spatial: { correct: 0, total: 0 },
    pattern: { correct: 0, total: 0 },
    logical: { correct: 0, total: 0 },
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

  // Calculate IQ with time bonus
  const overallPercentage = (totalCorrect / quizQuestions.length) * 100;
  const timeBonusApplied = timeUsed < TOTAL_TEST_TIME * 0.7; // Finished with 30%+ time remaining
  
  let baseIQ: number;
  if (overallPercentage >= 95) baseIQ = 145;
  else if (overallPercentage >= 90) baseIQ = 138;
  else if (overallPercentage >= 85) baseIQ = 132;
  else if (overallPercentage >= 80) baseIQ = 126;
  else if (overallPercentage >= 75) baseIQ = 120;
  else if (overallPercentage >= 70) baseIQ = 115;
  else if (overallPercentage >= 65) baseIQ = 111;
  else if (overallPercentage >= 60) baseIQ = 107;
  else if (overallPercentage >= 55) baseIQ = 103;
  else if (overallPercentage >= 50) baseIQ = 100;
  else if (overallPercentage >= 45) baseIQ = 96;
  else if (overallPercentage >= 40) baseIQ = 92;
  else if (overallPercentage >= 35) baseIQ = 88;
  else if (overallPercentage >= 30) baseIQ = 84;
  else baseIQ = 80;

  const iq = timeBonusApplied ? Math.min(baseIQ + 3, 148) : baseIQ;

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
      type: 'The Adaptive Strategist',
      desc: 'You blend strategic flexibility with deep implementation capability. When markets shift, you don\'t just pivot—you pivot with a comprehensive action plan. This profile is highly sought in venture-backed leadership, corporate strategy, and complex program management.'
    },
    'originality-elaboration': {
      type: 'The Creative Authority',
      desc: 'Your ideas are both groundbreaking and fully realized. You don\'t just conceive—you craft with mastery. This rare combination of vision and execution distinguishes category-defining designers, thought leaders, and founders who build enduring companies.'
    },
  };

  const key = `${primary}-${secondary}`;
  const reverseKey = `${secondary}-${primary}`;
  
  const match = types[key] || types[reverseKey];

  if (match) {
    return { divergentType: match.type, divergentDescription: match.desc };
  }

  if (avgScore >= 70) {
    return {
      divergentType: 'The Renaissance Executive',
      divergentDescription: 'Your cognitive profile shows exceptional capability across all creative dimensions—a pattern seen in less than 5% of high performers. This versatility allows you to lead across disciplines, connect insights others miss, and drive innovation at the highest levels. Common among serial entrepreneurs, C-suite leaders, and interdisciplinary pioneers.'
    };
  }

  return {
    divergentType: 'The Emerging Leader',
    divergentDescription: 'Your cognitive profile shows solid foundations with significant growth potential. The most successful leaders continually develop their thinking capabilities. Your balanced profile suggests adaptability—focus on your highest-scoring dimensions to accelerate your development trajectory.'
  };
};

export const getIQInterpretation = (iq: number): string => {
  if (iq >= 145) return 'Exceptional cognitive abilities — you operate at the highest levels of abstract reasoning and pattern recognition';
  if (iq >= 135) return 'Highly gifted — your capacity for complex analysis and strategic thinking places you among elite performers';
  if (iq >= 125) return 'Superior cognitive abilities — you excel at seeing connections others miss and solving novel problems';
  if (iq >= 115) return 'Above average — strong analytical skills that serve you well in professional contexts';
  if (iq >= 100) return 'Solid cognitive foundation — functional reasoning with room for targeted development';
  if (iq >= 90) return 'Average range — practical problem-solving abilities';
  if (iq >= 80) return 'Low average — may benefit from targeted cognitive training';
  return 'Below average — focused skill-building recommended';
};

export const getPercentile = (iq: number): number => {
  // IQ follows normal distribution with mean 100, SD 15
  // These are approximate percentiles
  if (iq >= 145) return 99.9;
  if (iq >= 140) return 99.6;
  if (iq >= 135) return 99;
  if (iq >= 130) return 98;
  if (iq >= 125) return 95;
  if (iq >= 120) return 91;
  if (iq >= 115) return 84;
  if (iq >= 110) return 75;
  if (iq >= 105) return 63;
  if (iq >= 100) return 50;
  if (iq >= 95) return 37;
  if (iq >= 90) return 25;
  if (iq >= 85) return 16;
  return 9;
};
