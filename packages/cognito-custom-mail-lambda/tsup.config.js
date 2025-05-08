import { defineConfig } from 'tsup'
import fs from 'fs'
import config from './config.json'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/app.ts'],
  target: 'node22',
  clean: true,
  minify: config.NODE_ENV === 'production',
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js', '.html']
    opts.loader['.html'] = 'text'
  },
  noExternal: Object.keys(pkgJson.dependencies),
  external: [],
})
