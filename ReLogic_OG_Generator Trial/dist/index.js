#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generator_1 = require("./generator");
const program = new commander_1.Command();
program
    .name('relogic-og-generator')
    .description('Generate static OG HTML files from CSV/JSON')
    .option('-i, --input <file>', 'Input CSV or JSON file')
    .option('-t, --template <file>', 'Custom HTML template file', 'src/template.html')
    .option('-o, --output <dir>', 'Output directory', 'og')
    .action(async (opts) => {
    await (0, generator_1.generateFromInput)(opts.input, opts.template, opts.output);
});
program.parse(process.argv);
