import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
console.log('count', p.slides.count);
console.log('items', p.slides.items, Array.isArray(p.slides.items), p.slides.items?.length);
const s = p.slides.items?.[0] ?? p.slides.getItem?.(0) ?? p.slides.getItem?.('0');
console.log('slide', s && Object.keys(s));
console.log('slide proto', s && Object.getOwnPropertyNames(Object.getPrototypeOf(s)));
console.log('shapes', s?.shapes, s?.shapes && Object.getOwnPropertyNames(Object.getPrototypeOf(s.shapes)), s?.shapes?.items?.length, s?.shapes?.count);
if (s?.shapes?.items) {
  for (let i=0;i<Math.min(5,s.shapes.items.length);i++) {
    const sh=s.shapes.items[i];
    console.log('shape', i, Object.keys(sh), Object.getOwnPropertyNames(Object.getPrototypeOf(sh)), sh.text?.toString?.(), sh.text);
  }
}
