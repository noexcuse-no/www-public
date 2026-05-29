---
description: Security checklist summary — quick reference, see .specs/security/README.md for full rules
globs: ["*.html", "*.js", "*.css", "_config*", ".opencode/**", "*.yml"]
---

# Web Security Quick Reference

| Cat | Rules | Key areas |
|-----|-------|-----------|
| XSS | 10 | innerHTML, eval, Liquid escaping, attr quoting, URL validation |
| DOM | 11 | createElement, postMessage, strict mode, clobbering |
| CSP | 8 | 'self' policy, no unsafe-inline/eval, frame-ancestors |
| HDR | 9 | HSTS, nosniff, frame-options, referrer, COOP |
| DEPS | 8 | SRI, npm audit, lockfile, slopsquatting check |
| FRM | 3 | form-action CSP, POST method, autocomplete |
| LNK | 3 | noopener, no open redirects, safe schemes |
| STG | 3 | no secrets in localStorage, validate on read |
| SAN | 2 | iframe sandbox, minimal permissions |
| CSS | 3 | no auth class names, no expression() |
| PROTO | 3 | Map/Set, Object.create(null), freeze configs |

Full specification with testable CHECK/FORBID/LOCATION/PHASE per rule: `.specs/security/README.md`
