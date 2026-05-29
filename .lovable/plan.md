## Plan: Add "Why this matters" companion section

### Goal
Add a polished companion section beside or below the sample report preview that communicates the practical value of the assessment in three concise points, plus a professional disclaimer callout.

### What will be built

#### 1. New component: `src/components/landing/WhyThisMattersCompanion.tsx`
- **Section wrapper**: `py-14 sm:py-20`, slightly warmer background (`bg-cream-warm/50` or `bg-cream-warm/60`), optional top border for separation.
- **Heading area**: centered, with a small uppercase label (e.g. "VALUE" or "Why this matters") in `text-gold` and the section title "Why this matters" in serif.
- **Three value cards** in a responsive grid (`grid-cols-1 md:grid-cols-3 gap-5`):
  - **Card 1 — Self-awareness that is practical**
    - Icon: `Brain` or `UserCircle` (Lucide), colored in `text-teal`
    - Subtitle: "Understand how you think, not just what you know."
    - Soft background tint, e.g. `bg-teal-soft/30` or `bg-card` with `border-teal/15`
  - **Card 2 — Stronger learning and outcomes**
    - Icon: `TrendingUp` or `Zap` (Lucide), colored in `text-gold`
    - Subtitle: "Use your strengths. Get support where it matters. Make faster progress."
    - Soft background tint, e.g. `bg-gold-soft/40` or `bg-card` with `border-gold/15`
  - **Card 3 — Start with confidence**
    - Icon: `Rocket` or `Compass` (Lucide), colored in `text-navy-deep`
    - Subtitle: "Begin with the right tools, supports, and learning path."
    - Soft background tint, e.g. `bg-cream` or `bg-card` with `border-navy-deep/10`
- **Disclaimer callout box**: full-width card below the three cards with:
  - `bg-card` or slightly muted warm background
  - `border` with subtle color
  - `Info` or `ShieldAlert` icon
  - Text: "This tool is for self-understanding, learning support, and program guidance. It is not a medical, psychological, educational, or diagnostic assessment."
  - Small, professional styling (`text-[13px]`, `text-ink-muted`)
- **Motion**: `framer-motion` `whileInView` fade-in with stagger on the three cards.
- **Design tokens only**: all colors via semantic tokens (`--teal`, `--gold`, `--navy-deep`, `--cream-warm`, `--ink-muted`, etc.). No hardcoded hex values.

#### 2. Update `src/components/LandingHero.tsx`
- Import the new `WhyThisMattersCompanion` component.
- Place it **immediately below** `<SampleReportPreview />` (line 230), before the Stage 03 module picker section. This keeps it as a companion to the report preview while maintaining the page flow.

### Out of scope
- No new routes, backend changes, or logic.
- No modifications to the existing `WhyThisMattersSection` (used in Stage 02).
- No interactive behavior beyond hover states and scroll-entrance animation.

### Design notes
- Keep icons refined and minimal (Lucide, strokeWidth ~1.5).
- Hover states: subtle lift (`-translate-y-0.5`) and shadow increase.
- Maintain the existing executive-level, calm, professional tone.
- Text should be concise and readable; avoid playful or inflated language.