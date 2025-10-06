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

// Get pattern details (name + description)
function getPatternDetails() {
    const patterns = getPatterns();
    return patterns.map(pattern => {
        const systemFile = path.join(PATTERNS_DIR, pattern, 'system.md');
        let description = '';

        try {
            const content = fs.readFileSync(systemFile, 'utf8');
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
}

// Process text with Fabric CLI
function processFabric(pattern, input, strategy, callback) {
    // Build arguments for fabric command
    const args = ['-p', pattern, '--stream'];

    // Add strategy flag if provided
    if (strategy) {
        args.push('--strategy', strategy);
    }

    const fabric = spawn('fabric', args, {
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
            callback(new Error(error || `Fabric exited with code ${code}`), null);
        } else {
            callback(null, output);
        }
    });

    // Send input to fabric
    fabric.stdin.write(input);
    fabric.stdin.end();
}

// Parse VTT subtitle file to extract text
function parseVTT(vttContent) {
    const lines = vttContent.split('\n');
    let transcript = '';
    let lastText = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip WEBVTT header, timestamps, and empty lines
        if (line.startsWith('WEBVTT') ||
            line.match(/^\d{2}:\d{2}:\d{2}/) ||
            line === '' ||
            line.startsWith('Kind:') ||
            line.startsWith('Language:')) {
            continue;
        }

        // Clean up the text (remove timestamps embedded in text)
        const cleanText = line.replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, '')
                              .replace(/<c>/g, ' ')
                              .replace(/<\/c>/g, '')
                              .trim();

        // Add text if it's not a duplicate and not just tags
        if (cleanText && cleanText !== lastText && !cleanText.match(/^align:|^position:/)) {
            transcript += cleanText + ' ';
            lastText = cleanText;
        }
    }

    return transcript.trim();
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
            processFabric(pattern, transcript, strategy, callback);
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
        const patternDetails = getPatternDetails();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(patternDetails));
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
    console.log(`  GET  /health           - Health check`);
});
