import { promises as fs } from 'fs';

export interface Chat {
  id: string;
  messages: string[];
}

export interface Storage {
  chats: Chat[];
}

export const loadStorage = async (filename: string): Promise<Storage> => {
  try {
    const data = await fs.readFile(filename, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { chats: [] };
    }
    throw error;
  }
};

export const saveStorage = async (
  filename: string,
  storage: Storage,
): Promise<void> => {
  const data = JSON.stringify(storage, null, 2);
  await fs.writeFile(filename, data, 'utf-8');
};
