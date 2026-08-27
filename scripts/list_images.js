const fs = require("fs");
const manifest = JSON.parse(fs.readFileSync("_raw_assets/template_kit/traderoom-online-trading-courses-elementor-templ-2024-08-20-08-45-17-utc/manifest.json", "utf8"));
manifest.images.forEach(img => {
  console.log(`${img.filename} -> ${img.thumbnail_url}`);
});
