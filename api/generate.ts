// Vercel Serverless Function - AI logic using Groq
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing API key' });
  }

  const { mode, skillLevel, domain, learningGoal, timeAvailability, deployment, technologies, selectedProjectTitle } = req.body;

  let systemPrompt = "You are an expert senior mentor for developers. Return ONLY valid JSON.";
  let userPrompt = "";

  if (mode === 'suggestions') {
    userPrompt = `
      Generate exactly TWO (2) unique, exciting, and practical coding project ideas based on this user profile:
      
      Skill Level: ${skillLevel}
      Preferred Domain: ${domain || 'General Web Development'}
      Time Available: ${timeAvailability || 'Flexible'}
      Learning Goals: ${learningGoal || 'Build a portfolio piece'}
      Preferred Tech: ${technologies?.join(', ') || 'Modern Stack'}
      Deployment: ${deployment || 'Standard'}
      
      The JSON must be an ARRAY of exactly two objects matching this structure:
      [
        {
          "title": "Project Title",
          "difficulty": "${skillLevel}",
          "description": "2-3 sentences exciting description",
          "reasoning": "A single sentence explaining why this is a good match.",
          "features": ["Feature 1 teaser", "Feature 2 teaser", "Feature 3 teaser"],
          "techStack": { "primary": ["Main Tech"], "alternative": ["Alt Tech"] },
          "roadmap": [ { "phase": "1", "title": "Phase 1" }, { "phase": "2", "title": "Phase 2" }, { "phase": "3", "title": "Phase 3" } ],
          "skillOutcomes": ["Outcome 1", "Outcome 2"],
          "feasibility": "High",
          "confidence": "95%"
        }
      ]
    `;
  } else {
    userPrompt = `
      Generate a FULL DETAILED implementation blueprint for the project titled "${selectedProjectTitle}" based on this user context:
      
      Skill Level: ${skillLevel}
      Domain: ${domain}
      Goal: ${learningGoal}
      Time: ${timeAvailability}
      Tech: ${technologies?.join(', ') || 'Modern Stack'}
      
      Provide a highly detailed 4-5 phase roadmap, 5-8 core features, and specific skill outcomes.
      
      The JSON must match this structure exactly:
      {
        "title": "${selectedProjectTitle}",
        "difficulty": "${skillLevel}",
        "description": "Detailed description...",
        "reasoning": "Deep explanation of matches...",
        "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
        "techStack": {
          "primary": ["Tech 1", "Tech 2"],
          "alternative": ["Alt 1", "Alt 2"]
        },
        "roadmap": [
          { "phase": "Phase 1", "title": "Planning", "description": "...", "duration": "2 days" },
          { "phase": "Phase 2", "title": "Foundation", "description": "...", "duration": "1 week" }
        ],
        "skillOutcomes": ["Outcome 1", "Outcome 2"],
        "feasibility": "High",
        "confidence": "95%"
      }
    `;
  }

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
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      return res.status(response.status).json({ error: `Groq API Error: ${response.status}` });
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const result = JSON.parse(content);

    // If suggestions mode, ensure it's an array. Sometimes models wrap arrays in objects like { "projects": [...] }
    if (mode === 'suggestions' && !Array.isArray(result)) {
      // Try to find an array property if the root isn't an array
      const arrayProp = Object.values(result).find(val => Array.isArray(val));
      if (arrayProp) {
        return res.status(200).json(arrayProp);
      }
    }

    return res.status(200).json(result);

  } catch (error: any) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate idea' });
  }
}
