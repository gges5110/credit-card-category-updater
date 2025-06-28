import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),
        'category-parser': resolve(__dirname, 'src/category-parser.ts'),
      },
      external: ['node-fetch', 'cheerio', 'googleapis'],
      output: {
        entryFileNames: '[name].cjs',
        format: 'cjs'
      }
    },
    target: 'node18'
  },
  esbuild: {
    platform: 'node'
  }
});