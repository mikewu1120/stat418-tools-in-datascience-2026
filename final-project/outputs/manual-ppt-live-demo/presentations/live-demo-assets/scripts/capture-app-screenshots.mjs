import fs from "node:fs/promises";
import path from "node:path";

const { chromium } = await import(
  "/Users/www1/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs"
);

const outDir =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/assets";
const appUrl = "https://fuel-price-streamlit-oluqiqxkmq-uw.a.run.app";

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

await page.goto(appUrl, { waitUntil: "domcontentloaded", timeout: 90_000 });
await page.getByText("U.S. weekly retail gasoline", { exact: false }).waitFor({ timeout: 90_000 });
await page.waitForTimeout(4_000);
await page.screenshot({
  path: path.join(outDir, "streamlit-history-view.png"),
  fullPage: false,
});

const forecastButton = page.locator('button:has-text("Get forecast")').first();
await forecastButton.scrollIntoViewIfNeeded();
await forecastButton.click({ force: true, timeout: 30_000 });
await page.getByText("Forecast —", { exact: false }).waitFor({ timeout: 120_000 }).catch(() => {});
await page.screenshot({
  path: path.join(outDir, "streamlit-after-forecast-click.png"),
  fullPage: false,
});

await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await page.waitForTimeout(3_000);
await page.screenshot({
  path: path.join(outDir, "streamlit-forecast-output.png"),
  fullPage: false,
});

await browser.close();
console.log(outDir);
