import { useCallback, useEffect, useState } from 'react';
import { AssessmentType } from '@/data/assessmentTypes';

// Optimal funnel order: warm-up with cognitive challenge, surface ND signals,
// then identity/personality, finish with depth/unconscious for synthesis.
export const MAP_MY_MIND_ORDER: AssessmentType[] = [
  'iq',
  'neurodivergent',
  'personality',
  'depth',
];

const STORAGE_KEY = 'mapMyMind:v1';

interface MapState {
  active: boolean;
  startedAt: number | null;
}

const defaultState: MapState = { active: false, startedAt: null };

function readState(): MapState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

function writeState(state: MapState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export interface MapMyMindStatus {
  active: boolean;
  completed: AssessmentType[];
  nextStep: AssessmentType | null;
  completedCount: number;
  totalSteps: number;
  isFinished: boolean;
  start: () => AssessmentType;
  stop: () => void;
  markComplete: (type: AssessmentType) => AssessmentType | null;
}

/**
 * Guides users through all 4 assessments in an optimal order.
 * `completedAssessments` is derived from the parent's persisted results
 * so we don't double-source state.
 */
export function useMapMyMind(completedAssessments: AssessmentType[]): MapMyMindStatus {
  const [state, setState] = useState<MapState>(() => readState());

  // Auto-activate if the user has completed at least one but not all 4
  // (treat them as already on the map).
  useEffect(() => {
    if (
      !state.active &&
      completedAssessments.length > 0 &&
      completedAssessments.length < MAP_MY_MIND_ORDER.length
    ) {
      const next = { active: true, startedAt: Date.now() };
      setState(next);
      writeState(next);
    }
  }, [completedAssessments.length, state.active]);

  const nextStep =
    MAP_MY_MIND_ORDER.find((t) => !completedAssessments.includes(t)) ?? null;

  const start = useCallback((): AssessmentType => {
    const next: MapState = { active: true, startedAt: Date.now() };
    setState(next);
    writeState(next);
    return (
      MAP_MY_MIND_ORDER.find((t) => !completedAssessments.includes(t)) ??
      MAP_MY_MIND_ORDER[0]
    );
  }, [completedAssessments]);

  const stop = useCallback(() => {
    const next: MapState = { active: false, startedAt: null };
    setState(next);
    writeState(next);
  }, []);

  const markComplete = useCallback(
    (type: AssessmentType): AssessmentType | null => {
      const merged = Array.from(new Set([...completedAssessments, type]));
      return MAP_MY_MIND_ORDER.find((t) => !merged.includes(t)) ?? null;
    },
    [completedAssessments],
  );

  return {
    active: state.active,
    completed: completedAssessments,
    nextStep,
    completedCount: completedAssessments.length,
    totalSteps: MAP_MY_MIND_ORDER.length,
    isFinished: completedAssessments.length >= MAP_MY_MIND_ORDER.length,
    start,
    stop,
    markComplete,
  };
}
