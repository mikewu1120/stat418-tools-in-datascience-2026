import fs from "node:fs/promises";
import path from "node:path";

const sharp = (await import(
  "/Users/www1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js"
)).default;

const slidesDir =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/render/source-slides";
const output =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/render/contact-sheet.png";

const files = (await fs.readdir(slidesDir))
  .filter((file) => file.endsWith(".png"))
  .sort()
  .map((file) => path.join(slidesDir, file));

const thumbWidth = 384;
const thumbHeight = 216;
const gutter = 24;
const labelHeight = 32;
const cols = 2;
const rows = Math.ceil(files.length / cols);
const width = cols * thumbWidth + (cols + 1) * gutter;
const height = rows * (thumbHeight + labelHeight) + (rows + 1) * gutter;

const composites = [];
for (let i = 0; i < files.length; i += 1) {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const left = gutter + col * (thumbWidth + gutter);
  const top = gutter + row * (thumbHeight + labelHeight + gutter);
  const thumb = await sharp(files[i]).resize(thumbWidth, thumbHeight).png().toBuffer();
  const label = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${thumbWidth}" height="${labelHeight}">
        <text x="0" y="22" font-family="Aptos, Arial, sans-serif" font-size="20" fill="#111827">Slide ${i + 1}</text>
      </svg>`,
    ),
  )
    .png()
    .toBuffer();
  composites.push({ input: thumb, left, top });
  composites.push({ input: label, left, top: top + thumbHeight + 6 });
}

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: "#F8FAFC",
  },
})
  .composite(composites)
  .png()
  .toFile(output);

console.log(output);
