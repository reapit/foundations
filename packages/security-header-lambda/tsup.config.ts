import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'node16',
  clean: true,
  minify: true,
  esbuildOptions: (opts) => {
    opts.resolveExtensions = ['.ts', '.mjs', '.js']
  },
  external: [
    
  ],
})
