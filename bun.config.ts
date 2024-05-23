import dts from 'bun-plugin-dts'
import { defineConfigs, getEntrypoints } from './scripts/common'

const entrypoints = await getEntrypoints()

export default defineConfigs({
  entrypoints,
  outdir: './dist',
  naming: '[name].[ext]',
  splitting: true,
  minify: true,
  format: 'esm',
  plugins: [dts()],
})
