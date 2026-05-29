import { Compass, Workflow, LifeBuoy } from 'lucide-react';

const CARDS = [
  {
    icon: Compass,
    title: 'Strongest starting point',
    body: 'Identifies where a participant may be best positioned to begin.',
  },
  {
    icon: Workflow,
    title: 'Useful AI workflows',
    body: "Suggests the kinds of tools, prompts, automations, and workflows that may fit the participant's thinking style.",
  },
  {
    icon: LifeBuoy,
    title: 'Support needs',
    body: 'Highlights where extra structure, coaching, pacing, or practice may help.',
  },
];

export const ProgramConnectionSection = () => {
  return (
    <section id="program-connection" className="py-16 sm:py-24 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
            Program Alignment
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            Designed to support Applied AI Works Canada participants.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            The results help identify which parts of the Applied AI Works Canada program may be the strongest starting point for each participant — and where additional scaffolding, coaching, structure, or tool support may help them move forward with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CARDS.map((c) => (
            <div key={c.title} className="p-7 bg-card border border-border rounded-md">
              <c.icon className="w-5 h-5 text-muted-foreground mb-5" strokeWidth={1.5} />
              <h3 className="font-serif text-base font-medium text-foreground mb-2">
                {c.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
