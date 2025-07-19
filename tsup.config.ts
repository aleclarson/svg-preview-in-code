import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/extension.ts", "src/page/gallery/main.tsx"],
    format: "cjs",
    external: ["vscode"],
    treeshake: "smallest",
    outDir: "out",
    clean: true,
})