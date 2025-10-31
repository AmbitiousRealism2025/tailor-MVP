# Tailor Architecture Overview

**Version**: 0.3.0
**Last Updated**: October 2025
**Status**: Production Ready (Phase 1 Complete)

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Design](#architecture-design)
3. [Component Breakdown](#component-breakdown)
4. [Data Flow](#data-flow)
5. [API Endpoints](#api-endpoints)
6. [Configuration](#configuration)
7. [Dependencies](#dependencies)
8. [Deployment](#deployment)

---

## System Overview

Tailor is a web-based interface for [Fabric AI](https://github.com/danielmiessler/fabric), designed to provide an intuitive way to apply AI patterns to text and video content. The system consists of two primary components:

1. **Frontend**: Single-page HTML application (`fabric-web-gui.html`)
2. **Backend**: Node.js HTTP proxy server (`fabric-proxy.js`)

### Core Purpose

Tailor bridges the gap between Fabric's powerful CLI tools and a user-friendly web interface, enabling:
- Pattern application to text, YouTube videos, and uploaded documents
- Pattern chaining (sequential pattern application)
- Integration with Obsidian for knowledge management
- Strategy-aware AI processing with 9 reasoning approaches

---

## Architecture Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │         fabric-web-gui.html                       │ │
│  │  (Single-Page Application)                        │ │
│  │  - Vanilla HTML/CSS/JavaScript                    │ │
│  │  - No framework dependencies                      │ │
│  │  - Pattern selection & input handling             │ │
│  └─────────────────┬─────────────────────────────────┘ │
└────────────────────┼───────────────────────────────────┘
                     │ HTTP (localhost:3000)
                     │ CORS enabled
                     ↓
┌─────────────────────────────────────────────────────────┐
│              Node.js Backend (Port 3000)                │
│  ┌───────────────────────────────────────────────────┐ │
│  │         fabric-proxy.js                           │ │
│  │  - HTTP server (native Node.js http module)      │ │
│  │  - Pattern catalog reader                         │ │
│  │  - Subprocess manager (spawn)                     │ │
│  │  - VTT parser for YouTube transcripts             │ │
│  │  - Obsidian integration handler                   │ │
│  └─────────────────┬─────────────────────────────────┘ │
└────────────────────┼───────────────────────────────────┘
                     │ Process spawning
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  External Dependencies                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    fabric    │  │   yt-dlp     │  │   Obsidian   │ │
│  │   CLI Tool   │  │YouTube Tool  │  │  Vault (fs)  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Key Design Decisions

1. **No REST API**: Bypasses Fabric's built-in REST API due to `/chat` endpoint issues
2. **Subprocess Architecture**: Spawns `fabric` CLI as child processes for reliability
3. **Stateless Server**: Each request creates a new Fabric process
4. **File-based Integration**: Direct filesystem writes for Obsidian (no API)
5. **Client-side Rendering**: All UI logic in browser, server only handles data

---

## Component Breakdown

### Frontend: fabric-web-gui.html

**Type**: Single-Page Application (SPA)
**Size**: ~87 KB
**Protocol**: file:// or served via HTTP
**Framework**: None (Vanilla JavaScript)

#### Key Features

1. **Pattern Management**
   - Fetches 226+ patterns from backend
   - Displays with descriptions (parsed from `system.md`)
   - Recent patterns history (localStorage)
   - Auto-recommendation of reasoning strategies

2. **Input Handling**
   - **Text Mode**: Direct text input via textarea
   - **YouTube Mode**: URL input → yt-dlp transcription
   - **Upload Mode**: Local file reading (TXT, MD, PDF, DOC, etc.)

3. **Auto-save System**
   - Debounced localStorage persistence (300ms delay)
   - Draft restoration on page load
   - Per-input-type state management
   - Draft notification UI

4. **Pattern Chaining**
   - Process output through multiple patterns sequentially
   - Chain history tracking
   - Dialog-based pattern selection

5. **Obsidian Integration**
   - Save dialog with title and tag inputs
   - AI-powered metadata extraction
   - YAML frontmatter generation
   - Direct vault file writing

6. **Enhanced UX**
   - Loading states with progress indicators
   - Time estimates based on content length
   - Strategy recommendations per pattern type
   - Error handling with user-friendly messages

#### JavaScript Architecture

```javascript
// Core API Configuration
const API_BASE = 'http://localhost:3000';

// State Management
let currentInputType = 'text';           // text | youtube | upload
let uploadedFileContent = '';            // Cached file content
let currentProcessingData = {};          // Chain tracking
let lastPattern = null;                  // Recent pattern tracking

// LocalStorage Keys
const DRAFT_TEXT_KEY = 'tailor-draft-text';
const DRAFT_YOUTUBE_KEY = 'tailor-draft-youtube';
const DRAFT_PATTERN_KEY = 'tailor-draft-pattern';
const DRAFT_STRATEGY_KEY = 'tailor-draft-strategy';
const DRAFT_INPUT_TYPE_KEY = 'tailor-draft-input-type';
const RECENT_PATTERNS_KEY = 'tailor-recent-patterns';

// Strategy Mapping
const strategyMap = {
  'analyze': 'cot',
  'create': 'tot',
  'extract': 'cod',
  'summarize': 'cod',
  'improve': 'self-refine',
  'explain': 'ltm',
  // ... 20+ keyword mappings
};
```

#### Main Functions

| Function | Purpose |
|----------|---------|
| `loadPatterns()` | Fetches pattern catalog from backend |
| `processText()` | Main processing function, handles all input types |
| `executeChain()` | Sequential pattern application |
| `saveToObsidian()` | Triggers backend save with metadata |
| `saveDraft()` / `restoreDraft()` | Auto-save system |
| `updateRecommendedStrategy()` | Strategy auto-selection |
| `showLoading()` / `updateLoadingState()` | Enhanced loading UX |

---

### Backend: fabric-proxy.js

**Type**: Node.js HTTP Server
**Port**: 3000
**Dependencies**: Native Node.js modules only (http, child_process, fs, path)

#### Server Architecture

```javascript
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PATTERNS_DIR = path.join(process.env.HOME, '.config/fabric/patterns');
const OBSIDIAN_VAULT = '/Volumes/Ambitious Realism TB5 2TB/Ambitious Realism';
```

#### Core Functions

##### 1. Pattern Discovery

```javascript
function getPatterns() {
  // Reads ~/.config/fabric/patterns/ directory
  // Returns array of pattern directory names
}

async function getPatternDetails() {
  // Reads system.md from each pattern directory
  // Extracts description from "IDENTITY and PURPOSE" section
  // Caches results for 5 minutes
  // Returns: [{ name: string, description: string }]
}
```

##### 2. Fabric CLI Integration

```javascript
function processFabric(pattern, input, strategy, callback) {
  // Spawns: fabric -p <pattern> --stream
  // Strategy support: Currently disabled (requires fabric --setup)
  // Input: Piped via stdin
  // Output: Captured from stdout/stderr
  // Error handling: Non-zero exit codes trigger callback error
}
```

##### 3. YouTube Processing

```javascript
function processYouTube(pattern, youtubeUrl, includeTimestamps, strategy, callback) {
  // 1. Extract video ID from URL
  // 2. Spawn: yt-dlp --skip-download --write-auto-subs --sub-lang en --sub-format vtt
  // 3. Parse VTT file with parseVTT()
  // 4. Pass transcript to processFabric()
  // 5. Cleanup temporary VTT file
}

function parseVTT(vttContent) {
  // Parses WebVTT subtitle format
  // Removes timing codes, duplicates, metadata
  // Returns clean transcript text
}
```

##### 4. Obsidian Integration

```javascript
function extractMetadata(content, callback) {
  // Uses Fabric AI to extract:
  // - summary (embedding-optimized)
  // - keywords (semantic search terms)
  // - category (high-level classification)
  // - domain_tags & topic_tags
  // - entities (people, orgs, products)
  // Returns: JSON object
}

// POST /save endpoint handler
// 1. Extracts AI metadata from content
// 2. Generates YAML frontmatter with comprehensive tags
// 3. Cleans markdown code block wrappers
// 4. Writes to Obsidian vault with filename: <title-slug>.md
```

**Frontmatter Schema**:
```yaml
---
schema: "v1"
id: "fabric:pattern-timestamp"
title: "User-provided title"
date_created: "2025-10-07"
type: "fabric-output"
category: "AI-Processing"
source_type: "text|youtube|upload"
fabric_pattern: "pattern_name"
fabric_model: "glm-4.6"
processed_at: "ISO timestamp"
tags:
  - "fabric"
  - "source/fabric"
  - "format/ai-processed"
  - "pattern/pattern_name"
  - "source/text"
  - "domain/ai"
  - "topic/prompt-engineering"
keywords:
  - "keyword1"
  - "keyword2"
summary: "Embedding-optimized summary"
entities:
  people:
    - "Person Name"
  orgs:
    - "Organization"
  products:
    - "Product/Tool"
source_url: "https://youtube.com/..." # Optional
source_file: "filename.txt" # Optional
fabric_strategy: "cot" # Optional
chained_from: "previous_pattern" # Optional
---
```

##### 5. Caching System

```javascript
let patternDetailsCache = null;
let patternsCacheTimestamp = null;
const CACHE_TTL = 300000; // 5 minutes

// Pattern details cached to reduce filesystem reads
// Cache invalidates after 5 minutes
// Improves pattern dropdown load performance
```

---

## Data Flow

### Text Processing Flow

```
1. User enters text in browser
   ↓
2. Frontend: User clicks "Process with Fabric"
   ↓
3. Frontend: POST /chat
   {
     message: "user text",
     pattern: "summarize",
     strategy: "cot",
     isYouTube: false
   }
   ↓
4. Backend: Receives request
   ↓
5. Backend: Spawns fabric CLI
   fabric -p summarize --stream
   ↓
6. Backend: Pipes input to fabric stdin
   ↓
7. Fabric: Processes with GLM-4.6 model
   ↓
8. Backend: Captures stdout output
   ↓
9. Backend: Returns text/plain response
   ↓
10. Frontend: Displays output in results section
    ↓
11. Frontend: Enables chain/copy/save buttons
```

### YouTube Processing Flow

```
1. User enters YouTube URL
   ↓
2. Frontend: POST /chat with isYouTube: true
   ↓
3. Backend: Extracts video ID from URL
   ↓
4. Backend: Spawns yt-dlp
   yt-dlp --write-auto-subs --sub-format vtt --output /tmp/yt-{videoId} {url}
   ↓
5. Backend: Reads /tmp/yt-{videoId}.en.vtt
   ↓
6. Backend: Parses VTT with parseVTT()
   - Removes timestamps
   - Deduplicates text
   - Cleans formatting tags
   ↓
7. Backend: Passes transcript to processFabric()
   ↓
8. Backend: Deletes temporary VTT file
   ↓
9. Backend: Returns processed output
   ↓
10. Frontend: Displays results
```

### Pattern Chaining Flow

```
1. User clicks "Chain Pattern"
   ↓
2. Frontend: Shows pattern selection dialog
   ↓
3. User selects second pattern
   ↓
4. Frontend: POST /chat
   {
     message: "<previous output>",
     pattern: "improve_writing",
     isYouTube: false
   }
   ↓
5. Backend: Processes as normal text input
   ↓
6. Frontend: Replaces output with chained result
   ↓
7. Frontend: Updates processing metadata
   currentProcessingData.chainedFrom = "first_pattern"
```

### Obsidian Save Flow

```
1. User clicks "Save to Obsidian"
   ↓
2. Frontend: Shows save dialog (title + tags input)
   ↓
3. User enters title and optional tags
   ↓
4. Frontend: POST /save
   {
     title: "My Note",
     content: "<output>",
     pattern: "summarize",
     sourceType: "text|youtube|upload",
     sourceUrl: "https://...", // Optional
     sourceFile: "file.txt", // Optional
     customTags: ["research", "important"],
     strategy: "cot",
     chainedFrom: "extract_wisdom" // Optional
   }
   ↓
5. Backend: Calls extractMetadata(content)
   ↓
6. Backend: Spawns fabric CLI for metadata extraction
   ↓
7. Backend: Parses JSON response for metadata
   ↓
8. Backend: Generates YAML frontmatter
   ↓
9. Backend: Cleans markdown code blocks from content
   ↓
10. Backend: Writes file to Obsidian vault
    Path: /Volumes/.../Ambitious Realism/<title-slug>.md
    ↓
11. Backend: Returns { success: true, filename: "...", filepath: "..." }
    ↓
12. Frontend: Shows success message with filename
```

---

## API Endpoints

### GET /patterns/names

**Purpose**: Retrieve list of available pattern names
**Response Type**: `application/json`
**Cache**: No caching

**Response Example**:
```json
[
  "summarize",
  "extract_wisdom",
  "improve_writing",
  "analyze_claims",
  ...
]
```

**Error Handling**: Returns `[]` if patterns directory not found

---

### GET /patterns/details

**Purpose**: Retrieve pattern names with descriptions
**Response Type**: `application/json`
**Cache**: 5 minutes (in-memory)

**Response Example**:
```json
[
  {
    "name": "summarize",
    "description": "You are an expert content summarizer. You take content in and output a Markdown formatted summa..."
  },
  {
    "name": "extract_wisdom",
    "description": "You extract surprising, insightful, and interesting information from text content."
  },
  ...
]
```

**Description Extraction Logic**:
1. Read `~/.config/fabric/patterns/{pattern}/system.md`
2. Find line after "# IDENTITY and PURPOSE"
3. Extract first sentence
4. Truncate to 100 characters if longer

**Error Handling**: Empty description if `system.md` not found

---

### POST /chat

**Purpose**: Process content with Fabric pattern
**Content-Type**: `application/json`
**Response Type**: `text/plain`

**Request Body**:
```json
{
  "message": "Content to process (or YouTube URL)",
  "pattern": "summarize",
  "strategy": "cot",        // Optional, currently not implemented
  "isYouTube": false,       // true for YouTube URLs
  "includeTimestamps": false // YouTube-specific option
}
```

**Response**: Plain text output from Fabric CLI

**Error Responses**:
- `400 Bad Request`: Missing pattern or message
- `500 Internal Server Error`: Fabric CLI error, YouTube fetch error

**Processing Time**:
- Text: 15-60 seconds (depends on length)
- YouTube: 20-90 seconds (includes transcript fetch)

---

### POST /save

**Purpose**: Save processed output to Obsidian vault
**Content-Type**: `application/json`
**Response Type**: `application/json`

**Request Body**:
```json
{
  "title": "My Note Title",
  "content": "Processed output content",
  "pattern": "summarize",
  "sourceType": "text",     // text | youtube | upload
  "sourceUrl": "https://...", // Optional
  "sourceFile": "file.txt",  // Optional
  "customTags": ["research", "important"], // Optional
  "strategy": "cot",         // Optional
  "chainedFrom": "pattern"   // Optional
}
```

**Response Example**:
```json
{
  "success": true,
  "filename": "my-note-title.md",
  "filepath": "/Volumes/Ambitious Realism TB5 2TB/Ambitious Realism/my-note-title.md"
}
```

**Error Responses**:
- `400 Bad Request`: Missing required fields (title, content, pattern, sourceType)
- `500 Internal Server Error`: File write error, metadata extraction error

**Side Effects**:
- Creates/overwrites file in Obsidian vault
- Filename format: `<title-slug>.md` (no date prefix)
- AI metadata extraction call to Fabric

---

### GET /health

**Purpose**: Server health check
**Response Type**: `text/plain`

**Response**: `OK` (200 status)

**Use Case**: Monitoring, startup verification

---

## Configuration

### Environment Variables

None required. All configuration is hardcoded in `fabric-proxy.js`.

### Configuration Constants

```javascript
// fabric-proxy.js
const PORT = 3000;
const PATTERNS_DIR = path.join(process.env.HOME, '.config/fabric/patterns');
const OBSIDIAN_VAULT = '/Volumes/Ambitious Realism TB5 2TB/Ambitious Realism';
const CACHE_TTL = 300000; // 5 minutes
```

**To Change**:
1. Edit `fabric-proxy.js`
2. Update constants at top of file
3. Restart server

### CORS Configuration

```javascript
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
```

**Purpose**: Allow browser access from `file://` protocol

---

## Dependencies

### Backend Dependencies

**Runtime**: Node.js (any modern version, tested with v18+)

**Native Modules** (built-in):
- `http` - HTTP server
- `child_process` - Process spawning
- `fs` - Filesystem operations
- `path` - Path manipulation

**External Tools**:
- `fabric` - CLI tool (must be in PATH)
- `yt-dlp` - YouTube download tool (must be in PATH)

**Installation**:
```bash
# macOS
brew install yt-dlp

# Install Fabric (see https://github.com/danielmiessler/fabric)
# Requires: fabric --setup to configure API keys
```

### Frontend Dependencies

**None**. Pure vanilla JavaScript, no build step required.

### System Requirements

- macOS, Linux, or Windows (with yt-dlp support)
- Node.js installed
- Fabric CLI installed and configured
- yt-dlp installed (for YouTube support)
- Obsidian vault accessible (for save feature)

---

## Deployment

### Local Development Setup

```bash
# 1. Clone repository
cd /path/to/tailor-MVP

# 2. Verify dependencies
fabric --version
yt-dlp --version
node --version

# 3. Start server
node fabric-proxy.js
# Output:
# 🚀 Fabric Web Proxy running on http://localhost:3000
# 📁 Patterns directory: /Users/you/.config/fabric/patterns
# 📊 Available patterns: 226

# 4. Open frontend
open fabric-web-gui.html
# Or serve via HTTP:
# python3 -m http.server 8000
# Then open: http://localhost:8000/fabric-web-gui.html
```

### Production Considerations

#### Server Deployment

**Option 1: PM2 Process Manager**
```bash
npm install -g pm2
pm2 start fabric-proxy.js --name tailor-proxy
pm2 save
pm2 startup  # Enable auto-start on boot
```

**Option 2: systemd Service** (Linux)
```ini
[Unit]
Description=Tailor Fabric Proxy
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/tailor-MVP
ExecStart=/usr/bin/node fabric-proxy.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### Frontend Deployment

**Option 1: Static File Server**
- Apache/Nginx: Serve `fabric-web-gui.html` as static file
- Update `API_BASE` in HTML to point to backend URL

**Option 2: Electron App**
- Wrap in Electron for desktop distribution
- Bundle backend as child process

**Option 3: Docker Container**
```dockerfile
FROM node:18-alpine
RUN apk add --no-cache python3 py3-pip ffmpeg
RUN pip3 install yt-dlp
# Install fabric CLI...
COPY . /app
WORKDIR /app
EXPOSE 3000
CMD ["node", "fabric-proxy.js"]
```

### Security Notes

⚠️ **Current Implementation**: Development-grade security

**Production Recommendations**:
1. **Authentication**: Add API key or OAuth to backend
2. **CORS**: Restrict to specific origins (not `*`)
3. **Rate Limiting**: Prevent abuse of expensive AI operations
4. **Input Validation**: Sanitize all user inputs
5. **HTTPS**: Use TLS for production deployments
6. **File Permissions**: Restrict Obsidian vault write access

---

## Performance Characteristics

### Response Times

| Operation | Typical Duration |
|-----------|------------------|
| GET /patterns/names | < 50ms |
| GET /patterns/details | 100-500ms (first request), < 10ms (cached) |
| POST /chat (text, short) | 15-30 seconds |
| POST /chat (text, long) | 30-90 seconds |
| POST /chat (YouTube) | 20-60 seconds |
| POST /save | 10-20 seconds (includes AI metadata) |

### Scaling Limitations

1. **Concurrent Requests**: Limited by Fabric API rate limits
2. **Memory**: Each spawned process consumes ~100-200MB
3. **CPU**: AI processing is compute-intensive
4. **Disk I/O**: Pattern reading, Obsidian writes

**Recommended**: Max 5-10 concurrent users without dedicated infrastructure

---

## Troubleshooting

### Common Issues

**Problem**: Patterns not loading
**Solution**: Check `~/.config/fabric/patterns/` exists and contains pattern directories

**Problem**: Empty API responses
**Solution**: Run `fabric --setup` to configure API keys

**Problem**: YouTube processing fails
**Solution**: Verify `yt-dlp --version` works and video has captions

**Problem**: Port 3000 already in use
**Solution**: `lsof -i :3000` to find process, kill it, or change PORT in `fabric-proxy.js`

**Problem**: Obsidian save fails
**Solution**: Verify OBSIDIAN_VAULT path exists and is writable

---

## Future Architecture Improvements

1. **WebSocket Streaming**: Real-time output streaming instead of buffered responses
2. **Queue System**: Background job processing for expensive operations
3. **Database**: Store processing history, pattern favorites, user preferences
4. **Auth System**: Multi-user support with API key management
5. **Pattern Hot-reload**: Watch patterns directory for changes
6. **Strategy Support**: Enable reasoning strategy selection (requires Fabric v2.0+)
7. **Batch Processing**: Process multiple files with same pattern
8. **API Versioning**: Support multiple API versions for backwards compatibility

---

**Document Version**: 1.0.0
**Generated**: October 2025
**Maintained By**: Tailor Development Team
