import { defineConfig } from 'tsup'
import fs from 'fs'
import config from './config.json'
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig([
  {
    entry: {'app/http': 'src/http.ts'},
    target: 'node18',
    clean: true,
    minify: config.NODE_ENV === 'production',
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
      opts.plugins = [
        ...opts.plugins,
        nodeModulesPolyfillPlugin({
          // modules: ['crypto'],
          global: {
            crypto: true,
          },
        }),
      ]
    },
    noExternal: [
      ...Object.keys(pkgJson.dependencies),
      'crypto',
    ],
    external: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'nats',
      '@grpc/grpc-js',
      '@grpc/proto-loader',
      'kafkajs',
      'amqplib',
      'amqp-connection-manager',
      'mqtt',
      'amqplib',
      'redis',
      'crypto',
    ],
  },
  {
    entry: {'authorizer/index': '../utils-authorizer/src/handler.ts'},
    target: 'node18',
    clean: true,
    minify: config.NODE_ENV === 'production',
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
    },
    noExternal: ['aws-lambda', 'jsonwebtoken', 'jwks-rsa', 'idtoken-verifier', 'uuid', 'jwt-decode'],
  },
])
