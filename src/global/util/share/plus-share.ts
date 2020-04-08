import { getPlus } from '../plus'
import CbError from '../error'
import { shareConfig, E_SHARE_TYPE, IShareParam } from './config'

const shareByPlus = (type: E_SHARE_TYPE, params: { [propName: string]: any }) =>
  new Promise((resolve, reject) => {
    getPlus()
      .then((plus: any) => {
        // 获取分享服务
        plus.share.getServices((svs: any[]) => {
          // 当前类型
          const {
            plusID,
            appid,
            appkey,
            appsecret,
            redirect_url,
            plusScene
          } = shareConfig[type]

          // 检查plus是否支持当前分享
          const sv: any = svs.find(sv => sv.id === plusID)
          if (!sv) {
            return reject(new CbError(`plus不支持${type}分享`, 404))
          }

          // 添加场景
          params.extra = {}
          plusScene && (params.extra.scene = plusScene)

          // 检查是否认证
          if (!sv.authenticated) {
            return sv.authorize(
              () => sv.send(params, resolve, reject),
              reject,
              { appid, appkey, appsecret, redirect_url }
            )
          }

          // 已经认证
          sv.send(params, resolve, reject)
        },                     reject)
      })
      .catch(reject)
  })

// 分享连接
export const shareUrlByPlus = (type: E_SHARE_TYPE, params: IShareParam) =>
  new Promise((resolve, reject) => {
    // 组装数据
    const data: any = {
      href: params.url, // 分享连接
      title: params.title, // 分享标题
      content: params.description, // 分享描述
      thumbs: [params.pic]
    }

    // QQ
    if (type === E_SHARE_TYPE.QQ) {
      data.type = 'image'
    }

    // 微信
    if (type === E_SHARE_TYPE.WEIXIN || type === E_SHARE_TYPE.WEIXIN_TIMELINE) {
      data.type = 'web'
    }

    // 新浪微博
    if (type === E_SHARE_TYPE.SINA_WEIBO) {
      data.type = 'web'

      // Todo 仅支持本地图片
      data.pictures = [params.pic]
    }

    // 分享
    shareByPlus(type, data)
      .then(resolve)
      .catch(reject)
  })
