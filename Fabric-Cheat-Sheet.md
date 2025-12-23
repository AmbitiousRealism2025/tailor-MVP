# Fabric AI - Quick Reference Cheat Sheet

**Version:** 1.4.319 | **Model:** Claude Sonnet 4.5 (OpenRouter) | **Patterns:** 226

---

## ⚡ Quick Start

### Basic Usage Pattern
```bash
# Stream output to terminal
echo "text" | fabric --pattern PATTERN_NAME --stream

# Save to file
echo "text" | fabric --pattern PATTERN_NAME -o output.md

# With pattern alias (after sourcing .zshrc)
echo "text" | PATTERN_NAME              # Stream
echo "text" | PATTERN_NAME "title"      # Save to Obsidian
```

### YouTube Transcripts
```bash
yt URL                    # Get transcript + metadata
yt -t URL                 # With timestamps
```

### Web GUI Interface
```bash
# Start the web interface proxy server
node fabric-proxy.js

# Then open in browser: http://localhost:3000
# Or open the HTML file: fabric-web-gui.html
```

**Web GUI Features:**
- 📝 **Text Input Mode** - Process any text with 226+ patterns
- 🎥 **YouTube Mode** - Extract transcripts and process videos
- ⚡ **Live Processing** - Real-time AI responses with GLM-4.7
- 📋 **Copy Output** - Easy clipboard integration
- 🎨 **Beautiful UI** - Modern gradient interface

---

## 🎯 Essential Commands

### Setup & Configuration
```bash
fabric --setup            # Initial setup wizard
fabric --updatepatterns   # Update patterns
fabric --listpatterns     # Show all patterns
fabric --listmodels       # Show available models
fabric --version          # Check version
```

### Pattern Management
```bash
fabric -l                 # List patterns (short form)
fabric -n 10              # Show 10 newest patterns
fabric -p PATTERN         # Use specific pattern
```

### Model Control
```bash
fabric -m MODEL           # Use specific model
fabric -V VENDOR -m MODEL # Specify vendor + model
fabric -d                 # Change default model
```

---

## 🔥 Top 20 Most Useful Patterns

| Pattern | Purpose | Example |
|---------|---------|---------|
| **`summarize`** | General summaries | `cat article.txt \| summarize` |
| **`extract_wisdom`** | Key insights extraction | `cat book.txt \| extract_wisdom "book-notes"` |
| **`extract_ideas`** | Pull main ideas | `cat brainstorm.txt \| extract_ideas` |
| **`improve_writing`** | Enhance text quality | `cat draft.md \| improve_writing` |
| **`analyze_claims`** | Fact-check content | `cat article.txt \| analyze_claims` |
| **`create_summary`** | Detailed summaries | `cat report.pdf \| create_summary` |
| **`explain_code`** | Code explanation | `cat script.py \| explain_code` |
| **`review_code`** | Code review | `git diff \| review_code` |
| **`analyze_paper`** | Research paper analysis | `cat paper.pdf \| analyze_paper` |
| **`extract_insights`** | Deep insights | `cat content.txt \| extract_insights` |
| **`create_quiz`** | Generate quizzes | `cat chapter.txt \| create_quiz` |
| **`to_flashcards`** | Study cards | `cat notes.txt \| to_flashcards` |
| **`improve_prompt`** | Better AI prompts | `echo "prompt" \| improve_prompt` |
| **`compare_and_contrast`** | Comparisons | `cat two_items.txt \| compare_and_contrast` |
| **`clean_text`** | Text cleanup | `cat messy.txt \| clean_text` |
| **`translate`** | Translation | `cat text.txt \| translate` |
| **`humanize`** | Make AI text human | `cat ai_output.txt \| humanize` |
| **`extract_recipe`** | Recipe extraction | `cat blog.html \| extract_recipe` |
| **`rate_content`** | Quality rating | `cat article.txt \| rate_content` |
| **`create_tags`** | Auto-tagging | `cat content.txt \| create_tags` |

---

## 📂 Usage by Category

### 📚 Content Analysis
```bash
# Summarization
cat file.txt | summarize "summary-notes"
cat file.txt | create_5_sentence_summary
cat file.txt | summarize_micro

# Wisdom & Insights
cat file.txt | extract_wisdom "wisdom-notes"
cat file.txt | extract_insights
cat file.txt | extract_article_wisdom

# Claims & Facts
cat file.txt | analyze_claims
cat file.txt | find_logical_fallacies
cat file.txt | analyze_mistakes
```

### ✍️ Writing & Content Creation
```bash
# Improve Writing
cat draft.md | improve_writing "final-draft"
cat academic.md | improve_academic_writing
cat ai_text.txt | humanize

# Create Content
echo "topic" | write_essay "essay-draft"
echo "topic" | write_micro_essay
cat brief.txt | create_formal_email
```

### 💻 Code & Development
```bash
# Code Analysis
cat code.py | explain_code "code-explanation"
cat code.py | review_code
git diff | summarize_git_diff

# Code Creation
echo "feature description" | create_coding_feature
git diff | create_git_diff_commit
cat changes.txt | write_pull-request
```

### 🎓 Learning & Education
```bash
# Study Materials
cat lecture.txt | to_flashcards "lecture-cards"
cat chapter.txt | create_quiz "chapter-quiz"
cat topic.txt | create_reading_plan

# Explanations
cat concept.txt | explain_terms
cat math.txt | explain_math
cat project.txt | explain_project
```

### 🔍 Research & Analysis
```bash
# Papers & Research
cat paper.pdf | analyze_paper "paper-analysis"
cat paper.pdf | summarize_paper
cat paper.pdf | extract_references

# Business Analysis
cat feedback.csv | analyze_product_feedback
cat call.txt | analyze_sales_call
cat bill.txt | analyze_bill
```

### 🎬 Media & YouTube
```bash
# YouTube
yt https://youtube.com/watch?v=ID
yt -t https://youtube.com/watch?v=ID | summarize

# Extract from videos
yt URL | extract_wisdom "video-wisdom"
yt URL | extract_ideas "video-ideas"
yt URL | extract_sponsors
```

### 🛡️ Security & Technical
```bash
# Security Analysis
cat malware.bin | analyze_malware
cat incident.txt | analyze_incident
cat logs.txt | analyze_logs

# Create Security Rules
cat pattern.txt | create_sigma_rules
cat vuln.txt | write_nuclei_template_rule
cat threat.txt | create_stride_threat_model
```

### 📊 Visualization & Diagrams
```bash
# Create Visualizations
cat data.txt | create_mermaid_visualization
cat data.txt | create_graph_from_input
cat data.txt | create_markmap_visualization
cat flow.txt | create_excalidraw_visualization
```

---

## 🎨 Advanced Usage

### Chaining Patterns
```bash
# YouTube → Extract → Improve → Save
yt URL | extract_wisdom | improve_writing "polished-notes"

# Code Review → Summary → Save
git diff | review_code | summarize "code-review-summary"

# Article → Extract Ideas → Create Quiz
curl URL | extract_ideas | create_quiz "article-quiz"
```

### Using Variables
```bash
# Pattern with variables
fabric -p PATTERN -v="#role:expert" -v="#points:10"
```

### Input Methods
```bash
# Pipe input
echo "text" | fabric -p summarize

# File input
cat file.txt | fabric -p summarize

# URL input
curl https://example.com | fabric -p summarize

# Clipboard (macOS)
pbpaste | fabric -p summarize | pbcopy
```

### Output Options
```bash
# Stream to stdout
fabric -p summarize --stream < input.txt

# Save to file
fabric -p summarize -o output.md < input.txt

# Copy to clipboard
fabric -p summarize --copy < input.txt

# Obsidian (via alias)
cat input.txt | summarize "note-title"  # → YYYY-MM-DD-note-title.md
```

---

## 🔧 Configuration

### Environment Variables
```bash
# Set in ~/.config/fabric/.env
OPENROUTER_API_KEY=sk-or-v1-...
DEFAULT_VENDOR=OpenRouter
DEFAULT_MODEL=anthropic/claude-sonnet-4.5
```

### Pattern Aliases in .zshrc
```bash
# Obsidian base directory
obsidian_base="/path/to/vault"

# Pattern aliases automatically created for all patterns
# Usage: pattern_name "title" → saves to Obsidian
#        pattern_name          → streams to terminal
```

---

## 💡 Pro Tips

### 1. Quick Obsidian Notes
```bash
# Any pattern with a title saves to Obsidian with auto-date
echo "meeting notes" | summarize "weekly-standup"
# Creates: 2025-10-05-weekly-standup.md
```

### 2. Batch Processing
```bash
# Process multiple files
for file in *.txt; do
  cat "$file" | summarize "${file%.txt}-summary"
done
```

### 3. Web Content Analysis
```bash
# Analyze web articles
curl -s https://example.com/article | extract_wisdom "article-notes"
```

### 4. Git Workflow
```bash
# Review changes before commit
git diff | review_code

# Generate commit message
git diff --staged | create_git_diff_commit

# Summarize PR
git diff main...feature | summarize_git_diff | write_pull-request
```

### 5. Meeting Notes
```bash
# Record meeting, transcribe, then process
cat meeting_transcript.txt | summarize_meeting "2025-10-05-team-meeting"
```

### 6. Research Workflow
```bash
# Paper → Analysis → Summary → Flashcards
cat paper.pdf | analyze_paper > analysis.md
cat analysis.md | summarize_paper > summary.md
cat summary.md | to_flashcards "paper-flashcards"
```

### 7. Learning from Videos
```bash
# YouTube → Transcript → Wisdom → Quiz
yt URL > transcript.txt
cat transcript.txt | extract_wisdom "video-wisdom"
cat transcript.txt | create_quiz "video-quiz"
```

---

## 🎯 Common Workflows

### Content Creator Workflow
```bash
# 1. Get video transcript
yt VIDEO_URL > transcript.txt

# 2. Extract main ideas
cat transcript.txt | extract_ideas "video-ideas"

# 3. Create social media content
cat transcript.txt | tweet > tweets.txt

# 4. Create show notes
cat transcript.txt | create_show_intro "show-notes"
```

### Student Study Workflow
```bash
# 1. Summarize lecture
cat lecture.txt | summarize_lecture "lecture-summary"

# 2. Create flashcards
cat lecture.txt | to_flashcards "lecture-cards"

# 3. Generate quiz
cat lecture.txt | create_quiz "practice-quiz"

# 4. Create reading plan
cat syllabus.txt | create_reading_plan "study-plan"
```

### Developer Workflow
```bash
# 1. Review code changes
git diff | review_code "code-review"

# 2. Generate commit message
git diff --staged | create_git_diff_commit

# 3. Create PR description
git diff main...feature | write_pull-request

# 4. Summarize changes
git log --oneline -10 | summarize_git_changes
```

### Researcher Workflow
```bash
# 1. Analyze paper
cat paper.pdf | analyze_paper "paper-analysis"

# 2. Extract key ideas
cat paper.pdf | extract_book_ideas "paper-ideas"

# 3. Get references
cat paper.pdf | extract_references "citations"

# 4. Create summary
cat paper.pdf | summarize_paper "paper-summary"
```

### Content Analyst Workflow
```bash
# 1. Get content
curl -s URL > article.txt

# 2. Extract wisdom
cat article.txt | extract_wisdom "article-wisdom"

# 3. Fact-check claims
cat article.txt | analyze_claims "fact-check"

# 4. Rate quality
cat article.txt | rate_content "quality-rating"
```

---

## 🚨 Troubleshooting

### Pattern Not Found
```bash
# Update patterns
fabric --updatepatterns

# Verify pattern exists
fabric --listpatterns | grep PATTERN_NAME
```

### API Key Issues
```bash
# Check configuration
cat ~/.config/fabric/.env

# Verify API key is set
echo $OPENROUTER_API_KEY  # If using env vars
```

### Alias Not Working
```bash
# Reload shell config
source ~/.zshrc

# Check if function exists
type summarize
```

### Output Not Saving
```bash
# Check Obsidian path in .zshrc
echo $obsidian_base

# Verify directory exists
ls -la "/Users/ambrealismwork/Library/Mobile Documents/com~apple~CloudDocs/Cloud Vault"
```

---

## 📊 Pattern Categories Quick Reference

| Category | Count | Key Patterns |
|----------|-------|--------------|
| **Analysis** | 30+ | `analyze_claims`, `analyze_paper`, `analyze_code` |
| **Create** | 50+ | `create_summary`, `create_quiz`, `create_prd` |
| **Extract** | 35+ | `extract_wisdom`, `extract_ideas`, `extract_insights` |
| **Summarize** | 15+ | `summarize`, `summarize_meeting`, `summarize_paper` |
| **Improve** | 10+ | `improve_writing`, `improve_academic_writing` |
| **Code** | 15+ | `review_code`, `explain_code`, `create_coding_feature` |
| **Security** | 10+ | `analyze_malware`, `create_sigma_rules`, `analyze_threat_report` |
| **Visual** | 8+ | `create_mermaid_visualization`, `create_graph_from_input` |
| **Personal** | 25+ | `t_year_in_review`, `find_blindspots`, `provide_guidance` |

---

## 🔗 Quick Links

- **GitHub:** https://github.com/danielmiessler/fabric
- **Patterns:** `~/.config/fabric/patterns/`
- **Config:** `~/.config/fabric/.env`
- **Obsidian Vault:** `/Users/ambrealismwork/Library/Mobile Documents/com~apple~CloudDocs/Cloud Vault`
- **Full Pattern Reference:** See `Fabric-Patterns-Reference.md`

---

## ⌨️ Keyboard-Friendly Aliases

```bash
# Most commonly used patterns (set these as shell aliases for speed)
alias fw='fabric -p extract_wisdom'
alias fs='fabric -p summarize'
alias fc='fabric -p review_code'
alias fi='fabric -p extract_ideas'
alias fac='fabric -p analyze_claims'
alias frc='fabric -p rate_content'

# Usage
cat file.txt | fw --stream
cat file.txt | fs "summary"
```

---

## 🌐 Web GUI Interface Guide

### Starting the Web Interface

```bash
# 1. Start the proxy server (required)
cd /Users/ambrealismwork/Downloads/Fabric
node fabric-proxy.js

# 2. Open the web interface
open fabric-web-gui.html
# Or visit: http://localhost:3000 in your browser
```

### How to Use the Web GUI

#### **Text Mode (Default)**
1. Click **"📝 Text"** button (already selected by default)
2. Select a pattern from the dropdown (226 patterns available)
3. Enter or paste your text in the input box
4. Click **"🚀 Process with Fabric"**
5. View results in the output section
6. Click **"📋 Copy Output"** to copy to clipboard

#### **YouTube Mode**
1. Click **"🎥 YouTube URL"** button to switch modes
2. Select a pattern (recommended: `extract_wisdom`, `summarize`, `create_quiz`)
3. Paste any YouTube URL in the input field
4. **Optional:** Check "Include timestamps in transcript" for timestamped transcripts
5. Click **"🚀 Process with Fabric"**
6. Wait while it fetches the transcript (may take 10-30 seconds)
7. View AI-processed results

### Perfect Use Cases for YouTube Mode

#### 📚 **Educational Content**
```
Pattern: extract_wisdom
Use Case: Extract key insights from lectures, talks, or tutorials
Example: TED talks, university lectures, coding tutorials
```

#### 📝 **Quick Summaries**
```
Pattern: summarize
Use Case: Get quick summaries of long videos
Example: Podcasts, interviews, documentaries
```

#### 💡 **Idea Extraction**
```
Pattern: extract_ideas
Use Case: Capture main concepts and ideas
Example: Business presentations, startup pitches, brainstorming sessions
```

#### 🎓 **Study Materials**
```
Pattern: to_flashcards
Use Case: Create study cards from lecture videos
Example: Educational YouTube channels, course videos
```

```
Pattern: create_quiz
Use Case: Generate quizzes from tutorial content
Example: How-to videos, skill-building tutorials
```

#### 🔍 **Content Analysis**
```
Pattern: analyze_claims
Use Case: Fact-check video content
Example: News videos, documentaries, debates
```

```
Pattern: analyze_debate
Use Case: Understand different perspectives
Example: Political debates, panel discussions
```

#### 📖 **Learning Plans**
```
Pattern: create_reading_plan
Use Case: Create structured learning paths from video series
Example: Course playlists, educational series
```

#### 🎯 **Key Takeaways**
```
Pattern: extract_article_wisdom
Use Case: Get actionable takeaways from content
Example: Motivational talks, business advice videos
```

### Web GUI Tips & Tricks

**Quick Examples**
- Click any quick example card to auto-load pattern + content
- "🎥 YouTube Wisdom" example loads extract_wisdom with a sample video

**Switching Modes**
- Toggle buttons highlight the active mode (purple gradient)
- Each mode has its own input field
- Clear All resets both modes

**Processing Feedback**
- Green success message when complete
- Red error messages with helpful guidance
- Loading spinner shows processing status
- Real-time status in output area

**Performance Notes**
- Text processing: ~5-30 seconds (depending on length)
- YouTube processing: ~15-60 seconds (transcript fetch + AI processing)
- Longer videos take more time to fetch transcripts
- Results are streamed as they're generated

### Troubleshooting Web GUI

**"API not configured" error**
- Make sure `node fabric-proxy.js` is running
- Check terminal for proxy server status
- Verify it says "running on http://localhost:3000"

**YouTube transcript fails**
- Ensure video has captions/subtitles available
- Check that YouTube URL is valid
- Some videos may have transcript disabled by creator
- Try a different video to test

**Slow processing**
- Normal for longer content (>10K words)
- YouTube videos with auto-captions may be slower
- GLM-4.7 processes ~500-1000 tokens/sec
- Check proxy server logs for progress

**Server not responding**
- Restart proxy: `pkill -f fabric-proxy.js && node fabric-proxy.js`
- Check if port 3000 is available
- Look for error messages in terminal

---

**Last Updated:** 2025-10-05 | **Created with Fabric AI**

---

## 🎓 Learning Resources

### Start Here (Beginner)
1. Try `summarize` with a simple text file
2. Use `extract_wisdom` on an article
3. Create flashcards with `to_flashcards`
4. Analyze claims with `analyze_claims`

### Intermediate
1. Chain patterns together
2. Use YouTube transcript analysis
3. Set up Obsidian auto-save
4. Create custom aliases

### Advanced
1. Build automated workflows
2. Integrate with git hooks
3. Create custom patterns
4. Use pattern variables

---

**Print this cheat sheet or keep it in your Obsidian vault for quick reference!**
