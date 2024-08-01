import OpenAI from 'openai';
import { loadConfig } from './config';

let openai: OpenAI;

export const initializeOpenAI = async () => {
  const config = await loadConfig();
  openai = new OpenAI({
    apiKey: config.apiKey,
  });
};

export const getChatGPTResponse = async (message: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-3.5-turbo',
  });

  return response.choices[0].message?.content || 'No response from AI';
};