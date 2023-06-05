import { defineConfig } from 'tsup'
import fs from 'fs'
import config from './config.json'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/http.ts'],
  target: 'node18',
  clean: true,
  minify: config.NODE_ENV === 'production',
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js']
  },
  noExternal: Object.keys(pkgJson.dependencies),
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
  ],
})
