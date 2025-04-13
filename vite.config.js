import { defineConfig } from "vite";
import { exec } from "child_process";

export default defineConfig({
  base: "/fractals-mania/",
  plugins: [
    {
      name: "update-paths",
      closeBundle() {
        // Run the script after the build completes
        exec("ts-node update-paths.js", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
      },
    },
  ],
});
