// Assessment Type Definitions

export type AssessmentType = 'personality' | 'iq' | 'cognitive' | 'adhd';

export interface AssessmentInfo {
  id: AssessmentType;
  title: string;
  shortTitle: string;
  description: string;
  framework: string;
  questionCount: number;
  timeMinutes: number;
  color: 'primary' | 'accent';
}

// Time calculation: 30 seconds per question
export const TIME_PER_QUESTION_SECONDS = 30;

export const assessmentInfo: Record<AssessmentType, AssessmentInfo> = {
  personality: {
    id: 'personality',
    title: 'Who Am I?',
    shortTitle: 'Personality',
    description: 'Discover what makes you tick - your strengths, how you connect with others, and what drives you.',
    framework: 'Big Five Personality',
    questionCount: 30,
    timeMinutes: Math.ceil((30 * TIME_PER_QUESTION_SECONDS) / 60), // 15 min
    color: 'primary',
  },
  iq: {
    id: 'iq',
    title: 'IQ Assessment',
    shortTitle: 'IQ',
    description: 'Measure your cognitive abilities through Mensa-style pattern recognition and abstract reasoning.',
    framework: "Raven's Progressive Matrices",
    questionCount: 25,
    timeMinutes: Math.ceil((25 * TIME_PER_QUESTION_SECONDS) / 60), // 13 min
    color: 'accent',
  },
  cognitive: {
    id: 'cognitive',
    title: 'My Cognitive Style',
    shortTitle: 'Cognitive',
    description: 'Discover how your mind naturally processes information - exploring thinking patterns often associated with neurodivergent minds.',
    framework: 'Neurodivergent Thinking Patterns',
    questionCount: 25,
    timeMinutes: Math.ceil((25 * TIME_PER_QUESTION_SECONDS) / 60), // 13 min
    color: 'primary',
  },
  adhd: {
    id: 'adhd',
    title: 'Am I Neurodivergent?',
    shortTitle: 'ADHD',
    description: 'Explore attention and focus patterns with a validated screening tool.',
    framework: 'ASRS-v1.1 (WHO)',
    questionCount: 18,
    timeMinutes: Math.ceil((18 * TIME_PER_QUESTION_SECONDS) / 60), // 9 min
    color: 'accent',
  },
};

export const allAssessmentTypes: AssessmentType[] = ['personality', 'iq', 'cognitive', 'adhd'];
