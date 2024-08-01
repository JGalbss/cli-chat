import { input } from '@inquirer/prompts';
import { saveConfig } from '../config';

const init = async () => {
  const apiKey = await input({ message: 'Enter your OpenAI API key:' });

  await saveConfig({ apiKey });

  console.log('Configuration saved successfully.');
};

export default init;