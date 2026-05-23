// Assessment Type Definitions

export type AssessmentType = 'personality' | 'iq' | 'neurodivergent' | 'depth';

export interface AssessmentInfo {
  id: AssessmentType;
  title: string;
  shortTitle: string;
  description: string;
  framework: string;
  questionCount: number;
  timeMinutes: number;
  color: 'primary' | 'accent';
  isPremiumOnly?: boolean;
}

// Time calculation: 30 seconds per question
export const TIME_PER_QUESTION_SECONDS = 30;

export const assessmentInfo: Record<AssessmentType, AssessmentInfo> = {
  personality: {
    id: 'personality',
    title: 'Who Am I?',
    shortTitle: 'Personality',
    description: 'Discover your personality archetype, Myers-Briggs type, and what makes you uniquely you.',
    framework: 'Big Five + MBTI',
    questionCount: 30,
    timeMinutes: Math.ceil((30 * TIME_PER_QUESTION_SECONDS) / 60), // 15 min
    color: 'primary',
    isPremiumOnly: true,
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
  neurodivergent: {
    id: 'neurodivergent',
    title: 'How Do I Think?',
    shortTitle: 'Neurodivergent',
    description: 'Comprehensive assessment of your cognitive style, thinking patterns, attention, and focus using clinical screening tools.',
    framework: 'Cognitive Style + ASRS-v1.1',
    questionCount: 38, // 20 cognitive + 18 ADHD
    timeMinutes: Math.ceil((38 * TIME_PER_QUESTION_SECONDS) / 60), // 19 min
    color: 'primary',
    isPremiumOnly: true,
  },
  depth: {
    id: 'depth',
    title: 'Discover Your Unconscious Mind',
    shortTitle: 'Depth Psychology',
    description: 'Explore your unconscious patterns through the lens of Freud, Jung, or Nietzsche with AI-powered psychoanalytic assessment.',
    framework: 'Freud · Jung · Nietzsche',
    questionCount: 20,
    timeMinutes: 20, // Free-form + AI analysis takes longer
    color: 'primary',
    isPremiumOnly: true,
  },
};

export const allAssessmentTypes: AssessmentType[] = ['personality', 'iq', 'neurodivergent', 'depth'];
