import { useRef, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Download, Share2, Check, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialShareButtons } from '@/components/SocialShareButtons';

export type CardVariant = 'iq' | 'personality' | 'neurodivergent' | 'cognitive';

interface ShareableResultCardProps {
  variant: CardVariant;
  // IQ
  iqScore?: number;
  iqTier?: string;
  percentile?: number;
  archetype?: string;
  // Personality
  personalityType?: string;
  mbtiType?: string;
  mbtiName?: string;
  tagline?: string;
  rarity?: string;
  // Neurodivergent / ADHD
  adhdLikelihood?: string;
  inattentionPct?: number;
  hyperactivityPct?: number;
  // Cognitive Style
  cognitiveProfile?: string;
  processingStyle?: string;
  // Common
  traits?: { label: string; value: number; color?: string }[];
  shareText?: string;
  linkedInText?: string;
  twitterText?: string;
}

const variantStyles: Record<CardVariant, { gradient: string; accent: string; border: string; badge: string }> = {
  iq: {
    gradient: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
    accent: 'text-[#7c6aff]',
    border: 'border-[#7c6aff]/30',
    badge: 'bg-[#7c6aff]/20 text-[#a594ff]',
  },
  personality: {
    gradient: 'from-[#1a1a2e] via-[#2d1b4e] to-[#1a1a2e]',
    accent: 'text-[#a855f7]',
    border: 'border-[#a855f7]/30',
    badge: 'bg-[#a855f7]/20 text-[#c084fc]',
  },
  neurodivergent: {
    gradient: 'from-[#1a1a2e] via-[#1e293b] to-[#1a1a2e]',
    accent: 'text-[#8b5cf6]',
    border: 'border-[#8b5cf6]/30',
    badge: 'bg-[#8b5cf6]/20 text-[#a78bfa]',
  },
  cognitive: {
    gradient: 'from-[#0f172a] via-[#1e1b4b] to-[#0f172a]',
    accent: 'text-[#06b6d4]',
    border: 'border-[#06b6d4]/30',
    badge: 'bg-[#06b6d4]/20 text-[#22d3ee]',
  },
};

export const ShareableResultCard = (props: ShareableResultCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const style = variantStyles[props.variant];

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0f0f1a',
      });
      const link = document.createElement('a');
      link.download = `how-do-i-think-${props.variant}-result.png`;
      link.href = dataUrl;
      link.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setDownloading(false);
    }
  }, [props.variant]);

  return (
    <div className="space-y-4">
      {/* The card itself */}
      <div
        ref={cardRef}
        className={cn(
          'relative overflow-hidden rounded-2xl p-6 md:p-8',
          'bg-gradient-to-br',
          style.gradient,
          'border',
          style.border
        )}
        style={{ width: '100%', maxWidth: 520 }}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-30 bg-[hsl(252,100%,69%)]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[60px] opacity-20 bg-[hsl(330,100%,65%)]" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-white/60" />
            <span className="text-white/60 text-xs font-medium tracking-wider uppercase">
              How Do I Think?
            </span>
          </div>
          <span className={cn('text-[10px] font-semibold px-2.5 py-1 rounded-full', style.badge)}>
            {props.variant === 'iq' && 'IQ Assessment'}
            {props.variant === 'personality' && 'Personality Profile'}
            {props.variant === 'neurodivergent' && 'ADHD Screening'}
            {props.variant === 'cognitive' && 'Cognitive Style'}
          </span>
        </div>

        {/* Main content - variant specific */}
        <div className="relative z-10">
          {props.variant === 'iq' && (
            <>
              <div className="text-center mb-4">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Cognitive Score</p>
                <p className="text-6xl font-bold text-white font-mono">{props.iqScore}</p>
                <p className={cn('text-lg font-semibold mt-1', style.accent)}>{props.iqTier}</p>
              </div>
              <div className="flex justify-center gap-6 text-center">
                <div>
                  <p className="text-white/40 text-[10px] uppercase">Percentile</p>
                  <p className="text-white font-bold text-lg">Top {props.percentile}%</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-white/40 text-[10px] uppercase">Archetype</p>
                  <p className="text-white font-bold text-sm">{props.archetype}</p>
                </div>
              </div>
            </>
          )}

          {props.variant === 'personality' && (
            <>
              <div className="text-center mb-4">
                <p className={cn('text-3xl font-bold', style.accent)}>{props.personalityType}</p>
                {props.tagline && (
                  <p className="text-white/60 text-sm italic mt-1">"{props.tagline}"</p>
                )}
              </div>
              <div className="flex justify-center gap-6 text-center">
                <div>
                  <p className="text-white/40 text-[10px] uppercase">MBTI Type</p>
                  <p className="text-white font-bold text-2xl font-mono">{props.mbtiType}</p>
                  <p className="text-white/50 text-xs">{props.mbtiName}</p>
                </div>
                {props.rarity && (
                  <>
                    <div className="w-px bg-white/10" />
                    <div className="flex items-center">
                      <p className="text-white/60 text-xs">{props.rarity}</p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {props.variant === 'neurodivergent' && (
            <>
              <div className="text-center mb-4">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Am I Neurodivergent?</p>
                <p className={cn('text-4xl font-bold', style.accent)}>{props.adhdLikelihood}</p>
              </div>
              <div className="flex justify-center gap-6 text-center">
                <div>
                  <p className="text-white/40 text-[10px] uppercase">Inattention</p>
                  <p className="text-white font-bold text-lg">{props.inattentionPct}%</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-white/40 text-[10px] uppercase">Hyperactivity</p>
                  <p className="text-white font-bold text-lg">{props.hyperactivityPct}%</p>
                </div>
              </div>
            </>
          )}

          {props.variant === 'cognitive' && (
            <>
              <div className="text-center mb-4">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Your Cognitive Style</p>
                <p className={cn('text-2xl font-bold', style.accent)}>{props.cognitiveProfile}</p>
                {props.processingStyle && (
                  <p className="text-white/50 text-xs mt-1">{props.processingStyle}</p>
                )}
              </div>
            </>
          )}

          {/* Trait bars */}
          {props.traits && props.traits.length > 0 && (
            <div className="mt-5 space-y-2">
              {props.traits.map((trait) => (
                <div key={trait.label} className="flex items-center gap-2">
                  <span className="text-white/50 text-[10px] w-20 text-right truncate">{trait.label}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${trait.value}%`,
                        backgroundColor: trait.color || '#7c6aff',
                      }}
                    />
                  </div>
                  <span className="text-white/60 text-[10px] w-8 text-right font-mono">{trait.value}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer watermark */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-white/30 text-[10px]">how-do-i-think.com</span>
          <span className="text-white/30 text-[10px]">Scientifically Validated</span>
        </div>
      </div>

      {/* Actions below card */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              Saved!
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {downloading ? 'Generating...' : 'Download Card'}
            </>
          )}
        </Button>

        {props.shareText && (
          <SocialShareButtons
            shareText={props.shareText}
            linkedInText={props.linkedInText}
            twitterText={props.twitterText}
            size="sm"
          />
        )}
      </div>
    </div>
  );
};
