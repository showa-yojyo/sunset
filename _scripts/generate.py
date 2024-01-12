#!/usr/bin/env python

from datetime import date
from os.path import join
from pathlib import Path
import sys

def main():
    # constant values

    # In VS Code tasks.json, pass ${workspaceFolder} as args[1]
    site_dir = sys.argv[1]
    base_date = date(2020, 4, 27)
    today = date.today()
    year, month = today.year, today.month

    # how many days have passed
    passed_days = (today - base_date).days + 1

    # equivalent to `mkdir -p`
    dir_name = join(site_dir, f'_posts/{year:04d}/{month:02d}')
    Path(dir_name).mkdir(parents=True, exist_ok=True)

    date_text = f'{today.isoformat()}'
    file_name = f'{date_text}-diary.md'

    try:
        dest_file = join(dir_name, file_name)
        with open(join(dir_name, file_name), 'x') as fout:
            print("Output: ", dest_file, file=sys.stderr)
            print(f'''---
date: {today.isoformat()} 23:59:59 +0900
title: {passed_days} 日目（晴れ）(WIP)
---
''', file=fout)
    except FileExistsError:
        print(f'{dest_file} already exists', file=sys.stderr)
        pass

if __name__ == '__main__':
    main()
