import fs from "fs";
import path from "path";

function updateScriptPaths(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);

    if (file.endsWith(".html")) {
      let content = fs.readFileSync(filePath, "utf8");
      content = content.replace(
        /(href|src)=["']([^"']*)["']/g,
        (match, attr, urlPath) => {
          if (
            urlPath.startsWith("http") ||
            urlPath.startsWith("#") ||
            urlPath.includes("fractals-mania")
          ) {
            return match;
          }
          return `${attr}="/fractals-mania/${urlPath.replace(/^\//, "")}"`;
        }
      );
      fs.writeFileSync(filePath, content);
    }
  });
}

updateScriptPaths("./dist/pages");
updateScriptPaths("./dist");
