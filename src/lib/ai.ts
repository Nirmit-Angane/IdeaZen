import { ProjectIdea, UserInputs } from '../types';

// Now calls OUR secure backend instead of Groq directly
export async function generateProjectIdea(inputs: Partial<UserInputs>): Promise<ProjectIdea> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: `API Error ${response.status}: ${errorText || response.statusText}` };
      }
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    return await response.json() as ProjectIdea;

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw error;
  }
}
