import {
  ensureArtifactToolWorkspace,
  importArtifactTool,
} from "/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets";
const sourcePptx =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx";

await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePptx));
const slide = presentation.slides.items[5];

console.log("images");
for (let i = 0; i < slide.images.items.length; i += 1) {
  const image = slide.images.items[i];
  console.log(i, image.id, JSON.stringify(image.position ?? image.frame));
}

console.log("shapes");
for (let i = 0; i < slide.shapes.items.length; i += 1) {
  const shape = slide.shapes.items[i];
  const text = shape.text?.toString?.().trim();
  if (text) console.log(i, shape.id, JSON.stringify(shape.frame), JSON.stringify(text.slice(0, 180)));
}
