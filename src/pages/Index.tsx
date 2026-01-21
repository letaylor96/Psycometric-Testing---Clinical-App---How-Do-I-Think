import { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingHero } from '@/components/LandingHero';
import { QuizQuestion } from '@/components/QuizQuestion';
import { ResultsScreen } from '@/components/ResultsScreen';
import { quizQuestions, calculateResults, TestResults, TOTAL_TEST_TIME } from '@/data/quizQuestions';

type GameState = 'landing' | 'quiz' | 'results';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<TestResults | null>(null);
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
    // Auto-submit with current answers (unanswered questions count as wrong)
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers.push(selectedAnswer);
    }
    // Fill remaining with -1 (wrong answer)
    while (finalAnswers.length < quizQuestions.length) {
      finalAnswers.push(-1);
    }
    finishQuiz(finalAnswers);
  }, [answers, selectedAnswer, finishQuiz]);

  const handleRestart = useCallback(() => {
    setGameState('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults(null);
    setTimeRemaining(TOTAL_TEST_TIME);
    if (timerRef.current) clearInterval(timerRef.current);
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
            <LandingHero onStart={handleStartQuiz} />
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
