#!/usr/bin/env bash
# Sensitivity scanner — CI entry point (changed-content mode).
# Exit codes: 0 clean, 1 hits, 2 usage error. Output: ruleId|path|line|reason.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/scan-sensitivity.mjs" --changed "$@"