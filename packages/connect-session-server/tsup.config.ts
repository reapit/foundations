import { defineConfig } from 'tsup';
import fs from 'fs';

const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

export default defineConfig({
    entry: ['src/index.ts'],
    target: 'node18',
    outDir: 'dist',
    clean: true,
    minify: process.env.NODE_ENV === 'production',
    esbuildOptions: (opts) => {
      opts.resolveExtensions = ['.ts', '.mjs', '.js'];
    },
    noExternal: Object.keys(pkgJson.dependencies),
  })
