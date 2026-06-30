import { useEffect, useRef, useState } from 'react';

const PREFIX = 'hdit:quiz-progress:';

export interface QuizProgressState<A> {
  currentIndex: number;
  answers: A;
}

/**
 * Persists in-progress quiz state (index + answers) to localStorage so users
 * can pause a quiz, leave the page, and resume where they left off.
 *
 * Pass a stable `key` per quiz (e.g. "personality", "adhd").
 * Call `clear()` once the quiz is submitted/completed.
 */
export function useQuizProgress<A>(
  key: string,
  initial: QuizProgressState<A>,
) {
  const storageKey = PREFIX + key;
  const [state, setState] = useState<QuizProgressState<A>>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return initial;
      const parsed = JSON.parse(raw) as QuizProgressState<A>;
      if (typeof parsed?.currentIndex === 'number' && parsed.answers !== undefined) {
        return parsed;
      }
    } catch {
      /* ignore */
    }
    return initial;
  });

  const cleared = useRef(false);

  useEffect(() => {
    if (cleared.current || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state, storageKey]);

  const clear = () => {
    cleared.current = true;
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  };

  return { state, setState, clear };
}

export function hasSavedQuizProgress(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return !!window.localStorage.getItem(PREFIX + key);
  } catch {
    return false;
  }
}
