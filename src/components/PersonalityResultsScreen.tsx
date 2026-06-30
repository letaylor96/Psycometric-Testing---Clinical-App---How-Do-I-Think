import { motion } from 'framer-motion';
import { PersonalityResults, personalityTraitLabels, PersonalityTrait, facetLabels, MBTIType } from '@/data/personalityQuestions';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, UserCheck, Sparkles, LayoutDashboard,
  Briefcase, MessageSquare, Crown, Zap, Users, Brain, Target, Shield, ChevronDown, ChevronUp,
  Puzzle, Heart, Lightbulb, Compass
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PremiumFeatureTeaser } from '@/components/PremiumFeatureTeaser';
import { SaveAssessmentButton } from '@/components/SaveAssessmentButton';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { InstallAppBanner } from '@/components/InstallAppBanner';
import { ShareableResultCard } from '@/components/ShareableResultCard';

interface PersonalityResultsScreenProps {
  results: PersonalityResults;
  answers?: number[];
  onRestart: () => void;
  onViewDashboard?: () => void;
}

const traitColors: Record<PersonalityTrait, string> = {
  openness: '#A855F7',
  conscientiousness: '#3B82F6',
  extraversion: '#F59E0B',
  agreeableness: '#10B981',
  neuroticism: '#EC4899',
};

export const PersonalityResultsScreen = ({ results, answers, onRestart, onViewDashboard }: PersonalityResultsScreenProps) => {
  const [expandedTrait, setExpandedTrait] = useState<PersonalityTrait | null>(null);

  const radarData = (Object.keys(results.scores) as PersonalityTrait[]).map((trait) => ({
    trait: personalityTraitLabels[trait].label,
    value: results.scores[trait],
    fullMark: 100,
  }));

  const shareText = `🧠 My Personality Profile

🎭 Archetype: ${results.personalityType}
"${results.archetype.tagline}"

🧩 MBTI Type: ${results.mbti.type} - ${results.mbti.name}
"${results.mbti.description}"

📊 OCEAN Profile:
• Openness: ${results.scores.openness}%
• Conscientiousness: ${results.scores.conscientiousness}%
• Extraversion: ${results.scores.extraversion}%
• Agreeableness: ${results.scores.agreeableness}%
• Emotional Stability: ${results.scores.neuroticism}%

${results.archetype.rarity}

Take the free assessment 👇

#WhoAmI #MBTI #BigFive #PersonalityTest`;

  const linkedInText = `Just discovered my personality profile: ${results.mbti.type} (${results.mbti.name}) + ${results.personalityType} 🧠

"${results.archetype.tagline}"

${results.archetype.rarity} — joining the ranks of ${results.archetype.famousExamples.slice(0, 2).join(' and ')}.

Take the free assessment yourself!`;

  const twitterText = `Personality module: ${results.mbti.type} (${results.mbti.name}) 🎭 "${results.archetype.tagline}" — ${results.archetype.rarity}. Structured self-assessment for program guidance →`;

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <UserCheck className="w-4 h-4" />
            Your Personality Archetype
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            <span className="text-gradient">{results.personalityType}</span>
          </h1>
          <p className="text-muted-foreground text-lg italic">"{results.archetype.tagline}"</p>
        </motion.div>

        {/* Archetype Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-elevated rounded-2xl p-6 md:p-8 border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Crown className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="font-display text-2xl font-bold text-foreground">{results.personalityType}</h2>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                  {results.archetype.rarity}
                </span>
              </div>
              <p className="text-foreground/90 leading-relaxed">{results.archetype.description}</p>
            </div>
          </div>

          {/* Famous Examples */}
          <div className="mb-6">
            <p className="text-muted-foreground text-sm mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Notable people with this archetype:
            </p>
            <div className="flex flex-wrap gap-2">
              {results.archetype.famousExamples.map((name, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-medium">
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths & Blindspots */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Core Strengths
              </p>
              <ul className="space-y-2">
                {results.archetype.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Potential Blind Spots
              </p>
              <ul className="space-y-2">
                {results.archetype.blindSpots.map((blindSpot, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-accent mt-0.5">→</span>
                    {blindSpot}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* MBTI Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="card-elevated rounded-2xl p-6 md:p-8 border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
              <Puzzle className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-3xl font-bold text-accent">{results.mbti.type}</span>
                <h2 className="font-display text-xl font-bold text-foreground">{results.mbti.name}</h2>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{results.mbti.nickname}</p>
              <p className="text-foreground/90 leading-relaxed">{results.mbti.description}</p>
            </div>
          </div>

          {/* MBTI Dimensions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {Object.entries(results.mbti.dimensions).map(([key, dim]) => (
              <div key={key} className="p-3 rounded-xl bg-background/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold font-mono text-accent">{dim.letter}</span>
                  <span className="text-sm font-medium text-muted-foreground">{dim.score}%</span>
                </div>
                <p className="text-xs text-foreground/70">{dim.label}</p>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.score}%` }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* MBTI Strengths & Challenges */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm font-semibold text-accent mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                MBTI Strengths
              </p>
              <ul className="space-y-2">
                {results.mbti.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-accent mt-0.5">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Growth Areas
              </p>
              <ul className="space-y-2">
                {results.mbti.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5">→</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Famous Examples & Career Paths */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground text-sm mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Famous {results.mbti.type}s:
              </p>
              <div className="flex flex-wrap gap-2">
                {results.mbti.famousExamples.map((name, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Ideal Career Paths:
              </p>
              <div className="flex flex-wrap gap-2">
                {results.mbti.careerPaths.map((career, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Compatibility */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-muted-foreground text-sm mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Most Compatible Types:
            </p>
            <div className="flex flex-wrap gap-2">
              {results.mbti.compatibility.map((type, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold font-mono border border-primary/20">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <h3 className="font-display font-semibold text-lg mb-4 text-center">Your OCEAN Profile</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="trait" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
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
        </motion.div>

        {/* Trait Breakdown with Facets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <h3 className="font-display font-semibold text-lg mb-2">Deep Trait Analysis</h3>
          <p className="text-muted-foreground text-sm mb-6">Click each trait to explore its 6 underlying facets</p>
          
          <div className="space-y-4">
            {results.traitInsights.map((insight, index) => {
              const isExpanded = expandedTrait === insight.trait;
              const label = personalityTraitLabels[insight.trait];
              
              return (
                <motion.div
                  key={insight.trait}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  {/* Trait Header - Clickable */}
                  <button
                    onClick={() => setExpandedTrait(isExpanded ? null : insight.trait)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{label.label}</span>
                        <span className="font-bold text-foreground">{insight.score}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: traitColors[insight.trait] }}
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.score}%` }}
                          transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Facet Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-4 pb-4 border-t border-border"
                    >
                      {/* Interpretation */}
                      <p className="text-foreground/80 text-sm my-4 leading-relaxed">
                        {insight.interpretation}
                      </p>

                      {/* Facet Scores */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          Facet Breakdown
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {insight.facets.map((facet) => (
                            <div 
                              key={facet.facet}
                              className="p-3 rounded-lg bg-muted/30 border border-border/50"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-foreground">{facet.label}</span>
                                <span className="text-xs font-bold" style={{ color: traitColors[insight.trait] }}>
                                  {facet.score}%
                                </span>
                              </div>
                              <div className="h-1 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full"
                                  style={{ 
                                    width: `${facet.score}%`,
                                    backgroundColor: traitColors[insight.trait],
                                    opacity: 0.7
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strengths & Challenges */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-primary mb-2">Strengths</p>
                          <ul className="space-y-1">
                            {insight.strengths.map((s, i) => (
                              <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                                <span className="text-primary">✓</span>{s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-accent mb-2">Growth Areas</p>
                          <ul className="space-y-1">
                            {insight.challenges.map((c, i) => (
                              <li key={i} className="text-xs text-foreground/70 flex items-start gap-1.5">
                                <span className="text-accent">→</span>{c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Professional Insights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Career Fit */}
          <div className="card-elevated rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Career Fit</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {results.careerFit.map((career, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>

          {/* Leadership Style */}
          <div className="card-elevated rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg">Leadership Style</h3>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">{results.leadershipStyle}</p>
          </div>

          {/* Communication Style */}
          <div className="card-elevated rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-neon-cyan" />
              </div>
              <h3 className="font-display font-semibold text-lg">Communication Style</h3>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">{results.communicationStyle}</p>
          </div>

          {/* Stress Response */}
          <div className="card-elevated rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-pink/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-neon-pink" />
              </div>
              <h3 className="font-display font-semibold text-lg">Under Pressure</h3>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">{results.stressResponse}</p>
          </div>
        </motion.div>

        {/* Premium Features Teaser */}
        <PremiumFeatureTeaser className="mb-8" />

        {/* Shareable Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <h3 className="font-display font-semibold text-lg mb-4 text-center">Share Your Archetype</h3>
          <div className="flex justify-center">
            <ShareableResultCard
              variant="personality"
              personalityType={results.personalityType}
              mbtiType={results.mbti.type}
              mbtiName={results.mbti.name}
              tagline={results.archetype.tagline}
              rarity={results.archetype.rarity}
              traits={(Object.keys(results.scores) as PersonalityTrait[]).map((trait) => ({
                label: personalityTraitLabels[trait].label,
                value: results.scores[trait],
                color: traitColors[trait],
              }))}
              shareText={shareText}
              linkedInText={linkedInText}
              twitterText={twitterText}
            />
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {answers && (
            <SaveAssessmentButton
              assessmentType="personality"
              answers={answers}
              results={results}
            />
          )}
          <Button onClick={onRestart} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Assessment
          </Button>
          {onViewDashboard && (
            <Button onClick={onViewDashboard} size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              View Full Dashboard
            </Button>
          )}
        </motion.div>

        <InstallAppBanner className="max-w-3xl mx-auto" />

        {/* Legal Disclaimer */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted-foreground mt-10 max-w-lg mx-auto leading-relaxed"
        >
          <strong className="text-muted-foreground/80">Educational & Entertainment Purposes Only.</strong>{' '}
          This personality assessment is for self-reflection and entertainment. It does not constitute psychological 
          evaluation or professional advice. Results should not be used for employment, clinical, or legal decisions. 
          For professional personality assessment, consult a licensed psychologist.
        </motion.p>
      </div>
    </div>
  );
};
