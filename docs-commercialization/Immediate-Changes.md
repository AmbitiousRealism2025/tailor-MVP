# Immediate Changes to Current Repo

Configuration
- Replace hard-coded Obsidian path in fabric-proxy.js with env var OBSIDIAN_VAULT (optional)
- Parameterize patterns directory via PATTERNS_DIR (fallback to ~/.config/fabric/patterns)

Safety & validation
- Validate /chat payload: { pattern, message|youtubeUrl, strategy? } with size caps
- Restrict YouTube domain and validate video ID format
- Add per-request timeout and max concurrent processes (simple semaphore)

DX and quality
- Introduce ESLint/Prettier and npm scripts
- Add unit tests for parseVTT()
- Provide a basic Dockerfile and instructions in README

Migration note
- Plan to migrate to a Fastify TypeScript service (see Backend-Blueprint.md)
