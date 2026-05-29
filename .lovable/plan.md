## Goal
Rebuild the homepage landing page to support the serious cognitive-assessment positioning by adding four new content sections, replacing the existing Program Context section, and keeping the overall tone calm, credible, and professional.

## Section Order on the Page
1. Hero (existing, unchanged)
2. **What this profile helps identify** — 8 clean cards, new section
3. **Why this matters** — text section, new
4. DiscoverMyMindSpine (existing, unchanged)
5. SingleTestPicker (existing, unchanged)
6. **Connection to Applied AI Works Canada** — 3 cards, new
7. What you get after the assessment (existing, unchanged)
8. Methodology (existing, unchanged)
9. **Disclaimer** — exact copy, new
10. Footer CTA (existing, unchanged)
11. FAQ (existing, unchanged)
12. SEOFooter (existing, unchanged)

The existing "Program Context" section will be removed and replaced by the new "Connection to Applied AI Works Canada" section.

---

## Components to Create

### 1. `src/components/ProfileIdentifiesSection.tsx`
Eyebrow: "Assessment Coverage"
Headline: "What this profile helps identify"
Intro copy (exact): "People do not all think, learn, or work in the same way. This assessment helps translate individual differences into practical guidance for learning, confidence, AI tool use, and program support."

Eight cards in a responsive grid (2 cols mobile, 4 cols desktop). Each card: small muted icon, bold title, one short practical sentence. Cards are flat with a subtle border; no gradients, no glowing effects.

| Card title | Practical sentence |
|---|---|
| Cognitive style | How you process, structure, and retrieve information under different conditions. |
| Learning preferences | The formats, pacing, and environments where you absorb and retain most effectively. |
| Problem-solving patterns | Whether you work iteratively, systematically, or through pattern recognition first. |
| Communication style | How you prefer to express ideas, receive feedback, and collaborate with others. |
| Personality tendencies | Trait patterns that shape how you approach work, decisions, and relationships. |
| Divergent thinking indicators | Where your thinking naturally branches, connects, or generates alternatives. |
| AI workflow fit | Which AI-enabled tools and workflows align with how you think and produce best. |
| Support needs | Where structure, coaching, pacing, or scaffolding may help you move forward. |

### 2. `src/components/WhyThisMattersSection.tsx`
Headline (exact): "Different thinking needs different support."
Body copy (exact):
> Some people are highly visual. Some are systems thinkers. Some need structure before action. Some learn by experimenting. Some process quickly but struggle with organization. Some are strong conceptually but need support turning ideas into repeatable workflows.
>
> This assessment helps make those differences visible, useful, and actionable.

Centered text block on a muted background (`bg-card/30`). No cards, no icons. Just clean typography.

### 3. `src/components/ProgramConnectionSection.tsx`
Eyebrow: "Program Alignment"
Headline (exact): "Designed to support Applied AI Works Canada participants."
Body copy (exact): "The results help identify which parts of the Applied AI Works Canada program may be the strongest starting point for each participant — and where additional scaffolding, coaching, structure, or tool support may help them move forward with confidence."

Three cards in a row:
| Card title | Body |
|---|---|
| Strongest starting point | Identifies where a participant may be best positioned to begin. |
| Useful AI workflows | Suggests the kinds of tools, prompts, automations, and workflows that may fit the participant's thinking style. |
| Support needs | Highlights where extra structure, coaching, pacing, or practice may help. |

### 4. `src/components/DisclaimerSection.tsx`
A full-width, centered text block near the bottom (above the Footer CTA).
Exact copy:
> This tool is for self-understanding, learning support, and program guidance. It is not a medical, psychological, educational, or diagnostic assessment.

Styling: small text, muted, with a thin top border. No card container. This is a legal footer-like strip.

---

## Component to Update

### `src/components/LandingHero.tsx`
- Import the four new components.
- Remove the existing "Program Context" section (lines ~188-233).
- Insert the new sections in the correct order:
  1. ProfileIdentifiesSection
  2. WhyThisMattersSection
  3. DiscoverMyMindSpine
  4. SingleTestPicker
  5. ProgramConnectionSection
  6. What you get after assessment (existing)
  7. Methodology (existing)
  8. DisclaimerSection
  9. Footer CTA
  10. FAQ / SEOFooter

- Update the `scrollToProgram` scroll target to point to the new `ProgramConnectionSection` ID (e.g., `id="program-connection"`).

---

## Design Tokens to Use
- Backgrounds: `bg-background`, `bg-card/30`
- Borders: `border-border`
- Typography: `font-serif` for headings, default sans for body
- Text: `text-foreground`, `text-muted-foreground`, `text-muted-foreground/70`
- Cards: flat with `border border-border` and subtle background (no gradients, no glow, no glassmorphism)
- Icons: `lucide-react`, strokeWidth 1.5, muted color
- Spacing: `py-16 sm:py-24` between sections, `max-w-5xl mx-auto` content width
- No framer-motion on the new sections (static, calm)

## Out of Scope
- No changes to assessment logic, scoring, results, pricing, auth, or backend.
- No changes to DiscoverMyMindSpine, SingleTestPicker, HomeFAQ, SEOFooter, or Methodology sections.
- No new color tokens in `index.css`.
