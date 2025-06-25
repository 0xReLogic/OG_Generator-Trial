# ReLogic_OG_Generator

Generate static HTML OG tag files from CSV/JSON for SPA, Flutter Web, Headless CMS, etc.

**Developer:** ReLogic

## Fitur
- Input: CSV/JSON
- Output: folder berisi file HTML OG per produk/link
- Template custom (Handlebars)
- CLI tool, tanpa backend
- Auto-redirect ke halaman asli
- Versi trial: maksimal 5 file per generate & watermark "Dibuat dengan ReLogic_OG_Generator versi trial" di setiap file HTML

## Apa yang Didapat?
- Source code TypeScript (src/)
- Template HTML OG (src/template.html)
- Dokumentasi penggunaan (README.md)
- package.json, tsconfig.json
- Hasil build (dist/) jika diperlukan

## Cara Pakai

```
npm install
npm run build
node dist/index.js --input data.csv --output og
```

## Contoh Input CSV

```
slug,title,description,image,url
produk-1,Produk 1,Deskripsi produk 1,https://img.com/1.jpg,https://site.com/produk-1
produk-2,Produk 2,Deskripsi produk 2,https://img.com/2.jpg,https://site.com/produk-2
```

## Error Umum & Solusi

- **Error: Cannot find module 'fs' atau 'path'**
  > Jalankan: `npm install --save-dev @types/node`
- **Error: Cannot find module 'commander', 'handlebars', atau 'csv-parse'**
  > Jalankan: `npm install`
- **Error: ENOENT: no such file or directory, open 'data.csv'**
  > Pastikan file input (data.csv/data.json) sudah ada di folder project.
- **OG tag tidak muncul saat share ke medsos**
  > Pastikan file HTML sudah di-upload ke hosting publik, bukan hanya dibuka lokal.

## FAQ

**Q: Apakah bisa custom template OG-nya?**
A: Bisa, edit file `src/template.html` sesuai kebutuhan.

**Q: Apakah bisa input JSON?**
A: Bisa, cukup ganti file input ke .json dan pastikan format array of object.

**Q: Apakah bisa generate ratusan file sekaligus?**
A: Bisa, tool ini support batch processing dengan performa cepat.

**Q: Apakah butuh backend/server?**
A: Tidak, tool ini 100% statis dan berjalan di CLI.

## Lisensi

ReLogic_OG_Generator dirilis dengan lisensi MIT. Bebas digunakan untuk keperluan pribadi maupun komersial.


