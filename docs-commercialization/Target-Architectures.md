# Target Architectures

## SaaS Architecture (recommended for multi-tenant service)
Components
- Frontend SPA: Keep current UI or migrate to Next.js for auth flows and docs
- API service (Fastify/Express, TypeScript): validation (zod), logging (pino)
- Auth: OAuth (Google/GitHub) or magic links; JWT sessions; orgs/teams later
- DB: Postgres (Prisma/Drizzle) for users, orgs, runs, outputs, patterns
- Queue: Redis + BullMQ for long-running jobs (Fabric invocations, yt-dlp)
- Workers: Containerized job executors with strict timeouts and resource limits
- Storage: S3-compatible for uploads and large outputs
- Observability: Sentry, OpenTelemetry, Prometheus/Grafana
- Rate limiting: Redis-backed per-user/per-plan limits
- Secrets: KMS/Parameter Store; never store plaintext in DB

Execution model
- API accepts a run request -> enqueues job -> worker executes -> stores result in S3/DB -> client polls or subscribes for completion

Fabric integration options
- Option A: Keep CLI in workers; pre-bake patterns into container image (read-only); add timeouts and caps
- Option B: Re-implement patterns as prompt templates and call model SDKs directly (better observability and scale)

## Desktop Architecture (fastest path)
Components
- Electron/Tauri app bundling current SPA + local Node runtime
- Local storage for outputs; optional cloud sync later
- System check for Fabric CLI and yt-dlp; installer guides user or bundles
- Local key management via OS keychain (keytar)

Tradeoffs
- Desktop minimizes cloud ops and compliance exposure but limits collaboration and managed billing
- SaaS unlocks collaboration, team features, and usage-based pricing but requires more engineering and operations
