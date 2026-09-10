#!/usr/bin/env bash
#
# inspect-doc-metadata.sh — Inspect/strip privacy metadata in PDF documents.
#
# Reports author, creator, producer (creation/editing software), title and
# related document-info fields; flags personal names, software identities
# and internal filenames/paths. Optionally strips the flagged fields in
# place (non-destructive to page content).
#
# Requires: exiftool (perl-image-exiftool) — sole dependency.
#
# Usage:
#   bash scripts/inspect-doc-metadata.sh --report [dir|file ...]  # document fields (default)
#   bash scripts/inspect-doc-metadata.sh --check  [dir|file ...]  # exit 1 if internal values found
#   bash scripts/inspect-doc-metadata.sh --strip  [dir|file ...]  # clear internal values in place
#   bash scripts/inspect-doc-metadata.sh --help                   # this message
#
# --check and --strip report file|field only, never field values, so they
# are safe for CI logs. Default search: repository PDFs outside vendored
# dirs (_site, node_modules, vendor, .git).
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
MODE="report"
TARGETS=()

usage() { sed -n '3,20p' "$0"; exit "${1:-0}"; }
info()  { printf "  [INFO]  %s\n" "$*"; }
warn()  { printf "  [WARN]  %s\n" "$*" >&2; }
err()   { printf "  [ERROR] %s\n" "$*" >&2; exit 1; }

for arg in "$@"; do
    case "$arg" in
        --help|-h) usage 0 ;;
        --report)  MODE="report" ;;
        --check)   MODE="check" ;;
        --strip)   MODE="strip" ;;
        -*)        err "Unknown argument: $arg" ;;
        *)         TARGETS+=("$arg") ;;
    esac
done

if ! command -v exiftool &>/dev/null; then
    err "exiftool not found. Install: apt install libimage-exiftool-perl / brew install exiftool"
fi

# --- discovery --------------------------------------------------------

PDFS=()
if [[ ${#TARGETS[@]} -eq 0 ]]; then
    while IFS= read -r -d '' f; do
        PDFS+=("$f")
    done < <(find "$ROOT_DIR" -type f -name '*.pdf' \
        -not -path '*/_site/*' -not -path '*/node_modules/*' \
        -not -path '*/vendor/*' -not -path '*/.git/*' -print0)
else
    for t in "${TARGETS[@]}"; do
        if [[ -f "$t" ]]; then
            PDFS+=("$t")
        elif [[ -d "$t" ]]; then
            while IFS= read -r -d '' f; do
                PDFS+=("$f")
            done < <(find "$t" -type f -name '*.pdf' -print0)
        else
            err "Not a file or directory: $t"
        fi
    done
fi

shopt -s nocasematch  # case-insensitive pattern tests below
[[ ${#PDFS[@]} -eq 0 ]] && { info "no PDFs found"; exit 0; }

# --- document-info fields to inspect ----------------------------------
# fields treated as sensitive when non-empty (identity/software metadata)

# internal-value patterns (case-insensitive): personal-name suspicion is
# flagged via any non-empty Author/Creator; these are filename/path tells
INTERNAL_TITLE_PATTERN='Microsoft Word|\.docx?|/Users/|/home/|C:\\|file:///'

# --- per-file helpers -------------------------------------------------

# field_values <file> -> "FIELD|value" lines (exiftool -s -G1 output)
field_values() {
    exiftool -s -G1 "$1" 2>/dev/null \
        | grep -E '^\[(PDF|XMP-pdf|XMP-xmp|XMP-dc)\] [^:]+ : .+' \
        | sed -E 's/^\[[^]]*\] *([^: ]+) *: *(.*)$/\1|\2/'
}

# flagged <file> -> "FIELD" per line, for fields carrying internal values
flagged() {
    local line field value
    while IFS='|' read -r field value; do
        [[ -z "$value" ]] && continue
        # non-empty identity/software fields are flagged outright
        case "$field" in
            Author|Creator|CreatorTool|Producer|Company|Manager|LastModifiedBy)
                printf '%s\n' "$field" ;;
            Title|Subject)
                if [[ "$value" =~ $INTERNAL_TITLE_PATTERN ]]; then
                    printf '%s\n' "$field"
                fi ;;
        esac
    done < <(field_values "$1")
}

# report_fields <file> -> "FIELD | value | status" table for operator eyes
report_fields() {
    local f="$1" line field value found=0
    while IFS='|' read -r field value; do
        [[ -z "$value" ]] && continue
        local status="ok"
        case "$field" in
            Author|Creator|CreatorTool|Producer|Company|Manager|LastModifiedBy)
                status="FLAG" ; found=1 ;;
            Title|Subject)
                if [[ "$value" =~ $INTERNAL_TITLE_PATTERN ]]; then
                    status="FLAG" ; found=1
                fi ;;
        esac
        printf '  [%s] %s: %s | %s\n' "$status" "${f#$ROOT_DIR/}" "$field" "$value"
    done < <(field_values "$f")
    [[ $found -eq 0 ]] && printf '  [ok]   %s | (no sensitive fields present)\n' "${f#$ROOT_DIR/}"
}

# --- report mode ------------------------------------------------------

report_all() {
    for f in "${PDFS[@]}"; do
        report_fields "$f"
    done
}

# --- check mode -------------------------------------------------------

check_all() {
    local total=0
    for f in "${PDFS[@]}"; do
        local hits
        hits=$(flagged "$f")
        if [[ -n "$hits" ]]; then
            while IFS= read -r field; do
                printf '  [FIND]  %s|%s\n' "${f#$ROOT_DIR/}" "$field"
            done <<< "$hits"
            total=$((total + 1))
        fi
    done
    if [[ $total -eq 0 ]]; then
        info "clean — no sensitive document metadata in ${#PDFS[@]} PDF(s)"
        return 0
    fi
    warn "$total PDF(s) carry internal document metadata (values never printed)"
    return 1
}

# --- strip mode -------------------------------------------------------

# fields cleared unconditionally (identity/software); Title/Subject only
# when flagged with an internal filename/path pattern
STRIP_TAGS=(
    "-Author="
    "-Creator="
    "-CreatorTool="
    "-Producer="
    "-Company="
    "-Manager="
    "-LastModifiedBy="
    "-XMP-dc:Creator="
    "-XMP-xmp:CreatorTool="
    "-XMP-pdf:Producer="
)

strip_file() {
    local f="$1" extra=() hits
    hits=$(flagged "$f")
    if [[ -n "$hits" ]] && grep -qE '^(Title|Subject)$' <<< "$hits"; then
        extra+=("-Title=" "-Subject=")
    fi
    exiftool -overwrite_original -P "${STRIP_TAGS[@]}" "${extra[@]}" "$f" >/dev/null 2>&1 \
        || err "exiftool failed on $f"
}

strip_all() {
    local stripped=0
    for f in "${PDFS[@]}"; do
        local before after
        before=$(exiftool -s -s -s -PageCount "$f" 2>/dev/null || true)
        strip_file "$f"
        after=$(exiftool -s -s -s -PageCount "$f" 2>/dev/null || true)
        if [[ -n "$before" && -n "$after" && "$before" != "$after" ]]; then
            err "$f: page count changed $before -> $after — refusing result"
        fi
        stripped=$((stripped + 1))
    done
    info "stripped document metadata from $stripped PDF(s); page counts verified"
    # re-verify
    check_all || return 1
}

# --- execute ----------------------------------------------------------

case "$MODE" in
    report) report_all ;;
    check)  check_all ;;
    strip)  strip_all ;;
esac