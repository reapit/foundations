import { defineConfig } from 'tsup'
import fs from 'fs'

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node16',
  clean: true,
  minify: true,
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js']
  },
  // noExternal: Object.keys(pkgJson.dependencies),
  external: [
    
  ],
})
