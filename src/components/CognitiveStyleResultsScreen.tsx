import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  CognitiveStyleResults,
  dimensionLabels,
  processingStyleLabels,
  ThinkingDimension,
} from '@/data/cognitiveStyleQuestions';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { 
  RotateCcw, 
  Share2, 
  Brain, 
  Lightbulb, 
  AlertTriangle, 
  Briefcase, 
  BookOpen,
  MessageCircle,
  Users,
  Sparkles,
  LayoutDashboard,
  Crown,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CognitiveStyleResultsScreenProps {
  results: CognitiveStyleResults;
  onRestart: () => void;
  onViewDashboard?: () => void;
}

const dimensionColors: Record<ThinkingDimension, string> = {
  visual_spatial: 'hsl(190, 100%, 50%)',
  pattern_recognition: 'hsl(280, 100%, 70%)',
  hyperfocus: 'hsl(340, 100%, 60%)',
  divergent_thinking: 'hsl(252, 100%, 69%)',
  detail_orientation: 'hsl(45, 100%, 50%)',
  big_picture: 'hsl(160, 100%, 40%)',
};

export const CognitiveStyleResultsScreen = ({
  results,
  onRestart,
  onViewDashboard,
}: CognitiveStyleResultsScreenProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const radarData = results.dimensionScores.map((score) => ({
    dimension: dimensionLabels[score.dimension].label.split(' ')[0],
    value: score.percentage,
    fullMark: 100,
  }));

  const handleShare = async () => {
    const shareText = `🧠 My Cognitive Style: ${results.primaryProfile.name}\n\n"${results.primaryProfile.tagline}"\n\nTop Strengths:\n${results.insights.strengths.map(s => `• ${s}`).join('\n')}\n\nDiscover your thinking style!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Cognitive Style Profile',
          text: shareText,
        });
      } catch (err) {
        await navigator.clipboard.writeText(shareText);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border border-neon-purple/30 mb-4">
            <Brain className="w-4 h-4 text-neon-purple" />
            <span className="text-sm font-medium">Cognitive Style Profile</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Your Thinking Style Revealed
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Understanding how your mind naturally processes information
          </p>
        </motion.div>

        {/* Primary Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-elevated rounded-2xl p-6 md:p-8 border border-neon-purple/30 mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 text-neon-purple text-xs font-medium mb-3">
                  <Crown className="w-3 h-3" />
                  Primary Profile
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  {results.primaryProfile.name}
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  "{results.primaryProfile.tagline}"
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {results.primaryProfile.description}
            </p>

            {/* Neurodivergent Traits */}
            <div className="flex flex-wrap gap-2 mb-6">
              {results.primaryProfile.neurodivergentTraits.map((trait, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-medium border border-neon-cyan/20"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Famous Examples */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground mb-2">Notable minds with similar profiles:</p>
              <p className="text-sm font-medium">
                {results.primaryProfile.famousExamples.join(' • ')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Secondary Profile */}
        {results.secondaryProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated rounded-xl p-4 border border-border mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Secondary Influence</p>
                <p className="font-semibold">{results.secondaryProfile.name}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Processing Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="card-elevated rounded-xl p-4 border border-border mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-neon-pink" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Information Processing Style</p>
              <p className="font-semibold">{processingStyleLabels[results.processingStyle]}</p>
            </div>
          </div>
        </motion.div>

        {/* Dimension Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-6"
        >
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Cognitive Dimensions
          </h3>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="dimension" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
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

          {/* Dimension Breakdown */}
          <div className="grid gap-3 mt-4">
            {results.dimensionScores.map((score) => (
              <div key={score.dimension} className="flex items-center gap-3">
                <div className="w-32 text-xs text-muted-foreground truncate">
                  {dimensionLabels[score.dimension].label}
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: dimensionColors[score.dimension] }}
                  />
                </div>
                <div className="w-12 text-right text-sm font-semibold">
                  {score.percentage}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Insights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-4 mb-6"
        >
          {/* Strengths */}
          <div className="card-elevated rounded-xl p-5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-green-500" />
              <h4 className="font-semibold">Key Strengths</h4>
            </div>
            <ul className="space-y-2">
              {results.primaryProfile.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="card-elevated rounded-xl p-5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold">Growth Areas</h4>
            </div>
            <ul className="space-y-2">
              {results.primaryProfile.challenges.map((challenge, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          {/* Work Environment */}
          <div className="card-elevated rounded-xl p-5 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold">Optimal Environment</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {results.insights.workEnvironment}
            </p>
            <div className="flex flex-wrap gap-2">
              {results.primaryProfile.optimalEnvironments.slice(0, 3).map((env, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                  {env}
                </span>
              ))}
            </div>
          </div>

          {/* Learning Approach */}
          <div className="card-elevated rounded-xl p-5 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <h4 className="font-semibold">Learning Style</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {results.primaryProfile.learningApproach}
            </p>
          </div>
        </motion.div>

        {/* Communication Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-elevated rounded-xl p-5 border border-border mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-neon-cyan" />
            <h4 className="font-semibold">Communication Style</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {results.primaryProfile.communicationStyle}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Button
            variant="outline"
            onClick={handleShare}
            className="gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Profile
          </Button>
          
          {onViewDashboard && (
            <Button
              onClick={onViewDashboard}
              className="gap-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
            >
              <LayoutDashboard className="w-4 h-4" />
              View Full Dashboard
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={onRestart}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Take Another Assessment
          </Button>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto"
        >
          This assessment explores thinking patterns often associated with neurodivergent minds.
          It's designed for self-understanding, not clinical diagnosis.
        </motion.p>
      </div>
    </div>
  );
};
