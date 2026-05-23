import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { LandingHero } from '@/components/LandingHero';
import { QuizQuestion } from '@/components/QuizQuestion';
import { ResultsScreen } from '@/components/ResultsScreen';
import { AssessmentPreview } from '@/components/AssessmentPreview';
import { Question, calculateResults, TestResults, TOTAL_TEST_TIME } from '@/data/quizQuestions';
import { AssessmentType, SelectableTestKey } from '@/data/assessmentTypes';
import { personalityQuestions, calculatePersonalityResults, PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults, calculateADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { AnalysisFramework, DepthPsychologyResults } from '@/data/depthPsychologyQuestions';
import { NeurodivergentMindResults, calculateNeurodivergentMindResults } from '@/data/neurodivergentMindQuestions';
import { AQResults, calculateAQResults } from '@/data/autismQuestions';
import { PersonalityQuiz } from '@/components/PersonalityQuiz';
import { NeurodivergentMindQuiz } from '@/components/NeurodivergentMindQuiz';
import { NeurodivergentMindResultsScreen } from '@/components/NeurodivergentMindResultsScreen';
import { ADHDQuiz } from '@/components/ADHDQuiz';
import { ADHDResultsScreen } from '@/components/ADHDResultsScreen';
import { AutismQuiz } from '@/components/AutismQuiz';
import { AutismResultsScreen } from '@/components/AutismResultsScreen';
import { FrameworkSelector } from '@/components/FrameworkSelector';
import { DepthPsychologyQuiz } from '@/components/DepthPsychologyQuiz';
import { DepthPsychologyResultsScreen } from '@/components/DepthPsychologyResults';
import { PersonalityResultsScreen } from '@/components/PersonalityResultsScreen';
import { CombinedDashboard } from '@/components/CombinedDashboard';
import { usePersistedResults } from '@/hooks/usePersistedResults';
import { iqQuestionVariants } from '@/data/iqQuestionVariants';
import { selectRandomVariants } from '@/lib/questionVariants';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { clearPremiumReturnState } from '@/pages/PaymentSuccess';
import { useDiscoverMyMind } from '@/hooks/useDiscoverMyMind';
import { DiscoverMyMindBanner } from '@/components/DiscoverMyMindBanner';

type GameState = 
  | 'landing' 
  | 'preview'
  | 'quiz' 
  | 'results' 
  | 'personality-quiz' 
  | 'personality-results' 
  | 'neurodivergent-quiz' 
  | 'neurodivergent-results'
  | 'depth-framework-select'
  | 'depth-quiz'
  | 'depth-analyzing'
  | 'depth-results'
  | 'adhd-quiz'
  | 'adhd-results'
  | 'autism-quiz'
  | 'autism-results'
  | 'dashboard';

const Index = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameState, setGameState] = useState<GameState>('landing');
  const [previewType, setPreviewType] = useState<AssessmentType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [personalityAnswersState, setPersonalityAnswersState] = useState<number[]>([]);
  const [cognitiveAnswersState, setCognitiveAnswersState] = useState<number[]>([]);
  const [adhdAnswersState, setAdhdAnswersState] = useState<number[]>([]);
  const [depthFramework, setDepthFramework] = useState<AnalysisFramework | null>(null);
  const [depthResults, setDepthResults] = useState<DepthPsychologyResults | null>(null);
  const [depthAnswers, setDepthAnswers] = useState<{ questionId: number; answer: string }[]>([]);
  const [neurodivergentResults, setNeurodivergentResults] = useState<NeurodivergentMindResults | null>(null);
  const [clarificationRequest, setClarificationRequest] = useState<{
    question: string;
    context: string;
    conversationHistory: any[];
  } | null>(null);
  
  // Use persisted results to prevent data loss during premium upgrade
  const { 
    results: persistedResults, 
    setIQResults, 
    setPersonalityResults: persistPersonality, 
    setADHDResults: persistADHD, 
    setCognitiveResults: persistCognitive,
    clearResults: clearPersistedResults 
  } = usePersistedResults();
  
  // Local state derived from persisted results
  const [results, setResults] = useState<TestResults | null>(persistedResults.iq);
  const [personalityResults, setPersonalityResults] = useState<PersonalityResults | null>(persistedResults.personality);
  const [adhdResults, setADHDResults] = useState<ADHDResults | null>(persistedResults.adhd);
  const [cognitiveStyleResults, setCognitiveStyleResults] = useState<CognitiveStyleResults | null>(persistedResults.cognitive);
  
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TEST_TIME);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Generate randomized questions for this session
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>(() => 
    selectRandomVariants(iqQuestionVariants)
  );

  // Check if this is user's first assessment (for free tier)
  const hasCompletedAny = !!results || !!personalityResults || !!neurodivergentResults || !!depthResults;

  // Handle return from premium payment - restore to results view
  useEffect(() => {
    const returnTo = searchParams.get('returnTo');
    if (returnTo) {
      // Map the return state to appropriate game state
      const validReturnStates: GameState[] = [
        'results', 
        'personality-results', 
        'neurodivergent-results', 
        'depth-results',
        'dashboard'
      ];
      
      if (validReturnStates.includes(returnTo as GameState)) {
        // Only navigate if we have the data to show
        const canShow = 
          (returnTo === 'results' && persistedResults.iq) ||
          (returnTo === 'personality-results' && persistedResults.personality) ||
          (returnTo === 'neurodivergent-results' && (persistedResults.cognitive || persistedResults.adhd)) ||
          (returnTo === 'depth-results') ||
          (returnTo === 'dashboard');
        
        if (canShow) {
          // Restore neurodivergent results if needed
          if (returnTo === 'neurodivergent-results' && !neurodivergentResults && 
              persistedResults.cognitive && persistedResults.adhd && 
              persistedResults.cognitiveAnswers && persistedResults.adhdAnswers) {
            const restored = calculateNeurodivergentMindResults(
              persistedResults.cognitiveAnswers,
              persistedResults.adhdAnswers
            );
            setNeurodivergentResults(restored);
          }
          
          setGameState(returnTo as GameState);
        }
      }
      
      // Clear the URL params
      searchParams.delete('returnTo');
      searchParams.delete('assessmentType');
      setSearchParams(searchParams, { replace: true });
      clearPremiumReturnState();
    }
  }, [searchParams, setSearchParams, persistedResults, neurodivergentResults]);

  // Timer effect
  useEffect(() => {
    if (gameState === 'quiz') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState]);

  const handleStartQuiz = useCallback(() => {
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults(null);
    setTimeRemaining(TOTAL_TEST_TIME);
    startTimeRef.current = Date.now();
  }, []);

  // Show preview screen when assessment is selected
  const handleSelectAssessment = useCallback((type: AssessmentType) => {
    setPreviewType(type);
    setGameState('preview');
  }, []);

  // Start the actual quiz from preview
  const handleStartFromPreview = useCallback((tier: 'free' | 'premium') => {
    if (!previewType) return;
    
    // TODO: Store tier selection for payment gating after quiz completion
    console.log(`Starting ${previewType} assessment with tier: ${tier}`);
    
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    
    switch (previewType) {
      case 'personality':
        setGameState('personality-quiz');
        break;
      case 'iq':
        handleStartQuiz();
        break;
      case 'neurodivergent':
        setGameState('neurodivergent-quiz');
        break;
      case 'depth':
        setGameState('depth-framework-select');
        break;
    }
  }, [previewType, handleStartQuiz]);

  const handleBackFromPreview = useCallback(() => {
    setGameState('landing');
    setPreviewType(null);
  }, []);

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const finishQuiz = useCallback((finalAnswers: number[], questions: Question[]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timeUsed = TOTAL_TEST_TIME - timeRemaining;
    const finalResults = calculateResults(finalAnswers, timeUsed, questions);
    setResults(finalResults);
    setIQResults(finalResults, finalAnswers); // Persist to localStorage
    setGameState('results');
  }, [timeRemaining, setIQResults]);

  const handleNextQuestion = useCallback(() => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz(newAnswers, sessionQuestions);
    }
  }, [selectedAnswer, answers, currentQuestionIndex, finishQuiz, sessionQuestions]);

  const handleTimeUp = useCallback(() => {
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers.push(selectedAnswer);
    }
    while (finalAnswers.length < sessionQuestions.length) {
      finalAnswers.push(-1);
    }
    finishQuiz(finalAnswers, sessionQuestions);
  }, [answers, selectedAnswer, finishQuiz, sessionQuestions]);

  const handlePersonalityComplete = useCallback((personalityAnswers: number[]) => {
    const results = calculatePersonalityResults(personalityAnswers);
    setPersonalityResults(results);
    setPersonalityAnswersState(personalityAnswers); // Store answers for save feature
    persistPersonality(results, personalityAnswers); // Persist to localStorage
    setGameState('personality-results');
  }, [persistPersonality]);

  const handleNeurodivergentComplete = useCallback((cognitiveAnswers: number[], adhdAnswers: number[]) => {
    const results = calculateNeurodivergentMindResults(cognitiveAnswers, adhdAnswers);
    setNeurodivergentResults(results);
    // Also set the individual results for dashboard compatibility
    setCognitiveStyleResults(results.cognitiveStyle);
    setADHDResults(results.adhd);
    // Store answers for save feature
    setCognitiveAnswersState(cognitiveAnswers);
    setAdhdAnswersState(adhdAnswers);
    persistCognitive(results.cognitiveStyle, cognitiveAnswers);
    persistADHD(results.adhd, adhdAnswers);
    setGameState('neurodivergent-results');
  }, [persistCognitive, persistADHD]);

  const handleSelectFramework = useCallback((framework: AnalysisFramework) => {
    setDepthFramework(framework);
    setClarificationRequest(null);
    setGameState('depth-quiz');
  }, []);

  // Handler for trying a different framework with existing answers
  const handleTryDifferentFramework = useCallback(async (framework: AnalysisFramework) => {
    if (depthAnswers.length === 0) return;
    
    setDepthFramework(framework);
    setClarificationRequest(null);
    setGameState('depth-analyzing');
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-freudian', {
        body: { answers: depthAnswers, framework },
      });

      if (error) throw error;

      if (data.needsClarification) {
        setClarificationRequest({
          question: data.question,
          context: data.context,
          conversationHistory: data.conversationHistory,
        });
        setGameState('depth-quiz');
        return;
      }

      setDepthResults(data as DepthPsychologyResults);
      setGameState('depth-results');
    } catch (err) {
      console.error('Error analyzing with new framework:', err);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing through this framework. Please try again.',
        variant: 'destructive',
      });
      setGameState('depth-results');
    }
  }, [depthAnswers, toast]);

  const handleDepthComplete = useCallback(async (answers: { questionId: number; answer: string }[]) => {
    if (!depthFramework) return;
    
    setDepthAnswers(answers);
    setGameState('depth-analyzing');
    setClarificationRequest(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-freudian', {
        body: { answers, framework: depthFramework },
      });

      if (error) throw error;

      // Check if clarification is needed
      if (data.needsClarification) {
        setClarificationRequest({
          question: data.question,
          context: data.context,
          conversationHistory: data.conversationHistory,
        });
        setGameState('depth-quiz'); // Return to quiz view to show clarification
        return;
      }

      setDepthResults(data as DepthPsychologyResults);
      setGameState('depth-results');
    } catch (err) {
      console.error('Error analyzing depth assessment:', err);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your responses. Your answers are saved - you can try again.',
        variant: 'destructive',
      });
      // Stay in quiz state but preserve answers for retry
      setGameState('depth-quiz');
    }
  }, [depthFramework, toast]);

  const handleClarificationResponse = useCallback(async (response: string) => {
    if (!depthFramework || !clarificationRequest) return;
    
    setGameState('depth-analyzing');
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-freudian', {
        body: { 
          answers: depthAnswers, 
          framework: depthFramework,
          conversationHistory: clarificationRequest.conversationHistory,
          clarificationResponse: response,
        },
      });

      if (error) throw error;

      // Check if more clarification is needed
      if (data.needsClarification) {
        setClarificationRequest({
          question: data.question,
          context: data.context,
          conversationHistory: data.conversationHistory,
        });
        setGameState('depth-quiz');
        return;
      }

      setClarificationRequest(null);
      setDepthResults(data as DepthPsychologyResults);
      setGameState('depth-results');
    } catch (err) {
      console.error('Error processing clarification:', err);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error processing your response. You can try submitting again.',
        variant: 'destructive',
      });
      // Keep the clarification request state so user can retry
      // Don't clear clarificationRequest - allow retry with same context
      setGameState('depth-quiz');
    }
  }, [depthFramework, depthAnswers, clarificationRequest, toast]);

  const handleRestart = useCallback(() => {
    setGameState('landing');
    setPreviewType(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTimeRemaining(TOTAL_TEST_TIME);
    // Generate fresh randomized questions for the next attempt
    setSessionQuestions(selectRandomVariants(iqQuestionVariants));
    if (timerRef.current) clearInterval(timerRef.current);
    // Note: We preserve results for the dashboard
  }, []);

  const handleFullRestart = useCallback(() => {
    setGameState('landing');
    setPreviewType(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults(null);
    setPersonalityResults(null);
    setADHDResults(null);
    setCognitiveStyleResults(null);
    setNeurodivergentResults(null);
    setDepthResults(null);
    setDepthFramework(null);
    setTimeRemaining(TOTAL_TEST_TIME);
    setSessionQuestions(selectRandomVariants(iqQuestionVariants));
    clearPersistedResults(); // Clear localStorage
    if (timerRef.current) clearInterval(timerRef.current);
  }, [clearPersistedResults]);

  const handleViewDashboard = useCallback(() => {
    setGameState('dashboard');
  }, []);

  const handleTakeAssessmentFromDashboard = useCallback((type: AssessmentType) => {
    setPreviewType(type);
    setGameState('preview');
  }, []);

  // Discover My Mind funnel — derive completed list from existing results
  const completedAssessments: AssessmentType[] = [
    results ? 'iq' : null,
    cognitiveStyleResults ? 'neurodivergent' : null,
    personalityResults ? 'personality' : null,
    depthResults ? 'depth' : null,
  ].filter(Boolean) as AssessmentType[];

  const mapStatus = useDiscoverMyMind(completedAssessments);

  // Show the sticky banner only on result screens (where it's most useful)
  const showMapBanner =
    mapStatus.active &&
    (gameState === 'results' ||
      gameState === 'personality-results' ||
      gameState === 'neurodivergent-results' ||
      gameState === 'depth-results');

  const handleMapContinue = useCallback(
    (next: AssessmentType) => {
      setPreviewType(next);
      setGameState('preview');
    },
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {gameState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingHero 
              onStart={() => handleSelectAssessment('iq')} 
              onSelectAssessment={handleSelectAssessment}
              onViewDashboard={handleViewDashboard}
              iqResults={results}
              personalityResults={personalityResults}
              adhdResults={adhdResults}
              cognitiveStyleResults={cognitiveStyleResults}
            />
          </motion.div>
        )}

        {gameState === 'preview' && previewType && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AssessmentPreview
              type={previewType}
              onStart={handleStartFromPreview}
              onBack={handleBackFromPreview}
            />
          </motion.div>
        )}

        {gameState === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuizQuestion
              question={sessionQuestions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={sessionQuestions.length}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNextQuestion}
              totalTimeRemaining={timeRemaining}
              onTimeUp={handleTimeUp}
            />
          </motion.div>
        )}

        {gameState === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultsScreen
              results={results}
              answers={answers}
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
            />
          </motion.div>
        )}

        {gameState === 'personality-quiz' && (
          <motion.div
            key="personality-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PersonalityQuiz onComplete={handlePersonalityComplete} onBack={handleRestart} />
          </motion.div>
        )}

        {gameState === 'personality-results' && personalityResults && (
          <motion.div
            key="personality-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PersonalityResultsScreen 
              results={personalityResults}
              answers={personalityAnswersState}
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
            />
          </motion.div>
        )}

        {gameState === 'neurodivergent-quiz' && (
          <motion.div
            key="neurodivergent-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NeurodivergentMindQuiz onComplete={handleNeurodivergentComplete} onBack={handleRestart} />
          </motion.div>
        )}

        {gameState === 'neurodivergent-results' && neurodivergentResults && (
          <motion.div
            key="neurodivergent-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <NeurodivergentMindResultsScreen 
              results={neurodivergentResults}
              cognitiveAnswers={cognitiveAnswersState}
              adhdAnswers={adhdAnswersState}
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
            />
          </motion.div>
        )}

        {gameState === 'depth-framework-select' && (
          <motion.div
            key="depth-framework-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FrameworkSelector 
              onSelect={handleSelectFramework} 
              onBack={handleRestart}
            />
          </motion.div>
        )}

        {(gameState === 'depth-quiz' || gameState === 'depth-analyzing') && depthFramework && (
          <motion.div
            key="depth-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DepthPsychologyQuiz 
              framework={depthFramework}
              onComplete={handleDepthComplete} 
              onBack={handleRestart}
              isAnalyzing={gameState === 'depth-analyzing'}
              clarificationRequest={clarificationRequest}
              onClarificationResponse={handleClarificationResponse}
            />
          </motion.div>
        )}

        {gameState === 'depth-results' && depthResults && (
          <motion.div
            key="depth-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DepthPsychologyResultsScreen 
              results={depthResults}
              answers={depthAnswers}
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
              onTryFramework={handleTryDifferentFramework}
              hasStoredAnswers={depthAnswers.length > 0}
            />
          </motion.div>
        )}

        {gameState === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CombinedDashboard
              iqResults={results}
              personalityResults={personalityResults}
              adhdResults={adhdResults}
              cognitiveStyleResults={cognitiveStyleResults}
              onRestart={handleFullRestart}
              onTakeAssessment={handleTakeAssessmentFromDashboard}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showMapBanner && (
        <DiscoverMyMindBanner
          status={mapStatus}
          onContinue={handleMapContinue}
          onViewDashboard={handleViewDashboard}
          onDismiss={mapStatus.stop}
        />
      )}
    </div>
  );
};

export default Index;
