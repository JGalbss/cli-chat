import { v4 as uuidv4 } from 'uuid';
import { loadStorage, saveStorage } from '../storage';
import enterChat from './enterChat';

const newChat = async () => {
  const store = await loadStorage('chats.json');
  const chat = {
    id: uuidv4(),
    messages: [],
  };

  store.chats.push(chat);
  await saveStorage('chats.json', store);

  console.log('Started a new chat with ID:', chat.id);
  await enterChat(chat.id);
};

export default newChat;