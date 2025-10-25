import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Bruk env-variabel fra workflow (fallback for lokal dev)
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  plugins: [react()],
  base,
  server: { port: 5173 },
  build: { outDir: "dist" },

  // 👇 Legg til dette
  resolve: {
    preserveSymlinks: true,
    alias: {
      i18next: require.resolve("i18next"),
    },
  },
});
