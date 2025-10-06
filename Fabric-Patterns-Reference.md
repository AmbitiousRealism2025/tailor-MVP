# Fabric AI Patterns Reference

**Total Patterns:** 226
**Last Updated:** 2025-10-05
**Fabric Version:** 1.4.319
**Model:** Claude Sonnet 4.5 (via OpenRouter)

---

## 📚 How to Use This Guide

Each pattern can be used in two ways:

**Stream to terminal:**
```bash
cat input.txt | pattern_name
```

**Save to Obsidian vault:**
```bash
cat input.txt | pattern_name "note-title"
# Creates: YYYY-MM-DD-note-title.md
```

---

## 🎯 Most Popular Patterns

### Content Analysis & Extraction
- **`extract_wisdom`** - Extract key insights and wisdom from any content
- **`extract_ideas`** - Pull out the main ideas from text
- **`extract_insights`** - Deep insights extraction
- **`extract_article_wisdom`** - Specialized for articles
- **`summarize`** - Create comprehensive summaries
- **`create_summary`** - Detailed summary creation

### Writing & Improvement
- **`improve_writing`** - Enhance writing quality
- **`improve_academic_writing`** - Academic writing improvement
- **`improve_prompt`** - Better AI prompts
- **`write_essay`** - Essay creation
- **`write_micro_essay`** - Short-form essays

### Analysis & Review
- **`analyze_claims`** - Fact-check and verify claims
- **`analyze_paper`** - Research paper analysis
- **`rate_content`** - Rate content quality
- **`review_code`** - Code review assistance

---

## 📋 Complete Pattern Index

### 🔍 Analysis Patterns

#### General Analysis
- **`analyze_answers`** - Analyze answers from a PhD expert perspective
- **`analyze_claims`** - Objective analysis of truth claims and arguments
- **`analyze_comments`** - Analyze internet comments for sentiment and criticism
- **`analyze_debate`** - Neutral debate analysis to broaden perspectives
- **`analyze_mistakes`** - Identify thinking patterns and potential mistakes
- **`analyze_personality`** - Psychological analysis of personality
- **`analyze_presentation`** - Review and critique presentations
- **`analyze_prose`** - Evaluate writing quality with ratings
- **`analyze_prose_json`** - Prose analysis in JSON format
- **`analyze_prose_pinker`** - Prose analysis using Pinker's principles
- **`analyze_risk`** - Risk assessment and analysis
- **`analyze_spiritual_text`** - Deep analysis of spiritual content
- **`analyze_tech_impact`** - Technology impact analysis

#### Technical Analysis
- **`analyze_email_headers`** - Email header forensics and security analysis
- **`analyze_incident`** - Security incident analysis
- **`analyze_logs`** - System log analysis for reliability engineering
- **`analyze_malware`** - Malware analysis for multiple platforms
- **`analyze_terraform_plan`** - Terraform infrastructure plan review
- **`analyze_threat_report`** - Cybersecurity threat report analysis
- **`analyze_threat_report_cmds`** - Extract commands from threat reports
- **`analyze_threat_report_trends`** - Identify trends in threat reports

#### Business & Politics
- **`analyze_bill`** - Analyze legislation and legal documents
- **`analyze_bill_short`** - Brief legislative analysis
- **`analyze_candidates`** - Compare political candidates
- **`analyze_cfp_submission`** - Review conference talk submissions
- **`analyze_interviewer_techniques`** - Study interviewer question techniques
- **`analyze_military_strategy`** - Historical battle strategy analysis
- **`analyze_paper`** - Research paper scientific rigor review
- **`analyze_paper_simple`** - Simplified research paper analysis
- **`analyze_patent`** - Patent examination and analysis
- **`analyze_product_feedback`** - User feedback analysis and prioritization
- **`analyze_proposition`** - Ballot proposition analysis
- **`analyze_sales_call`** - Sales call effectiveness review

---

### 📝 Create & Generate Patterns

#### Documentation & Reports
- **`create_academic_paper`** - Generate academic papers
- **`create_design_document`** - Technical design documentation
- **`create_keynote`** - Keynote presentation creation
- **`create_loe_document`** - Level of Effort documentation
- **`create_prd`** - Product Requirements Document
- **`create_report_finding`** - Report findings documentation
- **`create_security_update`** - Security update announcements

#### Summaries & Briefs
- **`create_5_sentence_summary`** - Concise 5-sentence summaries
- **`create_cyber_summary`** - Cybersecurity summaries
- **`create_micro_summary`** - Ultra-brief summaries
- **`create_summary`** - Comprehensive summaries

#### Development & Code
- **`create_coding_feature`** - Feature specification creation
- **`create_coding_project`** - Coding project setup
- **`create_command`** - CLI command generation
- **`create_git_diff_commit`** - Git commit message from diff
- **`create_pattern`** - Create new Fabric patterns
- **`create_sigma_rules`** - Security detection rules (Sigma)
- **`create_nuclei_template_rule`** - Nuclei vulnerability templates
- **`create_semgrep_rule`** - Semgrep code analysis rules

#### Agile & Project Management
- **`agility_story`** - Agile user stories with acceptance criteria
- **`create_stride_threat_model`** - STRIDE threat modeling
- **`create_threat_scenarios`** - Security threat scenarios
- **`create_user_story`** - User story creation

#### Visual & Creative
- **`create_art_prompt`** - AI art generation prompts
- **`create_excalidraw_visualization`** - Excalidraw diagrams
- **`create_graph_from_input`** - Graph visualizations
- **`create_investigation_visualization`** - Investigation flow charts
- **`create_logo`** - Logo concept creation
- **`create_mermaid_visualization`** - Mermaid.js diagrams
- **`create_mermaid_visualization_for_github`** - GitHub-compatible Mermaid
- **`create_markmap_visualization`** - Mindmap visualizations
- **`create_visualization`** - General data visualization
- **`create_ttrc_graph`** - Time-to-resolution graphs
- **`create_network_threat_landscape`** - Network threat maps

#### Learning & Education
- **`create_flash_cards`** - Study flashcards
- **`create_quiz`** - Quiz generation
- **`create_reading_plan`** - Structured reading plans
- **`create_mnemonic_phrases`** - Memory aid creation
- **`to_flashcards`** - Convert content to flashcards

#### Business & Marketing
- **`create_ai_jobs_analysis`** - AI job market analysis
- **`create_hormozi_offer`** - Alex Hormozi-style offers
- **`create_newsletter_entry`** - Newsletter content
- **`create_show_intro`** - Podcast/show introductions
- **`create_upgrade_pack`** - Product upgrade packages

#### Writing & Content
- **`create_aphorisms`** - Generate wisdom aphorisms
- **`create_better_frame`** - Reframe perspectives
- **`create_diy`** - DIY instructions
- **`create_formal_email`** - Professional email drafting
- **`create_idea_compass`** - Idea exploration framework
- **`create_npc`** - RPG character creation
- **`create_prediction_block`** - Future predictions
- **`create_recursive_outline`** - Nested content outlines
- **`create_rpg_summary`** - RPG session summaries
- **`create_story_about_people_interaction`** - Interaction narratives
- **`create_story_about_person`** - Personal narratives
- **`create_story_explanation`** - Explanatory stories
- **`create_tags`** - Content tagging
- **`create_video_chapters`** - Video chapter markers

---

### 🎯 Extract Patterns

#### Insights & Wisdom
- **`extract_wisdom`** - Primary wisdom extraction pattern
- **`extract_wisdom_agents`** - Agent-focused wisdom
- **`extract_wisdom_dm`** - Daniel Miessler-style extraction
- **`extract_wisdom_nometa`** - Wisdom without metadata
- **`extract_article_wisdom`** - Article-specific wisdom
- **`extract_insights`** - Deep insight extraction
- **`extract_insights_dm`** - DM-style insights
- **`extract_alpha`** - Investment/competitive insights
- **`extract_core_message`** - Central message extraction

#### Ideas & Concepts
- **`extract_ideas`** - Main ideas from content
- **`extract_book_ideas`** - Book concept extraction
- **`extract_business_ideas`** - Business opportunities
- **`extract_controversial_ideas`** - Controversial viewpoints
- **`extract_extraordinary_claims`** - Extraordinary assertions
- **`extract_patterns`** - Pattern identification
- **`extract_predictions`** - Future predictions
- **`extract_main_idea`** - Single core idea

#### Practical Information
- **`extract_algorithm_update_recommendations`** - SEO algorithm updates
- **`extract_book_recommendations`** - Book suggestions
- **`extract_instructions`** - Step-by-step instructions
- **`extract_product_features`** - Product feature lists
- **`extract_questions`** - Question extraction
- **`extract_recommendations`** - General recommendations
- **`extract_recipe`** - Recipe extraction
- **`extract_references`** - Citations and references
- **`extract_skills`** - Skill identification
- **`extract_sponsors`** - Sponsor information

#### Technical Extraction
- **`extract_ctf_writeup`** - CTF challenge solutions
- **`extract_domains`** - Domain name extraction
- **`extract_mcp_servers`** - MCP server information
- **`extract_poc`** - Proof of concept code
- **`extract_videoid`** - YouTube video IDs

#### Content Analysis
- **`extract_jokes`** - Humor extraction
- **`extract_latest_video`** - Latest video information
- **`extract_main_activities`** - Activity identification
- **`extract_most_redeeming_thing`** - Positive highlights
- **`extract_primary_problem`** - Core problem identification
- **`extract_primary_solution`** - Main solution extraction
- **`extract_song_meaning`** - Song lyric interpretation

---

### 📊 Summarize Patterns

- **`summarize`** - General-purpose summarization
- **`summarize_board_meeting`** - Board meeting minutes
- **`summarize_debate`** - Debate summaries
- **`summarize_git_changes`** - Git commit history
- **`summarize_git_diff`** - Git diff summaries
- **`summarize_lecture`** - Academic lecture notes
- **`summarize_legislation`** - Legal document summaries
- **`summarize_meeting`** - Meeting summaries
- **`summarize_micro`** - Ultra-brief summaries
- **`summarize_newsletter`** - Newsletter digests
- **`summarize_paper`** - Research paper summaries
- **`summarize_prompt`** - AI prompt summaries
- **`summarize_pull-requests`** - GitHub PR summaries
- **`summarize_rpg_session`** - RPG session recaps
- **`youtube_summary`** - YouTube video summaries

---

### ✍️ Writing & Improvement Patterns

#### Writing Improvement
- **`improve_writing`** - General writing enhancement
- **`improve_academic_writing`** - Academic writing polish
- **`improve_prompt`** - AI prompt optimization
- **`improve_report_finding`** - Report finding refinement
- **`humanize`** - Make AI text more human

#### Writing Generation
- **`write_essay`** - Essay creation
- **`write_essay_pg`** - Paul Graham-style essays
- **`write_hackerone_report`** - Bug bounty reports
- **`write_latex`** - LaTeX document writing
- **`write_micro_essay`** - Short-form essays
- **`write_nuclei_template_rule`** - Nuclei templates
- **`write_pull-request`** - GitHub PR descriptions
- **`write_semgrep_rule`** - Semgrep rules

---

### 🔧 Technical & Development Patterns

#### Code & Development
- **`coding_master`** - Advanced coding assistance
- **`explain_code`** - Code explanation
- **`explain_docs`** - Documentation explanation
- **`explain_project`** - Project structure explanation
- **`review_code`** - Code review
- **`review_design`** - Design review
- **`generate_code_rules`** - Coding standards generation

#### Security & Cybersecurity
- **`ask_secure_by_design_questions`** - Security design questions
- **`create_sigma_rules`** - SIEM detection rules
- **`create_stride_threat_model`** - Threat modeling
- **`create_threat_scenarios`** - Attack scenarios
- **`write_hackerone_report`** - Vulnerability reports
- **`write_nuclei_template_rule`** - Nuclei scanning templates
- **`write_semgrep_rule`** - Static analysis rules

---

### 🎓 Learning & Education Patterns

- **`ai`** - Insightful question answering
- **`compare_and_contrast`** - Comparison analysis
- **`dialog_with_socrates`** - Socratic dialogue
- **`explain_code`** - Code explanation
- **`explain_docs`** - Documentation explanation
- **`explain_math`** - Math concept explanation
- **`explain_project`** - Project explanation
- **`explain_terms`** - Term definitions
- **`to_flashcards`** - Flashcard conversion
- **`transcribe_minutes`** - Meeting transcription

---

### 🎨 Creative & Entertainment Patterns

- **`create_aphorisms`** - Wisdom sayings
- **`create_art_prompt`** - AI art prompts
- **`create_logo`** - Logo concepts
- **`create_npc`** - RPG characters
- **`create_story_about_people_interaction`** - Interaction stories
- **`create_story_about_person`** - Personal stories
- **`create_story_explanation`** - Story-based explanations
- **`extract_jokes`** - Humor extraction
- **`extract_song_meaning`** - Song analysis
- **`tweet`** - Twitter/X post creation

---

### 🛠️ Utility & Conversion Patterns

#### Format Conversion
- **`clean_text`** - Text cleanup
- **`convert_to_markdown`** - Markdown conversion
- **`export_data_as_csv`** - CSV export
- **`md_callout`** - Markdown callout boxes
- **`sanitize_broken_html_to_markdown`** - HTML to Markdown cleanup
- **`translate`** - Language translation

#### Content Enhancement
- **`apply_ul_tags`** - Add unordered lists
- **`check_agreement`** - Agreement verification
- **`enrich_blog_post`** - Blog post enhancement
- **`label_and_rate`** - Labeling and rating

#### Quality & Rating
- **`get_wow_per_minute`** - Content value rating
- **`judge_output`** - Output quality judgment
- **`rate_ai_response`** - AI response rating
- **`rate_ai_result`** - AI result assessment
- **`rate_content`** - Content quality rating
- **`rate_value`** - Value assessment

---

### 💼 Business & Strategy Patterns

- **`analyze_candidates`** - Political candidate comparison
- **`analyze_product_feedback`** - User feedback analysis
- **`analyze_sales_call`** - Sales effectiveness review
- **`create_ai_jobs_analysis`** - AI job market analysis
- **`create_hormozi_offer`** - Marketing offer creation
- **`prepare_7s_strategy`** - McKinsey 7S framework
- **`recommend_pipeline_upgrades`** - CI/CD improvements
- **`recommend_talkpanel_topics`** - Panel discussion topics

---

### 🎬 Media & YouTube Patterns

- **`extract_latest_video`** - Latest video info
- **`extract_sponsors`** - Sponsor extraction
- **`extract_videoid`** - Video ID extraction
- **`get_youtube_rss`** - YouTube RSS feeds
- **`youtube_summary`** - Video summaries
- **`yt()`** - YouTube transcript helper (function in .zshrc)

---

### 🧠 Personal Development Patterns

#### Self-Improvement
- **`find_female_life_partner`** - Relationship guidance
- **`find_hidden_message`** - Discover hidden meanings
- **`find_logical_fallacies`** - Logic error identification
- **`heal_person`** - Healing guidance
- **`provide_guidance`** - General life guidance

#### Thinking & Strategy (t_ prefix)
- **`t_analyze_challenge_handling`** - Challenge analysis
- **`t_check_dunning_kruger`** - Competence self-assessment
- **`t_check_metrics`** - Personal metrics review
- **`t_create_h3_career`** - Career planning
- **`t_create_opening_sentences`** - Communication starters
- **`t_describe_life_outlook`** - Life perspective
- **`t_extract_intro_sentences`** - Introduction extraction
- **`t_extract_panel_topics`** - Panel discussion topics
- **`t_find_blindspots`** - Blind spot identification
- **`t_find_negative_thinking`** - Negative pattern detection
- **`t_find_neglected_goals`** - Goal tracking
- **`t_give_encouragement`** - Motivational support
- **`t_red_team_thinking`** - Critical thinking
- **`t_threat_model_plans`** - Personal threat modeling
- **`t_visualize_mission_goals_projects`** - Goal visualization
- **`t_year_in_review`** - Annual reflection

---

### 🎯 Specialized Patterns

#### DSRP Framework (Systems Thinking)
- **`identify_dsrp_distinctions`** - Identify distinctions
- **`identify_dsrp_perspectives`** - Multiple perspectives
- **`identify_dsrp_relationships`** - Relationship mapping
- **`identify_dsrp_systems`** - System identification

#### Recommendations
- **`recommend_artists`** - Artist recommendations
- **`recommend_pipeline_upgrades`** - DevOps improvements
- **`recommend_talkpanel_topics`** - Discussion topics
- **`suggest_pattern`** - Fabric pattern suggestions

#### Interview & Questions
- **`answer_interview_question`** - Interview prep
- **`ask_secure_by_design_questions`** - Security questions
- **`ask_uncle_duke`** - Unconventional advice

#### Misc Specialized
- **`capture_thinkers_work`** - Thought leader analysis
- **`identify_job_stories`** - Job-to-be-done stories
- **`official_pattern_template`** - Pattern creation template
- **`raw_query`** - Direct LLM query
- **`refine_design_document`** - Design doc refinement

---

## 🚀 Quick Start Examples

### Extract wisdom from a blog post
```bash
curl https://example.com/article | extract_wisdom "article-wisdom"
```

### Summarize a research paper
```bash
cat paper.pdf | summarize_paper "research-summary"
```

### Analyze code quality
```bash
cat my_code.py | review_code "code-review"
```

### Create flashcards from notes
```bash
cat lecture_notes.txt | to_flashcards "lecture-cards"
```

### YouTube video summary
```bash
yt https://youtube.com/watch?v=abc123 | summarize "video-notes"
```

### Improve your writing
```bash
cat draft.md | improve_writing "final-draft"
```

---

## 📌 Pattern Categories Summary

| Category | Count | Examples |
|----------|-------|----------|
| **Analysis** | 30+ | `analyze_claims`, `analyze_paper`, `analyze_logs` |
| **Create** | 50+ | `create_summary`, `create_prd`, `create_visualization` |
| **Extract** | 35+ | `extract_wisdom`, `extract_ideas`, `extract_insights` |
| **Summarize** | 15+ | `summarize`, `summarize_meeting`, `summarize_paper` |
| **Writing** | 10+ | `improve_writing`, `write_essay`, `humanize` |
| **Technical** | 20+ | `review_code`, `explain_code`, `create_sigma_rules` |
| **Personal** | 25+ | `t_year_in_review`, `find_blindspots`, `provide_guidance` |
| **Media** | 6+ | `youtube_summary`, `extract_sponsors`, `yt()` |
| **Business** | 10+ | `analyze_sales_call`, `create_hormozi_offer` |
| **Utility** | 15+ | `convert_to_markdown`, `clean_text`, `translate` |

---

## 💡 Pro Tips

1. **Chain patterns together:**
   ```bash
   yt https://youtube.com/watch?v=abc | extract_wisdom | improve_writing "final"
   ```

2. **Use pattern aliases** (after reloading shell):
   ```bash
   source ~/.zshrc
   # Now use: summarize, extract_wisdom, etc. directly
   ```

3. **Save everything to Obsidian** by adding a title argument:
   ```bash
   echo "content" | pattern_name "title"
   ```

4. **Stream output** by omitting the title:
   ```bash
   echo "content" | pattern_name
   ```

5. **List all patterns anytime:**
   ```bash
   fabric --listpatterns
   ```

---

**Generated by Fabric AI** | [Documentation](https://github.com/danielmiessler/fabric)
