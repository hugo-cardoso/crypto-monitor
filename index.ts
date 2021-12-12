import { program } from 'commander';
import { App } from './src/app';
import { version } from './package.json';

program.version(version);

program
  .command('watch [coins]')
  .description('Watch crypto coins')
  .option('-curr, --currency [currency]', 'Curreny to watch')
  .action((coins, options) => {
    new App(
      coins.split(',') || [],
      options.currency || 'BRL'
    )
  });
