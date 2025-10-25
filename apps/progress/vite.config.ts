import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Bruk env-variabel fra workflow (fallback for lokal dev)
const base = process.env.VITE_BASE || "/";

// Hent faktisk sti til i18next-pakken på ESM-måte
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const i18nextPath = fileURLToPath(import.meta.resolve("i18next"));

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 5173 },
  build: { outDir: "dist" },

  resolve: {
    preserveSymlinks: true,
    alias: {
      i18next: i18nextPath,
    },
  },
});
