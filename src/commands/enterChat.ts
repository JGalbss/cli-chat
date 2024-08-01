import { select } from '@inquirer/prompts';
import readline from 'readline';
import { startLoader, stopLoader } from '../loader';
import { getChatGPTResponse, initializeOpenAI } from '../openai';
import { loadStorage, saveStorage } from '../storage';

const enterChat = async (chatID?: string) => {
  await initializeOpenAI();

  const store = await loadStorage('chats.json');

  if (!chatID) {
    const choices = store.chats.map((chat: any) => ({
      name: `Chat ID: ${chat.id}`,
      value: chat.id,
    }));

    chatID = await select({
      message: 'Select a chat:',
      choices,
    });
  }

  const chat = store.chats.find((chat: any) => chat.id === chatID);

  if (!chat) {
    console.log('Chat ID not found:', chatID);
    return;
  }

  console.log(`Entered chat session with ID: ${chatID}`);
  console.log('Past messages:');
  chat.messages.forEach((message: string, index: number) => {
    const sender = message.startsWith('assistant:') ? 'assistant' : 'you';
    console.log(`+-----------------------------+`);
    console.log(`| ${sender}: ${message.replace(`${sender}: `, '')}`);
    console.log(`+-----------------------------+`);
  });
  console.log('Type your messages below. Type "exit" to leave the session.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const message = line.trim();
    if (message.toLowerCase() === 'exit') {
      console.log('Exiting chat session.');
      rl.close();
      return;
    }

    chat.messages.push(`you: ${message}`);
    await saveStorage('chats.json', store);
    console.log('Message sent.');
    console.log(`+-----------------------------+`);
    console.log(`| you: ${message}`);
    console.log(`+-----------------------------+`);

    const loader = startLoader();
    const aiResponse = await getChatGPTResponse(message);
    stopLoader(loader);

    chat.messages.push(`assistant: ${aiResponse}`);
    await saveStorage('chats.json', store);
    console.log(`+-----------------------------+`);
    console.log(`| assistant: ${aiResponse}`);
    console.log(`+-----------------------------+`);

    rl.prompt();
  }).on('close', () => {
    console.log('Chat session closed.');
    process.exit(0);
  });
};

export default enterChat;