import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Bruk env-variabel fra workflow (fallback for lokal dev)
const base = process.env.VITE_BASE || "/";

// Finn rot-tilstanden for prosjektet
const rootDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../..");

// Pek direkte på i18next i rotens node_modules
const i18nextPath = path.resolve(rootDir, "node_modules/i18next");

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
