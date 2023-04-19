const { defineConfig, splitVendorChunkPlugin } = require('vite')
const react = require('@vitejs/plugin-react')
const svgrPlugin = require('vite-plugin-svgr')
const linaria = require('@linaria/vite').default
const checker = require('vite-plugin-checker').default
const { VitePWA } = require('vite-plugin-pwa')
const { nodePolyfills } = require('vite-plugin-node-polyfills')

module.exports = (config, appName) =>
  defineConfig(({ mode }) => ({
    plugins: [
      react(),
      svgrPlugin(),
      linaria({
        babelOptions: {
          presets: ['@babel/preset-typescript', '@babel/preset-react'],
        },
      }),
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
            name: appName,
            short_name: appName,
            description: appName,
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
      rollupOptions: {},
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
  }))
