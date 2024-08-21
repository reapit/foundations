import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {'authorizer/index': '../utils-authorizer/src/index.ts'},
    target: 'node18',
    clean: true,
    minify: true,
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
    },
    noExternal: ['aws-lambda', 'jsonwebtoken', 'jwks-rsa', 'idtoken-verifier', 'uuid', 'jwt-decode'],
  },
])
