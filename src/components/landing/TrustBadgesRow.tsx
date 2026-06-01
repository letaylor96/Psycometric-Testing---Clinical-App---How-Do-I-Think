import { ShieldCheck, Lock, UserCheck, Briefcase, Compass, Heart } from 'lucide-react';

const BADGES = [
  {
    Icon: ShieldCheck,
    title: 'Evidence-Based',
    body: 'Built on established psychological science and trusted frameworks.',
    ring: 'from-teal-soft to-teal/20',
    iconColor: 'text-teal',
  },
  {
    Icon: Lock,
    title: 'Private & Secure',
    body: "Your data is encrypted and never sold. You're always in control.",
    ring: 'from-navy-deep/10 to-navy-deep/20',
    iconColor: 'text-navy-deep dark:text-cream',
  },
  {
    Icon: UserCheck,
    title: 'Personal & Actionable',
    body: 'Clear, personalized insights you can use in real life and work.',
    ring: 'from-gold-soft to-gold/30',
    iconColor: 'text-gold',
  },
  {
    Icon: Briefcase,
    title: 'Role Alignment',
    body: "Understand your work style and where you're most likely to thrive.",
    ring: 'from-teal-soft to-teal/20',
    iconColor: 'text-teal',
  },
  {
    Icon: Compass,
    title: 'Practical & Relevant',
    body: 'Designed to support real contexts, teams, and career decisions.',
    ring: 'from-gold-soft to-gold/30',
    iconColor: 'text-gold',
  },
];

export const TrustBadgesRow = () => {
  return (
    <section className="border-t border-border bg-cream-warm/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-7">
          {BADGES.map(({ Icon, title, body, ring, iconColor }) => (
            <div key={title} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${ring} border border-navy-deep/10 shadow-md flex items-center justify-center ring-1 ring-inset ring-white/40`}>
                <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 pt-0.5">
                <h3 className="font-serif text-[14px] font-semibold text-foreground leading-tight mb-1">
                  {title}
                </h3>
                <p className="text-[11px] text-ink-muted leading-snug">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-navy-deep/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ink-muted">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-gold" strokeWidth={2} fill="currentColor" />
            <span>A nonprofit-spirited initiative dedicated to clarity, growth, and better alignment.</span>
          </div>
          <span className="hidden sm:inline tracking-wide">Private. Secure. Research-informed.</span>
        </div>
      </div>
    </section>
  );
};
