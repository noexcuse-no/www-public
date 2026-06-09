#!/usr/bin/env bash
#
# apply-provenance.sh — Apply IPTC DigitalSourceType + CC0 XMP metadata
#                       to all AI-generated WebP images.
#
# Requires: exiftool (perl-image-exiftool)
# Idempotent: skips files that already have DigitalSourceType set.
#
# Usage:
#   bash scripts/apply-provenance.sh          # process all WebP images
#   bash scripts/apply-provenance.sh --dry    # dry-run (print what would change)
#   bash scripts/apply-provenance.sh --help   # this message
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DRY=false
EXIFTOOL_ARGS=()

# --- helpers ----------------------------------------------------------

usage() { sed -n '3,14p' "$0"; exit "${1:-0}"; }
info()  { printf "  [INFO]  %s\n" "$*"; }
warn()  { printf "  [WARN]  %s\n" "$*" >&2; }
err()   { printf "  [ERROR] %s\n" "$*" >&2; exit 1; }

# --- argument parsing -------------------------------------------------

for arg in "$@"; do
    case "$arg" in
        --help|-h) usage 0 ;;
        --dry)     DRY=true ;;
        *)         err "Unknown argument: $arg" ;;
    esac
done

# --- prerequisites ----------------------------------------------------

if ! command -v exiftool &>/dev/null; then
    err "exiftool not found. Install: apt install libimage-exiftool-perl / brew install exiftool"
fi

# --- discover images --------------------------------------------------

IMAGES=()
while IFS= read -r -d '' f; do
    IMAGES+=("$f")
done < <(find "$ROOT_DIR/assets/images" -name '*.webp' -type f -print0)

TOTAL=${#IMAGES[@]}
[[ $TOTAL -eq 0 ]] && { info "No WebP images found — nothing to do."; exit 0; }

$DRY && info "DRY-RUN — no files will be modified"

# --- exiftool common args ---------------------------------------------

# Idempotency guard: only apply if DigitalSourceType is NOT already set
EXIFTOOL_ARGS+=(
    -if 'not $DigitalSourceType'
    -overwrite_original
    -P                       # preserve file modification date
)

# IPTC Digital Source Type (trainedAlgorithmicMedia)
EXIFTOOL_ARGS+=(
    -IPTC:DigitalSourceType="TrainedAlgorithmicMediaDigitalSource"
)

# XMP AI / provenance metadata
EXIFTOOL_ARGS+=(
    -XMP-iptcCore:DigitalSourceType="TrainedAlgorithmicMediaDigitalSource"
    -XMP-dc:Rights="No Excuse AS — CC0 1.0 Universal"
    -XMP-cc:License="https://creativecommons.org/publicdomain/zero/1.0/"
    -XMP-iptcExt:DigitalSourceType="https://schema.org/TrainedAlgorithmicMediaDigitalSource"
    -XMP:AIIdentifier="https://schema.org/TrainedAlgorithmicMediaDigitalSource"
)

# --- execute ----------------------------------------------------------

if $DRY; then
    info "Would process $TOTAL WebP files in $ROOT_DIR/assets/images/"
    info "Would apply:"
    printf '    %s\n' "${EXIFTOOL_ARGS[@]}"
    exit 0
fi

# We run exiftool once per directory to keep output readable.
# Each call processes all images, skipping those already tagged.
for dir in "$ROOT_DIR/assets/images" "$ROOT_DIR/assets/images/banners"; do
    [[ -d "$dir" ]] || continue
    files=( "$dir"/*.webp )
    [[ ${#files[@]} -eq 0 ]] && continue

    info "Processing $dir/ (${#files[@]} files)…"

    # Separate skipped/tagged counts by running with -if guard;
    # the guard means already-tagged files are silently skipped.
    exiftool "${EXIFTOOL_ARGS[@]}" "$dir"/*.webp
done

info "Done. Verify with: exiftool -DigitalSourceType -cc:License assets/images/banners/example.webp"
