import { defineConfig } from 'tsup'
import fs from 'fs'
import config from './config.json'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig([
  {
    entry: ['src/core/server.ts'],
    target: 'node22',
    clean: true,
    minify: config.NODE_ENV === 'production',
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
    },
    noExternal: Object.keys(pkgJson.dependencies),
    external: [
      '@nestjs/platform-express',
      '@nestjs/common',
      '@nestjs/core',
      '@nestjs/config',
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
    ],
  },
  {
    entry: ['src/core/authorizer.ts'],
    target: 'node22',
    clean: true,
    minify: config.NODE_ENV === 'production',
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
    },
    noExternal: ['aws-lambda', 'jsonwebtoken', 'jwks-rsa', 'idtoken-verifier', 'uuid', 'jwt-decode'],
  },
])
