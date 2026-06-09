#!/bin/bash
# Update script for today's Jekyll blog post.

# Stage all changes in the repository.
git add -A

# Get the path of today's newly added post.
declare -r post_path=$(git diff --cached --name-only --diff-filter=A -G "^title:" | grep "_posts")

# E.g. "2026-01-14"
declare -r post_date=$(echo $post_path | grep -oP "\d{4}-\d{2}-\d{2}")

# Extract the title from the post's front matter.
declare -r post_title=$(grep -oP '(^title:[^）]+）)\K.+$' "$post_path")
if [[ "$post_title" == "(WIP)" ]]; then
  echo "WIP post detected, skipping commit." >&2
  exit 1
fi

# Assemble commit message from date and title.
declare -r commit_log="${post_date}: ${post_title}"

git commit -m "$commit_log"
if [[ $? -ne 0 ]]; then
  echo "No changes to commit." >&2
  exit 1
fi

git push origin master || git push --force-with-lease origin master
