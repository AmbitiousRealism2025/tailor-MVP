# Billing and Metering

Stripe integration
- Products/plans: free, pro, team; price tiers by limits
- Customer portal for self-serve upgrades/cancellations
- Webhooks: subscription created/updated/canceled; usage reports

Usage metering
- Emit usage_events for run.created/run.completed/tokens.used
- Aggregate per org per period; send to Stripe for usage-based items

Plan enforcement
- Middleware reads subscription and plan limits
- Enforce per-day run caps, max input size, concurrency per org

Fraud & abuse
- Require verified email/OAuth; introduce soft caps for new orgs
- Rate limits per IP/user; delayed payouts until risk clears

Reporting
- Admin dashboard: active subscribers, MRR, churn, top orgs by usage
