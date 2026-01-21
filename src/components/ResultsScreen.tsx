import { motion } from 'framer-motion';
import { Brain, RotateCcw, Share2, Sparkles, Target, TrendingUp, Clock } from 'lucide-react';
import { TestResults, categoryLabels, divergentLabels, getIQInterpretation } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';

interface ResultsScreenProps {
  results: TestResults;
  onRestart: () => void;
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

export const ResultsScreen = ({ results, onRestart }: ResultsScreenProps) => {
  const radarData = results.categoryScores.map((score) => ({
    category: categoryLabels[score.category].replace(' Intelligence', '').replace(' Reasoning', '').replace(' Awareness', '').replace(' Recognition', '').replace(' Thinking', ''),
    value: score.percentage,
    fullMark: 100,
  }));

  const divergentData = results.divergentProfile.map((profile) => ({
    name: divergentLabels[profile.dimension].label,
    value: profile.percentage,
  }));

  const handleShare = async () => {
    const shareText = `🧠 My Cognitive Profile:\n\n📊 IQ: ${results.iq}\n🎯 Primary Strength: ${categoryLabels[results.primaryStrength]}\n✨ Thinking Style: ${results.divergentType}\n\nTake the free assessment to discover yours!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Cognitive Profile', text: shareText });
      } catch (err) {
        navigator.clipboard.writeText(shareText);
      }
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Your Complete Profile
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Your <span className="text-gradient">Cognitive DNA</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Completed in {formatTime(results.timeUsed)}</span>
            {results.timeBonusApplied && (
              <span className="text-primary font-medium">⚡ Speed Bonus!</span>
            )}
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* IQ Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="card-elevated rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Estimated IQ</h3>
            </div>
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
              >
                <span className="font-display text-6xl font-bold text-gradient">{results.iq}</span>
              </motion.div>
              <p className="text-muted-foreground text-sm mt-2">{getIQInterpretation(results.iq)}</p>
              <div className="mt-4 flex justify-center gap-4 text-sm">
                <div className="text-center">
                  <p className="text-primary font-semibold">{results.totalCorrect}/{results.totalQuestions}</p>
                  <p className="text-muted-foreground text-xs">Correct</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center">
                  <p className="text-secondary font-semibold">{Math.round((results.totalCorrect / results.totalQuestions) * 100)}%</p>
                  <p className="text-muted-foreground text-xs">Accuracy</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divergent Thinker Type Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="card-elevated rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Your Thinking Style</h3>
            </div>
            <div className="text-center py-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="font-display text-2xl font-bold text-gradient mb-3">{results.divergentType}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{results.divergentDescription}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Cognitive Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">Cognitive Strengths</h3>
              <p className="text-muted-foreground text-sm">Your performance across 5 categories</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Radar Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="category" 
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

            {/* Category Breakdown */}
            <div className="space-y-3">
              {results.categoryScores.map((score, index) => (
                <motion.div
                  key={score.category}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryColors[score.category] }}
                  />
                  <span className="text-sm text-muted-foreground flex-1">{categoryLabels[score.category]}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: categoryColors[score.category] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${score.percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{score.percentage}%</span>
                  </div>
                </motion.div>
              ))}
              
              <div className="pt-3 mt-3 border-t border-border">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Primary Strength: {categoryLabels[results.primaryStrength]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divergent Thinking Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-elevated rounded-2xl p-6 border border-border mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-neon-pink" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">Divergent Thinking Profile</h3>
              <p className="text-muted-foreground text-sm">Your creative thinking dimensions</p>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={divergentData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  width={80}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {results.divergentProfile.map((profile) => (
              <div key={profile.dimension} className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">{divergentLabels[profile.dimension].label}</p>
                <p className="font-display font-bold text-foreground">{profile.percentage}%</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-display font-semibold py-6 px-8 rounded-xl hover:scale-105 transition-transform"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share My Profile
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 font-display font-semibold py-6 px-8 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Again
          </Button>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground/60 text-sm mt-8"
        >
          This assessment is for educational and entertainment purposes. 
          For a clinical evaluation, please consult a licensed psychologist.
        </motion.p>
      </div>
    </div>
  );
};
