import configs from '../bun.config'
import { build, jsrPublish, npmPublish } from './common'

console.log('📦 打包中...')
const result = await build(configs)

if (result.success) {
  console.log('📦 打包成功 🎉🎉🎉')
  await npmPublish()
  await jsrPublish()
  await Bun.$`git push origin --follow-tags`
} else {
  console.log('📦 打包失败 🚨\n')
  console.log(result.logs)
}
