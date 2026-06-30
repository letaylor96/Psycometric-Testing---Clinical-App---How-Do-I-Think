"""Shared helpers for the Playwright assessment flows.

Designed for the Lovable sandbox: dev server on http://localhost:8080,
Chromium pre-installed via the playwright python package.
"""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path
from typing import Awaitable, Callable, Optional

from playwright.async_api import Page, async_playwright

BASE_URL = "http://localhost:8080"
ROOT = Path(__file__).parent
SHOTS = ROOT / "screenshots"
SHOTS.mkdir(exist_ok=True)


def step(msg: str) -> None:
    print(f"  • {msg}", flush=True)


def ok(msg: str) -> None:
    print(f"  ✓ {msg}", flush=True)


def fail(msg: str) -> "NoReturn":  # type: ignore[name-defined]
    print(f"  ✗ {msg}", flush=True)
    sys.exit(1)


async def shot(page: Page, flow: str, name: str) -> None:
    out = SHOTS / flow
    out.mkdir(exist_ok=True)
    await page.screenshot(path=str(out / f"{name}.png"))


async def click_first_visible(page: Page, *candidates: str, timeout: int = 4000) -> bool:
    """Try each text/role string in order; click the first one that's visible."""
    for c in candidates:
        loc = page.get_by_role("button", name=c, exact=False).first
        try:
            await loc.wait_for(state="visible", timeout=timeout)
            await loc.click()
            return True
        except Exception:
            continue
    return False


async def answer_loop(
    page: Page,
    flow: str,
    *,
    max_questions: int = 60,
    answer_selector: str = "button",
    next_labels: tuple[str, ...] = ("Next", "See Results", "Submit", "Finish"),
    answer_picker: Optional[Callable[[Page, int], Awaitable[bool]]] = None,
) -> int:
    """Generic 'pick an answer, click Next' loop.

    Picks the first non-Next button on each screen as the answer (works for
    Likert + multiple-choice quizzes), then clicks Next / See Results.

    Returns the number of questions answered.
    """
    answered = 0
    for i in range(max_questions):
        # Wait for question UI to settle.
        await page.wait_for_timeout(250)

        if answer_picker is not None:
            picked = await answer_picker(page, i)
        else:
            picked = await _pick_default_answer(page)

        if not picked:
            # Maybe we've already advanced to results.
            break

        clicked_next = await click_first_visible(page, *next_labels, timeout=2500)
        if not clicked_next:
            # Some quizzes auto-advance after selection.
            await page.wait_for_timeout(400)

        answered += 1
        if i % 5 == 0:
            await shot(page, flow, f"q{i:02d}")

        # Detect results screen.
        body_text = (await page.locator("body").inner_text()).lower()
        if any(
            marker in body_text
            for marker in ("your results", "your score", "your profile", "view dashboard", "restart")
        ):
            # Heuristic: results screens show one of these.
            if "next" not in body_text[:200] and "question" not in body_text[:200]:
                break

    return answered


async def _pick_default_answer(page: Page) -> bool:
    """Click the first plausible answer button on the current screen."""
    # Strategy: collect all buttons, skip nav/control ones, click first remaining.
    buttons = page.locator("button:visible")
    n = await buttons.count()
    skip_labels = {
        "next", "next →", "see results", "submit", "finish", "back",
        "restart", "view dashboard", "skip", "sign in", "sign out",
        "publish your app", "start the assessment", "start assessment",
    }
    for i in range(n):
        b = buttons.nth(i)
        try:
            label = (await b.inner_text()).strip().lower()
        except Exception:
            continue
        if not label:
            continue
        if label in skip_labels:
            continue
        if len(label) > 240:
            continue
        try:
            await b.click()
            return True
        except Exception:
            continue
    return False


def run(coro_factory: Callable[[Page], Awaitable[None]], *, flow: str) -> None:
    """Boilerplate: launch browser, run the given coroutine with a Page."""
    async def main() -> None:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(viewport={"width": 1280, "height": 1800})
            page = await context.new_page()
            page.on("pageerror", lambda exc: print(f"  [pageerror] {exc}", flush=True))
            try:
                await coro_factory(page)
                ok(f"{flow} flow completed")
            finally:
                await shot(page, flow, "zz_final")
                await browser.close()

    print(f"\n=== {flow} ===", flush=True)
    asyncio.run(main())
