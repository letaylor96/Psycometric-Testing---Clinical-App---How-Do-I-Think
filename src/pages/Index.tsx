import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingHero } from '@/components/LandingHero';
import { QuizQuestion } from '@/components/QuizQuestion';
import { ResultsScreen } from '@/components/ResultsScreen';
import { quizQuestions, calculateResults, TestResults } from '@/data/quizQuestions';

type GameState = 'landing' | 'quiz' | 'results';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<TestResults | null>(null);

  const handleStartQuiz = useCallback(() => {
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults(null);
  }, []);

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate final results
      const finalResults = calculateResults(newAnswers);
      setResults(finalResults);
      setGameState('results');
    }
  }, [selectedAnswer, answers, currentQuestionIndex]);

  const handleRestart = useCallback(() => {
    setGameState('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults(null);
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
