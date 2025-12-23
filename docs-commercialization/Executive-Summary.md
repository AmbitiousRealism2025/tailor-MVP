# Executive Summary

Current state
- Single-page frontend (fabric-web-gui.html) talks to a Node http server (fabric-proxy.js) that shells out to Fabric CLI and yt-dlp on the same machine.
- Reads patterns from ~/.config/fabric/patterns; optional save to a local Obsidian vault path.
- No auth, multi-tenancy, rate limits, persistence, or observability.

Goal
- Make Tailor commercially available and safe to operate for many users.

Two productization tracks
1) Desktop app (fastest path; BYO provider keys)
   - Package Tailor UI + a local Node runtime (Electron/Tauri)
   - User supplies their model provider API keys; data stays local
   - Minimum ops; lower legal/compliance footprint; limited collaboration features

2) Cloud SaaS (multi-tenant; managed keys optional)
   - Proper backend (TypeScript), DB, object storage, queue workers, and observability
   - Run Fabric-like patterns in sandboxed workers or re-implement patterns with model SDKs
   - Enables billing, team collaboration, policy controls, and scale

Key gaps to close for SaaS
- Security & multi-tenancy, input validation, URL safety, and secrets management
- Scalability & reliability: queueing, timeouts, concurrency control, retries
- Persistence: Postgres for users/runs/outputs; S3 for artifacts
- Billing & metering: Stripe, plan limits, usage recording
- Observability: structured logs, metrics, traces, error reporting
- Compliance: privacy policy, terms, data retention, YouTube TOS

Top recommendation
- If speed to market is critical, ship Desktop first (2–4 weeks), then build SaaS (8–12 weeks) with lessons learned.

Next steps
- See Target-Architectures.md and Roadmap.md
- For implementation details, see Data-Model.md and Backend-Blueprint.md
