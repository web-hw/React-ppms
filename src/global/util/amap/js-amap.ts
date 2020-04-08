import { loadScript } from '../load-script'

declare global {
  interface Window {
    AMap: any
  }
}

// 统一未知错误
const ERROR_UNKNOWN = '未知错误'
const ERROR_AMAP_UNDEFINED = 'window.AMap is undefined'

// 返回高德地图实例
export const getAMap = () =>
  new Promise((resolve, reject) => {
    const win = window
    let AMap = win.AMap || null

    const callback = () => {
      AMap = win.AMap || null

      AMap ? resolve(AMap) : reject(new Error(ERROR_AMAP_UNDEFINED))
    }

    if (AMap) {
      callback()
    } else {
      loadScript(
        'https://webapi.amap.com/maps?v=1.4.13&key=06a6687c045c9f9b9d9225949ecf8e31',
        callback
      )
    }
  })

/**
 * 高德定位
 * @param {object} config 参数 具体参考高德API
 * @returns {Promise<any>} 返回Promise对象
 */
export const getPositionByAMap = (
  config: { [propName: string]: any } = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    getAMap()
      .then((AMap: any) => {
        // 加载定位插件
        AMap.plugin('AMap.Geolocation', () => {
          // 定位对象
          const geolocation = new AMap.Geolocation({
            timeout: 10000,
            showButton: false,
            maximumAge: 2 * 60 * 1000,
            ...config
          })

          // 获取当前位置
          geolocation.getCurrentPosition()

          // 定位成功
          AMap.event.addListener(geolocation, 'complete', (data: any = {}) => {
            if (data.info !== 'SUCCESS') {
              console.log('position error:', data)
              return reject(new Error(data.info || ERROR_UNKNOWN))
            }

            // 组装数据
            const {
              position = {},
              accuracy,
              addressComponent = {},
              formattedAddress
            } = data
            const { lng, lat } = position
            const {
              citycode,
              street,
              streetNumber,
              province,
              city,
              district
            } = addressComponent
            let positionName = formattedAddress
            if (province && city && district && street && streetNumber) {
              positionName = `${province}${city}${district}${street}${streetNumber}`
            }
            const result: any = {
              province,
              city,
              district,
              street,
              positionName,
              streetNum: streetNumber,
              country: null,
              cityCode: citycode,
              address: formattedAddress,
              position: {
                lng,
                lat,
                accuracy,
                altitude: null, // 海拔
                altitudeAccuracy: null
              }
            }

            resolve(result)
          })

          // 定位失败
          AMap.event.addListener(geolocation, 'error', (err: any = {}) => {
            console.log('position error:', err)
            reject(new Error(err.message || ERROR_UNKNOWN))
          })
        })
      })
      .catch(reject)
  })

export const getAddressByPos = (
  pos: number[],
  config: { [propName: string]: any } = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    getAMap()
      .then((AMap: any) => {
        const geo = new AMap.Geocoder({
          radius: 0,
          batch: false,
          extensions: 'all',
          ...config
        })
        geo.getAddress(pos, (status: String, result: any) => {
          // 搜索失败
          if (status !== 'complete' && status !== 'no_data') {
            console.log('search error:', result)
            return reject(new Error(result.info || ERROR_UNKNOWN))
          }
          console.log(result)
          resolve(result.regeocode || {})
        })
      })
      .catch(reject)
  })

// 默认搜索类型
// const defSearchType = `汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务
// |生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体
// |科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施`
const defSearchType = ''

/**
 * 高德地方搜索对象
 * @param {object} config 搜索配置
 * @returns { Promise } Promise对象
 */
export const getPlaceSearchByAMap = (config: {
  [propName: string]: any
}): Promise<any> =>
  new Promise((resolve, reject) => {
    getAMap()
      .then((AMap: any) => {
        // 根据高德搜索实例搜索
        AMap.service(['AMap.PlaceSearch'], () => {
          // 构造地点查询类
          const placeSearch = new AMap.PlaceSearch({
            type: defSearchType, // 兴趣点类别
            ...config
          })

          resolve(placeSearch)
        })
      })
      .catch(reject)
  })

/**
 * 根据位置 | 关键字 搜索附近地点
 * @param {array} pos 位置
 * @param {object} config 配置
 * @param {number} radius 半径
 * @param {string} keyword 关键字
 */
export const getPlacesOfNearByAMap = (
  pos: number[], // 中心位置
  config: { [propName: string]: any } = {},
  radius: number = 1000, // 半径
  keyword: string = '' // 关键字
): Promise<any> =>
  new Promise((resolve, reject) => {
    getPlaceSearchByAMap(config)
      .then((placeSearch: any) => {
        placeSearch.searchNearBy(
          keyword,
          pos,
          radius,
          (status: string, result: any = {}) => {
            // 搜索失败
            if (status !== 'complete' && status !== 'no_data') {
              console.log('search near error:', result)
              return reject(new Error(result.info || ERROR_UNKNOWN))
            }

            resolve(result.poiList || {})
          }
        )
      })
      .catch(reject)
  })

/**
 * 根据关键字搜索
 * @param {string} keyword 关键字
 * @param {object} config 配置
 * @returns {Promise} Promise对象
 */
export const getPlacesByKeywordByAMap = (
  keyword: string,
  config: { [propName: string]: any } = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    getPlaceSearchByAMap(config)
      .then((placeSearch: any) => {
        placeSearch.search(keyword, (status: string, result: any = {}) => {
          // 搜索失败
          if (status !== 'complete' && status !== 'no_data') {
            console.log('search error:', result)
            return reject(new Error(result.info || ERROR_UNKNOWN))
          }

          resolve(result.poiList || {})
        })
      })
      .catch(reject)
  })
