import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-polish/presentations/final-polish';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
const s = p.slides.items[0];
console.log('speakerNotes', s.speakerNotes, typeof s.speakerNotes, s.speakerNotes && Object.keys(s.speakerNotes));
console.log('speakerNotes proto', s.speakerNotes && Object.getOwnPropertyNames(Object.getPrototypeOf(s.speakerNotes)));
try { console.log('notes toString', s.speakerNotes?.toString?.()); } catch(e){ console.log('toString err', e.message); }
for (const prop of ['speakerNotes']) {
 let proto=Object.getPrototypeOf(s); while(proto){const d=Object.getOwnPropertyDescriptor(proto,prop); if(d) console.log(prop,d); proto=Object.getPrototypeOf(proto);}
}
