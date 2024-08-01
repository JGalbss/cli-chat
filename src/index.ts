import { Command } from 'commander';
import enterChat from './commands/enterChat';
import init from './commands/init';
import listChat from './commands/listChat';
import newChat from './commands/newChat';

const program = new Command();

program
  .name('ai-chat-cli')
  .description('A CLI tool to interface with AI chat')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize the CLI tool with your OpenAI API key')
  .action(() => init());

program
  .command('new')
  .description('Start a new chat session')
  .action(() => newChat());

program
  .command('list')
  .description('List all chat sessions')
  .action(() => listChat());

program
  .command('enter')
  .description('Enter a chat session')
  .action(() => enterChat());

program.parse(process.argv);