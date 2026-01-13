import { GeneratedProject, UserInputs } from '../App';

export async function generateProjectIdea(inputs: UserInputs, mode: 'suggestions' | 'blueprint', selectedProjectTitle?: string): Promise<any> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...inputs,
        mode,
        selectedProjectTitle
      })
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

    return await response.json();

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw error;
  }
}
