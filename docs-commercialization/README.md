# Tailor Commercialization Blueprint

This folder contains a complete plan to evolve Tailor from a local MVP to a commercial product. It covers two tracks:

- Desktop App (BYO keys; fastest path)
- Cloud SaaS (multi-tenant, managed service)

Use this as a working playbook. Each document is scoped to a specific concern and cross-linked.

## Documents
- Executive-Summary.md — high-level overview, options, and recommendations
- Target-Architectures.md — SaaS and Desktop designs, tradeoffs, and components
- Roadmap.md — phased delivery plan with deliverables and estimates
- Data-Model.md — proposed relational schema for users, orgs, runs, outputs, patterns
- Backend-Blueprint.md — initial Fastify service layout, workers, and validation
- Security-and-Compliance.md — security posture, data protection, and policies
- Billing-and-Metering.md — Stripe plans, usage metering, limits
- Observability-and-Ops.md — logs, metrics, traces, SLOs, on-call, runbooks
- YouTube-Processing-Policy.md — compliance, URL validation, and execution safety
- Docker-and-Config.md — containerization, env vars, and local dev
- Desktop-Packaging.md — Electron/Tauri packaging and local key management
- Immediate-Changes.md — concrete near-term changes to current repo
- API-Spec.md — initial REST API for patterns, runs, outputs, auth

## Getting started
1) Read Executive-Summary.md
2) Choose Desktop vs SaaS track for initial push
3) Follow Roadmap.md for the selected track

## Status
This blueprint was generated on 2025-10-07. Update as decisions are made.
