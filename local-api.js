
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import generateHandler from './api/generate';
import hackathonHandler from './api/hackathon';

// Configure dotenv to read from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env.local') });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mimic Vercel's request/response object structure if needed, 
// but Express req/res is usually close enough for simple handlers.
app.all('/api/generate', async (req, res) => {
    try {
        console.log(`[Local API] ${req.method} /api/generate`);
        await generateHandler(req, res);
    } catch (error) {
        console.error('[Local API] Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.all('/api/hackathon', async (req, res) => {
    try {
        console.log(`[Local API] ${req.method} /api/hackathon`);
        await hackathonHandler(req, res);
    } catch (error) {
        console.error('[Local API] Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`
  🚀 Local API Server running at http://localhost:${PORT}
  👉 API Endpoint: http://localhost:${PORT}/api/generate
  `);
});
