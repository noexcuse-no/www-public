#!/usr/bin/env bash
#
# sanitize-metadata.sh — Strip privacy-sensitive metadata from image assets
#                        while preserving intentional rights/provenance.
#
# Strip set: GPS, camera/device serials, maker notes, embedded comments,
# unwanted creator/contact attribution, and Photoshop editing history.
# Preserved: rights (XMP-dc:Rights, XMP-cc:License), Web Statement of
# Rights (XMP-xmpRights:WebStatement), and AI provenance (DigitalSourceType,
# C2PA content credentials). Never runs -all=; targeted deletions only.
#
# Requires: exiftool (perl-image-exiftool) — sole dependency.
# Idempotent: reruns are no-ops.
#
# Usage:
#   bash scripts/sanitize-metadata.sh --check [file|dir ...]  # verify (exit 1 on findings)
#   bash scripts/sanitize-metadata.sh --dry   [file|dir ...]  # preview what would be stripped
#   bash scripts/sanitize-metadata.sh --apply [file|dir ...]  # strip in place
#   bash scripts/sanitize-metadata.sh --help                  # this message
#
# Default target: assets/images (all webp/png). Files whose real type is
# PNG but carry a .webp extension are scanned by --check but never
# rewritten by --apply (exiftool cannot rewrite them in place).
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MODE="check"
TARGETS=()

usage() { sed -n '3,21p' "$0"; exit "${1:-0}"; }
info()  { printf "  [INFO]  %s\n" "$*"; }
warn()  { printf "  [WARN]  %s\n" "$*" >&2; }
err()   { printf "  [ERROR] %s\n" "$*" >&2; exit 1; }

# --- argument parsing -------------------------------------------------

for arg in "$@"; do
    case "$arg" in
        --help|-h) usage 0 ;;
        --check)   MODE="check" ;;
        --dry)     MODE="dry" ;;
        --apply)   MODE="apply" ;;
        -*)        err "Unknown argument: $arg" ;;
        *)         TARGETS+=("$arg") ;;
    esac
done

if [[ ${#TARGETS[@]} -eq 0 ]]; then
    TARGETS=("$ROOT_DIR/assets/images")
fi

# --- prerequisites ----------------------------------------------------

if ! command -v exiftool &>/dev/null; then
    err "exiftool not found. Install: apt install libimage-exiftool-perl / brew install exiftool"
fi

# --- privacy-sensitive deletions (never includes rights/provenance) ---

PRIVACY_TAGS=(
    "-GPS:all="
    "-EXIF:SerialNumber="
    "-EXIF:DeviceSerialNumber="
    "-EXIF:BodySerialNumber="
    "-EXIF:LensSerialNumber="
    "-EXIF:MakerNote="
    "-EXIF:UserComment="
    "-EXIF:Comment="
    "-XPComment="
    "-XMP-dc:Creator="
    "-XMP-dc:Contributor="
    "-IPTC:By-line="
    "-IPTC:Contact="
    "-XMP-photoshop:History="
    "-XMP-photoshop:DocumentAncestors="
)

# awk pattern matching exiftool -s -G1 output lines for the same fields
# (group-qualified so e.g. XMP-dc:Creator matches but CreatorTool does not)
CHECK_PATTERN='^\[GPS\]|^\[ExifIFD\] +(SerialNumber|DeviceSerialNumber|BodySerialNumber|LensSerialNumber|UserComment|Comment)|^\[MakerNotes\]|^\[Canon\]|^\[XMP-dc\] +(Creator|Contributor)|^\[IPTC\] +(By-line|Contact)|^\[XMP-iptcExt\] +Contact|^\[XMP-photoshop\] +(History|DocumentAncestors)|^\[Composite\] +GPS'

# --- collect image files (real image content only, by extension scan) --

FILES=()
for target in "${TARGETS[@]}"; do
    if [[ -f "$target" ]]; then
        FILES+=("$target")
    elif [[ -d "$target" ]]; then
        while IFS= read -r -d '' f; do
            FILES+=("$f")
        done < <(find "$target" -type f \( -name '*.webp' -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \) -print0)
    else
        err "Not a file or directory: $target"
    fi
done

TOTAL=${#FILES[@]}
[[ $TOTAL -eq 0 ]] && { info "No image files found — nothing to do."; exit 0; }

# --- per-file helpers -------------------------------------------------

# real_type <file> -> lowercase exiftool FileType (WEBP/PNG/JPEG/...)
real_type() { exiftool -s -s -s -FileType "$1" 2>/dev/null | tr '[:upper:]' '[:lower:]'; }

# privacy_findings <file> -> "TAG[,TAG...]"? via awk; prints tag names only
privacy_findings() {
    exiftool -s -G1 -q "$1" 2>/dev/null | awk -v pat="$CHECK_PATTERN" \
        'match($0, pat) {
            tg = $0; sub(/^\[[^]]*\] +/, "", tg); sub(/ *:.*$/, "", tg); printf "%s,", tg
        }'
}

# real_image <file> -> 0 if exiftool FileType is a raster image
real_image() { real_type "$1" | grep -qE 'webp|png|jpeg|jpg'; }

# --- check mode -------------------------------------------------------

check_all() {
    local findings=0 f tags
    for f in "${FILES[@]}"; do
        real_image "$f" || { warn "$f: unsupported type ($(real_type "$f")) — skipped"; continue; }
        tags=$(privacy_findings "$f")
        if [[ -n "$tags" ]]; then
            printf "  [FIND]  %s: %s\n" "${f#$ROOT_DIR/}" "${tags%,}"
            findings=$((findings + 1))
        fi
    done
    if [[ $findings -eq 0 ]]; then
        info "clean — $TOTAL files, no privacy metadata"
        return 0
    fi
    warn "$findings file(s) carry privacy metadata (values never printed)"
    return 1
}

# --- dry mode: report findings + the would-be exiftool command ---------

dry_all() {
    check_all || true
    printf '  [DRY]   would run: exiftool -overwrite_original -P %s <webp files>\n' "${PRIVACY_TAGS[*]}"
    info "no files modified"
}

# --- apply mode: strip privacy tags from real-WEBP files ---------------

apply_all() {
    local stripped=0 skipped=0 f ext rtype
    for f in "${FILES[@]}"; do
        real_image "$f" || { warn "$f: unsupported type ($(real_type "$f")) — skipped"; continue; }
        ext="${f##*.}"
        [[ "$ext" == "jpg" ]] && ext="jpeg"
        rtype="$(real_type "$f")"
        if [[ "$ext" != "$rtype" ]]; then
            warn "$f: $rtype content stored as .$ext — exiftool cannot rewrite in place; skipped"
            skipped=$((skipped + 1))
            continue
        fi
        exiftool -overwrite_original -P "${PRIVACY_TAGS[@]}" "$f" >/dev/null 2>&1 || {
            warn "$f: exiftool write failed; skipped"
            skipped=$((skipped + 1))
            continue
        }
        stripped=$((stripped + 1))
    done
    info "stripped privacy metadata from $stripped file(s); $skipped skipped"
    # verify nothing privacy-sensitive remains anywhere
    check_all || return 1
}

# --- execute ----------------------------------------------------------

case "$MODE" in
    check) check_all ;;
    dry)   dry_all ;;
    apply) apply_all ;;
esac