import { motion } from 'framer-motion';
import { Brain, BookOpen, Puzzle, MessageCircle, Scale, User } from 'lucide-react';

const AXES = [
  { label: 'Cognitive\nStyle', value: 0.82, Icon: Brain },
  { label: 'Learning\nPattern', value: 0.7, Icon: BookOpen },
  { label: 'Problem\nSolving', value: 0.88, Icon: Puzzle },
  { label: 'Communication\nStyle', value: 0.65, Icon: MessageCircle },
  { label: 'Decision\nStyle', value: 0.78, Icon: Scale },
];

const SUPPORT_CHIPS = ['Pacing', 'Structure', 'Examples'];

const AT_A_GLANCE = [
  'Strengths-led insights',
  'Reflects real behavior',
  'Aligned to work contexts',
  'Actionable for growth',
];

const buildPoints = (values: number[], radius: number, cx: number, cy: number) => {
  const n = values.length;
  return values
    .map((v, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const r = radius * v;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');
};

const buildAxisEnds = (n: number, radius: number, cx: number, cy: number) =>
  Array.from({ length: n }).map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle), angle };
  });

export const SampleProfilePreview = () => {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 100;

  const values = AXES.map((a) => a.value);
  const axisEnds = buildAxisEnds(AXES.length, radius, cx, cy);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative w-full"
    >
      <div className="relative rounded-2xl border border-navy-deep/10 shadow-xl overflow-hidden bg-card">
        {/* Card header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-ink-muted mb-1.5 font-medium">
              Sample preview
            </p>
            <h3 className="font-serif text-foreground text-xl font-medium leading-tight">
              Your Thinking Profile
            </h3>
          </div>
          <div className="flex items-center px-3 py-1.5 rounded-full bg-gold text-navy-deep shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.18em] font-bold">
              Sample · For illustration
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
          {/* Radar */}
          <div className="sm:col-span-3 flex justify-center">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full max-w-[300px] h-auto"
              role="img"
              aria-label="Sample thinking profile radar"
            >
              {[0.25, 0.5, 0.75, 1].map((r) => (
                <polygon
                  key={r}
                  points={buildPoints(new Array(AXES.length).fill(r), radius, cx, cy)}
                  fill={r === 1 ? 'hsl(var(--teal-soft) / 0.4)' : 'none'}
                  stroke="hsl(var(--navy-deep) / 0.10)"
                  strokeWidth={1}
                />
              ))}
              {axisEnds.map((p, i) => (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={p.x}
                  y2={p.y}
                  stroke="hsl(var(--navy-deep) / 0.10)"
                  strokeWidth={1}
                />
              ))}
              <polygon
                points={buildPoints(values, radius, cx, cy)}
                fill="hsl(var(--teal) / 0.18)"
                stroke="hsl(var(--teal))"
                strokeWidth={1.5}
              />
              {values.map((v, i) => {
                const p = axisEnds[i];
                const r = radius * v;
                return (
                  <circle
                    key={i}
                    cx={cx + r * Math.cos(p.angle)}
                    cy={cy + r * Math.sin(p.angle)}
                    r={3}
                    fill="hsl(var(--teal))"
                  />
                );
              })}
              {/* center avatar circle */}
              <circle cx={cx} cy={cy} r={14} fill="hsl(var(--cream-warm))" stroke="hsl(var(--navy-deep) / 0.15)" />
            </svg>
          </div>

          {/* Side meta */}
          <div className="sm:col-span-2 space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2 font-semibold">
                Support needs
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORT_CHIPS.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-cream-warm text-foreground border border-navy-deep/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2 font-semibold">
                At a glance
              </p>
              <ul className="space-y-1.5 text-foreground/85 text-[12px] leading-relaxed">
                {AT_A_GLANCE.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-navy-deep/10 flex items-center justify-between bg-cream-warm/40">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Generated from your responses across 4 modules
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
            For illustration only
          </p>
        </div>
      </div>
    </motion.div>
  );
};
