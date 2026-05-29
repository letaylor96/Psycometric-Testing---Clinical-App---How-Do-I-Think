// Cognitive Profile — 8 serious archetype definitions for AppliedAIWorks Canada.
// Labels and content are intentionally neutral, professional, non-clinical.

export type ArchetypeKey =
  | 'systems_oriented'
  | 'visual_pattern'
  | 'conceptual_strategist'
  | 'practical_executor'
  | 'relational_communicator'
  | 'exploratory_learner'
  | 'structure_supported_learner'
  | 'high_divergence_creative';

export type CategoryKey =
  | 'info_processing'
  | 'learning_style'
  | 'problem_solving'
  | 'communication'
  | 'structure_need'
  | 'ambiguity_tolerance'
  | 'divergent_thinking'
  | 'ai_readiness'
  | 'support_pref'
  | 'program_fit';

export interface CategoryMeta {
  key: CategoryKey;
  label: string;
  description: string;
  // Source instrument we paraphrase from (not a claim of certification).
  basis: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { key: 'info_processing', label: 'Information processing', description: 'How you take in, organize, and recall information.', basis: 'VARK + dual-coding theory' },
  { key: 'learning_style', label: 'Learning style', description: 'The conditions under which you learn most effectively.', basis: 'Kolb Learning Style Inventory' },
  { key: 'problem_solving', label: 'Problem-solving approach', description: 'How you frame, analyze, and resolve unfamiliar problems.', basis: 'Sternberg Triarchic Theory' },
  { key: 'communication', label: 'Communication style', description: 'How you prefer to share ideas and collaborate.', basis: 'Merrill–Reid Social Styles + Big Five' },
  { key: 'structure_need', label: 'Structure & organization needs', description: 'How much structure helps you function at your best.', basis: 'Personal Need for Structure (Neuberg & Newsom)' },
  { key: 'ambiguity_tolerance', label: 'Comfort with ambiguity', description: 'How you respond when situations are unclear or open-ended.', basis: 'MSTAT-II Tolerance of Ambiguity' },
  { key: 'divergent_thinking', label: 'Creative & divergent thinking', description: 'How readily you generate alternative ideas and connections.', basis: 'Kirton Adaption–Innovation Inventory' },
  { key: 'ai_readiness', label: 'Technology & AI readiness', description: 'Your orientation toward learning and applying AI tools.', basis: 'Technology Readiness Index 2.0' },
  { key: 'support_pref', label: 'Support preferences', description: 'The kinds of scaffolding that help you move forward.', basis: 'Self-Determination Theory' },
  { key: 'program_fit', label: 'Program-fit indicators', description: 'Cognitive engagement and self-efficacy for new programs.', basis: 'Need for Cognition + General Self-Efficacy' },
];

export interface Archetype {
  key: ArchetypeKey;
  label: string;
  summary: string;
  thinkingProfile: string;
  strengths: string[];
  frictionPoints: string[];
  aiWorkflows: string[];
  supports: string[];
  startingPoint: string;
  // 0–2 weight per category for scoring
  weights: Record<CategoryKey, number>;
}

const w = (overrides: Partial<Record<CategoryKey, number>>): Record<CategoryKey, number> => {
  const base: Record<CategoryKey, number> = {
    info_processing: 0, learning_style: 0, problem_solving: 0, communication: 0,
    structure_need: 0, ambiguity_tolerance: 0, divergent_thinking: 0,
    ai_readiness: 0, support_pref: 0, program_fit: 0,
  };
  return { ...base, ...overrides };
};

export const ARCHETYPES: Archetype[] = [
  {
    key: 'systems_oriented',
    label: 'Systems-oriented thinker',
    summary: 'Sees how parts connect into a whole and prefers to work from frameworks.',
    thinkingProfile:
      'You tend to map problems before solving them. Your default move is to look for underlying structure — the rules, dependencies, and feedback loops that explain how something behaves. You feel most productive when you can build or adopt a system, then work inside it. Once a framework is in place, you can execute consistently and spot when something breaks.',
    strengths: [
      'Translating messy situations into structured models',
      'Building repeatable workflows and standards',
      'Spotting upstream causes rather than treating symptoms',
      'Maintaining quality across long or complex projects',
    ],
    frictionPoints: [
      'Slower to start when the problem is poorly defined',
      'Can over-engineer when a quick draft would do',
      'Frustration when others skip foundational steps',
      'May resist switching frameworks once one is in place',
    ],
    aiWorkflows: ['structured task breakdowns', 'workflow automation', 'business or project planning', 'research synthesis'],
    supports: ['templates', 'examples', 'structured prompts', 'practice exercises'],
    startingPoint: 'Begin with the workflow-design and automation modules — your strength is operationalizing AI into repeatable systems.',
    weights: w({ problem_solving: 2, structure_need: 2, info_processing: 1, program_fit: 1, ai_readiness: 1 }),
  },
  {
    key: 'visual_pattern',
    label: 'Visual-pattern thinker',
    summary: 'Thinks in diagrams, maps, and spatial relationships before words.',
    thinkingProfile:
      'You absorb information fastest when you can see it. Patterns, layouts, and visual comparisons make abstract material click for you. When you explain ideas, you often reach for a sketch, a table, or a metaphor that has a shape to it. You may notice connections that text-first thinkers miss because you are scanning the whole picture at once.',
    strengths: [
      'Rapid pattern recognition across complex material',
      'Communicating ideas through diagrams and visuals',
      'Synthesizing large amounts of information quickly',
      'Holding multiple variables in mind simultaneously',
    ],
    frictionPoints: [
      'Long unstructured text can feel exhausting',
      'May skip details that do not fit the pattern',
      'Hard to externalize a thought before it has a shape',
      'Linear, text-heavy workflows slow you down',
    ],
    aiWorkflows: ['visual mapping', 'research synthesis', 'prompt-supported planning', 'learning companions'],
    supports: ['visual aids', 'templates', 'examples', 'practice exercises'],
    startingPoint: 'Begin with the visual-mapping and research-synthesis exercises — they match how you already think.',
    weights: w({ info_processing: 2, divergent_thinking: 2, learning_style: 1, problem_solving: 1 }),
  },
  {
    key: 'conceptual_strategist',
    label: 'Conceptual strategist',
    summary: 'Energized by ideas, theory, and long-horizon thinking.',
    thinkingProfile:
      'You enjoy working at the level of concepts and strategy. Open-ended questions energize you and you are comfortable holding uncertainty while you think. You tend to look further ahead than the immediate task and ask whether you are working on the right thing, not just doing the thing right.',
    strengths: [
      'Framing the bigger question behind a problem',
      'Reasoning through ambiguity without forcing closure',
      'Connecting ideas across domains',
      'Designing strategy and long-term direction',
    ],
    frictionPoints: [
      'May under-invest in execution and follow-through',
      'Can lose interest once the concept is clear',
      'Tight constraints can feel limiting',
      'Sometimes outruns collaborators with abstract jumps',
    ],
    aiWorkflows: ['research synthesis', 'prompt-supported planning', 'business or project planning', 'writing support'],
    supports: ['coaching check-ins', 'accountability routines', 'structured prompts', 'examples'],
    startingPoint: 'Begin with the strategy and research-synthesis tracks, then pair with an execution-focused module to ground ideas.',
    weights: w({ ambiguity_tolerance: 2, program_fit: 2, problem_solving: 1, divergent_thinking: 1, ai_readiness: 1 }),
  },
  {
    key: 'practical_executor',
    label: 'Practical executor',
    summary: 'Turns plans into output through steady, grounded action.',
    thinkingProfile:
      'You think by doing. You prefer concrete tasks, clear definitions of done, and steady progress over abstract debate. You learn fastest from a worked example you can adapt, and you feel best when you finish what you start. Once a process is proven, you can run it reliably.',
    strengths: [
      'Reliable execution and follow-through',
      'Quickly operationalizing other people\'s ideas',
      'Pragmatic problem-solving under time pressure',
      'Holding teams accountable to commitments',
    ],
    frictionPoints: [
      'Discomfort when goals or requirements are vague',
      'Less patience for prolonged exploration',
      'May default to known methods even when novel ones fit',
      'Can underrate the value of upfront reflection',
    ],
    aiWorkflows: ['structured task breakdowns', 'workflow automation', 'accountability systems', 'resume and career tools'],
    supports: ['templates', 'step-by-step guidance', 'examples', 'practice exercises'],
    startingPoint: 'Begin with the automation and task-breakdown modules — applied, hands-on, immediately useful.',
    weights: w({ structure_need: 2, learning_style: 1, support_pref: 2, ai_readiness: 1 }),
  },
  {
    key: 'relational_communicator',
    label: 'Relational communicator',
    summary: 'Thinks through dialogue and works best in connection with others.',
    thinkingProfile:
      'You make sense of ideas by talking them through. You are attentive to how people are doing, not just what they are saying, and you adjust your message to the person in front of you. Group discussion, coaching, and collaboration sharpen your thinking more than solitary work.',
    strengths: [
      'Translating ideas across audiences',
      'Building trust and psychological safety in groups',
      'Surfacing what is unspoken in a discussion',
      'Coaching and mentoring others',
    ],
    frictionPoints: [
      'Solo, silent deep work can feel draining',
      'May absorb others\' stress or expectations',
      'Hard to commit to a position before talking it through',
      'Written-only feedback loops feel incomplete',
    ],
    aiWorkflows: ['writing support', 'prompt-supported planning', 'learning companions', 'resume and career tools'],
    supports: ['coaching check-ins', 'examples', 'accountability routines', 'structured prompts'],
    startingPoint: 'Begin with writing-support and coaching-companion modules — pair with a peer or cohort for momentum.',
    weights: w({ communication: 2, support_pref: 2, learning_style: 1, program_fit: 1 }),
  },
  {
    key: 'exploratory_learner',
    label: 'Exploratory learner',
    summary: 'Learns by trying, breaking, and iterating.',
    thinkingProfile:
      'You learn fastest with your hands on the thing. Instructions matter less than a sandbox you can poke at. You are comfortable with not knowing, and you treat mistakes as information rather than failure. You can lose track of time once you are inside a new tool that interests you.',
    strengths: [
      'Picking up new tools quickly through experimentation',
      'Comfort with uncertainty and trial-and-error',
      'Generating unexpected uses for existing tools',
      'Modeling curiosity for others',
    ],
    frictionPoints: [
      'Heavy reading or theory before trying can feel slow',
      'May skip over fundamentals you later need',
      'Hard to stop exploring and ship',
      'Documentation of what you learned often lags',
    ],
    aiWorkflows: ['prompt-supported planning', 'workflow automation', 'learning companions', 'research synthesis'],
    supports: ['examples', 'practice exercises', 'accountability routines', 'structured prompts'],
    startingPoint: 'Begin with the prompt-design and tool-exploration tracks — give yourself a small project to ship within two weeks.',
    weights: w({ ambiguity_tolerance: 2, divergent_thinking: 1, ai_readiness: 2, learning_style: 1 }),
  },
  {
    key: 'structure_supported_learner',
    label: 'Structure-supported learner',
    summary: 'Thrives with clear scaffolding, pacing, and worked examples.',
    thinkingProfile:
      'You learn well when the path is visible. Clear objectives, sequenced steps, and worked examples let you move with confidence. Without that scaffolding you can feel underwater — not because you lack capability, but because cognitive load goes to figuring out the format instead of the content. With the right structure, you progress steadily and retain what you learn.',
    strengths: [
      'Following through once a path is clear',
      'Building durable understanding step by step',
      'Recognizing when you need more information before acting',
      'Producing organized, well-documented work',
    ],
    frictionPoints: [
      'Open-ended prompts can feel overwhelming',
      'Slower start in new domains',
      'May second-guess decisions without a model to follow',
      'Vague feedback is hard to act on',
    ],
    aiWorkflows: ['structured task breakdowns', 'learning companions', 'writing support', 'accountability systems'],
    supports: ['step-by-step guidance', 'templates', 'examples', 'slower onboarding'],
    startingPoint: 'Begin with the guided onboarding module — sequenced lessons, worked examples, and a check-in cadence.',
    weights: w({ structure_need: 2, support_pref: 2, learning_style: 1, info_processing: 1 }),
  },
  {
    key: 'high_divergence_creative',
    label: 'High-divergence creative thinker',
    summary: 'Generates a wide range of ideas and unexpected combinations.',
    thinkingProfile:
      'You generate volume and variety. Where others see one path, you see five. You move laterally between domains and your best ideas often come from cross-pollination. Convergence — choosing one and committing — takes more effort than generating in the first place.',
    strengths: [
      'Fluent idea generation under time pressure',
      'Reframing problems in unexpected ways',
      'Spotting analogies across unrelated fields',
      'Energizing brainstorms and creative sessions',
    ],
    frictionPoints: [
      'Convergence and prioritization are harder than generation',
      'Risk of starting many things and finishing few',
      'Rigid processes can feel suffocating',
      'May undervalue the slow work of refinement',
    ],
    aiWorkflows: ['prompt-supported planning', 'writing support', 'visual mapping', 'business or project planning'],
    supports: ['accountability routines', 'coaching check-ins', 'templates', 'structured prompts'],
    startingPoint: 'Begin with the ideation and creative-writing tracks, paired with an accountability module so you finish what you start.',
    weights: w({ divergent_thinking: 2, ambiguity_tolerance: 1, info_processing: 1, problem_solving: 1, program_fit: 1 }),
  },
];

export const ARCHETYPE_BY_KEY: Record<ArchetypeKey, Archetype> = ARCHETYPES.reduce(
  (acc, a) => ({ ...acc, [a.key]: a }),
  {} as Record<ArchetypeKey, Archetype>,
);
