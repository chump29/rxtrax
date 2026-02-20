import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { ViteImageOptimizer as imageOptimizer } from "vite-plugin-image-optimizer"
import version from "vite-plugin-package-version"
import simpleHtml from "vite-plugin-simple-html"
import webFontDownload from "vite-plugin-webfont-dl"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    imageOptimizer(),
    react(),
    simpleHtml({
      minify: true,
      inject: {
        data: {
          title: "RxTrax"
        }
      }
    }),
    tailwindcss(),
    webFontDownload(
      ["https://fonts.googleapis.com/css2?family=Chango&display=swap"],
      { assetsSubfolder: "fonts", injectAsStyleTag: false }
    ),
    version()
  ],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["./src/**/*.test.tsx"],
    reporters: [["verbose", { summary: true }]],
    setupFiles: "./src/setup.ts",
    silent: true
  }
})
