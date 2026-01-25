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

export const assessmentInfo: Record<AssessmentType, AssessmentInfo> = {
  personality: {
    id: 'personality',
    title: 'Personality DNA',
    shortTitle: 'Personality',
    description: 'Decode your personality blueprint - discover what drives you, how you connect, and your hidden strengths.',
    framework: 'OCEAN Deep Profile',
    questionCount: 30,
    timeMinutes: 7,
    color: 'primary',
  },
  iq: {
    id: 'iq',
    title: 'IQ Assessment',
    shortTitle: 'IQ',
    description: 'Measure your cognitive abilities through Mensa-style pattern recognition and abstract reasoning.',
    framework: "Raven's Progressive Matrices",
    questionCount: 25,
    timeMinutes: 25,
    color: 'accent',
  },
  cognitive: {
    id: 'cognitive',
    title: 'Cognitive Style',
    shortTitle: 'Cognitive',
    description: 'Discover how your mind naturally processes information - exploring thinking patterns often associated with neurodivergent minds.',
    framework: 'Neurodivergent Thinking Patterns',
    questionCount: 25,
    timeMinutes: 8,
    color: 'primary',
  },
  adhd: {
    id: 'adhd',
    title: 'ADHD Screening',
    shortTitle: 'ADHD',
    description: 'Clinical-grade self-assessment screening for attention and hyperactivity patterns.',
    framework: 'ASRS-v1.1 (WHO)',
    questionCount: 18,
    timeMinutes: 6,
    color: 'accent',
  },
};

export const allAssessmentTypes: AssessmentType[] = ['personality', 'iq', 'cognitive', 'adhd'];
