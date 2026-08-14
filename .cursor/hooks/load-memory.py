#!/usr/bin/env python3
"""sessionStart: inject .cursor/memory.md into the conversation."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MEMORY = ROOT / ".cursor" / "memory.md"
LIMIT = 8000


def main() -> None:
    try:
        json.load(sys.stdin)
    except Exception:
        pass

    if not MEMORY.is_file():
        print("{}")
        return

    text = MEMORY.read_text(encoding="utf-8").strip()
    if len(text) > LIMIT:
        text = text[:LIMIT] + "\n\n…（记忆已截断，完整内容见 .cursor/memory.md）"

    print(
        json.dumps(
            {
                "additional_context": (
                    "项目记忆（来自 .cursor/memory.md，请遵守并在有新决策时更新）：\n\n"
                    + text
                )
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
