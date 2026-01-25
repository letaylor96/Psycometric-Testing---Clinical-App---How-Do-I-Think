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
    title: 'Big Five Personality',
    shortTitle: 'Personality',
    description: 'Discover your personality profile across Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    framework: 'OCEAN / Big Five Model',
    questionCount: 20,
    timeMinutes: 8,
    color: 'primary',
  },
  iq: {
    id: 'iq',
    title: 'IQ Assessment',
    shortTitle: 'IQ',
    description: 'Measure your cognitive abilities through pattern recognition, logical reasoning, and abstract thinking.',
    framework: "Raven's Progressive Matrices",
    questionCount: 15,
    timeMinutes: 12,
    color: 'accent',
  },
  cognitive: {
    id: 'cognitive',
    title: 'Cognitive Style',
    shortTitle: 'Cognitive',
    description: 'Understand your thinking style and creative problem-solving approach.',
    framework: "Guilford's Divergent Thinking",
    questionCount: 15,
    timeMinutes: 10,
    color: 'primary',
  },
  adhd: {
    id: 'adhd',
    title: 'ADHD Screening',
    shortTitle: 'ADHD',
    description: 'Self-assessment screening for attention and hyperactivity patterns.',
    framework: 'ASRS-v1.1 (WHO)',
    questionCount: 18,
    timeMinutes: 6,
    color: 'accent',
  },
};

export const allAssessmentTypes: AssessmentType[] = ['personality', 'iq', 'cognitive', 'adhd'];
