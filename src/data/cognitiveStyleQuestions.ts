// Cognitive Style Assessment - Neurodivergence-focused thinking patterns
// Based on research into ADHD, Autism, Dyslexia, and other cognitive profiles

export type ThinkingDimension = 
  | 'visual_spatial' 
  | 'pattern_recognition' 
  | 'hyperfocus' 
  | 'divergent_thinking' 
  | 'detail_orientation' 
  | 'big_picture';

export type ProcessingStyle = 
  | 'linear' 
  | 'nonlinear' 
  | 'parallel' 
  | 'sequential';

export type SensoryProfile = 
  | 'sensory_seeking' 
  | 'sensory_avoiding' 
  | 'sensory_neutral';

export interface CognitiveStyleQuestion {
  id: number;
  question: string;
  dimension: ThinkingDimension;
  options: {
    text: string;
    scores: Record<ThinkingDimension, number>;
    processingStyle?: ProcessingStyle;
    sensoryIndicator?: SensoryProfile;
  }[];
}

export const dimensionLabels: Record<ThinkingDimension, { label: string; description: string }> = {
  visual_spatial: { 
    label: 'Visual-Spatial Thinking', 
    description: 'Thinking in images, mental models, and spatial relationships' 
  },
  pattern_recognition: { 
    label: 'Pattern Recognition', 
    description: 'Naturally detecting connections, systems, and underlying structures' 
  },
  hyperfocus: { 
    label: 'Deep Focus Capacity', 
    description: 'Ability to become intensely absorbed in engaging tasks' 
  },
  divergent_thinking: { 
    label: 'Divergent Thinking', 
    description: 'Generating unconventional ideas and making unexpected connections' 
  },
  detail_orientation: { 
    label: 'Detail Orientation', 
    description: 'Noticing fine details others miss, precision-focused processing' 
  },
  big_picture: { 
    label: 'Systems Thinking', 
    description: 'Seeing the whole, understanding how parts connect to form wholes' 
  },
};

export const processingStyleLabels: Record<ProcessingStyle, string> = {
  linear: 'Linear Processor',
  nonlinear: 'Nonlinear Processor',
  parallel: 'Parallel Processor',
  sequential: 'Sequential Processor',
};

export const cognitiveStyleQuestions: CognitiveStyleQuestion[] = [
  // Visual-Spatial Questions
  {
    id: 1,
    question: "When someone gives you directions, how do you best understand them?",
    dimension: 'visual_spatial',
    options: [
      { 
        text: "I visualize a mental map and see myself moving through it",
        scores: { visual_spatial: 5, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 1, detail_orientation: 1, big_picture: 3 }
      },
      { 
        text: "I prefer written step-by-step instructions I can follow",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 }
      },
      { 
        text: "I need to physically travel the route once to remember it",
        scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 2, big_picture: 2 }
      },
      { 
        text: "I rely on GPS and don't try to remember the route",
        scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 0, big_picture: 1 }
      },
    ],
  },
  {
    id: 2,
    question: "When reading a novel, what happens in your mind?",
    dimension: 'visual_spatial',
    options: [
      { 
        text: "I see vivid scenes like a movie playing in my head",
        scores: { visual_spatial: 5, pattern_recognition: 1, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 }
      },
      { 
        text: "I focus on the words and language, the imagery is abstract",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 1 }
      },
      { 
        text: "I connect with characters' emotions more than visual scenes",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 }
      },
      { 
        text: "I often get distracted and have to re-read passages",
        scores: { visual_spatial: 2, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 1 }
      },
    ],
  },
  {
    id: 3,
    question: "If you're assembling furniture, how do you approach it?",
    dimension: 'visual_spatial',
    options: [
      { 
        text: "I look at the finished picture and figure it out intuitively",
        scores: { visual_spatial: 5, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 0, big_picture: 4 }
      },
      { 
        text: "I follow the manual step by step, checking each stage",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "I scan the instructions, then improvise based on what makes sense",
        scores: { visual_spatial: 3, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 3 }
      },
      { 
        text: "I need someone to show me first, then I can replicate it",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 }
      },
    ],
  },

  // Pattern Recognition Questions
  {
    id: 4,
    question: "When you encounter a new system or process, what do you notice first?",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "The underlying logic and how all the pieces connect",
        scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 }
      },
      { 
        text: "The specific steps and procedures to follow",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "The exceptions and edge cases that might break it",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "How it compares to other systems I already know",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 }
      },
    ],
  },
  {
    id: 5,
    question: "When watching a mystery movie or reading a thriller, do you:",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "Usually figure out the twist before it's revealed",
        scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "Enjoy the ride without trying to predict the ending",
        scores: { visual_spatial: 2, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 }
      },
      { 
        text: "Notice small details that later turn out to be important",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "Get frustrated when the plot has logical inconsistencies",
        scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 3 }
      },
    ],
  },
  {
    id: 6,
    question: "When learning something new, how do you know you understand it?",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "When I can see how it connects to what I already know",
        scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "When I can explain it to someone else step by step",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "When I can apply it in different contexts successfully",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "When I've memorized the key facts and procedures",
        scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 0 }
      },
    ],
  },

  // Hyperfocus Questions
  {
    id: 7,
    question: "How do you experience time when deeply engaged in something you love?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "Hours pass like minutes - I completely lose track of time",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 }
      },
      { 
        text: "I stay aware of time but am fully present in the activity",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I get interrupted by other thoughts and check the time often",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 }
      },
      { 
        text: "I have to set timers because I can't trust my time perception",
        scores: { visual_spatial: 0, pattern_recognition: 2, hyperfocus: 4, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 }
      },
    ],
  },
  {
    id: 8,
    question: "When you find a topic fascinating, how do you explore it?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "I dive deep for hours/days, consuming everything I can find",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 5, divergent_thinking: 3, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I explore it gradually over time in a structured way",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "I jump between related topics, making unexpected connections",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 5, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "I stick to practical aspects that I can immediately apply",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 1 }
      },
    ],
  },
  {
    id: 9,
    question: "What happens when you're interrupted during deep concentration?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "It's jarring and takes a long time to get back to that state",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 3, big_picture: 1 }
      },
      { 
        text: "I can pause and resume fairly easily",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 }
      },
      { 
        text: "I sometimes don't even notice the interruption at first",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 2, big_picture: 0 }
      },
      { 
        text: "Interruptions are welcome - they keep me from going too deep",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 }
      },
    ],
  },

  // Divergent Thinking Questions
  {
    id: 10,
    question: "In brainstorming sessions, what role do you naturally play?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "The idea generator - I come up with many unconventional options",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 }
      },
      { 
        text: "The connector - I link different ideas together in new ways",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "The critic - I evaluate which ideas are actually feasible",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "The builder - I take ideas and develop them into plans",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 }
      },
    ],
  },
  {
    id: 11,
    question: "When faced with a problem, what's your first instinct?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "Question the assumptions - maybe the problem is framed wrong",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Research how others have solved similar problems",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "Break it down into smaller, manageable parts",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "Look for an unexpected angle no one has considered",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 5, detail_orientation: 1, big_picture: 3 }
      },
    ],
  },
  {
    id: 12,
    question: "How do you respond when someone says 'that's not how it's done'?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "I want to understand WHY it's done that way before accepting it",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "I usually defer to established methods - they exist for a reason",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 }
      },
      { 
        text: "I feel energized to prove there's a better way",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 5, detail_orientation: 1, big_picture: 2 }
      },
      { 
        text: "It depends on my expertise level in that area",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 }
      },
    ],
  },

  // Detail Orientation Questions
  {
    id: 13,
    question: "When proofreading, what's your experience?",
    dimension: 'detail_orientation',
    options: [
      { 
        text: "I easily spot typos, formatting issues, and inconsistencies",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "I catch content errors but miss surface-level typos",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 }
      },
      { 
        text: "I need to read very slowly and deliberately to catch errors",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I struggle with proofreading - my eyes skip over errors",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 0, big_picture: 3 }
      },
    ],
  },
  {
    id: 14,
    question: "In a new environment, what do you notice?",
    dimension: 'detail_orientation',
    options: [
      { 
        text: "Small details - the slight hum of lights, specific textures",
        scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 5, big_picture: 0 },
        sensoryIndicator: 'sensory_seeking'
      },
      { 
        text: "The overall vibe and how it makes me feel",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Practical elements - exits, layout, where things are located",
        scores: { visual_spatial: 4, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 }
      },
      { 
        text: "I don't notice much unless something is really unusual",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 0, big_picture: 2 }
      },
    ],
  },
  {
    id: 15,
    question: "When working on a project, how do you handle the small details?",
    dimension: 'detail_orientation',
    options: [
      { 
        text: "I can't move forward until every detail is perfect",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 4, divergent_thinking: 0, detail_orientation: 5, big_picture: 0 }
      },
      { 
        text: "I handle them systematically with checklists and processes",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "I prefer to get the big picture right first, then refine",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "I often overlook details - I rely on others to catch them",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 0, big_picture: 4 }
      },
    ],
  },

  // Big Picture / Systems Thinking Questions
  {
    id: 16,
    question: "When you learn that something in the world is broken or inefficient, you:",
    dimension: 'big_picture',
    options: [
      { 
        text: "Immediately see how it connects to larger systemic issues",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "Focus on the specific problem and how to fix that one thing",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 4, big_picture: 1 }
      },
      { 
        text: "Wonder about the history and evolution that led to this",
        scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 4 }
      },
      { 
        text: "Think about how it affects people's daily lives",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 }
      },
    ],
  },
  {
    id: 17,
    question: "How do you prefer to explain complex topics to others?",
    dimension: 'big_picture',
    options: [
      { 
        text: "Start with the big picture, then zoom into specifics",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "Build up from fundamentals to the complete picture",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "Use analogies and comparisons to familiar concepts",
        scores: { visual_spatial: 3, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Show them rather than tell them when possible",
        scores: { visual_spatial: 4, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 }
      },
    ],
  },
  {
    id: 18,
    question: "When making a decision, what weighs most heavily?",
    dimension: 'big_picture',
    options: [
      { 
        text: "Long-term implications and ripple effects",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "Immediate practical outcomes and efficiency",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 4, big_picture: 1 }
      },
      { 
        text: "How it aligns with my values and intuition",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 }
      },
      { 
        text: "Data, evidence, and logical analysis",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 }
      },
    ],
  },

  // Processing Style Questions
  {
    id: 19,
    question: "How does your thinking process feel to you?",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "Like a web - everything connects to everything else",
        scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 5 },
        processingStyle: 'nonlinear'
      },
      { 
        text: "Like a flowchart - one thought leads logically to the next",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 },
        processingStyle: 'linear'
      },
      { 
        text: "Like a river with many tributaries running at once",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 3 },
        processingStyle: 'parallel'
      },
      { 
        text: "Like building blocks - methodical and sequential",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 },
        processingStyle: 'sequential'
      },
    ],
  },
  {
    id: 20,
    question: "When you're explaining your thought process, people often:",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "Get confused by how I jumped from A to Z",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 },
        processingStyle: 'nonlinear'
      },
      { 
        text: "Follow along easily because I explain step by step",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 },
        processingStyle: 'sequential'
      },
      { 
        text: "Appreciate the unique connections I make",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Ask me to slow down and explain the intermediate steps",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 },
        processingStyle: 'parallel'
      },
    ],
  },

  // Mixed/Integration Questions
  {
    id: 21,
    question: "What's your relationship with routines?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "I need them for some things but they feel restrictive overall",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "I thrive on consistent routines - they free up mental energy",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "I create elaborate systems but struggle to maintain them",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 3, divergent_thinking: 3, detail_orientation: 3, big_picture: 4 }
      },
      { 
        text: "I prefer flexibility and adapting in the moment",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 }
      },
    ],
  },
  {
    id: 22,
    question: "When you have many tasks to complete, you:",
    dimension: 'detail_orientation',
    options: [
      { 
        text: "Jump between them based on interest and energy",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 0, big_picture: 2 },
        processingStyle: 'nonlinear'
      },
      { 
        text: "Work through them systematically in priority order",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 },
        processingStyle: 'sequential'
      },
      { 
        text: "Make progress on several at once, switching between them",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 },
        processingStyle: 'parallel'
      },
      { 
        text: "Hyperfocus on the most interesting one until it's done",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 }
      },
    ],
  },
  {
    id: 23,
    question: "In conversations, what do you find yourself doing?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "Making unexpected connections between different topics",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Staying focused on the topic until it's fully explored",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 4, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "Remembering specific details others mentioned earlier",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "Seeing how the conversation fits into bigger themes",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 }
      },
    ],
  },
  {
    id: 24,
    question: "Your ideal work environment would be:",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "Quiet and controlled with minimal interruptions",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 4, big_picture: 1 },
        sensoryIndicator: 'sensory_avoiding'
      },
      { 
        text: "Stimulating with variety and things happening around me",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 0, big_picture: 2 },
        sensoryIndicator: 'sensory_seeking'
      },
      { 
        text: "Flexible - different spaces for different types of work",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 3, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "Structured and predictable with clear expectations",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
    ],
  },
  {
    id: 25,
    question: "When you discover something you were wrong about, you feel:",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "Excited - it means updating my mental model of how things work",
        scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 4 }
      },
      { 
        text: "Frustrated with myself for missing the correct answer",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 }
      },
      { 
        text: "Curious about what led me to the wrong conclusion",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "Ready to move on and apply the correct information",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 }
      },
    ],
  },
];

// Cognitive Style Profiles based on dimension combinations
export interface CognitiveStyleProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  challenges: string[];
  optimalEnvironments: string[];
  famousExamples: string[];
  neurodivergentTraits: string[];
  communicationStyle: string;
  learningApproach: string;
}

export const cognitiveStyleProfiles: CognitiveStyleProfile[] = [
  {
    id: 'visual_architect',
    name: 'The Visual Architect',
    tagline: 'Thinking in blueprints and mental models',
    description: 'You process the world through vivid mental imagery and spatial relationships. Your mind naturally constructs 3D models, sees geometric patterns, and thinks in pictures rather than words. This visual-spatial dominance is often associated with dyslexic thinking profiles and is common among architects, engineers, and designers.',
    strengths: ['3D visualization', 'Spatial reasoning', 'Design thinking', 'Seeing the whole from parts', 'Mental rotation and manipulation'],
    challenges: ['Sequential verbal instructions', 'Step-by-step procedures', 'Linear text processing', 'Rote memorization'],
    optimalEnvironments: ['Visual workspaces', 'Hands-on projects', 'Design and building roles', 'Minimal text-heavy tasks'],
    famousExamples: ['Temple Grandin', 'Richard Branson', 'Steven Spielberg'],
    neurodivergentTraits: ['Dyslexic thinking style', 'Strong mental imagery', 'Gestalt processing'],
    communicationStyle: 'You prefer diagrams, sketches, and visual demonstrations over verbal explanations',
    learningApproach: 'Visual learning with diagrams, mind maps, and spatial organization'
  },
  {
    id: 'pattern_detective',
    name: 'The Pattern Detective',
    tagline: 'Seeing connections invisible to others',
    description: 'Your mind is wired to detect underlying patterns, rules, and systems that others miss. You naturally categorize, systematize, and seek logical consistency. This pattern-recognition strength is often associated with autistic cognitive profiles and is found among researchers, analysts, and system designers.',
    strengths: ['System analysis', 'Logical consistency', 'Categorization', 'Debugging complex problems', 'Predicting outcomes'],
    challenges: ['Ambiguity and exceptions', 'Social nuance', 'Accepting "good enough"', 'Unpredictable environments'],
    optimalEnvironments: ['Systematic work', 'Research roles', 'Technical analysis', 'Rule-based domains'],
    famousExamples: ['Alan Turing', 'Marie Curie', 'Elon Musk'],
    neurodivergentTraits: ['Autistic thinking style', 'Detail-to-whole processing', 'Strong systematizing'],
    communicationStyle: 'You prefer precise, logical communication and may need explicit social cues',
    learningApproach: 'Deep-dive learning with systematic exploration of interconnected topics'
  },
  {
    id: 'hyperfocus_specialist',
    name: 'The Deep Diver',
    tagline: 'Intensity that creates mastery',
    description: 'You possess the ability to enter states of intense, sustained focus that can last for hours. When engaged with something that captures your interest, you achieve a flow state that produces exceptional work. This hyperfocus capacity is characteristic of ADHD minds and is found among innovators, artists, and experts.',
    strengths: ['Intense productivity bursts', 'Deep expertise development', 'Flow states', 'Passionate engagement', 'Exceptional output in interest areas'],
    challenges: ['Task-switching', 'Uninteresting tasks', 'Time awareness', 'Balanced attention', 'Stopping when needed'],
    optimalEnvironments: ['Uninterrupted focus time', 'Interest-aligned work', 'Flexible deadlines', 'Depth over breadth'],
    famousExamples: ['Michael Phelps', 'Simone Biles', 'will.i.am'],
    neurodivergentTraits: ['ADHD hyperfocus', 'Interest-based nervous system', 'Variable attention'],
    communicationStyle: 'You engage deeply with topics of interest and may need help transitioning between conversations',
    learningApproach: 'Immersive, interest-driven learning with intense focus periods'
  },
  {
    id: 'divergent_explorer',
    name: 'The Idea Explorer',
    tagline: 'Where others see walls, you see doors',
    description: 'Your mind naturally generates unconventional ideas and makes unexpected connections between disparate concepts. You question assumptions, reframe problems, and see possibilities that conventional thinking overlooks. This divergent thinking style is often enhanced in ADHD minds and is found among entrepreneurs, creatives, and innovators.',
    strengths: ['Idea generation', 'Creative problem-solving', 'Questioning assumptions', 'Connecting unrelated concepts', 'Innovation'],
    challenges: ['Narrowing down options', 'Following established processes', 'Finishing before moving on', 'Linear execution'],
    optimalEnvironments: ['Creative freedom', 'Brainstorming roles', 'Innovation-focused work', 'Minimal rigid procedures'],
    famousExamples: ['Richard Branson', 'David Neeleman', 'Ingvar Kamprad'],
    neurodivergentTraits: ['ADHD creativity', 'Associative thinking', 'Lateral connections'],
    communicationStyle: 'You make leaps in conversation and may need to backtrack to explain your connections',
    learningApproach: 'Exploratory learning with many tangents and cross-domain connections'
  },
  {
    id: 'precision_processor',
    name: 'The Precision Processor',
    tagline: 'Excellence lives in the details',
    description: 'You notice details that others overlook and maintain high standards for accuracy and completeness. Your attention to fine details makes you invaluable for quality-critical work. This precision orientation is often associated with autistic and OCD-related cognitive profiles.',
    strengths: ['Error detection', 'Quality assurance', 'Procedural accuracy', 'Consistency', 'Thoroughness'],
    challenges: ['Big-picture prioritization', 'Letting go of imperfection', 'Flexible thinking', 'Tolerating ambiguity'],
    optimalEnvironments: ['Quality-critical roles', 'Clear standards', 'Detail-oriented work', 'Structured processes'],
    famousExamples: ['Anthony Hopkins', 'Dan Aykroyd', 'Tim Burton'],
    neurodivergentTraits: ['Detail-focused processing', 'High standards', 'Completeness drive'],
    communicationStyle: 'You prefer precise language and may correct errors or ask clarifying questions',
    learningApproach: 'Thorough, methodical learning with complete understanding before moving on'
  },
  {
    id: 'systems_synthesizer',
    name: 'The Systems Synthesizer',
    tagline: 'Seeing the forest AND the trees',
    description: 'You naturally perceive how parts connect to form wholes and understand complex systems intuitively. You see ripple effects, long-term implications, and the interconnected nature of things. This systems thinking capacity is often enhanced in autistic and dyslexic minds.',
    strengths: ['Strategic thinking', 'Understanding complexity', 'Long-term planning', 'Seeing interconnections', 'Holistic analysis'],
    challenges: ['Getting lost in details', 'Immediate practical action', 'Simplifying for others', 'Dealing with isolated facts'],
    optimalEnvironments: ['Strategy roles', 'Complex problem solving', 'Long-term planning', 'Cross-functional work'],
    famousExamples: ['Satoshi Tajiri', 'Nikola Tesla', 'Temple Grandin'],
    neurodivergentTraits: ['Gestalt thinking', 'Systems perspective', 'Interconnected processing'],
    communicationStyle: 'You often provide context and background before getting to the main point',
    learningApproach: 'Conceptual learning that emphasizes relationships and big-picture understanding'
  },
  {
    id: 'multi_modal_mind',
    name: 'The Multi-Modal Mind',
    tagline: 'Balanced across all dimensions',
    description: 'Your cognitive profile shows balanced development across multiple thinking dimensions. You can adapt your cognitive approach based on the situation, switching between detail and big-picture, linear and nonlinear thinking as needed. This adaptability is a strength in diverse and changing environments.',
    strengths: ['Cognitive flexibility', 'Adaptability', 'Balanced perspective', 'Situational thinking', 'Bridge-building between styles'],
    challenges: ['May lack specialized depth', 'Can overthink approach', 'May underutilize unique strengths'],
    optimalEnvironments: ['Varied roles', 'Bridge positions', 'Generalist work', 'Changing contexts'],
    famousExamples: ['Leonardo da Vinci', 'Benjamin Franklin'],
    neurodivergentTraits: ['Balanced profile', 'Adaptive processing'],
    communicationStyle: 'You adapt your communication style based on who you\'re talking to',
    learningApproach: 'Multi-modal learning using various approaches depending on the subject'
  },
];

// Result types
export interface CognitiveStyleDimensionScore {
  dimension: ThinkingDimension;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface CognitiveStyleResults {
  dimensionScores: CognitiveStyleDimensionScore[];
  primaryProfile: CognitiveStyleProfile;
  secondaryProfile: CognitiveStyleProfile | null;
  processingStyle: ProcessingStyle;
  dominantDimensions: ThinkingDimension[];
  insights: {
    strengths: string[];
    challenges: string[];
    workEnvironment: string;
    learningStyle: string;
    communicationTip: string;
  };
}

export const calculateCognitiveStyleResults = (answers: number[]): CognitiveStyleResults => {
  const dimensionScores: Record<ThinkingDimension, number> = {
    visual_spatial: 0,
    pattern_recognition: 0,
    hyperfocus: 0,
    divergent_thinking: 0,
    detail_orientation: 0,
    big_picture: 0,
  };

  const processingStyleCounts: Record<ProcessingStyle, number> = {
    linear: 0,
    nonlinear: 0,
    parallel: 0,
    sequential: 0,
  };

  // Calculate scores from answers
  cognitiveStyleQuestions.forEach((question, index) => {
    const selectedOption = question.options[answers[index]];
    if (selectedOption) {
      Object.entries(selectedOption.scores).forEach(([dim, score]) => {
        dimensionScores[dim as ThinkingDimension] += score;
      });
      if (selectedOption.processingStyle) {
        processingStyleCounts[selectedOption.processingStyle]++;
      }
    }
  });

  // Calculate max possible scores
  const maxScores: Record<ThinkingDimension, number> = {
    visual_spatial: 0,
    pattern_recognition: 0,
    hyperfocus: 0,
    divergent_thinking: 0,
    detail_orientation: 0,
    big_picture: 0,
  };

  cognitiveStyleQuestions.forEach((question) => {
    Object.entries(question.options[0].scores).forEach(([dim]) => {
      const maxForQuestion = Math.max(...question.options.map(opt => opt.scores[dim as ThinkingDimension]));
      maxScores[dim as ThinkingDimension] += maxForQuestion;
    });
  });

  // Build dimension results
  const dimensionResults: CognitiveStyleDimensionScore[] = Object.entries(dimensionScores).map(([dim, score]) => ({
    dimension: dim as ThinkingDimension,
    score,
    maxScore: maxScores[dim as ThinkingDimension],
    percentage: Math.round((score / maxScores[dim as ThinkingDimension]) * 100),
  }));

  // Find dominant dimensions
  const sortedDimensions = [...dimensionResults].sort((a, b) => b.percentage - a.percentage);
  const dominantDimensions = sortedDimensions.slice(0, 2).map(d => d.dimension);

  // Determine processing style
  const processingStyle = Object.entries(processingStyleCounts).sort((a, b) => b[1] - a[1])[0][0] as ProcessingStyle;

  // Match to profile
  const primaryProfile = determineProfile(dominantDimensions, dimensionResults);
  const secondaryProfile = determineSecondaryProfile(dominantDimensions, dimensionResults, primaryProfile);

  // Generate insights
  const insights = generateInsights(dimensionResults, primaryProfile, processingStyle);

  return {
    dimensionScores: dimensionResults,
    primaryProfile,
    secondaryProfile,
    processingStyle,
    dominantDimensions,
    insights,
  };
};

const determineProfile = (
  dominantDimensions: ThinkingDimension[], 
  scores: CognitiveStyleDimensionScore[]
): CognitiveStyleProfile => {
  const [primary, secondary] = dominantDimensions;
  const scoreMap = Object.fromEntries(scores.map(s => [s.dimension, s.percentage]));
  
  // Check for balanced profile
  const avg = scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length;
  const variance = scores.reduce((sum, s) => sum + Math.pow(s.percentage - avg, 2), 0) / scores.length;
  if (variance < 100) {
    return cognitiveStyleProfiles.find(p => p.id === 'multi_modal_mind')!;
  }

  // Match based on dominant dimensions
  if (primary === 'visual_spatial' || (primary === 'big_picture' && secondary === 'visual_spatial')) {
    return cognitiveStyleProfiles.find(p => p.id === 'visual_architect')!;
  }
  if (primary === 'pattern_recognition' || (primary === 'detail_orientation' && scoreMap.pattern_recognition > 60)) {
    return cognitiveStyleProfiles.find(p => p.id === 'pattern_detective')!;
  }
  if (primary === 'hyperfocus') {
    return cognitiveStyleProfiles.find(p => p.id === 'hyperfocus_specialist')!;
  }
  if (primary === 'divergent_thinking') {
    return cognitiveStyleProfiles.find(p => p.id === 'divergent_explorer')!;
  }
  if (primary === 'detail_orientation') {
    return cognitiveStyleProfiles.find(p => p.id === 'precision_processor')!;
  }
  if (primary === 'big_picture') {
    return cognitiveStyleProfiles.find(p => p.id === 'systems_synthesizer')!;
  }

  return cognitiveStyleProfiles.find(p => p.id === 'multi_modal_mind')!;
};

const determineSecondaryProfile = (
  dominantDimensions: ThinkingDimension[],
  scores: CognitiveStyleDimensionScore[],
  primaryProfile: CognitiveStyleProfile
): CognitiveStyleProfile | null => {
  const scoreMap = Object.fromEntries(scores.map(s => [s.dimension, s.percentage]));
  
  // Find the next strongest dimension not covered by primary
  const remainingScores = scores
    .filter(s => !dominantDimensions.slice(0, 1).includes(s.dimension))
    .sort((a, b) => b.percentage - a.percentage);

  if (remainingScores.length === 0 || remainingScores[0].percentage < 50) {
    return null;
  }

  const secondaryDimension = remainingScores[0].dimension;
  
  const dimensionToProfile: Record<ThinkingDimension, string> = {
    visual_spatial: 'visual_architect',
    pattern_recognition: 'pattern_detective',
    hyperfocus: 'hyperfocus_specialist',
    divergent_thinking: 'divergent_explorer',
    detail_orientation: 'precision_processor',
    big_picture: 'systems_synthesizer',
  };

  const profileId = dimensionToProfile[secondaryDimension];
  if (profileId === primaryProfile.id) return null;

  return cognitiveStyleProfiles.find(p => p.id === profileId) || null;
};

const generateInsights = (
  scores: CognitiveStyleDimensionScore[],
  profile: CognitiveStyleProfile,
  processingStyle: ProcessingStyle
): CognitiveStyleResults['insights'] => {
  const sortedScores = [...scores].sort((a, b) => b.percentage - a.percentage);
  const topTwo = sortedScores.slice(0, 2);
  const bottomTwo = sortedScores.slice(-2);

  const strengths = topTwo.map(s => dimensionLabels[s.dimension].label);
  const challenges = bottomTwo.map(s => dimensionLabels[s.dimension].label);

  const workEnvironments: Record<ProcessingStyle, string> = {
    linear: 'Structured environments with clear step-by-step processes work best for you.',
    nonlinear: 'Creative, flexible environments that allow jumping between ideas suit your style.',
    parallel: 'Multi-faceted roles where you can work on several things simultaneously are ideal.',
    sequential: 'Methodical roles with clear progression and completion stages fit your approach.',
  };

  const learningStyles: Record<ProcessingStyle, string> = {
    linear: 'Step-by-step tutorials and structured courses with clear progression.',
    nonlinear: 'Exploratory learning through connections, tangents, and cross-domain exploration.',
    parallel: 'Multiple learning tracks simultaneously, connecting insights across subjects.',
    sequential: 'Completing one topic fully before moving to the next, building systematically.',
  };

  return {
    strengths: profile.strengths.slice(0, 3),
    challenges: profile.challenges.slice(0, 3),
    workEnvironment: workEnvironments[processingStyle],
    learningStyle: learningStyles[processingStyle],
    communicationTip: profile.communicationStyle,
  };
};
