#!/usr/bin/env node

import { Command } from 'commander';
import { generateFromInput } from './generator';
import * as path from 'path';

const program = new Command();

program
  .name('relogic-og-generator')
  .description('Generate static OG HTML files from CSV/JSON')
  .option('-i, --input <file>', 'Input CSV or JSON file')
  .option('-t, --template <file>', 'Custom HTML template file', 'src/template.html')
  .option('-o, --output <dir>', 'Output directory', 'og')
  .action(async (opts) => {
    await generateFromInput(opts.input, opts.template, opts.output);
  });

program.parse(process.argv);