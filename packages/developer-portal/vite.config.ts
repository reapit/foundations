import { defineConfig, splitVendorChunkPlugin, createLogger } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import linaria from '@linaria/vite'
import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import config from './config.json'

const customLogger = createLogger()
const loggerWarn = customLogger.warn

customLogger.warn = (msg, options) => {
  if (msg.includes('vite:css') && msg.includes('@import must precede all other statements')) return
  loggerWarn(msg, options)
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    svgrPlugin(),
    linaria(),
    mode === 'development' &&
      checker({
        typescript: true,
        overlay: false,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
    splitVendorChunkPlugin(),
    nodePolyfills({
      protocolImports: true,
    }),
    mode !== 'development' &&
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['assets/favicon.ico'],
        manifest: {
          start_url: '/',
          name: 'Reapit Contact App',
          short_name: 'Contact',
          description: 'Contact app for Reapit Foundatioms',
          theme_color: '#262f69',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          elements: ['@reapit/elements'],
        },
      },
      onwarn(warning, warn) {
        // See https://github.com/TanStack/query/issues/5175
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        warn(warning)
      },
    },
  },
  define: {
    'process.env': {
      ...config,
    },
  },
  server: {
    host: true,
    port: 8080,
  },
  customLogger,
}))
