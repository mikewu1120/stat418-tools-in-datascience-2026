import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
function proto(obj){return Object.getOwnPropertyNames(Object.getPrototypeOf(obj));}
console.log('slides proto', proto(p.slides));
for (const k of proto(p.slides)) {
  if (typeof p.slides[k] === 'function') console.log('fn', k, p.slides[k].length);
}
console.log('slides own symbols', Object.getOwnPropertySymbols(p.slides));
console.log('slides own names', Object.getOwnPropertyNames(p.slides));
try { console.log('iterator', typeof p.slides[Symbol.iterator]); for (const s of p.slides) console.log('iter slide', s, Object.keys(s)); } catch(e){ console.log('iter err', e.message);}
try { console.log('toArray', p.slides.toArray?.()); } catch(e){ console.log('toArray err', e.message);}
try { console.log('get0', p.slides.get?.(0)); } catch(e){ console.log('get err', e.message);}
try { console.log('at0', p.slides.at?.(0)); } catch(e){ console.log('at err', e.message);}
