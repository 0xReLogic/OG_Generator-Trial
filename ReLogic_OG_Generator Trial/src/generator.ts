import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { parse as csvParse } from 'csv-parse/sync';

const TRIAL_LIMIT = 5; // Versi trial hanya bisa generate 5 file

export async function generateFromInput(inputFile: string, templateFile: string, outputDir: string) {
  // Baca input (CSV/JSON)
  const ext = path.extname(inputFile).toLowerCase();
  let items: any[] = [];
  if (ext === '.csv') {
    const csv = fs.readFileSync(inputFile, 'utf8');
    items = csvParse(csv, { columns: true });
  } else if (ext === '.json') {
    items = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  } else {
    throw new Error('Input file must be CSV or JSON');
  }

  // Versi trial: batasi jumlah file
  if (items.length > TRIAL_LIMIT) {
    console.log(`\n=== VERSI TRIAL ===`);
    console.log(`Hanya ${TRIAL_LIMIT} file pertama yang akan digenerate. Untuk versi penuh, silakan beli lisensi resmi.`);
    items = items.slice(0, TRIAL_LIMIT);
  }

  // Baca template
  const templateSrc = fs.readFileSync(templateFile, 'utf8');
  const template = Handlebars.compile(templateSrc);

  // Pastikan output dir ada
  fs.mkdirSync(outputDir, { recursive: true });

  // Generate file per item
  for (const item of items) {
    // Tambahkan watermark ke context template
    const html = template({ ...item, watermark: true });
    const slug = item.slug || item.id || item.title.replace(/\s+/g, '-').toLowerCase();
    const outPath = path.join(outputDir, `${slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
  }
  console.log(`Generated ${items.length} files in ${outputDir}`);
}