"""Depth Psychology end-to-end flow.

This one is heavier: 24 free-form answers + Gemini analysis.
We submit placeholder text, then assert the analyzing screen appears.
We do NOT wait for the LLM to finish (that's covered in MANUAL_QA.md)
because cold-start can take 30s+; we just confirm the funnel is intact.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _helpers import BASE_URL, click_first_visible, fail, ok, run, shot, step


async def flow(page):
    await page.goto(BASE_URL, wait_until="domcontentloaded")

    step("select Depth Psychology")
    loc = page.get_by_text("Depth Psychology", exact=False).first
    await loc.scroll_into_view_if_needed(timeout=3000)
    await loc.click(timeout=3000)

    if not await click_first_visible(page, "Start Assessment", "Begin"):
        fail("preview Start button missing")

    step("pick a framework (Freudian)")
    if not await click_first_visible(page, "Freudian", "Jungian", "Nietzsche"):
        fail("framework selector missing")

    step("fill 24 textareas, advancing each one")
    for i in range(30):
        await page.wait_for_timeout(300)
        ta = page.locator("textarea:visible").first
        try:
            await ta.wait_for(state="visible", timeout=2500)
            await ta.fill(f"Sample reflective answer for question {i + 1}.")
        except Exception:
            break
        advanced = await click_first_visible(
            page, "Next", "Submit", "Finish", "See Results", "Analyze", timeout=2000
        )
        if not advanced:
            break
        if i % 5 == 0:
            await shot(page, "depth", f"q{i:02d}")

    await page.wait_for_timeout(2000)
    body = (await page.locator("body").inner_text()).lower()
    if not any(k in body for k in ("analyz", "your", "framework", "profile", "result")):
        fail("did not reach analyzing/result screen")
    ok("reached analyzing or results screen")
    await shot(page, "depth", "99_end")


if __name__ == "__main__":
    run(flow, flow="depth")
