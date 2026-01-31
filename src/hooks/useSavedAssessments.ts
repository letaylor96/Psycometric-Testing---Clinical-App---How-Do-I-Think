// Premium feature: Save and load assessment results from the database
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { AnalysisFramework, DepthPsychologyResults } from '@/data/depthPsychologyQuestions';
import { Json } from '@/integrations/supabase/types';

export type AssessmentTypeKey = 'iq' | 'personality' | 'neurodivergent' | 'depth';

export interface SavedAssessment {
  id: string;
  user_id: string;
  assessment_type: AssessmentTypeKey;
  name: string | null;
  answers: Json; // JSON - structure varies by assessment type
  results: Json | null; // JSON - calculated results
  framework: string | null; // For depth psychology
  created_at: string;
  updated_at: string;
}

export interface SaveAssessmentParams {
  type: AssessmentTypeKey;
  name?: string;
  answers: Json;
  results: Json;
  framework?: AnalysisFramework;
}

export interface IQSavedData {
  answers: number[];
  results: TestResults;
}

export interface PersonalitySavedData {
  answers: number[];
  results: PersonalityResults;
}

export interface NeurodivergentSavedData {
  cognitiveAnswers: number[];
  adhdAnswers: number[];
  cognitiveResults: CognitiveStyleResults;
  adhdResults: ADHDResults;
}

export interface DepthSavedData {
  answers: { questionId: number; answer: string }[];
  results: DepthPsychologyResults;
  framework: AnalysisFramework;
}

export function useSavedAssessments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedAssessments, setSavedAssessments] = useState<SavedAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch all saved assessments for the current user
  const fetchSavedAssessments = useCallback(async () => {
    if (!user) {
      setSavedAssessments([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedAssessments((data as SavedAssessment[]) || []);
    } catch (err) {
      console.error('Error fetching saved assessments:', err);
      toast({
        title: 'Failed to load saved assessments',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Fetch on mount and when user changes
  useEffect(() => {
    fetchSavedAssessments();
  }, [fetchSavedAssessments]);

  // Save a new assessment
  const saveAssessment = useCallback(async (params: SaveAssessmentParams): Promise<SavedAssessment | null> => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save your assessment results.',
        variant: 'destructive',
      });
      return null;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('saved_assessments')
        .insert({
          user_id: user.id,
          assessment_type: params.type,
          name: params.name || null,
          answers: params.answers,
          results: params.results,
          framework: params.framework || null,
        })
        .select()
        .single();

      if (error) throw error;

      const saved = data as SavedAssessment;
      setSavedAssessments(prev => [saved, ...prev]);
      
      toast({
        title: 'Assessment saved',
        description: 'Your results have been saved for future reference.',
      });

      return saved;
    } catch (err) {
      console.error('Error saving assessment:', err);
      toast({
        title: 'Failed to save assessment',
        description: 'Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [user, toast]);

  // Update an existing assessment (e.g., add more answers)
  const updateAssessment = useCallback(async (
    id: string, 
    updates: { name?: string; answers?: Json; results?: Json; framework?: string }
  ): Promise<boolean> => {
    if (!user) return false;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('saved_assessments')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setSavedAssessments(prev => 
        prev.map(a => a.id === id ? { ...a, ...updates, updated_at: new Date().toISOString() } : a)
      );

      toast({
        title: 'Assessment updated',
        description: 'Your changes have been saved.',
      });

      return true;
    } catch (err) {
      console.error('Error updating assessment:', err);
      toast({
        title: 'Failed to update assessment',
        description: 'Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [user, toast]);

  // Delete a saved assessment
  const deleteAssessment = useCallback(async (id: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_assessments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setSavedAssessments(prev => prev.filter(a => a.id !== id));
      
      toast({
        title: 'Assessment deleted',
        description: 'The saved assessment has been removed.',
      });

      return true;
    } catch (err) {
      console.error('Error deleting assessment:', err);
      toast({
        title: 'Failed to delete assessment',
        description: 'Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  }, [user, toast]);

  // Get assessments by type
  const getAssessmentsByType = useCallback((type: AssessmentTypeKey) => {
    return savedAssessments.filter(a => a.assessment_type === type);
  }, [savedAssessments]);

  // Get the most recent assessment of a type
  const getMostRecent = useCallback((type: AssessmentTypeKey): SavedAssessment | null => {
    const byType = getAssessmentsByType(type);
    return byType.length > 0 ? byType[0] : null;
  }, [getAssessmentsByType]);

  return {
    savedAssessments,
    isLoading,
    isSaving,
    saveAssessment,
    updateAssessment,
    deleteAssessment,
    fetchSavedAssessments,
    getAssessmentsByType,
    getMostRecent,
  };
}
