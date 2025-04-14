import { defineConfig } from 'tsup'
import { readFileSync } from 'fs'

const pkgJson = JSON.parse(readFileSync('package.json', 'utf-8'))

export default defineConfig([
  {
    entry: {'authorizer/index': '../utils-authorizer/src/handler.ts'},
    target: 'node22',
    clean: true,
    minify: true,
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
    },
    noExternal: ['aws-lambda', 'jsonwebtoken', 'jwks-rsa', 'idtoken-verifier', 'uuid', 'jwt-decode'],
  },
  {
    entry: {'graphql-server/index': 'src/index.ts'},
    target: 'node22',
    clean: true,
    // minify: true,
    noExternal: Object.keys(pkgJson.dependencies),
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
    },
  }
])
