import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    outDir: "dist",
  },
  {
    entry: ["src/index.ts"],
    format: ["iife"],
    globalName: "IntlPhoneJS",
    minify: true,
    outDir: "dist",
    outExtension() {
      return {
        js: ".global.min.js",
      };
    },
  },
]);
