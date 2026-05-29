## Goal
Add a new primary **Cognitive Profile** assessment that supports AppliedAIWorks.ca, grounded in established psychometric instruments, with a serious report-style results page. Keep all existing modules (IQ, Personality, Neurodivergent Mind, Depth Psychology) available but reorder so IQ becomes the last tile, not the first. No changes to existing modules' content or scoring.

## Scope
- Build one new module end to end: data, quiz UI, scoring, results page.
- Reorder modules on the landing page so Cognitive Profile is first and IQ is last.
- Existing modules remain available and unchanged.

## Psychometric Grounding (so this is not "random slop")
Each of the 10 categories maps to a published, peer-reviewed instrument we draw items and scoring logic from (lightly adapted, 5-point Likert):

| # | Category | Source instrument |
|---|---|---|
| 1 | Information processing | VARK (Fleming) + dual-coding theory |
| 2 | Learning style | Kolb Learning Style Inventory (Diverging / Assimilating / Converging / Accommodating) |
| 3 | Problem-solving approach | Sternberg Triarchic (Analytic / Creative / Practical) |
| 4 | Communication style | Merrill–Reid Social Styles (Driver / Expressive / Amiable / Analytical), anchored to Big Five facets |
| 5 | Structure / organization needs | Personal Need for Structure (Neuberg & Newsom) |
| 6 | Comfort with ambiguity | MSTAT-II (McLain) Tolerance of Ambiguity |
| 7 | Creative / divergent thinking | Kirton Adaption–Innovation Inventory (KAI) |
| 8 | Technology & AI readiness | Technology Readiness Index 2.0 (Parasuraman) adapted for AI |
| 9 | Support preferences | Self-Determination Theory autonomy/structure (Deci & Ryan) |
| 10 | Program-fit indicators | Need for Cognition (Cacioppo & Petty) + General Self-Efficacy (Schwarzer) |

40 items total, 3–5 per category. Neutral phrasing, no right/wrong, 5-point agree scale. Items are paraphrased — we never ship verbatim copyrighted scale text.

## Architecture

### New files
- `src/data/cognitiveProfileQuestions.ts` — 40 items typed by category, 5-point Likert, with `reversed` flag and per-archetype weight map. Includes scoring function `calculateCognitiveProfile(answers): CognitiveProfileResults`.
- `src/data/cognitiveProfileArchetypes.ts` — the 8 archetype definitions (description, strengths, friction points, AI workflow categories, supports, suggested AppliedAIWorks starting point).
- `src/components/CognitiveProfileQuiz.tsx` — grouped quiz UI (one category section at a time, calm copy, progress shown as "Section 3 of 10 · Question 12 of 40", no playful copy, no timer).
- `src/components/CognitiveProfileResults.tsx` — report-style results page.

### Updated files
- `src/data/assessmentTypes.ts` — add `'cognitive-profile'` to `AssessmentType`, add `assessmentInfo` entry.
- `src/hooks/useDiscoverMyMind.ts` — reorder `MAP_MY_MIND_ORDER` to `['cognitive-profile', 'personality', 'neurodivergent', 'depth', 'iq']`.
- `src/components/DiscoverMyMindSpine.tsx` — `stepIcons` gains entry for `cognitive-profile`; grid auto-handles 5 tiles.
- `src/components/SingleTestPicker.tsx` — add Cognitive Profile as first option, reorder so IQ is last.
- `src/pages/Index.tsx` — wire new game states `'cognitive-profile-quiz'` and `'cognitive-profile-results'`, persist results via `usePersistedResults` (extend store), route from preview/picker.
- `src/hooks/usePersistedResults.ts` — add `cognitiveProfile` slot.

### Out of scope
- IQ, Personality, Neurodivergent, Depth quizzes/results: no changes.
- Combined Dashboard, premium gating, payment flow: unchanged. Cognitive Profile is free, like other first-time modules.
- No DB schema changes (results stored in localStorage like existing modules).

## Quiz Experience (`CognitiveProfileQuiz.tsx`)
- One category section visible at a time. Section header shows category name + one-line neutral description.
- Each item is a 5-point scale: Strongly disagree · Disagree · Neutral · Agree · Strongly agree.
- Top progress bar: "Section X of 10 · Question Y of 40". No countdown. No emojis. No "correct" feedback.
- Navigation: Back / Continue. Section auto-advances when all items in the section are answered (Continue button enables).
- Calm visual language matching the rebranded design system (serif headers, restrained slate-indigo accent, no pulsing dots).

## Scoring Model
1. Reverse-score flagged items, normalize each category to 0–100.
2. Compute archetype scores by weighted sum of category scores (weights defined per archetype in `cognitiveProfileArchetypes.ts`).
3. Sort archetypes; **primary** = highest, **secondary** = second highest (must be within 15 pts of primary to qualify, otherwise omit secondary).
4. Return full sorted archetype scores plus the 10 category scores for the report's "full breakdown" view.

## 8 Archetypes (exact labels)
Systems-oriented thinker · Visual-pattern thinker · Conceptual strategist · Practical executor · Relational communicator · Exploratory learner · Structure-supported learner · High-divergence creative thinker.

Each archetype object contains: `label`, `summary`, `thinkingProfile` (2–3 paragraphs), `strengths[]`, `frictionPoints[]`, `aiWorkflows[]` (drawn from the request's list), `supports[]` (drawn from the request's list), `startingPoint` (suggested AppliedAIWorks starting point).

## Results Page (`CognitiveProfileResults.tsx`)
Report-style layout, sections in order:

1. **Header card** — "Your Cognitive Profile", participant primary archetype name, one-line summary, generation date.
2. **Primary + Secondary archetype cards** — side-by-side. Each shows label, summary, match score.
3. **Your thinking profile** — paragraph explanation from the primary archetype (with secondary influences acknowledged in one sentence).
4. **Strengths to build from** — bulleted list, framed for AppliedAIWorks participation.
5. **Common friction points** — bulleted list, neutral language.
6. **AI workflows that may fit** — card grid of recommended workflow categories (prompt-supported planning, visual mapping, structured task breakdowns, writing support, workflow automation, research synthesis, resume/career tools, business/project planning, learning companions, accountability systems).
7. **Supports that may help** — bulleted list (templates, step-by-step guidance, examples, coaching check-ins, slower onboarding, visual aids, practice exercises, structured prompts, accountability routines).
8. **Suggested starting point in Applied AI Works Canada** — single highlighted recommendation card.
9. **Full profile breakdown** — collapsible section showing all 8 archetype scores as horizontal bars + the 10 category scores. This is the "no single label" honest view.
10. **Next steps** — link to continue with other modules (Personality, Neurodivergent, Depth, IQ in that order).
11. **Disclaimer footer** (exact copy): "These results are intended to support self-understanding and program guidance. They are not a diagnosis and should not be used as a substitute for medical, psychological, educational, or career counselling advice."

Visual language: serif headings, structured cards on `bg-card` with `border-border`, generous whitespace, single muted accent. No gradients, no glows, no animations beyond fade-in. Print-friendly.

## Module Ordering After This Change
Landing page tile order (Spine + SingleTestPicker): **Cognitive Profile → Personality → Neurodivergent Mind → Depth Psychology → IQ**.

## Open Decision (defaulting unless you object)
- **Saving behavior:** results persist to localStorage only for now, like the existing modules. Adding to the `saved_assessments` Supabase table can come in a follow-up if you want server persistence.
