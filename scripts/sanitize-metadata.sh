#!/usr/bin/env bash
#
# sanitize-metadata.sh — Strip privacy-sensitive metadata from tracked media.
#
# Removes tags that can leak private information:
#   - GPS coordinates (GPS:all)
#   - Camera/lens serial numbers (SerialNumber*)
#   - MakerNotes (often embed serials + internal data)
#   - Comments, captions, descriptions, keywords
#   - Local filesystem paths (Photos/OS X fields, any tag matching /home/, /Users/, C:\)
#   - Creator/contact fields (dc:Creator, Artist, OwnerName)
#   - Editing history (xmp:History, xmpMM:History, DerivedFrom, Ingredients, CreatorTool)
#   - Location fields (City, State, Country, Location)
#
# Preserves intentional rights/provenance metadata (written by
# apply-provenance.sh): XMP-dc:Rights, IPTC:CopyrightNotice,
# XMP-xmpRights:WebStatement, XMP-iptcExt:DigitalSourceType.
# AI provenance (digital source type) and copyright are separate concerns —
# both preserved, never conflated.
#
# Modes:
#   --check   verify no sensitive tags remain (exit 1 if any found)
#   --dry     print what would be stripped without modifying files
#   (default) strip sensitive tags in place
#
# Scope: tracked raster images (webp, png, jpg, jpeg, tif, tiff, gif) + PDFs
# under assets/images/. Explicit file arguments override the default scope.
# One failure never aborts the batch.
#
# Requires: exiftool
#
# Usage:
#   bash scripts/sanitize-metadata.sh [--check|--dry] [path...]
#   bash scripts/sanitize-metadata.sh --help
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CHECK=false
DRY=false

usage() { sed -n '3,34p' "$0"; exit "${1:-0}"; }
info()  { printf '  [INFO]  %s\n' "$*"; }
warn()  { printf '  [WARN]  %s\n' "$*" >&2; }

FILES=()
for arg in "$@"; do
    case "$arg" in
        --help|-h) usage 0 ;;
        --check) CHECK=true ;;
        --dry) DRY=true ;;
        -*) printf '  [ERROR] Unknown argument: %s\n' "$arg" >&2; exit 1 ;;
        *) FILES+=("$arg") ;;
    esac
done

command -v exiftool &>/dev/null || { printf '  [ERROR] exiftool not found\n' >&2; exit 1; }
exiftool -ver >/dev/null || { printf '  [ERROR] exiftool failed to run\n' >&2; exit 1; }

# Sensitive tags: extracted in --check mode, deleted in strip mode.
SENSITIVE_TAGS=(
    '-gps:all'
    '-SerialNumber*'
    '-MakerNote'
    '-UserComment'
    '-ImageDescription'
    '-XMP-dc:Description'
    '-IPTC:Caption-Abstract'
    '-Keywords'
    '-XMP-photoshop:City'
    '-XMP-photoshop:State'
    '-XMP-photoshop:Country'
    '-XMP-photoshop:Location'
    '-XMP-iptc:Location'
    '-XMP-iptc:CreatorCity'
    '-XMP-iptc:CreatorCountry'
    '-XMP-iptc:CreatorRegion'
    '-XMP-xmp:CreatorTool'
    '-XMP-xmp:History'
    '-XMP-xmpMM:History'
    '-XMP-xmpMM:DerivedFrom'
    '-XMP-xmpMM:Ingredients'
    '-XMP-dc:Creator'
    '-OwnerName'
    '-Artist'
    '-XMP-apple-fi:all'
)

STRIP_ARGS=()
for tag in "${SENSITIVE_TAGS[@]}"; do
    STRIP_ARGS+=("${tag}=")
done

# Local-path patterns that must never appear in any metadata value.
PATH_PATTERN='(/home/|/Users/|C:\\|/tmp/|/private/)'

check_all() {
    local found=0 out paths
    out=$(exiftool -s -G1 "${SENSITIVE_TAGS[@]}" "${FILES[@]}" 2>/dev/null \
        | grep -v '^========' \
        | grep -vE '^[[:space:]]*[0-9]+ image files' || true)
    if [[ -n "$out" ]]; then
        warn "sensitive tags found:"
        printf '%s\n' "$out" | sed 's/^/    /'
        found=1
    fi
    paths=$(exiftool -s -G1 -a "${FILES[@]}" 2>/dev/null \
        | grep -v '^\[System\]' \
        | grep -v '^\[File\]' \
        | grep -vE '^[[:space:]]*[0-9]+ image files' \
        | grep -Ei -B1 "$PATH_PATTERN" || true)
    if [[ -n "$paths" ]]; then
        warn "local paths found:"
        printf '%s\n' "$paths" | sed 's/^/    /'
        found=1
    fi
    return $found
}

# Default scope: tracked raster images + PDFs under assets/images/.
if [[ ${#FILES[@]} -eq 0 ]]; then
    mapfile -t FILES < <(git -C "$ROOT_DIR" ls-files 'assets/images/' 2>/dev/null \
        | grep -Ei '\.(webp|png|jpe?g|tiff?|gif|pdf)$' || true)
fi
if [[ ${#FILES[@]} -eq 0 ]]; then
    mapfile -t FILES < <(find "$ROOT_DIR/assets/images" -type f \
        \( -iname '*.webp' -o -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \
           -o -iname '*.tif' -o -iname '*.tiff' -o -iname '*.gif' -o -iname '*.pdf' \) \
        2>/dev/null || true)
fi

existing=()
for file in "${FILES[@]}"; do
    if [[ -f "$file" ]]; then
        existing+=("$file")
    else
        warn "not found, skipping: $file"
    fi
done
FILES=("${existing[@]}")

$DRY && info "DRY-RUN — no files will be modified"

if $CHECK; then
    if check_all; then
        info "OK — no sensitive metadata found in ${#FILES[@]} file(s)"
    else
        printf '  [ERROR] Sensitive metadata found — run sanitize (no args) to strip\n' >&2
        exit 1
    fi
elif $DRY; then
    for file in "${FILES[@]}"; do
        info "would sanitize: $file"
        printf '    exiftool -overwrite_original %s "%s"\n' "${STRIP_ARGS[*]}" "$file"
    done
    info "Done. would-sanitize=${#FILES[@]}"
else
    errs=$(exiftool -overwrite_original "${STRIP_ARGS[@]}" "${FILES[@]}" 2>&1 >/dev/null | grep -c 'Error' || true)
    if [[ "$errs" -eq 0 ]]; then
        info "Done. sanitized=${#FILES[@]} skipped=0"
    else
        warn "$errs file(s) failed — run per-file to identify"
        info "Done. sanitized=$(( ${#FILES[@]} - errs )) skipped=$errs"
    fi
fi