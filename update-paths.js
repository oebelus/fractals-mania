import fs from "fs";
import path from "path";

const distPath = "./dist/pages";

function updateScriptPaths(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      updateScriptPaths(filePath);
    } else if (file.endsWith(".html")) {
      let content = fs.readFileSync(filePath, "utf8");
      content = content.replace(
        'src="../src/main.ts"',
        'src="../assets/index-CABlTxDV.js"'
      );
      fs.writeFileSync(filePath, content);
    }
  });
}

updateScriptPaths(distPath);
console.log("HTML script paths updated successfully!");
