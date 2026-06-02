import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-polish/presentations/final-polish';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
for (let si=0; si<p.slides.items.length; si++) {
  const s=p.slides.items[si];
  console.log(`--- slide ${si+1} ---`);
  for (let i=0;i<s.shapes.items.length;i++) {
    const sh=s.shapes.items[i];
    const text=sh.text?.toString?.() ?? '';
    if (!text.trim()) continue;
    const fs=sh.text.fontSize;
    const frame=sh.frame;
    console.log(i, sh.id, 'fs=', fs, 'frame=', JSON.stringify(frame), 'text=', JSON.stringify(text.slice(0,160)));
  }
}
