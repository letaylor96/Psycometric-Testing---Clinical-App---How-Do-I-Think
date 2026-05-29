import {
  Brain,
  BookOpen,
  Puzzle,
  MessageSquare,
  User,
  Sparkles,
  Cpu,
  LifeBuoy,
} from 'lucide-react';

const CARDS = [
  { icon: Brain, title: 'Cognitive style', body: 'How you process, structure, and retrieve information under different conditions.' },
  { icon: BookOpen, title: 'Learning preferences', body: 'The formats, pacing, and environments where you absorb and retain most effectively.' },
  { icon: Puzzle, title: 'Problem-solving patterns', body: 'Whether you work iteratively, systematically, or through pattern recognition first.' },
  { icon: MessageSquare, title: 'Communication style', body: 'How you prefer to express ideas, receive feedback, and collaborate with others.' },
  { icon: User, title: 'Personality tendencies', body: 'Trait patterns that shape how you approach work, decisions, and relationships.' },
  { icon: Sparkles, title: 'Divergent thinking indicators', body: 'Where your thinking naturally branches, connects, or generates alternatives.' },
  { icon: Cpu, title: 'AI workflow fit', body: 'Which AI-enabled tools and workflows align with how you think and produce best.' },
  { icon: LifeBuoy, title: 'Support needs', body: 'Where structure, coaching, pacing, or scaffolding may help you move forward.' },
];

export const ProfileIdentifiesSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.28em] text-teal mb-3">
            Assessment coverage
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
            What this profile helps identify
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            People do not all think, learn, or work in the same way. This assessment helps translate individual differences into practical guidance for learning, confidence, AI tool use, and program support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CARDS.map((c, i) => {
            const accents = [
              { ring: 'group-hover:border-teal/40', icon: 'text-teal' },
              { ring: 'group-hover:border-navy-deep/30', icon: 'text-navy-deep dark:text-cream' },
              { ring: 'group-hover:border-gold/50', icon: 'text-gold' },
              { ring: 'group-hover:border-teal/40', icon: 'text-teal' },
            ];
            const a = accents[i % accents.length];
            return (
              <div key={c.title} className={`group p-5 bg-card border border-navy-deep/10 rounded-2xl transition-colors ${a.ring}`}>
                <c.icon className={`w-5 h-5 ${a.icon} mb-4`} strokeWidth={1.5} />
                <h3 className="font-serif text-sm font-medium text-foreground mb-2 leading-tight">
                  {c.title}
                </h3>
                <p className="text-ink-muted text-xs sm:text-[13px] leading-relaxed">
                  {c.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

