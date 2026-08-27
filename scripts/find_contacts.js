const fs = require("fs");
const path = require("path");

function searchDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchDir(fullPath, pattern);
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(file)) {
      const content = fs.readFileSync(fullPath, "utf8");
      if (pattern.test(content)) {
        console.log(`Match in: ${fullPath}`);
      }
    }
  }
}

console.log("=== Matches for 98895 or Aishbagh / Moti ===");
searchDir("src", /98895|Aishbagh|Moti Jheel|SS\/46/i);
