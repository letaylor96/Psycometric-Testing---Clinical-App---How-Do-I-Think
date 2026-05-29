## Plan: Final cleanup pass for tone, consistency, and visual coherence

### Findings
After reviewing the full landing page, most copy and design already aligns with the executive, Applied AI Works Canada–oriented direction. Three concrete issues remain:

1. **Redundant journey section** — `JourneyPathway` and `ProfileClaritySection` both present a 4-step "how it works" with nearly identical content. This reads as filler.
2. **Monochrome dashboard-heavy sections** — `DiscoverMyMindSpine` and `SingleTestPicker` are styled with bare `bg-foreground` / `text-muted-foreground` / hard rectangles. They feel like a generic SaaS dashboard and clash with the warm navy-deep / teal / gold / cream-warm palette used everywhere else.
3. **Sample preview minor copy** — `SampleProfilePreview` shows a green "Complete" badge and a `v · sample` footer string that read as faux-product chrome.

Everything else (FAQ, footer, disclaimer, ProfileIdentifiesSection, ProgramConnectionSection, WhyThisMattersSection, WhatYouLearnSection, SampleReportPreview, WhyThisMattersCompanion, Methodology, "What you get after", Footer CTA) already uses the right tone — no copy changes needed there.

### Changes

#### 1. `src/components/LandingHero.tsx`
- Remove the `<JourneyPathway />` block and its import. `ProfileClaritySection` already covers the same four-step journey with stronger visuals.
- Keep all other section ordering as-is.

#### 2. `src/components/SingleTestPicker.tsx` — restyle (no copy changes)
- Container: `bg-card/40` → `bg-cream-warm/40`, border to `border-navy-deep/10`, rounded `rounded-2xl`.
- Divider label text from `text-muted-foreground` → `text-teal` with same uppercase tracking.
- Heading: keep "Focus on one lens at a time." but switch helper text to `text-ink-muted`.
- Each card: `bg-background` → `bg-card`, `border-border` → `border-navy-deep/10`, hover `hover:border-teal/40 hover:shadow-md hover:-translate-y-0.5`, rounded `rounded-xl`.
- Icon chip: warmer — `bg-cream-warm`, `text-teal`, `border-teal/20`.
- Module title stays `font-serif`, meta uses `text-ink-muted`, blurb uses `text-ink-muted`, note italic in `text-ink-muted/70`.
- "Begin module" CTA uses `text-teal` (or `text-navy-deep`) instead of `text-foreground/80`.

#### 3. `src/components/DiscoverMyMindSpine.tsx` — restyle (no logic changes)
- Outer card: `bg-card` + `border-border` → `bg-card` + `border-navy-deep/10`, `rounded-2xl`, soft shadow.
- Header icon chip: warm `bg-cream-warm`, `border-navy-deep/10`, icon `text-teal`.
- Eyebrow label `text-muted-foreground/80` → `text-gold` with current letterspacing.
- Progress bar fill `bg-foreground/70` → gradient teal → gold (`linear-gradient(to right, hsl(var(--teal)), hsl(var(--gold)))`); track `bg-navy-deep/10`.
- Step cards: warm card surface (`bg-card`), `border-navy-deep/10`, hover `hover:border-teal/40`. Done state uses `border-teal/40` + small teal check; next state uses `border-gold/40` and gold "Next module" label.
- Module icon chip: `bg-cream-warm`, icon `text-teal`.
- Primary CTA: `bg-navy-deep text-cream hover:bg-navy` to match hero CTA.
- Bottom disclaimer line stays as-is but uses `text-ink-muted/70`.

#### 4. `src/components/landing/SampleProfilePreview.tsx` — light copy polish
- Change the top-right pill from `Complete` (green-ish gold) to `Sample · For illustration` to match `SampleReportPreview` and avoid implying a real result.
- Replace footer right-side `v · sample` with `For illustration only`.
- No structural / radar / color changes.

### Out of scope
- No copy changes to FAQ, footer, disclaimer, methodology, or any of the already-aligned narrative sections.
- No new sections, routes, data, or backend changes.
- No changes to assessment logic, scoring, or routes.
- Existing routes (e.g. `/free-iq-test`) stay — the URL slug is SEO history; the *label* shown to users is already "Cognitive Reasoning" everywhere.

### Result
After this pass:
- One clear 4-step process (`ProfileClaritySection`) instead of two.
- Module picker and guided-profile spine read as part of the same warm, serious brand instead of a separate monochrome dashboard.
- Sample preview language matches the rest of the page.
- No quiz / free-IQ / hype wording remains in user-facing copy on the landing page.