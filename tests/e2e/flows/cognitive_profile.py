"""Cognitive Profile end-to-end flow (Kolb · Sternberg · KAI · MSTAT · TRI)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _helpers import BASE_URL, answer_loop, click_first_visible, fail, ok, run, shot, step


async def flow(page):
    await page.goto(BASE_URL, wait_until="domcontentloaded")

    step("select Cognitive Profile card")
    loc = page.get_by_text("Cognitive Profile", exact=False).first
    await loc.scroll_into_view_if_needed(timeout=3000)
    await loc.click(timeout=3000)

    if not await click_first_visible(page, "Start Assessment", "Begin"):
        fail("preview Start button missing")
    await shot(page, "cognitive_profile", "02_quiz_start")

    answered = await answer_loop(page, "cognitive_profile", max_questions=50)
    ok(f"answered {answered} questions")

    await page.wait_for_timeout(1500)
    body = (await page.locator("body").inner_text()).lower()
    if not any(k in body for k in ("archetype", "profile", "strength", "score")):
        fail("cognitive profile results did not render")
    await shot(page, "cognitive_profile", "99_results")


if __name__ == "__main__":
    run(flow, flow="cognitive_profile")
