import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env vars so the server plugin can access them
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      // Custom plugin to mount Express API routes in dev
      {
        name: 'api-server',
        configureServer: async (server) => {
          // Set env vars for the API proxy
          process.env.N8N_WEBHOOK_URL = env.N8N_WEBHOOK_URL || ''
          process.env.DEEPGRAM_API_KEY = env.DEEPGRAM_API_KEY || ''

          const { createApiRouter } = await import('./server/api.js')
          const router = createApiRouter()
          server.middlewares.use(router)

          console.log('🤖 Chat API proxy loaded')
          if (env.N8N_WEBHOOK_URL) {
            console.log('   ✅ N8N_WEBHOOK_URL configured')
          } else {
            console.log('   ⚠️  N8N_WEBHOOK_URL not set — create a .env file with N8N_WEBHOOK_URL=your_url')
          }
          if (env.DEEPGRAM_API_KEY) {
            console.log('   ✅ DEEPGRAM_API_KEY configured')
          } else {
            console.log('   ⚠️  DEEPGRAM_API_KEY not set — voice input will not work')
          }
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  }
})
