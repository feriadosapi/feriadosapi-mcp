import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/stdio.ts"],
    format: ["esm"],
    target: "node18",
    outDir: "dist",
    clean: true,
    banner: {
        js: "#!/usr/bin/env node",
    },
});
