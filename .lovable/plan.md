## Plan: Add "What you'll learn" Outcome Chips Section

### Goal
Add a compact, visually distinct section called **"What you'll learn"** that shows 8 outcome chips with subtle icons and soft background colours. This section communicates the value users receive from completing the assessment.

### Placement
Insert the new section between the existing **ProfileClaritySection** and **JourneyPathway** on the landing page. Flow becomes:
Hero → How the profile creates clarity → **What you'll learn** → Journey pathway → Stage sections.

### Component: `src/components/landing/WhatYouLearnSection.tsx`
- **Layout**: Responsive grid — 4 columns on desktop (`lg:grid-cols-4`), 2 columns on tablet (`sm:grid-cols-2`), 1 column on mobile.
- **8 outcome chips**:
  1. Cognitive Style
  2. Learning Pattern
  3. Strengths
  4. Friction Points
  5. AI Workflow Fit
  6. Support Needs
  7. Starting Point
- **Design per chip**:
  - Small professional Lucide icon (e.g. Brain, BookOpen, Shield, AlertCircle, Workflow, HeartHandshake, MapPin)
  - Chip title in `font-serif` medium
  - Soft, themed background colour per chip (alternating between `teal-soft`, `gold-soft`, `cream-warm`, `navy-deep/5`)
  - Rounded-xl container with subtle border (`border-navy-deep/8`)
  - Compact padding (e.g. `p-5`)
  - Hover: `group-hover:-translate-y-0.5` + `group-hover:shadow-md`
- **Section header**: "What you'll learn" in serif, with short subtitle explaining purpose.
- **Entrance animation**: Framer Motion `whileInView` staggered fade-in (`staggerChildren: 0.05`).
- **Tokens**: Uses existing semantic tokens only (`bg-teal-soft`, `bg-gold-soft`, `bg-cream-warm`, `border-navy-deep/10`, `text-foreground`, `text-ink-muted`, `font-serif`). No hardcoded colours.

### Update: `src/components/LandingHero.tsx`
- Import `WhatYouLearnSection`.
- Insert `<WhatYouLearnSection />` between `<ProfileClaritySection />` (line 202) and `<JourneyPathway />` (line 205).

### Out of Scope
- No routing, data, or assessment logic changes.
- No new dependencies (uses `lucide-react` and `framer-motion`, already installed).