## Plan: Add Sample Report Preview Section

### Goal
Add a visually strong, professional-looking sample report preview section that gives users a tangible view of the result they'll receive after completing the assessment. It should feel like a real assessment report — sidebar navigation + structured main panel — not a quiz result.

### Placement
Insert a new section on the landing page between the **Stage 02 — How your thinking is mapped** (`WhyThisMattersSection`) and the **Stage 03 — Module picker** sections in `src/components/LandingHero.tsx`. This positions it after users see how the profile is built and before they're asked to start modules.

### New Component: `src/components/landing/SampleReportPreview.tsx`

**Section wrapper**
- Padding: `py-16 sm:py-24`, background `bg-cream-warm/40` (or `bg-background`) with `border-y border-border`.
- Heading block (centered, max-w-2xl):
  - Eyebrow: "Sample report" in `text-gold` uppercase tracking
  - H2: *Your profile translates insight into next steps.* (font-serif)
  - Intro paragraph: *The profile turns how you think into practical guidance: where you are likely to thrive, where friction may show up, and which AI-enabled workflows or supports may help you move forward.*

**Report panel (large card)**
- Container: `max-w-5xl mx-auto`, `bg-card`, `border border-navy-deep/10`, `rounded-2xl`, `shadow-xl`, overflow-hidden.
- Top header strip: dark navy bar with serif title "Sample Cognitive & AI-Readiness Profile" on left, "Sample · For illustration" pill on right (gold accent), small "Generated from 4 modules" metadata.
- Body: 2-column grid (`md:grid-cols-[220px_1fr]`):
  - **Left sidebar** (`bg-cream-warm/60` or `bg-navy-deep/[0.03]`, right border):
    - Section list (vertical), each row = small dot/index + label, serif font:
      1. Profile Summary (active state — gold left bar, navy text)
      2. Cognitive Style
      3. Learning Pattern
      4. Problem-Solving
      5. Communication
      6. AI Workflow Fit
      7. Support Needs
      8. Starting Point
    - Active item highlighted via teal/gold left accent bar + bg tint. Other items are muted/non-interactive (this is a static preview).
  - **Right main panel** (`p-7 sm:p-9`):
    - Top row: "Profile Summary" label + **Overall Fit indicator**: large numeric "82" (or "Strong fit") with a horizontal progress bar (teal fill at 82%) and small caption "Overall fit · sample". Right-aligned tag chips: "Systems thinker · Reflective learner".
    - Body paragraph (font-serif italic-light or regular body): the exact sample copy provided:
      > "You are a systems-oriented thinker who excels at seeing patterns, organizing complexity, and building practical solutions. You may benefit from structure, clear logic, and examples before taking action."
    - 2-column grid (`sm:grid-cols-2 gap-5`) of mini-cards:
      - **Top Strengths** (Sparkles icon, teal accent): bulleted list — Systems thinking; Analytical reasoning; Attention to detail; Strategic planning; Independent problem-solving.
      - **Common Friction Points** (AlertCircle icon, gold accent): bulleted list — Overthinking complexity; Starting without full clarity; Working in unstructured environments; Delegation; Perfectionism.
      - **Suggested Supports** (HeartHandshake icon, teal-soft bg): chips — Clear structure; Worked examples; Pacing prompts; Decision checkpoints.
      - **Suggested Starting Point** (Flag/MapPin icon, gold bg): short paragraph — *Begin with a structured AI workflow that supports planning and pattern recognition — e.g., a guided research or analysis assistant with clear scaffolding.*
    - Footer row inside panel: small disclaimer text in `text-ink-muted/70 text-xs`: *Sample content for illustration. Not a diagnostic or clinical assessment.*
- Outside the card: centered CTA button below the panel — outline variant with navy border — **"View full sample report"**. Wire the onClick to a no-op for now (or scroll to top of section) — the page does not yet have a dedicated sample report route; keep handler local, do not add routing.

**Styling rules**
- All colors via semantic tokens (`bg-card`, `bg-navy-deep`, `text-cream`, `bg-teal-soft`, `bg-gold-soft`, `text-teal`, `text-gold`, `border-navy-deep/10`, `text-ink-muted`, `font-serif`). No hardcoded hex.
- Subtle Framer Motion `whileInView` fade-in for the panel.
- Responsive: sidebar collapses above main panel on mobile (`grid-cols-1`), sidebar items become a horizontal scroll row OR a compact stacked list with the active item visually emphasized.
- Hover states minimal (this is a static preview, not interactive nav).

### Update: `src/components/LandingHero.tsx`
- Add import for `SampleReportPreview`.
- Insert `<SampleReportPreview />` inside a wrapping div with `JourneyStageChip` if desired, OR as its own section between the Stage 02 `WhyThisMattersSection` block (ends ~line 222) and the Stage 03 `<section id="modules" ...>` (line 225). Simplest: standalone section, no stage chip, so it reads as a "preview" interlude between mapping and module-picking stages.

### Out of Scope
- No new route for a "full sample report" page. The button is a visual element only and will not navigate. If the user wants a dedicated route later, that's a follow-up.
- No assessment logic, data wiring, or backend changes.
- The existing small `SampleProfilePreview` (radar card) in the hero stays as-is.