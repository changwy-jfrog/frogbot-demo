# JAS — Infrastructure as Code

Frogbot (with Advanced Security) scans Terraform, CloudFormation, Kubernetes, Helm, and ARM templates for security misconfigurations.

## What's in here

### `terraform/main.tf`
- `aws_s3_bucket` — public ACL, no encryption, no versioning
- `aws_security_group` — SSH (22) and RDP (3389) open to `0.0.0.0/0`
- `aws_db_instance` — publicly accessible RDS, unencrypted storage, weak password, no backups

### `kubernetes/insecure-pod.yaml`
- `privileged: true` + `SYS_ADMIN`/`NET_ADMIN` capabilities
- `hostNetwork: true`, `hostPID: true`
- `runAsUser: 0`, `readOnlyRootFilesystem: false`
- `image: nginx:latest` (mutable tag)
- Secret in plain-text env var

## Expected outcome

Frogbot's IaC scanner enumerates each finding with severity, rule ID, and remediation guidance in the JFrog Platform Frogbot view.
