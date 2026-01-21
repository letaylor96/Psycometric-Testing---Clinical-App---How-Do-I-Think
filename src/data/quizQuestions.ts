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

export const TOTAL_TEST_TIME = 480; // 8 minutes in seconds

export const quizQuestions: Question[] = [
  // VERBAL INTELLIGENCE (5 questions)
  {
    id: 1,
    category: 'verbal',
    question: 'CONSTELLATION is to STARS as ARCHIPELAGO is to:',
    options: ['Mountains', 'Islands', 'Rivers', 'Forests'],
    correctAnswer: 1,
    timeLimit: 20,
  },
  {
    id: 2,
    category: 'verbal',
    divergentDimension: 'flexibility',
    question: 'The word "SANCTION" can mean both approval AND punishment. Which other word shares this contradictory property?',
    options: ['Overlook', 'Confirm', 'Restrict', 'Maintain'],
    correctAnswer: 0, // Overlook = supervise OR ignore
    divergentScores: [3, 1, 0, 1],
    timeLimit: 25,
  },
  {
    id: 3,
    category: 'verbal',
    question: 'Which word does NOT belong: Ephemeral, Transient, Perpetual, Fleeting, Momentary',
    options: ['Ephemeral', 'Transient', 'Perpetual', 'Momentary'],
    correctAnswer: 2,
    timeLimit: 20,
  },
  {
    id: 4,
    category: 'verbal',
    divergentDimension: 'originality',
    question: 'Unscramble "NIOITNUT" to find a word meaning gut feeling. What field relies most on this concept?',
    options: ['Mathematics', 'Philosophy', 'Engineering', 'Accounting'],
    correctAnswer: 1, // INTUITION - philosophy deals with intuition
    divergentScores: [1, 3, 1, 0],
    timeLimit: 30,
  },
  {
    id: 5,
    category: 'verbal',
    question: 'SCALPEL is to SURGEON as CHISEL is to:',
    options: ['Painter', 'Sculptor', 'Architect', 'Musician'],
    correctAnswer: 1,
    timeLimit: 15,
  },

  // NUMERICAL REASONING (5 questions)
  {
    id: 6,
    category: 'numerical',
    question: 'What comes next: 1, 4, 9, 16, 25, 36, ?',
    options: ['42', '47', '49', '52'],
    correctAnswer: 2, // Perfect squares
    timeLimit: 20,
  },
  {
    id: 7,
    category: 'numerical',
    divergentDimension: 'elaboration',
    question: 'A snail climbs 3 meters up a wall during the day but slides down 2 meters each night. If the wall is 10 meters tall, on which day does it reach the top?',
    options: ['Day 8', 'Day 9', 'Day 10', 'Day 7'],
    correctAnswer: 0, // Day 8 (reaches top during day, doesn't slide)
    divergentScores: [3, 2, 1, 1],
    timeLimit: 35,
  },
  {
    id: 8,
    category: 'numerical',
    question: 'Complete: 2, 3, 5, 7, 11, 13, ?',
    options: ['15', '17', '19', '21'],
    correctAnswer: 1, // Prime numbers
    timeLimit: 20,
  },
  {
    id: 9,
    category: 'numerical',
    divergentDimension: 'fluency',
    question: 'A lily pad doubles in size every day. If it takes 48 days to cover a lake completely, on what day was it covering half the lake?',
    options: ['Day 24', 'Day 36', 'Day 47', 'Day 46'],
    correctAnswer: 2, // Day 47 (doubles on 48 to fill)
    divergentScores: [0, 1, 3, 2],
    timeLimit: 30,
  },
  {
    id: 10,
    category: 'numerical',
    question: 'What is the next number: 1, 1, 2, 6, 24, 120, ?',
    options: ['240', '600', '720', '840'],
    correctAnswer: 2, // Factorials: 1!, 1!, 2!, 3!, 4!, 5!, 6!=720
    timeLimit: 25,
  },

  // SPATIAL AWARENESS (5 questions)
  {
    id: 11,
    category: 'spatial',
    divergentDimension: 'originality',
    question: 'A solid cube has each face painted a different color. If you cut it into 8 smaller cubes, how many small cubes will have exactly 3 colors?',
    options: ['0', '4', '6', '8'],
    correctAnswer: 3, // All 8 corner cubes have 3 faces showing
    divergentScores: [1, 2, 1, 3],
    timeLimit: 35,
  },
  {
    id: 12,
    category: 'spatial',
    question: 'You\'re facing North. You turn 90° clockwise, then 180°, then 90° counter-clockwise. What direction are you facing?',
    options: ['North', 'South', 'East', 'West'],
    correctAnswer: 1, // South
    timeLimit: 25,
  },
  {
    id: 13,
    category: 'spatial',
    divergentDimension: 'flexibility',
    question: 'How many rectangles (including squares) are in a 3x3 grid of squares?',
    options: ['9', '18', '36', '45'],
    correctAnswer: 2, // 36 rectangles
    divergentScores: [0, 1, 3, 2],
    timeLimit: 40,
  },
  {
    id: 14,
    category: 'spatial',
    question: 'If you look at a clock in a mirror when it shows 3:30, what time appears to be shown?',
    options: ['8:30', '9:30', '6:30', '9:00'],
    correctAnswer: 0, // Mirror reversal shows 8:30
    timeLimit: 30,
  },
  {
    id: 15,
    category: 'spatial',
    divergentDimension: 'elaboration',
    question: 'A regular hexagon is divided into equilateral triangles. How many triangles fit inside?',
    options: ['4', '6', '8', '12'],
    correctAnswer: 1, // 6 equilateral triangles
    divergentScores: [1, 3, 2, 0],
    timeLimit: 25,
  },

  // PATTERN RECOGNITION (5 questions)
  {
    id: 16,
    category: 'pattern',
    question: 'Complete the pattern: Z, Y, W, T, P, ?',
    options: ['K', 'L', 'M', 'N'],
    correctAnswer: 0, // Gaps: 1, 2, 3, 4, 5... K
    timeLimit: 30,
  },
  {
    id: 17,
    category: 'pattern',
    divergentDimension: 'originality',
    question: 'Which doesn\'t belong: 64, 125, 216, 300, 343',
    options: ['64', '125', '300', '343'],
    correctAnswer: 2, // 300 is not a perfect cube
    divergentScores: [0, 1, 3, 1],
    timeLimit: 25,
  },
  {
    id: 18,
    category: 'pattern',
    question: 'If △ + ○ = 10, △ × ○ = 21, what is △ - ○?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2, // △=7, ○=3, diff=4
    timeLimit: 35,
  },
  {
    id: 19,
    category: 'pattern',
    divergentDimension: 'fluency',
    question: 'In the sequence A1, B2, D4, G7, K11... what comes next?',
    options: ['N14', 'O15', 'P16', 'Q17'],
    correctAnswer: 2, // Differences in letters: 1,2,3,4,5 and numbers follow same pattern
    divergentScores: [1, 2, 3, 1],
    timeLimit: 35,
  },
  {
    id: 20,
    category: 'pattern',
    divergentDimension: 'flexibility',
    question: 'Find the odd one out: 8, 27, 64, 100, 125, 216',
    options: ['8', '64', '100', '125'],
    correctAnswer: 2, // 100 is 10², others are perfect cubes
    divergentScores: [1, 1, 3, 1],
    timeLimit: 25,
  },

  // LOGICAL THINKING (5 questions)
  {
    id: 21,
    category: 'logical',
    question: 'A woman has 7 daughters and each daughter has a brother. How many children does she have?',
    options: ['7', '8', '14', '15'],
    correctAnswer: 1, // 8 (7 daughters + 1 brother they all share)
    timeLimit: 25,
  },
  {
    id: 22,
    category: 'logical',
    divergentDimension: 'elaboration',
    question: 'Three friends share a hotel room costing $30. They each pay $10. The clerk realizes it should be $25 and gives $5 to the bellhop to return. The bellhop keeps $2 and gives $1 to each friend. Each paid $9 (total $27) + $2 kept = $29. Where is the missing $1?',
    options: ['There is no missing dollar', 'The clerk has it', 'The bellhop has it', 'It was never there'],
    correctAnswer: 0, // Faulty logic - you shouldn\'t add the $2
    divergentScores: [3, 0, 1, 2],
    timeLimit: 45,
  },
  {
    id: 23,
    category: 'logical',
    divergentDimension: 'originality',
    question: 'You have 12 identical coins. One is counterfeit (different weight). Using a balance scale only 3 times, can you always find it AND determine if it\'s heavier or lighter?',
    options: ['Yes, always possible', 'Only if you\'re lucky', 'No, you need 4 weighings', 'Only find it, not weight difference'],
    correctAnswer: 0,
    divergentScores: [3, 0, 1, 2],
    timeLimit: 35,
  },
  {
    id: 24,
    category: 'logical',
    question: 'If all Zorbs are Yips, and some Yips are Wubs, which must be true?',
    options: ['All Zorbs are Wubs', 'Some Zorbs are Wubs', 'No Zorbs are Wubs', 'None of the above must be true'],
    correctAnswer: 3, // We can\'t conclude anything about Zorbs and Wubs
    timeLimit: 30,
  },
  {
    id: 25,
    category: 'logical',
    divergentDimension: 'fluency',
    question: 'Two fathers and two sons go fishing. Each catches exactly one fish. They bring home exactly 3 fish. How is this possible?',
    options: ['One fish was thrown back', 'They are grandfather, father, son', 'They shared one fish', 'One fish was eaten there'],
    correctAnswer: 1, // Three people: grandfather, father (who is also a son), son
    divergentScores: [0, 3, 1, 0],
    timeLimit: 30,
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
      divergentType: 'Convergent Analyst',
      divergentDescription: 'You excel at finding the single best solution through systematic analysis. Your strength is focused, methodical problem-solving—zeroing in on the optimal answer rather than exploring many alternatives.'
    };
  }

  const primary = topTwo[0].dimension;
  const secondary = topTwo[1].dimension;

  const types: Record<string, { type: string; desc: string }> = {
    'fluency-flexibility': {
      type: 'The Catalyst',
      desc: 'You generate ideas at lightning speed and pivot effortlessly between perspectives. You energize brainstorms and see connections others miss. Best suited for: startup environments, creative direction, crisis problem-solving.'
    },
    'fluency-originality': {
      type: 'The Maverick',
      desc: 'Your mind produces a torrent of unconventional ideas. You don\'t just think outside the box—you question why the box exists. Best suited for: innovation labs, disruptive startups, artistic ventures.'
    },
    'fluency-elaboration': {
      type: 'The Architect',
      desc: 'You combine prolific ideation with the patience to build ideas out fully. You see projects from spark to completion. Best suited for: product development, worldbuilding, systems design.'
    },
    'flexibility-originality': {
      type: 'The Shapeshifter',
      desc: 'You reframe problems in unexpected ways and arrive at solutions nobody anticipated. Your mental agility paired with originality creates breakthrough thinking. Best suited for: consulting, R&D, creative strategy.'
    },
    'flexibility-elaboration': {
      type: 'The Strategist',
      desc: 'You adapt your thinking fluidly while building comprehensive, detailed solutions. You excel at pivoting without losing depth. Best suited for: business strategy, game design, policy development.'
    },
    'originality-elaboration': {
      type: 'The Artisan',
      desc: 'Your ideas are both unique and fully realized—you don\'t just conceive, you craft. Every detail matters, and your work is distinctly yours. Best suited for: design, writing, specialized crafts, research.'
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
      divergentType: 'The Polymath',
      divergentDescription: 'You have exceptional divergent thinking across all dimensions. This rare versatility means you can approach any creative challenge from multiple angles. Best suited for: entrepreneurship, creative leadership, interdisciplinary research.'
    };
  }

  return {
    divergentType: 'The Explorer',
    divergentDescription: 'You have a balanced creative profile with room to develop. Your thinking style adapts to different challenges. Focus on the dimensions where you scored highest to unlock your creative potential.'
  };
};

export const getIQInterpretation = (iq: number): string => {
  if (iq >= 145) return 'Exceptional cognitive abilities, top 0.1% of population';
  if (iq >= 135) return 'Highly gifted, top 1% — exceptional abstract reasoning';
  if (iq >= 125) return 'Gifted range, top 5% — superior problem-solving';
  if (iq >= 115) return 'Above average, top 15% — strong analytical skills';
  if (iq >= 100) return 'Average to high average — solid reasoning abilities';
  if (iq >= 90) return 'Average range — functional everyday reasoning';
  if (iq >= 80) return 'Low average — practical problem-solving';
  return 'Below average — may benefit from targeted skill-building';
};
