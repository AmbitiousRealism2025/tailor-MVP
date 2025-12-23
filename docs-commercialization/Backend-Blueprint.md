# Backend Blueprint (TypeScript + Fastify)

Project layout
```
api/
  src/
    app.ts
    routes/
      auth.ts
      patterns.ts
      runs.ts
      outputs.ts
    lib/
      db.ts
      logger.ts
      validate.ts
      queue.ts
    workers/
      runWorker.ts
  package.json
  tsconfig.json
```

Key ideas
- Strict request validation (zod/valibot)
- Pino structured logging with request IDs
- Redis-backed rate limiting and BullMQ job queue
- S3 for large outputs; Postgres for metadata

Example Fastify server (simplified)

```ts path=null start=null
import Fastify from 'fastify';
import { z } from 'zod';

const app = Fastify({ logger: true });

const CreateRun = z.object({
  pattern: z.string().min(1),
  input: z.string().min(1).max(200_000),
  inputSource: z.enum(['text','youtube','upload']),
  strategy: z.string().optional(),
  idempotencyKey: z.string().optional()
});

app.post('/runs', async (req, reply) => {
  const parse = CreateRun.safeParse(req.body);
  if (!parse.success) return reply.code(400).send({ error: 'invalid_request' });
  const { pattern, input, inputSource, strategy, idempotencyKey } = parse.data;

  // TODO: auth + org scoping
  // TODO: rate limit check

  const runId = await enqueueRun({ pattern, input, inputSource, strategy, idempotencyKey });
  return { runId, status: 'queued' };
});

app.get('/runs/:id', async (req) => {
  // look up status and return output URL when done
});

app.listen({ port: Number(process.env.PORT || 3000), host: '0.0.0.0' });
```

Worker outline

```ts path=null start=null
import { Worker } from 'bullmq';

const worker = new Worker('runs', async (job) => {
  const { pattern, input, inputSource, strategy } = job.data;
  // Execute in sandboxed container or call model SDK
  // Enforce timeouts, capture logs, write output to S3, update DB
});
```

Validation helpers

```ts path=null start=null
import { z } from 'zod';

export const youtubeUrl = z.string().url().refine(u => /youtu(\.be|be\.com)\//.test(u), 'YouTube URL required');
```

Next steps
- Implement auth middleware and org scoping
- Add rate limiting and plan enforcement
- Wire up BullMQ and job lifecycle persistence
