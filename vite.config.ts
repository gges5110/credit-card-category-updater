import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/category-parser.ts'),
      name: 'CreditCardCategoryParser',
      fileName: (format) => `category-parser.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['node-fetch', 'cheerio'],
      output: {
        globals: {
          'node-fetch': 'fetch',
          'cheerio': 'cheerio'
        }
      }
    },
    target: 'node18'
  },
  esbuild: {
    platform: 'node'
  }
});