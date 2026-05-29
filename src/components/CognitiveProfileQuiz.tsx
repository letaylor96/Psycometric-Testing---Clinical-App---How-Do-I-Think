import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  CP_SECTIONS,
  CP_TOTAL_QUESTIONS,
  COGNITIVE_PROFILE_SCALE,
  calculateCognitiveProfile,
  CognitiveProfileResults,
} from '@/data/cognitiveProfileQuestions';

interface Props {
  onComplete: (results: CognitiveProfileResults, answers: Record<number, number>) => void;
  onBack: () => void;
}

export const CognitiveProfileQuiz = ({ onComplete, onBack }: Props) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const section = CP_SECTIONS[sectionIndex];
  const sectionAnswered = section.questions.every((q) => answers[q.id] !== undefined);
  const totalAnswered = Object.keys(answers).length;
  const overallPct = Math.round((totalAnswered / CP_TOTAL_QUESTIONS) * 100);

  const handlePick = (qid: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleNext = () => {
    if (sectionIndex < CP_SECTIONS.length - 1) {
      setSectionIndex(sectionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const results = calculateCognitiveProfile(answers);
      onComplete(results, answers);
    }
  };

  const handlePrev = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const isLast = sectionIndex === CP_SECTIONS.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Top progress strip */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4 mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>
              Section {sectionIndex + 1} of {CP_SECTIONS.length}
            </span>
            <span className="tabular-nums">
              {totalAnswered} / {CP_TOTAL_QUESTIONS} answered
            </span>
          </div>
          <div className="h-[3px] bg-border/60 overflow-hidden rounded-full">
            <div
              className="h-full bg-foreground/70 transition-all duration-300"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Section header */}
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
          {section.basis}
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mb-3">
          {section.label}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-10">
          {section.description} There are no right or wrong answers. Choose what best reflects you most of the time.
        </p>

        {/* Questions */}
        <div className="space-y-6">
          {section.questions.map((q, idx) => {
            const selected = answers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-lg border border-border bg-card p-5 sm:p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-[11px] font-mono text-muted-foreground/70 mt-0.5 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-foreground text-[15px] leading-relaxed">{q.text}</p>
                </div>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-4">
                  {COGNITIVE_PROFILE_SCALE.map((opt) => {
                    const active = selected === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handlePick(q.id, opt.value)}
                        className={cn(
                          'flex flex-col items-center justify-center gap-1.5 rounded-md border px-1 py-3 transition-colors',
                          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                          active
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                        )}
                      >
                        <span className="text-sm font-medium tabular-nums">{opt.value}</span>
                        <span className="text-[10px] sm:text-[11px] leading-tight text-center px-0.5">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mt-10">
          <Button
            variant="ghost"
            onClick={handlePrev}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {sectionIndex === 0 ? 'Exit' : 'Previous section'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!sectionAnswered}
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6"
          >
            {isLast ? (
              <>
                Complete assessment
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {!sectionAnswered && (
          <p className="text-center text-muted-foreground/70 text-xs mt-4">
            Answer every item in this section to continue.
          </p>
        )}
      </div>
    </div>
  );
};
