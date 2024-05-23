import configs from '../bun.config'
import { build } from './common'

console.log('📦 打包中...')
const result = await build(configs)

if (result.success) {
  console.log('📦 打包成功 🎉🎉🎉')
} else {
  console.log('📦 打包失败 🚨\n')
  console.log(result.logs)
}
