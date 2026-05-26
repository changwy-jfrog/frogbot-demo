# License Compliance

Frogbot flags dependencies whose licenses violate the **Watch + Policy** rules configured in JFrog Xray.

## What's in here

`pom.xml` depends on `mysql:mysql-connector-java:8.0.30`, which is licensed **GPL-2.0 with the FOSS Classpath Exception** — a common real-world example of a non-permissive license.

## Setup (one-time, in JFrog Platform)

1. **Administration → Watches** → create a Watch on this repo's build (or the relevant Artifactory repo).
2. **Administration → Policies** → create a Policy with:
   - Rule type: **License**
   - Banned licenses: `GPL-2.0`, `GPL-3.0`, `AGPL-3.0`, `LGPL-2.1`, `LGPL-3.0`
   - Action: Fail the build / Generate violation
3. Attach the Policy to the Watch.

## Expected outcome

On the next Frogbot run:
- JFrog Platform shows a license violation for `mysql-connector-java`.
- PR scans block any PR that introduces a GPL-* dep.
- Repo scan can comment / create issue depending on Frogbot config.
