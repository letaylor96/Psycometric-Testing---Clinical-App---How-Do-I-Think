"""IQ / Cognitive Reasoning end-to-end flow."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _helpers import BASE_URL, answer_loop, click_first_visible, fail, ok, run, shot, step


async def flow(page):
    step("open landing")
    await page.goto(BASE_URL, wait_until="domcontentloaded")
    await shot(page, "iq", "01_landing")

    step("click 'Start the assessment' (IQ default)")
    if not await click_first_visible(page, "Start the assessment", "Start Assessment"):
        fail("could not find Start button on landing")

    step("preview → Start Assessment")
    if not await click_first_visible(page, "Start Assessment", "Begin"):
        fail("preview screen has no Start button")
    await shot(page, "iq", "02_quiz_start")

    step("auto-answer 25 questions")
    answered = await answer_loop(page, "iq", max_questions=30)
    ok(f"answered {answered} questions")

    step("assert results screen rendered")
    await page.wait_for_timeout(1200)
    body = (await page.locator("body").inner_text()).lower()
    if not any(k in body for k in ("score", "percentile", "your result")):
        fail("results screen did not render")
    await shot(page, "iq", "99_results")


if __name__ == "__main__":
    run(flow, flow="iq")
