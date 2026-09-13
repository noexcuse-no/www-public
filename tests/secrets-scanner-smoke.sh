#!/usr/bin/env bash
# Secret-scanner smoke test (RI1 task 11).
#
# Verifies:
#   1. gitleaks is installed (pinned v8.30.1) and reports a version.
#   2. The changed-content scan (origin/main...HEAD, fallback HEAD~1)
#      is clean on the current repo.
#   3. A synthetic secret fixture placed temporarily in a temp dir is
#      detected AND its raw value never appears in the scanner output
#      (redaction works). The fixture is created at runtime from parts,
#      so no secret-shaped literal is committed to the repo.
#
# Exit codes: 0 all checks pass, 1 any check fails.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG="$REPO_ROOT/.gitleaks.toml"
FAILED=0

say_fail() { echo "FAIL: $*" >&2; FAILED=1; }

echo "== check 1: gitleaks installed + version =="
if ! command -v gitleaks >/dev/null 2>&1; then
  say_fail "gitleaks not found in PATH (pin gitleaks v8.30.1)"
else
  echo "gitleaks $(gitleaks version)"
fi

echo "== check 2: repo changed-content scan clean =="
if ! bash "$REPO_ROOT/scripts/scan-secrets-changed.sh" >/dev/null 2>&1; then
  say_fail "changed-content scan reported leaks or errored"
else
  echo "changed-content scan clean"
fi

echo "== check 3: synthetic fixture detected + value redacted =="
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
# Build the synthetic value at runtime from parts — the committed script
# must not contain a contiguous secret-shaped string.
SK_PREFIX="$(printf '%s-%s' 'sk' 'test')"
SK_HEX_LO="9f86d081884c7d659a2feaa0c55ad015"
SK_HEX_HI="a3bf4f1b2b0b822cd15d6c15b0f00a08"
SK_VALUE="${SK_PREFIX}${SK_HEX_LO}${SK_HEX_HI}"
printf 'api_key = "%s"\n' "$SK_VALUE" > "$TMP_DIR/fixture.env"

set +e
OUT="$(gitleaks detect --source "$TMP_DIR" --no-git --redact --no-banner \
  --exit-code 1 --config "$CONFIG" 2>&1)"
RC=$?
set -e
if [ "$RC" -eq 0 ]; then
  say_fail "synthetic fixture was not detected (rc=0)"
else
  echo "synthetic fixture detected (rc=$RC)"
fi
if printf '%s' "$OUT" | grep -qF "$SK_VALUE"; then
  say_fail "raw synthetic value leaked in scanner output (redaction broken)"
else
  echo "raw value absent from output (redaction OK)"
fi

echo
if [ "$FAILED" -eq 0 ]; then
  echo "PASS: all secret-scanner smoke checks passed"
else
  echo "FAILED: see messages above" >&2
fi
exit "$FAILED"