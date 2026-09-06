#!/usr/bin/env bash
#
# apply-provenance.sh — Embed rights metadata in tracked raster images.
#
# Input: _data/rights.json (`assets` section — complete by contract).
# Tags per asset (from rights.json):
#   -XMP-dc:Rights="<copyrightText>"
#   -IPTC:CopyrightNotice="<copyrightText>"
#   -XMP-xmpRights:WebStatement="<license url>"
#   -XMP-iptcExt:DigitalSourceType="<IPTC URI>"
#
# Force-write (no idempotency guard): authoritative values overwrite any
# legacy or incorrect tags. Unresolved assets are omitted from rights.json
# and therefore never touched.
#
# Scope: tracked raster images only (webp, png). Skipped + logged:
# PDFs/SVGs (rights via sidecars), ICO/CUR (exiftool read-only),
# and any other unsupported format. One failure never aborts the batch.
#
# Requires: exiftool, jq
#
# Usage:
#   bash scripts/apply-provenance.sh          # process all resolved assets
#   bash scripts/apply-provenance.sh --dry    # dry-run (print invocations)
#   bash scripts/apply-provenance.sh --help   # this message
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RIGHTS_JSON="$ROOT_DIR/_data/rights.json"
DRY=false

usage() { sed -n '3,24p' "$0"; exit "${1:-0}"; }
info()  { printf '  [INFO]  %s\n' "$*"; }
warn()  { printf '  [WARN]  %s\n' "$*" >&2; }

for arg in "$@"; do
    case "$arg" in
        --help|-h) usage 0 ;;
        --dry) DRY=true ;;
        *) printf '  [ERROR] Unknown argument: %s\n' "$arg" >&2; exit 1 ;;
    esac
done

command -v exiftool &>/dev/null || { printf '  [ERROR] exiftool not found\n' >&2; exit 1; }
command -v jq &>/dev/null || { printf '  [ERROR] jq not found\n' >&2; exit 1; }
[[ -f "$RIGHTS_JSON" ]] || { printf '  [ERROR] %s not found — run npm run rights:generate first\n' "$RIGHTS_JSON" >&2; exit 1; }
exiftool -ver >/dev/null || { printf '  [ERROR] exiftool failed to run\n' >&2; exit 1; }

$DRY && info "DRY-RUN — no files will be modified"

done_count=0
skip_count=0

while IFS= read -r rel; do
    file="$ROOT_DIR/$rel"
    [[ -f "$file" ]] || { warn "not found, skipping: $rel"; skip_count=$((skip_count + 1)); continue; }
    case "$rel" in
        *.webp|*.png) ;;
        *) warn "unsupported format, skipping (rights via sidecar): $rel"; skip_count=$((skip_count + 1)); continue ;;
    esac
    rights=$(jq -r --arg p "$rel" '.assets[$p].copyrightText' "$RIGHTS_JSON")
    webstatement=$(jq -r --arg p "$rel" '.assets[$p].url' "$RIGHTS_JSON")
    dst=$(jq -r --arg p "$rel" '.assets[$p].digitalSourceType' "$RIGHTS_JSON")
    if $DRY; then
        info "would tag: $rel"
        printf '    exiftool -overwrite_original -XMP-dc:Rights="%s" -IPTC:CopyrightNotice="%s" -XMP-xmpRights:WebStatement="%s" -XMP-iptcExt:DigitalSourceType="%s" %s\n' \
            "$rights" "$rights" "$webstatement" "$dst" "$rel"
        continue
    fi
    if exiftool -overwrite_original \
        -XMP-dc:Rights="$rights" \
        -IPTC:CopyrightNotice="$rights" \
        -XMP-xmpRights:WebStatement="$webstatement" \
        -XMP-iptcExt:DigitalSourceType="$dst" \
        "$file" >/dev/null 2>&1; then
        done_count=$((done_count + 1))
    else
        warn "exiftool failed, skipping: $rel"
        skip_count=$((skip_count + 1))
    fi
done < <(jq -r '.assets | keys[]' "$RIGHTS_JSON")

info "Done. tagged=$done_count skipped=$skip_count"
