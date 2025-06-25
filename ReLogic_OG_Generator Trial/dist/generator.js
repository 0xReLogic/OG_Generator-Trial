"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFromInput = generateFromInput;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const Handlebars = __importStar(require("handlebars"));
const sync_1 = require("csv-parse/sync");
async function generateFromInput(inputFile, templateFile, outputDir) {
    // Baca input (CSV/JSON)
    const ext = path.extname(inputFile).toLowerCase();
    let items = [];
    if (ext === '.csv') {
        const csv = fs.readFileSync(inputFile, 'utf8');
        items = (0, sync_1.parse)(csv, { columns: true });
    }
    else if (ext === '.json') {
        items = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    }
    else {
        throw new Error('Input file must be CSV or JSON');
    }
    // Baca template
    const templateSrc = fs.readFileSync(templateFile, 'utf8');
    const template = Handlebars.compile(templateSrc);
    // Pastikan output dir ada
    fs.mkdirSync(outputDir, { recursive: true });
    // Generate file per item
    for (const item of items) {
        const html = template(item);
        const slug = item.slug || item.id || item.title.replace(/\s+/g, '-').toLowerCase();
        const outPath = path.join(outputDir, `${slug}.html`);
        fs.writeFileSync(outPath, html, 'utf8');
    }
    console.log(`Generated ${items.length} files in ${outputDir}`);
}
