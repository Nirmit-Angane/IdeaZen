// api/hackathon.ts — IdeaZen Vercel Serverless Function
// Handles hackathon roadmap generation only (separated from generate.ts)

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error: missing API key" });
  }

  const {
    projectTitle,
    teamSize,
    timeline,        // e.g. "24h", "48h"
    teamSkills,      // string[]
    judgingCriteria,
    techConstraints,
  } = req.body;

  if (!projectTitle) {
    return res.status(400).json({ error: "projectTitle is required" });
  }

  const systemPrompt = `
You are an elite hackathon mentor and technical architect.
Your goal is to provide a high-octane 24-48 hour execution roadmap that WINS.

CRITICAL RULES:
1. NEVER mention "Figma", "Adobe XD", "Sketch", or generic "designing" phases. Assume UI is code-first (Tailwind, Shancn).
2. Avoid AI filler: "relentlessly", "pivotal", "tailored to your needs". Be direct and technical.
3. Every Roadmap Phase MUST have exactly 5-7 technical, actionable tasks.
4. Use hour ranges (e.g., "Hr 0-3", "Hr 4-12") for time blocks.
5. Provide a specific, honest "Win Probability" or "Achievability" note.
`.trim();

  const userPrompt = `
Project: "${projectTitle}"
Team size: ${teamSize || "Solo"}
Timeline: ${timeline || "24h"}
Skills: ${teamSkills?.join(", ") || "Full-stack"}

Generate a winning hackathon execution plan in JSON:
{
  "title": "${projectTitle}",
  "strategicAnalysis": {
    "achievability": "<One powerful, honest sentence about the odds of finishing this specific MVP in ${timeline}>",
    "biggestRisk": "<The #1 technical or integration bottleneck>",
    "winningAngle": "<The specific feature or technical 'flex' that will impress judges>",
    "mitigations": ["Specific action 1", "Specific action 2"],
    "skillGaps": ["Gap 1"]
  },
  "roadmap": [
    {
      "phase": "1",
      "title": "Foundation & Logic",
      "timeBlock": "Hr 0-6",
      "goal": "Core API/State working",
      "tasks": [
        { "task": "Specific technical task 1", "assignedTo": "Dev", "duration": "45m" },
        { "task": "Specific technical task 2", "assignedTo": "Dev", "duration": "1h" },
        { "task": "Specific technical task 3", "assignedTo": "Dev", "duration": "30m" },
        { "task": "Specific technical task 4", "assignedTo": "Dev", "duration": "1h" },
        { "task": "Specific technical task 5", "assignedTo": "Dev", "duration": "45m" }
      ]
    }
  ],
  "demoScript": {
    "hook": "1-sentence attention grabber",
    "problem": "The 'pain point' explanation",
    "theWOW": "The main technical demo sequence",
    "closing": "Final impact statement"
  },
  "submissionChecklist": [
    { "item": "README with setup instructions", "timeAllocation": "15m", "critical": true, "completed": false },
    { "item": "Demo video/GIF recording", "timeAllocation": "30m", "critical": true, "completed": false }
  ],
  "mvpScope": {
    "mustHave": ["Feature 1", "Feature 2"],
    "niceToHave": ["Feature 3"],
    "cutIfNeeded": ["Feature 4"]
  },
  "risks": [
    { "risk": "API Limit", "mitigation": "Mock data fallback" }
  ],
  "feasibility": "High"
}

STRICT: Exactly 5-7 tasks per phase. No Figma. No filler.
`.trim();

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 5000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[hackathon] Groq error:", errText);
      return res.status(response.status).json({ error: `Groq API error: ${response.status}` });
    }

    const data = await response.json();
    let raw: string = data.choices[0].message.content;

    raw = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let result: any;
    try {
      result = JSON.parse(raw);
    } catch (e) {
      console.error("[hackathon] Parse error:", e);
      return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
    }

    return res.status(200).json(result);

  } catch (err: any) {
    console.error("[hackathon] Server error:", err);
    return res.status(500).json({ error: err.message || "Unexpected server error. Please try again." });
  }
}
