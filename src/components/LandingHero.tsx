import { motion } from 'framer-motion';
import { ArrowRight, FileText, MessageCircle, BookOpen, Users, Layers, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, SelectableTestKey } from '@/data/assessmentTypes';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { AuthButton } from '@/components/AuthButton';
import { ThemeToggle } from '@/components/ThemeToggle';

import { HomeFAQ } from '@/components/HomeFAQ';
import { SEOFooter } from '@/components/SEOFooter';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { usePremiumAccess } from '@/hooks/usePremiumAccess';
import { useDiscoverMyMind } from '@/hooks/useDiscoverMyMind';
import { DiscoverMyMindSpine } from '@/components/DiscoverMyMindSpine';
import { SingleTestPicker } from '@/components/SingleTestPicker';

interface LandingHeroProps {
  onStart: () => void;
  onSelectAssessment: (type: AssessmentType) => void;
  onSelectTest: (key: SelectableTestKey) => void;
  onViewDashboard?: () => void;
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
}

export const LandingHero = ({
  onStart,
  onSelectAssessment,
  onSelectTest,
  onViewDashboard,
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
}: LandingHeroProps) => {
  const { hasPremiumAccess } = usePremiumAccess();

  const completionStatus: Record<AssessmentType, boolean> = {
    personality: !!personalityResults,
    iq: !!iqResults,
    neurodivergent: !!cognitiveStyleResults,
    depth: false,
  };

  const completedCount = Object.values(completionStatus).filter(Boolean).length;
  const hasStarted = completedCount > 0;

  const completedAssessments = (Object.entries(completionStatus) as [AssessmentType, boolean][])
    .filter(([, done]) => done)
    .map(([t]) => t);
  const mapStatus = useDiscoverMyMind(completedAssessments);

  const scrollToProgram = () => {
    document.getElementById('program-context')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-md border border-border bg-card flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-[11px] font-semibold tracking-wider text-foreground">HDT</span>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-base sm:text-lg font-medium text-foreground tracking-tight">
                How Do I Think
              </div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
                An Applied AI Works Canada assessment
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="absolute top-[64px] inset-x-0 h-px bg-border/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Progress bar for returning users */}
          {hasStarted && (
            <div className="mb-6">
              <AssessmentProgress
                iqResults={iqResults ?? null}
                personalityResults={personalityResults ?? null}
                adhdResults={adhdResults ?? null}
                cognitiveStyleResults={cognitiveStyleResults ?? null}
                onSelectAssessment={onSelectAssessment}
                onViewDashboard={onViewDashboard}
              />
            </div>
          )}

          {/* Eyebrow */}
          <div className="text-center mb-4">
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-muted-foreground font-medium">
              Cognitive &amp; AI-Readiness Self-Assessment
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-6 sm:mb-8 max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-foreground leading-[1.15] tracking-tight mb-5"
            >
              Understand how you think — so you can build from your strengths.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              A structured cognitive and personality profile designed to help participants understand how they learn, solve problems, communicate, and adapt to AI-enabled work.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.16 }}
              className="text-muted-foreground/70 text-sm max-w-2xl mx-auto leading-relaxed mt-4"
            >
              Built to support Applied AI Works Canada by helping participants identify where they may thrive, where they may need support, and how to start with the right AI-enabled tools and workflows.
            </motion.p>

            {/* Primary + Secondary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
              <Button
                onClick={onStart}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-medium px-7 py-5 text-sm"
              >
                Start the assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={scrollToProgram}
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-card font-medium px-7 py-5 text-sm"
              >
                Learn how it supports the program
              </Button>
            </div>

            {!hasPremiumAccess && !hasStarted && (
              <p className="text-muted-foreground/60 text-xs mt-5">
                No sign-up required to begin.
              </p>
            )}
          </div>

          {/* ===== Full Cognitive & AI-Readiness Profile ===== */}
          <DiscoverMyMindSpine
            status={mapStatus}
            onStart={onSelectAssessment}
            onViewDashboard={onViewDashboard}
          />

          {/* ===== Single-module picker ===== */}
          <SingleTestPicker onSelectTest={onSelectTest} />

          {hasStarted && completedCount < 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-4">
              <p className="text-muted-foreground text-xs sm:text-sm">
                <span className="text-foreground font-medium">{completedCount} of 4 modules complete</span>
                {' '}— finish all four for your integrated profile.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Program Context */}
      <section id="program-context" className="py-16 sm:py-24 border-t border-border bg-card/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
              Program Context
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              How this supports Applied AI Works Canada.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              A shared instrument used across the program to help participants, facilitators, and program leads work from the same understanding of cognitive style and AI-readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                icon: GraduationCap,
                label: 'For participants',
                body: 'Identify how you process information, where you learn best, and where AI tools fit into your workflow.',
              },
              {
                icon: Users,
                label: 'For facilitators',
                body: 'Understand cohort patterns and where individuals may benefit from additional support or differentiated guidance.',
              },
              {
                icon: Layers,
                label: 'For the program',
                body: 'A shared language for cognitive style, learning preferences, and AI-readiness across every cohort.',
              },
            ].map((col) => (
              <div key={col.label} className="bg-background p-7 sm:p-8">
                <col.icon className="w-5 h-5 text-muted-foreground mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-base font-medium text-foreground mb-2">{col.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground/70 text-xs sm:text-sm italic text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            This is a structured self-assessment, not a clinical diagnostic tool. It does not diagnose ADHD, autism, learning disabilities, or mental health conditions.
          </p>
        </div>
      </section>

      {/* What You Get After the Assessment */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
              Personalized Synthesis
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              What you get after the assessment.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Once your modules are complete, your responses are synthesized into a structured profile you can reflect on, share, and apply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: BookOpen,
                title: 'Documented Thinking Styles',
                body: 'See which documented thinking styles align with yours — for reflection, not comparison.',
                meta: 'Reflective benchmark',
              },
              {
                icon: FileText,
                title: 'Practitioner-Ready Summary',
                body: 'A structured summary you can share with a coach, mentor, or clinician.',
                meta: 'Export-ready format',
              },
              {
                icon: MessageCircle,
                title: 'Ask About Your Profile',
                body: 'Explore what your profile means for your work, learning, and AI workflows.',
                meta: 'Conversational guidance',
              },
            ].map((card) => (
              <div key={card.title} className="p-7 bg-card border border-border rounded-md">
                <card.icon className="w-5 h-5 text-muted-foreground mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-base font-medium text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{card.body}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">{card.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 sm:py-24 border-y border-border bg-card/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
              Scientific Foundation
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              Built on established instruments.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Each module draws on peer-reviewed frameworks from cognitive psychology, psychometrics, and applied learning research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border bg-background">
            {[
              { title: 'Big Five Model', description: 'The most validated personality framework in modern psychology.' },
              { title: "Raven's Matrices", description: 'Non-verbal assessment of fluid reasoning used globally.' },
              { title: 'ASRS-v1.1', description: 'WHO instrument for attention-pattern self-report.' },
              { title: 'Cognitive Load Theory', description: 'How information is processed under demand.' },
            ].map((item) => (
              <div key={item.title} className="p-7">
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 mb-2">Reference</p>
                <h3 className="font-serif text-base font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-px bg-border mx-auto mb-6" />
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
            Begin
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            Ready to begin your profile?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
            Start with any module — your profile builds as you complete each one.
          </p>
          <Button
            onClick={onStart}
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 py-5 text-sm"
          >
            Start the assessment
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <HomeFAQ />

      {/* Footer */}
      <SEOFooter />
    </div>
  );
};
