import fs from "node:fs";
import path from "node:path";

const root =
  process.env.OOXML_ROOT ||
  "/Users/www1/Desktop/stat418-tools-in-datascience-2026/final-project/outputs/manual-targeted-ppt-link/presentations/link-edit/ooxml-work";
const slideXmlPath = path.join(root, "ppt/slides/slide1.xml");
const relsPath = path.join(root, "ppt/slides/_rels/slide1.xml.rels");

const links = [
  {
    id: "rIdStreamlitApp",
    label: "Streamlit app: https://fuel-price-streamlit-oluqiqxkmq-uw.a.run.app",
    target: "https://fuel-price-streamlit-oluqiqxkmq-uw.a.run.app",
  },
  {
    id: "rIdFlaskApi",
    label: "Flask API: https://fuel-price-api-oluqiqxkmq-uw.a.run.app",
    target: "https://fuel-price-api-oluqiqxkmq-uw.a.run.app",
  },
];

let slideXml = fs.readFileSync(slideXmlPath, "utf8");
let relsXml = fs.readFileSync(relsPath, "utf8");

relsXml = relsXml.replace(
  /<Relationship\s+[^>]*Type="http:\/\/schemas\.openxmlformats\.org\/officeDocument\/2006\/relationships\/hyperlink"[^>]*\/>/g,
  "",
);
slideXml = slideXml.replace(/<a:hlinkClick\b[\s\S]*?\/>/g, "");

for (const { id, label, target } of links) {
  relsXml = relsXml.replace(
    "</Relationships>",
    `<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${target}" TargetMode="External" /></Relationships>`,
  );

  const escaped = label
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  const tail = `</a:rPr><a:t>${escaped}</a:t></a:r>`;
  const linkXml = `<a:hlinkClick r:id="${id}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" />`;
  if (!slideXml.includes(`${linkXml}${tail}`)) {
    slideXml = slideXml.replace(tail, `${linkXml}${tail}`);
  }
}

fs.writeFileSync(slideXmlPath, slideXml, "utf8");
fs.writeFileSync(relsPath, relsXml, "utf8");
