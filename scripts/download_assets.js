const fs = require("fs");
const path = require("path");
const https = require("https");

const manifest = JSON.parse(fs.readFileSync("_raw_assets/template_kit/traderoom-online-trading-courses-elementor-templ-2024-08-20-08-45-17-utc/manifest.json", "utf8"));
const outputDir = path.join(__dirname, "../public/images/traderoom");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`Already exists: ${path.basename(dest)}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        console.warn(`Failed ${response.statusCode} for ${url}`);
        return resolve();
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded: ${path.basename(dest)}`);
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${url}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  console.log(`Downloading ${manifest.images.length} assets...`);
  for (const img of manifest.images) {
    const filename = img.filename;
    const url = img.thumbnail_url || `https://traderoom.1onestrong.com/wp-content/uploads/2024/08/${filename}`;
    const dest = path.join(outputDir, filename);
    await downloadFile(url, dest);
  }
  console.log("All asset downloads finished.");
}

run();
