// Vercel Serverless Function - AI logic using Groq
// IdeaZen — Upgraded API with enriched prompts for maximum user value
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: Missing API key' });
  }

  const {
    mode,
    skillLevel,
    domain,
    learningGoal,
    timeAvailability,
    deployment,
    technologies,
    architecturePatterns,
    scalability,
    constraints,
    selectedProjectTitle,
    difficultyStretch,
  } = req.body;

  // ─────────────────────────────────────────────────────────────────────
  // SYSTEM PROMPT  —  shared across all modes
  // ─────────────────────────────────────────────────────────────────────
  const systemPrompt = `
You are a senior software architect and world-class developer mentor.
Your goal is to provide deeply technical, zero-fluff project blueprints that help developers build portfolio-worthy apps.

CRITICAL RULES:
1. NEVER mention "Figma", "Adobe XD", "Sketch", or generic "design" phases. Assume UI is implemented via code (Tailwind, Radix, Shadcn).
2. Avoid AI filler: "relentlessly", "pivotal", "tailored to your needs", "seamlessly". Be direct and technical.
3. Every Roadmap Phase MUST have 5-7 technical, actionable tasks.
4. Resources MUST be real, named, and specific (4-5 resources total).
5. Output ONLY valid JSON.
`.trim();

  // ─────────────────────────────────────────────────────────────────────
  // USER CONTEXT  —  reused in all prompts
  // ─────────────────────────────────────────────────────────────────────
  const userContext = `
User: ${skillLevel} level, interested in ${domain || 'Web Dev'}.
Goal: ${learningGoal || 'Portfolio'}.
Stack: ${technologies?.join(', ') || 'React/Node'}.
`.trim();

  // ─────────────────────────────────────────────────────────────────────
  // MODE: suggestions  —  returns 2 idea cards for the IdeaPreview page
  // ─────────────────────────────────────────────────────────────────────
  let userPrompt = '';

  if (mode === 'suggestions') {
    userPrompt = `
${userContext}
Generate EXACTLY 3 unique, high-impact project ideas. 
Return a JSON ARRAY of 3 objects:
[
  {
    "title": "Project Name",
    "difficulty": "Intermediate-High",
    "difficultyScore": 7.5,
    "description": "2-3 sentences max. Focus on technical challenge.",
    "matchBreakdown": { "skillMatch": 90, "stackMatch": 85, "timeFit": 80, "overall": 85 },
    "realWorldComparison": "Think [App A] + [App B].",
    "reasoning": { "skillFit": "...", "stackFit": "...", "growthOpportunity": "..." },
    "targetUser": "...",
    "features": [
      { "name": "Feature", "tier": "Core", "description": "..." }
    ],
    "techStack": { "primary": [], "alternative": [] },
    "roadmap": [
      { "phase": "1", "title": "Foundation", "weekRange": "Week 1", "deliverable": "MVP core" }
    ],
    "feasibility": "High",
    "buildComplexity": "Medium",
    "timeFit": "Challenging"
  }
]
`.trim();

  } else if (mode === 'blueprint') {
    userPrompt = `
${userContext}
Project: "${selectedProjectTitle}"

Generate a COMPLETE implementation blueprint. NO generic advice.
STRICT: 4 phases. Each MUST have 5-7 tasks.
STRICT: 4-5 learning resources.
STRICT: Include a detailed "firstCommitGuide".

{
  "title": "${selectedProjectTitle}",
  "difficulty": "Intermediate",
  "difficultyScore": 7.0,
  "difficultyBreakdown": { "stateComplexity": "High", "stateReason": "...", "apiIntegrations": "Medium", "apiReason": "...", "authComplexity": "Low", "authReason": "...", "deploymentComplexity": "Low", "deploymentReason": "..." },
  "description": "3-4 sentences on technical scope and architecture.",
  "realWorldComparison": "...",
  "tagline": "A [X] for [Y] that [WOW].",
  "matchBreakdown": { "skillMatch": 90, "stackMatch": 85, "timeFit": 80, "overall": 85, "explanation": "..." },
  "reasoning": { "skillFit": "...", "stackFit": "...", "growthOpportunity": "..." },
  "targetUser": "...",
  "features": [
    { "name": "Feature", "tier": "Core", "description": "...", "technicalNote": "..." }
  ],
  "mvp": { "description": "Demo-ready when:", "conditions": ["...", "...", "..."], "demoScript": "..." },
  "techStack": { "primary": [], "alternative": [] },
  "firstCommitGuide": { 
    "intro": "Set up your development environment and initialize the core project structure.", 
    "steps": [
      { "action": "npx create-next-app@latest .", "note": "Scaffold the project" },
      { "action": "git init && git add . && git commit -m 'Initial commit'", "note": "Set up version control" }
    ], 
    "firstGoal": "A running dev server with a basic landing page." 
  },
  "roadmap": [
    {
      "phase": "1",
      "title": "Foundation",
      "weekRange": "Week 1-2",
      "description": "...",
      "duration": "2 weeks",
      "deliverable": "...",
      "tasks": ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6", "Task 7"]
    }
  ],
  "skillOutcomes": { "solidify": [], "gainNew": [] },
  "pitfalls": [{ "pitfall": "...", "why": "...", "mitigation": "..." }],
  "portfolioBlurb": "...",
  "resources": [
    { "title": "Resource Name", "source": "Source", "url": "URL", "format": "Docs", "timeEstimate": "1h", "why": "..." }
  ],
  "feasibility": "High", "buildComplexity": "Medium", "timeFit": "Comfortable"
}

STRICT: 5-7 tasks per phase. 4-5 real resources. No Figma.
`.trim();

  // ─────────────────────────────────────────────────────────────────────
  // MODE: refine  —  re-generate a single blueprint with adjustment
  // ─────────────────────────────────────────────────────────────────────
  } else if (mode === 'refine') {
    userPrompt = `
${userContext}
Original project: "${selectedProjectTitle}"
Adjustment requested: "${difficultyStretch}"

Re-generate the full project blueprint with this adjustment applied.
If "more-complex": increase scope, introduce a harder architectural pattern, add one advanced feature.
If "simpler": reduce scope, simplify the tech stack, tighten the MVP definition.

Use the exact same JSON structure as the blueprint mode above.
`.trim();
  }

  // ─────────────────────────────────────────────────────────────────────
  // API CALL
  // ─────────────────────────────────────────────────────────────────────
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 6000,   // increased from 4096 — new fields need more tokens
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API] Groq error:', errorText);
      return res.status(response.status).json({ error: `Groq API Error: ${response.status}` });
    }

    const data = await response.json();
    let content: string = data.choices[0].message.content;

    console.log('[API] Raw response:', content);

    // Strip markdown code fences if the model wraps the JSON anyway
    content = content
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    let result: any;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error('[API] JSON parse error:', parseError);
      console.error('[API] Faulty content:', content);
      return res.status(500).json({ error: 'Failed to parse AI response. Please try again.' });
    }

    // ── Normalise suggestions mode ──────────────────────────────────────
    // Groq returns a json_object, so the array may be wrapped in a key.
    if (mode === 'suggestions') {
      if (!Array.isArray(result)) {
        const arrayProp = Object.values(result).find((v) => Array.isArray(v));
        result = arrayProp ? arrayProp : [result];
      }
      // Guarantee exactly 3 ideas
      result = result.slice(0, 3);
    }

    return res.status(200).json(result);

  } catch (error: any) {
    console.error('[API] Server error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate idea. Please try again.' });
  }
}
