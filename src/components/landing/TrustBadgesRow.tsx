import { ShieldCheck, Lock, UserCheck, Briefcase, Compass, Heart } from 'lucide-react';

const BADGES = [
  {
    Icon: ShieldCheck,
    title: 'Evidence-Based',
    body: 'Built on established psychological science and trusted frameworks.',
  },
  {
    Icon: Lock,
    title: 'Private & Secure',
    body: "Your data is encrypted and never sold. You're always in control.",
  },
  {
    Icon: UserCheck,
    title: 'Personal & Actionable',
    body: 'Clear, personalized insights you can use in real life and work.',
  },
  {
    Icon: Briefcase,
    title: 'Role Alignment',
    body: "Understand your work style and where you're most likely to thrive.",
  },
  {
    Icon: Compass,
    title: 'Practical & Relevant',
    body: 'Designed to support real contexts, teams, and career decisions.',
  },
];

export const TrustBadgesRow = () => {
  return (
    <section className="border-t border-border bg-cream-warm/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {BADGES.map(({ Icon, title, body }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-cream to-cream-warm border border-navy-deep/10 shadow-sm flex items-center justify-center">
                <Icon className="w-5 h-5 text-teal" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-[13px] font-semibold text-foreground leading-tight mb-1">
                  {title}
                </h3>
                <p className="text-[11px] text-ink-muted leading-snug">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-navy-deep/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ink-muted">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
            <span>A nonprofit-spirited initiative dedicated to clarity, growth, and better alignment.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Private. Secure. Research-informed.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
