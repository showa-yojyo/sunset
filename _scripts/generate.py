#!/usr/bin/env python
from __future__ import annotations

import logging
import sys
from datetime import date
from pathlib import Path

logger = logging.getLogger(__name__)
logging.basicConfig(format="%(path)s: %(message)s", level=logging.INFO)


def main() -> None:
    # constant values

    # In VS Code tasks.json, pass ${workspaceFolder} as args[1]
    site_path = Path(sys.argv[1])
    base_date = date(2020, 4, 27)
    today = date.today()
    year, month = today.year, today.month

    # how many days have passed
    passed_days = (today - base_date).days + 1

    # equivalent to `mkdir -p`
    dir_path = site_path / f"_posts/{year:04d}/{month:02d}"
    date_text = f"{today.isoformat()}"
    file_name = f"{date_text}-diary.md"
    dest_file = dir_path / file_name
    try:
        target = dir_path
        target.mkdir(parents=True, exist_ok=True)

        target = dest_file
        with target.open("x") as fout:
            logger.info("output", extra={"path": target.as_posix()})
            fout.write(
                f"""---
date: {date_text} 23:59:59 +0900
title: {passed_days} 日目（晴れ）(WIP)
---
"""
            )
    except FileExistsError:
        logger.exception("already exists", extra={"path": target.as_posix()})


if __name__ == "__main__":
    main()
