
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.join(__dirname, '.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GROQ_API_KEY=["']?([^"'\n]+)["']?/);
    if (match) {
        apiKey = match[1];
    }
} catch (e) {
    console.error("Could not read .env.local", e.message);
    process.exit(1);
}

if (!apiKey) {
    console.error("GROQ_API_KEY not found in .env.local");
    process.exit(1);
}

console.log(`Testing Groq API Key: ${apiKey.substring(0, 8)}...`);

const data = JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [
        { role: "system", content: "You are a helpful assistant. Return JSON." },
        { role: "user", content: "Generate a generic project idea in JSON format." }
    ],
    response_format: { type: "json_object" }
});

fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: data
}).then(async res => {
    if (res.ok) {
        const json = await res.json();
        console.log("Groq API Verification: SUCCESS");
        console.log("Response Content:", json.choices[0].message.content);
    } else {
        console.error(`Groq API Verification: FAILED (Status ${res.status})`);
        const text = await res.text();
        console.error("Response:", text);
    }
}).catch(err => {
    console.error("Request Error:", err);
});
