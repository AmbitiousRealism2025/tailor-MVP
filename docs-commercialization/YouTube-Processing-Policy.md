# YouTube Processing Policy

Scope
- Feature extracts captions/transcripts to process through patterns.

Compliance options
- Prefer official APIs where permitted; document endpoints and quotas
- If using yt-dlp, ensure use complies with YouTube TOS; restrict to user-provided URLs they have rights to use

Safety controls
- Validate URL domain against allowlist
- Enforce size/time caps; block videos without captions by default
- Sandbox yt-dlp in a container with network egress limited to youtube domains

User disclosures
- Clearly state how data is processed and retained
- Provide opt-out and deletion pathways
