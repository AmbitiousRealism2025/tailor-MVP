# Data Model

Relational schema (Postgres). Tables and key fields for SaaS.

```sql path=null start=null
-- Users and organizations
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table org_memberships (
  org_id uuid not null references orgs(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

-- Authentication sessions / providers
create table auth_identities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  provider text not null, -- 'google' | 'github' | 'magic'
  provider_user_id text not null,
  created_at timestamptz not null default now(),
  unique(provider, provider_user_id)
);

-- Pattern catalog (managed by service)
create table patterns (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  category text,
  default_strategy text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Runs (jobs)
create table runs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  user_id uuid not null references users(id) on delete set null,
  pattern_id uuid not null references patterns(id),
  input_source text not null, -- 'text' | 'youtube' | 'upload'
  input_chars int,
  strategy text, -- optional
  status text not null, -- 'queued' | 'processing' | 'succeeded' | 'failed'
  queued_at timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz,
  error text,
  request_id text, -- for tracing
  idempotency_key text,
  unique(org_id, idempotency_key)
);

-- Outputs (can be large; store body in object storage when needed)
create table outputs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references runs(id) on delete cascade,
  content text, -- optional if stored in object storage
  content_url text, -- S3 URL
  summary text,
  keywords text[],
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Usage and billing
create table usage_events (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  user_id uuid references users(id),
  run_id uuid references runs(id),
  event_type text not null, -- 'run.created' | 'run.completed' | 'tokens.used'
  quantity numeric,
  created_at timestamptz not null default now()
);

create table plans (
  id text primary key, -- 'free' | 'pro' | 'team'
  name text not null,
  monthly_price_cents int not null,
  limits jsonb not null -- e.g., {"max_runs_per_day": 1000, "max_chars": 200000}
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references orgs(id) on delete cascade,
  plan_id text not null references plans(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null, -- 'active' | 'past_due' | 'canceled'
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);
```

Notes
- Use row-level security (if on managed Postgres that supports it) or strict WHERE scoping by org_id.
- Index runs(org_id, status, queued_at) and outputs(run_id) for performance.
- Consider a separate artifacts table for large intermediates.
