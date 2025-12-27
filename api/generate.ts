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

  const { skillLevel, interests, timeCommitment, domain, learningGoal, technologies } = req.body;

  const prompt = `
    You are an expert senior mentor for developers. 
    Generate a unique, exciting, and practical coding project idea based on this user profile:
    
    Skill Level: ${skillLevel}
    Interests/Domain: ${domain || (interests?.join(', ') || 'General Web Development')}
    Time Available: ${timeCommitment || 'Flexible'}
    Goals: ${learningGoal || 'Build a portfolio piece'}
    Preferred Tech: ${technologies?.join(', ') || 'Modern Stack'}
    
    The project should be modern, impressive for a portfolio, and achievable within the time limit.
    
    Return ONLY valid JSON with no markdown formatting. The JSON must match this structure exactly:
    
    {
      "title": "Project Title",
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "description": "2-3 sentences exciting description",
      "reasoning": "A single sentence explaining why this is a good match.",
      "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
      "techStack": {
        "primary": ["Tech 1", "Tech 2", ...],
        "alternative": ["Alt 1", "Alt 2", ...]
      },
      "roadmap": [
        { "phase": "Phase 1", "title": "Planning", "description": "What to do", "duration": "2 days" },
        { "phase": "Phase 2", "title": "Core Dev", "description": "What to do", "duration": "1 week" },
        ...
      ],
      "skillOutcomes": ["Skill 1", "Skill 2", "Skill 3"],
      "feasibility": "High" | "Medium" | "Low",
      "confidence": "95%" (or similar percentage string)
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
