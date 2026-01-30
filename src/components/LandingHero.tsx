import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, ArrowRight, Check, ChevronRight, Atom, FlaskConical, Target, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentType, assessmentInfo, allAssessmentTypes } from '@/data/assessmentTypes';
import { AssessmentProgress } from '@/components/AssessmentProgress';
import { AuthButton } from '@/components/AuthButton';
import { TestResults } from '@/data/quizQuestions';
import { PersonalityResults } from '@/data/personalityQuestions';
import { ADHDResults } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';

interface LandingHeroProps {
  onStart: () => void;
  onSelectAssessment: (type: AssessmentType) => void;
  onViewDashboard?: () => void;
  iqResults?: TestResults | null;
  personalityResults?: PersonalityResults | null;
  adhdResults?: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
}

const assessmentIcons: Record<AssessmentType, React.ElementType> = {
  personality: Target,
  iq: Brain,
  cognitive: Network,
  adhd: Atom,
};

const researchLabels: Record<AssessmentType, string> = {
  personality: 'Big Five / OCEAN Model',
  iq: "Raven's Progressive Matrices",
  cognitive: 'Dual-Process Theory',
  adhd: 'ASRS-v1.1 Clinical Scale',
};

export const LandingHero = ({ 
  onStart, 
  onSelectAssessment, 
  onViewDashboard,
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
}: LandingHeroProps) => {
  const completionStatus: Record<AssessmentType, boolean> = {
    personality: !!personalityResults,
    iq: !!iqResults,
    cognitive: !!cognitiveStyleResults,
    adhd: !!adhdResults,
  };

  const completedCount = Object.values(completionStatus).filter(Boolean).length;
  const hasStarted = completedCount > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden bg-background">
      {/* Auth Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <AuthButton />
      </div>

      {/* Scientific Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent rounded-full blur-[100px]" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating molecular nodes */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* Scattered dots representing data points */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${10 + (i * 4.5) % 90}%`}
              cy={`${15 + (i * 7.3) % 70}%`}
              r={2 + (i % 3)}
              fill="url(#nodeGradient)"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10 max-w-5xl w-full"
      >
        {/* Progress Indicator */}
        <AssessmentProgress
          iqResults={iqResults ?? null}
          personalityResults={personalityResults ?? null}
          adhdResults={adhdResults ?? null}
          cognitiveStyleResults={cognitiveStyleResults ?? null}
          onSelectAssessment={onSelectAssessment}
          onViewDashboard={onViewDashboard}
        />

        {/* Research Institution Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm">
            <FlaskConical className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Cognitive Assessment Laboratory
            </span>
          </div>
        </motion.div>

        {/* Title with scientific typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.0]">
            <span className="block text-foreground">How Do I</span>
            <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent mt-2">
              Think?
            </span>
          </h1>
        </motion.div>

        {/* Scientific subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            A comprehensive psychometric analysis of your cognitive architecture, personality structure, and neurological processing patterns.
          </p>
        </motion.div>

        {/* Research Framework Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {['Big Five Factor Model', 'Fluid Intelligence (Gf)', 'Executive Function', 'Attentional Control'].map((framework, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/30 border border-border/30"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="text-muted-foreground text-xs font-medium tracking-wide">{framework}</span>
            </div>
          ))}
        </motion.div>

        {/* Assessment Grid - Scientific Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          {allAssessmentTypes.map((type, i) => {
            const info = assessmentInfo[type];
            const Icon = assessmentIcons[type];
            const research = researchLabels[type];
            const isCompleted = completionStatus[type];
            
            return (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAssessment(type)}
                className={`relative group p-5 rounded-xl border backdrop-blur-sm transition-all text-left cursor-pointer ${
                  isCompleted 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : 'border-border/40 bg-card/40 hover:border-primary/30 hover:bg-card/60'
                }`}
              >
                {/* Completion indicator */}
                {isCompleted && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                  </div>
                )}

                <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all ${
                  isCompleted 
                    ? 'bg-emerald-500/10' 
                    : 'bg-primary/5 group-hover:bg-primary/10'
                }`}>
                  <Icon className={`w-5 h-5 ${isCompleted ? 'text-emerald-400' : 'text-primary/70 group-hover:text-primary'}`} />
                </div>
                
                <h3 className="font-semibold text-foreground mb-1 text-sm">{info.title}</h3>
                <p className="text-primary/60 text-xs font-medium mb-3">{research}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground/60 text-xs">
                    {info.questionCount} items • {info.timeMinutes} min
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isCompleted ? 'text-emerald-400/50' : 'text-muted-foreground/30 group-hover:text-primary/50 group-hover:translate-x-0.5'
                  }`} />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onStart}
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base px-8 py-6 rounded-lg transition-all"
            >
              {hasStarted ? 'Continue Assessment' : 'Begin Free Assessment'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              onClick={onStart}
              size="lg"
              variant="outline"
              className="group border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-medium text-base px-8 py-6 rounded-lg transition-all"
            >
              Full Premium Analysis
              <Sparkles className="w-4 h-4 ml-2 text-primary" />
            </Button>
          </div>
          
          <p className="text-muted-foreground/60 text-sm mt-4 max-w-md mx-auto">
            {hasStarted 
              ? `${completedCount} of 4 assessments complete` 
              : 'Basic analysis included • Premium unlocks detailed insights'
            }
          </p>
        </motion.div>

        {/* Incomplete profile notice */}
        {hasStarted && completedCount < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-10 max-w-lg mx-auto"
          >
            <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-medium">Multi-dimensional analysis available:</span>{' '}
                Complete all four assessments to receive cross-domain cognitive insights and your integrated profile report.
              </p>
            </div>
          </motion.div>
        )}

        {/* Scientific Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-8 border-t border-border/20"
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground/50 text-xs uppercase tracking-wider font-medium">
              Methodological Framework
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/40 text-xs">
              {[
                { label: 'OCEAN / Big Five', detail: 'Personality Structure' },
                { label: "Raven's Matrices", detail: 'Fluid Intelligence' },
                { label: 'ASRS-v1.1', detail: 'Attentional Screening' },
                { label: 'Cognitive Load Theory', detail: 'Processing Patterns' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-muted-foreground/60 font-medium">{item.label}</span>
                  <span className="text-muted-foreground/30 text-[10px]">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
