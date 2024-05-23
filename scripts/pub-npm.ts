import configs from '../bun.config'
import { build, npmPublish } from './common'

const result = await build(configs)

if (result.success) {
  console.log('📦 打包成功 🎉🎉🎉')
  await npmPublish()
  await Bun.$`git push origin --follow-tags`
} else {
  console.log('📦 打包失败 🚨\n')
  console.log(result.logs)
}
