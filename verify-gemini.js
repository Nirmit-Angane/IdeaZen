
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually since dotenv might not be installed
const envPath = path.join(__dirname, '.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=["']?([^"'\n]+)["']?/);
    if (match) {
        apiKey = match[1];
    }
} catch (e) {
    console.error("Could not read .env.local", e.message);
    process.exit(1);
}

if (!apiKey) {
    console.error("GEMINI_API_KEY not found in .env.local");
    process.exit(1);
}

console.log(`Testing API Key: ${apiKey.substring(0, 5)}...`);

const data = JSON.stringify({
    contents: [{
        parts: [{ text: "Hello, answer with 'OK' if you can hear me." }]
    }]
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (d) => {
        body += d;
    });
    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log("API Key Verification: SUCCESS");
            try {
                const json = JSON.parse(body);
                console.log("Response text:", json.candidates?.[0]?.content?.parts?.[0]?.text || "No text");
            } catch (e) {
                console.log("Response (raw):", body.substring(0, 100));
            }
        } else {
            console.error(`API Key Verification: FAILED (Status ${res.statusCode})`);
            console.error("Response:", body);
        }
    });
});

req.on('error', (error) => {
    console.error("Request Error:", error);
});

req.write(data);
req.end();
