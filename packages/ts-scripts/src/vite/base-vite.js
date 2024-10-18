const { defineConfig, splitVendorChunkPlugin } = require('vite')
const react = require('@vitejs/plugin-react-swc')
const svgrPlugin = require('@svgr/rollup')
const linaria = require('@linaria/vite').default
const checker = require('vite-plugin-checker').default
const { VitePWA } = require('vite-plugin-pwa')
const path = require('path')
const topLevelAwait = require('vite-plugin-top-level-await').default
const { sentryVitePlugin } = require('@sentry/vite-plugin')

module.exports = (config, appName) =>
  defineConfig(async ({ mode }) => ({
    plugins: [
      topLevelAwait(),
      react(),
      svgrPlugin({
        icon: true,
      }),
      await import('vite-plugin-graphql-loader').then((module) => module.default()),
      linaria({
        babelOptions: {
          presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
          plugins: [],
        },
      }),
      checker({
        typescript: true,
        overlay: false,
        enableBuild: mode === 'development',
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      splitVendorChunkPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['assets/favicon.ico'],
        enableBuild: mode !== 'development',
        manifest: {
          start_url: '/',
          name: appName,
          short_name: appName,
          description: appName,
          theme_color: '#fff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-152x152.png',
              sizes: '152x152',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
      process.env.IS_RELEASE &&
        sentryVitePlugin({
          include: `${process.cwd()}/build/**/*`,
          ignore: ['node_modules', `${process.cwd()}/build/**/*.svg`],
          configFile: `${process.cwd()}/.sentryclirc`,
          authToken: process.env.SENTRY_AUTH_TOKEN,
          silent: true,
          setCommits: {
            auto: true,
          },
          telemetry: false,
        }),
    ],
    build: {
      outDir: 'build',
      sourcemap: true,
    },
    define: {
      'process.env': {
        ...config,
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: `${path.resolve(process.cwd(), 'src')}/` }],
    },
    server: {
      host: 'localhost',
      port: 8080,
    },
  }))
