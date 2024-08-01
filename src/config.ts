import { promises as fs } from 'fs';
import path from 'path';

const configFilePath = path.join(__dirname, '../config.json');

export const loadConfig = async (): Promise<{ apiKey: string }> => {
  try {
    const data = await fs.readFile(configFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { apiKey: '' };
    }
    throw error;
  }
};

export const saveConfig = async (config: { apiKey: string }): Promise<void> => {
  const data = JSON.stringify(config, null, 2);
  await fs.writeFile(configFilePath, data, 'utf-8');
};