import {
  ensureArtifactToolWorkspace,
  importArtifactTool,
} from "/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit";
const sourcePptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx";
const outputPptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit/Mike_Wu_Final_links.pptx";

await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePptx));
const firstSlide = presentation.slides.items[0];
const footerShape = firstSlide.shapes.items.find((shape) =>
  shape.text?.toString?.().includes("Streamlit: fuel-price-streamlit"),
);

if (!footerShape) {
  throw new Error("Could not find the existing slide 1 link/footer text box.");
}

footerShape.frame = {
  left: 54.96871391076116,
  top: 457,
  width: 538.0624671916011,
  height: 68,
};
footerShape.text =
  "Mike Wu\nStreamlit app: https://fuel-price-streamlit-oluqiqxkmq-uw.a.run.app\nFlask API: https://fuel-price-api-oluqiqxkmq-uw.a.run.app";
footerShape.text.fontSize = 11.5;
footerShape.text.typeface = "PT Sans";
footerShape.text.color = "#D0D5DD";
footerShape.text.alignment = "left";
footerShape.text.verticalAlignment = "top";
footerShape.text.insets = { top: 0, right: 0, bottom: 0, left: 0 };

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(outputPptx);
console.log(outputPptx);
