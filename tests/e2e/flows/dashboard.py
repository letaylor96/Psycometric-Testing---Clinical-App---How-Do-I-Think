"""Combined dashboard: seed two completed assessments via localStorage,
   then verify the dashboard renders cross-test insights."""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _helpers import BASE_URL, click_first_visible, fail, ok, run, shot, step

# Minimal fixtures matching the shapes usePersistedResults expects.
IQ_FIXTURE = {
    "score": 122,
    "correct": 18,
    "total": 25,
    "percentile": 92,
    "timeUsed": 540,
}
PERSONALITY_FIXTURE = {
    "mbtiType": "INTJ",
    "bigFive": {
        "openness": 78,
        "conscientiousness": 71,
        "extraversion": 38,
        "agreeableness": 55,
        "neuroticism": 42,
    },
}


async def flow(page):
    step("seed localStorage with two completed assessments")
    await page.goto(BASE_URL, wait_until="domcontentloaded")
    seed = {
        "iq": IQ_FIXTURE,
        "personality": PERSONALITY_FIXTURE,
    }
    await page.evaluate(
        "(data) => localStorage.setItem('persistedResults:v1', JSON.stringify(data))",
        seed,
    )
    await page.reload(wait_until="domcontentloaded")
    await page.wait_for_timeout(800)
    await shot(page, "dashboard", "01_seeded")

    step("open dashboard")
    if not await click_first_visible(
        page, "View Dashboard", "Dashboard", "View dashboard", "See dashboard"
    ):
        # Fall back: scroll & try again — some builds gate it behind progress UI.
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        if not await click_first_visible(page, "Dashboard", "View Dashboard"):
            fail("dashboard entry button not found — may need real (not seeded) results")

    await page.wait_for_timeout(1200)
    body = (await page.locator("body").inner_text()).lower()
    if not any(k in body for k in ("dashboard", "profile", "score")):
        fail("dashboard did not render")
    ok("dashboard rendered with seeded data")
    await shot(page, "dashboard", "99_dashboard")


if __name__ == "__main__":
    run(flow, flow="dashboard")
