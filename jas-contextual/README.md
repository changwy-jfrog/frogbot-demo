# JAS — Contextual Analysis (CA)

CA verifies whether a known CVE in a dependency is **actually reachable** from your code, reducing alert noise for vulnerabilities that exist in the SBOM but are never invoked.

## What's in here

- `package.json` — vulnerable `lodash@4.17.20`
- `reachable.js` — directly calls `_.template(userInput)`, the exact sink for CVE-2021-23337

## Expected outcome

JFrog Platform's Contextual Analysis result should mark CVE-2021-23337 as **Applicable** for this folder — because `reachable.js` invokes the vulnerable `_.template()` function with attacker-controlled input.

For contrast, the SCA case under `../sca/npm-minimist/` uses a *different* vulnerable package (`minimist@1.2.5`, CVE-2021-44906) — no shared CVE, so the two folders demonstrate different scenarios cleanly without producing duplicate fix PRs.

CA is the single biggest signal-to-noise improvement JAS gives over plain SCA: it tells you which of your SBOM vulnerabilities are actually reachable in your code.
