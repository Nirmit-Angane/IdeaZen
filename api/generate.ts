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
You are a world-class senior software engineer and developer mentor.
Your job is to generate deeply personalised, actionable project ideas and blueprints for developers.

Critical rules:
- Return ONLY valid JSON. No markdown, no code fences, no explanation text.
- Every string value must be plain text — no markdown formatting inside JSON strings. No asterisks, no bold, no italics.
- Be specific. Never give generic advice. Every field must reference the actual project and the user's stated context.
- Be encouraging but realistic. Don't oversell difficulty or undersell complexity.
- Resources must be real, named, and specific — never generic category names like "YouTube tutorials".
`.trim();

  // ─────────────────────────────────────────────────────────────────────
  // USER CONTEXT  —  reused in all prompts
  // ─────────────────────────────────────────────────────────────────────
  const userContext = `
User profile:
- Skill level: ${skillLevel}
- Domain interest: ${domain || 'General Web Development'}
- Learning goal: ${learningGoal || 'Build a strong portfolio piece'}
- Time available: ${timeAvailability || 'Flexible'}
- Preferred technologies: ${technologies?.join(', ') || 'Modern stack (React, Node.js)'}
- Architecture patterns: ${architecturePatterns?.join(', ') || 'Standard MVC'}
- Scalability needs: ${scalability || 'Standard'}
- Project constraints: ${constraints || 'None'}
- Deployment preference: ${deployment || 'Standard cloud'}
${difficultyStretch ? `- Difficulty adjustment requested: ${difficultyStretch}` : ''}
`.trim();

  // ─────────────────────────────────────────────────────────────────────
  // MODE: suggestions  —  returns 2 idea cards for the IdeaPreview page
  // ─────────────────────────────────────────────────────────────────────
  let userPrompt = '';

  if (mode === 'suggestions') {
    userPrompt = `
${userContext}

Generate exactly 2 unique, genuinely exciting, and realistic project ideas tailored precisely to this user.
Avoid clichés like "social media app", "to-do list", or "weather app" unless heavily reimagined.

Return a JSON ARRAY of exactly 2 objects. Each object must follow this exact structure:

[
  {
    "title": "Specific, memorable project name (not generic)",

    "difficulty": "Beginner | Intermediate | Advanced",
    "difficultyScore": 6.5,
    "description": "2-3 sentences. What this project is, what makes it interesting, and one concrete technical challenge.",

    "matchBreakdown": {
      "skillMatch": 90,
      "stackMatch": 85,
      "timeFit": 80,
      "overall": 85
    },

    "realWorldComparison": "One sentence: think of this as a simpler version of [real app] + [real app]. Name real products.",

    "reasoning": {
      "skillFit": "One sentence: why this matches their exact skill level.",
      "stackFit": "One sentence: why these technologies suit their stated stack preference.",
      "growthOpportunity": "One sentence: one specific new skill or concept this project will teach them."
    },

    "targetUser": "2 sentences describing the real person who would use this app.",

    "features": [
      { "name": "Feature name", "tier": "Core | Enhanced | Stretch", "description": "One sentence." },
      { "name": "Feature name", "tier": "Core | Enhanced | Stretch", "description": "One sentence." },
      { "name": "Feature name", "tier": "Core | Enhanced | Stretch", "description": "One sentence." }
    ],

    "techStack": {
      "primary": [
        { "name": "Tech name", "reason": "One sentence why this tech for this project." }
      ],
      "alternative": [
        { "name": "Tech name", "whenToUse": "One sentence: use this instead if..." }
      ]
    },

    "roadmap": [
      { "phase": "1", "title": "Short phase name", "weekRange": "Week 1-2", "deliverable": "Specific thing the user can demo by the end of this phase." },
      { "phase": "2", "title": "Short phase name", "weekRange": "Week 3-5", "deliverable": "Specific thing the user can demo by the end of this phase." },
      { "phase": "3", "title": "Short phase name", "weekRange": "Week 6-8", "deliverable": "Specific thing the user can demo by the end of this phase." }
    ],

    "feasibility": "High | Medium | Low",
    "buildComplexity": "High | Medium | Low",
    "timeFit": "Comfortable | Tight | Challenging"
  }
]
`.trim();

  // ─────────────────────────────────────────────────────────────────────
  // MODE: blueprint  —  full detailed output for the ProjectOutput page
  // ─────────────────────────────────────────────────────────────────────
  } else if (mode === 'blueprint') {
    userPrompt = `
${userContext}
Selected project: "${selectedProjectTitle}"

Generate a COMPLETE, deeply detailed implementation blueprint for this exact project.
Everything must be specific to this project and this user — zero generic advice.
Generate exactly 4 roadmap phases. No more, no fewer. Each must have: phase, title, weekRange, duration, description, deliverable, and tasks array with 3 items.

Return a single JSON object matching this exact structure:

{
  "title": "${selectedProjectTitle}",

  "difficulty": "Beginner | Intermediate | Advanced",
  "difficultyScore": 6.5,
  "difficultyBreakdown": {
    "stateComplexity": "High | Medium | Low",
    "stateReason": "One sentence specific to this project.",
    "apiIntegrations": "High | Medium | Low",
    "apiReason": "One sentence specific to this project.",
    "authComplexity": "High | Medium | Low",
    "authReason": "One sentence specific to this project.",
    "deploymentComplexity": "High | Medium | Low",
    "deploymentReason": "One sentence specific to this project."
  },

  "description": "3-4 sentences. Full scope, what makes it non-trivial, and what the finished product looks like.",

  "realWorldComparison": "One sentence naming 1-2 real products this resembles at a simpler scale.",

  "tagline": "One punchy sentence: 'A [X] that lets [target user] [do specific thing] without [pain point].'",

  "matchBreakdown": {
    "skillMatch": 90,
    "stackMatch": 85,
    "timeFit": 80,
    "overall": 85,
    "explanation": "2 sentences explaining the overall match score."
  },

  "reasoning": {
    "skillFit": "One specific sentence referencing this user's skill level.",
    "stackFit": "One specific sentence referencing their stated tech preferences.",
    "growthOpportunity": "One specific sentence naming the most important new skill this project builds."
  },

  "targetUser": "2-3 sentences. Real person description: job, pain point, and why this app solves it.",

  "features": [
    {
      "name": "Feature name",
      "tier": "Core",
      "description": "What it does and why it matters for the project.",
      "technicalNote": "Brief note on the main implementation challenge for this feature."
    }
  ],

  "mvp": {
    "description": "The project is demo-ready when these 3 things work:",
    "conditions": [
      "Specific demo-ready condition 1",
      "Specific demo-ready condition 2",
      "Specific demo-ready condition 3"
    ],
    "demoScript": "A 3-4 sentence script: exactly what to click or show in 60 seconds to impress a recruiter. Be specific about the wow moment."
  },

  "techStack": {
    "primary": [
      { "name": "Tech name", "role": "What this tech handles in the project.", "reason": "Why specifically for this project and this user." }
    ],
    "alternative": [
      { "name": "Tech name", "role": "What this tech handles.", "whenToUse": "Use this instead if..." }
    ]
  },

  "firstCommitGuide": {
    "intro": "One sentence setting expectations — what they'll have running after following these steps.",
    "steps": [
      { "step": 1, "action": "Exact terminal command or instruction", "note": "Optional: why this step matters." },
      { "step": 2, "action": "Exact terminal command or instruction", "note": "" },
      { "step": 3, "action": "Exact terminal command or instruction", "note": "" },
      { "step": 4, "action": "Exact terminal command or instruction", "note": "" },
      { "step": 5, "action": "First component or file to create and why", "note": "This is your first real building block." }
    ],
    "firstGoal": "The specific first working feature to aim for — one sentence."
  },

  "roadmap": [
    {
      "phase": "1",
      "title": "Phase name",
      "weekRange": "Week 1-2",
      "description": "2-3 sentences of what gets built in this phase.",
      "duration": "2 weeks",
      "deliverable": "Specific thing you can open in a browser and show someone by end of this phase.",
      "tasks": ["Specific task 1", "Specific task 2", "Specific task 3"]
    }
  ],

  "skillOutcomes": {
    "solidify": ["Skill they already know, now applied deeply — be specific to this project"],
    "gainNew": ["Genuinely new skill or pattern this project introduces — be specific"]
  },

  "pitfalls": [
    {
      "pitfall": "Specific mistake developers make in THIS project — not generic.",
      "why": "One sentence: why this exact project is prone to this mistake.",
      "mitigation": "Exact, actionable way to avoid it from day one."
    }
  ],

  "portfolioBlurb": "A 2-sentence, copy-ready resume / LinkedIn bullet point. Must mention: project type, 2-3 technologies used, and one concrete technical achievement. Write it in past tense as if the project is complete.",

  "resources": [
    {
      "title": "Specific resource name (e.g. 'Fireship - React in 100 Seconds')",
      "source": "Real source name (e.g. YouTube / Official Docs / freeCodeCamp)",
      "url": "https://real-url-if-known-or-empty-string",
      "format": "Video | Article | Docs | Course | GitHub",
      "timeEstimate": "e.g. 15 min / 2 hrs",
      "why": "One sentence: why this specific resource for this specific project."
    }
  ],

  "feasibility": "High | Medium | Low",
  "buildComplexity": "High | Medium | Low",
  "timeFit": "Comfortable | Tight | Challenging"
}
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
      // Guarantee exactly 2 ideas
      result = result.slice(0, 2);
    }

    return res.status(200).json(result);

  } catch (error: any) {
    console.error('[API] Server error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate idea. Please try again.' });
  }
}
