/* ============================================
   vite.config.ts – Progress app
   - Viktig: base for GitHub Pages under /SystemHub
   - Alias @ → /packages/toolbar-core/src
   ============================================ */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  base: "/SystemHub/", // <<— KRITISK for gh-pages på https://.../SystemHub/
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../packages/toolbar-core/src"),
    },
  },
})
