import { hello } from './commands/hello.js';
import { organize } from './commands/organize.js';
import { help } from './commands/help.js';

const args = process.argv.slice(2);
const command = args.shift();

switch (command) {
  case 'hello':
    hello();
    break;

  case 'organize':
    organize(args);
    break;

  default:
    help();
}
