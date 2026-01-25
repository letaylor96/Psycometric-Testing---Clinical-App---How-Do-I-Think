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
    description: 'Discover your personality archetype across 30 facet-level dimensions with deep psychological insights.',
    framework: 'IPIP-NEO + Jungian Archetypes',
    questionCount: 50,
    timeMinutes: 12,
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
