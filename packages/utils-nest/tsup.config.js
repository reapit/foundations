import { defineConfig } from 'tsup'
import fs from 'fs'
import { resolve } from 'path'

const pkgJson = JSON.parse(fs.readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node14',
  clean: true,
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.js']
  },
  dts: true,
  noExternal: Object.keys(pkgJson.dependencies),
})
