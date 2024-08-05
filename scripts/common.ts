import { exists, readdir } from 'node:fs/promises'

/**
 * 打包
 */
export const build = () => Bun.$`bun run build`

/**
 * npm发布
 */
export const npmPublish = async () => {
  await Bun.$`bunx standard-version`
  await Bun.$`npm publish`
}

/**
 * 获取jsr导出路径
 */
const getExports = async () => {
  const files = await readdir('./src')
  const exports = files
    .filter((file) => !file.includes('_'))
    .reduce((prev, file) => {
      if (file === 'index.ts') {
        return { ...prev, '.': './src/index.ts' }
      }

      return {
        ...prev,
        [`./${file.replace('.ts', '')}`]: `./src/${file}`,
      }
    }, {})

  return exports
}

/**
 * jsr发布
 */
export const jsrPublish = async () => {
  const pkg = await Bun.file('./package.json').json()
  const hasJsrJson = await exists('./jsr.json')
  const jsr = hasJsrJson ? await Bun.file('./jsr.json').json() : {}

  if (jsr.version === pkg.version) {
    console.log('无新版本发布')
    return
  }

  const exports = await getExports()
  const jsrConfig = {
    name: pkg.name,
    version: pkg.version,
    exports,
  }

  await Bun.write('./jsr.json', JSON.stringify(jsrConfig, null, 2))
  await Bun.$`bunx jsr publish --allow-dirty`
  await Bun.$`git add jsr.json`
  await Bun.$`git commit -m "chore(jsr:${jsrConfig.version}): published"`
}
