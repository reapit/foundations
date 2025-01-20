import { defineConfig } from 'tsup'
import fs from 'fs'
import config from './config.json'
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig([
  {
    entry: ['src/http.ts', 'src/sqs.ts', 'src/sns.ts', 'src/migration-run.ts'],
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
  {
    entry: ['src/resolve-production-s3-buckets.ts', 'src/resolve-production-apply-OAC-to-all-distros.ts'],
    target: 'node18',
    clean: true,
    minify: config.NODE_ENV === 'production',
  },
  {
    entry: ['src/temp-migration.ts', 'src/temp-s3-production-policy-match.ts'],
    target: 'node18',
    clean: true,
    minify: config.NODE_ENV === 'production',
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
  }
])
