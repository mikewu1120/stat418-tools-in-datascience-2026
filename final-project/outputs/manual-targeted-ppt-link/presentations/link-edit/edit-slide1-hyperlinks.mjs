import {
  ensureArtifactToolWorkspace,
  importArtifactTool,
} from "/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit";
const sourcePptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx";
const outputPptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit/Mike_Wu_Final_hyperlinks.pptx";

const streamlitUrl = "https://fuel-price-streamlit-oluqiqxkmq-uw.a.run.app";
const apiUrl = "https://fuel-price-api-oluqiqxkmq-uw.a.run.app";

await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePptx));
const firstSlide = presentation.slides.items[0];
const footerShape = firstSlide.shapes.items.find((shape) =>
  shape.text?.toString?.().includes("Streamlit app:"),
);

if (!footerShape) {
  throw new Error("Could not find the existing slide 1 link/footer text box.");
}

const text = footerShape.text.toString();
for (const url of [streamlitUrl, apiUrl]) {
  const start = text.indexOf(url);
  if (start === -1) throw new Error(`Could not find URL text: ${url}`);
  const range = footerShape.text.getRange(start, start + url.length);
  range.hyperlink = url;
  range.link = url;
  range.underline = true;
  range.color = "#93C5FD";
}

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(outputPptx);
console.log(outputPptx);
