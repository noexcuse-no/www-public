#!/usr/bin/env bash
# Secret scanner — full-history audit mode (Mode 2).
# Scans the complete available git history: gitleaks git --log-opts="--all".
# Setup note: with a shallow CI checkout the scan only covers fetched history —
# use `fetch-depth: 0` (full checkout) so the audit covers all commits.
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

exec gitleaks git --redact --no-banner --exit-code 1 \
  --log-opts "--all" --config "$CONFIG" "$@"