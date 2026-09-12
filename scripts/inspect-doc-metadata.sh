#!/usr/bin/env bash
#
# inspect-doc-metadata.sh — Inspect document metadata for privacy leaks.
#
# Prints author, title, subject, producer/software, and creation metadata for
# PDFs and other documents, and flags values that look like local file paths.
# Read-only: never modifies the source document. For PDFs with internal
# metadata, prefer publishing sanitized web derivatives over destructive
# source modification.
#
# Requires: exiftool
#
# Usage:
#   bash scripts/inspect-doc-metadata.sh <file.pdf> [more files...]
#   bash scripts/inspect-doc-metadata.sh --help
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

usage() { sed -n '3,15p' "$0"; exit "${1:-0}"; }
info()  { printf '  [INFO]  %s\n' "$*"; }
warn()  { printf '  [WARN]  %s\n' "$*" >&2; }

for arg in "$@"; do
    case "$arg" in
        --help|-h) usage 0 ;;
        -*) printf '  [ERROR] Unknown argument: %s\n' "$arg" >&2; exit 1 ;;
    esac
done

[[ $# -gt 0 ]] || { printf '  [ERROR] No files given\n' >&2; usage 1; }

command -v exiftool &>/dev/null || { printf '  [ERROR] exiftool not found\n' >&2; exit 1; }
exiftool -ver >/dev/null || { printf '  [ERROR] exiftool failed to run\n' >&2; exit 1; }

# Local-path patterns that must never appear in any metadata value.
PATH_PATTERN='(/home/|/Users/|C:\\|/tmp/|/private/)'

for file in "$@"; do
    [[ -f "$file" ]] || { warn "not found, skipping: $file"; continue; }
    info "=== $file ==="
    exiftool -s -G1 \
        -Author -Creator -Title -Subject -Producer -CreatorTool -Software \
        -Company -LastModifiedBy -CreateDate -ModifyDate \
        "$file" 2>/dev/null || true
    paths=$(exiftool -s -G1 -a "$file" 2>/dev/null | grep -Ei "$PATH_PATTERN" || true)
    if [[ -n "$paths" ]]; then
        warn "local paths found:"
        printf '%s\n' "$paths" | sed 's/^/    /'
    else
        info "no local paths found"
    fi
done