import { motion } from 'framer-motion';
import { 
  DepthPsychologyResults as Results, 
  FreudianResults, 
  JungianResults, 
  NietzscheanResults,
  frameworkInfo 
} from '@/data/depthPsychologyQuestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, LayoutDashboard, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DepthPsychologyResultsProps {
  results: Results;
  onRestart: () => void;
  onViewDashboard: () => void;
}

// Freudian Results Component
const FreudianResultsView = ({ results }: { results: FreudianResults }) => {
  const structureInfo = {
    id: { label: 'Id (Primal Drives)', color: 'text-red-500', bgColor: 'bg-red-500/10' },
    ego: { label: 'Ego (Reality Mediator)', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    superego: { label: 'Superego (Moral Conscience)', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  };

  const balanceLabels = {
    'id-dominant': 'Id-Dominant',
    'ego-dominant': 'Ego-Dominant',
    'superego-dominant': 'Superego-Dominant',
    'balanced': 'Balanced Integration',
    'conflicted': 'Internal Conflict',
  };

  return (
    <>
      {/* Psychic Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Psychic Structure Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-4 rounded-xl bg-muted/50">
            <Badge variant="outline" className="mb-2 text-base px-4 py-1">
              {balanceLabels[results.structuralBalance]}
            </Badge>
          </div>
          <div className="grid gap-4">
            {Object.entries(structureInfo).map(([key, info]) => {
              const score = key === 'id' ? results.idStrength 
                : key === 'ego' ? results.egoStrength 
                : results.superegoStrength;
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn('font-medium', info.color)}>{info.label}</span>
                    <span className="font-mono font-bold">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Defense Mechanisms */}
      <Card>
        <CardHeader>
          <CardTitle>Defense Mechanisms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <span className="text-sm text-muted-foreground">Maturity Level:</span>
            <Badge>{results.defenseMaturity}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.primaryDefenses.map((defense, idx) => (
              <Badge key={idx} variant="outline">{defense}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Core Dynamics */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Core Conflicts</CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Unconscious Themes</CardTitle>
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
      </div>
    </>
  );
};

// Jungian Results Component
const JungianResultsView = ({ results }: { results: JungianResults }) => {
  const stageLabels = {
    'unconscious': 'Pre-Conscious',
    'shadow-work': 'Shadow Integration',
    'anima-animus': 'Anima/Animus Work',
    'self-realization': 'Self-Realization',
  };

  const functionLabels = {
    thinking: '🧠 Thinking',
    feeling: '❤️ Feeling',
    sensation: '👁️ Sensation',
    intuition: '✨ Intuition',
  };

  return (
    <>
      {/* Archetypes & Individuation */}
      <Card>
        <CardHeader>
          <CardTitle>Archetypal Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground mb-2">Individuation Stage</p>
            <Badge variant="outline" className="text-base px-4 py-1">
              {stageLabels[results.individuationStage]}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Dominant Archetypes</p>
            <div className="flex flex-wrap gap-2">
              {results.dominantArchetypes.map((arch, idx) => (
                <Badge key={idx} className="bg-purple-500/10 text-purple-500 border-purple-500/30">{arch}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Psychological Functions</p>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Primary</p>
                <Badge variant="outline">{functionLabels[results.primaryFunction]}</Badge>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Auxiliary</p>
                <Badge variant="outline">{functionLabels[results.auxiliaryFunction]}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shadow & Persona */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shadow Content</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.shadowContent.map((shadow, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-purple-500 mt-1">🌑</span>
                  <span>{shadow}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Persona Mask</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{results.personaMask}</p>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-1">Anima/Animus Balance</p>
              <Badge variant="outline">{results.animaAnimusBalance}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collective Unconscious */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Collective Unconscious Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {results.collectiveUnconscious.map((theme, idx) => (
              <Badge key={idx} variant="secondary">{theme}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

// Nietzschean Results Component
const NietzscheanResultsView = ({ results }: { results: NietzscheanResults }) => {
  const moralityLabels = {
    'master': 'Master Morality',
    'slave': 'Slave Morality',
    'transitional': 'In Transition',
    'beyond': 'Beyond Good & Evil',
  };

  const nihilismLabels = {
    'passive': 'Passive Nihilism',
    'active': 'Active Nihilism',
    'creative': 'Creative Nihilism',
    'transcended': 'Nihilism Transcended',
  };

  return (
    <>
      {/* Will to Power Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Will to Power Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {[
              { label: 'Will to Power', value: results.willToPower, color: 'text-amber-500' },
              { label: 'Life Affirmation', value: results.lifeAffirmation, color: 'text-emerald-500' },
              { label: 'Self-Overcoming Capacity', value: results.overcomingCapacity, color: 'text-blue-500' },
              { label: 'Authenticity Score', value: results.authenticityScore, color: 'text-purple-500' },
            ].map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn('font-medium', metric.color)}>{metric.label}</span>
                  <span className="font-mono font-bold">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Moral & Existential Position */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Moral Orientation</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30">
              {moralityLabels[results.slaveVsMasterMorality]}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Ressentiment: {results.resentimentLevel}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Eternal Recurrence</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="capitalize">{results.eternalRecurrence}</Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Would you live this life again infinitely?
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nihilism Stance</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">{nihilismLabels[results.nihilismStance]}</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Übermensch vs Last Man */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>⚡</span> Übermensch Traits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.ubermenschTraits.map((trait, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-1">↑</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span>💤</span> Last Man Traits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.lastManTraits.map((trait, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground mt-1">→</span>
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const DepthPsychologyResultsScreen = ({ 
  results, 
  onRestart, 
  onViewDashboard 
}: DepthPsychologyResultsProps) => {
  const fwInfo = frameworkInfo[results.framework];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-5xl mb-4">{fwInfo.icon}</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Your {fwInfo.name} Profile
          </h1>
          <p className={cn('font-medium', fwInfo.color)}>{fwInfo.thinker}</p>
        </motion.div>

        {/* Framework-specific results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {results.framework === 'freudian' && <FreudianResultsView results={results} />}
          {results.framework === 'jungian' && <JungianResultsView results={results} />}
          {results.framework === 'nietzschean' && <NietzscheanResultsView results={results} />}
        </motion.div>

        {/* Profile Summary - Common to all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {results.profileSummary}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Strengths
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
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button variant="outline" onClick={onRestart} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Try Another Framework
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
