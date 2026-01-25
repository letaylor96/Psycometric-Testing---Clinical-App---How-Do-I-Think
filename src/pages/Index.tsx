import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingHero } from '@/components/LandingHero';
import { QuizQuestion } from '@/components/QuizQuestion';
import { ResultsScreen } from '@/components/ResultsScreen';
import { quizQuestions, calculateResults, TestResults, TOTAL_TEST_TIME } from '@/data/quizQuestions';
import { AssessmentType } from '@/data/assessmentTypes';
import { personalityQuestions, calculatePersonalityResults, PersonalityResults } from '@/data/personalityQuestions';
import { adhdQuestions, calculateADHDResults, ADHDResults } from '@/data/adhdQuestions';
import { calculateCognitiveStyleResults, CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { PersonalityQuiz } from '@/components/PersonalityQuiz';
import { ADHDQuiz } from '@/components/ADHDQuiz';
import { CognitiveStyleQuiz } from '@/components/CognitiveStyleQuiz';
import { PersonalityResultsScreen } from '@/components/PersonalityResultsScreen';
import { ADHDResultsScreen } from '@/components/ADHDResultsScreen';
import { CognitiveStyleResultsScreen } from '@/components/CognitiveStyleResultsScreen';
import { CombinedDashboard } from '@/components/CombinedDashboard';

type GameState = 'landing' | 'quiz' | 'results' | 'personality-quiz' | 'personality-results' | 'adhd-quiz' | 'adhd-results' | 'cognitive-quiz' | 'cognitive-results' | 'dashboard';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<TestResults | null>(null);
  const [personalityResults, setPersonalityResults] = useState<PersonalityResults | null>(null);
  const [adhdResults, setADHDResults] = useState<ADHDResults | null>(null);
  const [cognitiveStyleResults, setCognitiveStyleResults] = useState<CognitiveStyleResults | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TEST_TIME);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

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

  const handleSelectAssessment = useCallback((type: AssessmentType) => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    
    switch (type) {
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
    }
  }, [handleStartQuiz]);

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const finishQuiz = useCallback((finalAnswers: number[]) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const timeUsed = TOTAL_TEST_TIME - timeRemaining;
    const finalResults = calculateResults(finalAnswers, timeUsed);
    setResults(finalResults);
    setGameState('results');
  }, [timeRemaining]);

  const handleNextQuestion = useCallback(() => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz(newAnswers);
    }
  }, [selectedAnswer, answers, currentQuestionIndex, finishQuiz]);

  const handleTimeUp = useCallback(() => {
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers.push(selectedAnswer);
    }
    while (finalAnswers.length < quizQuestions.length) {
      finalAnswers.push(-1);
    }
    finishQuiz(finalAnswers);
  }, [answers, selectedAnswer, finishQuiz]);

  const handlePersonalityComplete = useCallback((answers: number[]) => {
    const results = calculatePersonalityResults(answers);
    setPersonalityResults(results);
    setGameState('personality-results');
  }, []);

  const handleADHDComplete = useCallback((answers: number[]) => {
    const results = calculateADHDResults(answers);
    setADHDResults(results);
    setGameState('adhd-results');
  }, []);

  const handleCognitiveStyleComplete = useCallback((answers: number[]) => {
    const results = calculateCognitiveStyleResults(answers);
    setCognitiveStyleResults(results);
    setGameState('cognitive-results');
  }, []);

  const handleRestart = useCallback(() => {
    setGameState('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTimeRemaining(TOTAL_TEST_TIME);
    if (timerRef.current) clearInterval(timerRef.current);
    // Note: We preserve results for the dashboard
  }, []);

  const handleFullRestart = useCallback(() => {
    setGameState('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults(null);
    setPersonalityResults(null);
    setADHDResults(null);
    setCognitiveStyleResults(null);
    setTimeRemaining(TOTAL_TEST_TIME);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const handleViewDashboard = useCallback(() => {
    setGameState('dashboard');
  }, []);

  const handleTakeAssessmentFromDashboard = useCallback((type: 'iq' | 'personality' | 'adhd') => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    
    switch (type) {
      case 'personality':
        setGameState('personality-quiz');
        break;
      case 'iq':
        handleStartQuiz();
        break;
      case 'adhd':
        setGameState('adhd-quiz');
        break;
    }
  }, [handleStartQuiz]);

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
            <LandingHero onStart={handleStartQuiz} onSelectAssessment={handleSelectAssessment} />
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
              question={quizQuestions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={quizQuestions.length}
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
