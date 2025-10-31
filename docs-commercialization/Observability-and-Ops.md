# Observability and Operations

Instrumentation
- Pino JSON logs with request IDs; ship to a log store (Loki/ELK)
- Sentry for error tracking with release tags
- OpenTelemetry traces across API and workers
- Prometheus metrics: request latency, queue depth, worker success/failure, external call latency

SLOs and alerts
- API: p95 latency and availability SLOs (e.g., 99.9%)
- Worker: job success rate and max queue time SLO
- Alerts: on error-rate spikes, queue backlog, saturation

Runbooks
- Common incidents: worker crash loops, queue backlog, provider outages
- Step-by-step mitigation, rollback, and communication templates

Environments
- dev, staging, prod with separate resources; feature flags for risky changes
