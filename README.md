# Tailor MVP - Fabric AI Web Interface

A modern web interface for the Fabric AI pattern library, designed to make AI-assisted content processing accessible and efficient.

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Fabric CLI configured
- Obsidian (optional, for save functionality)

### Installation

1. **Clone and setup:**
   ```bash
   git clone https://github.com/AmbitiousRealism2025/tailor-MVP.git
   cd tailor-MVP
   ```

2. **Start the proxy server:**
   ```bash
   node fabric-proxy.js
   ```

3. **Open the web interface:**
   ```bash
   open fabric-web-gui.html
   ```

The server will run on `http://localhost:3000` with the following endpoints:
- `GET /patterns/names` - List all patterns
- `GET /patterns/details` - List patterns with descriptions
- `POST /chat` - Process text with patterns
- `POST /save` - Save to Obsidian with metadata
- `GET /health` - Health check

## ✨ Key Features

### Current Capabilities
- **Pattern Processing:** Access to 226+ Fabric AI patterns
- **Multiple Input Sources:** Text, YouTube URLs, file uploads
- **Obsidian Integration:** Save with AI-generated metadata and front matter
- **Pattern Chaining:** Sequential processing workflows
- **Strategy Selection:** Multiple AI reasoning strategies

### YouTube Processing
Automatically transcribes and processes YouTube videos:
- Subtitle extraction with yt-dlp
- Clean transcript parsing
- Direct pattern application

### Obsidian Integration
Comprehensive save functionality with:
- AI-generated metadata extraction
- YAML front matter with tags and entities
- Semantic search optimization
- Automatic categorization

## 📋 Development Status

### Current Release
- **Version:** 0.3.0 - Phase 1 Quick Wins ✅
- **Status:** Production Ready - Phase 1 Complete
- **Branch:** `feature/roadmap-implementation`

### ✅ Phase 1 Completed (Quick Wins)
- **Copy Output Button** - One-click clipboard functionality with fallback support
- **Auto-Save Drafts** - localStorage persistence with 300ms debouncing
- **Recent Patterns History** - Tracks last 10 patterns with quick access buttons
- **Processing Status Indicator** - Enhanced loading with progress bars and time estimates

### What's Next
See [Roadmap.md](Roadmap.md) for comprehensive feature planning including:

**Phase 2 (Navigation - 1-2 hours each):**
- Pattern search & filtering (CRITICAL for 226 patterns)
- Export formats (Plain text, JSON, Markdown)
- Keyboard shortcuts (Ctrl+Enter, Ctrl+K, etc.)
- Input validation and error handling

## 🛠️ Architecture

### Components
- **`fabric-proxy.js`** - Node.js server with CORS and Fabric CLI integration
- **`fabric-web-gui.html`** - Modern responsive web interface
- **`Obsidian Integration`** - AI-powered metadata extraction and file management

### Technology Stack
- **Backend:** Node.js with HTTP server
- **AI Processing:** Fabric CLI with GLM-4.6 model
- **Frontend:** Vanilla JavaScript with modern CSS
- **Storage:** LocalStorage for client-side persistence

## 📚 Documentation

- [Roadmap.md](Roadmap.md) - Comprehensive 6-phase development plan
- [Development-Plan.md](Development-Plan.md) - Feature tracking and priorities
- [Fabric-Cheat-Sheet.md](Fabric-Cheat-Sheet.md) - User guide and pattern reference
- [Obsidian-Frontmatter-Research.md](Obsidian-Frontmatter-Research.md) - Metadata schema design

## 🔧 Configuration

### Environment Setup
1. Install Fabric CLI and configure patterns
2. Set up Obsidian vault path in `fabric-proxy.js`
3. Configure YouTube processing with yt-dlp

### Obsidian Integration
Update the `OBSIDIAN_VAULT` path in `fabric-proxy.js`:
```javascript
const OBSIDIAN_VAULT = '/path/to/your/obsidian/vault';
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `master`
2. Implement changes following the roadmap phases
3. Test with multiple patterns and input types
4. Update documentation
5. Submit pull request

### Current Focus
Implementing Phase 1 quick wins from the roadmap:
- UI/UX improvements
- Workflow automation
- User feedback enhancements

## 📊 Usage Statistics

- **226+ Patterns:** Comprehensive AI pattern library
- **Multiple Input Types:** Text, YouTube, file uploads
- **AI Metadata:** Automatic content analysis and tagging
- **Export Options:** Obsidian with rich front matter

## 🐛 Troubleshooting

### Common Issues
- **Fabric not found:** Ensure Fabric CLI is installed and in PATH
- **YouTube errors:** Check yt-dlp installation and video caption availability
- **Obsidian save fails:** Verify vault path and write permissions

### Debug Mode
Enable debug logging in `fabric-proxy.js` by setting:
```javascript
const DEBUG = true;
```

## 📈 Performance

### Optimizations
- **Pattern Caching:** 5-minute cache for pattern details
- **Async Processing:** Non-blocking AI requests
- **Local Storage:** Client-side persistence for drafts
- **Batch Operations:** Efficient file handling

---

**Last Updated:** 2025-10-07
**Version:** 0.3.0 - Phase 1 Quick Wins
**Repository:** https://github.com/AmbitiousRealism2025/tailor-MVP

---

## 🎯 Quick Usage Examples

### 1. Process YouTube Video
1. Paste YouTube URL in input field
2. Select `extract_wisdom` pattern
3. Click "Process with AI"
4. Save result to Obsidian

### 2. Analyze Document
1. Upload text file or paste content
2. Choose appropriate pattern (e.g., `summarize`, `analyze_claims`)
3. Select reasoning strategy if needed
4. Process and save results

### 3. Chain Patterns
1. Process content with first pattern
2. Click "Chain Pattern" button
3. Select next pattern
4. Apply to previous output

## 🔮 Future Vision

Tailor aims to be the most user-friendly interface for AI-powered content processing, with focus on:
- **Accessibility:** Easy pattern discovery and use
- **Integration:** Seamless workflow with existing tools
- **Intelligence:** Smart metadata and organization
- **Extensibility:** Custom patterns and workflows

See [Roadmap.md](Roadmap.md) for detailed future plans.