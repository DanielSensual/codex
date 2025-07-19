export interface Suggestion {
  name: string;
  suggestion: string;
}

export function simulateAIs(content: string): Suggestion[] {
  // This is a placeholder for AI suggestions.
  return [
    { name: 'Grok 4', suggestion: 'Humorous tweak to: ' + content.slice(0, 20) },
    { name: 'ChatGPT', suggestion: 'Creative expansion of: ' + content.slice(0, 20) },
    { name: 'Gemini', suggestion: 'Analytical review of: ' + content.slice(0, 20) },
    { name: 'Llama', suggestion: 'Ethical perspective on: ' + content.slice(0, 20) }
  ];
}
