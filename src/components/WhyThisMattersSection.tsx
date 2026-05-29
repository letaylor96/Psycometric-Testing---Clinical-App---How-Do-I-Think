export const WhyThisMattersSection = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-border bg-card/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
          Why this matters
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-6">
          Different thinking needs different support.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-5">
          Some people are highly visual. Some are systems thinkers. Some need structure before action. Some learn by experimenting. Some process quickly but struggle with organization. Some are strong conceptually but need support turning ideas into repeatable workflows.
        </p>
        <p className="text-foreground text-base sm:text-lg leading-relaxed">
          This assessment helps make those differences visible, useful, and actionable.
        </p>
      </div>
    </section>
  );
};
