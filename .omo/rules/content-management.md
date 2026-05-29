---
description: Cross-link accuracy maintenance for content pages
globs: ["_pages/**", "_products/**", "_profiles/**", "index.md", ".design/information-architecture.md"]
---

# Content Management & Cross-Link Maintenance

## Cross-Link Accuracy

When you rename, remove, or create a content page, update `.design/information-architecture.md` to reflect the change. Every cross-link in that map must remain accurate — stale entries break internal navigation patterns on the site.

### What to update

| Action | Required update |
|--------|----------------|
| **Rename** a page | Update the URL in the cross-link map; update all internal links pointing to the old URL |
| **Remove** a page | Remove its entry from the map; remove or redirect any links that point to the removed page |
| **Create** a new page | Add its entry to the map; verify it's reachable from existing navigation |
| **Restructure** a section | Audit the entire affected section in the map for consistency |

## Verification

After any content URL change, check:
1. `.design/information-architecture.md` is updated
2. No internal links now point to stale or removed URLs
3. New pages appear in the navigation flow
