import {
  createSlideContext,
  ensureArtifactToolWorkspace,
  importArtifactTool,
} from "/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets";
const sourcePptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx";
const outputPptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/Mike_Wu_Final_live_demo.pptx";
const appShot =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/assets/streamlit-history-view.png";
const apiCard =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/assets/api-predict-response.png";

function findShape(slide, needle) {
  return slide.shapes.items.find((shape) => shape.text?.toString?.().includes(needle));
}

function setText(shape, text, { fontSize, frame, color, bold } = {}) {
  shape.text = text;
  if (fontSize) shape.text.fontSize = fontSize;
  if (color) shape.text.color = color;
  if (typeof bold === "boolean") shape.text.bold = bold;
  if (frame) shape.frame = frame;
}

await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const ctx = createSlideContext(artifact, {
  workspaceDir: workspace,
  fonts: { heading: "Aptos Display", body: "Aptos" },
});

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePptx));
const slide = presentation.slides.items[5];

// Replace the previous placeholder illustration with live demo evidence.
const oldHeroImage = slide.images.items[0];
if (oldHeroImage) oldHeroImage.delete();

ctx.addShape(slide, {
  left: 0,
  top: 0,
  width: 360,
  height: 540,
  geometry: "rect",
  fill: "#0B1220",
  line: { fill: "#0B1220", width: 0 },
});

ctx.addText(slide, {
  text: "LIVE APP SCREENSHOTS",
  left: 24,
  top: 30,
  width: 250,
  height: 18,
  fontSize: 11.5,
  bold: true,
  color: "#93C5FD",
  typeface: "Aptos",
});

ctx.addText(slide, {
  text: "Click to reveal: Streamlit UI, then Flask API JSON",
  left: 24,
  top: 50,
  width: 305,
  height: 18,
  fontSize: 10,
  color: "#CBD5E1",
  typeface: "Aptos",
});

ctx.addShape(slide, {
  left: 18,
  top: 78,
  width: 324,
  height: 203,
  geometry: "roundRect",
  fill: "#FFFFFF",
  line: { fill: "#334155", width: 1.1 },
});
await ctx.addImage(slide, {
  path: appShot,
  left: 21,
  top: 81,
  width: 318,
  height: 197,
  fit: "contain",
  name: "Demo App Screenshot",
  alt: "Screenshot of the deployed Streamlit gasoline forecast dashboard.",
});
ctx.addText(slide, {
  text: "1  Streamlit dashboard on Cloud Run",
  left: 24,
  top: 286,
  width: 310,
  height: 18,
  fontSize: 11.8,
  bold: true,
  color: "#F9FAFB",
  typeface: "Aptos",
});

await ctx.addImage(slide, {
  path: apiCard,
  left: 18,
  top: 318,
  width: 324,
  height: 187,
  fit: "cover",
  name: "Demo API Response",
  alt: "Screenshot-style card showing deployed Flask predict API response JSON.",
});
ctx.addText(slide, {
  text: "2  Flask API returns the forecast payload",
  left: 24,
  top: 510,
  width: 310,
  height: 18,
  fontSize: 11.8,
  bold: true,
  color: "#F9FAFB",
  typeface: "Aptos",
});

const title = findShape(slide, "The Demo Proves");
if (title) {
  setText(title, "The Demo Shows Streamlit Calling Flask in Real Time", {
    fontSize: 25.5,
    frame: { left: 414.97, top: 79.87, width: 490.06, height: 66 },
    color: "#F9FAFB",
    bold: true,
  });
}

const chooseBody = findShape(slide, "Select XGBoost");
if (chooseBody) {
  setText(chooseBody, "Select XGBoost or SARIMA, then set the forecast horizon.", {
    fontSize: 11.5,
    frame: { left: 414.97, top: 192.8, width: 490.06, height: 18 },
    color: "#D1D5DB",
  });
}
const horizonTitle = findShape(slide, "Set Horizon");
if (horizonTitle) setText(horizonTitle, "Submit Forecast", { fontSize: 13.5, color: "#F9FAFB", bold: true });
const horizonBody = findShape(slide, "Adjust the Streamlit slider");
if (horizonBody) {
  setText(horizonBody, "Streamlit sends horizon + method to Flask /predict.", {
    fontSize: 11.5,
    frame: { left: 414.97, top: 263.49, width: 490.06, height: 18 },
    color: "#D1D5DB",
  });
}
const apiBody = findShape(slide, "POST /predict");
if (apiBody) {
  setText(apiBody, "Flask loads the trained model and returns weekly JSON forecasts.", {
    fontSize: 11.5,
    frame: { left: 414.97, top: 334.19, width: 490.06, height: 18 },
    color: "#D1D5DB",
  });
}
const resultsBody = findShape(slide, "Streamlit renders");
if (resultsBody) {
  setText(resultsBody, "The app displays the forecast chart/table while the raw API call proves the backend works independently.", {
    fontSize: 11.5,
    frame: { left: 414.97, top: 405.38, width: 490.06, height: 30 },
    color: "#D1D5DB",
  });
}
const command = findShape(slide, "Try it yourself:");
if (command) {
  setText(command, "Live demo links: Streamlit app + POST https://fuel-price-api-oluqiqxkmq-uw.a.run.app/predict", {
    fontSize: 11.2,
    frame: { left: 448.13, top: 442, width: 446.7, height: 34 },
    color: "#F9FAFB",
  });
}

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(outputPptx);
console.log(outputPptx);
