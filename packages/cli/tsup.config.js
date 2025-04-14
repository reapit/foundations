import { defineConfig } from 'tsup'
import fs from 'fs'

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node22',
  clean: true,
  minify: true,
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js']
    opts.plugins = [
      ...opts.plugins,
    ]
  },
  noExternal: [
    ...Object.keys(pkgJson.dependencies),
  ],
})
