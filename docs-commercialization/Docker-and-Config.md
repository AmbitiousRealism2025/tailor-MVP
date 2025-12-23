# Docker and Configuration

Environment variables
- PORT, NODE_ENV
- DATABASE_URL (Postgres), REDIS_URL, S3_BUCKET/S3_REGION/S3_ENDPOINT
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
- AUTH_PROVIDERS (e.g., GOOGLE_CLIENT_ID/SECRET)
- PATTERN_CATALOG_PATH (read-only mounted patterns)

Example Dockerfile

```dockerfile path=null start=null
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
CMD ["node", "dist/app.js"]
```

docker-compose (dev)

```yaml path=null start=null
version: '3.9'
services:
  api:
    build: .
    ports: ["3000:3000"]
    env_file: .env
    depends_on: [db, redis]
  worker:
    build: .
    command: ["node", "dist/worker.js"]
    env_file: .env
    depends_on: [db, redis]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
    ports: ["5432:5432"]
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```
