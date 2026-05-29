## Overview
Add a visually strong, card-based 4-step process section immediately below the hero on the landing page. This section explains the assessment journey using numbered circles, a connecting progress line, professional icons, and concise copy — distinct from the existing `JourneyPathway` which remains further down the page.

## Changes

### 1. New component: `src/components/landing/ProfileClaritySection.tsx`
Build a 4-card horizontal process section (vertical on mobile) with:
- **Numbered circles** (01–04) positioned above each card, connected by a subtle dotted/solid progress line
- **Four cards** with distinct but restrained accent colours mapped to the design system:
  - Step 1 (Answer): `teal-soft` accent, `ListChecks` icon
  - Step 2 (Map): `teal` accent, `GitBranch` icon
  - Step 3 (Understand): `navy-deep` accent, `FileText` icon  
  - Step 4 (Start): `gold` accent, `Flag` icon
- **Card content** matching the user's exact copy for each step
- **Hover state**: `group-hover:-translate-y-1` + shadow elevation increase
- **Responsive**: horizontal grid on desktop (`md:grid-cols-4`), vertical stack on mobile with a vertical connecting rail
- Uses existing semantic tokens (`bg-card`, `border-navy-deep/10`, `font-serif`, `text-ink-muted`, etc.)
- Framer Motion `whileInView` staggered entrance animation

### 2. Update `src/components/LandingHero.tsx`
Import `ProfileClaritySection` and insert it between the hero `</section>` (line 197) and `<JourneyPathway />` (line 200).

## Design Details
- **Section title**: "How the profile creates clarity" — centred, with `font-serif` heading and `text-[11px]` uppercase eyebrow label in `teal`
- **Connecting line**: Desktop — horizontal gradient line (`from-teal-soft via-navy-deep/20 to-gold`) behind the numbered circles. Mobile — vertical gradient rail on the left of the cards.
- **Numbered circles**: 40px diameter, filled with step accent colour, white/cream number, `ring-4 ring-background` to punch through the line.
- **Cards**: cream background (`bg-card`), 1px `border-navy-deep/10`, 14px radius, generous padding (`p-7`), icon in accent colour with `strokeWidth={1.5}`.
- **No new dependencies** — uses `framer-motion` and `lucide-react` already in the project.

## Out of Scope
- No changes to assessment logic, routing, or data
- No changes to the existing `JourneyPathway` — it stays as-is below the new section
- No new npm packages