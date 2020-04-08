import { JShare } from './js-share'
import { shareUrlByPlus } from './plus-share'
import { IShareParam, E_SHARE_TYPE } from './config'

export const shareUrl = (type: E_SHARE_TYPE, params: IShareParam) =>
  new Promise((resolve, reject) => {
    shareUrlByPlus(type, params)
      .then(resolve)
      .catch((err: any) => {
        console.log(`plus错误: ${err.message} ${err.code}`)

        // 用户取消
        if (err.code === -2) {
          return
        }

        if (err.code === 404) {
          // 使用js分享
          try {
            JShare(type, params)
            resolve()
          } catch (err) {
            reject(err)
          }
          return
        }

        reject(err)
      })
  })

export { E_SHARE_TYPE }
