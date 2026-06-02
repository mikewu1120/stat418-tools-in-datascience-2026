import fs from "node:fs/promises";
import path from "node:path";

const sharp = (await import(
  "/Users/www1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js"
)).default;

const outDir =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/assets";
const output = path.join(outDir, "api-predict-response.png");

const lines = [
  "POST /predict",
  "{",
  '  "method": "XGBoost (recursive lags)",',
  '  "first_forecast": {',
  '    "period": "2026-05-25",',
  '    "forecast_price": 4.576',
  "  },",
  '  "last_forecast": {',
  '    "period": "2026-07-13",',
  '    "forecast_price": 4.404',
  "  }",
  "}",
];

const esc = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const text = lines
  .map((line, i) => {
    const color = i === 0 ? "#B8F7D4" : line.includes('"') ? "#E5E7EB" : "#9CA3AF";
    return `<text x="38" y="${92 + i * 31}" fill="${color}" font-family="Menlo, Consolas, monospace" font-size="${i === 0 ? 29 : 24}" font-weight="${i === 0 ? 700 : 500}">${esc(line)}</text>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520">
  <rect width="900" height="520" rx="22" fill="#111827"/>
  <rect x="20" y="20" width="860" height="480" rx="18" fill="#0B1220" stroke="#334155" stroke-width="2"/>
  <circle cx="52" cy="44" r="7" fill="#FF5F57"/>
  <circle cx="76" cy="44" r="7" fill="#FFBD2E"/>
  <circle cx="100" cy="44" r="7" fill="#28C840"/>
  ${text}
</svg>`;

await fs.mkdir(outDir, { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(output);
console.log(output);
