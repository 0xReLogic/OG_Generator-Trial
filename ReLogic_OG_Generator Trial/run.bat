@echo off
REM Build TypeScript
npm run build
REM Jalankan generator (edit input/output sesuai kebutuhan)
node dist/index.js --input data.csv --output og
pause
