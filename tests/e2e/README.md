# End-to-End Test Workflows

Free + easy QA harness for the assessment funnels. Two layers:

1. **Automated Playwright scripts** (`flows/`) — drive a headless browser through each
   test end-to-end, screenshot every step, and assert the results screen renders.
2. **Manual QA checklist** (`MANUAL_QA.md`) — human walkthrough for things the
   browser can't reliably judge (LLM output quality, Stripe live redirect, etc).

## Why this shape?

- No new dependencies. Playwright is already available in the Lovable sandbox.
- Each flow is a standalone Python script — easy to run one, easy to run all.
- Screenshots land in `tests/e2e/screenshots/<flow>/` for visual diffing by eye.

## Running

From the Lovable build sandbox (dev server already on `http://localhost:8080`):

```bash
# one flow
python3 tests/e2e/flows/iq.py

# everything (sequential)
python3 tests/e2e/run_all.py
```

Each script exits non-zero on failure and prints which step failed.

## Coverage

| Flow                          | Script                        |
| ----------------------------- | ----------------------------- |
| IQ / cognitive reasoning      | `flows/iq.py`                 |
| Personality (Big Five + MBTI) | `flows/personality.py`        |
| Cognitive Profile             | `flows/cognitive_profile.py`  |
| Neurodivergent Mind           | `flows/neurodivergent.py`     |
| Depth Psychology              | `flows/depth.py`              |
| Results persistence (reload)  | `flows/persistence.py`        |
| Combined Dashboard            | `flows/dashboard.py`          |
| Promo code `LHT` unlock       | `flows/promo_code.py`         |

> Promo code is **`LHT`** (server-side allowlist in
> `supabase/functions/check-premium-access/index.ts`). The script signs the
> tester in first — see `MANUAL_QA.md` for how to provide credentials.
