import fs from "node:fs";
import path from "node:path";

const root =
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-ppt-live-demo/presentations/live-demo-assets/ooxml-work";
const slideXmlPath = path.join(root, "ppt/slides/slide6.xml");

function entranceClick({ parId, effectId, animId, shapeId }) {
  return `<p:par><p:cTn id="${parId}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="${effectId}" presetID="1" presetClass="entr" presetSubtype="0" fill="hold" nodeType="clickEffect"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst><p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="${animId}" dur="500"/><p:tgtEl><p:spTgt spid="${shapeId}"/></p:tgtEl></p:cBhvr></p:animEffect></p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>`;
}

let slideXml = fs.readFileSync(slideXmlPath, "utf8");
slideXml = slideXml.replace(/<p:timing>[\s\S]*?<\/p:timing>/g, "");

const timing = `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>${entranceClick({ parId: 3, effectId: 4, animId: 5, shapeId: 31 })}${entranceClick({ parId: 6, effectId: 7, animId: 8, shapeId: 33 })}</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst><p:bldLst><p:bldP spid="31" grpId="0"/><p:bldP spid="33" grpId="0"/></p:bldLst></p:timing>`;

slideXml = slideXml.replace("</p:sld>", `${timing}</p:sld>`);
fs.writeFileSync(slideXmlPath, slideXml, "utf8");
console.log(slideXmlPath);
