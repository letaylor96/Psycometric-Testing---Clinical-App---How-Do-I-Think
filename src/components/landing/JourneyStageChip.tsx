type Stage = 1 | 2 | 3 | 4;

const STAGE_META: Record<Stage, { label: string; ring: string; dot: string; text: string }> = {
  1: { label: 'Answer', ring: 'border-teal-soft', dot: 'bg-teal-soft', text: 'text-teal' },
  2: { label: 'Map', ring: 'border-teal/40', dot: 'bg-teal', text: 'text-teal' },
  3: { label: 'Understand', ring: 'border-navy/30', dot: 'bg-navy-deep', text: 'text-navy-deep dark:text-cream' },
  4: { label: 'Start', ring: 'border-gold/50', dot: 'bg-gold', text: 'text-gold' },
};

export const JourneyStageChip = ({ stage, label }: { stage: Stage; label?: string }) => {
  const meta = STAGE_META[stage];
  const stageNum = String(stage).padStart(2, '0');
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${meta.ring} bg-background/60 backdrop-blur-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      <span className="text-[10px] uppercase tracking-[0.22em] text-ink-muted font-medium">
        Stage {stageNum}
      </span>
      <span className={`text-[10px] uppercase tracking-[0.22em] font-medium ${meta.text}`}>
        · {label ?? meta.label}
      </span>
    </div>
  );
};
