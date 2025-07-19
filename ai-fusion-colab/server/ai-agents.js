import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Query Gemini with a set of persona based prompts and return suggestions.
 * If a request fails, an error string is returned for that suggestion.
 * @param {string} content Current document content
 */
export async function simulateAIs(content) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const personas = [
    { name: 'Grok 4', prompt: 'You are witty and humorous. Provide a short tweak to:' },
    { name: 'ChatGPT', prompt: 'Expand creatively on:' },
    { name: 'Gemini', prompt: 'Give an analytical review of:' },
    { name: 'Llama', prompt: 'Offer an ethical perspective on:' }
  ];

  const results = await Promise.all(
    personas.map(async ({ name, prompt }) => {
      try {
        const result = await model.generateContent(`${prompt} ${content}`);
        const text = result.response.text().trim();
        return { name, suggestion: text };
      } catch (err) {
        return { name, suggestion: 'Error generating suggestion' };
      }
    })
  );

  return results;
}
