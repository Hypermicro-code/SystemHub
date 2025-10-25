import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Bruk env-variabel fra workflow (fallback for lokal dev)
const base = process.env.VITE_BASE || "/";

// Absolutte stier (ESM-trygt)
const here = fileURLToPath(new URL(".", import.meta.url)); // .../apps/progress/
const toolbarSrc = path.resolve(here, "../../packages/toolbar-core/src");
const reactI18nextShim = path.resolve(toolbarSrc, "shims/react-i18next.ts");

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 5173 },
  build: { outDir: "dist" },

  resolve: {
    preserveSymlinks: true,
    alias: {
      // ← Lar ToolbarCore sin interne import "@/..." fungere
      "@": toolbarSrc,

      // ← Midlertidig stub til vi setter opp ekte i18n
      "react-i18next": reactI18nextShim,
    },
  },
});
