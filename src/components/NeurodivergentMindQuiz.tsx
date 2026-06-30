import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Sparkles, Activity, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CognitiveStyleQuestion,
  dimensionLabels,
  ThinkingDimension,
} from '@/data/cognitiveStyleQuestions';
import { adhdQuestions, adhdOptions, adhdDomainLabels } from '@/data/adhdQuestions';
import { cognitiveStyleQuestionVariants } from '@/data/cognitiveStyleQuestionVariants';
import { selectRandomVariants } from '@/lib/questionVariants';
import {
  TOTAL_QUESTION_COUNT,
  DeeperModuleKey,
  DeeperAnswers,
  DEEPER_MODULE_META,
} from '@/data/neurodivergentMindQuestions';
import { aq10Questions, aq10Options } from '@/data/aq10Questions';
import { dyslexiaQuestions, dyslexiaOptions } from '@/data/dyslexiaQuestions';
import { dyscalculiaQuestions, dyscalculiaOptions } from '@/data/dyscalculiaQuestions';
import { dyspraxiaQuestions, dyspraxiaOptions } from '@/data/dyspraxiaQuestions';
import { sensoryRsdQuestions, sensoryRsdOptions } from '@/data/sensoryRsdQuestions';

interface NeurodivergentMindQuizProps {
  onComplete: (cognitiveAnswers: number[], adhdAnswers: number[], deeperAnswers: DeeperAnswers) => void;
  onBack: () => void;
}

type Phase = 'cognitive' | 'adhd' | 'gate' | 'deeper';

const dimensionColors: Record<ThinkingDimension, string> = {
  visual_spatial: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
  pattern_recognition: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  hyperfocus: 'bg-pink-500/10 text-pink-500 border-pink-500/30',
  divergent_thinking: 'bg-primary/10 text-primary border-primary/30',
  detail_orientation: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  big_picture: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
};

interface DeeperModuleSpec {
  key: DeeperModuleKey;
  questions: { id: number; question: string }[];
  options: string[];
}

const DEEPER_SPECS: DeeperModuleSpec[] = [
  { key: 'autism',      questions: aq10Questions,        options: aq10Options },
  { key: 'dyslexia',    questions: dyslexiaQuestions,    options: dyslexiaOptions },
  { key: 'dyscalculia', questions: dyscalculiaQuestions, options: dyscalculiaOptions },
  { key: 'dyspraxia',   questions: dyspraxiaQuestions,   options: dyspraxiaOptions },
  { key: 'sensoryRsd',  questions: sensoryRsdQuestions,  options: sensoryRsdOptions },
];

export const NeurodivergentMindQuiz = ({ onComplete, onBack }: NeurodivergentMindQuizProps) => {
  const cognitiveQuestions = useMemo(() => selectRandomVariants(cognitiveStyleQuestionVariants), []);

  const [phase, setPhase] = useState<Phase>('cognitive');
  const [cognitiveIndex, setCognitiveIndex] = useState(0);
  const [adhdIndex, setAdhdIndex] = useState(0);
  const [cognitiveAnswers, setCognitiveAnswers] = useState<number[]>([]);
  const [adhdAnswers, setAdhdAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Deeper-screening state
  const [selectedDeeper, setSelectedDeeper] = useState<DeeperModuleKey[]>([]);
  const [deeperAnswers, setDeeperAnswers] = useState<DeeperAnswers>({});
  const [deeperModuleIdx, setDeeperModuleIdx] = useState(0);
  const [deeperQuestionIdx, setDeeperQuestionIdx] = useState(0);
  const [showingTransition, setShowingTransition] = useState(false);

  const activeDeeperSpecs = useMemo(
    () => DEEPER_SPECS.filter((s) => selectedDeeper.includes(s.key)),
    [selectedDeeper]
  );

  const currentCognitiveQuestion = cognitiveQuestions[cognitiveIndex];
  const currentAdhdQuestion = adhdQuestions[adhdIndex];
  const currentDeeperSpec = activeDeeperSpecs[deeperModuleIdx];
  const currentDeeperQuestion = currentDeeperSpec?.questions[deeperQuestionIdx];

  // Total progress label across core 38
  const coreProgress = phase === 'cognitive'
    ? cognitiveIndex + 1
    : phase === 'adhd' ? cognitiveQuestions.length + adhdIndex + 1
    : TOTAL_QUESTION_COUNT;
  const coreProgressPct = (coreProgress / TOTAL_QUESTION_COUNT) * 100;

  const toggleDeeper = (key: DeeperModuleKey) => {
    setSelectedDeeper((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const finalize = useCallback((finalDeeperAnswers: DeeperAnswers) => {
    onComplete(cognitiveAnswers, adhdAnswers, finalDeeperAnswers);
  }, [cognitiveAnswers, adhdAnswers, onComplete]);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) return;

    if (phase === 'cognitive') {
      const newAnswers = [...cognitiveAnswers, selectedAnswer];
      setCognitiveAnswers(newAnswers);
      setSelectedAnswer(null);

      if (cognitiveIndex < cognitiveQuestions.length - 1) {
        setCognitiveIndex((p) => p + 1);
      } else {
        setShowingTransition(true);
        setTimeout(() => {
          setShowingTransition(false);
          setPhase('adhd');
        }, 1500);
      }
    } else if (phase === 'adhd') {
      const newAnswers = [...adhdAnswers, selectedAnswer];
      setAdhdAnswers(newAnswers);
      setSelectedAnswer(null);

      if (adhdIndex < adhdQuestions.length - 1) {
        setAdhdIndex((p) => p + 1);
      } else {
        // Hand off to the gate
        setPhase('gate');
      }
    } else if (phase === 'deeper' && currentDeeperSpec && currentDeeperQuestion) {
      // Record answer for current deeper question
      const moduleKey = currentDeeperSpec.key;
      const existing = deeperAnswers[moduleKey] ?? [];
      const updated = [...existing, selectedAnswer];
      const nextDeeperAnswers: DeeperAnswers = { ...deeperAnswers, [moduleKey]: updated };
      setDeeperAnswers(nextDeeperAnswers);
      setSelectedAnswer(null);

      if (deeperQuestionIdx < currentDeeperSpec.questions.length - 1) {
        setDeeperQuestionIdx((p) => p + 1);
      } else if (deeperModuleIdx < activeDeeperSpecs.length - 1) {
        setDeeperModuleIdx((p) => p + 1);
        setDeeperQuestionIdx(0);
      } else {
        finalize(nextDeeperAnswers);
      }
    }
  }, [
    selectedAnswer, phase, cognitiveAnswers, adhdAnswers, cognitiveIndex, adhdIndex,
    cognitiveQuestions.length, currentDeeperSpec, currentDeeperQuestion, deeperAnswers,
    deeperQuestionIdx, deeperModuleIdx, activeDeeperSpecs.length, finalize,
  ]);

  // === Transition screen ===
  if (showingTransition) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Cognitive Style Complete
          </h2>
          <p className="text-muted-foreground">Now let's explore your attention patterns…</p>
        </motion.div>
      </div>
    );
  }

  // === Gate: opt-in deeper screening ===
  if (phase === 'gate') {
    const totalAdded = selectedDeeper.reduce(
      (s, k) => s + DEEPER_MODULE_META[k].questionCount,
      0
    );
    const totalMinutes = selectedDeeper.reduce(
      (s, k) => s + DEEPER_MODULE_META[k].minutes,
      0
    );

    const handleStartDeeper = () => {
      if (selectedDeeper.length === 0) {
        finalize({});
      } else {
        setDeeperModuleIdx(0);
        setDeeperQuestionIdx(0);
        setPhase('deeper');
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to assessments</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-4">
              <Check className="w-3 h-3" />
              Core assessment complete
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3">
              Want a deeper screening?
            </h1>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your composite Neurodivergent Index and core ADHD + cognitive style scores are ready.
              Add any of the screeners below to broaden your profile — each takes just a few minutes.
              You can skip and see results now.
            </p>

            <div className="space-y-3 mb-6">
              {(Object.keys(DEEPER_MODULE_META) as DeeperModuleKey[]).map((key) => {
                const meta = DEEPER_MODULE_META[key];
                const isSelected = selectedDeeper.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggleDeeper(key)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border-2 transition-all',
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/40'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-6 h-6 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-colors',
                        isSelected ? 'border-primary bg-primary' : 'border-border'
                      )}>
                        {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-foreground">{meta.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {meta.questionCount} Q · ~{meta.minutes} min
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{meta.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedDeeper.length > 0 && (
              <div className="p-3 rounded-lg bg-muted/40 border border-border mb-4 text-sm text-muted-foreground flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" />
                Adding <span className="font-semibold text-foreground">{totalAdded} questions</span>
                {' '}(≈ {totalMinutes} minutes)
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => finalize({})}
                className="px-5 py-2.5 rounded-xl font-medium text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip — show my results
              </button>
              <button
                onClick={handleStartDeeper}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105 transition-transform"
              >
                {selectedDeeper.length === 0 ? 'Continue to results →' : `Start deeper screening →`}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // === Deeper module questions ===
  if (phase === 'deeper' && currentDeeperSpec && currentDeeperQuestion) {
    const meta = DEEPER_MODULE_META[currentDeeperSpec.key];
    const totalQuestions = currentDeeperSpec.questions.length;
    const modulePct = ((deeperQuestionIdx + 1) / totalQuestions) * 100;
    const overallDeeperPct = (
      (activeDeeperSpecs.slice(0, deeperModuleIdx).reduce((s, sp) => s + sp.questions.length, 0)
        + deeperQuestionIdx + 1)
      / activeDeeperSpecs.reduce((s, sp) => s + sp.questions.length, 0)
    ) * 100;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold">{meta.label}</h1>
              <p className="text-xs text-muted-foreground">
                Module {deeperModuleIdx + 1} of {activeDeeperSpecs.length} · Question {deeperQuestionIdx + 1} of {totalQuestions}
              </p>
            </div>
          </div>

          <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${overallDeeperPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>This module: {Math.round(modulePct)}%</span>
            <span>Deeper screening: {Math.round(overallDeeperPct)}%</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentDeeperSpec.key}-${deeperQuestionIdx}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="rounded-2xl p-6 md:p-8 border border-border bg-card">
              <h2 className="font-serif text-lg md:text-xl font-semibold mb-8 leading-relaxed">
                {currentDeeperQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentDeeperSpec.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2',
                      selectedAnswer === idx
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        selectedAnswer === idx ? 'border-primary bg-primary' : 'border-muted-foreground'
                      )}>
                        {selectedAnswer === idx && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300',
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:scale-105'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // === Core cognitive + ADHD UI (original layout) ===
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to assessments</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            phase === 'cognitive'
              ? 'bg-gradient-to-br from-purple-500 to-cyan-500'
              : 'bg-gradient-to-br from-violet-500 to-purple-500'
          )}>
            {phase === 'cognitive' ? <Brain className="w-5 h-5 text-white" /> : <Activity className="w-5 h-5 text-white" />}
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold">
              {phase === 'cognitive' ? 'Part 1: Thinking Patterns' : 'Part 2: Attention & Focus'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {phase === 'cognitive'
                ? 'How your mind naturally processes information'
                : 'Clinical attention and hyperactivity screening (ASRS-v1.1)'}
            </p>
          </div>
        </div>

        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
          <motion.div
            className={cn(
              'h-full',
              phase === 'cognitive'
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${coreProgressPct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {coreProgress} of {TOTAL_QUESTION_COUNT}</span>
          <span>{Math.round(coreProgressPct)}% complete</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'cognitive' ? (
          <motion.div
            key={`cognitive-${currentCognitiveQuestion.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="rounded-2xl p-6 md:p-8 border border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
                  dimensionColors[currentCognitiveQuestion.dimension]
                )}>
                  {dimensionLabels[currentCognitiveQuestion.dimension].label}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>Thinking Style</span>
                </div>
              </div>

              <h2 className="font-serif text-lg md:text-xl font-semibold mb-6 leading-relaxed">
                {currentCognitiveQuestion.question}
              </h2>

              <div className="grid gap-2.5">
                {currentCognitiveQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2',
                      selectedAnswer === index
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
                    )}
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted text-xs font-bold mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option.text}
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedAnswer !== null ? 1 : 0.3 }}
                className="mt-6 flex justify-end"
              >
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300',
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:scale-105'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  {cognitiveIndex === cognitiveQuestions.length - 1 ? 'Continue to Part 2 →' : 'Next →'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`adhd-${currentAdhdQuestion.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="rounded-2xl p-6 md:p-8 border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {adhdDomainLabels[currentAdhdQuestion.domain]}
                </span>
                {currentAdhdQuestion.isPartA && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                    Screening
                  </span>
                )}
              </div>

              <h2 className="font-serif text-lg md:text-xl font-semibold mb-8 leading-relaxed">
                {currentAdhdQuestion.question}
              </h2>

              <div className="space-y-3">
                {adhdOptions.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      'w-full p-4 rounded-xl text-left font-medium transition-all duration-200 border-2',
                      selectedAnswer === index
                        ? 'border-violet-500 bg-violet-500/10 text-foreground'
                        : 'border-border bg-muted/30 text-muted-foreground hover:border-violet-500/50 hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                        selectedAnswer === index ? 'border-violet-500 bg-violet-500' : 'border-muted-foreground'
                      )}>
                        {selectedAnswer === index && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedAnswer !== null ? 1 : 0.3 }}
                className="mt-6 flex justify-end"
              >
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300',
                    selectedAnswer !== null
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:scale-105'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  )}
                >
                  {adhdIndex === adhdQuestions.length - 1 ? 'Continue →' : 'Next →'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
