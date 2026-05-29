# Privacy Specification — No Excuse AS

> Status: Active
> Applies to: All public repository files

## Personal Data

- No personal data in public files
- Contact information only in `_data/metadata.yml`
- Team member photos must not contain embedded personal metadata

## Tracking

- No tracking scripts without consent placeholders
- Analytics (if added) must use cookie-free anonymised collection

## Public Repository

- No secrets, API keys, or proprietary content
- No embarrassing or confidential information
- This repository is public on GitHub — treat everything as visible

## Enforcement

- Before every commit: scan `git diff --cached` for patterns matching `(API|SECRET|KEY|TOKEN|PASSWORD|PASSWD|CREDENTIALS|sk-[a-zA-Z0-9])`
- If found: do not commit. Replace with placeholder or remove the file.

## Reference

- GDPR: https://gdpr.eu/
- Norwegian Privacy Authority (Datatilsynet): https://www.datatilsynet.no/
