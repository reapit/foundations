import { defineConfig } from 'tsup'
import fs from 'fs'
import config from './config.json'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node22',
  clean: true,
  minify: config.NODE_ENV === 'production',
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js']
  },
  noExternal: Object.keys(pkgJson.dependencies),
  external: [],
})
