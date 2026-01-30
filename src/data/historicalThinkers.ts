// Historical Thinkers Database
// Estimated cognitive profiles based on biographical analysis and historical records

import { PersonalityTrait } from './personalityQuestions';
import { ThinkingDimension } from './cognitiveStyleQuestions';

export interface HistoricalThinker {
  id: string;
  name: string;
  era: string;
  field: string;
  estimatedIQ: number;
  personalityProfile: Record<PersonalityTrait, number>;
  cognitiveProfile: Partial<Record<ThinkingDimension, number>>;
  adhdIndicators: {
    inattention: number; // 0-100
    hyperactivity: number; // 0-100
  };
  description: string;
  famousFor: string;
  quote?: string;
  imageSymbol: string; // Unicode symbol to represent them
}

export const historicalThinkers: HistoricalThinker[] = [
  // Scientists & Inventors
  {
    id: 'einstein',
    name: 'Albert Einstein',
    era: '1879-1955',
    field: 'Physics',
    estimatedIQ: 160,
    personalityProfile: {
      openness: 95,
      conscientiousness: 55,
      extraversion: 40,
      agreeableness: 70,
      neuroticism: 35,
    },
    cognitiveProfile: {
      visual_spatial: 95,
      pattern_recognition: 98,
      hyperfocus: 85,
      divergent_thinking: 90,
      big_picture: 95,
      detail_orientation: 60,
    },
    adhdIndicators: { inattention: 45, hyperactivity: 25 },
    description: 'Revolutionary physicist who reimagined space, time, and reality itself through visual thought experiments.',
    famousFor: 'Theory of Relativity, E=mc²',
    quote: 'Imagination is more important than knowledge.',
    imageSymbol: '⚛️',
  },
  {
    id: 'davinci',
    name: 'Leonardo da Vinci',
    era: '1452-1519',
    field: 'Polymath',
    estimatedIQ: 180,
    personalityProfile: {
      openness: 99,
      conscientiousness: 45,
      extraversion: 50,
      agreeableness: 65,
      neuroticism: 40,
    },
    cognitiveProfile: {
      visual_spatial: 99,
      pattern_recognition: 95,
      hyperfocus: 70,
      divergent_thinking: 98,
      big_picture: 90,
      detail_orientation: 95,
    },
    adhdIndicators: { inattention: 60, hyperactivity: 35 },
    description: 'The ultimate Renaissance polymath—artist, inventor, scientist, and visionary who saw connections everywhere.',
    famousFor: 'Mona Lisa, Vitruvian Man, countless inventions',
    quote: 'Learning never exhausts the mind.',
    imageSymbol: '🎨',
  },
  {
    id: 'tesla',
    name: 'Nikola Tesla',
    era: '1856-1943',
    field: 'Engineering',
    estimatedIQ: 160,
    personalityProfile: {
      openness: 90,
      conscientiousness: 80,
      extraversion: 25,
      agreeableness: 45,
      neuroticism: 55,
    },
    cognitiveProfile: {
      visual_spatial: 99,
      pattern_recognition: 95,
      hyperfocus: 95,
      divergent_thinking: 85,
      big_picture: 85,
      detail_orientation: 90,
    },
    adhdIndicators: { inattention: 30, hyperactivity: 40 },
    description: 'Visionary inventor with photographic memory who could visualize complete inventions in his mind.',
    famousFor: 'AC electrical system, wireless transmission',
    quote: 'The present is theirs; the future, for which I really worked, is mine.',
    imageSymbol: '⚡',
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    era: '1867-1934',
    field: 'Physics & Chemistry',
    estimatedIQ: 155,
    personalityProfile: {
      openness: 85,
      conscientiousness: 95,
      extraversion: 30,
      agreeableness: 60,
      neuroticism: 40,
    },
    cognitiveProfile: {
      visual_spatial: 70,
      pattern_recognition: 90,
      hyperfocus: 95,
      divergent_thinking: 75,
      big_picture: 80,
      detail_orientation: 95,
    },
    adhdIndicators: { inattention: 15, hyperactivity: 10 },
    description: 'Pioneer of radioactivity research with extraordinary persistence and methodical brilliance.',
    famousFor: 'Discovery of polonium and radium, two Nobel Prizes',
    quote: 'Nothing in life is to be feared, it is only to be understood.',
    imageSymbol: '☢️',
  },
  {
    id: 'darwin',
    name: 'Charles Darwin',
    era: '1809-1882',
    field: 'Biology',
    estimatedIQ: 145,
    personalityProfile: {
      openness: 90,
      conscientiousness: 85,
      extraversion: 35,
      agreeableness: 75,
      neuroticism: 55,
    },
    cognitiveProfile: {
      visual_spatial: 75,
      pattern_recognition: 95,
      hyperfocus: 80,
      divergent_thinking: 85,
      big_picture: 95,
      detail_orientation: 90,
    },
    adhdIndicators: { inattention: 25, hyperactivity: 15 },
    description: 'Patient observer who revolutionized biology through meticulous pattern recognition across species.',
    famousFor: 'Theory of Evolution by Natural Selection',
    quote: 'It is not the strongest that survives, but the most adaptable.',
    imageSymbol: '🦎',
  },

  // Philosophers & Writers
  {
    id: 'aristotle',
    name: 'Aristotle',
    era: '384-322 BC',
    field: 'Philosophy',
    estimatedIQ: 165,
    personalityProfile: {
      openness: 95,
      conscientiousness: 90,
      extraversion: 60,
      agreeableness: 55,
      neuroticism: 25,
    },
    cognitiveProfile: {
      visual_spatial: 70,
      pattern_recognition: 95,
      hyperfocus: 85,
      divergent_thinking: 80,
      big_picture: 98,
      detail_orientation: 85,
    },
    adhdIndicators: { inattention: 15, hyperactivity: 20 },
    description: 'Systematic thinker who categorized knowledge itself and laid foundations for Western thought.',
    famousFor: 'Logic, ethics, metaphysics, natural sciences',
    quote: 'Knowing yourself is the beginning of all wisdom.',
    imageSymbol: '📜',
  },
  {
    id: 'newton',
    name: 'Isaac Newton',
    era: '1643-1727',
    field: 'Physics & Mathematics',
    estimatedIQ: 170,
    personalityProfile: {
      openness: 85,
      conscientiousness: 85,
      extraversion: 15,
      agreeableness: 30,
      neuroticism: 70,
    },
    cognitiveProfile: {
      visual_spatial: 90,
      pattern_recognition: 98,
      hyperfocus: 98,
      divergent_thinking: 75,
      big_picture: 90,
      detail_orientation: 95,
    },
    adhdIndicators: { inattention: 20, hyperactivity: 10 },
    description: 'Intense, solitary genius who unified terrestrial and celestial mechanics through mathematical rigor.',
    famousFor: 'Laws of Motion, Gravity, Calculus',
    quote: 'If I have seen further, it is by standing on the shoulders of giants.',
    imageSymbol: '🍎',
  },
  {
    id: 'woolf',
    name: 'Virginia Woolf',
    era: '1882-1941',
    field: 'Literature',
    estimatedIQ: 140,
    personalityProfile: {
      openness: 95,
      conscientiousness: 60,
      extraversion: 40,
      agreeableness: 55,
      neuroticism: 85,
    },
    cognitiveProfile: {
      visual_spatial: 85,
      pattern_recognition: 80,
      hyperfocus: 75,
      divergent_thinking: 95,
      big_picture: 85,
      detail_orientation: 80,
    },
    adhdIndicators: { inattention: 35, hyperactivity: 25 },
    description: 'Stream-of-consciousness pioneer who captured the fluid nature of human perception and time.',
    famousFor: 'Mrs Dalloway, To the Lighthouse, A Room of One\'s Own',
    quote: 'You cannot find peace by avoiding life.',
    imageSymbol: '✒️',
  },
  {
    id: 'nietzsche',
    name: 'Friedrich Nietzsche',
    era: '1844-1900',
    field: 'Philosophy',
    estimatedIQ: 155,
    personalityProfile: {
      openness: 95,
      conscientiousness: 70,
      extraversion: 30,
      agreeableness: 25,
      neuroticism: 75,
    },
    cognitiveProfile: {
      visual_spatial: 65,
      pattern_recognition: 90,
      hyperfocus: 80,
      divergent_thinking: 95,
      big_picture: 90,
      detail_orientation: 70,
    },
    adhdIndicators: { inattention: 40, hyperactivity: 35 },
    description: 'Radical thinker who challenged all values and envisioned humanity\'s self-transcendence.',
    famousFor: 'Übermensch concept, "God is dead", existentialism',
    quote: 'He who has a why to live can bear almost any how.',
    imageSymbol: '⛰️',
  },

  // Artists & Musicians
  {
    id: 'beethoven',
    name: 'Ludwig van Beethoven',
    era: '1770-1827',
    field: 'Music',
    estimatedIQ: 155,
    personalityProfile: {
      openness: 95,
      conscientiousness: 75,
      extraversion: 35,
      agreeableness: 35,
      neuroticism: 80,
    },
    cognitiveProfile: {
      visual_spatial: 60,
      pattern_recognition: 95,
      hyperfocus: 95,
      divergent_thinking: 85,
      big_picture: 90,
      detail_orientation: 85,
    },
    adhdIndicators: { inattention: 25, hyperactivity: 45 },
    description: 'Passionate composer who pushed music\'s emotional boundaries even while losing his hearing.',
    famousFor: 'Symphony No. 9, Moonlight Sonata, Piano Concertos',
    quote: 'Music is the one incorporeal entrance into the higher world of knowledge.',
    imageSymbol: '🎵',
  },
  {
    id: 'picasso',
    name: 'Pablo Picasso',
    era: '1881-1973',
    field: 'Art',
    estimatedIQ: 145,
    personalityProfile: {
      openness: 98,
      conscientiousness: 70,
      extraversion: 75,
      agreeableness: 40,
      neuroticism: 50,
    },
    cognitiveProfile: {
      visual_spatial: 98,
      pattern_recognition: 90,
      hyperfocus: 85,
      divergent_thinking: 98,
      big_picture: 80,
      detail_orientation: 75,
    },
    adhdIndicators: { inattention: 35, hyperactivity: 55 },
    description: 'Restlessly inventive artist who reinvented visual representation across multiple movements.',
    famousFor: 'Guernica, Cubism, over 50,000 artworks',
    quote: 'Every child is an artist. The problem is staying an artist when you grow up.',
    imageSymbol: '🎭',
  },
  {
    id: 'frida',
    name: 'Frida Kahlo',
    era: '1907-1954',
    field: 'Art',
    estimatedIQ: 135,
    personalityProfile: {
      openness: 95,
      conscientiousness: 65,
      extraversion: 65,
      agreeableness: 55,
      neuroticism: 75,
    },
    cognitiveProfile: {
      visual_spatial: 95,
      pattern_recognition: 80,
      hyperfocus: 85,
      divergent_thinking: 90,
      big_picture: 75,
      detail_orientation: 90,
    },
    adhdIndicators: { inattention: 30, hyperactivity: 40 },
    description: 'Surrealist painter who transformed personal pain into visceral, symbolic self-portraiture.',
    famousFor: 'Self-portraits, symbolism, Mexican folk art influence',
    quote: 'I paint myself because I am often alone and I am the subject I know best.',
    imageSymbol: '🌺',
  },

  // Leaders & Strategists
  {
    id: 'cleopatra',
    name: 'Cleopatra VII',
    era: '69-30 BC',
    field: 'Politics',
    estimatedIQ: 145,
    personalityProfile: {
      openness: 80,
      conscientiousness: 85,
      extraversion: 80,
      agreeableness: 45,
      neuroticism: 40,
    },
    cognitiveProfile: {
      visual_spatial: 65,
      pattern_recognition: 85,
      hyperfocus: 75,
      divergent_thinking: 80,
      big_picture: 90,
      detail_orientation: 75,
    },
    adhdIndicators: { inattention: 20, hyperactivity: 30 },
    description: 'Polyglot queen who mastered diplomacy, statecraft, and navigation of empire politics.',
    famousFor: 'Ruling Egypt, diplomatic alliances, linguistic mastery',
    quote: 'I will not be triumphed over.',
    imageSymbol: '👑',
  },
  {
    id: 'napoleon',
    name: 'Napoleon Bonaparte',
    era: '1769-1821',
    field: 'Military & Politics',
    estimatedIQ: 150,
    personalityProfile: {
      openness: 75,
      conscientiousness: 95,
      extraversion: 85,
      agreeableness: 25,
      neuroticism: 45,
    },
    cognitiveProfile: {
      visual_spatial: 90,
      pattern_recognition: 90,
      hyperfocus: 90,
      divergent_thinking: 75,
      big_picture: 95,
      detail_orientation: 85,
    },
    adhdIndicators: { inattention: 15, hyperactivity: 55 },
    description: 'Strategic genius who combined military innovation with administrative reform across Europe.',
    famousFor: 'Military campaigns, Napoleonic Code, empire building',
    quote: 'Impossible is a word to be found only in the dictionary of fools.',
    imageSymbol: '⚔️',
  },
  {
    id: 'mandela',
    name: 'Nelson Mandela',
    era: '1918-2013',
    field: 'Politics & Activism',
    estimatedIQ: 140,
    personalityProfile: {
      openness: 80,
      conscientiousness: 90,
      extraversion: 70,
      agreeableness: 85,
      neuroticism: 25,
    },
    cognitiveProfile: {
      visual_spatial: 55,
      pattern_recognition: 75,
      hyperfocus: 80,
      divergent_thinking: 70,
      big_picture: 95,
      detail_orientation: 70,
    },
    adhdIndicators: { inattention: 10, hyperactivity: 15 },
    description: 'Transformational leader who embodied patience, forgiveness, and unwavering moral vision.',
    famousFor: 'Anti-apartheid movement, reconciliation, Nobel Peace Prize',
    quote: 'It always seems impossible until it\'s done.',
    imageSymbol: '✊',
  },

  // Innovators & Entrepreneurs
  {
    id: 'jobs',
    name: 'Steve Jobs',
    era: '1955-2011',
    field: 'Technology',
    estimatedIQ: 140,
    personalityProfile: {
      openness: 90,
      conscientiousness: 80,
      extraversion: 65,
      agreeableness: 25,
      neuroticism: 60,
    },
    cognitiveProfile: {
      visual_spatial: 90,
      pattern_recognition: 85,
      hyperfocus: 95,
      divergent_thinking: 90,
      big_picture: 95,
      detail_orientation: 95,
    },
    adhdIndicators: { inattention: 40, hyperactivity: 50 },
    description: 'Visionary perfectionist who fused technology with art and created products people didn\'t know they needed.',
    famousFor: 'Apple, Macintosh, iPhone, Pixar',
    quote: 'Stay hungry, stay foolish.',
    imageSymbol: '📱',
  },
  {
    id: 'turing',
    name: 'Alan Turing',
    era: '1912-1954',
    field: 'Mathematics & Computing',
    estimatedIQ: 165,
    personalityProfile: {
      openness: 90,
      conscientiousness: 75,
      extraversion: 25,
      agreeableness: 55,
      neuroticism: 55,
    },
    cognitiveProfile: {
      visual_spatial: 80,
      pattern_recognition: 98,
      hyperfocus: 90,
      divergent_thinking: 85,
      big_picture: 90,
      detail_orientation: 85,
    },
    adhdIndicators: { inattention: 30, hyperactivity: 20 },
    description: 'Father of computer science who formalized computation and broke unbreakable codes.',
    famousFor: 'Turing machine, Enigma code-breaking, AI foundations',
    quote: 'Those who can imagine anything, can create the impossible.',
    imageSymbol: '💻',
  },

  // Additional diverse thinkers
  {
    id: 'hypatia',
    name: 'Hypatia of Alexandria',
    era: '360-415 AD',
    field: 'Mathematics & Philosophy',
    estimatedIQ: 155,
    personalityProfile: {
      openness: 90,
      conscientiousness: 85,
      extraversion: 60,
      agreeableness: 70,
      neuroticism: 30,
    },
    cognitiveProfile: {
      visual_spatial: 85,
      pattern_recognition: 95,
      hyperfocus: 80,
      divergent_thinking: 75,
      big_picture: 85,
      detail_orientation: 90,
    },
    adhdIndicators: { inattention: 15, hyperactivity: 15 },
    description: 'Ancient mathematician and philosopher who led intellectual life in late classical Alexandria.',
    famousFor: 'Mathematical commentaries, astronomical instruments, philosophy teaching',
    quote: 'Reserve your right to think, for even to think wrongly is better than not to think at all.',
    imageSymbol: '📐',
  },
  {
    id: 'ada',
    name: 'Ada Lovelace',
    era: '1815-1852',
    field: 'Mathematics & Computing',
    estimatedIQ: 155,
    personalityProfile: {
      openness: 95,
      conscientiousness: 70,
      extraversion: 55,
      agreeableness: 65,
      neuroticism: 50,
    },
    cognitiveProfile: {
      visual_spatial: 85,
      pattern_recognition: 90,
      hyperfocus: 75,
      divergent_thinking: 95,
      big_picture: 95,
      detail_orientation: 80,
    },
    adhdIndicators: { inattention: 35, hyperactivity: 30 },
    description: 'First computer programmer who saw the potential for machines beyond mere calculation.',
    famousFor: 'First algorithm, vision of computing potential',
    quote: 'The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.',
    imageSymbol: '🔢',
  },
];

// Calculate match score between user and historical thinker
export interface HistoricalMatch {
  thinker: HistoricalThinker;
  overallScore: number;
  iqMatch: number;
  personalityMatch: number;
  cognitiveMatch: number;
  adhdMatch: number;
  matchReasons: string[];
}

export const calculateHistoricalMatch = (
  userIQ: number | null,
  userPersonality: Record<PersonalityTrait, number> | null,
  userCognitive: Partial<Record<ThinkingDimension, number>> | null,
  userADHD: { inattention: number; hyperactivity: number } | null,
  thinker: HistoricalThinker
): HistoricalMatch => {
  let totalWeight = 0;
  let totalScore = 0;
  const matchReasons: string[] = [];

  // IQ Match (if available)
  let iqMatch = 0;
  if (userIQ !== null) {
    const iqDiff = Math.abs(userIQ - thinker.estimatedIQ);
    iqMatch = Math.max(0, 100 - iqDiff * 2); // Lose 2 points per IQ point difference
    totalScore += iqMatch * 0.25;
    totalWeight += 0.25;
    if (iqMatch > 80) {
      matchReasons.push(`Similar cognitive ability level (${thinker.estimatedIQ} IQ)`);
    }
  }

  // Personality Match
  let personalityMatch = 0;
  if (userPersonality !== null) {
    const traits: PersonalityTrait[] = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
    let personalityScore = 0;
    const strongMatches: string[] = [];
    
    traits.forEach(trait => {
      const diff = Math.abs(userPersonality[trait] - thinker.personalityProfile[trait]);
      const traitMatch = Math.max(0, 100 - diff);
      personalityScore += traitMatch;
      if (diff < 15) {
        strongMatches.push(trait);
      }
    });
    personalityMatch = personalityScore / traits.length;
    totalScore += personalityMatch * 0.35;
    totalWeight += 0.35;
    
    if (strongMatches.length >= 2) {
      matchReasons.push(`Share similar ${strongMatches.slice(0, 2).join(' and ')} traits`);
    }
  }

  // Cognitive Style Match
  let cognitiveMatch = 0;
  if (userCognitive !== null) {
    const dimensions = Object.keys(thinker.cognitiveProfile) as ThinkingDimension[];
    let cogScore = 0;
    let count = 0;
    const strongCogMatches: string[] = [];
    
    dimensions.forEach(dim => {
      if (userCognitive[dim] !== undefined && thinker.cognitiveProfile[dim] !== undefined) {
        const diff = Math.abs(userCognitive[dim]! - thinker.cognitiveProfile[dim]!);
        const dimMatch = Math.max(0, 100 - diff);
        cogScore += dimMatch;
        count++;
        if (diff < 15 && thinker.cognitiveProfile[dim]! > 75) {
          strongCogMatches.push(dim.replace('_', ' '));
        }
      }
    });
    
    if (count > 0) {
      cognitiveMatch = cogScore / count;
      totalScore += cognitiveMatch * 0.25;
      totalWeight += 0.25;
      if (strongCogMatches.length > 0) {
        matchReasons.push(`Strong ${strongCogMatches[0]} capacity like ${thinker.name}`);
      }
    }
  }

  // ADHD Pattern Match
  let adhdMatch = 0;
  if (userADHD !== null) {
    const inattDiff = Math.abs(userADHD.inattention - thinker.adhdIndicators.inattention);
    const hyperDiff = Math.abs(userADHD.hyperactivity - thinker.adhdIndicators.hyperactivity);
    adhdMatch = Math.max(0, 100 - (inattDiff + hyperDiff));
    totalScore += adhdMatch * 0.15;
    totalWeight += 0.15;
    
    if (adhdMatch > 70) {
      matchReasons.push('Similar attentional processing patterns');
    }
  }

  const overallScore = totalWeight > 0 ? totalScore / totalWeight : 0;

  return {
    thinker,
    overallScore,
    iqMatch,
    personalityMatch,
    cognitiveMatch,
    adhdMatch,
    matchReasons,
  };
};

export const findTopMatches = (
  userIQ: number | null,
  userPersonality: Record<PersonalityTrait, number> | null,
  userCognitive: Partial<Record<ThinkingDimension, number>> | null,
  userADHD: { inattention: number; hyperactivity: number } | null,
  count: number = 5
): HistoricalMatch[] => {
  const matches = historicalThinkers.map(thinker => 
    calculateHistoricalMatch(userIQ, userPersonality, userCognitive, userADHD, thinker)
  );
  
  return matches
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, count);
};
