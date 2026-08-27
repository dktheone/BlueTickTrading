const fs = require("fs");
const path = require("path");

function searchPhoneAddress(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchPhoneAddress(fullPath);
    } else if (/\.(tsx|ts|jsx|js)$/.test(file)) {
      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content.split("\n");
      lines.forEach((line, i) => {
        if (/phone|tel:|address|lucknow|motijheel|aishbagh|\+91/i.test(line)) {
          console.log(`${fullPath}:${i+1} -> ${line.trim()}`);
        }
      });
    }
  }
}
searchPhoneAddress("src");
