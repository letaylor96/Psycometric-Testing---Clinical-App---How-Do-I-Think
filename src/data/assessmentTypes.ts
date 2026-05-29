// Assessment Type Definitions

export type AssessmentType = 'cognitive-profile' | 'personality' | 'iq' | 'neurodivergent' | 'depth';

// Standalone tests offered via the SingleTestPicker. They live outside the
// guided funnel so they don't break Record<AssessmentType,...> maps,
// but share the same routing surface via SelectableTestKey below.
export type StandaloneTestKey = 'adhd' | 'autism';

export type SelectableTestKey = AssessmentType | StandaloneTestKey;

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
  'cognitive-profile': {
    id: 'cognitive-profile',
    title: 'Cognitive Profile',
    shortTitle: 'Cognitive Profile',
    description: 'A structured self-report profile of how you think, learn, communicate, and adapt to AI-enabled work — built on established psychometric instruments.',
    framework: 'Kolb · Sternberg · KAI · MSTAT-II · TRI 2.0',
    questionCount: 40,
    timeMinutes: 12,
    color: 'primary',
  },
  personality: {
    id: 'personality',
    title: 'Personality Type',
    shortTitle: 'Personality Type',
    description: 'Discover your personality archetype, Myers-Briggs type, and what makes you uniquely you.',
    framework: 'Big Five + MBTI',
    questionCount: 30,
    timeMinutes: Math.ceil((30 * TIME_PER_QUESTION_SECONDS) / 60), // 15 min
    color: 'primary',
    isPremiumOnly: true,
  },
  neurodivergent: {
    id: 'neurodivergent',
    title: 'Cognitive Style & Attention',
    shortTitle: 'Cognitive Style & Attention',
    description: 'Self-report inventory of thinking style, attention, and focus patterns.',
    framework: 'Cognitive Style + ASRS-v1.1',
    questionCount: 38,
    timeMinutes: Math.ceil((38 * TIME_PER_QUESTION_SECONDS) / 60),
    color: 'primary',
    isPremiumOnly: true,
  },
  depth: {
    id: 'depth',
    title: 'Depth-Psychology Reflection',
    shortTitle: 'Depth Psychology',
    description: 'Free-form reflection module analysed through Freudian, Jungian, and Nietzschean lenses.',
    framework: 'Freud · Jung · Nietzsche',
    questionCount: 24,
    timeMinutes: 20,
    color: 'primary',
    isPremiumOnly: true,
  },
  iq: {
    id: 'iq',
    title: 'Cognitive Reasoning',
    shortTitle: 'Cognitive Reasoning',
    description: 'Pattern recognition and abstract reasoning module.',
    framework: "Raven's Progressive Matrices",
    questionCount: 25,
    timeMinutes: Math.ceil((25 * TIME_PER_QUESTION_SECONDS) / 60),
    color: 'accent',
  },
};

export const allAssessmentTypes: AssessmentType[] = ['cognitive-profile', 'personality', 'neurodivergent', 'depth', 'iq'];

