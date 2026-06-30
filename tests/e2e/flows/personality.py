"""Personality (Big Five + MBTI) end-to-end flow."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _helpers import BASE_URL, answer_loop, click_first_visible, fail, ok, run, shot, step


async def flow(page):
    step("open landing")
    await page.goto(BASE_URL, wait_until="domcontentloaded")

    step("select the Personality test from the picker")
    # The SingleTestPicker shows cards by title; click the one labelled Personality.
    candidates = ["Personality Type", "Personality"]
    clicked = False
    for c in candidates:
        loc = page.get_by_text(c, exact=False).first
        try:
            await loc.scroll_into_view_if_needed(timeout=2500)
            await loc.click(timeout=2500)
            clicked = True
            break
        except Exception:
            continue
    if not clicked:
        fail("Personality card not found on landing")

    step("preview → Start Assessment")
    if not await click_first_visible(page, "Start Assessment", "Begin"):
        fail("preview Start button missing")
    await shot(page, "personality", "02_quiz_start")

    step("auto-answer questions")
    answered = await answer_loop(page, "personality", max_questions=40)
    ok(f"answered {answered} questions")

    await page.wait_for_timeout(1500)
    body = (await page.locator("body").inner_text()).lower()
    if not any(k in body for k in ("openness", "mbti", "type", "profile")):
        fail("personality results did not render")
    await shot(page, "personality", "99_results")


if __name__ == "__main__":
    run(flow, flow="personality")
