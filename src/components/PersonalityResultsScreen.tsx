import { motion } from 'framer-motion';
import { PersonalityResults, personalityTraitLabels, PersonalityTrait } from '@/data/personalityQuestions';
import { Button } from '@/components/ui/button';
import { RotateCcw, Share2, UserCheck, Sparkles, Copy, Check, Linkedin } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface PersonalityResultsScreenProps {
  results: PersonalityResults;
  onRestart: () => void;
}

const traitColors: Record<PersonalityTrait, string> = {
  openness: '#A855F7',
  conscientiousness: '#3B82F6',
  extraversion: '#F59E0B',
  agreeableness: '#10B981',
  neuroticism: '#EC4899',
};

export const PersonalityResultsScreen = ({ results, onRestart }: PersonalityResultsScreenProps) => {
  const [copied, setCopied] = useState(false);

  const radarData = (Object.keys(results.scores) as PersonalityTrait[]).map((trait) => ({
    trait: personalityTraitLabels[trait].label,
    value: results.scores[trait],
    fullMark: 100,
  }));

  const handleShare = async () => {
    const shareText = `🧠 My Big Five Personality Profile

✨ Type: ${results.personalityType}

📊 Trait Scores:
• Openness: ${results.scores.openness}%
• Conscientiousness: ${results.scores.conscientiousness}%
• Extraversion: ${results.scores.extraversion}%
• Agreeableness: ${results.scores.agreeableness}%
• Emotional Stability: ${results.scores.neuroticism}%

${results.description}

Take the free assessment 👇
${window.location.origin}

#PersonalityTest #BigFive #SelfDiscovery`;

    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkedInShare = () => {
    const text = encodeURIComponent(`Just completed my Big Five Personality Assessment! 🧠

✨ Type: ${results.personalityType}

My dominant trait is ${personalityTraitLabels[results.dominantTrait].label}. Fascinating insights into how I work and relate to others.

Take the free assessment yourself 👇`);
    
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${text}`, '_blank');
  };

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
            Big Five Personality Results
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            <span className="text-gradient">{results.personalityType}</span>
          </h1>
        </motion.div>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-elevated rounded-2xl p-6 md:p-8 border border-primary/20 mb-8"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-wider mb-1">Your Profile</p>
              <h2 className="font-display text-2xl font-bold text-foreground">{results.personalityType}</h2>
            </div>
          </div>
          <p className="text-foreground text-lg leading-relaxed">{results.description}</p>
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

        {/* Trait Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <h3 className="font-display font-semibold text-lg mb-6">Trait Breakdown</h3>
          <div className="space-y-4">
            {(Object.keys(results.scores) as PersonalityTrait[]).map((trait, index) => {
              const score = results.scores[trait];
              const label = personalityTraitLabels[trait];
              const isHigh = score >= 60;
              
              return (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{label.label}</span>
                    <span className="font-bold text-foreground">{score}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-1">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: traitColors[trait] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isHigh ? label.high : label.low}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <h3 className="font-display font-semibold text-lg mb-4 text-center">Share Your Results</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={handleLinkedInShare} className="bg-[#0A66C2] hover:bg-[#004182]">
              <Linkedin className="w-4 h-4 mr-2" />
              Share on LinkedIn
            </Button>
            <Button onClick={handleShare} variant="outline">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Results'}
            </Button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Button onClick={onRestart} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Assessment
          </Button>
        </motion.div>
      </div>
    </div>
  );
};