import { getPlus } from '../plus'

/**
 * plus定位
 * @param {object} config 参数 具体参考plus h5 API
 * @returns {Promise<any>} 返回Promise对象
 */
export const getPositionByPlus = (
  config: { [propName: string]: any } = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    getPlus()
      .then((plus: any) => {
        // 使用plus定位
        plus.geolocation.getCurrentPosition(
          (pos: any = {}) => {
            // 成功
            const { coordsType, address = {}, addresses, coords = {} } = pos
            if (coordsType !== 'gcj02') {
              return reject(new Error(`当前坐标系${coordsType}`))
            }

            // 组装数据
            const {
              country,
              province,
              city,
              district,
              street,
              streetNum,
              poiName,
              cityCode
            } = address
            const {
              latitude,
              longitude,
              accuracy,
              altitude,
              altitudeAccuracy
            } = coords
            let positionName = poiName
            if (province && city && district && street && streetNum) {
              positionName = `${province}${city}${district}${street}${streetNum}`
            }
            const result: any = {
              country,
              province,
              city,
              district,
              street,
              streetNum,
              cityCode,
              address: addresses,
              positionName: positionName || address,
              position: {
                accuracy,
                altitude, // 海拔
                altitudeAccuracy,
                lat: latitude,
                lng: longitude
              }
            }

            resolve(result)
          },
          reject, // 错误
          {
            enableHighAccuracy: true, // 是否使用高精度
            timeout: 10000, // 超时时间
            coordsType: 'gcj02', // 坐标系，由于当前应用使用的高德地图，避免再次转换
            geocode: true, // 是否解析地址
            maximumAge: 2 * 60 * 1000, // 获取位置的间隔
            ...config
          }
        )
      })
      .catch(reject)
  })
