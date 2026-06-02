import {
  ensureArtifactToolWorkspace,
  importArtifactTool,
} from "/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs";

const workspace =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets";
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const presentation = await PresentationFile.importPptx(
  await FileBlob.load(
    "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx",
  ),
);
const image = presentation.slides.items[5].images.items[0];
console.log(Object.keys(image));
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(image)));
console.log(Object.keys(presentation.slides.items[5].images));
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(presentation.slides.items[5].images)));
