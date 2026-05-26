# JAS — Contextual Analysis (CA)

CA verifies whether a known CVE in a dependency is **actually reachable** from your code, reducing alert noise for vulnerabilities that exist in the SBOM but are never invoked.

## What's in here

- `package.json` — same vulnerable `lodash@4.17.20` as in `../sca/npm-lodash/`
- `reachable.js` — directly calls `_.template(userInput)`, the exact sink for CVE-2021-23337

## Expected outcome

Contrast with `sca/npm-lodash/` — that folder has the vuln dep but no code calling `_.template`. Frogbot CA results should mark:

| Folder | CVE-2021-23337 verdict |
|---|---|
| `sca/npm-lodash/` | **Not Applicable** (function not used) |
| `jas-contextual/` | **Applicable** (sink directly invoked) |

This is the single biggest signal-to-noise improvement JAS gives over plain SCA.
