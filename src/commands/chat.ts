import { Command } from 'commander';
import enterChat from './enterChat';
import listChat from './listChat';
import newChat from './newChat';
import sendChat from './sendChat';

const chat = new Command('chat');

chat.command('new').description('Start a new chat').action(newChat);

chat.command('list').description('List all chats').action(listChat);

chat
  .command('send [chatID] [message]')
  .description('Send a message to a chat')
  .action(sendChat);

chat
  .command('enter [chatID]')
  .description('Enter a chat session')
  .action(enterChat);

export default chat;
