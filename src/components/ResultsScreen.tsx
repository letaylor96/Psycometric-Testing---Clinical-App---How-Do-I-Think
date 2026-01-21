import { motion } from 'framer-motion';
import { Brain, RotateCcw, Share2, Trophy } from 'lucide-react';
import { calculateIQ, getIQCategory } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';

interface ResultsScreenProps {
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const ResultsScreen = ({ correctAnswers, totalQuestions, onRestart }: ResultsScreenProps) => {
  const iq = calculateIQ(correctAnswers, totalQuestions);
  const category = getIQCategory(iq);
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const handleShare = async () => {
    const shareText = `🧠 I scored ${iq} IQ (${category.label}) on the MindMatrix IQ Test! ${category.emoji}\n\nThink you can beat my score?`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MindMatrix IQ Test Results',
          text: shareText,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-lg"
      >
        {/* Trophy Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-2xl glass glow-secondary flex items-center justify-center">
            <Trophy className="w-12 h-12 text-secondary" />
          </div>
        </motion.div>

        {/* Results Card */}
        <div className="card-elevated rounded-2xl p-8 border border-border text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-muted-foreground text-lg mb-2">Your IQ Score</p>
            
            {/* IQ Number */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
              className="mb-4"
            >
              <span className="font-display text-7xl md:text-8xl font-bold text-gradient">
                {iq}
              </span>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-display font-semibold text-xl">
                <span>{category.emoji}</span>
                <span>{category.label}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              {category.description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-muted-foreground text-sm mb-1">Correct</p>
                <p className="font-display text-2xl font-bold text-primary">
                  {correctAnswers}/{totalQuestions}
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-muted-foreground text-sm mb-1">Accuracy</p>
                <p className="font-display text-2xl font-bold text-secondary">
                  {percentage}%
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-display font-semibold py-6 rounded-xl hover:scale-105 transition-transform"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Results
              </Button>
              <Button
                onClick={onRestart}
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/10 font-display font-semibold py-6 rounded-xl"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Fun comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground/60 text-sm flex items-center justify-center gap-2">
            <Brain className="w-4 h-4" />
            {iq >= 130 
              ? "You'd qualify for Mensa!"
              : iq >= 100 
                ? "Smarter than 50% of the population"
                : "Keep training that brain!"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
