/* ============================================
   vite.config.ts – kun nødvendig alias for ToolbarCore
   ============================================ */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // @ → /packages/toolbar-core/src
      "@": path.resolve(__dirname, "../../packages/toolbar-core/src"),
    },
  },
})
