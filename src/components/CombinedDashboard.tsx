import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TestResults, categoryLabels, divergentLabels, CognitiveCategory } from '@/data/quizQuestions';
import { PersonalityResults, PersonalityTrait, personalityTraitLabels } from '@/data/personalityQuestions';
import { ADHDResults, adhdDomainLabels } from '@/data/adhdQuestions';
import { CognitiveStyleResults } from '@/data/cognitiveStyleQuestions';
import { 
  RotateCcw, 
  Brain, 
  Users, 
  Activity, 
  CheckCircle, 
  Circle, 
  TrendingUp,
  Award,
  Target,
  Sparkles,
  Download,
  Share2,
  Crown,
  Briefcase,
  Zap
} from 'lucide-react';
import { CareerMatchRecommendations } from './CareerMatchRecommendations';
import { HistoricalThinkerMatch } from './HistoricalThinkerMatch';
import { TherapistReport } from './TherapistReport';
import { AskAIAboutResults } from './AskAIAboutResults';
import { BlindSpotAnalysis } from './BlindSpotAnalysis';
import { PeerComparison } from './PeerComparison';
import { WhenYourMindWorksBest } from './WhenYourMindWorksBest';
import { CognitiveFrictionAlerts } from './CognitiveFrictionAlerts';
import { WeeklyCheckIn } from './WeeklyCheckIn';
import { ExportableOnePager } from './ExportableOnePager';
import { cn } from '@/lib/utils';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { PopulationComparison } from './PopulationComparison';

interface CombinedDashboardProps {
  iqResults: TestResults | null;
  personalityResults: PersonalityResults | null;
  adhdResults: ADHDResults | null;
  cognitiveStyleResults?: CognitiveStyleResults | null;
  onRestart: () => void;
  onTakeAssessment: (type: 'iq' | 'personality' | 'adhd' | 'cognitive') => void;
}

const getIQPercentile = (iq: number): number => {
  // Standard normal distribution percentiles for IQ
  if (iq >= 145) return 99.9;
  if (iq >= 140) return 99.6;
  if (iq >= 135) return 99;
  if (iq >= 130) return 98;
  if (iq >= 125) return 95;
  if (iq >= 120) return 91;
  if (iq >= 115) return 84;
  if (iq >= 110) return 75;
  if (iq >= 105) return 63;
  if (iq >= 100) return 50;
  if (iq >= 95) return 37;
  if (iq >= 90) return 25;
  if (iq >= 85) return 16;
  return 10;
};

const getIQClassification = (iq: number): string => {
  if (iq >= 145) return 'Genius';
  if (iq >= 130) return 'Very Superior';
  if (iq >= 120) return 'Superior';
  if (iq >= 110) return 'High Average';
  if (iq >= 90) return 'Average';
  if (iq >= 80) return 'Low Average';
  return 'Below Average';
};

// Colors for the new cognitive categories
const categoryColors: Record<CognitiveCategory, string> = {
  number_sequence: 'hsl(190, 100%, 50%)',  // Cyan
  shape_pattern: 'hsl(45, 100%, 50%)',     // Gold
  matrix: 'hsl(252, 100%, 69%)',           // Purple
  spatial: 'hsl(340, 100%, 60%)',          // Pink
  abstract: 'hsl(160, 100%, 40%)',         // Teal
};

export const CombinedDashboard = ({
  iqResults,
  personalityResults,
  adhdResults,
  cognitiveStyleResults,
  onRestart,
  onTakeAssessment,
}: CombinedDashboardProps) => {
  const [isPremiumCareer, setIsPremiumCareer] = useState(false);
  const completedCount = [iqResults, personalityResults, adhdResults, cognitiveStyleResults].filter(Boolean).length;
  const totalAssessments = 4;

  // Prepare cognitive radar data with new categories
  const cognitiveRadarData = iqResults?.categoryScores.map((cat) => ({
    trait: categoryLabels[cat.category],
    value: cat.percentage,
    fullMark: 100,
  })) || [];

  // Prepare personality radar data
  const personalityRadarData = personalityResults
    ? (Object.entries(personalityResults.scores) as [PersonalityTrait, number][]).map(([trait, score]) => ({
        trait: personalityTraitLabels[trait].label,
        value: score,
        fullMark: 100,
      }))
    : [];

  // Prepare divergent thinking bar data
  const divergentBarData = iqResults?.divergentProfile.map((dim) => ({
    name: divergentLabels[dim.dimension].label,
    value: dim.percentage,
  })) || [];

  const barColors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(252, 100%, 69%)', 'hsl(170, 100%, 50%)'];

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Cognitive Intelligence Dashboard
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Your Complete Profile
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive view of your cognitive abilities, personality archetypes, and attention patterns
          </p>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Assessment Progress</h2>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {totalAssessments} completed
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* IQ Assessment */}
            <div 
              className={cn(
                'rounded-xl p-4 border transition-all cursor-pointer hover:border-primary/50',
                iqResults ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border'
              )}
              onClick={() => !iqResults && onTakeAssessment('iq')}
            >
              <div className="flex items-center gap-3 mb-2">
                {iqResults ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium">IQ & Cognitive</span>
              </div>
              {iqResults ? (
                <p className="text-sm text-muted-foreground">Score: {iqResults.iq} IQ</p>
              ) : (
                <Button variant="ghost" size="sm" className="mt-1 h-7 px-2 text-xs">
                  Take Assessment →
                </Button>
              )}
            </div>

            {/* Personality Assessment */}
            <div 
              className={cn(
                'rounded-xl p-4 border transition-all cursor-pointer hover:border-accent/50',
                personalityResults ? 'bg-accent/5 border-accent/20' : 'bg-muted/30 border-border'
              )}
              onClick={() => !personalityResults && onTakeAssessment('personality')}
            >
              <div className="flex items-center gap-3 mb-2">
                {personalityResults ? (
                  <CheckCircle className="w-5 h-5 text-accent" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <Users className="w-5 h-5 text-accent" />
                <span className="font-medium">Personality</span>
              </div>
              {personalityResults ? (
                <p className="text-sm text-muted-foreground">{personalityResults.personalityType}</p>
              ) : (
                <Button variant="ghost" size="sm" className="mt-1 h-7 px-2 text-xs">
                  Take Assessment →
                </Button>
              )}
            </div>

            {/* ADHD Screening */}
            <div 
              className={cn(
                'rounded-xl p-4 border transition-all cursor-pointer hover:border-yellow-500/50',
                adhdResults ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-muted/30 border-border'
              )}
              onClick={() => !adhdResults && onTakeAssessment('adhd')}
            >
              <div className="flex items-center gap-3 mb-2">
                {adhdResults ? (
                  <CheckCircle className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
                <Activity className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">ADHD Screening</span>
              </div>
              {adhdResults ? (
                <p className="text-sm text-muted-foreground capitalize">{adhdResults.likelihood} likelihood</p>
              ) : (
                <Button variant="ghost" size="sm" className="mt-1 h-7 px-2 text-xs">
                  Take Assessment →
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* IQ Results Card - Updated with new categories */}
          {iqResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="card-elevated rounded-2xl p-6 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Pattern Recognition IQ</h3>
                  <p className="text-xs text-muted-foreground">Mensa-Style Assessment</p>
                </div>
              </div>

              {/* IQ Score Display */}
              <div className="text-center mb-6">
                <div className="inline-flex items-baseline gap-1">
                  <span className="font-display text-6xl font-bold text-primary">{iqResults.iq}</span>
                  <span className="text-xl text-muted-foreground">IQ</span>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <span className="text-sm font-medium text-foreground">{getIQClassification(iqResults.iq)}</span>
                  <span className="text-sm text-muted-foreground">Top {(100 - getIQPercentile(iqResults.iq)).toFixed(1)}%</span>
                </div>
              </div>

              {/* Cognitive Radar Chart with new categories */}
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={cognitiveRadarData}>
                    <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                    <PolarAngleAxis 
                      dataKey="trait" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown */}
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                {iqResults.categoryScores.map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{categoryLabels[cat.category]}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${cat.percentage}%`,
                            backgroundColor: categoryColors[cat.category]
                          }}
                        />
                      </div>
                      <span className="font-medium text-foreground w-10 text-right">{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Primary Strength:</span>
                  <span className="font-medium text-foreground">{categoryLabels[iqResults.primaryStrength]}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Personality Archetype Card - Enhanced */}
          {personalityResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="card-elevated rounded-2xl p-6 border border-accent/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Personality Archetype</h3>
                  <p className="text-xs text-muted-foreground">IPIP-NEO + Jungian Analysis</p>
                </div>
              </div>

              {/* Archetype Display */}
              <div className="text-center mb-4">
                <h4 className="font-display text-2xl font-bold text-accent mb-1">
                  {personalityResults.personalityType}
                </h4>
                <p className="text-sm text-muted-foreground italic mb-2">
                  "{personalityResults.archetype.tagline}"
                </p>
                <span className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  {personalityResults.archetype.rarity}
                </span>
              </div>

              {/* Famous Examples */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Notable examples:</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {personalityResults.archetype.famousExamples.slice(0, 3).map((name, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-muted text-foreground text-xs">
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Personality Radar Chart */}
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={personalityRadarData}>
                    <PolarGrid stroke="hsl(var(--muted-foreground))" strokeOpacity={0.2} />
                    <PolarAngleAxis 
                      dataKey="trait" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 8 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(var(--accent))"
                      fill="hsl(var(--accent))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Career Fit Preview */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <span className="text-muted-foreground">Career Fit:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {personalityResults.careerFit.slice(0, 3).map((career, i) => (
                    <span key={i} className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Divergent Thinking Card */}
          {iqResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="card-elevated rounded-2xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Divergent Thinking</h3>
                  <p className="text-xs text-muted-foreground">Creative Intelligence Profile</p>
                </div>
              </div>

              {/* Divergent Type */}
              <div className="text-center mb-6">
                <h4 className="font-display text-2xl font-bold text-purple-500 mb-2">
                  {iqResults.divergentType}
                </h4>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {iqResults.divergentDescription.slice(0, 120)}...
                </p>
              </div>

              {/* Divergent Bar Chart */}
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={divergentBarData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {divergentBarData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* ADHD Results Card */}
          {adhdResults && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="card-elevated rounded-2xl p-6 border border-yellow-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Attention Profile</h3>
                  <p className="text-xs text-muted-foreground">ASRS-v1.1 Screening</p>
                </div>
              </div>

              {/* ADHD Likelihood */}
              <div className="text-center mb-6">
                <div className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-2',
                  adhdResults.likelihood === 'low' && 'bg-emerald-500/10 text-emerald-500',
                  adhdResults.likelihood === 'moderate' && 'bg-yellow-500/10 text-yellow-500',
                  adhdResults.likelihood === 'high' && 'bg-orange-500/10 text-orange-500'
                )}>
                  {adhdResults.likelihood === 'low' && <CheckCircle className="w-4 h-4" />}
                  {adhdResults.likelihood === 'moderate' && <TrendingUp className="w-4 h-4" />}
                  {adhdResults.likelihood === 'high' && <Activity className="w-4 h-4" />}
                  <span className="capitalize">{adhdResults.likelihood} Likelihood</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {adhdResults.totalPositiveSymptoms} of 18 symptoms above threshold
                </p>
              </div>

              {/* Domain Scores */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">{adhdDomainLabels.inattention}</span>
                    <span className="font-medium">{adhdResults.inattentionPositive} symptoms</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(adhdResults.inattentionPositive / 9) * 100}%` }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">{adhdDomainLabels.hyperactivity}</span>
                    <span className="font-medium">{adhdResults.hyperactivityPositive} symptoms</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(adhdResults.hyperactivityPositive / 9) * 100}%` }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Part A Score: {adhdResults.partAScore}/6 
                  {adhdResults.partAThreshold ? ' (Above screening threshold)' : ' (Below threshold)'}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Population Comparison Section */}
        <PopulationComparison
          iqResults={iqResults}
          personalityResults={personalityResults}
          adhdResults={adhdResults}
        />

        {/* Career Match Recommendations - Premium Feature */}
        <CareerMatchRecommendations
          context={{
            iqResults,
            personalityResults,
            adhdResults,
            cognitiveStyleResults
          }}
          isPremium={isPremiumCareer}
          onUnlockPremium={() => {
            // TODO: Integrate with payment flow
            setIsPremiumCareer(true);
          }}
        />

        {/* When Your Mind Works Best - Dynamic Insights */}
        {(iqResults || personalityResults || adhdResults || cognitiveStyleResults) && (
          <WhenYourMindWorksBest
            iqResults={iqResults}
            personalityResults={personalityResults}
            adhdResults={adhdResults}
            cognitiveStyleResults={cognitiveStyleResults}
            className="mb-8"
          />
        )}

        {/* Cognitive Friction Alerts - Inner Coach */}
        {(iqResults || personalityResults || adhdResults || cognitiveStyleResults) && (
          <CognitiveFrictionAlerts
            iqResults={iqResults}
            personalityResults={personalityResults}
            adhdResults={adhdResults}
            cognitiveStyleResults={cognitiveStyleResults}
            className="mb-8"
          />
        )}

        {/* Blind Spot Analysis - Directly under score visualization */}
        {(iqResults || personalityResults || adhdResults || cognitiveStyleResults) && (
          <BlindSpotAnalysis
            iqResults={iqResults}
            personalityResults={personalityResults}
            adhdResults={adhdResults}
            cognitiveStyleResults={cognitiveStyleResults}
            className="mb-8"
          />
        )}

        {/* Weekly Cognitive Check-In */}
        <WeeklyCheckIn className="mb-8" />

        {/* AI Insight Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="card-elevated rounded-2xl p-6 border border-purple-500/20 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Unlock AI-Powered Insights</h3>
              <p className="text-xs text-muted-foreground">Deeper understanding of your cognitive profile</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Historical Match */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="text-3xl mb-3">👑</div>
              <h4 className="font-semibold mb-1">Historical Mind Match</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Discover which great minds from history share your cognitive patterns
              </p>
              <HistoricalThinkerMatch
                iqResults={iqResults}
                personalityResults={personalityResults}
                adhdResults={adhdResults}
                cognitiveStyleResults={cognitiveStyleResults}
              />
            </div>

            {/* Therapist Report */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-semibold mb-1">Therapist Report</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Generate a professional summary to share with your healthcare provider
              </p>
              <TherapistReport
                iqResults={iqResults}
                personalityResults={personalityResults}
                adhdResults={adhdResults}
                cognitiveStyleResults={cognitiveStyleResults}
              />
            </div>

            {/* Ask AI */}
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold mb-1">Ask AI</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with AI to understand what your results mean for your life
              </p>
              <AskAIAboutResults
                iqResults={iqResults}
                personalityResults={personalityResults}
                adhdResults={adhdResults}
                cognitiveStyleResults={cognitiveStyleResults}
              />
            </div>
          </div>
        </motion.div>

        {/* Peer Comparison Section */}
        {(iqResults || personalityResults || adhdResults || cognitiveStyleResults) && (
          <PeerComparison
            iqResults={iqResults}
            personalityResults={personalityResults}
            adhdResults={adhdResults}
            cognitiveStyleResults={cognitiveStyleResults}
            className="mb-8"
          />
        )}


        {completedCount === totalAssessments && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-elevated rounded-2xl p-8 border border-primary/20 mb-8"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.05))'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Complete Profile Unlocked</h3>
                <p className="text-sm text-muted-foreground">Your comprehensive cognitive portrait</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Cognitive Power</p>
                <p className="font-display text-3xl font-bold text-primary">{iqResults?.iq} IQ</p>
                <p className="text-xs text-muted-foreground">{getIQClassification(iqResults?.iq || 100)}</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10">
                <p className="text-sm text-muted-foreground mb-1">Personality Archetype</p>
                <p className="font-display text-lg font-bold text-accent">{personalityResults?.personalityType}</p>
                <p className="text-xs text-muted-foreground">{personalityResults?.archetype.rarity}</p>
              </div>
              <div className={cn(
                "text-center p-4 rounded-xl border",
                adhdResults?.likelihood === 'low' && 'bg-emerald-500/5 border-emerald-500/10',
                adhdResults?.likelihood === 'moderate' && 'bg-yellow-500/5 border-yellow-500/10',
                adhdResults?.likelihood === 'high' && 'bg-orange-500/5 border-orange-500/10'
              )}>
                <p className="text-sm text-muted-foreground mb-1">Attention Profile</p>
                <p className={cn(
                  'font-display text-lg font-bold capitalize',
                  adhdResults?.likelihood === 'low' && 'text-emerald-500',
                  adhdResults?.likelihood === 'moderate' && 'text-yellow-500',
                  adhdResults?.likelihood === 'high' && 'text-orange-500'
                )}>
                  {adhdResults?.likelihood} Risk
                </p>
                <p className="text-xs text-muted-foreground">ASRS Screening</p>
              </div>
            </div>

            {/* Key Strengths Summary */}
            {personalityResults && (
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">Your Key Strengths</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personalityResults.archetype.strengths.map((strength, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Exportable One-Pager */}
        {(iqResults || personalityResults || adhdResults || cognitiveStyleResults) && (
          <ExportableOnePager
            iqResults={iqResults}
            personalityResults={personalityResults}
            adhdResults={adhdResults}
            cognitiveStyleResults={cognitiveStyleResults}
            className="mb-8"
          />
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button onClick={onRestart} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          {completedCount === totalAssessments && (
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};
