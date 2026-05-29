# Landing page redesign — Cognitive clarity journey

## Goal
Transform the current monochromatic, mostly-stacked landing page into a visually engaging page that walks the visitor through a clear 4-step journey, anchored by a polished sample-profile hero. Keep the tone serious and assessment-grade (not SaaS, not medical, not quiz-y).

## Scope
Frontend / presentation only. No changes to assessments, scoring, routing, edge functions, or data. All copy from the brief is used verbatim where specified.

---

## 1. Refined color system (`src/index.css`, `tailwind.config.ts`)

Move from the current near-monochrome paper/ink palette to a richer, restrained palette used purposefully (progression + stage colour coding, not decoration).

New semantic tokens (HSL):
- `--navy-deep` 222 47% 14% — primary text, hero background panel, step numbers
- `--navy` 222 40% 22%
- `--cream` 38 38% 96% — page background in light mode, card surfaces
- `--cream-warm` 36 30% 92% — section alternation
- `--teal` 182 38% 38% — muted teal, stage 2 (map), chart strokes
- `--teal-soft` 182 32% 88% — fills, chips
- `--gold` 38 72% 52% — warm amber, stage 4 (start), highlights, CTA accents
- `--gold-soft` 40 70% 90%
- `--ink-muted` 222 15% 38%

Rebind existing tokens so the rest of the app keeps working without per-component edits:
- `--background` → cream
- `--foreground` → navy-deep
- `--primary` → navy-deep (CTAs stay credible; gold used as accent, not primary fill)
- `--accent` → gold-soft / gold-foreground = navy-deep
- `--muted-foreground` → ink-muted
- Chart tokens repointed to navy / teal / gold / cream so radar/bar visuals match

Dark mode mirrors with navy-deep background, cream foreground, same teal and gold accents.

Add two utility gradients:
- `--gradient-hero`: subtle navy → navy-deep diagonal for the hero profile card
- `--gradient-stage`: cream → cream-warm for alternating sections

## 2. New journey concept (used throughout the page)

Four stages, colour-coded and numbered, referenced in hero, journey strip, and section anchors:

```text
01 Answer        02 Map           03 Understand     04 Start
structured  →    your thinking →  your profile   →  with the right
questions        pattern                              AI-enabled supports
teal-soft        teal             navy              gold
```

Visualized as a connected horizontal pathway (line with nodes on desktop, vertical rail on mobile). The same stage chips reappear above relevant sections so the visitor always knows where they are in the journey.

## 3. Hero redesign (`src/components/LandingHero.tsx`)

Replace the centered text-only hero with a two-column hero on desktop, stacked on mobile.

Left column (≈55%):
- Eyebrow chip: "Cognitive & AI-Readiness Self-Assessment"
- H1 (unchanged): *Understand how you think — so you can build from your strengths.*
- Subheading (unchanged): *A structured cognitive and personality profile designed to help participants understand how they learn, solve problems, communicate, and adapt to AI-enabled work.*
- Support line (unchanged): *Built to support Applied AI Works Canada by helping participants identify where they may thrive, where they may need support, and how to start with the right AI-enabled tools and workflows.*
- Primary CTA: **Start the assessment**
- Secondary CTA: **See what the profile includes** (smooth-scrolls to the new "What your profile includes" section instead of the program section)
- Small trust line: "No sign-up required. ~25 min total across modules."

Right column (≈45%) — new sample profile preview card (component below).

Below the two columns, the horizontal **Journey strip** (4 numbered nodes connected by a thin line, color-coded as above). Each node is a button that scrolls to the matching section.

## 4. New components

### `src/components/landing/SampleProfilePreview.tsx`
A polished, static report-style card titled **Your Thinking Profile** (clearly labelled "Sample preview"). Contains:
- A small radar/spider chart (SVG, no new deps — hand-rolled or via existing recharts) with 5 axes: Cognitive Style, Learning Pattern, Problem-Solving, Communication, AI Workflow Fit.
- A "Support Needs" chip row beside the radar.
- An "At a glance" summary block (2–3 short lines like *"Pattern-led thinker. Reflective learner. Strong with structured AI workflows."*).
- Footer micro-line: "Generated from your responses across 4 modules."
- Soft navy gradient background, cream text, gold ring on one radar segment for emphasis, teal stroke for the radar polygon.

### `src/components/landing/JourneyPathway.tsx`
Horizontal 4-step pathway with numbered circles, connecting line, stage labels, and a one-line description per stage. Active hover state lifts the node. On mobile, becomes a vertical rail. Used both in the hero area and as the anchor for "How it works".

### `src/components/landing/JourneyStageChip.tsx`
Small reusable "Stage 02 · Map" chip placed above the relevant page sections so the journey threads through the whole page.

## 5. Section flow (after hero)

```text
Hero (two-column + sample profile)
  ↓
Journey pathway (4 connected steps)
  ↓
Stage 01 chip — "What your profile includes" (ProfileIdentifiesSection, restyled with cream cards + teal accents)
  ↓
Stage 02 chip — "How your thinking is mapped" (WhyThisMattersSection, restyled)
  ↓
Stage 03 chip — Module picker (DiscoverMyMindSpine + SingleTestPicker, restyled with stage colours per module)
  ↓
Stage 04 chip — "Start with the right AI-enabled supports" (ProgramConnectionSection, restyled with gold accents)
  ↓
What you get after the assessment (existing 3-card section, restyled)
  ↓
Methodology (existing, restyled)
  ↓
Disclaimer + final CTA + FAQ + Footer (unchanged structurally, restyled)
```

The existing section components are reused and only restyled via the new tokens; their props, copy logic, and behavior are unchanged unless noted.

## 6. Visual treatment changes

- Cream page background; alternate sections with `--cream-warm` so the page reads as bands rather than one flat surface.
- Cards: cream background, 1px navy/10% border, soft shadow, 14px radius. Replace the current generic `bg-card border-border` look.
- CTAs: primary = navy-deep fill / cream text with subtle gold underline on hover; secondary = navy outline.
- Headings stay serif (existing). Eyebrows stay uppercase tracked, but use `--teal` for stage 2/3 sections and `--gold` for stage 4 to colour-code progression.
- Add a single quiet decorative element behind the hero: a faint connected-dots pattern in teal at low opacity — references the "mapping" metaphor without becoming playful.

## 7. Out of scope

- No changes to assessment questions, scoring, archetypes, routing, or data files.
- No changes to `/personality-test`, `/free-iq-test`, or other subpages (token rebind will cascade automatically).
- No new dependencies; radar uses inline SVG or existing recharts already in the project.
- No copy changes beyond what the brief specified.

---

## Technical details

Files created:
- `src/components/landing/SampleProfilePreview.tsx`
- `src/components/landing/JourneyPathway.tsx`
- `src/components/landing/JourneyStageChip.tsx`

Files edited:
- `src/index.css` — new tokens + rebinds for light and dark
- `tailwind.config.ts` — expose `navy`, `cream`, `teal`, `gold` semantic colour groups
- `src/components/LandingHero.tsx` — two-column hero, journey strip, section ordering, stage chips
- `src/components/ProfileIdentifiesSection.tsx` — restyle to new tokens, add stage chip
- `src/components/WhyThisMattersSection.tsx` — restyle, add stage chip
- `src/components/ProgramConnectionSection.tsx` — restyle with gold accents, add stage chip
- `src/components/DiscoverMyMindSpine.tsx` and `src/components/SingleTestPicker.tsx` — restyle module tiles with per-stage accent colours (no logic changes)

Verification after build:
- Visual QA via browser preview at desktop (1335px) and mobile widths.
- Confirm hero radar renders, journey pathway connects, alternating section bands read correctly.
- Confirm no banned phrases reintroduced (`rg -ni "iq test|discover your|unlock your genius"` empty).
