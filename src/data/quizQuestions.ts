export interface Question {
  id: number;
  type: 'pattern' | 'sequence' | 'analogy' | 'spatial';
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: number; // 1-5
  timeLimit?: number; // seconds
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    type: 'sequence',
    question: 'What comes next in the sequence?\n2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '44'],
    correctAnswer: 2,
    difficulty: 2,
  },
  {
    id: 2,
    type: 'pattern',
    question: 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?',
    options: ['True', 'False', 'Cannot be determined', 'Sometimes true'],
    correctAnswer: 0,
    difficulty: 1,
  },
  {
    id: 3,
    type: 'sequence',
    question: 'What number should replace the question mark?\n1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '20', '21', '26'],
    correctAnswer: 2,
    difficulty: 2,
  },
  {
    id: 4,
    type: 'analogy',
    question: 'WOLF is to PACK as FISH is to:',
    options: ['Herd', 'Flock', 'School', 'Swarm'],
    correctAnswer: 2,
    difficulty: 1,
  },
  {
    id: 5,
    type: 'sequence',
    question: 'What comes next?\n3, 6, 11, 18, 27, ?',
    options: ['36', '38', '40', '42'],
    correctAnswer: 1,
    difficulty: 3,
  },
  {
    id: 6,
    type: 'pattern',
    question: 'Mary is 16 years old. Mary is 4 times as old as her brother was when Mary was the same age as her brother is now. How old is Mary\'s brother?',
    options: ['8', '10', '12', '14'],
    correctAnswer: 0,
    difficulty: 4,
  },
  {
    id: 7,
    type: 'spatial',
    question: 'If you rearrange the letters "CIFAIPC" you would have the name of a(n):',
    options: ['City', 'Ocean', 'Animal', 'Country'],
    correctAnswer: 1,
    difficulty: 2,
  },
  {
    id: 8,
    type: 'sequence',
    question: 'What number should come next in this series?\n25, 24, 22, 19, 15, ?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 0,
    difficulty: 3,
  },
  {
    id: 9,
    type: 'analogy',
    question: 'FINGER is to HAND as LEAF is to:',
    options: ['Root', 'Twig', 'Branch', 'Tree'],
    correctAnswer: 2,
    difficulty: 2,
  },
  {
    id: 10,
    type: 'pattern',
    question: 'Which number is the odd one out?\n3, 5, 11, 14, 17, 21',
    options: ['21', '14', '5', '11'],
    correctAnswer: 1,
    difficulty: 3,
  },
];

export const calculateIQ = (correctAnswers: number, totalQuestions: number): number => {
  // Simplified IQ calculation based on percentage
  // Average IQ is 100, with standard deviation of 15
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  // Map percentage to IQ range (roughly 70-145)
  if (percentage >= 100) return 145;
  if (percentage >= 90) return 135 + Math.floor((percentage - 90) * 1);
  if (percentage >= 80) return 120 + Math.floor((percentage - 80) * 1.5);
  if (percentage >= 70) return 110 + Math.floor((percentage - 70) * 1);
  if (percentage >= 60) return 100 + Math.floor((percentage - 60) * 1);
  if (percentage >= 50) return 90 + Math.floor((percentage - 50) * 1);
  if (percentage >= 40) return 85 + Math.floor((percentage - 40) * 0.5);
  if (percentage >= 30) return 80 + Math.floor((percentage - 30) * 0.5);
  return 70 + Math.floor(percentage * 0.3);
};

export const getIQCategory = (iq: number): { label: string; description: string; emoji: string } => {
  if (iq >= 140) return { label: 'Genius', description: 'You\'re in the top 0.1%. Your cognitive abilities are exceptional.', emoji: '🧠✨' };
  if (iq >= 130) return { label: 'Gifted', description: 'Top 2% of the population. Your abstract reasoning is outstanding.', emoji: '🌟' };
  if (iq >= 120) return { label: 'Superior', description: 'Top 10%. You excel at complex problem-solving.', emoji: '💫' };
  if (iq >= 110) return { label: 'High Average', description: 'Above average intelligence. You think quickly and clearly.', emoji: '⚡' };
  if (iq >= 90) return { label: 'Average', description: 'Right in the middle. You handle everyday problems well.', emoji: '🎯' };
  if (iq >= 80) return { label: 'Low Average', description: 'Slightly below average, but still within normal range.', emoji: '📊' };
  return { label: 'Below Average', description: 'Some challenges with abstract reasoning.', emoji: '📈' };
};
