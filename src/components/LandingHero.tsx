import { motion } from 'framer-motion';
import { ArrowRight, FileText, MessageCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, SelectableTestKey } from '@/data/assessmentTypes';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { HeadTreeMark } from '@/components/HeadTreeMark';
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
import { ProfileIdentifiesSection } from '@/components/ProfileIdentifiesSection';
import { WhyThisMattersSection } from '@/components/WhyThisMattersSection';
import { ProgramConnectionSection } from '@/components/ProgramConnectionSection';
import { DisclaimerSection } from '@/components/DisclaimerSection';
import { SampleProfilePreview } from '@/components/landing/SampleProfilePreview';
import { JourneyStageChip } from '@/components/landing/JourneyStageChip';
import { ProfileClaritySection } from '@/components/landing/ProfileClaritySection';
import { WhatYouLearnSection } from '@/components/landing/WhatYouLearnSection';
import { SampleReportPreview } from '@/components/landing/SampleReportPreview';
import { WhyThisMattersCompanion } from '@/components/landing/WhyThisMattersCompanion';
import { TrustBadgesRow } from '@/components/landing/TrustBadgesRow';


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
    'cognitive-profile': false,
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

  const scrollToIncludes = () => {
    document.getElementById('profile-includes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <img src="/favicon.png" alt="How Do I Think" className="w-9 h-9 rounded-md transition-transform group-hover:-rotate-3" />
            <span className="font-serif text-lg sm:text-xl font-medium text-navy-deep dark:text-cream tracking-tight">
              How Do I Think
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-foreground/80">
            <a href="#profile-includes" className="hover:text-teal transition-colors">About the Assessment</a>
            <a href="#modules" className="hover:text-teal transition-colors">For Organizations</a>
            <a href="#thinking-map" className="hover:text-teal transition-colors">Research</a>
            <a href="#faq" className="hover:text-teal transition-colors">About Us</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        {/* faint connected-dots backdrop, "mapping" motif */}
        <div
          aria-hidden
          className="absolute inset-0 -z-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(hsl(var(--teal) / 0.45) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage:
              'radial-gradient(ellipse at 70% 30%, black 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 70% 30%, black 30%, transparent 75%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Progress bar for returning users */}
          {hasStarted && (
            <div className="mb-8">
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

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
            {/* LEFT: copy + CTAs */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal/30 bg-teal-soft/60 dark:bg-teal-soft/30">
                <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-teal font-medium">
                  Cognitive &amp; Personality Self-Assessment
                </span>
              </span>

              <motion.h1
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.12] tracking-tight mt-5 mb-5"
              >
                <span className="text-navy-deep dark:text-cream">Understand how<br />you think =</span>
                <br />
                <span className="italic">
                  <span className="text-navy-deep dark:text-cream">Build</span>{' '}
                  <span className="text-teal">from your</span>{' '}
                  <span className="text-gold">strengths</span>
                  <span className="text-navy-deep dark:text-cream">.</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 }}
                className="text-ink-muted text-base sm:text-lg max-w-xl leading-relaxed"
              >
                A rigorous cognitive and personality profile designed to help you understand how you learn, solve problems, communicate, and make decisions — so you can align with roles and environments where you are most likely to thrive.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.16 }}
                className="flex items-start gap-3 mt-6 max-w-xl"
              >
                <HeadTreeMark className="w-9 h-9 text-navy-deep dark:text-cream flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">
                    Built to support clarity, growth, and better alignment.
                  </p>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    Identify your natural thinking preferences, uncover what drives your strengths, and make more confident choices about learning, work, and the environments where you do your best.
                  </p>
                </div>
              </motion.div>

              {/* Primary + Secondary CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-7">
                <Button
                  onClick={onStart}
                  size="lg"
                  className="bg-navy-deep text-cream hover:bg-navy font-medium px-7 py-5 text-sm group"
                >
                  Start the assessment
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Button
                  onClick={scrollToIncludes}
                  variant="outline"
                  size="lg"
                  className="border-navy-deep/30 text-foreground hover:bg-cream-warm font-medium px-7 py-5 text-sm"
                >
                  See what the profile includes
                </Button>
              </div>

              {!hasPremiumAccess && !hasStarted && (
                <p className="text-ink-muted/70 text-xs mt-5">
                  No sign-up required to begin · ~25 min total across modules
                </p>
              )}
            </div>

            {/* RIGHT: sample profile preview */}
            <div className="relative">
              <SampleProfilePreview />
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals row */}
      <TrustBadgesRow />

      {/* How the profile creates clarity — 4-step process */}
      <ProfileClaritySection />

      {/* What you'll learn — outcome chips */}
      <WhatYouLearnSection />


      {/* Stage 01 — What your profile includes */}
      <div id="profile-includes" className="scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 -mb-6 flex justify-center">
          <JourneyStageChip stage={1} label="What it covers" />
        </div>
        <ProfileIdentifiesSection />
      </div>

      {/* Stage 02 — How your thinking is mapped */}
      <div id="thinking-map" className="scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 -mb-6 flex justify-center">
          <JourneyStageChip stage={2} label="How it maps" />
        </div>
        <WhyThisMattersSection />
      </div>

      {/* Sample report preview */}
      <SampleReportPreview />

      {/* Why this matters — companion to the sample report */}
      <WhyThisMattersCompanion />

      {/* Stage 03 — Module picker */}
      <section id="modules" className="py-16 sm:py-24 border-t border-border scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center mb-8">
            <JourneyStageChip stage={3} label="Build your profile" />
          </div>
          <DiscoverMyMindSpine
            status={mapStatus}
            onStart={onSelectAssessment}
            onViewDashboard={onViewDashboard}
          />

          <SingleTestPicker onSelectTest={onSelectTest} />

          {hasStarted && completedCount < 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-4">
              <p className="text-ink-muted text-xs sm:text-sm">
                <span className="text-foreground font-medium">{completedCount} of 4 modules complete</span>
                {' '}— finish all four for your integrated profile.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stage 04 — Program connection */}
      <div className="scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 -mb-6 flex justify-center">
          <JourneyStageChip stage={4} label="Start with the right supports" />
        </div>
        <ProgramConnectionSection />
      </div>

      {/* What You Get After the Assessment */}
      <section className="py-16 sm:py-24 bg-cream-warm/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
              Personalized synthesis
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              What you get after the assessment.
            </h2>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
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
              <div key={card.title} className="p-7 bg-card border border-navy-deep/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <card.icon className="w-5 h-5 text-teal mb-5" strokeWidth={1.5} />
                <h3 className="font-serif text-base font-medium text-foreground mb-2">{card.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-4">{card.body}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold/80">{card.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 sm:py-24 border-y border-border bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.28em] text-teal mb-3">
              Scientific foundation
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              Built on established instruments.
            </h2>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
              Each module draws on peer-reviewed frameworks from cognitive psychology, psychometrics, and applied learning research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { title: 'Big Five Model', description: 'The most validated personality framework in modern psychology.' },
              { title: "Raven's Matrices", description: 'Non-verbal assessment of fluid reasoning used globally.' },
              { title: 'ASRS-v1.1', description: 'WHO instrument for attention-pattern self-report.' },
              { title: 'Cognitive Load Theory', description: 'How information is processed under demand.' },
            ].map((item) => (
              <div key={item.title} className="p-7 bg-card border border-navy-deep/10 rounded-2xl">
                <p className="text-[10px] uppercase tracking-[0.22em] text-teal mb-2">Reference</p>
                <h3 className="font-serif text-base font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <DisclaimerSection />

      {/* Footer CTA */}
      <section className="py-16 sm:py-24 bg-cream-warm/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-px bg-gold mx-auto mb-6" />
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
            Begin
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            Ready to begin your profile?
          </h2>
          <p className="text-ink-muted text-sm sm:text-base mb-8 leading-relaxed">
            Start with any module — your profile builds as you complete each one.
          </p>
          <Button
            onClick={onStart}
            size="lg"
            className="bg-navy-deep text-cream hover:bg-navy font-medium px-8 py-5 text-sm"
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
