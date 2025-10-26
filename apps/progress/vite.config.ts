import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Bruk env-variabel fra workflow (fallback for lokal dev)
const base = process.env.VITE_BASE || "/";

// Absolutte stier (ESM-trygt)
const here = fileURLToPath(new URL(".", import.meta.url)); // .../apps/progress/
const toolbarSrc = path.resolve(here, "../../packages/toolbar-core/src");

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
    },
  },
});
