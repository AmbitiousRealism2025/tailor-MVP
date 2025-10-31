# Roadmap

Phase 0: Hardening current codebase (1–2 weeks)
- Convert fabric-proxy.js to TypeScript; adopt Fastify
- Env-driven config; remove hard-coded paths; strict input validation and timeouts
- ESLint/Prettier, unit tests for helpers (e.g., VTT parsing), GitHub Actions CI
- Minimal Dockerfile and dev container

Phase 1: Multi-tenant foundation (2–3 weeks)
- Postgres + Prisma/Drizzle; models for users, orgs, memberships, patterns, runs, outputs
- OAuth (Google/GitHub) with sessions; per-tenant data isolation
- Redis rate limiting and quotas; replace pattern discovery with curated catalog

Phase 2: Job execution and scaling (2–3 weeks)
- Redis + BullMQ; worker service with resource caps and timeouts
- Containerize Fabric/yt-dlp; store outputs in S3; idempotency keys and retries
- Sentry + pino logs; request IDs; OpenTelemetry traces

Phase 3: Billing and plans (1–2 weeks)
- Stripe subscriptions + usage events (per run/tokens)
- Plan enforcement middleware; admin tooling for support

Phase 4: Production beta (2–3 weeks)
- Deploy to Fly.io/Render/AWS; staging/prod
- WAF/CDN, strict CORS, HSTS, HTTPS; TOS/Privacy published
- Closed beta feedback loop

Phase 5: Strategic improvements (ongoing)
- Replace CLI with provider SDKs; pattern search/filter; team workspaces; enterprise options
