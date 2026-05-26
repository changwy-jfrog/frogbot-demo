# frogbot-demo

End-to-end demo for [JFrog Frogbot](https://github.com/jfrog/frogbot), organized by Frogbot capability rather than by ecosystem. Each top-level folder targets one Frogbot feature so you can isolate what each scanner does.

## Capabilities covered

| Folder | Frogbot feature | Requires |
|---|---|---|
| [`sca/`](sca/) | SCA — vulnerable deps → auto fix PR | Xray |
| [`jas-secrets/`](jas-secrets/) | JAS — hard-coded secrets detection | Advanced Security |
| [`jas-iac/`](jas-iac/) | JAS — IaC misconfiguration (Terraform, K8s) | Advanced Security |
| [`jas-sast/`](jas-sast/) | JAS — SAST (SQLi, XSS, eval, command injection) | Advanced Security |
| [`jas-contextual/`](jas-contextual/) | JAS — Contextual Analysis (reachability) | Advanced Security |
| [`license-maven-gpl/`](license-maven-gpl/) | License compliance (banned licenses) | Xray Watch + Policy |

## SCA cases at a glance

| Folder | Ecosystem | Vulnerable dep | CVE | Fix version |
|---|---|---|---|---|
| `sca/npm-minimist` | npm | `minimist@1.2.5` | CVE-2021-44906 (prototype pollution) | `1.2.8` |
| `sca/go-gin` | Go | `gin@v1.6.0` | CVE-2020-28483, CVE-2023-29401 | `v1.9.1+` |
| `sca/maven-log4j` | Maven | `log4j-core@2.14.1` | CVE-2021-44228 (Log4Shell) | `2.17.1` |
| `sca/pypi-requests` | PyPI | `requests==2.19.1` | CVE-2023-32681 | `2.32.0` |

All versions are real and resolvable so SBOM generation succeeds.

## How Frogbot is wired here

This repo uses the **Frogbot GitHub App** (not workflow files). The app is installed on the repo and reads `.frogbot/frogbot-config.yml` to know which folders to scan.

### One-time setup

1. **Install the app** — [github.com/apps/frogbot](https://github.com/apps/frogbot) → Install → select `changwy-jfrog/frogbot-demo`.
2. **JFrog credentials** — secrets `JF_URL` and `JF_ACCESS_TOKEN` are set on the repo (or wired via the App's JFrog pairing flow).
3. **License demo only** — create a Watch + Policy in JFrog Platform that bans `GPL-*` licenses (see [`license-maven-gpl/README.md`](license-maven-gpl/README.md)).

### Triggering scans

- **PR scan** — open a PR, Frogbot scans the diff and comments findings on the PR.
- **Repository scan** — runs on schedule from JFrog Platform; opens fix PRs for vulnerable SCA deps.
- **Manual** — JFrog Platform → Frogbot → "Scan now" against `main`.

## Trying each case

| Want to see... | Do this |
|---|---|
| A fix PR auto-opened | Wait for the daily repo scan, or trigger from JFrog UI |
| PR scan feedback | `git checkout -b test`, bump a vuln dep to a worse version, open a PR |
| Secrets finding | Open a PR adding a new hard-coded key under `jas-secrets/` |
| IaC finding | Modify `jas-iac/terraform/main.tf` and open a PR |
| Contextual Analysis | See `jas-contextual/` — vulnerable `lodash.template()` is actually invoked |
| License violation | Open a PR adding `mysql-connector-java` anywhere (after Policy is configured) |

## Notes

- Versions in `sca/` and `jas-contextual/` are intentionally chosen so Frogbot can resolve them via public registries — no Artifactory remote required.
- All "secrets" in `jas-secrets/` are public example values (`AKIAIOSFODNN7EXAMPLE` etc.) that match patterns but don't authenticate to anything.
- JAS folders need a JFrog subscription that includes Advanced Security; Xray-only accounts will see SCA + license results but no Secrets/IaC/SAST/CA findings.
