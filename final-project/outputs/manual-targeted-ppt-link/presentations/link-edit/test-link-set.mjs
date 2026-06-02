import { ensureArtifactToolWorkspace, importArtifactTool } from '/Users/www1/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';
const workspace = '/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit';
await ensureArtifactToolWorkspace(workspace);
const artifact = await importArtifactTool(workspace);
const { FileBlob, PresentationFile } = artifact;
const p = await PresentationFile.importPptx(await FileBlob.load('/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/final-slides/Mike_Wu_Final.pptx'));
const sh = p.slides.items[0].shapes.items.find(shape => shape.text?.toString?.().includes('Streamlit app:'));
const text=sh.text.toString();
const url='https://fuel-price-streamlit-oluqiqxkmq-uw.a.run.app';
const range=sh.text.getRange(text.indexOf(url), text.indexOf(url)+url.length);
for (const val of [url, {url}, {href:url}, {type:'url', url}, {address:url}]) {
  try {
    range.hyperlink = val;
    range.link = val;
    console.log('set', JSON.stringify(val), 'get hyperlink', range.hyperlink, 'get link', range.link);
  } catch(e) { console.log('err setting', JSON.stringify(val), e.message); }
}
