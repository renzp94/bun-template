import { defineConfig } from '@nubuild/cli'

export default defineConfig({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  naming: '[name].[ext]',
  splitting: true,
  minify: true,
  format: 'esm',
  clean: true,
  dts: true,
})
