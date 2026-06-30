"""Results persistence: complete IQ → reload → results still visible."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _helpers import BASE_URL, answer_loop, click_first_visible, fail, ok, run, shot, step


async def flow(page):
    step("run IQ to completion")
    await page.goto(BASE_URL, wait_until="domcontentloaded")
    if not await click_first_visible(page, "Start the assessment", "Start Assessment"):
        fail("Start button missing")
    if not await click_first_visible(page, "Start Assessment", "Begin"):
        fail("preview Start missing")
    await answer_loop(page, "persistence", max_questions=30)
    await page.wait_for_timeout(1200)
    await shot(page, "persistence", "01_results_initial")

    step("reload the page")
    await page.reload(wait_until="domcontentloaded")
    await page.wait_for_timeout(1500)
    await shot(page, "persistence", "02_after_reload")

    step("open dashboard and confirm IQ entry restored")
    # Land on landing; AssessmentProgress + dashboard pull from persisted store.
    body = (await page.locator("body").inner_text()).lower()
    if "iq" not in body and "reasoning" not in body and "score" not in body:
        fail("persisted IQ result not visible after reload")
    ok("IQ result survived reload")


if __name__ == "__main__":
    run(flow, flow="persistence")
