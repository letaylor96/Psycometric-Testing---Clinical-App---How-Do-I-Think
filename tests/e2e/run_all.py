"""Run every assessment flow in sequence. Exits non-zero on first failure."""
import subprocess
import sys
from pathlib import Path

FLOWS = [
    "iq",
    "personality",
    "cognitive_profile",
    "neurodivergent",
    "depth",
    "persistence",
    "dashboard",
    "promo_code",
]

ROOT = Path(__file__).parent / "flows"


def main() -> int:
    failed: list[str] = []
    for name in FLOWS:
        script = ROOT / f"{name}.py"
        print(f"\n>>> {name}", flush=True)
        rc = subprocess.call([sys.executable, str(script)])
        if rc != 0:
            failed.append(name)
            print(f"!!! {name} FAILED (exit {rc})", flush=True)

    print("\n=== summary ===")
    print(f"  passed: {len(FLOWS) - len(failed)}/{len(FLOWS)}")
    if failed:
        print(f"  failed: {', '.join(failed)}")
        return 1
    print("  all flows passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
