const fs = require("fs");
const path = require("path");

const basePath = "_raw_assets/template_kit/traderoom-online-trading-courses-elementor-templ-2024-08-20-08-45-17-utc";
const home = JSON.parse(fs.readFileSync(path.join(basePath, "templates/home.json"), "utf8"));
const header = JSON.parse(fs.readFileSync(path.join(basePath, "templates/header.json"), "utf8"));
const footer = JSON.parse(fs.readFileSync(path.join(basePath, "templates/footer.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(basePath, "manifest.json"), "utf8"));

function inspectElements(elements, depth = 0) {
  if (!elements) return;
  for (const el of elements) {
    const indent = "  ".repeat(depth);
    const title = el.settings?._title || el.widgetType || el.elType || "element";
    let details = "";
    if (el.widgetType === "heading") {
      details = ` [Heading: "${el.settings?.title}"]`;
    } else if (el.widgetType === "text-editor") {
      const text = el.settings?.editor?.replace(/<[^>]+>/g, "").trim().slice(0, 60);
      details = ` [Text: "${text}..."]`;
    } else if (el.widgetType === "image") {
      details = ` [Image: ${el.settings?.image?.url || el.settings?.image?.id || "custom"}]`;
    } else if (el.widgetType === "button") {
      details = ` [Button: "${el.settings?.text}"]`;
    } else if (el.widgetType === "icon-box") {
      details = ` [IconBox: "${el.settings?.title_text}"]`;
    } else if (el.settings?.background_image?.url) {
      details = ` [BgImg: ${el.settings.background_image.url}]`;
    }
    console.log(`${indent}- ${title}${details}`);
    if (el.elements) {
      inspectElements(el.elements, depth + 1);
    }
  }
}

console.log("=== HEADER ===");
inspectElements(header.content);

console.log("\n=== HOME CONTENT ===");
inspectElements(home.content);

console.log("\n=== FOOTER ===");
inspectElements(footer.content);

console.log("\n=== MANIFEST IMAGES ===");
if (manifest.images) {
  manifest.images.forEach(img => {
    console.log(`Image: ${img.filename} -> ${img.thumbnail_url}`);
  });
}
