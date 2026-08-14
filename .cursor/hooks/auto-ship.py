#!/usr/bin/env python3
"""stop: 有改动就写入记忆日志，然后 commit + push origin。"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MEMORY = ROOT / ".cursor" / "memory.md"
LOCK = ROOT / ".cursor" / "hooks" / ".ship.lock"
LOG_MARK = "## 日志"
MAX_LOG = 20
SECRET_HINTS = (".env", "credentials.json", ".pem", "id_rsa")
TZ = timezone(timedelta(hours=8))


def git(*args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )


def out(payload: dict) -> None:
    print(json.dumps(payload, ensure_ascii=False))


def blocked(path: str) -> bool:
    lower = path.lower()
    return any(hint in lower for hint in SECRET_HINTS)


def stamp() -> str:
    return datetime.now(TZ).strftime("%Y-%m-%d %H:%M")


def append_memory(summary: str) -> None:
    line = f"- {stamp()} — {summary}"
    if MEMORY.is_file():
        body = MEMORY.read_text(encoding="utf-8")
    else:
        body = "# 项目记忆\n\n## 日志\n\n"

    if LOG_MARK not in body:
        body = body.rstrip() + f"\n\n{LOG_MARK}\n\n"

    head, _, tail = body.partition(LOG_MARK)
    entries = [ln for ln in tail.splitlines() if ln.startswith("- ")]
    entries = [line, *entries][:MAX_LOG]
    MEMORY.write_text(
        head + LOG_MARK + "\n\n" + "\n".join(entries) + "\n",
        encoding="utf-8",
    )


def commit_message(files: list[str]) -> str:
    names = [Path(f).name for f in files[:4]]
    extra = f" 等 {len(files)} 个文件" if len(files) > 4 else ""
    why = "、".join(names) + extra
    return f"自动同步：{why}"


def main() -> None:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        payload = {}

    if payload.get("hook_event_name") not in (None, "stop"):
        out({})
        return
    if payload.get("status") not in (None, "completed"):
        out({})
        return

    os.chdir(ROOT)

    if (ROOT / ".git" / "MERGE_HEAD").exists() or (ROOT / ".git" / "rebase-merge").exists():
        out({})
        return

    dirty = git("status", "--porcelain")
    if dirty.returncode != 0 or not dirty.stdout.strip():
        out({})
        return

    paths = []
    for raw in dirty.stdout.splitlines():
        path = raw[3:].strip()
        if " -> " in path:
            path = path.split(" -> ", 1)[1]
        paths.append(path)

    if any(blocked(p) for p in paths):
        sys.stderr.write("auto-ship: skipped, secret-like path in changeset\n")
        out({})
        return

    if LOCK.exists():
        out({})
        return
    LOCK.write_text(str(os.getpid()), encoding="utf-8")
    try:
        summary = "、".join(Path(p).name for p in paths[:5])
        if len(paths) > 5:
            summary += f" 等 {len(paths)} 项"
        append_memory(summary)

        add = git("add", "-A")
        if add.returncode != 0:
            sys.stderr.write(add.stderr or "git add failed\n")
            out({})
            return

        staged = git("diff", "--cached", "--name-only")
        files = [ln for ln in staged.stdout.splitlines() if ln]
        if not files:
            out({})
            return
        if any(blocked(p) for p in files):
            git("reset", "-q")
            sys.stderr.write("auto-ship: aborted, secret-like file staged\n")
            out({})
            return

        msg = commit_message(files)
        commit = git("commit", "-m", msg)
        if commit.returncode != 0:
            sys.stderr.write(commit.stderr or commit.stdout or "git commit failed\n")
            out({})
            return

        push = git("push", "-u", "origin", "HEAD")
        if push.returncode != 0:
            sys.stderr.write(push.stderr or "git push failed\n")
            out({})
            return

        sys.stderr.write(f"auto-ship: {msg}\n")
        out({})
    finally:
        if LOCK.exists():
            LOCK.unlink()


if __name__ == "__main__":
    main()
