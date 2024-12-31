import path from "path"
import fs from "fs/promises"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import type { Plugin } from 'vite'

// https://vitejs.dev/config/worker-options.html#worker-format
/// <reference types="vite/client" />
declare module 'monaco-editor/esm/vs/editor/editor.worker?worker' {
  const EditorWorker: {
    new (): Worker
  }
  export default EditorWorker
}

declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker' {
  const TsWorker: {
    new (): Worker
  }
  export default TsWorker
}


// Custom plugin to handle saving preview components
function previewPlugin(): Plugin {
  return {
    name: 'preview-handler',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/_preview/save') {
          const chunks = []
          req.on('data', chunk => chunks.push(chunk))
          req.on('end', async () => {
            try {
              const { code } = JSON.parse(Buffer.concat(chunks).toString())
              const previewPath = path.resolve(__dirname, 'src/preview/Preview.tsx')
              await fs.writeFile(previewPath, code)
              res.statusCode = 200
              res.end(JSON.stringify({ success: true }))
            } catch (error) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: error.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), previewPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
