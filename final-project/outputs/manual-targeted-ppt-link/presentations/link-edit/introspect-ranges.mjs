import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
const sh = p.slides.items[0].shapes.items.find(shape => shape.text?.toString?.().includes('Streamlit app:'));
console.log('text:', sh.text.toString());
for (const call of [()=>sh.text.get(),()=>sh.text.getRange(0, 10),()=>sh.text.selectRunRanges?.(0, 10)]) {
  try { const r = call(); console.log('range obj', r, Object.keys(r||{}), r && Object.getOwnPropertyNames(Object.getPrototypeOf(r))); console.log('props', r && JSON.stringify(r, (k,v)=> typeof v==='function'?'[fn]':v).slice(0,1000)); } catch(e){ console.log('err', e.stack); }
}
console.log('default style', sh.text.defaultTextStyle);
console.log('paragraphs', sh.text.paragraphs?.());
