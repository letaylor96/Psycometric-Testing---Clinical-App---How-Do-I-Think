import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingHero } from '@/components/LandingHero';
import { QuizQuestion } from '@/components/QuizQuestion';
import { ResultsScreen } from '@/components/ResultsScreen';
import { AssessmentPreview } from '@/components/AssessmentPreview';
import { Question, calculateResults, TestResults, TOTAL_TEST_TIME } from '@/data/quizQuestions';
import { AssessmentType } from '@/data/assessmentTypes';
import { personalityQuestions, calculatePersonalityResults, PersonalityResults } from '@/data/personalityQuestions';
import { adhdQuestions, calculateADHDResults, ADHDResults } from '@/data/adhdQuestions';
import { calculateCognitiveStyleResults, CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { FreudianResults } from '@/data/freudianQuestions';
import { PersonalityQuiz } from '@/components/PersonalityQuiz';
import { ADHDQuiz } from '@/components/ADHDQuiz';
import { CognitiveStyleQuiz } from '@/components/CognitiveStyleQuiz';
import { FreudianQuiz } from '@/components/FreudianQuiz';
import { PersonalityResultsScreen } from '@/components/PersonalityResultsScreen';
import { ADHDResultsScreen } from '@/components/ADHDResultsScreen';
import { CognitiveStyleResultsScreen } from '@/components/CognitiveStyleResultsScreen';
import { FreudianResultsScreen } from '@/components/FreudianResultsScreen';
import { CombinedDashboard } from '@/components/CombinedDashboard';
import { usePersistedResults } from '@/hooks/usePersistedResults';
import { iqQuestionVariants } from '@/data/iqQuestionVariants';
import { selectRandomVariants } from '@/lib/questionVariants';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type GameState = 
  | 'landing' 
  | 'preview'
  | 'quiz' 
  | 'results' 
  | 'personality-quiz' 
  | 'personality-results' 
  | 'adhd-quiz' 
  | 'adhd-results' 
  | 'cognitive-quiz' 
  | 'cognitive-results' 
  | 'freudian-quiz'
  | 'freudian-analyzing'
  | 'freudian-results'
  | 'dashboard';

const Index = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>('landing');
  const [previewType, setPreviewType] = useState<AssessmentType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [freudianResults, setFreudianResults] = useState<FreudianResults | null>(null);
  
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
  const hasCompletedAny = !!results || !!personalityResults || !!adhdResults || !!cognitiveStyleResults || !!freudianResults;

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
      case 'cognitive':
        setGameState('cognitive-quiz');
        break;
      case 'adhd':
        setGameState('adhd-quiz');
        break;
      case 'freudian':
        setGameState('freudian-quiz');
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
    persistPersonality(results, personalityAnswers); // Persist to localStorage
    setGameState('personality-results');
  }, [persistPersonality]);

  const handleADHDComplete = useCallback((adhdAnswers: number[]) => {
    const results = calculateADHDResults(adhdAnswers);
    setADHDResults(results);
    persistADHD(results, adhdAnswers); // Persist to localStorage
    setGameState('adhd-results');
  }, [persistADHD]);

  const handleCognitiveStyleComplete = useCallback((cognitiveAnswers: number[]) => {
    const results = calculateCognitiveStyleResults(cognitiveAnswers);
    setCognitiveStyleResults(results);
    persistCognitive(results, cognitiveAnswers); // Persist to localStorage
    setGameState('cognitive-results');
  }, [persistCognitive]);

  const handleFreudianComplete = useCallback(async (freudianAnswers: { questionId: number; answer: string }[]) => {
    setGameState('freudian-analyzing');
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-freudian', {
        body: { answers: freudianAnswers },
      });

      if (error) throw error;

      setFreudianResults(data as FreudianResults);
      setGameState('freudian-results');
    } catch (err) {
      console.error('Error analyzing Freudian assessment:', err);
      toast({
        title: 'Analysis Failed',
        description: 'There was an error analyzing your responses. Please try again.',
        variant: 'destructive',
      });
      setGameState('freudian-quiz');
    }
  }, [toast]);

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
    setFreudianResults(null);
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
              isFree={!hasCompletedAny}
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
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
            />
          </motion.div>
        )}

        {gameState === 'adhd-quiz' && (
          <motion.div
            key="adhd-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ADHDQuiz onComplete={handleADHDComplete} onBack={handleRestart} />
          </motion.div>
        )}

        {gameState === 'adhd-results' && adhdResults && (
          <motion.div
            key="adhd-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ADHDResultsScreen 
              results={adhdResults} 
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
            />
          </motion.div>
        )}

        {gameState === 'cognitive-quiz' && (
          <motion.div
            key="cognitive-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CognitiveStyleQuiz onComplete={handleCognitiveStyleComplete} onBack={handleRestart} />
          </motion.div>
        )}

        {gameState === 'cognitive-results' && cognitiveStyleResults && (
          <motion.div
            key="cognitive-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CognitiveStyleResultsScreen 
              results={cognitiveStyleResults} 
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
            />
          </motion.div>
        )}

        {(gameState === 'freudian-quiz' || gameState === 'freudian-analyzing') && (
          <motion.div
            key="freudian-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FreudianQuiz 
              onComplete={handleFreudianComplete} 
              onBack={handleRestart}
              isAnalyzing={gameState === 'freudian-analyzing'}
            />
          </motion.div>
        )}

        {gameState === 'freudian-results' && freudianResults && (
          <motion.div
            key="freudian-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FreudianResultsScreen 
              results={freudianResults} 
              onRestart={handleRestart}
              onViewDashboard={handleViewDashboard}
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
    </div>
  );
};

export default Index;
