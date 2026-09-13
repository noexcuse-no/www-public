#!/usr/bin/env bash
# Secret scanner — changed-content mode (Mode 1).
# Scans commits in <base>...HEAD where base is origin/main (fallback HEAD~1,
# then full tree). Matches the sensitivity scanner's --changed semantics.
# Exit codes: 0 clean, 1 hits, 2 error (gitleaks missing). Output redacted.
# Requires gitleaks v8.30.1 pinned (see .gitleaks.toml header).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG="$REPO_ROOT/.gitleaks.toml"

if ! command -v gitleaks >/dev/null 2>&1; then
  echo "gitleaks not found in PATH (pin gitleaks v8.30.1)" >&2
  exit 2
fi

BASE="origin/main"
if ! git rev-parse --verify -q "$BASE" >/dev/null 2>&1; then
  BASE="HEAD~1"
fi

if git rev-parse --verify -q "$BASE" >/dev/null 2>&1; then
  exec gitleaks detect --redact --no-banner --exit-code 1 \
    --log-opts "$BASE...HEAD" --config "$CONFIG" "$@"
fi

echo "no base ref found; scanning full working tree" >&2
exec gitleaks detect --source "$REPO_ROOT" --redact --no-banner \
  --exit-code 1 --config "$CONFIG" "$@"