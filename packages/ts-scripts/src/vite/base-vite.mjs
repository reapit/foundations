import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgrPlugin from '@svgr/rollup'
import wyw from '@wyw-in-js/vite'
import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve as _resolve } from 'path'
import topLevelAwait from 'vite-plugin-top-level-await'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default (config, appName) =>
  defineConfig(async ({ mode }) => ({
    plugins: [
      topLevelAwait(),
      react(),
      svgrPlugin({
        icon: true,
      }),
      await import('vite-plugin-graphql-loader').then((module) => module.default()),
      wyw({
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
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['assets/favicon.ico'],
        disable: mode !== 'production',
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
        workbox: {
          maximumFileSizeToCacheInBytes: 2500000,
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
      alias: [{ find: '@', replacement: `${_resolve(process.cwd(), 'src')}/` }],
    },
    server: {
      host: 'localhost',
      port: 8080,
    },
  }))
