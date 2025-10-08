#!/usr/bin/env node

/**
 * Fabric Web Proxy Server
 * This creates a simple HTTP server that proxies requests to the Fabric CLI
 * because the built-in Fabric REST API has issues with the /chat endpoint
 */

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PATTERNS_DIR = path.join(process.env.HOME, '.config/fabric/patterns');
const OBSIDIAN_VAULT = '/Volumes/Ambitious Realism TB5 2TB/Ambitious Realism';

// Cache for pattern details
let patternDetailsCache = null;
let patternsCacheTimestamp = null;
const CACHE_TTL = 300000; // 5 minutes

// Enable CORS
function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Get list of patterns
function getPatterns() {
    try {
        return fs.readdirSync(PATTERNS_DIR).filter(file => {
            return fs.statSync(path.join(PATTERNS_DIR, file)).isDirectory();
        });
    } catch (error) {
        return [];
    }
}

// Get pattern details (name + description) - async with caching
async function getPatternDetails() {
    // Return cached data if still valid
    const now = Date.now();
    if (patternDetailsCache && patternsCacheTimestamp && (now - patternsCacheTimestamp < CACHE_TTL)) {
        return patternDetailsCache;
    }

    const patterns = getPatterns();
    const promises = patterns.map(async (pattern) => {
        const systemFile = path.join(PATTERNS_DIR, pattern, 'system.md');
        let description = '';

        try {
            const content = await fs.promises.readFile(systemFile, 'utf8');
            // Extract first sentence from IDENTITY and PURPOSE section
            const match = content.match(/# IDENTITY and PURPOSE\s+([^\n]+)/i);
            if (match) {
                description = match[1].trim();
                // Limit length for dropdown display
                if (description.length > 100) {
                    description = description.substring(0, 97) + '...';
                }
            }
        } catch (error) {
            // If no system.md or can't read, just use pattern name
            description = '';
        }

        return {
            name: pattern,
            description: description
        };
    });

    const result = await Promise.all(promises);

    // Update cache
    patternDetailsCache = result;
    patternsCacheTimestamp = now;

    return result;
}

// Process text with Fabric CLI
function processFabric(pattern, input, strategy, callback, variables = {}) {
    // Build arguments for fabric command
    const args = ['-p', pattern, '--stream'];

    // Add variables if provided
    for (const [key, value] of Object.entries(variables)) {
        args.push('-v', `#${key}=${value}`);
    }

    // Note: Strategy support requires running 'fabric --setup' to download strategies
    // For now, strategies are not used even if provided
    // TODO: Add strategy support when strategies are configured

    console.log(`DEBUG: Starting Fabric with pattern: ${pattern}, input length: ${input.length}`);
    console.log(`DEBUG: Variables: ${JSON.stringify(variables)}`);
    
    const fabric = spawn('fabric', args, {
        env: process.env
    });

    let output = '';
    let error = '';

    fabric.stdout.on('data', (data) => {
        const chunk = data.toString();
        output += chunk;
        console.log(`DEBUG: Fabric stdout chunk (${chunk.length} chars)`);
    });

    fabric.stderr.on('data', (data) => {
        const chunk = data.toString();
        error += chunk;
        console.log(`DEBUG: Fabric stderr: ${chunk}`);
    });

    fabric.on('close', (code) => {
        console.log(`DEBUG: Fabric exited with code: ${code}`);
        console.log(`DEBUG: Total output length: ${output.length}`);
        console.log(`DEBUG: Total error length: ${error.length}`);
        
        if (code !== 0) {
            console.error(`DEBUG: Fabric failed. Error: ${error || 'No error message'}`);
            callback(new Error(error || `Fabric exited with code ${code}`), null);
        } else {
            console.log(`DEBUG: Fabric succeeded`);
            callback(null, output);
        }
    });

    fabric.on('error', (err) => {
        console.error(`DEBUG: Fabric process error: ${err.message}`);
        callback(new Error(`Failed to start Fabric: ${err.message}`), null);
    });

    // Send input to fabric
    console.log(`DEBUG: Sending input to Fabric...`);
    fabric.stdin.write(input);
    fabric.stdin.end();
}

// Extract metadata from content using AI
function extractMetadata(content, callback) {
    const metadataPrompt = `Analyze the following content and extract comprehensive metadata for optimal semantic search and embedding. Return ONLY valid JSON with this exact structure:

{
  "summary": "1-2 sentence embedding-optimized summary capturing the essence",
  "keywords": ["keyword1", "keyword2", "keyword3", ...],
  "category": "single category (e.g., Technical, Research, Business, Creative, Educational)",
  "domain_tags": ["domain1", "domain2", ...],
  "topic_tags": ["topic1", "topic2", ...],
  "entities": {
    "people": ["Person Name", ...],
    "orgs": ["Organization", ...],
    "products": ["Product/Tool", ...]
  }
}

Guidelines:
- summary: Front-load important concepts, natural language
- keywords: 8-15 terms for semantic search, include synonyms
- category: High-level classification
- domain_tags: Knowledge domains (e.g., ai, software-engineering, video-production)
- topic_tags: Specific topics (e.g., prompt-engineering, parallel-execution)
- entities: Extract mentioned people, organizations, and products/tools

Content to analyze:
${content}`;

    const fabric = spawn('fabric', ['--stream'], {
        env: process.env
    });

    let output = '';
    let error = '';

    fabric.stdout.on('data', (data) => {
        output += data.toString();
    });

    fabric.stderr.on('data', (data) => {
        error += data.toString();
    });

    fabric.on('close', (code) => {
        if (code !== 0) {
            callback(new Error(error || `Metadata extraction failed with code ${code}`), null);
        } else {
            try {
                // Try to parse JSON from output
                const jsonMatch = output.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const metadata = JSON.parse(jsonMatch[0]);
                    callback(null, metadata);
                } else {
                    callback(new Error('No valid JSON found in response'), null);
                }
            } catch (parseError) {
                callback(new Error(`Failed to parse metadata JSON: ${parseError.message}`), null);
            }
        }
    });

    // Send prompt to fabric
    fabric.stdin.write(metadataPrompt);
    fabric.stdin.end();
}

// Parse VTT subtitle file to extract text
function parseVTT(vttContent) {
    const lines = vttContent.split('\n');
    let transcript = '';
    let lastText = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip WEBVTT header, timestamps, empty lines, and position data
        if (line.startsWith('WEBVTT') ||
            line.match(/^\d{2}:\d{2}:\d{2}/) ||
            line.match(/-->/) ||
            line === '' ||
            line.startsWith('Kind:') ||
            line.startsWith('Language:') ||
            line.startsWith('align:') ||
            line.startsWith('position:')) {
            continue;
        }

        // Skip lines that are just timestamps or metadata
        if (line.match(/^[\d\s]+$/) || line.match(/^\[Music\]$/)) {
            continue;
        }

        // Clean up the text (remove timestamps embedded in text and HTML tags)
        let cleanText = line.replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, '')
                           .replace(/<c[^>]*>/g, '')
                           .replace(/<\/c>/g, '')
                           .replace(/<[^>]*>/g, '') // Remove any other HTML tags
                           .trim();

        // Skip empty lines after cleaning
        if (!cleanText) {
            continue;
        }

        // Add text if it's not a duplicate
        if (cleanText !== lastText) {
            transcript += cleanText + ' ';
            lastText = cleanText;
        }
    }

    // Clean up extra spaces and return
    return transcript.replace(/\s+/g, ' ').trim();
}

// Process YouTube video with yt-dlp directly
function processYouTube(pattern, youtubeUrl, includeTimestamps, strategy, callback) {
    console.log(`Fetching YouTube transcript with yt-dlp: ${youtubeUrl}`);

    // Extract video ID from URL
    const videoIdMatch = youtubeUrl.match(/(?:v=|\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (!videoIdMatch) {
        callback(new Error('Invalid YouTube URL'), null);
        return;
    }
    const videoId = videoIdMatch[1];

    // Use yt-dlp to download subtitles in VTT format
    const ytdlpSubArgs = ['--skip-download', '--write-auto-subs', '--sub-lang', 'en', '--sub-format', 'vtt', '--output', `/tmp/yt-${videoId}`, youtubeUrl];

    console.log(`Running: yt-dlp ${ytdlpSubArgs.join(' ')}`);

    const ytProcess = spawn('yt-dlp', ytdlpSubArgs, {
        env: process.env
    });

    let output = '';
    let error = '';

    ytProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    ytProcess.stderr.on('data', (data) => {
        error += data.toString();
    });

    ytProcess.on('close', (code) => {
        const subtitleFile = `/tmp/yt-${videoId}.en.vtt`;

        // Try to read the subtitle file
        const fs = require('fs');
        fs.readFile(subtitleFile, 'utf8', (err, vttContent) => {
            // Clean up the file
            fs.unlink(subtitleFile, () => {});

            if (err) {
                callback(new Error(`Failed to fetch YouTube transcript: ${err.message}. Make sure the video has captions available.`), null);
                return;
            }

            // Parse VTT to extract clean text
            const transcript = parseVTT(vttContent);

            if (!transcript) {
                callback(new Error('No transcript text found in subtitles'), null);
                return;
            }

            console.log(`Transcript fetched (${transcript.length} chars), processing with pattern: ${pattern}`);

            // Now process the transcript with the pattern
            // Check if this pattern needs variables
            let variables = {};
            if (pattern === 'write_essay') {
                variables.author_name = 'George Orwell'; // Default author
            }
            
            processFabric(pattern, transcript, strategy, callback, variables);
        });
    });
}

// Create HTTP server
const server = http.createServer((req, res) => {
    setCORSHeaders(res);

    // Handle OPTIONS for CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Get patterns list
    if (req.method === 'GET' && req.url === '/patterns/names') {
        const patterns = getPatterns();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(patterns));
        return;
    }

    // Get patterns with descriptions
    if (req.method === 'GET' && req.url === '/patterns/details') {
        getPatternDetails()
            .then(patternDetails => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(patternDetails));
            })
            .catch(error => {
                console.error('Error loading pattern details:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading patterns');
            });
        return;
    }

    // Process chat request
    if (req.method === 'POST' && req.url === '/chat') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { message, pattern, strategy, isYouTube, includeTimestamps } = data;

                if (!pattern || !message) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Missing pattern or message');
                    return;
                }

                if (isYouTube) {
                    console.log(`YouTube request: pattern=${pattern}, url=${message}, strategy=${strategy || 'auto'}, timestamps=${includeTimestamps}`);

                    processYouTube(pattern, message, includeTimestamps || false, strategy, (error, output) => {
                        if (error) {
                            console.error('Error:', error.message);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end(`Error: ${error.message}`);
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end(output);
                        }
                    });
                } else {
                    console.log(`Text request: pattern=${pattern}, strategy=${strategy || 'auto'}, message length=${message.length}`);

                    // Check if this pattern needs variables
                    let variables = {};
                    if (pattern === 'write_essay') {
                        variables.author_name = 'George Orwell'; // Default author
                    }
                    
                    processFabric(pattern, message, strategy, (error, output) => {
                        if (error) {
                            console.error('Error:', error.message);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end(`Error: ${error.message}`);
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end(output);
                        }
                    });
                }

            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
        return;
    }

    // Save to Obsidian
    if (req.method === 'POST' && req.url === '/save') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { title, content, pattern, sourceType, sourceUrl, sourceFile, customTags, strategy, chainedFrom } = data;

                if (!title || !content || !pattern || !sourceType) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Missing required fields: title, content, pattern, sourceType');
                    return;
                }

                console.log('🔍 Extracting metadata from content...');

                // Extract AI-generated metadata from content
                extractMetadata(content, (err, aiMetadata) => {
                    if (err) {
                        console.error('Metadata extraction error:', err);
                        // Continue with basic metadata if AI extraction fails
                        aiMetadata = {
                            summary: title,
                            keywords: [pattern.replace(/_/g, ' ')],
                            category: 'AI-Processing',
                            domain_tags: [],
                            topic_tags: [],
                            entities: { people: [], orgs: [], products: [] }
                        };
                    }

                    // Generate filename: title.md (no date prefix)
                    const now = new Date();
                    const dateStr = now.toISOString().split('T')[0];
                    const titleSlug = title.toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '')
                        .substring(0, 80);
                    const filename = `${titleSlug}.md`;
                    const filepath = path.join(OBSIDIAN_VAULT, filename);

                    // Generate front matter
                    const timestamp = now.toISOString();
                    const fabricId = `fabric:${pattern}-${Date.now()}`;

                    // Build comprehensive tags array
                    const tags = [
                        'fabric',  // Always include for Dataview filtering
                        'source/fabric',
                        'format/ai-processed',
                        `pattern/${pattern}`,
                        `source/${sourceType}`
                    ];

                    // Add AI-generated domain and topic tags with namespaces
                    if (aiMetadata.domain_tags && aiMetadata.domain_tags.length > 0) {
                        aiMetadata.domain_tags.forEach(tag => {
                            tags.push(`domain/${tag.toLowerCase().replace(/\s+/g, '-')}`);
                        });
                    }

                    if (aiMetadata.topic_tags && aiMetadata.topic_tags.length > 0) {
                        aiMetadata.topic_tags.forEach(tag => {
                            tags.push(`topic/${tag.toLowerCase().replace(/\s+/g, '-')}`);
                        });
                    }

                    // Add custom tags if provided
                    if (customTags && customTags.length > 0) {
                        tags.push(...customTags);
                    }

                    // Build front matter object
                    const frontmatter = {
                        schema: 'v1',
                        id: fabricId,
                        title: title,
                        date_created: dateStr,
                        type: 'fabric-output',
                        category: aiMetadata.category || 'AI-Processing',
                        source_type: sourceType,
                        fabric_pattern: pattern,
                        fabric_model: 'glm-4.6',
                        processed_at: timestamp,
                        tags: tags,
                        keywords: aiMetadata.keywords || [pattern.replace(/_/g, ' ')],
                        summary: aiMetadata.summary || title
                    };

                    // Add entities if present
                    if (aiMetadata.entities) {
                        const entities = {};
                        if (aiMetadata.entities.people && aiMetadata.entities.people.length > 0) {
                            entities.people = aiMetadata.entities.people;
                        }
                        if (aiMetadata.entities.orgs && aiMetadata.entities.orgs.length > 0) {
                            entities.orgs = aiMetadata.entities.orgs;
                        }
                        if (aiMetadata.entities.products && aiMetadata.entities.products.length > 0) {
                            entities.products = aiMetadata.entities.products;
                        }
                        if (Object.keys(entities).length > 0) {
                            frontmatter.entities = entities;
                        }
                    }

                    // Add optional fields
                    if (sourceUrl) {
                        frontmatter.source_url = sourceUrl;
                        if (sourceType === 'youtube') {
                            frontmatter.canonical_url = sourceUrl.replace('youtu.be/', 'youtube.com/watch?v=');
                        }
                    }
                    if (sourceFile) {
                        frontmatter.source_file = sourceFile;
                    }
                    if (strategy) {
                        frontmatter.fabric_strategy = strategy;
                    }
                    if (chainedFrom) {
                        frontmatter.chained_from = chainedFrom;
                    }

                    // Generate YAML front matter string
                    let yamlContent = '---\n';
                    for (const [key, value] of Object.entries(frontmatter)) {
                        if (Array.isArray(value)) {
                            yamlContent += `${key}:\n`;
                            value.forEach(item => {
                                yamlContent += `  - "${item}"\n`;
                            });
                        } else if (typeof value === 'object') {
                            yamlContent += `${key}:\n`;
                            for (const [subKey, subValue] of Object.entries(value)) {
                                if (Array.isArray(subValue)) {
                                    yamlContent += `  ${subKey}:\n`;
                                    subValue.forEach(item => {
                                        yamlContent += `    - "${item}"\n`;
                                    });
                                }
                            }
                        } else {
                            yamlContent += `${key}: "${value}"\n`;
                        }
                    }
                    yamlContent += '---\n\n';

                    // Clean content: remove markdown code block wrappers if present
                    let cleanContent = content.trim();
                    if (cleanContent.startsWith('```markdown') || cleanContent.startsWith('```md')) {
                        // Remove opening code block
                        cleanContent = cleanContent.replace(/^```(markdown|md)\n/, '');
                        // Remove closing code block
                        cleanContent = cleanContent.replace(/\n```$/, '');
                    } else if (cleanContent.startsWith('```')) {
                        // Remove any generic code block wrapper
                        cleanContent = cleanContent.replace(/^```[a-z]*\n/, '');
                        cleanContent = cleanContent.replace(/\n```$/, '');
                    }

                    // Combine front matter with cleaned content
                    const fileContent = yamlContent + cleanContent;

                    // Write file to Obsidian vault
                    fs.writeFile(filepath, fileContent, 'utf8', (err) => {
                        if (err) {
                            console.error('Error saving to Obsidian:', err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end(`Error saving file: ${err.message}`);
                        } else {
                            console.log(`✅ Saved to Obsidian: ${filename}`);
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({
                                success: true,
                                filename: filename,
                                filepath: filepath
                            }));
                        }
                    });
                });

            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
            }
        });
        return;
    }

    // Health check
    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
        return;
    }

    // Not found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`🚀 Fabric Web Proxy running on http://localhost:${PORT}`);
    console.log(`📁 Patterns directory: ${PATTERNS_DIR}`);
    console.log(`📊 Available patterns: ${getPatterns().length}`);
    console.log('');
    console.log('Endpoints:');
    console.log(`  GET  /patterns/names   - List all patterns`);
    console.log(`  GET  /patterns/details - List patterns with descriptions`);
    console.log(`  POST /chat             - Process text with pattern`);
    console.log(`  POST /save             - Save output to Obsidian`);
    console.log(`  GET  /health           - Health check`);
    console.log('');
    console.log(`📝 Obsidian vault: ${OBSIDIAN_VAULT}`);
});
