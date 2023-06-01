import { defineConfig } from 'tsup'
import fs from 'fs'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node18',
  clean: true,
  minify: true,
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
    '@aws/dynamodb-data-mapper',
    '@aws/dynamodb-data-mapper-annotations',
  ],
})
