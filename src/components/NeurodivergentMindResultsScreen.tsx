import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ThumbsDown,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NeurodivergentMindResults, processingStyleLabels, dimensionLabels } from '@/data/neurodivergentMindQuestions';
import { SaveAssessmentButton } from '@/components/SaveAssessmentButton';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface NeurodivergentMindResultsScreenProps {
  results: NeurodivergentMindResults;
  cognitiveAnswers?: number[];
  adhdAnswers?: number[];
  onRestart: () => void;
  onViewDashboard?: () => void;
}

const likelihoodConfig = {
  low: {
    label: 'Probably Not',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    icon: ThumbsDown,
    description: 'Your responses suggest neurotypical patterns',
  },
  moderate: {
    label: 'Possibly',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    icon: HelpCircle,
    description: 'Some neurodivergent traits present — professional evaluation may be helpful',
  },
  high: {
    label: 'Likely Yes',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    icon: Sparkles,
    description: 'Strong neurodivergent indicators — professional confirmation recommended',
  },
};

export const NeurodivergentMindResultsScreen = ({ 
  results, 
  cognitiveAnswers,
  adhdAnswers,
  onRestart,
  onViewDashboard 
}: NeurodivergentMindResultsScreenProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('cognitive');

  const { cognitiveStyle, adhd, integratedInsights } = results;
  const likelihoodInfo = likelihoodConfig[integratedInsights.neurodivergentLikelihood];
  const LikelihoodIcon = likelihoodInfo.icon;

  // Prepare radar chart data
  const radarData = cognitiveStyle.dimensionScores.map((score) => ({
    dimension: dimensionLabels[score.dimension].label.split(' ')[0],
    value: score.percentage,
    fullMark: 100,
  }));

  const shareText = `🧠 My Neurodivergence Level Profile

Cognitive Style: ${cognitiveStyle.primaryProfile.name}
Processing: ${processingStyleLabels[cognitiveStyle.processingStyle]}
Neurodivergent Likelihood: ${likelihoodInfo.label}

Build your cognitive style profile →`;

  const linkedInText = `Completed the Cognitive Style & Attention module 🧠

Cognitive Style: ${cognitiveStyle.primaryProfile.name}
Processing: ${processingStyleLabels[cognitiveStyle.processingStyle]}

A structured self-assessment for thinking patterns and program guidance.`;

  const twitterText = `Cognitive style: ${cognitiveStyle.primaryProfile.name} 🧠 Processing: ${processingStyleLabels[cognitiveStyle.processingStyle]}. Structured self-assessment →`;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Neurodivergence Level Assessment</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Cognitive Profile
          </h1>
          <p className="text-muted-foreground">
            A comprehensive view of how your mind works
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={cn(
            'rounded-2xl p-6 md:p-8 border-2 mb-6',
            likelihoodInfo.bgColor,
            likelihoodInfo.borderColor
          )}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center',
              likelihoodInfo.bgColor
            )}>
              <LikelihoodIcon className={cn('w-10 h-10', likelihoodInfo.color)} />
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-sm text-muted-foreground mb-1">Neurodivergent Likelihood</p>
              <h2 className={cn('text-3xl font-bold mb-2', likelihoodInfo.color)}>
                {likelihoodInfo.label}
              </h2>
              <p className="text-muted-foreground">{likelihoodInfo.description}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Cognitive Style</p>
              <p className="text-xl font-semibold text-foreground">{cognitiveStyle.primaryProfile.name}</p>
              <p className="text-sm text-purple-400">{processingStyleLabels[cognitiveStyle.processingStyle]}</p>
            </div>
          </div>
        </motion.div>

        {/* Integrated Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 mb-6"
        >
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
            Integrated Insights
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-sm font-medium text-purple-400 mb-1">Attentional Profile</p>
              <p className="text-foreground">{integratedInsights.attentionalProfile}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="text-sm font-medium text-emerald-400 mb-2">Cognitive Strengths</p>
                <ul className="space-y-1">
                  {integratedInsights.cognitiveStrengths.map((strength, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-emerald-400">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 rounded-xl bg-muted/30 border border-border">
                <p className="text-sm font-medium text-amber-400 mb-2">Key Recommendations</p>
                <ul className="space-y-1">
                  {integratedInsights.recommendations.slice(0, 3).map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-amber-400 mt-0.5">→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {integratedInsights.synergyInsights.length > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                <p className="text-sm font-medium text-purple-400 mb-2">Synergy Insights</p>
                {integratedInsights.synergyInsights.map((insight, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{insight}</p>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Expandable Sections */}
        <div className="space-y-4 mb-8">
          {/* Cognitive Style Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === 'cognitive' ? null : 'cognitive')}
              className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Cognitive Style Profile</h3>
                  <p className="text-sm text-muted-foreground">{cognitiveStyle.primaryProfile.name} • 6 dimensions analyzed</p>
                </div>
              </div>
              {expandedSection === 'cognitive' ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'cognitive' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-6">
                    {/* Radar Chart */}
                    <div className="h-64 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis dataKey="dimension" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar
                            name="Score"
                            dataKey="value"
                            stroke="hsl(280, 100%, 70%)"
                            fill="hsl(280, 100%, 70%)"
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Profile Description */}
                    <div className="p-4 rounded-xl bg-muted/30 border border-border mb-4">
                      <h4 className="font-semibold text-foreground mb-2">{cognitiveStyle.primaryProfile.name}</h4>
                      <p className="text-sm text-muted-foreground italic mb-3">"{cognitiveStyle.primaryProfile.tagline}"</p>
                      <p className="text-sm text-muted-foreground">{cognitiveStyle.primaryProfile.description}</p>
                    </div>
                    
                    {/* Dimension Scores */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {cognitiveStyle.dimensionScores.map((score) => (
                        <div key={score.dimension} className="p-3 rounded-lg bg-muted/20 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">{dimensionLabels[score.dimension].label}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${score.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground">{score.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ADHD Screening Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === 'adhd' ? null : 'adhd')}
              className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-violet-400" />
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">ADHD Screening (ASRS-v1.1)</h3>
                  <p className="text-sm text-muted-foreground">Clinical screening • {adhd.likelihood} likelihood</p>
                </div>
              </div>
              {expandedSection === 'adhd' ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'adhd' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-6">
                    {/* Domain Scores */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <p className="text-sm font-medium text-violet-400 mb-2">Inattention</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-violet-500 rounded-full"
                              style={{ width: `${Math.round((adhd.inattentionScore / (9 * 4)) * 100)}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-foreground">
                            {Math.round((adhd.inattentionScore / (9 * 4)) * 100)}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {adhd.inattentionPositive} positive indicators
                        </p>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-muted/30 border border-border">
                        <p className="text-sm font-medium text-pink-400 mb-2">Hyperactivity/Impulsivity</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pink-500 rounded-full"
                              style={{ width: `${Math.round((adhd.hyperactivityScore / (9 * 4)) * 100)}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-foreground">
                            {Math.round((adhd.hyperactivityScore / (9 * 4)) * 100)}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {adhd.hyperactivityPositive} positive indicators
                        </p>
                      </div>
                    </div>
                    
                    {/* Interpretation */}
                    <div className="p-4 rounded-xl bg-muted/30 border border-border mb-4">
                      <p className="text-sm text-muted-foreground">{adhd.interpretation}</p>
                    </div>
                    
                    {/* Recommendations */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Recommendations</p>
                      <ul className="space-y-2">
                        {adhd.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-violet-400 mt-0.5">→</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Disclaimer */}
                    <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-200/80">{adhd.disclaimer}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Social Share */}
          <div className="card-elevated rounded-2xl p-6 border border-border">
            <h3 className="font-display font-semibold text-lg mb-4 text-center">Share Your Profile</h3>
            <div className="flex justify-center">
              <SocialShareButtons
                shareText={shareText}
                linkedInText={linkedInText}
                twitterText={twitterText}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          {cognitiveAnswers && adhdAnswers && (
            <SaveAssessmentButton
              assessmentType="neurodivergent"
              answers={{ cognitiveAnswers, adhdAnswers }}
              results={{ cognitiveStyle: results.cognitiveStyle, adhd: results.adhd }}
            />
          )}
          
          {onViewDashboard && (
            <Button
              onClick={onViewDashboard}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white flex items-center gap-2"
            >
              View Full Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            onClick={onRestart}
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Take Another Assessment
          </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
