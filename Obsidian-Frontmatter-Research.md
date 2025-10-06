# Obsidian Frontmatter Research

## Purpose
Design standardized front matter (YAML metadata) for Fabric AI outputs saved to Obsidian vault to optimize for embedding, searching, and organization.

## Current Brainstorming Session (2025-10-05)

### Proposed Front Matter Structure

```yaml
---
title: "User-provided title"
created: 2025-10-05
pattern: "extract_wisdom"
source: "youtube" | "text" | "upload"
source_url: "https://youtube.com/..." (if applicable)
source_file: "document.pdf" (if upload)
tags: [fabric, ai-processed]
type: fabric-output
---
```

### Open Questions

#### 1. Required vs Optional Fields
- **Required:**
  - `title` - User-provided via popup
  - `created` - Auto-generated timestamp
  - `pattern` - Pattern used for processing
  - `source` - Input type (youtube/text/upload)

- **Optional/Conditional:**
  - `source_url` - If YouTube video
  - `source_file` - If uploaded document
  - `tags` - User-provided or auto-generated?
  - `notes` - Personal context field?

#### 2. Tagging Strategy
**Options to explore:**
- Auto-tag with pattern name? (`#extract_wisdom`, `#summarize`, etc.)
- Auto-tag with source type? (`#youtube`, `#upload`, `#text-input`)
- Auto-tag category? (`#ai-processing`, `#fabric-output`)
- Allow custom tags in save popup?
- Combination approach?

**Example auto-tagging:**
```yaml
tags: [fabric, extract_wisdom, youtube, ai-analysis]
```

#### 3. Save Popup Design
**Simple approach:**
- Title field (required)
- Auto-generate everything else

**Advanced approach:**
- Title field (required)
- Custom tags field (optional, comma-separated)
- Notes field (optional, for context)
- Preview of generated front matter before saving

**Recommendation:** Start simple, add complexity if needed

#### 4. Additional Metadata Considerations
- `processed_at` - Timestamp of when Fabric processed it
- `model` - AI model used (e.g., "z-ai/glm-4.6")
- `chained_from` - If result of pattern chaining
- `chain_sequence` - Track pattern chain order
- `word_count` - Useful for long-form content
- `aliases` - Alternative titles for linking

### Implementation Plan (To Do)

1. **Backend (fabric-proxy.js):**
   - Add `/save` endpoint
   - Accept: title, content, pattern, source, sourceUrl/sourceFile, customTags
   - Generate front matter YAML
   - Write to Obsidian vault with YYYY-MM-DD-title.md format
   - Return success/error status

2. **Frontend (fabric-web-gui.html):**
   - Add "💾 Save to Obsidian" button (appears after processing)
   - Create modal popup for save dialog
   - Capture metadata (title, tags, notes)
   - Preview front matter before saving
   - Call `/save` endpoint
   - Show success confirmation

3. **Front Matter Template:**
```yaml
---
title: {{user_title}}
created: {{YYYY-MM-DD}}
processed_at: {{timestamp}}
pattern: {{pattern_name}}
source: {{youtube|text|upload}}
{{#if source_url}}source_url: {{source_url}}{{/if}}
{{#if source_file}}source_file: {{source_file}}{{/if}}
tags: [fabric, {{pattern_name}}, {{source_type}}, {{custom_tags}}]
type: fabric-output
{{#if chained_from}}chained_from: {{previous_pattern}}{{/if}}
---
```

### Obsidian Embedding Optimization

**Best practices for Obsidian front matter:**
- Use lowercase keys (Dataview compatibility)
- Use arrays for multi-value fields: `[tag1, tag2]`
- Date format: YYYY-MM-DD for Dataview queries
- Avoid special characters in keys
- Keep structure consistent across all Fabric outputs

**Dataview query examples:**
```dataview
TABLE pattern, source, created
FROM #fabric
WHERE type = "fabric-output"
SORT created DESC
```

```dataview
LIST
FROM #extract_wisdom
WHERE source = "youtube"
```

### Research Resources
- [Obsidian YAML Front Matter Docs](https://help.obsidian.md/Editing+and+formatting/Properties)
- [Dataview Plugin Documentation](https://blacksmithgu.github.io/obsidian-dataview/)
- Best practices for metadata schemas in PKM systems

### Next Steps
- [ ] Finalize front matter field structure
- [ ] Decide on tagging strategy (auto vs manual vs hybrid)
- [ ] Design save popup UI/UX
- [ ] Implement backend `/save` endpoint
- [ ] Implement frontend save button and modal
- [ ] Test with various Fabric patterns
- [ ] Create Dataview queries for common searches
- [ ] Document workflow in Fabric-Cheat-Sheet.md

---

**Last Updated:** 2025-10-05
**Status:** Planning / Brainstorming
