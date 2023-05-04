const { defineConfig, splitVendorChunkPlugin } = require('vite')
const react = require('@vitejs/plugin-react-swc')
const svgrPlugin = require('vite-plugin-svgr').default
const linaria = require('@linaria/vite').default
const checker = require('vite-plugin-checker').default
const { VitePWA } = require('vite-plugin-pwa')
const { nodePolyfills } = require('vite-plugin-node-polyfills')
const gql = require('vite-plugin-graphql-loader').default
const path = require('path')
const topLevelAwait = require('vite-plugin-top-level-await').default
const { sentryVitePlugin } = require('@sentry/vite-plugin')

module.exports = (config, appName) =>
  defineConfig(({ mode }) => ({
    plugins: [
      topLevelAwait(),
      react(),
      svgrPlugin(),
      gql(),
      linaria({
        babelOptions: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            [
              'module-resolver',
              {
                alias: {
                  '@': './src',
                },
              },
            ],
          ],
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
      process.env.IS_RELEASE &&
        sentryVitePlugin({
          include: `${process.cwd()}//build/**/*`,
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
      host: true,
      port: 8080,
    },
  }))
