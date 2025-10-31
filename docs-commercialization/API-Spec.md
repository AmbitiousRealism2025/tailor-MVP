# Initial API Spec (SaaS)

Auth
- POST /auth/callback (OAuth)
- GET /me — current user and orgs

Patterns
- GET /patterns — list with descriptions and categories

Runs
- POST /runs — create a run
  - body: { pattern, input, inputSource: 'text'|'youtube'|'upload', strategy?, idempotencyKey? }
  - returns: { runId, status }
- GET /runs/:id — status and result pointer
- GET /runs — list recent runs (paginated)

Outputs
- GET /outputs/:id — fetch output metadata and content or URL

Errors
- 400 invalid_request, 401 unauthorized, 403 forbidden, 429 rate_limited, 500 server_error

Webhooks (optional)
- POST /webhooks/stripe — billing events
- POST /webhooks/runs — run completion events for external integrations
