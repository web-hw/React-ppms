import { getPositionByAMap } from './js-amap'
import { getPositionByPlus } from './plus-amap'
export * from './js-amap'

/**
 * app | h5定位
 * @param {object} config 定位配置
 * @returns {Promise} Promise对象
 */
export const getPostion = (
  config: { [propName: string]: any } = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    // 优先使用plus定位 -- app环境
    const plusCfg = { ...config, provider: 'amap' } // 可能字段名不一样
    getPositionByPlus(plusCfg)
      .then((res: any = {}) => {
        resolve(res)
      })
      .catch((err: Error) => {
        // sha1 -- BA:AD:09:3A:82:82:9F:B4:32:A7:B2:8C:B4:CC:F0:E9:F3:7D:AE:58
        // sha1 -- BB:AC:E2:2F:97:3B:18:02:E7:D6:69:A3:7A:28:EF:D2:3F:A3:68:E7
        const amapCfg = { ...config } // 可能字段名不一样
        // 浏览器环境 使用高德定位
        getPositionByAMap(amapCfg)
          .then((res: any = {}) => {
            resolve(res)
          })
          .catch(reject)
      })
  })
