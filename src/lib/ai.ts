import { ProjectIdea, UserInputs } from '../types';

// Now calls OUR secure backend instead of Groq directly
export async function generateProjectIdea(inputs: Partial<UserInputs>): Promise<ProjectIdea> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skillLevel: inputs.skillLevel,
        interests: inputs.interests,
        timeCommitment: inputs.timeCommitment
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    return await response.json() as ProjectIdea;

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw error;
  }
}
