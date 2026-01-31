// Cognitive Style Question Variants - 3 variants per question slot
// Maintains the same dimension targeting while providing unique retake experiences

import { CognitiveStyleQuestion, ThinkingDimension } from './cognitiveStyleQuestions';
import { QuestionVariant } from '@/lib/questionVariants';

// Helper to create default scores for a dimension
const createScores = (primary: ThinkingDimension, primaryScore: number, secondary?: ThinkingDimension, secondaryScore?: number): Record<ThinkingDimension, number> => ({
  visual_spatial: primary === 'visual_spatial' ? primaryScore : (secondary === 'visual_spatial' ? (secondaryScore || 2) : 0),
  pattern_recognition: primary === 'pattern_recognition' ? primaryScore : (secondary === 'pattern_recognition' ? (secondaryScore || 2) : 0),
  hyperfocus: primary === 'hyperfocus' ? primaryScore : (secondary === 'hyperfocus' ? (secondaryScore || 2) : 0),
  divergent_thinking: primary === 'divergent_thinking' ? primaryScore : (secondary === 'divergent_thinking' ? (secondaryScore || 2) : 0),
  detail_orientation: primary === 'detail_orientation' ? primaryScore : (secondary === 'detail_orientation' ? (secondaryScore || 2) : 0),
  big_picture: primary === 'big_picture' ? primaryScore : (secondary === 'big_picture' ? (secondaryScore || 2) : 0),
});

export const cognitiveStyleQuestionVariants: QuestionVariant<CognitiveStyleQuestion>[] = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // VISUAL-SPATIAL THINKING (Questions 1-4)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    base: {
      id: 1,
      question: "When trying to understand a complex system (like a new software, organization, or machine), what helps you most?",
      dimension: 'visual_spatial',
      options: [
        { text: "Drawing diagrams or mental maps of how components connect", scores: { visual_spatial: 5, pattern_recognition: 3, hyperfocus: 0, divergent_thinking: 1, detail_orientation: 1, big_picture: 4 } },
        { text: "Reading detailed documentation or step-by-step instructions", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
        { text: "Hands-on experimentation and trial-and-error", scores: { visual_spatial: 3, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 } },
        { text: "Discussing it with someone who can explain it verbally", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 1,
        question: "When planning a home renovation or rearranging furniture, how do you approach it?",
        dimension: 'visual_spatial',
        options: [
          { text: "I visualize the finished result in my mind before starting", scores: { visual_spatial: 5, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 4 } },
          { text: "I make detailed lists and measurements first", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "I start moving things around and adjust as I go", scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 } },
          { text: "I look at photos or examples online for inspiration", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        ],
      },
      {
        id: 1,
        question: "When giving someone directions to a location, how do you typically explain?",
        dimension: 'visual_spatial',
        options: [
          { text: "I describe landmarks and visual cues along the route", scores: { visual_spatial: 5, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 1, detail_orientation: 2, big_picture: 3 } },
          { text: "I provide precise street names and turn-by-turn instructions", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "I draw or sketch a quick map", scores: { visual_spatial: 4, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
          { text: "I suggest they use GPS—I'm not great with directions", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 2,
      question: "When remembering events from your past, how do you typically experience them?",
      dimension: 'visual_spatial',
      options: [
        { text: "As vivid mental images or movie-like scenes I can 'see' clearly", scores: { visual_spatial: 5, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 } },
        { text: "Through the emotions and feelings I experienced at the time", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 } },
        { text: "As factual knowledge—I know what happened but don't 'relive' it", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 } },
        { text: "Memories are often fragmented; I struggle to recall details visually", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 2,
        question: "When someone describes a person you haven't met, what happens in your mind?",
        dimension: 'visual_spatial',
        options: [
          { text: "I automatically create a detailed mental image of them", scores: { visual_spatial: 5, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 2, big_picture: 2 } },
          { text: "I focus on remembering the key facts about them", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "I imagine their personality and how I might interact with them", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 } },
          { text: "I don't form strong mental images—I wait to meet them", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        ],
      },
      {
        id: 2,
        question: "When reading a novel, how do you experience the story?",
        dimension: 'visual_spatial',
        options: [
          { text: "I see the scenes playing out like a movie in my mind", scores: { visual_spatial: 5, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
          { text: "I focus on the plot logic and character motivations", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 } },
          { text: "I connect emotionally with the characters' feelings", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 } },
          { text: "I sometimes struggle to stay engaged unless it's very compelling", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 3,
      question: "If asked to mentally rotate a 3D object in your mind, how easy is this for you?",
      dimension: 'visual_spatial',
      options: [
        { text: "Very easy—I can manipulate objects in my mind effortlessly", scores: { visual_spatial: 5, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
        { text: "I can do it, but it requires deliberate effort and concentration", scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "I prefer to sketch it out or use a physical model", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 4, big_picture: 1 } },
        { text: "I find this task quite difficult and frustrating", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 3,
        question: "When packing a suitcase or car trunk, how do you approach fitting everything?",
        dimension: 'visual_spatial',
        options: [
          { text: "I can mentally visualize how pieces will fit together before I start", scores: { visual_spatial: 5, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
          { text: "I arrange things systematically by size or category", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 } },
          { text: "I experiment with different arrangements until it works", scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 2, big_picture: 2 } },
          { text: "I often struggle and end up with unused space", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 1 } },
        ],
      },
      {
        id: 3,
        question: "When assembling furniture from instructions, how do you typically proceed?",
        dimension: 'visual_spatial',
        options: [
          { text: "I can often assemble it just by looking at the picture of the finished product", scores: { visual_spatial: 5, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "I follow the written steps precisely, one at a time", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "I scan the diagrams but work somewhat intuitively", scores: { visual_spatial: 3, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
          { text: "I find it frustrating and prefer pre-assembled items", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 1 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 4,
      question: "When looking at a map of an unfamiliar city, how quickly can you orient yourself?",
      dimension: 'visual_spatial',
      options: [
        { text: "Almost instantly—I have a strong sense of spatial orientation", scores: { visual_spatial: 5, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 2, big_picture: 4 } },
        { text: "I need a few moments to match landmarks to my surroundings", scores: { visual_spatial: 3, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 } },
        { text: "I prefer GPS with voice directions over reading maps", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 1 } },
        { text: "Maps often confuse me—I need physical landmarks", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 4,
        question: "After visiting a place once, how well can you find your way back?",
        dimension: 'visual_spatial',
        options: [
          { text: "Very well—I form a mental map almost automatically", scores: { visual_spatial: 5, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 2, big_picture: 4 } },
          { text: "I remember key landmarks but might miss some turns", scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
          { text: "I need to retrace my exact steps to not get lost", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 } },
          { text: "I usually need navigation help even for repeat visits", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 } },
        ],
      },
      {
        id: 4,
        question: "When playing video games or virtual environments, how naturally do you navigate?",
        dimension: 'visual_spatial',
        options: [
          { text: "I build a mental map quickly and rarely get lost", scores: { visual_spatial: 5, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 2, big_picture: 4 } },
          { text: "I rely on the in-game map frequently", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "I explore freely without worrying about getting lost", scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 } },
          { text: "Navigation is my least favorite part of games", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 } },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // PATTERN RECOGNITION (Questions 5-8)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    base: {
      id: 5,
      question: "When you encounter a dataset, spreadsheet, or collection of information, what do you naturally do first?",
      dimension: 'pattern_recognition',
      options: [
        { text: "Look for trends, correlations, or anomalies that stand out", scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
        { text: "Organize and categorize the data systematically", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 } },
        { text: "Ask what questions this data might answer", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 4 } },
        { text: "Feel overwhelmed until someone explains what I should focus on", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 5,
        question: "When learning a new board game or card game, how do you develop your strategy?",
        dimension: 'pattern_recognition',
        options: [
          { text: "I quickly identify the winning patterns and optimize my approach", scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "I carefully study the rules and mechanics before playing", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 } },
          { text: "I try creative and unexpected moves to see what works", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 3 } },
          { text: "I prefer to just play and have fun without strategizing", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
        ],
      },
      {
        id: 5,
        question: "When watching a mystery movie, how often do you predict the twist?",
        dimension: 'pattern_recognition',
        options: [
          { text: "Almost always—I notice the clues and connect them early", scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 4, big_picture: 3 } },
          { text: "Sometimes, if the clues are fairly obvious", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 } },
          { text: "I prefer to let the story surprise me rather than analyze it", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 } },
          { text: "I rarely try to predict—I just enjoy the ride", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 6,
      question: "In conversations, do you often notice when someone's current statement contradicts something they said earlier?",
      dimension: 'pattern_recognition',
      options: [
        { text: "Yes, inconsistencies jump out at me immediately", scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
        { text: "Sometimes, if I'm paying close attention", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "I focus more on the emotional content than logical consistency", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 } },
        { text: "I rarely notice—I take statements at face value in the moment", scores: { visual_spatial: 1, pattern_recognition: 0, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 6,
        question: "When reading news from multiple sources, how quickly do you spot bias or spin?",
        dimension: 'pattern_recognition',
        options: [
          { text: "Almost immediately—framing and word choice reveal bias quickly", scores: { visual_spatial: 1, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 4, big_picture: 3 } },
          { text: "I notice it when I compare different sources side-by-side", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 } },
          { text: "I tend to trust sources that align with my existing views", scores: { visual_spatial: 0, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I don't usually think about bias when reading news", scores: { visual_spatial: 0, pattern_recognition: 0, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
        ],
      },
      {
        id: 6,
        question: "When debugging a problem (computer, mechanical, or otherwise), how do you approach it?",
        dimension: 'pattern_recognition',
        options: [
          { text: "I recognize patterns in symptoms that point to likely causes", scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
          { text: "I systematically test each component one by one", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "I try random fixes until something works", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 } },
          { text: "I usually need to call someone for help", scores: { visual_spatial: 0, pattern_recognition: 0, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 7,
      question: "When learning something new, do you find yourself automatically connecting it to things you already know?",
      dimension: 'pattern_recognition',
      options: [
        { text: "Yes—my mind constantly draws analogies and connections", scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 5 } },
        { text: "Sometimes, especially in subjects I'm familiar with", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
        { text: "I prefer to understand new things on their own terms first", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
        { text: "I learn best with clear, isolated explanations", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 7,
        question: "When you hear about a new technology or invention, what's your first thought?",
        dimension: 'pattern_recognition',
        options: [
          { text: "How it connects to existing technologies and what it might enable", scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 5 } },
          { text: "The technical details and how it actually works", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 5, big_picture: 2 } },
          { text: "Creative ways it could be used or misused", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 3 } },
          { text: "Whether it will affect my daily life personally", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
        ],
      },
      {
        id: 7,
        question: "When you encounter a problem similar to one you've solved before, what happens?",
        dimension: 'pattern_recognition',
        options: [
          { text: "I immediately recognize the pattern and apply the same solution", scores: { visual_spatial: 2, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 4 } },
          { text: "I check if the situations are truly similar before deciding", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 3 } },
          { text: "I prefer to approach each problem fresh without assumptions", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 4, detail_orientation: 2, big_picture: 2 } },
          { text: "I often don't realize problems are similar until someone points it out", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 8,
      question: "How quickly do you notice when something in your environment has changed?",
      dimension: 'pattern_recognition',
      options: [
        { text: "Very quickly—even small changes catch my attention", scores: { visual_spatial: 3, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 5, big_picture: 2 } },
        { text: "I notice significant changes but miss subtle ones", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 } },
        { text: "Only if it directly affects what I'm doing", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
        { text: "I often miss changes until someone points them out", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 8,
        question: "When a friend changes their appearance (haircut, new glasses, etc.), how quickly do you notice?",
        dimension: 'pattern_recognition',
        options: [
          { text: "Immediately—even subtle changes stand out to me", scores: { visual_spatial: 3, pattern_recognition: 5, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 5, big_picture: 2 } },
          { text: "Usually, if it's a noticeable change", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Sometimes, but I might not mention it", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
          { text: "I often don't notice until they tell me", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
        ],
      },
      {
        id: 8,
        question: "When using a software tool or website after an update, how do you react?",
        dimension: 'pattern_recognition',
        options: [
          { text: "I immediately spot what's different and assess the changes", scores: { visual_spatial: 3, pattern_recognition: 5, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 3 } },
          { text: "I notice if major features moved, but adapt quickly", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
          { text: "I find changes frustrating and prefer consistency", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 } },
          { text: "I often don't notice updates until something breaks my workflow", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // HYPERFOCUS (Questions 9-12)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    base: {
      id: 9,
      question: "When working on something you find genuinely interesting, what happens to your sense of time?",
      dimension: 'hyperfocus',
      options: [
        { text: "Hours pass like minutes—I completely lose track of time", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        { text: "I'm aware of time passing but can still get deeply absorbed", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "I maintain awareness of time and take regular breaks", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "I struggle to focus for extended periods on any task", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 9,
        question: "When reading a book or article that truly captivates you, what happens?",
        dimension: 'hyperfocus',
        options: [
          { text: "I become completely oblivious to my surroundings", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
          { text: "I'm very focused but can still respond if interrupted", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I read in measured chunks with breaks", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "I rarely read for extended periods—my mind wanders", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 2 } },
        ],
      },
      {
        id: 9,
        question: "When playing a game you enjoy, how does your engagement feel?",
        dimension: 'hyperfocus',
        options: [
          { text: "I enter a 'flow state' where nothing else exists", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I'm very engaged but can pause when needed", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I set time limits and stick to them", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 } },
          { text: "I get bored quickly and switch activities often", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 10,
      question: "How do you handle interruptions when you're deeply focused on a task?",
      dimension: 'hyperfocus',
      options: [
        { text: "I find them jarring—it takes me a while to recover my focus", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "They're annoying but I can handle them and return to work", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
        { text: "I don't get deeply focused enough for interruptions to matter much", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 2, big_picture: 2 } },
        { text: "I welcome interruptions as they help me not get too absorbed", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 10,
        question: "When someone talks to you while you're concentrating, what happens?",
        dimension: 'hyperfocus',
        options: [
          { text: "I often don't hear them at all the first time", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "I hear them but need a moment to shift attention", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I can usually multitask and respond right away", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
          { text: "I don't concentrate deeply enough for this to be an issue", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 2 } },
        ],
      },
      {
        id: 10,
        question: "After an interruption while working, how quickly can you resume where you left off?",
        dimension: 'hyperfocus',
        options: [
          { text: "It takes significant time—I need to rebuild my mental state", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "A minute or two to find my place again", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Almost immediately—I keep mental notes", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "I often use it as an excuse to switch to something else", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 11,
      question: "When you discover a new interest or hobby, how do you typically engage with it?",
      dimension: 'hyperfocus',
      options: [
        { text: "I dive in completely—researching, practicing, consuming content obsessively", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
        { text: "I explore it enthusiastically but maintain other commitments", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        { text: "I add it to my rotation of existing interests", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        { text: "My interest tends to be fleeting—I rarely go deep", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 1, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 11,
        question: "When you find a YouTube channel or podcast you love, how do you consume it?",
        dimension: 'hyperfocus',
        options: [
          { text: "I binge the entire back catalog as quickly as possible", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 2, big_picture: 3 } },
          { text: "I watch/listen regularly but spread it out over time", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I mix it in with other content creators I follow", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
          { text: "I rarely stick with any channel for long", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 2 } },
        ],
      },
      {
        id: 11,
        question: "When working on a personal project, how do your work sessions typically go?",
        dimension: 'hyperfocus',
        options: [
          { text: "Marathon sessions where I forget to eat or sleep", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
          { text: "Long but bounded—I work intensely but set end times", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Steady and moderate—I work a bit each day", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Sporadic—I struggle to maintain consistent effort", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 12,
      question: "Do you ever forget to eat, drink, or use the bathroom when engrossed in an activity?",
      dimension: 'hyperfocus',
      options: [
        { text: "Yes, frequently—I only notice physical needs when they become urgent", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 1, big_picture: 2 } },
        { text: "Occasionally, when something is particularly engaging", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
        { text: "Rarely—I stay fairly aware of my body's needs", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "Never—I naturally maintain awareness of physical sensations", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 12,
        question: "When you're working on something engaging, how aware are you of background noise?",
        dimension: 'hyperfocus',
        options: [
          { text: "I completely tune it out—people say they tried to talk to me and I didn't respond", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 5, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I hear it vaguely but it doesn't register fully", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "I'm somewhat aware but can filter it out", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Background noise makes it hard for me to focus", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        ],
      },
      {
        id: 12,
        question: "Have you ever been so absorbed in something that you lost track of an entire day?",
        dimension: 'hyperfocus',
        options: [
          { text: "Yes, multiple times—it's a regular occurrence", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 5, divergent_thinking: 2, detail_orientation: 1, big_picture: 2 } },
          { text: "It's happened a few times with things I'm passionate about", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
          { text: "Maybe once or twice in exceptional circumstances", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
          { text: "No, I always maintain awareness of time passing", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // DIVERGENT THINKING (Questions 13-17)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    base: {
      id: 13,
      question: "When brainstorming solutions to a problem, how many ideas do you typically generate?",
      dimension: 'divergent_thinking',
      options: [
        { text: "Many unusual ideas—quantity and novelty come easily to me", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 } },
        { text: "Several practical ideas that build on what already works", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
        { text: "A few well-considered options after careful analysis", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
        { text: "I prefer to find one good solution quickly and refine it", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 3, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 13,
        question: "If asked to list unusual uses for a common object (like a brick), how would you perform?",
        dimension: 'divergent_thinking',
        options: [
          { text: "I'd generate many wild and creative ideas quickly", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 } },
          { text: "I'd come up with a solid list of practical alternatives", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 } },
          { text: "I'd struggle initially but might find a few interesting ones", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 } },
          { text: "I find these kinds of exercises pointless and frustrating", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 3, big_picture: 2 } },
        ],
      },
      {
        id: 13,
        question: "When facing a challenge at work or home, what's your typical approach?",
        dimension: 'divergent_thinking',
        options: [
          { text: "Generate many unconventional approaches before choosing", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 4 } },
          { text: "Combine elements from different solutions I've seen before", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
          { text: "Apply a proven method that has worked in similar situations", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "Seek advice from someone who has solved this before", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 2, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 14,
      question: "How often do you make unexpected connections between unrelated topics or fields?",
      dimension: 'divergent_thinking',
      options: [
        { text: "Constantly—my mind naturally links disparate ideas", scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 } },
        { text: "Sometimes, especially when I'm relaxed or in creative mode", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 } },
        { text: "Occasionally, but I prefer focused, linear thinking", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "Rarely—I think in terms of separate categories", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 3, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 14,
        question: "When learning about one field, do you often think of parallels in completely different areas?",
        dimension: 'divergent_thinking',
        options: [
          { text: "All the time—I see metaphors and analogies everywhere", scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 1, big_picture: 5 } },
          { text: "Often, especially with adjacent or related fields", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
          { text: "Sometimes, if the connection is fairly obvious", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
          { text: "I prefer to focus on one field at a time", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 } },
        ],
      },
      {
        id: 14,
        question: "In conversations, do you often bring up tangentially related topics that surprise others?",
        dimension: 'divergent_thinking',
        options: [
          { text: "Yes—my associative thinking leads me on unexpected paths", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 0, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 } },
          { text: "Sometimes, and people often appreciate the fresh perspective", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 } },
          { text: "Occasionally, but I try to stay on topic", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 2 } },
          { text: "I prefer to follow the natural flow of conversation", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 15,
      question: "When rules or conventions seem arbitrary, how do you respond?",
      dimension: 'divergent_thinking',
      options: [
        { text: "I question or challenge them—there might be a better way", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 } },
        { text: "I consider whether the rule has hidden benefits before judging", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
        { text: "I follow them—rules usually exist for good reasons", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 } },
        { text: "I work within the system to gradually improve things", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
      ],
    },
    variants: [
      {
        id: 15,
        question: "When given a standard process or template, what's your instinct?",
        dimension: 'divergent_thinking',
        options: [
          { text: "To modify or customize it—standardization limits creativity", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 } },
          { text: "To understand why it's structured that way first", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
          { text: "To follow it precisely—it's been optimized for a reason", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "To use it as a starting point and adapt as needed", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
        ],
      },
      {
        id: 15,
        question: "When you see 'This is how we've always done it,' what's your reaction?",
        dimension: 'divergent_thinking',
        options: [
          { text: "That's exactly what needs to change", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 } },
          { text: "I'm curious whether there's wisdom behind it", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
          { text: "If it works, why change it?", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 } },
          { text: "It depends on whether we have capacity to improve it", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 16,
      question: "Do your ideas tend to be more incremental (improving existing solutions) or radical (entirely new approaches)?",
      dimension: 'divergent_thinking',
      options: [
        { text: "Radical—I'm drawn to fundamentally different approaches", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 } },
        { text: "A mix—I innovate on foundations that work", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
        { text: "Incremental—I prefer steady, measured improvement", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
        { text: "Practical—I focus on implementation over ideation", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 16,
        question: "When imagining the future of your field or industry, how do you think?",
        dimension: 'divergent_thinking',
        options: [
          { text: "In transformative possibilities—paradigm shifts and disruption", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 5 } },
          { text: "Evolution building on current trends and technologies", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "Gradual improvements to existing systems", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 } },
          { text: "I don't spend much time on long-term speculation", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 } },
        ],
      },
      {
        id: 16,
        question: "If you could redesign something you use daily, how would you approach it?",
        dimension: 'divergent_thinking',
        options: [
          { text: "Start from first principles—question every assumption", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 5, detail_orientation: 1, big_picture: 4 } },
          { text: "Keep the core concept but reimagine the details", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
          { text: "Fix the specific annoyances I experience", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "I'd probably not change much—if it works, it works", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 3, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 17,
      question: "How comfortable are you with ambiguity and open-ended situations?",
      dimension: 'divergent_thinking',
      options: [
        { text: "Very comfortable—I enjoy exploring uncertain territory", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 } },
        { text: "Reasonably comfortable if there's a direction to work toward", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
        { text: "I prefer clear goals and defined parameters", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
        { text: "I find ambiguity stressful and seek clarity quickly", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 17,
        question: "When starting a project without clear specifications, how do you feel?",
        dimension: 'divergent_thinking',
        options: [
          { text: "Excited—blank canvases are where creativity thrives", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 5, detail_orientation: 0, big_picture: 4 } },
          { text: "Okay if I can establish my own structure quickly", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
          { text: "Anxious—I need to clarify requirements first", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "Frustrated—unclear expectations lead to wasted effort", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
        ],
      },
      {
        id: 17,
        question: "How do you react when a plan falls through and you need to improvise?",
        dimension: 'divergent_thinking',
        options: [
          { text: "I thrive—improvisation is often better than the original plan", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 5, detail_orientation: 0, big_picture: 3 } },
          { text: "I adapt reasonably well with a bit of processing time", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 2, big_picture: 3 } },
          { text: "I manage but prefer to quickly establish a new plan", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "I find it stressful and need time to regroup", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 } },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // DETAIL ORIENTATION (Questions 18-21)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    base: {
      id: 18,
      question: "When proofreading a document, how likely are you to catch typos and formatting inconsistencies?",
      dimension: 'detail_orientation',
      options: [
        { text: "Very likely—errors jump out at me almost automatically", scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
        { text: "Fairly likely if I'm reading carefully and slowly", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "I catch major errors but miss subtle ones", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
        { text: "I often miss errors—details aren't my strength", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 3 } },
      ],
    },
    variants: [
      {
        id: 18,
        question: "When cooking from a recipe, how precisely do you follow measurements?",
        dimension: 'detail_orientation',
        options: [
          { text: "Exactly—I use measuring spoons and cups precisely", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "Fairly closely, with minor adjustments", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "I use the recipe as a loose guide and eyeball quantities", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 } },
          { text: "I rarely use recipes—I cook intuitively", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 0, big_picture: 3 } },
        ],
      },
      {
        id: 18,
        question: "When filling out forms, how carefully do you read the instructions?",
        dimension: 'detail_orientation',
        options: [
          { text: "Very carefully—I read everything before starting", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 } },
          { text: "I skim the key points and refer back if needed", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "I start filling it out and read instructions only if confused", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
          { text: "I often miss instructions and make mistakes", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 2 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 19,
      question: "How much do small imperfections (crooked pictures, asymmetric layouts, minor inconsistencies) bother you?",
      dimension: 'detail_orientation',
      options: [
        { text: "A lot—I notice and feel compelled to fix them", scores: { visual_spatial: 3, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 0 } },
        { text: "Somewhat—I notice them but can tolerate most", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "Rarely—I only notice if they're very obvious", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 } },
        { text: "Not at all—I focus on the bigger picture", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 5 } },
      ],
    },
    variants: [
      {
        id: 19,
        question: "When arranging items on a shelf or desk, how important is symmetry and alignment?",
        dimension: 'detail_orientation',
        options: [
          { text: "Very important—I spend time getting it exactly right", scores: { visual_spatial: 3, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "Somewhat—I like things tidy but don't obsess", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Not very—function matters more than appearance", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 } },
          { text: "Not at all—I embrace organized chaos", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 0, big_picture: 3 } },
        ],
      },
      {
        id: 19,
        question: "When you notice a grammatical error in published content, how do you react?",
        dimension: 'detail_orientation',
        options: [
          { text: "It stands out immediately and bothers me", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "I notice it but can continue without issue", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "I only notice obvious errors", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
          { text: "I rarely notice unless someone points it out", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 3 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 20,
      question: "When working on a project, do you tend to perfect each section before moving on?",
      dimension: 'detail_orientation',
      options: [
        { text: "Yes—I can't leave something incomplete before proceeding", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
        { text: "Usually—I prefer finishing sections but can be flexible", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "Not really—I work on multiple parts and refine later", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 4 } },
        { text: "I prefer to get the overall structure first, then details", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 0, big_picture: 5 } },
      ],
    },
    variants: [
      {
        id: 20,
        question: "When writing an email or message, how much time do you spend reviewing before sending?",
        dimension: 'detail_orientation',
        options: [
          { text: "Significant time—I reread multiple times and edit carefully", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "A quick review to catch obvious errors", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Minimal—I send pretty quickly once I've written it", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 } },
          { text: "None—I trust my first draft", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 3 } },
        ],
      },
      {
        id: 20,
        question: "When learning a new skill, do you prefer to master basics before advancing?",
        dimension: 'detail_orientation',
        options: [
          { text: "Absolutely—I won't move on until I've perfected each step", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "Generally—I like a solid foundation but stay flexible", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Not really—I learn by trying advanced things and filling gaps", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 3 } },
          { text: "I jump around based on what interests me in the moment", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 4, detail_orientation: 0, big_picture: 3 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 21,
      question: "How often do you catch errors or details that others miss?",
      dimension: 'detail_orientation',
      options: [
        { text: "Frequently—I'm often the one who spots problems first", scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 } },
        { text: "Sometimes—I notice things others might overlook", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "Occasionally—usually only when specifically looking", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        { text: "Rarely—I tend to miss details that others catch", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 3 } },
      ],
    },
    variants: [
      {
        id: 21,
        question: "In group work, are you typically the one doing the final quality check?",
        dimension: 'detail_orientation',
        options: [
          { text: "Yes—people trust me to catch issues before submission", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 2 } },
          { text: "Sometimes—I share that role with others", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "Rarely—others are better at catching details", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 3 } },
          { text: "No—I contribute in other ways", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 0, big_picture: 3 } },
        ],
      },
      {
        id: 21,
        question: "When reviewing someone else's work, what do you naturally focus on?",
        dimension: 'detail_orientation',
        options: [
          { text: "Specific errors—typos, inconsistencies, formatting issues", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "Both details and overall quality in balance", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 3 } },
          { text: "The main ideas and overall structure", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 4 } },
          { text: "Whether it achieves its purpose overall", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 0, big_picture: 5 } },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // BIG PICTURE / SYSTEMS THINKING (Questions 22-25)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    base: {
      id: 22,
      question: "When learning about a new topic, do you prefer to understand the big picture first or build up from details?",
      dimension: 'big_picture',
      options: [
        { text: "Big picture first—I need the overall framework before details make sense", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 0, big_picture: 5 } },
        { text: "I alternate—getting context and then diving into specifics", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
        { text: "Details first—I build understanding from the ground up", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 5, big_picture: 1 } },
        { text: "It depends entirely on the topic", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
      ],
    },
    variants: [
      {
        id: 22,
        question: "When reading a textbook, how do you typically approach it?",
        dimension: 'big_picture',
        options: [
          { text: "I skim the whole thing first to get the structure, then dive in", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 } },
          { text: "I read the chapter summaries before the detailed content", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 2, big_picture: 4 } },
          { text: "I read linearly from beginning to end", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 0, detail_orientation: 4, big_picture: 2 } },
          { text: "I jump to whatever section seems most relevant", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 3 } },
        ],
      },
      {
        id: 22,
        question: "When someone gives you instructions, what helps you most?",
        dimension: 'big_picture',
        options: [
          { text: "Understanding the goal first—then the steps make sense", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 } },
          { text: "A brief overview followed by detailed steps", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 2, big_picture: 4 } },
          { text: "Clear, sequential steps I can follow exactly", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 5, big_picture: 1 } },
          { text: "I prefer to figure it out myself with minimal guidance", scores: { visual_spatial: 2, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 4, detail_orientation: 1, big_picture: 3 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 23,
      question: "How often do you think about how current decisions might affect things years from now?",
      dimension: 'big_picture',
      options: [
        { text: "Constantly—I naturally consider long-term implications", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 } },
        { text: "Often—I balance immediate needs with future thinking", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
        { text: "Sometimes—when making major decisions", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "Rarely—I focus on immediate outcomes", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 23,
        question: "When making a purchase, how much do you consider long-term value vs. immediate cost?",
        dimension: 'big_picture',
        options: [
          { text: "A lot—I think about total cost of ownership and longevity", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 2, big_picture: 5 } },
          { text: "Significantly—I balance upfront cost with durability", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 2, big_picture: 4 } },
          { text: "Somewhat—mainly for big purchases", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 3 } },
          { text: "Not much—I focus on immediate price and need", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 3, big_picture: 1 } },
        ],
      },
      {
        id: 23,
        question: "When faced with a problem, do you tend to consider ripple effects?",
        dimension: 'big_picture',
        options: [
          { text: "Yes—I map out second and third-order consequences", scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 1, big_picture: 5 } },
          { text: "Often—I try to anticipate unintended consequences", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "Sometimes—for important decisions", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 3 } },
          { text: "Rarely—I solve the immediate problem first", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 1 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 24,
      question: "When you encounter a complex system (ecology, economy, social dynamics), how naturally do you understand how parts interrelate?",
      dimension: 'big_picture',
      options: [
        { text: "Very naturally—I see connections and feedback loops quickly", scores: { visual_spatial: 3, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 5 } },
        { text: "Fairly well—I can trace cause-and-effect chains", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
        { text: "It takes effort—I need to consciously map relationships", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
        { text: "I prefer to focus on individual components", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 24,
        question: "When watching news about global events, do you naturally connect them to other happenings?",
        dimension: 'big_picture',
        options: [
          { text: "Yes—I see how events in one area affect others globally", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 3, detail_orientation: 1, big_picture: 5 } },
          { text: "Often—I look for broader patterns and implications", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "Sometimes—if the connections are mentioned", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 1, divergent_thinking: 1, detail_orientation: 2, big_picture: 3 } },
          { text: "I tend to focus on each story individually", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 1 } },
        ],
      },
      {
        id: 24,
        question: "When you join a new organization, how quickly do you understand its informal dynamics?",
        dimension: 'big_picture',
        options: [
          { text: "Quickly—I map power structures and relationships intuitively", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 5 } },
          { text: "Fairly quickly—I pay attention to who talks to whom", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "It takes time—I focus first on my specific role", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 3, big_picture: 2 } },
          { text: "I'm not particularly tuned into organizational dynamics", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 1 } },
        ],
      },
    ],
  },
  {
    base: {
      id: 25,
      question: "How comfortable are you synthesizing information from many different sources into a coherent whole?",
      dimension: 'big_picture',
      options: [
        { text: "Very comfortable—I enjoy integrating diverse information", scores: { visual_spatial: 2, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 1, big_picture: 5 } },
        { text: "Fairly comfortable with enough time to process", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
        { text: "I prefer fewer, more authoritative sources", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
        { text: "I find it overwhelming—I prefer one clear source", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 2, divergent_thinking: 0, detail_orientation: 4, big_picture: 1 } },
      ],
    },
    variants: [
      {
        id: 25,
        question: "When researching a decision (buying a product, choosing a path), how do you gather information?",
        dimension: 'big_picture',
        options: [
          { text: "I consult many sources and synthesize conflicting views", scores: { visual_spatial: 1, pattern_recognition: 4, hyperfocus: 2, divergent_thinking: 3, detail_orientation: 2, big_picture: 5 } },
          { text: "I look at several respected sources and compare", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "I find one trusted source and rely on that", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 2, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "I go with my gut after minimal research", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 0, divergent_thinking: 3, detail_orientation: 1, big_picture: 2 } },
        ],
      },
      {
        id: 25,
        question: "When explaining a complex topic to someone, how do you structure your explanation?",
        dimension: 'big_picture',
        options: [
          { text: "Start with the overall framework, then add detail as needed", scores: { visual_spatial: 2, pattern_recognition: 3, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 1, big_picture: 5 } },
          { text: "Balance between big picture and key details", scores: { visual_spatial: 1, pattern_recognition: 3, hyperfocus: 2, divergent_thinking: 2, detail_orientation: 2, big_picture: 4 } },
          { text: "Build up step by step from simple to complex", scores: { visual_spatial: 1, pattern_recognition: 2, hyperfocus: 3, divergent_thinking: 1, detail_orientation: 4, big_picture: 2 } },
          { text: "I struggle to explain complex things clearly", scores: { visual_spatial: 1, pattern_recognition: 1, hyperfocus: 1, divergent_thinking: 2, detail_orientation: 2, big_picture: 2 } },
        ],
      },
    ],
  },
];
