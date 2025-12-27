// Vercel Serverless Function - API key is hidden here, never sent to browser
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GROQ_API_KEY; // Server-side env var (NOT VITE_)

    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: Missing API key' });
    }

    const { skillLevel, interests, timeCommitment } = req.body;

    const prompt = `
    You are an expert senior mentor for developers. 
    Generate a unique, exciting, and practical coding project idea based on this user profile:
    
    Skill Level: ${skillLevel}
    Interests: ${interests?.join(', ') || 'General Web Development'}
    Time Available: ${timeCommitment}
    
    The project should be modern, impressive for a portfolio, and achievable within the time limit.
    
    Return ONLY valid JSON with no markdown formatting. The JSON must match this structure exactly:
    
    {
      "title": "Project Title",
      "description": "2-3 sentences exciting description",
      "quickStats": {
        "difficulty": "${skillLevel}",
        "feasibility": "High/Medium/Low",
        "features": "Number of core features (e.g. '5 Core')",
        "timeline": "Estimated duration"
      },
      "scores": {
        "aiConfidence": number between 80-100,
        "matchScore": number between 80-100,
        "effort": "Low" | "Medium" | "High" | "Very High"
      },
      "reasoning": ["Reason 1", "Reason 2", "Reason 3"],
      "whatNotToBuild": ["Advice 1", "Advice 2"],
      "techStack": {
        "primary": ["Tech 1", "Tech 2", ...],
        "alternatives": ["Alt 1", "Alt 2", ...]
      },
      "coreFeatures": ["Feature 1", "Feature 2", ...],
      "roadmap": [
        { "phase": "Phase 1", "title": "Phase Title", "duration": "Time" },
        ...
      ]
    }
  `;

    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are a helpful coding mentor that outputs only JSON." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq Error:", errorText);
            return res.status(response.status).json({ error: `AI Error: ${response.status}` });
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
        const projectIdea = JSON.parse(jsonStr);

        return res.status(200).json(projectIdea);

    } catch (error: any) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: error.message || 'Failed to generate idea' });
    }
}
