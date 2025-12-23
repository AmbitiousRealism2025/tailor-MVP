# Security and Compliance

Security posture
- Strict input validation and size caps (content length, URL whitelist)
- Principle of least privilege for all services and credentials
- Secrets in KMS/Parameter Store; never commit secrets
- Sandbox execution of Fabric/yt-dlp with CPU/memory/time limits
- HTTPS everywhere; HSTS; secure cookies; CSRF where applicable

Multi-tenancy and data isolation
- All queries scoped by org_id; authorization gate per request
- Access tokens (JWT) with short lifetimes; refresh tokens secured
- Audit logs for admin actions

Abuse prevention
- IP and user-based rate limiting
- Idempotency keys for POST /runs
- Content-type checking and antivirus scan for uploads (if enabled)

Compliance and policies
- Publish Privacy Policy, Terms of Service, and DPA
- Data retention and deletion APIs; export on request
- YouTube TOS alignment for caption usage; document policy in YouTube-Processing-Policy.md

Incident response
- On-call rotation, severity levels, runbooks, and status page updates
- Post-incident reviews with actionable remediation items
