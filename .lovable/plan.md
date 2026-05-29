## Status

The hard-banned phrases from the prior turn are already gone:
- `index.html` title/description/og/twitter/JSON-LD all use the new "Cognitive Style & AI Readiness Profile" wording
- `FreeIQTest.tsx` and `PersonalityTest.tsx` Helmet tags rewritten
- No more "Free IQ Test", "Learning style quiz", "Psychology assessments", "Personality quiz", "Unlock your genius", or "Discover your hidden type" matches anywhere in `src/`, `index.html`, or `public/`

## Remaining work — soft references to scrub

A second sweep caught residual "IQ test" and promotional "Discover your…" copy in shareable result cards, FAQ items, and a couple of legacy descriptions. Update these to the approved vocabulary (cognitive style profile, AI-readiness profile, structured self-assessment, thinking patterns, strengths and support needs, program guidance).

### Files to edit

1. **`src/components/HomeFAQ.tsx`** — line 26: rephrase question from "Is the cognitive reasoning module an IQ test?" → "What is the cognitive reasoning module?"
2. **`src/components/ResultsScreen.tsx`**
   - line 69 / 81: replace social share copy "discover your cognitive edge" → "structured self-assessment for thinking patterns and program guidance"
   - line 440: rewrite disclaimer line — remove "not a standardized IQ test", restate as "This module is part of a structured self-assessment and is not a diagnostic instrument."
3. **`src/components/TherapistReport.tsx`** line 72: change instrument label from "Pattern Recognition IQ Test (Raven's-style matrices)" → "Cognitive Reasoning Module (Raven's-style matrices)"
4. **`src/lib/crossTestIntelligence.ts`** line 88: replace "traditional IQ tests undervalue" → "traditional reasoning modules undervalue"
5. **`src/data/assessmentTypes.ts`** line 42 (personality `description`): "Discover your personality archetype, Myers-Briggs type…" → "A Big Five (OCEAN) personality module that contributes to your cognitive style profile and program guidance."
6. **`src/data/depthPsychologyQuestions.ts`** line 259: "Discover your archetypes…" → "Explore archetypes, shadow material, and individuation themes as part of your structured self-assessment."
7. **`src/pages/PersonalityTypePage.tsx`** line 96: visible heading "Discover Your Type" → "Explore this personality type"
8. **`src/pages/PersonalityTest.tsx`** line 25 (FAQ answer): "You'll discover your personality archetype…" → "You will see your Big Five trait pattern, equivalent MBTI type, and notes on how this contributes to your strengths and support needs for program guidance."
9. **Social-share copy** in:
   - `src/components/NeurodivergentMindResultsScreen.tsx` (lines 90, 97, 99)
   - `src/components/CognitiveStyleResultsScreen.tsx` (lines 66, 363, 365)
   - `src/components/DepthPsychologyResults.tsx` (lines 863, 864)
   - `src/components/ADHDResultsScreen.tsx` (line 239)
   - `src/components/PersonalityResultsScreen.tsx` (line 70)

   Replace each "Discover your…" / "Discover yours" closer with neutral wording like "Build your cognitive style profile →" or "Structured self-assessment for program guidance →". Keep emoji and dynamic score fields intact; only swap the trailing CTA phrase.

## Out of scope

- No changes to scoring, question banks, or routing
- No new images or design changes
- Existing IQ score, MBTI, and OCEAN result components stay functional — only copy strings change

## Verification

After edits, re-run:
```
rg -n -i "iq test|discover your|discover yours" src/ index.html public/
```
Expected: empty (or only matches inside the planned replacement phrases that we explicitly approve).
