import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Enkel Vite-konfig for dev og build
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: { outDir: "dist" }
});
