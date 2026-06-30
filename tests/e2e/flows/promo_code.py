"""Promo code redemption flow.

The valid code is **LHT** (see supabase/functions/check-premium-access/index.ts).
Requires an authenticated session — the Lovable sandbox injects one via
LOVABLE_BROWSER_SUPABASE_* env vars when the user is signed in.

If those vars are missing, the script prints a friendly skip message and exits 0,
so it's safe to include in run_all.py.
"""
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _helpers import BASE_URL, click_first_visible, fail, ok, run, shot, step

PROMO_CODE = "LHT"


async def flow(page):
    session = os.environ.get("LOVABLE_BROWSER_SUPABASE_SESSION_JSON")
    storage_key = os.environ.get("LOVABLE_BROWSER_SUPABASE_STORAGE_KEY")
    if not (session and storage_key):
        print(
            "  ⚠ no managed Supabase session — sign in via the preview, then re-run.\n"
            "    (LOVABLE_BROWSER_AUTH_STATUS = "
            f"{os.environ.get('LOVABLE_BROWSER_AUTH_STATUS', 'unset')})"
        )
        return

    step("restore Supabase session")
    await page.goto(BASE_URL, wait_until="domcontentloaded")
    await page.evaluate(
        f"window.localStorage.setItem({json.dumps(storage_key)}, {json.dumps(session)})"
    )
    await page.reload(wait_until="domcontentloaded")

    step(f"call check-premium-access with promo {PROMO_CODE}")
    # The app surfaces the promo input in PremiumGate / settings; calling the
    # edge function directly is the deterministic check.
    result = await page.evaluate(
        """async ({ code }) => {
            const { supabase } = await import('/src/integrations/supabase/client.ts');
            const { data, error } = await supabase.functions.invoke('check-premium-access', {
                body: { promoCode: code },
            });
            return { data, error: error?.message ?? null };
        }""",
        {"code": PROMO_CODE},
    )
    print("    response:", result)
    if result.get("error"):
        fail(f"edge function errored: {result['error']}")
    data = result.get("data") or {}
    if not data.get("hasPremiumAccess"):
        fail(f"promo {PROMO_CODE} did NOT unlock premium (reason: {data.get('reason')})")
    if data.get("reason") != "promo_code":
        fail(f"unexpected reason: {data.get('reason')}")
    ok(f"promo {PROMO_CODE} unlocked premium")
    await shot(page, "promo_code", "99_unlocked")


if __name__ == "__main__":
    run(flow, flow="promo_code")
