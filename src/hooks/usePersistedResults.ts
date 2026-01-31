// Persists assessment results to localStorage to prevent data loss during premium upgrade flow
import { useState, useEffect, useCallback } from 'react';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';

const STORAGE_KEY = 'assessment_results';

export interface PersistedResults {
  iq: TestResults | null;
  personality: PersonalityResults | null;
  adhd: ADHDResults | null;
  cognitive: CognitiveStyleResults | null;
  iqAnswers: number[] | null;
  personalityAnswers: number[] | null;
  adhdAnswers: number[] | null;
  cognitiveAnswers: number[] | null;
  lastUpdated: number;
}

const DEFAULT_RESULTS: PersistedResults = {
  iq: null,
  personality: null,
  adhd: null,
  cognitive: null,
  iqAnswers: null,
  personalityAnswers: null,
  adhdAnswers: null,
  cognitiveAnswers: null,
  lastUpdated: 0,
};

export function usePersistedResults() {
  const [results, setResults] = useState<PersistedResults>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PersistedResults;
        // Check if data is less than 24 hours old
        if (Date.now() - parsed.lastUpdated < 24 * 60 * 60 * 1000) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_RESULTS;
  });

  // Save to localStorage whenever results change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    } catch {
      // Ignore storage errors
    }
  }, [results]);

  const setIQResults = useCallback((iq: TestResults, answers: number[]) => {
    setResults(prev => ({
      ...prev,
      iq,
      iqAnswers: answers,
      lastUpdated: Date.now(),
    }));
  }, []);

  const setPersonalityResults = useCallback((personality: PersonalityResults, answers: number[]) => {
    setResults(prev => ({
      ...prev,
      personality,
      personalityAnswers: answers,
      lastUpdated: Date.now(),
    }));
  }, []);

  const setADHDResults = useCallback((adhd: ADHDResults, answers: number[]) => {
    setResults(prev => ({
      ...prev,
      adhd,
      adhdAnswers: answers,
      lastUpdated: Date.now(),
    }));
  }, []);

  const setCognitiveResults = useCallback((cognitive: CognitiveStyleResults, answers: number[]) => {
    setResults(prev => ({
      ...prev,
      cognitive,
      cognitiveAnswers: answers,
      lastUpdated: Date.now(),
    }));
  }, []);

  const clearResults = useCallback(() => {
    setResults(DEFAULT_RESULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    results,
    setIQResults,
    setPersonalityResults,
    setADHDResults,
    setCognitiveResults,
    clearResults,
  };
}
