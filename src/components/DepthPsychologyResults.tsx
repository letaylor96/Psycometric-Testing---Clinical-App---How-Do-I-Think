import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DepthPsychologyResults as Results, 
  FreudianResults, 
  JungianResults, 
  NietzscheanResults,
  frameworkInfo,
  AnalysisFramework,
} from '@/data/depthPsychologyQuestions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, LayoutDashboard, TrendingUp, Sparkles, RefreshCw, ChevronDown, ChevronUp, BookOpen, Eye, AlertCircle } from 'lucide-react';
import { SaveAssessmentButton } from '@/components/SaveAssessmentButton';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { cn } from '@/lib/utils';
import type { NarcissismProfile } from '@/data/depthPsychologyQuestions';

const elevationLabels: Record<NarcissismProfile['overallElevation'], { label: string; tone: string }> = {
  low: { label: 'Low signaling', tone: 'text-emerald-500' },
  moderate: { label: 'Moderate signaling', tone: 'text-amber-500' },
  elevated: { label: 'Elevated signaling', tone: 'text-orange-500' },
  pronounced: { label: 'Pronounced signaling', tone: 'text-red-500' },
};

const presentationLabels: Record<NarcissismProfile['presentationStyle'], string> = {
  'healthy-confidence': 'Healthy confidence',
  'grandiose-leaning': 'Grandiose-leaning',
  'vulnerable-leaning': 'Vulnerable-leaning',
  mixed: 'Mixed presentation',
  minimal: 'Minimal signaling',
};

const NarcissismSignalingCard = ({ profile }: { profile?: NarcissismProfile }) => {
  if (!profile) return null;
  const elevation = elevationLabels[profile.overallElevation] ?? elevationLabels.moderate;

  const bars: Array<{ label: string; value: number; hint: string }> = [
    { label: 'Grandiose spectrum', value: profile.grandiositySpectrum, hint: 'Overt specialness, status, admiration-seeking' },
    { label: 'Vulnerable spectrum', value: profile.vulnerableSpectrum, hint: 'Covert sensitivity, hidden superiority, fragility' },
    { label: 'Empathy capacity', value: profile.empathyCapacity, hint: 'Attunement to others’ inner states' },
    { label: 'Admiration need', value: profile.admirationNeed, hint: 'Dependence on external recognition' },
  ];

  return (
    <Card className="border-amber-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="w-5 h-5 text-amber-500" />
          Narcissistic Signaling
          <Badge variant="outline" className="ml-auto text-[10px] uppercase tracking-wide">
            Educational — not diagnostic
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-muted/50">
          <span className="text-sm text-muted-foreground">Overall:</span>
          <Badge variant="outline" className={cn('font-medium', elevation.tone)}>
            {elevation.label}
          </Badge>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm font-medium">
            {presentationLabels[profile.presentationStyle] ?? profile.presentationStyle}
          </span>
        </div>

        <div className="grid gap-3">
          {bars.map((b) => (
            <div key={b.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{b.label}</span>
                <span className="font-mono">{b.value}%</span>
              </div>
              <Progress value={b.value} className="h-1.5" />
              <p className="text-xs text-muted-foreground">{b.hint}</p>
            </div>
          ))}
        </div>

        {profile.signalingPatterns?.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Patterns observed:</p>
            <div className="flex flex-wrap gap-2">
              {profile.signalingPatterns.map((p, i) => (
                <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-relaxed">
          {profile.educationalNote}
        </div>

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>
            This module surfaces tendencies along the grandiose / vulnerable spectra for self-reflection.
            It is <strong>not</strong> a clinical diagnosis of Narcissistic Personality Disorder. Only a
            licensed clinician can make that determination.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

interface DepthPsychologyResultsProps {
  results: Results;
  answers?: { questionId: number; answer: string }[];
  onRestart: () => void;
  onViewDashboard: () => void;
  onTryFramework?: (framework: AnalysisFramework) => void;
  hasStoredAnswers?: boolean;
}

// Narrative interpretation generator for Freudian results
const generateFreudianNarrative = (results: FreudianResults): string => {
  const { structuralBalance, idStrength, egoStrength, superegoStrength, defenseMaturity, primaryDefenses } = results;
  
  let narrative = "";
  
  // Opening based on structural balance
  if (structuralBalance === 'balanced') {
    narrative = `Your psychic architecture reveals a remarkably well-integrated personality. The tripartite structure of your mind—Id, Ego, and Superego—operates in relative harmony, suggesting you've developed effective ways of mediating between primal desires, realistic constraints, and moral imperatives. `;
  } else if (structuralBalance === 'ego-dominant') {
    narrative = `Your psychological profile suggests a strongly reality-oriented personality. Your Ego has developed robust executive functions, effectively managing the demands of both instinctual drives and internalized moral standards. This pragmatic orientation serves you well in navigating the external world, though it may sometimes distance you from deeper emotional currents. `;
  } else if (structuralBalance === 'superego-dominant') {
    narrative = `Your responses reveal a psyche significantly shaped by internalized moral authority. The voice of conscience speaks loudly within you, guiding behavior through a strong sense of right and wrong. While this moral compass provides ethical grounding, it may also generate internal tension when natural desires conflict with idealized standards. `;
  } else if (structuralBalance === 'id-dominant') {
    narrative = `Your psychological profile reveals strong connection to primal, instinctual energies. You likely experience life intensely, with desires and impulses readily making themselves known to consciousness. This vitality can be a source of creativity and passion, though it may sometimes challenge social adaptation. `;
  } else {
    narrative = `Your responses suggest a psyche in active negotiation with itself. Internal conflicts between different aspects of your personality create a dynamic inner life—sometimes turbulent, but also potentially generative of growth and self-understanding. `;
  }
  
  // Defense mechanism interpretation
  if (defenseMaturity === 'mature') {
    narrative += `\n\nYour defense mechanisms reflect psychological sophistication. Rather than primitive denial or projection, you predominantly employ mature strategies like sublimation and humor—transforming potentially disruptive impulses into socially valued expressions. This indicates strong ego development and adaptive capacity.`;
  } else if (defenseMaturity === 'neurotic') {
    narrative += `\n\nYour characteristic defenses—including ${primaryDefenses.slice(0, 2).join(' and ')}—operate at a neurotic level, meaning they successfully manage anxiety while sometimes creating interpersonal friction or internal distress. These are common among thoughtful individuals and amenable to conscious examination.`;
  } else {
    narrative += `\n\nYour defensive patterns suggest some reliance on more primitive mechanisms. While these protect you from overwhelming anxiety, they may also limit your capacity for nuanced emotional experience. Developing awareness of these patterns is the first step toward greater psychological flexibility.`;
  }
  
  // Structural metrics interpretation
  narrative += `\n\nThe interplay of your psychological structures (Id: ${idStrength}%, Ego: ${egoStrength}%, Superego: ${superegoStrength}%) creates your unique inner landscape. `;
  
  if (idStrength > 70) {
    narrative += `Your strong instinctual presence suggests rich contact with desire, creativity, and vitality. `;
  }
  if (egoStrength > 70) {
    narrative += `Your robust ego functioning indicates effective reality testing and adaptive capacity. `;
  }
  if (superegoStrength > 70) {
    narrative += `Your pronounced moral dimension reflects deep engagement with questions of value and meaning. `;
  }
  
  return narrative;
};

// Narrative interpretation generator for Jungian results
const generateJungianNarrative = (results: JungianResults): string => {
  const { individuationStage, dominantArchetypes, primaryFunction, auxiliaryFunction, shadowContent, animaAnimusBalance } = results;
  
  let narrative = "";
  
  // Opening based on individuation stage
  if (individuationStage === 'self-realization') {
    narrative = `Your journey toward wholeness has progressed remarkably far. The Self—that central organizing archetype representing psychic totality—has begun to emerge as a living reality in your experience. You show capacity for holding opposites in creative tension, transcending the ego's limited perspective while maintaining healthy functioning in the everyday world. `;
  } else if (individuationStage === 'anima-animus') {
    narrative = `You are engaged in the profound work of encountering your contrasexual element—the anima or animus that serves as bridge to the collective unconscious. This stage often brings intensified emotional life, creative inspiration, and the challenge of discerning genuine inner guidance from projection. `;
  } else if (individuationStage === 'shadow-work') {
    narrative = `Your individuation journey has brought you to the crucial encounter with the Shadow. You are developing awareness of those aspects of yourself that have been denied, repressed, or undervalued. This is essential work—without shadow integration, we remain identified with a partial self-image that lacks depth and authenticity. `;
  } else {
    narrative = `Your psychological development shows potential for deeper self-discovery. The archetypes that animate human experience are present within you, though perhaps not yet consciously engaged. The journey of individuation awaits—a path toward greater wholeness and authentic selfhood. `;
  }
  
  // Archetypal interpretation
  narrative += `\n\nThe archetypes most active in your psyche include ${dominantArchetypes.join(', ')}. These are not mere categories but living presences—patterns of experience that shape how you perceive and engage with life. `;
  
  // Function interpretation
  const functionDescriptions: Record<string, string> = {
    thinking: 'rational analysis and logical evaluation',
    feeling: 'value-based assessment and relational attunement',
    sensation: 'concrete perception and grounded presence',
    intuition: 'pattern recognition and future possibility',
  };
  
  narrative += `\n\nYour consciousness is primarily oriented through ${functionDescriptions[primaryFunction]}, with ${functionDescriptions[auxiliaryFunction]} serving as valuable support. This combination creates your characteristic way of engaging reality. Remember that your inferior function—currently less developed—holds tremendous potential for growth and may emerge in dreams and creative moments.`;
  
  // Shadow interpretation
  if (shadowContent.length > 0 && shadowContent[0] !== 'Unexplored aspects') {
    narrative += `\n\nYour shadow contains material worthy of attention: ${shadowContent.join('; ')}. These are not flaws to eliminate but energies to integrate—aspects of yourself that, when acknowledged, can become sources of vitality and authenticity rather than sources of projection onto others.`;
  } else {
    narrative += `\n\nYour shadow work is ongoing. Every individual carries aspects of themselves that remain hidden from conscious view—not because they are bad, but because they didn't fit the adaptation required by our environment. Bringing curiosity rather than judgment to these hidden aspects is the key to integration.`;
  }
  
  // Anima/Animus
  if (animaAnimusBalance === 'integrated') {
    narrative += `\n\nYour contrasexual element shows healthy integration, suggesting capacity for creative dialogue between different aspects of your psyche.`;
  }
  
  return narrative;
};

// Narrative interpretation generator for Nietzschean results
const generateNietzscheanNarrative = (results: NietzscheanResults): string => {
  const { willToPower, lifeAffirmation, slaveVsMasterMorality, resentimentLevel, eternalRecurrence, nihilismStance, authenticityScore } = results;
  
  let narrative = "";
  
  // Opening based on moral orientation
  if (slaveVsMasterMorality === 'master') {
    narrative = `Your responses reveal a fundamentally self-affirming orientation to existence. You create values rather than merely inherit them, judging life from a position of strength rather than resentment. This "master morality" is not about dominion over others but about the sovereign capacity to define your own good—to say "yes" to life from a place of fullness. `;
  } else if (slaveVsMasterMorality === 'beyond') {
    narrative = `You show signs of transcending the master/slave dichotomy altogether—moving "beyond good and evil" toward a more nuanced engagement with value. This is rare and suggests genuine philosophical development: the ability to see morality as perspective while still living meaningfully and with integrity. `;
  } else if (slaveVsMasterMorality === 'transitional') {
    narrative = `Your moral orientation reveals creative tension—you are neither wholly defined by inherited values nor fully the author of your own. This transitional state, while sometimes uncomfortable, holds tremendous potential. The struggle between different value systems can forge a more authentic, personally meaningful way of being. `;
  } else {
    narrative = `Your responses suggest orientation toward what Nietzsche termed "slave morality"—values born of reaction rather than creation, defining good in opposition to power rather than as expression of vitality. This is not a moral failing but a psychological pattern worth examining. Many of our inherited values have these reactive origins.`;
  }
  
  // Will to Power interpretation
  narrative += `\n\nYour Will to Power—understood not as domination but as the fundamental drive toward growth, expression, and self-overcoming—registers at ${willToPower}%. `;
  
  if (willToPower > 70) {
    narrative += `This robust life-force suggests strong capacity for creative self-determination and the courage to impose form on existence.`;
  } else if (willToPower > 40) {
    narrative += `This moderate expression suggests potential for greater assertion of your creative will—for becoming more fully the author of your own life.`;
  } else {
    narrative += `This quieter expression may indicate life-denial, exhaustion, or simply a different way of engaging existence. Nietzsche would ask: what could awaken greater vitality?`;
  }
  
  // Ressentiment interpretation
  if (resentimentLevel === 'overcome' || resentimentLevel === 'low') {
    narrative += `\n\nRemarkably, you show minimal ressentiment—that poisonous self-fermenting of suppressed hostility that Nietzsche saw as the foundation of reactive morality. You appear capable of discharging negative affect directly or transmuting it, rather than nursing secret grievances.`;
  } else if (resentimentLevel === 'moderate') {
    narrative += `\n\nLike most, you carry some ressentiment—those unprocessed hurts and resentments that shape our evaluations while remaining hidden from view. Bringing these to consciousness and finding outlets for blocked energy is part of what Nietzsche called "self-overcoming."`;
  } else {
    narrative += `\n\nYour responses suggest significant ressentiment—the accumulated weight of unexpressed grievance. This is not a moral judgment but an observation: such internal states tend to poison our capacity for joy and authentic connection. The path forward involves honest acknowledgment and creative transformation.`;
  }
  
  // Eternal Recurrence interpretation
  narrative += `\n\n`;
  if (eternalRecurrence === 'embrace') {
    narrative += `When confronted with the ultimate test—"Would you will this life again, in every detail, eternally?"—you respond with affirmation. This amor fati, love of fate, represents the highest form of life-affirmation Nietzsche conceived.`;
  } else if (eternalRecurrence === 'struggle') {
    narrative += `The thought of eternal recurrence—living this exact life infinitely—provokes genuine struggle in you. This honest wrestling with existence is itself meaningful; the question is designed to concentrate the mind on what truly matters.`;
  } else {
    narrative += `The prospect of eternal recurrence meets resistance in you—suggesting aspects of life you would not choose to repeat. This very resistance can become a guide: what would need to change for you to embrace your existence completely?`;
  }
  
  // Life affirmation summary
  narrative += `\n\nYour overall life-affirmation (${lifeAffirmation}%) and authenticity (${authenticityScore}%) suggest `;
  if (lifeAffirmation > 70 && authenticityScore > 70) {
    narrative += `you are living genuinely, from your own center, capable of saying "yes" to existence with its joys and sufferings alike.`;
  } else {
    narrative += `room for deeper engagement with your own existence—for becoming more fully who you are, with less reference to external standards and inherited values.`;
  }
  
  return narrative;
};

// Freudian Results Component
const FreudianResultsView = ({ results }: { results: FreudianResults }) => {
  const [showDetails, setShowDetails] = useState(false);
  const narrative = generateFreudianNarrative(results);
  
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
      {/* Narrative Interpretation - Primary Focus */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Your Psychoanalytic Interpretation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {narrative.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Technical Details */}
      <Button 
        variant="ghost" 
        className="w-full justify-between"
        onClick={() => setShowDetails(!showDetails)}
      >
        <span className="text-sm text-muted-foreground">View Technical Analysis</span>
        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          {/* Psychic Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Psychic Structure Analysis</CardTitle>
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
              <CardTitle className="text-lg">Defense Mechanisms</CardTitle>
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
        </motion.div>
      )}
    </>
  );
};

// Jungian Results Component
const JungianResultsView = ({ results }: { results: JungianResults }) => {
  const [showDetails, setShowDetails] = useState(false);
  const narrative = generateJungianNarrative(results);
  
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
      {/* Narrative Interpretation - Primary Focus */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Your Analytical Psychology Interpretation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {narrative.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Technical Details */}
      <Button 
        variant="ghost" 
        className="w-full justify-between"
        onClick={() => setShowDetails(!showDetails)}
      >
        <span className="text-sm text-muted-foreground">View Technical Analysis</span>
        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          {/* Archetypes & Individuation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Archetypal Profile</CardTitle>
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
                <CardTitle className="text-lg">Persona & Balance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Persona Mask</p>
                  <p className="text-sm">{results.personaMask}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Anima/Animus Balance</p>
                  <Badge variant="outline" className="capitalize">{results.animaAnimusBalance}</Badge>
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
        </motion.div>
      )}
    </>
  );
};

// Nietzschean Results Component
const NietzscheanResultsView = ({ results }: { results: NietzscheanResults }) => {
  const [showDetails, setShowDetails] = useState(false);
  const narrative = generateNietzscheanNarrative(results);
  
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
      {/* Narrative Interpretation - Primary Focus */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Your Philosophical Interpretation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {narrative.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Technical Details */}
      <Button 
        variant="ghost" 
        className="w-full justify-between"
        onClick={() => setShowDetails(!showDetails)}
      >
        <span className="text-sm text-muted-foreground">View Technical Analysis</span>
        {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          {/* Will to Power Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Will to Power Analysis</CardTitle>
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
        </motion.div>
      )}
    </>
  );
};

export const DepthPsychologyResultsScreen = ({ 
  results,
  answers,
  onRestart, 
  onViewDashboard,
  onTryFramework,
  hasStoredAnswers = true,
}: DepthPsychologyResultsProps) => {
  const fwInfo = frameworkInfo[results.framework];
  const otherFrameworks = (['freudian', 'jungian', 'nietzschean'] as AnalysisFramework[])
    .filter(f => f !== results.framework);

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
          <p className={cn('font-medium', fwInfo.color)}>Interpreted through the lens of {fwInfo.thinker}</p>
        </motion.div>

        {/* Framework-specific results with narratives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {results.framework === 'freudian' && <FreudianResultsView results={results} />}
          {results.framework === 'jungian' && <JungianResultsView results={results} />}
          {results.framework === 'nietzschean' && <NietzscheanResultsView results={results} />}
        </motion.div>

        {/* Strengths and Growth Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Identified Strengths
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
                    Paths for Growth
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

        {/* Try Other Frameworks */}
        {hasStoredAnswers && onTryFramework && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-dashed">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  See Your Answers Through Another Lens
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Use your same 20 responses but analyze them through a different philosophical framework
                </p>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-center gap-3">
                {otherFrameworks.map((framework) => {
                  const fw = frameworkInfo[framework];
                  return (
                    <Button 
                      key={framework}
                      variant="outline" 
                      onClick={() => onTryFramework(framework)}
                      className="gap-2"
                    >
                      <span>{fw.icon}</span>
                      {fw.thinker}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6 pt-4"
        >
          {/* Social Share */}
          <Card className="border-border">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Share Your Analysis</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SocialShareButtons
                shareText={`🧠 Just completed my ${frameworkInfo[results.framework].thinker} depth psychology analysis!\n\n${frameworkInfo[results.framework].description}\n\nDiscover the hidden patterns in your psyche!`}
                linkedInText={`Just explored my unconscious mind through ${frameworkInfo[results.framework].thinker}'s lens! 🧠\n\nFascinating insights into the unconscious mind.\n\nDiscover your own depth psychology profile!`}
                twitterText={`Explored my psyche through ${frameworkInfo[results.framework].thinker}'s lens 🧠 Fascinating insights into the unconscious mind. Discover yours:`}
              />
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          {answers && (
            <SaveAssessmentButton
              assessmentType="depth"
              answers={answers}
              results={results}
              framework={results.framework}
            />
          )}
          <Button variant="outline" onClick={onRestart} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Start New Assessment
          </Button>
          <Button onClick={onViewDashboard} className="gap-2">
            <LayoutDashboard className="w-4 h-4" />
            View Full Dashboard
          </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
