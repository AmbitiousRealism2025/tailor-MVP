# Fabric Web GUI - Development Plan

**Last Updated:** 2025-10-07
**Status:** Active Development - Phase 1 Implementation

---

## 📋 Overview

This document tracks planned features and enhancements for the Fabric Web GUI project. **See [Roadmap.md](Roadmap.md) for comprehensive feature planning with 6-phase implementation strategy.**

### Current Status
- **Phase 1 Implementation:** ✅ **COMPLETED** (Quick Wins - All 4 features delivered)
- **Obsidian Integration:** ✅ Completed with AI metadata extraction
- **Branch:** `feature/roadmap-implementation`
- **Current Release:** v0.3.0 - Phase 1 Quick Wins
- **Next Phase:** Phase 2 - Pattern Search & Navigation Features

---

## 🎯 Planned Features

### 1. Custom Pattern Descriptions

**Status:** 📝 Planning
**Priority:** Medium
**Estimated Effort:** 2-3 hours

#### Current State
The pattern dropdown currently shows the first line from each pattern's `system.md` file (the "IDENTITY and PURPOSE" section). While this provides some context, these are often verbose and inconsistent.

Example current description:
```
extract_wisdom - You extract surprising, insightful, and interesting information from text content...
```

#### Desired State
Create hand-crafted, concise one-sentence descriptions for all 226 patterns that clearly explain what each pattern does in user-friendly language.

Example desired description:
```
extract_wisdom - Extract key insights and surprising ideas from any content
```

#### Implementation Plan

1. **Create descriptions file:**
   - Create `pattern-descriptions.json` in `/Users/ambrealismwork/Downloads/Fabric/`
   - Format:
     ```json
     {
       "extract_wisdom": "Extract key insights and surprising ideas from any content",
       "summarize": "Create concise summaries of any text",
       "analyze_claims": "Fact-check statements and evaluate credibility",
       "improve_writing": "Enhance text quality, clarity, and style",
       ...
     }
     ```

2. **Update backend (fabric-proxy.js):**
   - Modify `getPatternDetails()` function
   - Try to read from `pattern-descriptions.json` first
   - Fall back to system.md parsing if description not found
   - Cache descriptions for performance

3. **Write descriptions:**
   - Review all 226 patterns systematically
   - Write clear, actionable one-sentence descriptions
   - Focus on "what it does" not "how it works"
   - Keep consistent tone and length (5-10 words ideal)

4. **Testing:**
   - Verify all patterns have descriptions
   - Check dropdown rendering
   - Ensure descriptions are helpful for pattern selection

#### Benefits
- Faster pattern discovery
- Better user experience
- Consistent, professional presentation
- Easier onboarding for new users

---

### 2. Save to Obsidian with Front Matter

**Status:** 📝 Planning
**Priority:** High
**Estimated Effort:** 3-4 hours

#### Current State
Users can process content with Fabric patterns through the web GUI, but there's no direct way to save results to Obsidian. Currently, users must:
1. Copy output manually
2. Create file in Obsidian
3. Paste content
4. Add metadata manually

#### Desired State
Add a "💾 Save to Obsidian" button that:
- Appears after processing completes
- Opens a dialog to enter filename
- Auto-generates YAML front matter
- Saves directly to Obsidian vault with proper metadata
- Uses YYYY-MM-DD-title.md naming convention

#### Implementation Plan

##### Phase 1: Basic Save Functionality

1. **Backend endpoint (fabric-proxy.js):**
   - Add `POST /save` endpoint
   - Accept: title, content, pattern, source, sourceUrl/sourceFile, customTags
   - Write file to Obsidian vault path
   - Return success/error status

2. **Frontend UI (fabric-web-gui.html):**
   - Add "💾 Save to Obsidian" button next to "Chain Pattern"
   - Button appears after successful processing
   - Create modal popup for save dialog

3. **Save dialog:**
   - Title field (required)
   - Show where file will be saved
   - Success/error confirmation

##### Phase 2: Front Matter Integration

**Research completed:** See [Obsidian-Frontmatter-Research.md](Obsidian-Frontmatter-Research.md)

1. **Front matter structure:**
   ```yaml
   ---
   title: {{user_title}}
   created: {{YYYY-MM-DD}}
   processed_at: {{timestamp}}
   pattern: {{pattern_name}}
   source: {{youtube|text|upload}}
   source_url: {{if youtube}}
   source_file: {{if upload}}
   tags: [fabric, {{pattern_name}}, {{source_type}}, {{custom_tags}}]
   type: fabric-output
   chained_from: {{if chained}}
   ---
   ```

2. **Advanced save dialog fields:**
   - **Title** (required)
   - **Tags** (optional, comma-separated)
   - **Notes** (optional, for personal context)
   - **Preview** of generated front matter before saving

3. **Auto-tagging strategy:**
   - Always include: `fabric`, `ai-processed`
   - Pattern name as tag: `extract_wisdom`, `summarize`, etc.
   - Source type: `youtube`, `text-input`, `upload`
   - User custom tags from dialog

4. **Enhanced metadata:**
   - Track pattern chains (if result of chaining)
   - Store AI model used (GLM-4.6)
   - Include strategy used (if not auto)
   - Preserve source information

##### Phase 3: Polish & UX

1. **Dialog UX improvements:**
   - Remember last-used tags (localStorage)
   - Auto-suggest tags based on pattern
   - Show character count for title
   - Keyboard shortcuts (Cmd+S to save)

2. **Error handling:**
   - Validate title (no special characters)
   - Check if file exists (offer overwrite option)
   - Handle vault permission errors
   - Retry logic for failed saves

3. **Success feedback:**
   - Show confirmation with file path
   - Option to open in Obsidian
   - Keep processing output visible

#### Benefits
- Seamless Fabric → Obsidian workflow
- Consistent metadata for all Fabric outputs
- Searchable via Dataview queries
- Better organization and discoverability
- Preserves context and provenance

#### Open Questions
- Simple vs. advanced dialog? (Start simple, add advanced toggle)
- Default tags? (fabric + pattern name + source type)
- Tag autocomplete? (Future enhancement)
- Folder selection? (Use vault root for now)

---

## 🔮 Future Enhancements (Backlog)

### Pattern Search/Filter
- Add search box above pattern dropdown
- Filter patterns by name or description
- Keyboard navigation for quick selection

### Batch Processing
- Upload multiple files at once
- Apply same pattern to all files
- Save all results to Obsidian in one click

### History/Favorites
- Remember recently used patterns
- Star favorite patterns for quick access
- Processing history with re-run capability

### Pattern Presets
- Save common pattern + strategy combinations
- Quick buttons for "Research Mode", "Creative Writing", etc.
- User-customizable presets

### Output Formatting Options
- Choose output format (Markdown, Plain Text, JSON)
- Custom templates for saved files
- Syntax highlighting for code outputs

### Keyboard Shortcuts
- Cmd/Ctrl+Enter to process
- Cmd/Ctrl+K for pattern search
- Cmd/Ctrl+S to save to Obsidian
- Tab navigation between fields

---

## 📝 Implementation Notes

### General Guidelines
- Maintain backward compatibility
- Test all features with 226 patterns
- Keep UI responsive and fast
- Follow existing code style
- Update documentation

### Testing Checklist (for each feature)
- [ ] Works with text input
- [ ] Works with YouTube URLs
- [ ] Works with file uploads
- [ ] Works with pattern chaining
- [ ] Error states handled gracefully
- [ ] Success states confirmed visually
- [ ] Mobile-friendly (if applicable)

### Documentation Updates Needed
- Update [Fabric-Cheat-Sheet.md](Fabric-Cheat-Sheet.md) with new features
- Add screenshots/examples to README
- Update quick examples in web GUI

---

## 🚀 Next Steps

**Priority 1:** Save to Obsidian with Front Matter
- Most requested feature
- High user value
- Completes the workflow loop

**Priority 2:** Custom Pattern Descriptions
- Improves discoverability
- Better user experience
- One-time effort, long-term benefit

**Priority 3:** Pattern Search/Filter
- Quality of life improvement
- Helps with 226 pattern catalog
- Quick win for usability

---

## 🚀 Recent Updates

### 2025-10-07 - Phase 1 Quick Wins Completed ✅
- ✅ **Roadmap.md Created:** 6-phase implementation plan with 20+ features
- ✅ **Obsidian Save Integration:** Completed with AI metadata extraction
- ✅ **Development Branch:** `feature/roadmap-implementation` created
- ✅ **Phase 1 Completed:** All 4 quick wins implemented and tested
  - Copy Output Button (20 min) ✅
  - Auto-Save Drafts (30 min) ✅
  - Recent Patterns History (30 min) ✅
  - Processing Status Indicator (1 hour) ✅
- ✅ **Testing Complete:** A- grade, Production Ready status
- ✅ **User Experience:** Professional UI with smooth animations and feedback

### Updated Priority Order
1. **✅ Phase 1 Quick Wins** - **COMPLETED** - Immediate user value delivered
2. **Phase 2 Navigation** (Pattern search) - **NEXT** - Critical for 226 patterns
3. **Phase 3 Automation** (Templates, Shortcuts) - Power user features

---

## 📚 Related Documents

**Primary Planning:**
- [Roadmap.md](Roadmap.md) - **NEW:** Comprehensive 6-phase feature implementation plan
- [Development-Plan.md](Development-Plan.md) - This document - High-level feature tracking

**Technical Reference:**
- [Obsidian-Frontmatter-Research.md](Obsidian-Frontmatter-Research.md) - Front matter planning and research ✅ COMPLETED
- [Fabric-Cheat-Sheet.md](Fabric-Cheat-Sheet.md) - User guide and reference
- [Fabric-Patterns-Reference.md](Fabric-Patterns-Reference.md) - Complete pattern catalog
- [Fabric-Prompting-Strategies.md](Fabric-Prompting-Strategies.md) - Strategy guide

---

**Last Review:** 2025-10-07
**Next Review:** Phase 2 planning (Pattern Search implementation)
**Current Branch:** `feature/roadmap-implementation`
**Latest Release:** v0.3.0 - Phase 1 Quick Wins (Production Ready)
