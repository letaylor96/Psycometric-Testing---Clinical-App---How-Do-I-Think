// Career Match Intelligence Module
// Leverages cognitive profiles, Lumosity research, and Holland Codes to recommend optimal professions

import { TestResults, CognitiveCategory } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';

export interface CareerMatch {
  title: string;
  category: string;
  matchScore: number;
  salaryRange: string;
  growthOutlook: 'high' | 'moderate' | 'stable';
  cognitiveAlignment: string[];
  personalityFit: string[];
  keyStrengths: string[];
  dailyActivities: string[];
  famousExamples?: string[];
}

export interface CareerMatchContext {
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
}

// Holland Code (RIASEC) career categories
type HollandCode = 'realistic' | 'investigative' | 'artistic' | 'social' | 'enterprising' | 'conventional';

// Comprehensive career database with cognitive requirements
const careerDatabase: Array<{
  title: string;
  category: string;
  hollandCode: HollandCode[];
  salaryRange: string;
  growthOutlook: 'high' | 'moderate' | 'stable';
  cognitiveRequirements: {
    minIQ?: number;
    primaryCategories: CognitiveCategory[];
    divergentTraits?: string[];
  };
  personalityTraits: {
    trait: 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';
    direction: 'high' | 'low' | 'moderate';
    weight: number;
  }[];
  adhdFriendly?: boolean;
  dailyActivities: string[];
  famousExamples?: string[];
}> = [
  // Technology & Innovation
  {
    title: 'Software Architect',
    category: 'Technology',
    hollandCode: ['investigative', 'realistic'],
    salaryRange: '$150K - $250K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 120,
      primaryCategories: ['matrix', 'abstract', 'spatial'],
      divergentTraits: ['systems_thinking', 'pattern_recognition']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.8 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.7 },
      { trait: 'extraversion', direction: 'low', weight: 0.3 }
    ],
    dailyActivities: ['Designing system architectures', 'Code review', 'Technical documentation', 'Cross-team collaboration'],
    famousExamples: ['Linus Torvalds', 'Margaret Hamilton']
  },
  {
    title: 'Data Scientist',
    category: 'Technology',
    hollandCode: ['investigative', 'conventional'],
    salaryRange: '$120K - $200K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 115,
      primaryCategories: ['number_sequence', 'matrix', 'abstract'],
      divergentTraits: ['pattern_recognition', 'analytical']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.7 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.8 },
      { trait: 'neuroticism', direction: 'low', weight: 0.4 }
    ],
    dailyActivities: ['Statistical analysis', 'Machine learning models', 'Data visualization', 'Presenting insights'],
    famousExamples: ['Nate Silver', 'DJ Patil']
  },
  {
    title: 'UX/Product Designer',
    category: 'Design',
    hollandCode: ['artistic', 'investigative'],
    salaryRange: '$90K - $160K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 105,
      primaryCategories: ['spatial', 'shape_pattern', 'abstract'],
      divergentTraits: ['creative_ideation', 'empathy']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.9 },
      { trait: 'agreeableness', direction: 'high', weight: 0.6 },
      { trait: 'extraversion', direction: 'moderate', weight: 0.4 }
    ],
    adhdFriendly: true,
    dailyActivities: ['User research', 'Prototyping', 'Design systems', 'Usability testing'],
    famousExamples: ['Jony Ive', 'Don Norman']
  },
  {
    title: 'AI/ML Engineer',
    category: 'Technology',
    hollandCode: ['investigative', 'realistic'],
    salaryRange: '$140K - $280K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 125,
      primaryCategories: ['matrix', 'number_sequence', 'abstract'],
      divergentTraits: ['systems_thinking', 'pattern_recognition']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.8 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.6 },
      { trait: 'neuroticism', direction: 'low', weight: 0.5 }
    ],
    dailyActivities: ['Model development', 'Algorithm optimization', 'Research papers', 'Experimentation'],
    famousExamples: ['Andrej Karpathy', 'Fei-Fei Li']
  },

  // Business & Leadership
  {
    title: 'Management Consultant',
    category: 'Business',
    hollandCode: ['enterprising', 'investigative'],
    salaryRange: '$100K - $300K',
    growthOutlook: 'moderate',
    cognitiveRequirements: {
      minIQ: 115,
      primaryCategories: ['abstract', 'matrix', 'number_sequence'],
      divergentTraits: ['strategic_thinking', 'persuasion']
    },
    personalityTraits: [
      { trait: 'extraversion', direction: 'high', weight: 0.7 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.8 },
      { trait: 'openness', direction: 'high', weight: 0.6 }
    ],
    dailyActivities: ['Client presentations', 'Data analysis', 'Strategy development', 'Team leadership'],
    famousExamples: ['Marvin Bower', 'Tom Peters']
  },
  {
    title: 'Product Manager',
    category: 'Business',
    hollandCode: ['enterprising', 'investigative', 'artistic'],
    salaryRange: '$110K - $200K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 110,
      primaryCategories: ['abstract', 'spatial', 'matrix'],
      divergentTraits: ['systems_thinking', 'creative_ideation']
    },
    personalityTraits: [
      { trait: 'extraversion', direction: 'high', weight: 0.6 },
      { trait: 'openness', direction: 'high', weight: 0.7 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.7 }
    ],
    adhdFriendly: true,
    dailyActivities: ['Roadmap planning', 'Stakeholder management', 'User story writing', 'Sprint planning'],
    famousExamples: ['Sundar Pichai', 'Marissa Mayer']
  },
  {
    title: 'Venture Capitalist',
    category: 'Finance',
    hollandCode: ['enterprising', 'investigative'],
    salaryRange: '$200K - $1M+',
    growthOutlook: 'moderate',
    cognitiveRequirements: {
      minIQ: 120,
      primaryCategories: ['abstract', 'number_sequence', 'matrix'],
      divergentTraits: ['pattern_recognition', 'risk_assessment']
    },
    personalityTraits: [
      { trait: 'extraversion', direction: 'high', weight: 0.7 },
      { trait: 'openness', direction: 'high', weight: 0.8 },
      { trait: 'neuroticism', direction: 'low', weight: 0.6 }
    ],
    dailyActivities: ['Deal sourcing', 'Due diligence', 'Portfolio management', 'Board meetings'],
    famousExamples: ['Marc Andreessen', 'Mary Meeker']
  },
  {
    title: 'Startup Founder',
    category: 'Entrepreneurship',
    hollandCode: ['enterprising', 'artistic'],
    salaryRange: '$0 - $10M+',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 110,
      primaryCategories: ['abstract', 'matrix', 'spatial'],
      divergentTraits: ['creative_ideation', 'risk_tolerance']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.9 },
      { trait: 'extraversion', direction: 'high', weight: 0.6 },
      { trait: 'neuroticism', direction: 'low', weight: 0.7 },
      { trait: 'conscientiousness', direction: 'moderate', weight: 0.5 }
    ],
    adhdFriendly: true,
    dailyActivities: ['Vision setting', 'Fundraising', 'Team building', 'Product development'],
    famousExamples: ['Elon Musk', 'Sara Blakely']
  },

  // Science & Research
  {
    title: 'Research Scientist',
    category: 'Science',
    hollandCode: ['investigative'],
    salaryRange: '$80K - $180K',
    growthOutlook: 'moderate',
    cognitiveRequirements: {
      minIQ: 125,
      primaryCategories: ['number_sequence', 'matrix', 'abstract'],
      divergentTraits: ['analytical', 'pattern_recognition']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.9 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.7 },
      { trait: 'extraversion', direction: 'low', weight: 0.4 }
    ],
    dailyActivities: ['Experimental design', 'Data analysis', 'Paper writing', 'Grant applications'],
    famousExamples: ['Marie Curie', 'Richard Feynman']
  },
  {
    title: 'Neuroscientist',
    category: 'Science',
    hollandCode: ['investigative', 'social'],
    salaryRange: '$70K - $150K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 120,
      primaryCategories: ['abstract', 'matrix', 'spatial'],
      divergentTraits: ['systems_thinking', 'analytical']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.9 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.8 },
      { trait: 'agreeableness', direction: 'moderate', weight: 0.5 }
    ],
    dailyActivities: ['Brain imaging studies', 'Clinical research', 'Data interpretation', 'Academic publishing'],
    famousExamples: ['Oliver Sacks', 'Lisa Feldman Barrett']
  },
  {
    title: 'Quantitative Analyst',
    category: 'Finance',
    hollandCode: ['investigative', 'conventional'],
    salaryRange: '$150K - $400K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 130,
      primaryCategories: ['number_sequence', 'matrix', 'abstract'],
      divergentTraits: ['pattern_recognition', 'analytical']
    },
    personalityTraits: [
      { trait: 'conscientiousness', direction: 'high', weight: 0.9 },
      { trait: 'openness', direction: 'moderate', weight: 0.5 },
      { trait: 'neuroticism', direction: 'low', weight: 0.6 }
    ],
    dailyActivities: ['Algorithm development', 'Risk modeling', 'Backtesting', 'Market analysis'],
    famousExamples: ['Jim Simons', 'Emanuel Derman']
  },

  // Creative & Arts
  {
    title: 'Creative Director',
    category: 'Creative',
    hollandCode: ['artistic', 'enterprising'],
    salaryRange: '$100K - $200K',
    growthOutlook: 'moderate',
    cognitiveRequirements: {
      minIQ: 105,
      primaryCategories: ['spatial', 'shape_pattern', 'abstract'],
      divergentTraits: ['creative_ideation', 'persuasion']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.95 },
      { trait: 'extraversion', direction: 'high', weight: 0.6 },
      { trait: 'agreeableness', direction: 'moderate', weight: 0.4 }
    ],
    adhdFriendly: true,
    dailyActivities: ['Campaign conceptualization', 'Team management', 'Client pitches', 'Brand strategy'],
    famousExamples: ['David Ogilvy', 'Lee Clow']
  },
  {
    title: 'Game Designer',
    category: 'Gaming',
    hollandCode: ['artistic', 'investigative'],
    salaryRange: '$70K - $150K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 110,
      primaryCategories: ['spatial', 'shape_pattern', 'abstract'],
      divergentTraits: ['creative_ideation', 'systems_thinking']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.9 },
      { trait: 'extraversion', direction: 'moderate', weight: 0.4 },
      { trait: 'conscientiousness', direction: 'moderate', weight: 0.5 }
    ],
    adhdFriendly: true,
    dailyActivities: ['Mechanics design', 'Level prototyping', 'Playtesting', 'Narrative development'],
    famousExamples: ['Shigeru Miyamoto', 'Hideo Kojima']
  },
  {
    title: 'Film Director',
    category: 'Entertainment',
    hollandCode: ['artistic', 'enterprising'],
    salaryRange: '$50K - $500K+',
    growthOutlook: 'stable',
    cognitiveRequirements: {
      minIQ: 105,
      primaryCategories: ['spatial', 'shape_pattern', 'abstract'],
      divergentTraits: ['creative_ideation', 'vision']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.95 },
      { trait: 'extraversion', direction: 'high', weight: 0.6 },
      { trait: 'neuroticism', direction: 'moderate', weight: 0.4 }
    ],
    adhdFriendly: true,
    dailyActivities: ['Shot composition', 'Actor direction', 'Story editing', 'Creative vision'],
    famousExamples: ['Christopher Nolan', 'Greta Gerwig']
  },

  // Healthcare
  {
    title: 'Physician (Specialist)',
    category: 'Healthcare',
    hollandCode: ['investigative', 'social'],
    salaryRange: '$200K - $500K',
    growthOutlook: 'stable',
    cognitiveRequirements: {
      minIQ: 120,
      primaryCategories: ['abstract', 'matrix', 'number_sequence'],
      divergentTraits: ['analytical', 'pattern_recognition']
    },
    personalityTraits: [
      { trait: 'conscientiousness', direction: 'high', weight: 0.9 },
      { trait: 'agreeableness', direction: 'high', weight: 0.7 },
      { trait: 'neuroticism', direction: 'low', weight: 0.6 }
    ],
    dailyActivities: ['Patient diagnosis', 'Treatment planning', 'Medical procedures', 'Research'],
    famousExamples: ['Atul Gawande', 'Sanjay Gupta']
  },
  {
    title: 'Clinical Psychologist',
    category: 'Healthcare',
    hollandCode: ['social', 'investigative'],
    salaryRange: '$80K - $150K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 115,
      primaryCategories: ['abstract', 'matrix'],
      divergentTraits: ['empathy', 'analytical']
    },
    personalityTraits: [
      { trait: 'agreeableness', direction: 'high', weight: 0.8 },
      { trait: 'openness', direction: 'high', weight: 0.7 },
      { trait: 'neuroticism', direction: 'low', weight: 0.6 }
    ],
    dailyActivities: ['Therapy sessions', 'Assessment', 'Treatment planning', 'Case notes'],
    famousExamples: ['Carl Rogers', 'Brené Brown']
  },

  // Law & Policy
  {
    title: 'Corporate Lawyer',
    category: 'Legal',
    hollandCode: ['enterprising', 'conventional'],
    salaryRange: '$150K - $500K',
    growthOutlook: 'stable',
    cognitiveRequirements: {
      minIQ: 120,
      primaryCategories: ['abstract', 'matrix', 'number_sequence'],
      divergentTraits: ['analytical', 'persuasion']
    },
    personalityTraits: [
      { trait: 'conscientiousness', direction: 'high', weight: 0.9 },
      { trait: 'extraversion', direction: 'moderate', weight: 0.5 },
      { trait: 'agreeableness', direction: 'low', weight: 0.4 }
    ],
    dailyActivities: ['Contract review', 'Legal research', 'Client advisory', 'Negotiations'],
    famousExamples: ['Ruth Bader Ginsburg', 'Thurgood Marshall']
  },

  // Education & Training
  {
    title: 'University Professor',
    category: 'Education',
    hollandCode: ['investigative', 'social'],
    salaryRange: '$70K - $180K',
    growthOutlook: 'stable',
    cognitiveRequirements: {
      minIQ: 120,
      primaryCategories: ['abstract', 'matrix', 'number_sequence'],
      divergentTraits: ['analytical', 'teaching']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.9 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.7 },
      { trait: 'extraversion', direction: 'moderate', weight: 0.5 }
    ],
    dailyActivities: ['Lectures', 'Research', 'Publishing', 'Student mentorship'],
    famousExamples: ['Steven Pinker', 'Angela Duckworth']
  },

  // Architecture & Engineering
  {
    title: 'Architect',
    category: 'Architecture',
    hollandCode: ['artistic', 'realistic'],
    salaryRange: '$70K - $150K',
    growthOutlook: 'moderate',
    cognitiveRequirements: {
      minIQ: 115,
      primaryCategories: ['spatial', 'shape_pattern', 'abstract'],
      divergentTraits: ['creative_ideation', 'systems_thinking']
    },
    personalityTraits: [
      { trait: 'openness', direction: 'high', weight: 0.9 },
      { trait: 'conscientiousness', direction: 'high', weight: 0.7 },
      { trait: 'extraversion', direction: 'moderate', weight: 0.4 }
    ],
    dailyActivities: ['Design development', 'Client meetings', '3D modeling', 'Site visits'],
    famousExamples: ['Zaha Hadid', 'Frank Gehry']
  },
  {
    title: 'Aerospace Engineer',
    category: 'Engineering',
    hollandCode: ['realistic', 'investigative'],
    salaryRange: '$90K - $180K',
    growthOutlook: 'high',
    cognitiveRequirements: {
      minIQ: 125,
      primaryCategories: ['spatial', 'number_sequence', 'matrix'],
      divergentTraits: ['systems_thinking', 'analytical']
    },
    personalityTraits: [
      { trait: 'conscientiousness', direction: 'high', weight: 0.9 },
      { trait: 'openness', direction: 'high', weight: 0.6 },
      { trait: 'neuroticism', direction: 'low', weight: 0.5 }
    ],
    dailyActivities: ['Systems design', 'Simulation testing', 'Technical documentation', 'Team collaboration'],
    famousExamples: ['Kelly Johnson', 'Gwynne Shotwell']
  }
];

// Calculate match score between user profile and career
const calculateCareerMatchScore = (
  career: typeof careerDatabase[0],
  context: CareerMatchContext
): { score: number; cognitiveAlignment: string[]; personalityFit: string[]; keyStrengths: string[] } => {
  let score = 50; // Base score
  const cognitiveAlignment: string[] = [];
  const personalityFit: string[] = [];
  const keyStrengths: string[] = [];

  // IQ-based scoring (weighted heavily for cognitive careers)
  if (context.iqResults) {
    const iq = context.iqResults.iq;
    const minIQ = career.cognitiveRequirements.minIQ || 100;
    
    if (iq >= minIQ + 15) {
      score += 15;
      cognitiveAlignment.push('Exceptional cognitive match');
    } else if (iq >= minIQ) {
      score += 10;
      cognitiveAlignment.push('Strong cognitive fit');
    } else if (iq >= minIQ - 10) {
      score += 3;
    } else {
      score -= 10;
    }

    // Category alignment (Lumosity-style cognitive domain matching)
    const primaryCategories = career.cognitiveRequirements.primaryCategories;
    const userCategoryScores = context.iqResults.categoryScores;
    
    let categoryMatches = 0;
    primaryCategories.forEach(category => {
      const userScore = userCategoryScores.find(s => s.category === category);
      if (userScore && userScore.percentage >= 60) {
        categoryMatches++;
        const label = category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        cognitiveAlignment.push(`Strong ${label}`);
      }
    });
    
    score += categoryMatches * 8;

    // Primary strength bonus
    if (primaryCategories.includes(context.iqResults.primaryStrength)) {
      score += 10;
      keyStrengths.push(`Primary strength aligns with role`);
    }

    // Divergent thinking profile
    const divergentProfile = context.iqResults.divergentProfile;
    if (career.cognitiveRequirements.divergentTraits) {
      divergentProfile.forEach(d => {
        if (d.percentage >= 60) {
          score += 3;
        }
      });
    }
  }

  // Personality-based scoring (Big Five alignment)
  if (context.personalityResults) {
    const personality = context.personalityResults.scores;
    
    career.personalityTraits.forEach(trait => {
      const userScore = personality[trait.trait];
      const weight = trait.weight;
      
      if (trait.direction === 'high' && userScore >= 60) {
        score += Math.round(8 * weight);
        personalityFit.push(`High ${trait.trait.charAt(0).toUpperCase() + trait.trait.slice(1)} matches role`);
      } else if (trait.direction === 'low' && userScore <= 40) {
        score += Math.round(8 * weight);
        personalityFit.push(`${trait.trait.charAt(0).toUpperCase() + trait.trait.slice(1)} level optimal`);
      } else if (trait.direction === 'moderate' && userScore >= 35 && userScore <= 65) {
        score += Math.round(5 * weight);
      } else {
        score -= Math.round(3 * weight);
      }
    });

    // Leadership archetype bonus
    if (context.personalityResults.archetype.strengths) {
      const leadershipKeywords = ['strategic', 'vision', 'influence', 'innovation', 'analysis'];
      context.personalityResults.archetype.strengths.forEach(strength => {
        if (leadershipKeywords.some(kw => strength.toLowerCase().includes(kw))) {
          keyStrengths.push(strength);
        }
      });
    }
  }

  // ADHD considerations
  if (context.adhdResults) {
    if (context.adhdResults.likelihood === 'high' || context.adhdResults.likelihood === 'moderate') {
      if (career.adhdFriendly) {
        score += 8;
        keyStrengths.push('ADHD-friendly environment');
      } else {
        score -= 3;
      }
    }
  }

  // Cognitive style considerations
  if (context.cognitiveStyleResults) {
    const cogStyle = context.cognitiveStyleResults;
    
    // Hyperfocus advantage for deep work roles
    const hyperfocus = cogStyle.dimensionScores.find(d => d.dimension === 'hyperfocus');
    if (hyperfocus && hyperfocus.percentage >= 60) {
      if (['Research Scientist', 'Software Architect', 'AI/ML Engineer', 'Quantitative Analyst'].includes(career.title)) {
        score += 6;
        keyStrengths.push('Hyperfocus suits deep work');
      }
    }

    // Divergent thinking for creative roles
    const divergent = cogStyle.dimensionScores.find(d => d.dimension === 'divergent_thinking');
    if (divergent && divergent.percentage >= 60) {
      if (career.hollandCode.includes('artistic')) {
        score += 6;
        keyStrengths.push('Creative thinking strength');
      }
    }

    // Processing style alignment
    if (cogStyle.processingStyle === 'parallel' && career.adhdFriendly) {
      score += 4;
    }
  }

  // Normalize score to 0-100
  score = Math.max(0, Math.min(100, score));

  return { score, cognitiveAlignment, personalityFit, keyStrengths };
};

// Main function to generate career recommendations
export const generateCareerRecommendations = (context: CareerMatchContext): CareerMatch[] => {
  const matches: CareerMatch[] = [];

  careerDatabase.forEach(career => {
    const { score, cognitiveAlignment, personalityFit, keyStrengths } = calculateCareerMatchScore(career, context);
    
    matches.push({
      title: career.title,
      category: career.category,
      matchScore: Math.round(score),
      salaryRange: career.salaryRange,
      growthOutlook: career.growthOutlook,
      cognitiveAlignment: cognitiveAlignment.slice(0, 3),
      personalityFit: personalityFit.slice(0, 3),
      keyStrengths: keyStrengths.slice(0, 4),
      dailyActivities: career.dailyActivities,
      famousExamples: career.famousExamples
    });
  });

  // Sort by match score descending
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return matches;
};

// Get top career matches (for premium users)
export const getTopCareerMatches = (context: CareerMatchContext, limit: number = 5): CareerMatch[] => {
  const allMatches = generateCareerRecommendations(context);
  return allMatches.slice(0, limit);
};

// Get career category breakdown
export const getCareerCategoryBreakdown = (context: CareerMatchContext): Record<string, number> => {
  const matches = generateCareerRecommendations(context);
  const categoryScores: Record<string, number[]> = {};
  
  matches.forEach(match => {
    if (!categoryScores[match.category]) {
      categoryScores[match.category] = [];
    }
    categoryScores[match.category].push(match.matchScore);
  });

  const result: Record<string, number> = {};
  Object.entries(categoryScores).forEach(([category, scores]) => {
    result[category] = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  });

  return result;
};
