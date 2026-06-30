
## Why this matters

Today the unified ND results screen tells users "Possibly" / "Likely Yes" and hides the actual numbers a few scrolls down. ADHD (ASRS), AQ-50, and cognitive style all compute usable scores under the hood, but there is no headline number, no percentile context, and the autism screener is on a separate hidden route. People expect a score they can read, share, and compare — same treatment the IQ test already gets.

## What changes (user-visible)

1. **Composite ND Index (0–100)** at the top of the results screen, with a band label (Typical · Emerging · Pronounced · Pervasive) and a one-sentence interpretation. Built from weighted sub-scores so the same answers always produce the same index.
2. **Population percentile** beside every sub-score ("higher than 84% of adults"), driven by published norms where they exist (ASRS, AQ-50) and modeled distributions for the cognitive-style dimensions.
3. **Numeric score card** as the first block after the index — ADHD Part A x/6, AQ-50 x/50, six cognitive dimensions, plus the new module scores — instead of being buried under the likelihood chip.
4. **Five new sub-modules** integrated into the same flow:
   - Autism (AQ-10 short-form by default, with optional expansion to AQ-50)
   - Dyslexia (Adult Dyslexia Checklist, 15 items)
   - Dyscalculia (AMAS-derived adult screener, 10 items)
   - Dyspraxia (Adult DCD checklist, 10 items)
   - Sensory processing + RSD (12 items combined, AASP/RSD-inspired)
5. **Module-level "take just this one" entry points** so users who only want the dyslexia screener don't have to do all 80+ questions.

## Total length / pacing

The combined ND assessment grows from 38 → ~95 questions. To keep completion rates honest:

- Existing 20 cognitive + 18 ADHD items stay required.
- The five new modules are gated behind an explicit "Add deeper screening" step after the core 38, with per-module checkboxes and time estimates.
- Index + percentiles are computed and shown even if a user only completes the core 38.

## The composite ND Index — definition

A transparent weighted formula, documented in the results screen's "How is this computed?" disclosure:

```text
NDIndex =
   0.35 * ADHD_z         (from ASRS Part A + B counts, z-scored vs. WHO norms)
 + 0.25 * Autism_z       (AQ-10 or AQ-50, z-scored vs. Baron-Cohen population data)
 + 0.20 * CogStyle_z     (max of hyperfocus / divergent / pattern dimensions)
 + 0.08 * Dyslexia_z
 + 0.06 * Dyscalculia_z
 + 0.03 * Dyspraxia_z
 + 0.03 * SensoryRSD_z

→ mapped to 0–100 via standard-normal CDF, then banded:
   0–39  Typical range
   40–59 Emerging signal
   60–79 Pronounced signal
   80–100 Pervasive signal
```

Modules the user skipped contribute 0 with weight redistributed to completed modules, so partial-completion indices remain meaningful.

## Percentile methodology

- **ADHD**: lookup table built from WHO ASRS validation data (Kessler 2005).
- **AQ-50 / AQ-10**: lookup from Baron-Cohen 2001 + Allison 2012 distributions.
- **Cognitive style dimensions**: modeled normal distribution centered at 50 (our scale midpoint) with σ derived from in-app answer variance — clearly labelled "modeled" in the UI, not "norm-referenced".
- **New screeners**: published cut-scores where available; otherwise we show banded interpretation ("above typical screening threshold") instead of a percentile, to avoid faking precision.

All lookups live in a single `src/lib/ndNorms.ts` so they can be revised without touching components.

## Technical layout (for the dev reader)

- New `src/data/dyslexiaQuestions.ts`, `dyscalculiaQuestions.ts`, `dyspraxiaQuestions.ts`, `sensoryRsdQuestions.ts`, `aq10Questions.ts`, each exporting questions + a `calculate*Results` function shaped like `ADHDResults`.
- `src/data/neurodivergentMindQuestions.ts` extended: `NeurodivergentMindResults` gains optional `autism`, `dyslexia`, `dyscalculia`, `dyspraxia`, `sensoryRsd` slots plus a new `composite: { index, percentile, band, label, weights, includedModules }`.
- New `src/lib/ndComposite.ts` implements the weighted formula + redistribution.
- New `src/lib/ndNorms.ts` holds percentile lookups + z-score helpers.
- `NeurodivergentMindQuiz.tsx` gets a "deeper screening" gate after question 38; each opt-in module renders inline as a sub-section with its own progress.
- `NeurodivergentMindResultsScreen.tsx` reorders to: ND Index hero → numeric score card → existing per-module sections (each gaining a percentile pill) → recommendations.
- `AutismTest.tsx` page route stays for SEO but its CTA now starts the unified ND flow with autism pre-selected.
- Persistence: `usePersistedResults` extended to store the new module slots; existing records remain valid (missing modules just render as "not taken").
- Cross-test intelligence (`crossTestIntelligence.ts`, `blindSpotIntelligence.ts`) reads `composite.index` for any new synergy rules — existing rules untouched.

## Out of scope for this pass

- No changes to IQ, Personality, Depth, or Cognitive Profile modules.
- No backend schema change beyond storing the richer JSON in `saved_assessments.results` (already a `jsonb` column).
- No new edge function — composite + percentiles are pure client math.
- Pricing/premium gating unchanged; the deeper screening modules are free, same as today's ND module.

## Disclaimers

All new screeners get the same educational/not-diagnostic banner. The composite index gets a dedicated tooltip explaining it is a self-report aggregate, not a clinical metric, with explicit links to seek professional evaluation when indicated.
