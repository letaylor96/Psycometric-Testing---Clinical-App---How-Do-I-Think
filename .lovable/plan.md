## Goal

Reposition the landing experience from "fun IQ quiz" to a credible, calm, structured **cognitive style + AI-readiness self-assessment** that supports Applied AI Works Canada participants. No clinical claims, no gamified energy.

## Scope (this plan)

Frontend / copy / visual register only. No changes to assessment logic, scoring, backend, payments, or routing. Existing 4-assessment funnel stays intact — we change how it is *framed and presented*.

## 1. Hero rewrite (`src/components/LandingHero.tsx`)

Replace the headline, subhead, and CTAs:

- **Headline:** "Understand how you think — so you can build from your strengths."
- **Subheading:** "A structured cognitive and personality profile designed to help participants understand how they learn, solve problems, communicate, and adapt to AI-enabled work."
- **Secondary line (muted, smaller):** "Built to support Applied AI Works Canada by helping participants identify where they may thrive, where they may need support, and how to start with the right AI-enabled tools and workflows."
- **Primary CTA:** `Start the assessment` → triggers `onStart` (currently "Start Free IQ Test")
- **Secondary CTA:** `Learn how it supports the program` → smooth-scrolls to a new "Program Context" section

Remove the "First assessment free · No sign-up required" line — replace with neutral "No sign-up required to begin."

Drop the gold pulsing dot / "Up next" ribbon energy from the spine header (keep progress, lose the lottery vibe).

## 2. Reframe the guided-map block (`DiscoverMyMindSpine.tsx`)

Copy-only changes, no structural rework:

- Title: "Discover My Mind — Full Guided Profile" → **"Full Cognitive & AI-Readiness Profile"**
- Subhead: "Four assessments. Start and Resume Anytime…" → **"Four structured modules. Complete in any order — your profile builds as you go."**
- Primary button: "Start the Full Guided Map" → **"Begin the assessment"**
- Footer microcopy "Each step tags ADHD, autism-spectrum, gifted, and defense indicators across your profile" → **"Each module surfaces cognitive style, learning preferences, and potential support needs — not a clinical diagnosis."**
- Step "Up next" pill → **"Next module"** (neutral, no pulse)
- Per-step accent colours toned down to a single restrained palette (muted slate + one accent) instead of blue/emerald/amber/purple — see §5.

## 3. Reframe the single-test picker (`SingleTestPicker.tsx`)

- Section heading "OR JUST PICK A SINGLE TEST / Take One Test on Its Own" → **"Or take a single module / Focus on one lens at a time."**
- Card labels: keep instrument names (ASRS-v1.1, AQ-50) but reword descriptions away from "evaluation"/"screening" tone toward **"self-report inventory"** and **"reflection module."**
- Rename "ADHD Evaluation" / "Autism Spectrum Evaluation" card titles → **"Attention & Focus Patterns"** / **"Social & Sensory Processing Patterns"** (instrument name stays in the meta line for credibility).

## 4. AI Insights + CTA + Methodology sections (`LandingHero.tsx`)

- "Go Beyond the Numbers" → **"What You Get After the Assessment"**
- "AI-Powered Insights" pill → **"Personalized Synthesis"**
- "Historical Mind Match" card → keep name, reword description to **"See which documented thinking styles align with yours — for reflection, not comparison."** Remove "20+ historical figures" sparkle line; replace with **"Reflective benchmark"**.
- "Therapist Report" card → rename **"Practitioner-Ready Summary"**, description: **"A structured summary you can share with a coach, mentor, or clinician."**
- "Ask AI About Results" → keep; reword to **"Explore what your profile means for your work, learning, and AI workflows."**
- Footer CTA section: replace "Ready to Begin? / Start Free IQ Test" with **"Ready to begin your profile?"** and CTA **"Start the assessment"**. Remove the gold-brain circle ornament; replace with a thin rule + small-caps eyebrow.

## 5. New "Program Context" section (between Hero and AI Insights)

A short, calm band that the secondary CTA scrolls to. Three columns, no icons-as-decoration:

- **For participants** — Identify how you process information and where AI tools fit your workflow.
- **For facilitators** — Understand cohort patterns and where individuals may need extra support.
- **For the program** — A shared language for cognitive style, learning preferences, and AI-readiness across Applied AI Works Canada.

Includes a one-line disclaimer: *"This is a structured self-assessment, not a clinical diagnostic tool. It does not diagnose ADHD, autism, learning disabilities, or mental health conditions."*

## 6. Visual register pass (`src/index.css` + component classes)

Goal: serious psychometric platform, not neon dashboard.

- Keep deep navy background but reduce saturation on `--primary` (purple) from `252 100% 69%` → a calmer `230 55% 62%` (slate-indigo) for the assessment surfaces. Gold (`--yellow`) stays but reserved for progress + key affordances only — not headers, not decorative dots.
- Replace the gradient hero glows (`bg-yellow/[0.04]`, blurred yellow blob) with a single subtle top hairline + flat background.
- Remove `animate-pulse` decorations from the spine header and step pills.
- Headlines: keep Crimson Pro serif but drop the `text-primary` color swap on "Think?" — set entire H1 in foreground; use a thin underline accent instead. Tracks tighter, weight 500 instead of 700.
- Cards: remove gradient fills (`from-amber-500/10 to-amber-500/5` etc.) on the AI Insights trio — flat `bg-card` + 1px border, single muted accent per card.
- Animations: reduce framer-motion `y: 15` entrances to `y: 6`, durations to 0.3s. No hover lift on the spine step cards beyond a border-color change.

## 7. Header / nav (`LandingHero.tsx` top bar)

- Brand lockup keeps "How Do I Think" but adds a small subtitle line on desktop: **"An Applied AI Works Canada assessment."**
- Replace the round yellow brain badge with a simple monogram mark (HDT) in a thin-bordered square — calmer, less mascot-like.

## 8. Language sweep (find/replace across landing surfaces only)

Across `LandingHero.tsx`, `DiscoverMyMindSpine.tsx`, `SingleTestPicker.tsx`, `HomeFAQ.tsx`, `SEOFooter.tsx`:

- "IQ test" → "cognitive reasoning module" (except where it refers to the specific instrument)
- "unlock", "discover your genius", "great minds" → removed or replaced with "identify", "map", "documented thinking styles"
- "fun" / "quiz" / "test" (in marketing copy) → "module" / "assessment" / "self-report"
- "diagnose", "evaluation" in marketing copy → "self-report" / "reflection"
- "ADHD screening", "autism screening" → "attention patterns", "social/sensory patterns" (instrument names retained in meta lines)

## Out of scope

- No changes to the assessment instruments themselves, scoring, AI prompts, or results screens (those can be a follow-up pass).
- No changes to pricing, premium gating, or auth.
- No new routes or backend work.

## Files touched

```text
src/components/LandingHero.tsx         (hero, sections, CTAs, copy)
src/components/DiscoverMyMindSpine.tsx (copy, tone, restrained accents)
src/components/SingleTestPicker.tsx    (copy, card titles)
src/components/HomeFAQ.tsx             (language sweep)
src/components/SEOFooter.tsx           (positioning line)
src/index.css                          (calmer primary, ornament reduction)
```

## Open questions before I build

1. Should the secondary CTA scroll to the new Program Context section, or link out to AppliedAIWorks.ca? (I assumed scroll.)
2. Keep the "Historical Mind Match" feature visible on the landing page at all, or hide it entirely under this serious repositioning? (I assumed reword + keep.)
3. Confirm we keep the gold accent as the progress/affordance colour, or move fully to a slate-indigo single-accent system?