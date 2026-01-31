// Question Variant System
// Provides unique test experiences across multiple attempts while maintaining progression

export interface QuestionVariant<T> {
  base: T;
  variants: T[]; // 2 additional variants (total 3 options per question slot)
}

/**
 * Selects a random variant for each question position
 * @param variants Array of question variants
 * @returns Array of selected questions (one per position)
 */
export function selectRandomVariants<T>(variants: QuestionVariant<T>[]): T[] {
  return variants.map(v => {
    const allOptions = [v.base, ...v.variants];
    const randomIndex = Math.floor(Math.random() * allOptions.length);
    return allOptions[randomIndex];
  });
}

/**
 * Generates a session seed for reproducible randomization within a session
 */
export function generateSessionSeed(): number {
  return Math.floor(Math.random() * 1000000);
}

/**
 * Seeded random selection for reproducible variant selection
 */
export function selectVariantsWithSeed<T>(variants: QuestionVariant<T>[], seed: number): T[] {
  let currentSeed = seed;
  
  const seededRandom = () => {
    currentSeed = (currentSeed * 1103515245 + 12345) % 2147483648;
    return currentSeed / 2147483648;
  };
  
  return variants.map(v => {
    const allOptions = [v.base, ...v.variants];
    const randomIndex = Math.floor(seededRandom() * allOptions.length);
    return allOptions[randomIndex];
  });
}
