# JAS — Secrets Detection

Frogbot (with Advanced Security) scans the repo for hard-coded credentials matching known patterns: AWS access keys, GitHub PATs, Slack webhooks, Stripe keys, JWT secrets, generic high-entropy strings, etc.

## What's in here

| File | Secret pattern |
|---|---|
| `aws_uploader.py` | AWS Access Key + Secret pair |
| `config.js` | GitHub PAT, generic high-entropy API token, embedded RSA private key |
| `.env.example` | DB URL with password, JWT secret, Google API key |

All values are **non-functional placeholders** (AWS test key `AKIAIOSFODNN7EXAMPLE`, etc.) — they match patterns but don't authenticate anywhere.

## Expected outcome

JFrog Platform → Frogbot scan results show secret findings with file + line number. PR scans comment on PRs that introduce new secrets.
