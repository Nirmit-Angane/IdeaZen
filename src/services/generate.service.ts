import { GeneratedProject, UserInputs, IdeaCard } from '../types';

export async function fetchSuggestions(inputs: UserInputs): Promise<IdeaCard[]> {
  return generateProjectIdea(inputs, 'suggestions');
}

export async function fetchBlueprint(inputs: UserInputs, title: string): Promise<GeneratedProject> {
  const result = await generateProjectIdea(inputs, 'blueprint', title);
  return Array.isArray(result) ? result[0] : result;
}

export async function refineIdea(inputs: UserInputs, title: string): Promise<GeneratedProject> {
  // Logic for refining an idea, currently mapped to blueprint mode but with refinement inputs
  const result = await generateProjectIdea(inputs, 'blueprint', title);
  return Array.isArray(result) ? result[0] : result;
}

async function generateProjectIdea(inputs: UserInputs, mode: 'suggestions' | 'blueprint', selectedProjectTitle?: string): Promise<any> {
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
