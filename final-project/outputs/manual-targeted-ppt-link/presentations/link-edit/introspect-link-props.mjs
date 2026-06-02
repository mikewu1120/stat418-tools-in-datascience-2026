import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
const sh = p.slides.items[0].shapes.items.find(shape => shape.text?.toString?.().includes('Streamlit app:'));
const r = sh.text.getRange(0, 10);
for (const prop of ['hyperlink','link','underline','color']) {
  let proto = Object.getPrototypeOf(r);
  while (proto) {
    const d = Object.getOwnPropertyDescriptor(proto, prop);
    if (d) console.log(prop, d);
    proto = Object.getPrototypeOf(proto);
  }
}
