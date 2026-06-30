// Composite Neurodivergent Index (0-100).
// Weighted z-score blend across the modules a user has completed; weights for
// skipped modules are redistributed across completed ones.

import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { AQResults } from '@/data/autismQuestions';
import { AQ10Results } from '@/data/aq10Questions';
import { DyslexiaResults } from '@/data/dyslexiaQuestions';
import { DyscalculiaResults } from '@/data/dyscalculiaQuestions';
import { DyspraxiaResults } from '@/data/dyspraxiaQuestions';
import { SensoryRsdResults } from '@/data/sensoryRsdQuestions';
import { normalCdf, zScoreFor } from './ndNorms';

export type NDModuleKey =
  | 'adhd'
  | 'cognitiveStyle'
  | 'autism'
  | 'dyslexia'
  | 'dyscalculia'
  | 'dyspraxia'
  | 'sensoryRsd';

export interface NDCompositeInput {
  adhd?: ADHDResults | null;
  cognitiveStyle?: CognitiveStyleResults | null;
  autism?: AQResults | null;
  autismShort?: AQ10Results | null;
  dyslexia?: DyslexiaResults | null;
  dyscalculia?: DyscalculiaResults | null;
  dyspraxia?: DyspraxiaResults | null;
  sensoryRsd?: SensoryRsdResults | null;
}

export type NDBand = 'typical' | 'emerging' | 'pronounced' | 'pervasive';

export interface NDComposite {
  index: number;        // 0-100
  percentile: number;   // 0-100
  band: NDBand;
  bandLabel: string;
  bandDescription: string;
  includedModules: NDModuleKey[];
  weights: Record<NDModuleKey, number>;
  contributions: Array<{ module: NDModuleKey; z: number; weight: number }>;
}

const BASE_WEIGHTS: Record<NDModuleKey, number> = {
  adhd: 0.35,
  autism: 0.25,
  cognitiveStyle: 0.20,
  dyslexia: 0.08,
  dyscalculia: 0.06,
  dyspraxia: 0.03,
  sensoryRsd: 0.03,
};

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function calculateNDComposite(input: NDCompositeInput): NDComposite {
  const contributions: Array<{ module: NDModuleKey; z: number; weight: number }> = [];

  if (input.adhd) {
    // Use total positive symptoms — captures both Part A + B richer than Part A alone.
    const z = zScoreFor('asrsTotalPositive', input.adhd.partAScore + input.adhd.partBPositiveCount);
    contributions.push({ module: 'adhd', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.adhd });
  }
  if (input.autism) {
    const z = zScoreFor('aq50', input.autism.totalScore);
    contributions.push({ module: 'autism', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.autism });
  } else if (input.autismShort) {
    const z = zScoreFor('aq10', input.autismShort.totalScore);
    contributions.push({ module: 'autism', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.autism });
  }
  if (input.cognitiveStyle) {
    // Pick the most neurodivergent-flavored dimensions, take their max
    const dims = input.cognitiveStyle.dimensionScores;
    const target = dims.filter(d =>
      d.dimension === 'hyperfocus' ||
      d.dimension === 'divergent_thinking' ||
      d.dimension === 'pattern_recognition'
    );
    const top = target.reduce((m, d) => Math.max(m, d.percentage), 0);
    const z = zScoreFor('cogDimensionPct', top);
    contributions.push({ module: 'cognitiveStyle', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.cognitiveStyle });
  }
  if (input.dyslexia) {
    const z = zScoreFor('dyslexiaRawCount', input.dyslexia.rawCount);
    contributions.push({ module: 'dyslexia', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.dyslexia });
  }
  if (input.dyscalculia) {
    const z = zScoreFor('dyscalculiaRawCount', input.dyscalculia.rawCount);
    contributions.push({ module: 'dyscalculia', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.dyscalculia });
  }
  if (input.dyspraxia) {
    const z = zScoreFor('dyspraxiaRawCount', input.dyspraxia.rawCount);
    contributions.push({ module: 'dyspraxia', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.dyspraxia });
  }
  if (input.sensoryRsd) {
    const combined = Math.max(input.sensoryRsd.sensoryPercent, input.sensoryRsd.rsdPercent);
    const z = zScoreFor('sensoryPct', combined);
    contributions.push({ module: 'sensoryRsd', z: clamp(z, -3, 4), weight: BASE_WEIGHTS.sensoryRsd });
  }

  // Redistribute weights so completed modules sum to 1
  const totalWeight = contributions.reduce((s, c) => s + c.weight, 0) || 1;
  contributions.forEach((c) => (c.weight = c.weight / totalWeight));

  // Weighted blended z; map through normal CDF to a 0-100 index
  const blendedZ = contributions.reduce((s, c) => s + c.z * c.weight, 0);
  const cdf = normalCdf(blendedZ);
  const index = Math.round(cdf * 100);
  const percentile = index; // index IS the percentile by construction

  const includedModules = contributions.map((c) => c.module);
  const weights: Record<NDModuleKey, number> = {
    adhd: 0, cognitiveStyle: 0, autism: 0, dyslexia: 0,
    dyscalculia: 0, dyspraxia: 0, sensoryRsd: 0,
  };
  contributions.forEach((c) => { weights[c.module] = c.weight; });

  let band: NDBand;
  let bandLabel: string;
  let bandDescription: string;

  if (index >= 80) {
    band = 'pervasive';
    bandLabel = 'Pervasive signal';
    bandDescription = 'A strong cluster of neurodivergent indicators across multiple domains. Professional evaluation is likely to be informative.';
  } else if (index >= 60) {
    band = 'pronounced';
    bandLabel = 'Pronounced signal';
    bandDescription = 'Clear neurodivergent traits across at least one domain. Worth professional follow-up if these traits affect daily life.';
  } else if (index >= 40) {
    band = 'emerging';
    bandLabel = 'Emerging signal';
    bandDescription = 'Some neurodivergent traits above the typical range. Useful to understand even without seeking formal diagnosis.';
  } else {
    band = 'typical';
    bandLabel = 'Typical range';
    bandDescription = 'Your responses fall within the range most common in the general adult population.';
  }

  return {
    index,
    percentile,
    band,
    bandLabel,
    bandDescription,
    includedModules,
    weights,
    contributions,
  };
}
