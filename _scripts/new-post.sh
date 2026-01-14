#!/bin/bash
# Update script for today's Jekyll blog post.

# Stage all changes in the repository.
git add -A

# Get the path of today's newly added post.
path_today=$(git diff --cached --name-only --diff-filter=A -G "^title:" | grep '_posts')

# E.g. "2026-01-14"
date_today=$(echo $path_today | grep -oP "\d{4}-\d{2}-\d{2}")

# Extract the title from the post's front matter.
title_today=$(grep -oP '(^title:[^）]+）)\K.+$' "$path_today")
if [ $title_today == "(WIP)" ]; then
  echo "WIP post detected, skipping commit." > /dev/stderr
  exit 0
fi

# Assemble commit message from date and title.
commit_log="${date_today}: ${title_today}"

git commit -m "$commit_log"
#git push origin main
