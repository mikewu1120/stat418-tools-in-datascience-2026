import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
const s = p.slides.items[0];
for (let i=0;i<s.shapes.items.length;i++) {
  const sh=s.shapes.items[i];
  const text = sh.text?.toString?.() ?? '';
  console.log(i, sh.id, JSON.stringify(sh.frame), JSON.stringify(sh.position), JSON.stringify(text));
}
