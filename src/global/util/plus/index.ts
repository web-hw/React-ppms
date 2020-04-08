import CbError from '../error'
import { ams } from '../init'

/**
 * 获取plus对象
 * @returns {Promise} Promise对象
 */
export const getPlus = (): Promise<any> => {
  // let timer: any = null

  return new Promise((resolve, reject) => {
    const plus = ams.get().plus

    if (plus) {
      plus instanceof Error ? reject(plus) : resolve(plus)
    } else {
      window.addEventListener('load', () =>
        setTimeout(() => {
          const win: any = window
          if (win.plus && win.plus.device) {
            ams.set({ plus: win.plus })
            resolve(win.plus)
          } else {
            const err = new CbError('当前环境不支持plus', 404)
            ams.set({ plus: err })
            reject(err)
          }
          // const err = new CbError('当前环境不支持plus', 404)
          // ams.set({ plus: err })
          // reject(err)
        })
      )
    }
    // const win: any = window

    // if (win.plus && win.plus.device) {
    //   resolve(win.plus)
    // } else {
    //   // timer = setTimeout(
    //   //   () => reject(new CbError('当前环境不支持plus', 404)),
    //   //   2000
    //   // )
    //   // document.addEventListener('plusready', () => {
    //   //   clearTimeout(timer)
    //   //   getPlus().then(resolve)
    //   // })
    // }
  })
}
