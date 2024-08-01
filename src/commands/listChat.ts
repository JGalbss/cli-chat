import { loadStorage } from '../storage';

const listChat = async () => {
  const store = await loadStorage('chats.json');
  store.chats.forEach((chat: any) => {
    console.log('Chat ID:', chat.id);
  });
};

export default listChat;
