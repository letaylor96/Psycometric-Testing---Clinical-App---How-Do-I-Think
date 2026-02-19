import { motion } from 'framer-motion';
import { Sparkles, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PersonalityResults, personalityTraitLabels, PersonalityTrait } from '@/data/personalityQuestions';

interface PersonalInsightBannerProps {
  pageTypeCode: string;
  personalityResults: PersonalityResults;
}

export const PersonalInsightBanner = ({ pageTypeCode, personalityResults }: PersonalInsightBannerProps) => {
  const userType = personalityResults.mbti.type;
  const isOwnType = userType.toLowerCase() === pageTypeCode.toLowerCase();
  const scores = personalityResults.scores;
  const traits: PersonalityTrait[] = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];

  if (isOwnType) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 mt-6"
      >
        <div className="p-5 sm:p-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-base">
                This is <span className="text-primary">your</span> type!
              </h3>
              <p className="text-muted-foreground text-sm mt-0.5">
                Based on your assessment, you are a <span className="font-bold font-mono text-primary">{userType}</span> — "{personalityResults.archetype.tagline}"
              </p>
            </div>
          </div>

          {/* Mini trait bars */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {traits.map((trait) => (
              <div key={trait} className="text-center">
                <div className="h-16 bg-muted/50 rounded-lg relative overflow-hidden mb-1">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-primary/30 rounded-lg"
                    initial={{ height: 0 }}
                    animate={{ height: `${scores[trait]}%` }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                    {scores[trait]}%
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground leading-tight block">
                  {personalityTraitLabels[trait].label.slice(0, 4)}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            {personalityResults.archetype.rarity} · Archetype: {personalityResults.personalityType}
          </p>
        </div>
      </motion.div>
    );
  }

  // Viewing a different type — show comparison
  const compatibility = personalityResults.mbti.compatibility;
  const isCompatible = compatibility.some(c => c.toLowerCase() === pageTypeCode.toLowerCase());

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 mt-6"
    >
      <div className="p-4 sm:p-5 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-accent/5 to-primary/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">
              You're a <span className="font-mono text-primary font-bold">{userType}</span> — browsing <span className="font-mono text-accent font-bold">{pageTypeCode.toUpperCase()}</span>
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {isCompatible
                ? `Great news! ${pageTypeCode.toUpperCase()} is one of your most compatible types. You likely connect well with people of this type.`
                : `While ${pageTypeCode.toUpperCase()} has a different cognitive style, understanding it can reveal your own blind spots and growth areas.`}
            </p>
            <Link
              to={`/personality/${userType.toLowerCase()}`}
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-2 font-medium transition-colors"
            >
              View your type page
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
