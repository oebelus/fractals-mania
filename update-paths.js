import fs from "fs";
import path from "path";

function updateScriptPaths(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
    } else if (file.endsWith(".html")) {
      let content = fs.readFileSync(filePath, "utf8");

      content = content.replace(
        /(href|src)=["']([^"']*)["']/g,
        (match, attr, urlPath) => {
          if (
            urlPath.startsWith("http") ||
            urlPath.startsWith("#") ||
            urlPath.startsWith("data:")
          ) {
            return match;
          }

          const cleanPath = urlPath.replace(/^\/?fractals-mania\//, "");

          // Handle different path cases
          if (cleanPath.startsWith("/")) {
            return `${attr}="/fractals-mania${cleanPath}"`;
          } else if (
            cleanPath.startsWith("./") ||
            cleanPath.startsWith("../")
          ) {
            const absolutePath = path.resolve(
              "/",
              path.dirname(filePath),
              cleanPath
            );
            return `${attr}="/fractals-mania${absolutePath}"`;
          } else {
            return `${attr}="/fractals-mania/${cleanPath}"`;
          }
        }
      );

      fs.writeFileSync(filePath, content);
      console.log(`Updated paths in: ${filePath}`);
    }
  });
}

updateScriptPaths("./dist");
