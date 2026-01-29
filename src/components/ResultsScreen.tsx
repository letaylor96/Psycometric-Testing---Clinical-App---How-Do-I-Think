import { motion } from 'framer-motion';
import { Brain, RotateCcw, Share2, Sparkles, Target, TrendingUp, Clock, Award, Download, Linkedin, Copy, Check, Crown, Zap } from 'lucide-react';
import { TestResults, categoryLabels, divergentLabels, getIQInterpretation, getPercentile } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';
import { useState } from 'react';
import { CareerIntelligenceReport } from '@/components/CareerIntelligenceReport';
import { cn } from '@/lib/utils';

interface ResultsScreenProps {
  results: TestResults;
  onRestart: () => void;
  onViewDashboard?: () => void;
}

const categoryColors: Record<string, string> = {
  verbal: '#00FFFF',
  numerical: '#FF00AA',
  spatial: '#AA66FF',
  pattern: '#00D4FF',
  logical: '#FF66AA',
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const getIQTier = (iq: number): { tier: string; color: string; description: string; tagline: string } => {
  if (iq >= 145) return { tier: 'Genius', color: 'text-yellow-400', description: 'Top 0.1% globally', tagline: 'Your cognitive abilities are extraordinarily rare' };
  if (iq >= 140) return { tier: 'Exceptional', color: 'text-yellow-400', description: 'Top 0.4% globally', tagline: 'You think at a level few can match' };
  if (iq >= 130) return { tier: 'Superior', color: 'text-primary', description: 'Top 2% globally', tagline: 'Your mental horsepower is remarkable' };
  if (iq >= 120) return { tier: 'High', color: 'text-secondary', description: 'Top 9% globally', tagline: 'You process information faster than most' };
  if (iq >= 110) return { tier: 'Above Average', color: 'text-accent', description: 'Top 25% globally', tagline: 'Your thinking skills are stronger than average' };
  if (iq >= 90) return { tier: 'Average', color: 'text-foreground', description: 'Healthy baseline', tagline: 'Solid cognitive foundation across domains' };
  return { tier: 'Developing', color: 'text-foreground', description: 'Room for growth', tagline: 'Intelligence is malleable and can be developed' };
};

export const ResultsScreen = ({ results, onRestart, onViewDashboard }: ResultsScreenProps) => {
  const [copied, setCopied] = useState(false);
  
  const radarData = results.categoryScores.map((score) => ({
    category: categoryLabels[score.category].replace(' Intelligence', '').replace(' Reasoning', '').replace(' Awareness', '').replace(' Recognition', '').replace(' Thinking', ''),
    value: score.percentage,
    fullMark: 100,
  }));

  const divergentData = results.divergentProfile.map((profile) => ({
    name: divergentLabels[profile.dimension].label,
    value: profile.percentage,
  }));

  const iqTier = getIQTier(results.iq);
  const percentile = getPercentile(results.iq);

  const handleShare = async () => {
    const shareText = `🧠 My Cognitive Profile Results

📊 Cognitive Score: ${results.iq} (${iqTier.tier})
🏆 Percentile: Top ${100 - percentile}%
🎯 Primary Strength: ${categoryLabels[results.primaryStrength]}
✨ Executive Archetype: ${results.divergentType}

${results.divergentDescription}

Take the free assessment to discover your cognitive edge 👇
${window.location.origin}

#CognitiveAssessment #LeadershipDevelopment #PersonalGrowth`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Cognitive Profile', text: shareText });
      } catch (err) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLinkedInShare = () => {
    const text = encodeURIComponent(`Just completed my Cognitive Profile assessment! 🧠

📊 Score: ${results.iq} (${iqTier.tier} - Top ${100 - percentile}%)
✨ Archetype: ${results.divergentType}
🎯 Strength: ${categoryLabels[results.primaryStrength]}

Fascinating insights into how I think and solve problems. Try it yourself 👇`);
    
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - Direct Answer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-500/30 mb-6"
          >
            <Crown className="w-10 h-10 text-yellow-400" />
          </motion.div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border text-muted-foreground text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            IQ Assessment Complete
          </div>
          
          {/* The Big Answer */}
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Your IQ Score: <span className={cn("text-gradient", iqTier.color)}>{results.iq}</span>
          </h1>
          <p className={cn("text-xl font-semibold mb-2", iqTier.color)}>{iqTier.tier} Intelligence</p>
          <p className="text-lg text-muted-foreground">{iqTier.tagline}</p>
          
          <div className="flex items-center justify-center gap-3 text-muted-foreground flex-wrap mt-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Completed in {formatTime(results.timeUsed)}</span>
            </div>
            {results.timeBonusApplied && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="text-primary font-medium flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  Speed Bonus Applied!
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Hero Stats - Large IQ Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="card-elevated rounded-3xl p-8 md:p-10 border border-border relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - IQ Score */}
              <div className="text-center md:text-left">
                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Cognitive Score</p>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
                  className="mb-4"
                >
                  <span className="font-display text-8xl md:text-9xl font-bold text-gradient">{results.iq}</span>
                </motion.div>
                <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                  <span className={`font-display text-xl font-bold ${iqTier.color}`}>{iqTier.tier}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{iqTier.description}</span>
                </div>
                <p className="text-muted-foreground text-sm">{getIQInterpretation(results.iq)}</p>
              </div>

              {/* Right - Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-2xl p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground">Top {100 - percentile}%</p>
                  <p className="text-muted-foreground text-sm">Global Percentile</p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground">{results.totalCorrect}/{results.totalQuestions}</p>
                  <p className="text-muted-foreground text-sm">Correct Answers</p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground">{Math.round((results.totalCorrect / results.totalQuestions) * 100)}%</p>
                  <p className="text-muted-foreground text-sm">Accuracy Rate</p>
                </div>
                <div className="bg-muted/30 rounded-2xl p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-neon-pink" />
                  </div>
                  <p className="font-display text-lg font-bold text-foreground">{categoryLabels[results.primaryStrength].split(' ')[0]}</p>
                  <p className="text-muted-foreground text-sm">Top Strength</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Executive Archetype Card - Featured */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="card-elevated rounded-3xl p-8 border border-secondary/30 relative overflow-hidden bg-gradient-to-br from-secondary/5 to-transparent">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Your Executive Archetype</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">{results.divergentType}</h2>
              </div>
            </div>
            
            <p className="text-foreground text-lg leading-relaxed mb-6">{results.divergentDescription}</p>
            
            <div className="flex flex-wrap gap-2">
              {results.divergentProfile.slice(0, 2).map((profile) => (
                <span key={profile.dimension} className="px-4 py-2 rounded-full bg-muted/50 text-sm font-medium text-foreground">
                  {divergentLabels[profile.dimension].label}: {profile.percentage}%
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Two-column layout for charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Cognitive Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-elevated rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Cognitive Strengths</h3>
                <p className="text-muted-foreground text-sm">5-dimension analysis</p>
              </div>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-2 mt-4">
              {results.categoryScores.map((score, index) => (
                <motion.div
                  key={score.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: categoryColors[score.category] }}
                  />
                  <span className="text-xs text-muted-foreground flex-1">{categoryLabels[score.category]}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: categoryColors[score.category] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${score.percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs font-semibold w-8 text-right">{score.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divergent Thinking Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-elevated rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-neon-pink" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Creative Dimensions</h3>
                <p className="text-muted-foreground text-sm">Divergent thinking profile</p>
              </div>
            </div>

            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={divergentData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    width={70}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {divergentData.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={['#00FFFF', '#FF00AA', '#AA66FF', '#FFD700'][index]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {results.divergentProfile.map((profile) => (
                <div key={profile.dimension} className="text-center p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">{divergentLabels[profile.dimension].label}</p>
                  <p className="font-display font-bold text-foreground">{profile.percentage}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Career Intelligence Report - Premium Feature */}
        <CareerIntelligenceReport results={results} />

        {/* Share Section - LinkedIn focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="font-display text-xl font-semibold mb-2">Share Your Cognitive Profile</h3>
            <p className="text-muted-foreground text-sm">Let your network know about your cognitive strengths</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleLinkedInShare}
              className="bg-[#0A66C2] hover:bg-[#004182] text-white font-display font-semibold py-6 px-8 rounded-xl hover:scale-105 transition-all"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Share on LinkedIn
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 font-display font-semibold py-6 px-8 rounded-xl"
            >
              {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
              {copied ? 'Copied!' : 'Copy Results'}
            </Button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-muted-foreground/30 text-muted-foreground hover:bg-muted/30 font-display font-semibold py-6 px-8 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Assessment Again
          </Button>
          {onViewDashboard && (
            <Button
              onClick={onViewDashboard}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 font-display font-semibold py-6 px-8 rounded-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View Full Dashboard
            </Button>
          )}
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground/60 mt-10 max-w-lg mx-auto leading-relaxed"
        >
          <strong className="text-muted-foreground/80">Educational & Entertainment Purposes Only.</strong>{' '}
          This assessment is not a standardized IQ test and does not provide a clinical measure of intelligence. 
          Results are for self-reflection and entertainment, not professional, educational, or employment decisions. 
          A formal cognitive evaluation requires administration by a licensed psychologist.
        </motion.p>
      </div>
    </div>
  );
};
