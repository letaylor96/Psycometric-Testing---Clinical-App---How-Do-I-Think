import { motion } from 'framer-motion';

const AXES = [
  { label: 'Cognitive\nStyle', value: 0.82 },
  { label: 'Learning\nPattern', value: 0.7 },
  { label: 'Problem-\nSolving', value: 0.88 },
  { label: 'Communi-\ncation', value: 0.65 },
  { label: 'AI Workflow\nFit', value: 0.78 },
];

const SUPPORT_CHIPS = ['Pacing', 'Structure', 'Examples'];

// Build polygon points for radar
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
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 95;

  const values = AXES.map((a) => a.value);
  const axisEnds = buildAxisEnds(AXES.length, radius, cx, cy);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative w-full"
    >
      {/* Background decorative dots */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 opacity-[0.35] rounded-3xl"
        style={{
          backgroundImage:
            'radial-gradient(hsl(var(--teal) / 0.35) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div
        className="relative rounded-2xl border border-navy-deep/10 shadow-xl overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}
      >
        {/* Card header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-cream/10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-cream/60 mb-1.5">
              Sample preview
            </p>
            <h3 className="font-serif text-cream text-xl font-medium leading-tight">
              Your Thinking Profile
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-medium">
              Complete
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-5 gap-5 items-center">
          {/* Radar */}
          <div className="sm:col-span-3 flex justify-center">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full max-w-[280px] h-auto"
              role="img"
              aria-label="Sample cognitive profile radar"
            >
              {/* concentric rings */}
              {[0.25, 0.5, 0.75, 1].map((r) => (
                <polygon
                  key={r}
                  points={buildPoints(
                    new Array(AXES.length).fill(r),
                    radius,
                    cx,
                    cy,
                  )}
                  fill="none"
                  stroke="hsl(var(--cream) / 0.12)"
                  strokeWidth={1}
                />
              ))}
              {/* axes */}
              {axisEnds.map((p, i) => (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={p.x}
                  y2={p.y}
                  stroke="hsl(var(--cream) / 0.12)"
                  strokeWidth={1}
                />
              ))}
              {/* data polygon */}
              <polygon
                points={buildPoints(values, radius, cx, cy)}
                fill="hsl(var(--teal) / 0.25)"
                stroke="hsl(var(--teal))"
                strokeWidth={1.5}
              />
              {/* gold emphasis on strongest axis */}
              {(() => {
                const maxIdx = values.indexOf(Math.max(...values));
                const p = axisEnds[maxIdx];
                const r = radius * values[maxIdx];
                const angle = p.angle;
                return (
                  <circle
                    cx={cx + r * Math.cos(angle)}
                    cy={cy + r * Math.sin(angle)}
                    r={5}
                    fill="hsl(var(--gold))"
                    stroke="hsl(var(--navy-deep))"
                    strokeWidth={2}
                  />
                );
              })()}
              {/* axis labels */}
              {axisEnds.map((p, i) => {
                const labelR = radius + 18;
                const lx = cx + labelR * Math.cos(p.angle);
                const ly = cy + labelR * Math.sin(p.angle);
                return (
                  <text
                    key={i}
                    x={lx}
                    y={ly}
                    fontSize={9}
                    fill="hsl(var(--cream) / 0.75)"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}
                  >
                    {AXES[i].label.split('\n').map((line, li) => (
                      <tspan key={li} x={lx} dy={li === 0 ? 0 : 10}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Side meta */}
          <div className="sm:col-span-2 space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-2">
                Support needs
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORT_CHIPS.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-cream/10 text-cream border border-cream/15"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-2">
                At a glance
              </p>
              <ul className="space-y-1.5 text-cream/90 text-[13px] leading-relaxed">
                <li>· Pattern-led thinker</li>
                <li>· Reflective learner</li>
                <li>· Strong fit for structured AI workflows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-cream/10 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.22em] text-cream/50">
            Generated from your responses across 4 modules
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold/80">
            v · sample
          </p>
        </div>
      </div>
    </motion.div>
  );
};
