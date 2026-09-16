#!/usr/bin/env python3
"""
DEPRECATED — do not run.

This script was a one-off migration tool that removed outdated AI-reflection
CTA blocks from `_pages/` and re-inserted a single ai-reflection-cta include
per page. Its regexes target content that no longer exists, and its
include-insertion step would reintroduce wording that the 2026 copy revision
removed (old AI-CTA phrasing and the old product self-description term).

The migration it performed is complete. The AI reflection CTA is now
inserted by the article layout; the include lives in
`_includes/ai-reflection-cta.html` with current wording.

Kept for history only. Delete this file in a cleanup pass.
"""

exit("clean-ai-ctas.py is deprecated and intentionally disabled. See docstring.")
