## Part 1 — Finish wiring the Cognitive Profile module

Clean up the partial integration from the previous turn so the new assessment runs end-to-end.

- **`src/pages/Index.tsx`**: Remove duplicate code fragments left from the prior edit. Add clean handlers and routing for `cognitive-profile-quiz` and `cognitive-profile-results` states. Wire the "Start Cognitive Profile" entry point from `SingleTestPicker` and the guided spine.
- **`src/hooks/useDiscoverMyMind.ts`**: Confirm `cognitive-profile` is in the assessment order (first) and IQ is last; add any missing state transitions.
- **`src/hooks/usePersistedResults.ts`**: Persist Cognitive Profile results to localStorage alongside other modules.
- **`src/components/CognitiveProfileQuiz.tsx` / `CognitiveProfileResults.tsx`**: Verify props match what `Index.tsx` passes; fix any mismatches.
- Smoke-check: landing → start Cognitive Profile → answer → results page renders primary + secondary archetype + full breakdown + disclaimer.

## Part 2 — Sitewide rebrand: SEO + visible copy

### Metadata (`index.html`)
- `<title>` → `How Do I Think? | Cognitive Style & AI Readiness Profile`
- `<meta name="description">` → `A structured self-assessment that helps participants understand how they think, learn, solve problems, communicate, and adapt to AI-enabled work through Applied AI Works Canada.`
- Update `og:title`, `og:description`, `twitter:title`, `twitter:description` to match.
- Keep canonical and og:url pointing to current domain.

### Per-route Helmet tags
Scan `src/pages/*` and `src/components/seo/*` (if present) for hardcoded "IQ test", "Learning style quiz", "Psychology assessments", "Personality quiz", "Unlock your genius", "Discover your hidden type", "Free IQ" and replace with the approved vocabulary:
- Cognitive style profile
- AI-readiness profile
- Structured self-assessment
- Learning and support profile
- Thinking patterns
- Strengths and support needs
- Program guidance

### Visible copy sweep
Ripgrep the codebase for the banned phrases and update every match in:
- Landing sections (`LandingHero`, `WhyThisMattersSection`, `ProfileIdentifiesSection`, `ProgramConnectionSection`, `AssessmentPreview`, `SingleTestPicker`, `DisclaimerSection`)
- Tile titles/descriptions in `assessmentTypes.ts` (rename "IQ Test" tile copy to "Cognitive Reasoning" framing already in place; ensure no "Free IQ" / "Unlock your genius" remains)
- Any MBTI / personality-type landing pages under `src/pages/`
- Result share cards and social meta in `src/features/sharing` (if present)
- `public/robots.txt` / `sitemap.xml` only if they contain old phrases

### JSON-LD
- Update Organization / WebSite name + description to match new positioning.
- Remove FAQ entries that reference "IQ test" / "personality quiz" framing; rewrite around cognitive style + AI readiness.

## Out of scope
- No changes to the IQ, Personality, Neurodivergent, or Depth Psychology question banks or scoring (the modules stay available, just renamed/repositioned where surfaced).
- No backend/schema changes.
- No new images.

## Verification
- Read `index.html` after edit to confirm new title/description.
- `rg -i "free iq|iq test|learning style quiz|psychology assessments|personality quiz|unlock your genius|hidden type"` returns no matches in `src/`, `index.html`, `public/`.
- Manually walk the landing → Cognitive Profile flow in preview.
