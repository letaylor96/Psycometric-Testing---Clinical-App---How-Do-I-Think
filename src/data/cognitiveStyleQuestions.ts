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

// ═══════════════════════════════════════════════════════════════════════════════
// COGNITIVE STYLE ASSESSMENT - 20 Questions
// ═══════════════════════════════════════════════════════════════════════════════
// Based on validated neurocognitive research frameworks:
// • Cognitive Reflection Test (CRT) by Shane Frederick (System 1 vs System 2)
// • Baron-Cohen's Systemizing Quotient (pattern/systems thinking)
// • Field Dependence/Independence research (Witkin et al.)
// • Dual-process theory of reasoning (Kahneman)
// • Neurodivergent cognition research (Armstrong, Silberman)
// ═══════════════════════════════════════════════════════════════════════════════

export const cognitiveStyleQuestions: CognitiveStyleQuestion[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // VISUAL-SPATIAL THINKING (3 questions)
  // Measures mental imagery, spatial reasoning, and visual-kinesthetic processing
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    question: "When trying to understand a complex system (like a new software, organization, or machine), what helps you most?",
    dimension: 'visual_spatial',
    options: [
      { 
        text: "Drawing diagrams or mental maps of how components connect",
        scores: { visual_spatial: 5, pattern_recognition: 3, hyperfocus: 0, divergent_thinking: 1, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Reading detailed documentation or step-by-step instructions",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "Hands-on experimentation and trial-and-error",
        scores: { visual_spatial: 3, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 }
      },
      { 
        text: "Discussing it with someone who can explain it verbally",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 }
      },
    ],
  },
  {
    id: 2,
    question: "When remembering events from your past, how do you typically experience them?",
    dimension: 'visual_spatial',
    options: [
      { 
        text: "As vivid mental images or movie-like scenes I can 'see' clearly",
        scores: { visual_spatial: 5, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "Through the emotions and feelings I experienced at the time",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 }
      },
      { 
        text: "As factual knowledge—I know what happened but don't 'relive' it",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "Memories are often fragmented; I struggle to recall details visually",
        scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 2 }
      },
    ],
  },
  {
    id: 3,
    question: "If asked to mentally rotate a 3D object in your mind, how easy is this for you?",
    dimension: 'visual_spatial',
    options: [
      { 
        text: "Very easy—I can manipulate objects in my mind effortlessly",
        scores: { visual_spatial: 5, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "I can do it, but it requires deliberate effort and concentration",
        scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I prefer to sketch it out or use a physical model",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 4, big_picture: 1 }
      },
      { 
        text: "I find this task quite difficult and frustrating",
        scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 1 }
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // PATTERN RECOGNITION (3 questions)
  // Measures ability to detect regularities, systems, and underlying structures
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 4,
    question: "When you encounter a dataset, spreadsheet, or collection of information, what do you naturally do first?",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "Look for trends, correlations, or anomalies that stand out",
        scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 }
      },
      { 
        text: "Organize and categorize the data systematically",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "Ask what questions this data might answer",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Feel overwhelmed until someone explains what I should focus on",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 }
      },
    ],
  },
  {
    id: 5,
    question: "In conversations, do you often notice when someone's current statement contradicts something they said earlier?",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "Yes, inconsistencies jump out at me immediately",
        scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "Sometimes, if I'm paying close attention",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I focus more on the emotional content than logical consistency",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 }
      },
      { 
        text: "I rarely notice—I take statements at face value in the moment",
        scores: { visual_spatial: 1, pattern_recognition: 0, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 2 }
      },
    ],
  },
  {
    id: 6,
    question: "When learning a new game or system, how quickly do you understand the underlying rules?",
    dimension: 'pattern_recognition',
    options: [
      { 
        text: "I often infer rules before they're explicitly explained",
        scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "I prefer to read all the rules thoroughly first",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "I learn best by watching others play first",
        scores: { visual_spatial: 3, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "I need multiple attempts and explanations to understand",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 2, big_picture: 1 }
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // HYPERFOCUS CAPACITY (4 questions)
  // Measures ability for deep, sustained attention on engaging tasks
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 7,
    question: "When working on something that genuinely interests you, how do you experience the passage of time?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "Hours vanish—I'm shocked when I realize how much time has passed",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 }
      },
      { 
        text: "I stay engaged but maintain awareness of time",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I need to set alarms because I know I'll lose track",
        scores: { visual_spatial: 0, pattern_recognition: 2, hyperfocus: 4, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 }
      },
      { 
        text: "I naturally check the time regularly regardless of the task",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 }
      },
    ],
  },
  {
    id: 8,
    question: "How do you typically react when you discover a new topic that fascinates you?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "I go 'down the rabbit hole' for hours or days, consuming everything I can",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 5, divergent_thinking: 3, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I explore it systematically, pacing myself over time",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "I quickly branch into related topics, making unexpected connections",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "I focus only on practically applicable information",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 }
      },
    ],
  },
  {
    id: 9,
    question: "When you're interrupted during deep concentration, what happens?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "It's jarring—I feel disoriented and need significant time to return to that state",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 3, big_picture: 1 }
      },
      { 
        text: "I can pause and resume fairly smoothly",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 }
      },
      { 
        text: "Sometimes I don't even register the interruption initially",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 2, big_picture: 0 }
      },
      { 
        text: "I welcome interruptions—they prevent me from getting too absorbed",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 }
      },
    ],
  },
  {
    id: 10,
    question: "Have you ever neglected basic needs (eating, sleeping, hygiene) because you were so absorbed in an activity?",
    dimension: 'hyperfocus',
    options: [
      { 
        text: "Yes, this happens to me regularly when I'm engaged in something",
        scores: { visual_spatial: 0, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 1, big_picture: 0 }
      },
      { 
        text: "Occasionally, but only for truly exceptional projects",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 1 }
      },
      { 
        text: "Rarely—I maintain routines even when deeply focused",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "Never—basic needs always take priority for me",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 }
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // DIVERGENT THINKING (4 questions)
  // Measures unconventional ideation, cognitive flexibility, and creative reasoning
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 11,
    question: "In brainstorming or creative sessions, what role do you naturally play?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "The idea generator—I produce many unconventional possibilities quickly",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 }
      },
      { 
        text: "The connector—I see links between ideas that others miss",
        scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "The evaluator—I assess which ideas are actually feasible",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "The developer—I take raw ideas and build them into concrete plans",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 4, big_picture: 3 }
      },
    ],
  },
  {
    id: 12,
    question: "When faced with a problem that conventional approaches haven't solved, what's your instinct?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "Question whether the problem itself is correctly defined",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "Research how experts in other fields have solved analogous problems",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "Break it into smaller subproblems and tackle each systematically",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "Seek an unconventional angle that others haven't considered",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 }
      },
    ],
  },
  {
    id: 13,
    question: "How do you respond when someone tells you 'that's not how it's done'?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "I want to understand WHY it's done that way before accepting it",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "I generally defer to established methods—they exist for good reasons",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "I feel motivated to demonstrate there's a better approach",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 5, detail_orientation: 1, big_picture: 2 }
      },
      { 
        text: "It depends on how much expertise I have in that domain",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 }
      },
    ],
  },
  {
    id: 14,
    question: "When you daydream or let your mind wander, what typically happens?",
    dimension: 'divergent_thinking',
    options: [
      { 
        text: "I make unexpected connections between unrelated ideas or domains",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 0, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 }
      },
      { 
        text: "I replay past events or plan future ones in detail",
        scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "I generate creative scenarios, stories, or hypothetical situations",
        scores: { visual_spatial: 4, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 1, big_picture: 3 }
      },
      { 
        text: "I don't daydream much—my mind stays focused on immediate tasks",
        scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 }
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // DETAIL ORIENTATION (3 questions)
  // Measures precision, accuracy, and fine-grained information processing
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 15,
    question: "When proofreading a document, what is your typical experience?",
    dimension: 'detail_orientation',
    options: [
      { 
        text: "I naturally spot typos, formatting inconsistencies, and errors",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "I catch logical or content errors but miss surface-level typos",
        scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 }
      },
      { 
        text: "I need to read very slowly and deliberately to catch mistakes",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 }
      },
      { 
        text: "My eyes tend to skip over errors—proofreading is difficult for me",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 3 }
      },
    ],
  },
  {
    id: 16,
    question: "When entering a new environment (office, restaurant, home), what do you notice?",
    dimension: 'detail_orientation',
    options: [
      { 
        text: "Specific details—the subtle hum of electronics, particular textures, minor asymmetries",
        scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 5, big_picture: 0 },
        sensoryIndicator: 'sensory_seeking'
      },
      { 
        text: "The overall atmosphere, mood, and how the space makes me feel",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "Practical elements—exits, layout, where things are positioned",
        scores: { visual_spatial: 4, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 }
      },
      { 
        text: "I don't consciously notice much unless something is unusual",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 0, big_picture: 2 }
      },
    ],
  },
  {
    id: 17,
    question: "How do you handle the final details when completing a project?",
    dimension: 'detail_orientation',
    options: [
      { 
        text: "I can't consider it finished until every detail meets my standards",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 4, divergent_thinking: 0, detail_orientation: 5, big_picture: 0 }
      },
      { 
        text: "I use systematic checklists to ensure nothing is overlooked",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 }
      },
      { 
        text: "I focus on whether the overall result achieves the goal",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "I often struggle to wrap up—I find ending harder than starting",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 2 }
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SYSTEMS/BIG PICTURE THINKING (3 questions)
  // Measures holistic processing, synthesis, and contextual understanding
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 18,
    question: "When reading about a historical event or scientific discovery, what interests you most?",
    dimension: 'big_picture',
    options: [
      { 
        text: "How it connects to broader patterns and influences other events",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "The specific facts, dates, and key figures involved",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 }
      },
      { 
        text: "The human stories and personal experiences within it",
        scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 }
      },
      { 
        text: "What lessons or principles we can apply today",
        scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 4 }
      },
    ],
  },
  {
    id: 19,
    question: "When explaining your reasoning to others, what feedback do you typically receive?",
    dimension: 'big_picture',
    options: [
      { 
        text: "That I make unexpected connections they hadn't considered",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "That I'm thorough and cover all the important details",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "That I jump around and they struggle to follow my logic",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 0, big_picture: 4 }
      },
      { 
        text: "That I explain things clearly in a step-by-step manner",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 }
      },
    ],
  },
  {
    id: 20,
    question: "When faced with a complex decision, how do you typically approach it?",
    dimension: 'big_picture',
    options: [
      { 
        text: "Consider how the decision fits into the larger context and long-term trajectory",
        scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 }
      },
      { 
        text: "Create a detailed pros-and-cons list with all factors weighted",
        scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 }
      },
      { 
        text: "Trust my intuition after absorbing all available information",
        scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 4 }
      },
      { 
        text: "Consult others whose judgment I trust",
        scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 }
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
