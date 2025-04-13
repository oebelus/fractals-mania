import fs from "fs";
import path from "path";

function updateFilePaths(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  content = content.replace(
    /(href|src)=["'](?!\/fractals-mania\/)(\/[^"']*)["']/g,
    (match, attr, urlPath) => `${attr}="/fractals-mania${urlPath}"`
  );

  fs.writeFileSync(filePath, content);
}

updateFilePaths("./dist/pages");
updateFilePaths("./dist");
