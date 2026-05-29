# Web Application Security Rules

> Status: Ready
> Created: 2026-05-29
> Purpose: OWASP-derived, testable security rules for the noexcuse.no static site (vanilla JS, HTML, CSS, Liquid templates, no backend).

## Sources

| Source | URL |
|--------|-----|
| OWASP XSS Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html |
| OWASP DOM-based XSS Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html |
| OWASP Content Security Policy Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html |
| OWASP HTML5 Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html |
| OWASP Clickjacking Defense Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html |
| OWASP HTTP Headers Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html |
| OWASP Third Party JavaScript Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html |
| OWASP DOM Clobbering Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html |
| OWASP Prototype Pollution Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html |
| OWASP Securing Cascading Style Sheets Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Securing_Cascading_Style_Sheets_Cheat_Sheet.html |
| OWASP NPM Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html |

## Scope

All HTML, JavaScript, CSS, Liquid template, and configuration files in the repository. Does not cover server-side security (no backend), authentication (no user accounts), or database security (no database).

---

## XSS — Cross-Site Scripting (10 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| XSS-1 | innerHTML/outerHTML/document.write only with trusted/sanitized strings | Using any untrusted data (URL params, referrer, cookie, postMessage) in innerHTML | `*.js` | lint, commit |
| XSS-2 | Prefer textContent over innerHTML for plain text | innerHTML where textContent suffices | `*.js` | lint, commit |
| XSS-3 | Liquid auto-escapes HTML — never use `raw` filter on untrusted data | `{{ var \| raw }}`, `{{ var \| safe }}` | `*.html`, `*.md` | lint, commit |
| XSS-4 | All HTML attribute values MUST be quoted | `<div class={{ var }}>` unquoted | `*.html`, templates | lint |
| XSS-5 | Dynamic href/src MUST validate protocol is http/https only | `javascript:` protocol, data URIs in script context | `*.js`, templates | lint, commit |
| XSS-6 | No eval(), Function(), setTimeout(string), setInterval(string) | All string-to-JS execution | `*.js` | lint, commit |
| XSS-7 | No `javascript:` URLs in any attribute | `<a href="javascript:...">` etc. | `*.html`, `*.js` | lint |
| XSS-8 | If innerHTML unavoidable, MUST sanitize via DOMPurify | innerHTML without sanitization on untrusted data | `*.js` | lint, commit |
| XSS-9 | Event handler attributes (onclick etc.) NEVER set from untrusted data | `setAttribute("onclick", str)` or `el.onclick = str` | `*.js` | lint, commit |
| XSS-10 | Inline `<script>` blocks with Liquid data MUST JS-encode values | Untrusted data in script without quoting/encoding | `*.html` | build, review |

---

## DOM — DOM-based XSS & Clobbering (11 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| DOM-1 | Dynamic DOM uses createElement/setAttribute/appendChild | Building HTML strings for innerHTML | `*.js` | lint, commit |
| DOM-2 | setAttribute only with safe attr names (id, class, href, data-*, aria-*, style) | Event handler names in setAttribute | `*.js` | lint, commit |
| DOM-3 | postMessage handler MUST check event.origin against allowlist | Processing messages without origin check | `*.js` | lint, commit |
| DOM-4 | postMessage data used as text only (textContent), never eval'd or set as HTML | innerHTML/eval on event.data | `*.js` | lint, commit |
| DOM-5 | No implicit eval: setTimeout(string), setInterval(string), new Function(string) | All implicit eval patterns | `*.js` | lint, commit |
| DOM-6 | URL fragment (location.hash) NEVER written to innerHTML or eval | `innerHTML = location.hash` | `*.js` | lint, commit |
| DOM-7 | All JS files use `"use strict"` | Implicit globals clobbered by DOM id | `*.js` | lint |
| DOM-8 | All variables declared with let/const/var | Assignment to undeclared variables | `*.js` | lint |
| DOM-9 | Store app data in local variables/modules, NOT window/document | `window.X = value` where X could match DOM element id | `*.js` | commit, review |
| DOM-10 | Check typeof/instanceof before using window/document properties | Using window.config without checking type | `*.js` | lint, commit |
| DOM-11 | Hash-based navigation values displayed via textContent | `innerHTML = location.hash` | `*.js` | lint, commit |

---

## CSP — Content Security Policy (8 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| CSP-1 | CSP via HTTP header (not only meta tag) — meta ignores frame-ancestors, sandbox | CSP only in `<meta>` tag | Server config | deploy |
| CSP-2 | Minimum: `default-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'` | Missing or overly permissive CSP | Server config | deploy |
| CSP-3 | Inline scripts use nonce/hash; no `unsafe-inline` | `script-src 'unsafe-inline'` | Server config | deploy |
| CSP-4 | No `unsafe-eval` in CSP | `unsafe-eval` keyword | Server config | deploy |
| CSP-5 | CSP includes `object-src 'none'` and `base-uri 'none'` (or 'self') | Missing object-src, base-uri | Server config | deploy |
| CSP-6 | CSP includes `frame-ancestors 'none'` (or 'self' if framing needed) | `frame-ancestors *` or missing | Server config | deploy |
| CSP-7 | HTTPS site: CSP includes `upgrade-insecure-requests` | Mixed content | Server config | deploy |
| CSP-8 | Production uses enforced CSP, not just Report-Only | Report-Only only | Server config | deploy |

---

## HEADERS — HTTP Security Headers (9 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| HDR-1 | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` | Missing HSTS, short max-age | Server config | deploy |
| HDR-2 | `X-Content-Type-Options: nosniff` | Missing or wrong value | Server config | deploy |
| HDR-3 | `X-Frame-Options: DENY` (fallback for CSP frame-ancestors) | ALLOW-FROM (obsolete) | Server config | deploy |
| HDR-4 | `Referrer-Policy: strict-origin-when-cross-origin` or `no-referrer` | `unsafe-url` | Server config | deploy |
| HDR-5 | `Permissions-Policy` disables all unneeded features | Missing Permissions-Policy | Server config | deploy |
| HDR-6 | Remove `Server`, `X-Powered-By` fingerprinting headers | Framework/version exposure | Server config | deploy |
| HDR-7 | `Cross-Origin-Opener-Policy: same-origin` | `unsafe-none` | Server config | deploy |
| HDR-8 | `Cross-Origin-Resource-Policy: same-site` | `cross-origin` unnecessarily | Server config | deploy |
| HDR-9 | Static assets: `Cache-Control: public, max-age=31536000, immutable`. HTML: `no-cache` | Wrong cache policy on assets or HTML | Server config | deploy |

---

## DEPS — Dependencies & Third-Party JS (8 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| DEP-1 | All external `<script src>` include `integrity` with sha384/sha512 hash | External scripts without SRI | `*.html` | lint, commit |
| DEP-2 | SRI scripts also set `crossorigin="anonymous"` | SRI without crossorigin | `*.html` | lint, commit |
| DEP-3 | package-lock.json MUST be committed and not gitignored | Missing lockfile, loose ranges without lock | repo root | commit |
| DEP-4 | npm audit MUST pass (no critical/high vulns in production deps) | Known vulns in production deps | package.json | build, commit |
| DEP-5 | Check vendored JS libraries for known CVEs (npx retire) | Known-vulnerable bundled libraries | assets/scripts/ | build |
| DEP-6 | Third-party scripts in sandboxed iframe or limited DOM access pattern | Third-party scripts with full DOM access | `*.html` | deploy |
| DEP-7 | All `target="_blank"` links include `rel="noopener noreferrer"` | target=_blank without noopener | `*.html`, templates | lint, commit |
| DEP-8 | New npm packages verified on official registry with real publisher/history | AI-suggested packages without verification | package.json | commit |

---

## FORMS — Form & Input (3 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| FRM-1 | CSP includes `form-action 'self'` | `form-action *` or missing | Server config | deploy |
| FRM-2 | State-changing forms use `method="POST"`, not GET | GET for non-search forms | `*.html` | lint, review |
| FRM-3 | PII input fields use `autocomplete="off"` | PII fields without autocomplete off | `*.html` | lint |

---

## LINKS — Link & Navigation (3 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| LNK-1 | target=_blank links MUST have rel="noopener noreferrer" (see DEP-7) | — | `*.html` | lint |
| LNK-2 | window.location uses hardcoded paths, not URL params/hash | Dynamic redirect via URL params | `*.js` | lint, commit |
| LNK-3 | Dynamic URLs allow http/https only | `javascript:`, `data:`, `vbscript:` in href/src | `*.js`, `*.html` | lint, commit |

---

## STORAGE — Client-Side Storage (3 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| STG-1 | localStorage/sessionStorage MUST NOT contain tokens, API keys, or PII | Secrets in localStorage | `*.js` | lint, commit |
| STG-2 | Use sessionStorage for transient data, not localStorage | localStorage for temporary data | `*.js` | commit, review |
| STG-3 | localStorage data MUST be validated/encoded before DOM use | Direct innerHTML from localStorage | `*.js` | lint, commit |

---

## SANDBOX — iframe & Embedding (2 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| SAN-1 | All iframes embedding cross-origin content MUST use sandbox attribute | iframe without sandbox embedding untrusted content | `*.html` | lint |
| SAN-2 | sandbox permissions minimal: never allow-top-navigation unless required | Overly permissive sandbox | `*.html` | lint |

---

## CSS — CSS Security (3 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| CSS-1 | CSS class names MUST NOT reveal authorization/role information (adminPanel, deleteUser) | Authorization-level class names in public CSS | `*.css` | commit, review |
| CSS-2 | CSS MUST NOT contain expression(), javascript:, or behavior: URLs | IE expression(), url(javascript:) | `*.css` | lint |
| CSS-3 | User-generated CSS (if any) MUST be sanitized or restricted | Arbitrary CSS from user input | `*.css`, `*.js` | lint, commit |

---

## PROTO — Prototype Pollution (3 rules)

| ID | Rule | Forbidden | Location | Phase |
|----|------|-----------|----------|-------|
| PROTO-1 | Use Map/Set instead of `{}` for collections where possible | Plain `{}` for associative data | `*.js` | lint, commit |
| PROTO-2 | Object.create(null) for dictionaries with external keys | `{}` without null prototype for ext-keyed storage | `*.js` | lint, commit |
| PROTO-3 | Config objects and constants SHOULD be Object.freeze()'d or Object.seal()'d | Mutable config objects | `*.js` | commit, review |

---

## Summary

| Category | Count | Primary Phase | Testable Via |
|----------|-------|--------------|-------------|
| XSS | 10 | lint, commit | ESLint, htmlhint, manual review |
| DOM | 11 | lint, commit | ESLint, manual review |
| CSP | 8 | deploy | Observatory, curl header check |
| HEADERS | 9 | deploy | Observatory, curl header check |
| DEPS | 8 | build, commit | npm audit, npx retire, htmlhint |
| FORMS | 3 | lint, deploy | htmlhint, CSP check |
| LINKS | 3 | lint, commit | htmlhint, ESLint |
| STORAGE | 3 | lint, commit | ESLint, manual review |
| SANDBOX | 2 | lint, commit | htmlhint |
| CSS | 3 | lint, commit | stylelint |
| PROTO | 3 | lint, commit | ESLint |
| **Total** | **63** | — | — |

## Acceptance Criteria

- [ ] All 63 rules are reviewed for applicability to the project
- [ ] Each rule with Phase "lint" has a corresponding ESLint/htmlhint/stylelint rule or manual review process documented
- [ ] Each rule with Phase "commit" is verified before every commit (via pre-commit hooks or manual checklist)
- [ ] Each rule with Phase "build" is verified during CI
- [ ] Each rule with Phase "deploy" (CSP, headers) is verified in staging before production deploy
