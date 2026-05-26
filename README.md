# frogbot-demo

Multi-ecosystem demo for [JFrog Frogbot](https://github.com/jfrog/frogbot) — scans PRs and creates fix PRs for vulnerable dependencies across **npm, Go, Maven, PyPI**.

## What's inside

| Folder | Ecosystem | Vulnerable dep | Known CVE | Fix |
|---|---|---|---|---|
| `npm-lodash/` | npm | `lodash@4.17.20` | CVE-2021-23337 (command injection in `template`) | `4.17.21` |
| `go-gin/` | Go | `github.com/gin-gonic/gin@v1.6.0` | CVE-2020-28483, CVE-2023-29401 | `v1.9.1+` |
| `maven-log4j/` | Maven | `org.apache.logging.log4j:log4j-core:2.14.1` | CVE-2021-44228 (Log4Shell) | `2.17.1` |
| `pypi-requests/` | PyPI | `requests==2.19.1` | CVE-2023-32681 (Proxy-Authorization leak) | `2.32.0` |

Each manifest uses **real, resolvable versions** so Frogbot's SBOM scan succeeds and a fix PR can be generated.

## Required GitHub secrets

Set these in repo Settings → Secrets and variables → Actions:

- `JF_URL` — `https://changwy2.jfrog.io`
- `JF_ACCESS_TOKEN` — JFrog Platform access token with Xray read + (optionally) write to the relevant repos

`JF_GIT_TOKEN` is wired to the auto-provided `GITHUB_TOKEN`.

For the PR-scan workflow, create a GitHub Environment named **`frogbot`** (Settings → Environments → New) and require manual approval — that's the standard Frogbot pattern to prevent untrusted PRs from auto-scanning.

## Workflows

- `.github/workflows/frogbot-scan-repository.yml` — daily + manual run; opens fix PRs against `main`.
- `.github/workflows/frogbot-scan-pull-request.yml` — runs on every PR; comments scan results.

## Config

`.frogbot/frogbot-config.yml` lists the four working dirs so each project is scanned independently.

## Try it

1. Add secrets (above).
2. Actions tab → **Frogbot Scan Repository** → **Run workflow**.
3. Watch fix PRs appear, one per ecosystem.
