# Manual QA Checklist

Things the automated flows can't reliably verify. Run before every release.

## 1. Each assessment — happy path

For each of: **Cognitive Profile · Personality · Cognitive Style & Attention · Depth · Cognitive Reasoning**

- [ ] Landing → click test → preview renders with framework + question count + time estimate
- [ ] "Start Assessment" begins the quiz
- [ ] Progress indicator updates each question
- [ ] Back button preserves answers (or warns before clearing)
- [ ] Final question shows "See Results" (not "Next")
- [ ] Results screen renders within 3s (or for Depth, analyzing → results in <60s)
- [ ] Results copy is plain-language Narrative Mode first, technical stats collapsible
- [ ] Disclaimer banner ("educational, not diagnostic") visible

## 2. IQ-specific

- [ ] 13-minute timer counts down, turns amber under 3 min, destructive pulse under 1 min
- [ ] Auto-submits at 0:00 with whatever was answered
- [ ] Percentile + score band shown, with population comparison chart

## 3. Promo code unlock (`LHT`)

- [ ] Sign in (Google or email)
- [ ] Open any premium-gated module → PremiumGate modal opens
- [ ] Enter `LHT` → success toast, premium content unlocks
- [ ] `purchases` row exists with `assessment_type = 'bundle'`, `amount_cents = 0`,
      `stripe_session_id` starting with `promo_LHT_`
- [ ] Refresh the page → premium still unlocked (no re-prompt)
- [ ] Entering anything else (e.g. `WRONG`) → "Invalid code" error, nothing written

## 4. Results persistence

- [ ] Complete IQ → hard reload → results still visible on landing's progress tracker
- [ ] Complete a 2nd assessment → cross-test insight unlocks (Twice Exceptional etc.)
- [ ] Sign out → sign back in → saved_assessments rows still associated with user

## 5. Combined Dashboard

- [ ] Requires 2+ completed assessments
- [ ] Radar + bar charts render with real values (no NaN, no blank slices)
- [ ] Historical Mind Match populates after Personality + IQ + at least one more
- [ ] Career Match section gated behind premium

## 6. Depth Psychology (LLM)

- [ ] Free-form answers accept multi-sentence responses
- [ ] Analyzing screen shows staged progress (analysisStages)
- [ ] Final report parses cleanly (no raw JSON / no "undefined")
- [ ] "Try a different framework" re-uses answers, hits Gemini again, returns new analysis

## 7. Payment redirect (live Stripe — skip in sandbox)

- [ ] Click any paid CTA → Stripe Checkout opens in same tab
- [ ] On cancel, returnTo state restores you to the same results screen
- [ ] On success, premium unlocks without manual refresh

## 8. Edge cases

- [ ] Network drop mid-assessment → answers persisted in localStorage
- [ ] Very long depth answer (>2000 chars) → still submits
- [ ] Open two tabs, complete in one → other tab sees update on focus

---

## Known sharp edges (worth noting in test runs)

- `/free-iq-test`, `/personality-test`, `/adhd-test` all `navigate('/?startAssessment=...')`,
  but `Index.tsx` does **not** read that search param. The user lands on `/` but
  has to click the test card themselves. Either wire that param up in `Index.tsx`,
  or update the marketing pages to deep-link via state.
