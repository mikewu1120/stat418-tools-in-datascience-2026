import fs from "node:fs";

import {
  ensureArtifactToolWorkspace,
  importArtifactTool,
} from "/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-polish/presentations/final-polish";
const sourcePptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx";
const notesPath =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Speech_Notes.md";
const outputPptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-polish/presentations/final-polish/Mike_Wu_Final_polished.pptx";

function sectionNotes(markdown) {
  const notes = new Map();
  const re = /^## Slide (\d+) - .+$/gm;
  const matches = [...markdown.matchAll(re)];
  for (let i = 0; i < matches.length; i += 1) {
    const slideNum = Number(matches[i][1]);
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : markdown.indexOf("## Short Backup Version");
    const body = markdown
      .slice(start, end > -1 ? end : undefined)
      .replace(/```bash\n([\s\S]*?)```/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    notes.set(slideNum, body);
  }
  return notes;
}

function findShape(slide, needle) {
  return slide.shapes.items.find((shape) => shape.text?.toString?.().includes(needle));
}

function setText(shape, text, { fontSize, frame, color } = {}) {
  shape.text = text;
  if (fontSize) shape.text.fontSize = fontSize;
  if (color) shape.text.color = color;
  if (frame) shape.frame = frame;
}

function font(slide, needle, size) {
  const shape = findShape(slide, needle);
  if (shape) shape.text.fontSize = size;
  return shape;
}

await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePptx));
const notesBySlide = sectionNotes(fs.readFileSync(notesPath, "utf8"));

for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const slide = presentation.slides.items[i];
  const note = notesBySlide.get(i + 1);
  if (note) {
    slide.speakerNotes.clear();
    slide.speakerNotes.setText(note);
  }
}

// Slide 1: keep links readable from the back of the room.
{
  const s = presentation.slides.items[0];
  const footer = findShape(s, "Streamlit app:");
  if (footer) {
    footer.text.fontSize = 11.8;
    footer.text.color = "#E5E7EB";
    footer.frame = { left: 54.97, top: 462, width: 538.06, height: 64 };
  }
}

// Slide 2: small body boxes get a little more presence.
{
  const s = presentation.slides.items[1];
  font(s, "Price movement is hard to reason", 12);
  font(s, "Make model choice and forecast horizon", 12);
}

// Slide 3: replace tiny explanatory copy with larger, presenter-readable text.
{
  const s = presentation.slides.items[2];
  font(s, "EIA Weekly Gasoline Prices", 15);
  font(s, "EIA Open Data API; synthetic", 11.5);
  font(s, "Sort by period", 11.5);
  font(s, "Create lags 1/2/4/8/52", 11.5);
  const longLine = findShape(s, "The model intentionally keeps");
  if (longLine) {
    setText(longLine, "Explainable features: recent lags capture price level and momentum; calendar fields capture weekly seasonality.", {
      fontSize: 11.5,
      frame: { left: 27.48, top: 298, width: 560, height: 34 },
      color: "#E5E7EB",
    });
  }
  const featureTitle = findShape(s, "Feature Engineering");
  if (featureTitle) {
    featureTitle.text.fontSize = 11.5;
    featureTitle.frame = { left: 624.97, top: 394, width: 220, height: 20 };
  }
  const featureBody = findShape(s, "Lags 1, 2, 4, 8, 52");
  if (featureBody) {
    setText(featureBody, "Lags 1, 2, 4, 8, 52: recent level, momentum, annual seasonality\nMonth + ISO week: calendar structure\n1,729 rows: Apr 5, 1993 to May 18, 2026", {
      fontSize: 10.5,
      frame: { left: 624.97, top: 416, width: 310, height: 78 },
      color: "#F9FAFB",
    });
  }
}

// Slide 5: architecture labels were the smallest readable text in the deck.
{
  const s = presentation.slides.items[4];
  font(s, "EIA data flows", 11.2);
  const body = findShape(s, "UI can change independently");
  if (body) {
    setText(body, "UI and API deploy independently\nAPI testable with curl/Postman\nArtifact Registry stores images\nAPI memory: 1 Gi for SARIMA", {
      fontSize: 11.5,
      frame: { left: 50.68, top: 382.99, width: 418, height: 64 },
      color: "#F9FAFB",
    });
  }
  for (const needle of ["Liveness check", "Model info", "Forecast JSON"]) font(s, needle, 10.5);
  for (const needle of ["/health", "/metadata", "/predict", "Endpoints", "Why Separate Services?"]) font(s, needle, 12);
}

// Slide 6: make the demo command more useful and readable.
{
  const s = presentation.slides.items[5];
  const demo = findShape(s, "Try it yourself:");
  if (demo) {
    setText(demo, "Try it yourself: POST https://fuel-price-api-oluqiqxkmq-uw.a.run.app/predict with { horizon: 8, method: xgboost }  |  Open Streamlit App", {
      fontSize: 10.7,
      frame: { left: 448.13, top: 438, width: 446.7, height: 38 },
      color: "#F9FAFB",
    });
  }
}

// Slide 7: shorten dense bullets and enlarge the future-work band.
{
  const s = presentation.slides.items[6];
  const challenges = findShape(s, "Cloud Run required separate");
  if (challenges) {
    setText(challenges, "Cloud Run needed separate API/UI services and correct MODEL_API_URL wiring\nSARIMA artifact was too large; compact parameter storage fixed deployment\nSARIMA needed 1 Gi Cloud Run memory to avoid instance termination", {
      fontSize: 15.4,
      frame: { left: 54.97, top: 239.7, width: 406.83, height: 152 },
      color: "#F9FAFB",
    });
  }
  const ai = findShape(s, "Scaffolded Flask/Streamlit");
  if (ai) {
    setText(ai, "Scaffolded Flask/Streamlit integration and Docker commands\nGenerated draft code that I checked against course requirements\nLesson: pair AI help with tests, logs, and explicit verification", {
      fontSize: 15.4,
      frame: { left: 498.7, top: 239.7, width: 406.83, height: 152 },
      color: "#F9FAFB",
    });
  }
  const future = findShape(s, "Future Work:");
  if (future) {
    setText(future, "Future Work: scheduled EIA refresh, confidence intervals, SHAP feature importance, and leaner dependency files for faster rebuilds.", {
      fontSize: 15.4,
      frame: { left: 103.46, top: 428.07, width: 786.65, height: 48 },
      color: "#F9FAFB",
    });
  }
}

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(outputPptx);
console.log(outputPptx);
