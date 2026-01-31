import { motion } from 'framer-motion';
import { FreudianResults, categoryLabels } from '@/data/freudianQuestions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  ArrowLeft, 
  LayoutDashboard, 
  Flame, 
  Scale, 
  Eye,
  Shield,
  TrendingUp,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface FreudianResultsScreenProps {
  results: FreudianResults;
  onRestart: () => void;
  onViewDashboard: () => void;
}

const structureInfo = {
  id: {
    icon: Flame,
    label: 'Id (Primal Drives)',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    description: 'Primitive desires, pleasure-seeking impulses, instinctual energy',
  },
  ego: {
    icon: Scale,
    label: 'Ego (Reality Mediator)',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    description: 'Rational decision-making, reality testing, conflict resolution',
  },
  superego: {
    icon: Eye,
    label: 'Superego (Moral Conscience)',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Internalized values, guilt, moral standards, ego ideal',
  },
};

const defenseMaturityLabels = {
  primitive: { label: 'Primitive', color: 'destructive', description: 'Denial, projection, splitting' },
  neurotic: { label: 'Neurotic', color: 'secondary', description: 'Repression, displacement, rationalization' },
  mature: { label: 'Mature', color: 'default', description: 'Sublimation, humor, altruism' },
};

const balanceDescriptions: Record<FreudianResults['structuralBalance'], { label: string; description: string }> = {
  'id-dominant': {
    label: 'Id-Dominant',
    description: 'Impulse-driven with strong desires seeking expression',
  },
  'ego-dominant': {
    label: 'Ego-Dominant',
    description: 'Highly rational and reality-focused, may suppress emotional needs',
  },
  'superego-dominant': {
    label: 'Superego-Dominant',
    description: 'Strong moral compass, may experience excessive guilt or perfectionism',
  },
  'balanced': {
    label: 'Balanced Integration',
    description: 'Healthy integration of impulses, reality, and moral values',
  },
  'conflicted': {
    label: 'Internal Conflict',
    description: 'Significant tension between psychic structures requiring attention',
  },
};

export const FreudianResultsScreen = ({ 
  results, 
  onRestart, 
  onViewDashboard 
}: FreudianResultsScreenProps) => {
  const balanceInfo = balanceDescriptions[results.structuralBalance];
  const maturityInfo = defenseMaturityLabels[results.defenseMaturity];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Your Freudian Profile
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A psychoanalytic exploration of your unconscious patterns, defense mechanisms, 
            and structural dynamics based on Freudian theory.
          </p>
        </motion.div>

        {/* Psychic Structure Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Psychic Structure Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Structural Balance Badge */}
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Badge variant="outline" className="mb-2 text-base px-4 py-1">
                  {balanceInfo.label}
                </Badge>
                <p className="text-sm text-muted-foreground">{balanceInfo.description}</p>
              </div>

              {/* Individual Structure Scores */}
              <div className="grid gap-4">
                {Object.entries(structureInfo).map(([key, info]) => {
                  const score = key === 'id' 
                    ? results.idStrength 
                    : key === 'ego' 
                      ? results.egoStrength 
                      : results.superegoStrength;
                  const Icon = info.icon;
                  
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={cn('p-1.5 rounded-lg', info.bgColor)}>
                            <Icon className={cn('w-4 h-4', info.color)} />
                          </div>
                          <span className="font-medium">{info.label}</span>
                        </div>
                        <span className="font-mono font-bold">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Defense Mechanisms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Defense Mechanisms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                <span className="text-sm text-muted-foreground">Defense Maturity:</span>
                <Badge variant={maturityInfo.color as any}>{maturityInfo.label}</Badge>
                <span className="text-xs text-muted-foreground">({maturityInfo.description})</span>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Primary Defenses Identified:</p>
                <div className="flex flex-wrap gap-2">
                  {results.primaryDefenses.map((defense, idx) => (
                    <Badge key={idx} variant="outline">{defense}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Core Dynamics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          {/* Core Conflicts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Core Conflicts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.coreConflicts.map((conflict, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>{conflict}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Unconscious Themes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                Unconscious Themes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.unconsciousThemes.map((theme, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-500 mt-1">•</span>
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {results.profileSummary}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Psychological Strengths
                  </h4>
                  <ul className="space-y-2">
                    {results.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Growth Areas */}
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    Areas for Growth
                  </h4>
                  <ul className="space-y-2">
                    {results.growthAreas.map((area, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-secondary mt-0.5">→</span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="outline" onClick={onRestart} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Take Another Assessment
          </Button>
          <Button onClick={onViewDashboard} className="gap-2">
            <LayoutDashboard className="w-4 h-4" />
            View Full Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
