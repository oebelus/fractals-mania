import fs from "fs";
import path from "path";

function updateScriptPaths(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);

    if (file.endsWith(".html")) {
      let content = fs.readFileSync(filePath, "utf8");
      content = content.replace(
        'src="../src/main.ts"',
        'src="../assets/index-CABlTxDV.js"'
      );

      content = content.replace(
        'href="/pages/',
        'href="/fractals-mania/pages/'
      );

      content = content.replace(
        'href="/style.css"',
        'href="/fractals-mania/style.css/"'
      );

      fs.writeFileSync(filePath, content);
    }
  });
}

updateScriptPaths("./dist/pages");
updateScriptPaths("./dist");
