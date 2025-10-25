import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Bruk env-variabel fra workflow (fallback for lokal dev)
const base = process.env.VITE_BASE || "/";

// Absolutt sti til stubben
const here = fileURLToPath(new URL(".", import.meta.url)); // .../apps/progress/
const reactI18nextShim = path.resolve(
  here,
  "../../packages/toolbar-core/src/shims/react-i18next.ts"
);

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 5173 },
  build: { outDir: "dist" },

  resolve: {
    preserveSymlinks: true,
    alias: {
      "react-i18next": reactI18nextShim,
    },
  },
});
