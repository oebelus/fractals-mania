import fs from "fs";
import path from "path";

function updatePathsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Update all absolute paths
  content = content.replace(
    /(href|src)=["']\/([^"']*)["']/g,
    (match, attr, urlPath) => `${attr}="/fractals-mania/${urlPath}"`
  );

  // Update specific patterns
  content = content.replace(
    'src="../src/main.ts"',
    'src="../assets/index-CABlTxDV.js"'
  );

  // Fix double slashes
  content = content.replace(/\/\/+/g, "/");

  // Add base tag if missing
  if (!content.includes('<base href="/fractals-mania/">')) {
    content = content.replace(
      /<head>([\s\S]*?)<\/head>/,
      `<head>$1<base href="/fractals-mania/"></head>`
    );
  }

  fs.writeFileSync(filePath, content);
}

function updateScriptPaths(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      updateScriptPaths(filePath);
    } else if (file.endsWith(".html")) {
      updatePathsInFile(filePath);
      console.log(`Updated paths in: ${filePath}`);
    }
  });
}

updateScriptPaths("./dist");
