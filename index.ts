#!/usr/bin/env node

import { Command } from 'commander';
import { App } from './src/app';
import { version } from './package.json';

const program = new Command();

program
  .command('watch [coins]')
  .description('Watch crypto coins')
  .option('-curr, --currency [currency]', 'Curreny to watch')
  .action((coins, options) => {
    console.log(coins, options);
    new App(
      coins.split(',') || [],
      options.currency || 'BRL'
    )
  });

program.version(version);

program.parse(process.argv);
