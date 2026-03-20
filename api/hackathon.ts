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
You are a hackathon veteran who has won multiple 24–48 hour competitions.
You give tight, realistic execution plans — not inspirational fluff.
Every minute of a hackathon counts, so your advice is direct and specific.

BANNED TOOL MENTIONS — never suggest these in any field:
- Figma (any version — Figma, FigJam, Figma templates)
- Adobe XD
- Sketch

For rapid UI in hackathons, suggest instead:
- shadcn/ui, Tailwind UI, or DaisyUI for pre-built components
- v0.dev is acceptable
- Specific component libraries like MUI, Chakra UI, Radix
- "Build with a CSS framework + pre-built templates"

Banned words for any achievability or score explanation:
relentlessly, pivotal, crucial, seamlessly, leverage, harness, dive. Write like a teammate, not a coach.

Rules:
- Output ONLY valid JSON. No markdown, no code fences, no text outside the JSON.
- No markdown inside JSON strings.
- Be brutally realistic about what can be built in the given time.
- Name specific tools, libraries, and shortcuts that save time in hackathons.
- Every task must have a clear owner if team size is more than 1.
`.trim();

  const userPrompt = `
Project: "${projectTitle}"
Team size: ${teamSize || "Solo"}
Timeline: ${timeline || "24h"}
Team skills: ${teamSkills?.join(", ") || "Full-stack"}
Judging focus: ${judgingCriteria || "Technical complexity + innovation"}
Tech constraints: ${techConstraints || "None"}

Build a complete hackathon execution plan. Be honest about what can realistically ship in ${timeline || "24h"}.

Return a single JSON object:

{
  "title": "${projectTitle}",
  "timeline": "${timeline || "24h"}",

  "feasibility": "High | Medium | Low",
  "feasibilityNote": "<One direct sentence: why this is or isn't realistic in ${timeline || "24h"}>",

  "strategicAnalysis": {
    "achievability": "<2–3 sentences: honest assessment of what can ship vs what must be cut>",
    "biggestRisk": "<The single most likely reason this fails — be specific>",
    "winningAngle": "<The one thing that, if executed well, makes judges remember this project>",
    "skillGaps": ["<Gap 1>", "<Gap 2>"],
    "mitigations": ["<How to handle gap 1>", "<How to handle gap 2>"]
  },

  "roadmap": [
    {
      "phase": "1",
      "title": "<Phase name>",
      "timeBlock": "<e.g. Hour 0–3>",
      "goal": "<What must be working by the end of this block>",
      "tasks": [
        {
          "task": "<Specific task>",
          "assignedTo": "<Person role or 'Everyone' — e.g. Frontend Dev, Backend Dev, Solo>",
          "duration": "<e.g. 45 min>",
          "priority": "Must | Should | Nice"
        }
      ]
    }
  ],

  "mvpScope": {
    "mustHave": ["<Feature that must work for a credible demo>"],
    "niceToHave": ["<Feature to add if time permits>"],
    "cutIfNeeded": ["<Feature to drop without hesitation if behind schedule>"]
  },

  "techRecommendations": {
    "shortcuts": ["<Specific library or tool that saves hours — e.g. 'Use Clerk for auth, skip building it'>" ],
    "avoid": ["<Something tempting that will eat your time — e.g. 'Don't build a custom UI component library'>" ]
  },

  "risks": [
    {
      "risk": "<Specific risk for this project and timeline>",
      "likelihood": "High | Medium | Low",
      "mitigation": "<Exact action to take if this happens>"
    }
  ],

  "submissionChecklist": [
    {
      "item": "<Specific checklist item>",
      "timeAllocation": "<e.g. 30 min>",
      "critical": true
    }
  ],

  "demoScript": "<4–5 sentences: exact flow to demo this in 3 minutes to judges. What to show first, where the wow moment is, what to say if something breaks.>"
}
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
