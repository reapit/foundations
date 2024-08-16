import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/authorizer/default-handler.ts'],
    target: 'node18',
    clean: true,
    minify: true,
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js']
    },
    noExternal: ['aws-lambda', 'jsonwebtoken', 'jwks-rsa', 'idtoken-verifier', 'uuid', 'jwt-decode', "aws-jwt-verify"],
  },
])
