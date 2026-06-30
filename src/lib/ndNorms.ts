// Norm-referenced helpers for the Neurodivergent Mind module.
// Where validated population norms exist (ASRS, AQ-50, AQ-10) we use published mean/SD.
// For our own dimension scores we use modeled normal distributions clearly labeled as such.

// Abramowitz & Stegun 7.1.26 approximation of the standard normal CDF — accurate enough for percentile display.
export function normalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

export function zToPercentile(z: number): number {
  return Math.round(normalCdf(z) * 100);
}

export function scoreToPercentile(score: number, mean: number, sd: number): number {
  if (sd <= 0) return 50;
  const z = (score - mean) / sd;
  return Math.max(1, Math.min(99, zToPercentile(z)));
}

// === Norm distributions ===
// ASRS Part A: validation data (Kessler et al. 2005), 18,000 adult sample.
// Part A positive-symptom count (0..6); typical adult mean ~0.9, SD ~1.4.
export const NORMS = {
  asrsPartA: { mean: 0.9, sd: 1.4, max: 6 },
  asrsTotalPositive: { mean: 2.4, sd: 3.0, max: 18 },
  aq50: { mean: 16.4, sd: 6.3, max: 50 },   // Baron-Cohen 2001 general adult sample
  aq10: { mean: 2.8, sd: 1.7, max: 10 },    // Allison 2012
  // Modeled (label clearly in UI):
  cogDimensionPct: { mean: 50, sd: 18, max: 100 },
  dyslexiaRawCount: { mean: 3.0, sd: 2.5, max: 15 },
  dyscalculiaRawCount: { mean: 2.0, sd: 1.8, max: 10 },
  dyspraxiaRawCount: { mean: 2.2, sd: 1.9, max: 10 },
  sensoryPct: { mean: 35, sd: 18, max: 100 },
  rsdPct: { mean: 32, sd: 18, max: 100 },
} as const;

export type NormKey = keyof typeof NORMS;

export function percentileFor(key: NormKey, raw: number): number {
  const n = NORMS[key];
  return scoreToPercentile(raw, n.mean, n.sd);
}

export function zScoreFor(key: NormKey, raw: number): number {
  const n = NORMS[key];
  return (raw - n.mean) / n.sd;
}

// Tag for UI: whether the norm is from published validation data ("norm") or modeled here ("modeled")
export const NORM_SOURCE: Record<NormKey, 'norm' | 'modeled'> = {
  asrsPartA: 'norm',
  asrsTotalPositive: 'norm',
  aq50: 'norm',
  aq10: 'norm',
  cogDimensionPct: 'modeled',
  dyslexiaRawCount: 'modeled',
  dyscalculiaRawCount: 'modeled',
  dyspraxiaRawCount: 'modeled',
  sensoryPct: 'modeled',
  rsdPct: 'modeled',
};

export function percentileLabel(p: number): string {
  if (p >= 98) return 'Top 2% of adults';
  if (p >= 90) return `Higher than ${p}% of adults`;
  if (p >= 70) return `Higher than ${p}% of adults`;
  if (p >= 50) return `About average (${p}th percentile)`;
  if (p >= 30) return `Lower than ${100 - p}% of adults`;
  return `Bottom ${p}% of adults`;
}
