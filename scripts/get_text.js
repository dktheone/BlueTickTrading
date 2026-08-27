const fs = require("fs");
const path = require("path");

const basePath = "_raw_assets/template_kit/traderoom-online-trading-courses-elementor-templ-2024-08-20-08-45-17-utc";
const home = JSON.parse(fs.readFileSync(path.join(basePath, "templates/home.json"), "utf8"));

function printText(nodes) {
  if (!nodes) return;
  for (const n of nodes) {
    if (n.settings) {
      if (n.settings.title) console.log("TITLE: " + n.settings.title);
      if (n.settings.title_text) console.log("TITLE_TEXT: " + n.settings.title_text);
      if (n.settings.editor) console.log("TEXT: " + n.settings.editor.replace(/<[^>]+>/g, " ").trim().slice(0, 100));
      if (n.settings.heading_title) console.log("HEADING_TITLE: " + n.settings.heading_title);
      if (n.settings.image && n.settings.image.url) console.log("IMG: " + n.settings.image.url);
      if (n.settings.price) console.log("PRICE: " + n.settings.price);
    }
    if (n.elements) printText(n.elements);
  }
}
printText(home.content);
