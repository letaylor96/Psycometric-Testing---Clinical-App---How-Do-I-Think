export type CognitiveCategory = 'verbal' | 'numerical' | 'spatial' | 'pattern' | 'logical';
export type DivergentDimension = 'fluency' | 'flexibility' | 'originality' | 'elaboration';

export interface Question {
  id: number;
  category: CognitiveCategory;
  divergentDimension?: DivergentDimension;
  question: string;
  options: string[];
  correctAnswer: number;
  // For divergent thinking questions, scoring is different
  divergentScores?: number[]; // Score for each option (0-3)
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

export const quizQuestions: Question[] = [
  // VERBAL INTELLIGENCE (4 questions)
  {
    id: 1,
    category: 'verbal',
    question: 'WOLF is to PACK as FISH is to:',
    options: ['Herd', 'Flock', 'School', 'Swarm'],
    correctAnswer: 2,
  },
  {
    id: 2,
    category: 'verbal',
    question: 'Which word is most nearly OPPOSITE in meaning to "EPHEMERAL"?',
    options: ['Fleeting', 'Permanent', 'Temporary', 'Brief'],
    correctAnswer: 1,
  },
  {
    id: 3,
    category: 'verbal',
    divergentDimension: 'flexibility',
    question: 'If you rearrange "CIFAIPC" you get a word related to:',
    options: ['A body of water', 'A continent', 'A weather pattern', 'A direction'],
    correctAnswer: 0, // PACIFIC
    divergentScores: [3, 2, 1, 1],
  },
  {
    id: 4,
    category: 'verbal',
    question: 'CANVAS is to PAINTER as MARBLE is to:',
    options: ['Artist', 'Sculptor', 'Architect', 'Mason'],
    correctAnswer: 1,
  },

  // NUMERICAL REASONING (4 questions)
  {
    id: 5,
    category: 'numerical',
    question: 'What comes next: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '44'],
    correctAnswer: 2, // differences: 4,6,8,10,12
  },
  {
    id: 6,
    category: 'numerical',
    question: 'What number completes the sequence: 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '20', '21', '26'],
    correctAnswer: 2, // Fibonacci
  },
  {
    id: 7,
    category: 'numerical',
    divergentDimension: 'elaboration',
    question: 'If 3 machines make 3 widgets in 3 minutes, how many widgets do 100 machines make in 100 minutes?',
    options: ['100', '300', '1000', '10000'],
    correctAnswer: 3,
    divergentScores: [0, 1, 2, 3],
  },
  {
    id: 8,
    category: 'numerical',
    question: 'What comes next: 25, 24, 22, 19, 15, ?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 0, // differences: -1,-2,-3,-4,-5
  },

  // SPATIAL AWARENESS (4 questions)
  {
    id: 9,
    category: 'spatial',
    divergentDimension: 'originality',
    question: 'A cube is painted red on all sides, then cut into 27 smaller equal cubes. How many small cubes have exactly 2 red faces?',
    options: ['6', '8', '12', '24'],
    correctAnswer: 2, // Edge cubes (12)
    divergentScores: [1, 2, 3, 0],
  },
  {
    id: 10,
    category: 'spatial',
    question: 'If you fold a square piece of paper in half twice and cut a small triangle from the folded corner, how many holes will you see when unfolded?',
    options: ['1', '2', '4', '8'],
    correctAnswer: 0, // 1 hole in center
  },
  {
    id: 11,
    category: 'spatial',
    question: 'Which shape can be formed by folding a cross made of 6 equal squares?',
    options: ['Pyramid', 'Cube', 'Prism', 'Sphere'],
    correctAnswer: 1,
  },
  {
    id: 12,
    category: 'spatial',
    divergentDimension: 'flexibility',
    question: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
    options: ['0°', '7.5°', '15°', '22.5°'],
    correctAnswer: 1, // Hour hand moves 0.5° per minute
    divergentScores: [0, 3, 2, 1],
  },

  // PATTERN RECOGNITION (4 questions)
  {
    id: 13,
    category: 'pattern',
    question: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?',
    options: ['True', 'False', 'Cannot determine', 'Sometimes'],
    correctAnswer: 0,
  },
  {
    id: 14,
    category: 'pattern',
    divergentDimension: 'originality',
    question: 'Which number is the odd one out: 3, 5, 11, 14, 17, 21',
    options: ['3', '14', '21', '5'],
    correctAnswer: 1, // 14 is even, others are odd/prime
    divergentScores: [1, 3, 2, 1],
  },
  {
    id: 15,
    category: 'pattern',
    question: 'Complete the pattern: J, F, M, A, M, J, J, ?',
    options: ['A', 'S', 'O', 'N'],
    correctAnswer: 0, // Months
  },
  {
    id: 16,
    category: 'pattern',
    divergentDimension: 'fluency',
    question: 'What letter comes next: O, T, T, F, F, S, S, ?',
    options: ['E', 'N', 'T', 'O'],
    correctAnswer: 0, // One, Two, Three... Eight
    divergentScores: [3, 1, 1, 0],
  },

  // LOGICAL THINKING (4 questions)
  {
    id: 17,
    category: 'logical',
    question: 'Mary is 16 years old. She is 4 times as old as her brother was when she was the same age as her brother is now. How old is her brother?',
    options: ['8', '10', '12', '14'],
    correctAnswer: 0,
  },
  {
    id: 18,
    category: 'logical',
    divergentDimension: 'elaboration',
    question: 'A farmer has 17 sheep. All but 9 run away. How many sheep does the farmer have left?',
    options: ['8', '9', '17', '0'],
    correctAnswer: 1, // "All but 9" = 9 remain
    divergentScores: [0, 3, 1, 0],
  },
  {
    id: 19,
    category: 'logical',
    question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    options: ['1 minute', '5 minutes', '20 minutes', '100 minutes'],
    correctAnswer: 1,
  },
  {
    id: 20,
    category: 'logical',
    divergentDimension: 'fluency',
    question: 'You have two hourglasses: one measures 4 minutes, one measures 7 minutes. How do you measure exactly 9 minutes?',
    options: [
      'Start both, flip 4-min when done, flip 7-min when done',
      'Start both, when 4 ends flip it, when 7 ends start timing',
      'Start 7-min, when done start 4-min, flip when half done',
      'Cannot be done with these hourglasses'
    ],
    correctAnswer: 1,
    divergentScores: [1, 3, 2, 0],
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
}

export const calculateResults = (answers: number[]): TestResults => {
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
    const isCorrect = userAnswer === question.correctAnswer;
    
    categoryScores[question.category].total++;
    if (isCorrect) {
      categoryScores[question.category].correct++;
      totalCorrect++;
    }

    // Track divergent thinking scores
    if (question.divergentDimension && question.divergentScores) {
      divergentScores[question.divergentDimension].maxScore += 3;
      divergentScores[question.divergentDimension].score += question.divergentScores[userAnswer] || 0;
    }
  });

  // Calculate category percentages
  const categoryResults: CategoryScore[] = Object.entries(categoryScores).map(([cat, data]) => ({
    category: cat as CognitiveCategory,
    correct: data.correct,
    total: data.total,
    percentage: Math.round((data.correct / data.total) * 100),
  }));

  // Calculate divergent profile
  const divergentProfile: DivergentProfile[] = Object.entries(divergentScores).map(([dim, data]) => ({
    dimension: dim as DivergentDimension,
    score: data.score,
    maxScore: data.maxScore,
    percentage: data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0,
  }));

  // Find primary cognitive strength
  const primaryStrength = categoryResults.reduce((best, current) => 
    current.percentage > best.percentage ? current : best
  ).category;

  // Calculate IQ estimate
  const overallPercentage = (totalCorrect / quizQuestions.length) * 100;
  let iq: number;
  if (overallPercentage >= 95) iq = 145;
  else if (overallPercentage >= 90) iq = 135;
  else if (overallPercentage >= 80) iq = 125;
  else if (overallPercentage >= 70) iq = 115;
  else if (overallPercentage >= 60) iq = 108;
  else if (overallPercentage >= 50) iq = 100;
  else if (overallPercentage >= 40) iq = 92;
  else if (overallPercentage >= 30) iq = 85;
  else iq = 78;

  // Determine divergent thinking type
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
  };
};

const getDivergentType = (profile: DivergentProfile[]): { divergentType: string; divergentDescription: string } => {
  const sorted = [...profile].sort((a, b) => b.percentage - a.percentage);
  const topTwo = sorted.slice(0, 2);
  const avgScore = profile.reduce((sum, p) => sum + p.percentage, 0) / profile.length;

  if (avgScore < 40) {
    return {
      divergentType: 'Convergent Thinker',
      divergentDescription: 'You excel at finding the single best solution through logical analysis. Your strength lies in focused, systematic problem-solving rather than generating multiple alternatives.'
    };
  }

  const primary = topTwo[0].dimension;
  const secondary = topTwo[1].dimension;

  const types: Record<string, { type: string; desc: string }> = {
    'fluency-flexibility': {
      type: 'The Brainstormer',
      desc: 'You generate ideas rapidly and can switch perspectives effortlessly. You thrive in brainstorming sessions and excel at seeing problems from multiple angles.'
    },
    'fluency-originality': {
      type: 'The Innovator',
      desc: 'You produce many ideas, and they\'re often surprisingly unique. You\'re naturally creative and can quickly generate novel solutions others wouldn\'t consider.'
    },
    'fluency-elaboration': {
      type: 'The Builder',
      desc: 'You generate many ideas and have the patience to develop them fully. You excel at both quantity and depth, making you effective at seeing projects through.'
    },
    'flexibility-originality': {
      type: 'The Visionary',
      desc: 'You combine mental agility with originality. You can reframe problems in unexpected ways and often arrive at breakthrough solutions through unconventional thinking.'
    },
    'flexibility-elaboration': {
      type: 'The Strategist',
      desc: 'You adapt your thinking to new situations and build comprehensive solutions. You excel at developing detailed plans while remaining open to pivoting when needed.'
    },
    'originality-elaboration': {
      type: 'The Artist',
      desc: 'Your ideas are both unique and fully realized. You don\'t just think outside the box—you build entirely new boxes with intricate detail and depth.'
    },
  };

  const key = `${primary}-${secondary}`;
  const reverseKey = `${secondary}-${primary}`;
  
  const match = types[key] || types[reverseKey] || {
    type: 'The Renaissance Thinker',
    desc: 'You have a balanced divergent thinking profile, with strengths across multiple dimensions. This versatility makes you adaptable to various creative challenges.'
  };

  return { divergentType: match.type, divergentDescription: match.desc };
};

export const getIQInterpretation = (iq: number): string => {
  if (iq >= 140) return 'Exceptional cognitive abilities, top 0.4% of population';
  if (iq >= 130) return 'Gifted range, top 2% - highly advanced reasoning';
  if (iq >= 120) return 'Superior intelligence, top 9% - excellent problem-solving';
  if (iq >= 110) return 'High average, top 25% - strong analytical skills';
  if (iq >= 90) return 'Average range - solid foundational reasoning';
  if (iq >= 80) return 'Low average - functional everyday reasoning';
  return 'Below average - may benefit from skill-building exercises';
};
