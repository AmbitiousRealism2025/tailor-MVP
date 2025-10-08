# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tailor** is a custom web interface for [Fabric AI](https://github.com/danielmiessler/fabric), a framework that applies AI patterns to transform text/video content. The project consists of:

- **fabric-web-gui.html** - Single-page web interface with pattern selection, input handling (text/YouTube/file upload), and output display
- **fabric-proxy.js** - Node.js HTTP proxy server that bridges the web UI to the Fabric CLI (bypasses issues with Fabric's built-in REST API)

The system processes content through 226+ AI patterns using the GLM-4.6 model with 9 reasoning strategies.

## Architecture

### Data Flow

```
User Input (Text/YouTube/Upload)
  → Web UI (fabric-web-gui.html)
  → HTTP POST to fabric-proxy.js:3000
  → Spawn Fabric CLI process
  → Stream output back to UI
  → Display + optional pattern chaining
```

### Key Components

**fabric-proxy.js** (Node.js backend):
- Serves HTTP endpoints on port 3000
- Reads pattern catalog from `~/.config/fabric/patterns/`
- Spawns `fabric` CLI with pattern/strategy flags
- Handles YouTube transcript extraction via `yt-dlp`
- Parses VTT subtitle files for transcript text

**fabric-web-gui.html** (Frontend):
- Vanilla HTML/CSS/JS (no frameworks)
- Fetches pattern list with descriptions from proxy
- Auto-recommends reasoning strategies per pattern type
- Supports text input, YouTube URLs, file uploads
- Pattern chaining: process output through multiple patterns sequentially

## Running the Project

### Prerequisites

```bash
# Fabric must be installed and configured
fabric --version  # Should show version number

# yt-dlp required for YouTube processing
brew install yt-dlp  # macOS
```

### Starting the Server

```bash
# Make proxy executable
chmod +x fabric-proxy.js

# Start the proxy server
node fabric-proxy.js
# Server runs on http://localhost:3000
```

### Using the Web UI

```bash
# Open the HTML file directly in browser
open fabric-web-gui.html
```

The UI expects the proxy server running on `localhost:3000`.

## Development Workflow

### Testing Changes

**Backend (fabric-proxy.js)**:
```bash
# Restart server after changes
node fabric-proxy.js

# Test endpoints directly
curl http://localhost:3000/health
curl http://localhost:3000/patterns/names
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"pattern":"summarize","message":"Test text"}'
```

**Frontend (fabric-web-gui.html)**:
- Make changes to HTML file
- Refresh browser (hard refresh: Cmd+Shift+R)
- Check browser console for errors

### Pattern Strategy Mapping

The UI auto-recommends strategies based on pattern name keywords (see `strategyMap` in HTML):
- Analysis patterns → `cot` (Chain-of-Thought) or `reflexion`
- Creation patterns → `tot` (Tree-of-Thought) or `aot` (Atom-of-Thought)
- Extraction patterns → `cod` (Chain-of-Draft) or `standard`
- Summary patterns → `cod` or `standard`
- Improvement patterns → `self-refine` or `reflexion`
- Learning patterns → `ltm` (Least-to-Most) or `cot`

### YouTube Processing Flow

1. User enters YouTube URL
2. Proxy extracts video ID
3. Spawns `yt-dlp --write-auto-subs --sub-format vtt`
4. Parses VTT file with `parseVTT()` to extract clean text
5. Passes transcript to Fabric pattern
6. Cleans up temporary VTT file

## Configuration

### Fabric Patterns Location

Patterns are read from: `~/.config/fabric/patterns/`

Each pattern is a directory with `system.md` file. The proxy reads the first line after "IDENTITY and PURPOSE" for pattern descriptions.

### Custom Pattern Descriptions

**Planned feature** (see [Development-Plan.md](Development-Plan.md)):
Create `pattern-descriptions.json` in Fabric config directory to override auto-parsed descriptions with curated one-liners.

### Obsidian Integration

**Planned feature** (see [Development-Plan.md](Development-Plan.md)):
- Add `/save` endpoint to proxy
- Save outputs to Obsidian vault with YAML front matter
- Auto-tagging with pattern name, source type, date

## File Organization

```
/
├── fabric-web-gui.html       # Frontend UI
├── fabric-proxy.js           # Backend server
├── Development-Plan.md       # Roadmap and planned features
├── Fabric-Cheat-Sheet.md     # User guide
├── Fabric-Patterns-Reference.md  # Complete pattern catalog
├── Fabric-Prompting-Strategies.md # Strategy explanations
└── Obsidian-Frontmatter-Research.md # Front matter schema planning
```

## Important Notes

### Fabric CLI Integration

- The proxy spawns `fabric` as a subprocess, not via API
- Strategy flag: `fabric -p <pattern> --stream --strategy <strategy>`
- Input is piped via stdin
- Output is captured from stdout/stderr

### CORS Configuration

The proxy enables CORS (`Access-Control-Allow-Origin: *`) to allow browser access from file:// protocol.

### Error Handling

- Empty API responses indicate missing/invalid Fabric API keys
- YouTube errors usually mean video has no captions
- Pattern not found errors mean pattern directory doesn't exist in `~/.config/fabric/patterns/`

## Future Development

See [Development-Plan.md](Development-Plan.md) for detailed roadmap. Priority items:

1. **Obsidian Integration** - Save outputs with YAML front matter
2. **Custom Pattern Descriptions** - Curated one-liners for all 226 patterns
3. **Pattern Search/Filter** - Quick filtering of pattern dropdown
4. **Batch Processing** - Process multiple files with same pattern

## Recent Improvements (v0.3.1)

### Generate Frontmatter Pattern Fix
The `generate_frontmatter` pattern has been updated to prevent content truncation:
- **Issue**: Model was being lazy and writing "rest of content remains unchanged" instead of copying full content
- **Fix**: Added CRITICAL OUTPUT REQUIREMENTS section with explicit prohibitions against truncation
- **Location**: `~/.config/fabric/patterns/generate_frontmatter/system.md`
- **Result**: Pattern now outputs complete YAML frontmatter + full original content verbatim

### Time Estimate Improvements
Implemented tiered time estimates based on file size:
- **Small** (< 500 chars): 15 seconds
- **Medium** (500-2K chars): 30 seconds
- **Large** (2K-10K chars): 1 minute
- **Very Large** (10K-50K chars): 2 minutes
- **Massive** (50K+ chars): 3 minutes

### Progress Bar Enhancements
- Caps at 80% instead of 95% to reduce "stuck" perception
- Progressive slowdown: normal speed → 50% slower after 60% → 75% slower after 70%
- Smooth continuous motion prevents frozen feeling
- Scales duration with file size for accurate tracking

### File Size Indicators
Processing now shows file size category and KB size:
- Example: "Very large file (48.2KB) - Processing time scales with content size."

## Troubleshooting

**Proxy won't start:**
- Check Node.js installed: `node --version`
- Check port 3000 not in use: `lsof -i :3000`

**Patterns not loading:**
- Verify Fabric installed: `fabric --version`
- Check patterns directory exists: `ls ~/.config/fabric/patterns/`

**YouTube processing fails:**
- Verify yt-dlp installed: `yt-dlp --version`
- Check video has captions: try manual `yt-dlp --list-subs <url>`

**Empty output:**
- Check Fabric API keys configured: `fabric --setup`
- Look at proxy server console logs for errors

**Pattern truncates content:**
- Ensure pattern file is up to date: `~/.config/fabric/patterns/generate_frontmatter/system.md`
- Pattern should have CRITICAL OUTPUT REQUIREMENTS section
- Test directly with CLI: `echo "test content" | fabric -p generate_frontmatter --stream`
