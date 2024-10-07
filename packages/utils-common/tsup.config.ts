import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    target: 'node18',
    clean: true,
    minify: true,
    dts: true,
  })
