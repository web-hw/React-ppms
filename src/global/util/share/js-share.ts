import { shareConfig, E_SHARE_TYPE, IShareParam } from './config'
import { loadScript } from '../load-script'
// import './style'

// base64 转码 | 解码
const base64 = {
  encode(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)))
  },

  decode(str: string) {
    return decodeURIComponent(escape(window.atob(str)))
  }
}

enum BW {
  QQ = 'qq', // qq 浏览器
  UC = 'uc', // uc 浏览器
  WX = 'wx', // 微信浏览器
  SINA = 'sina', // 新浪
  I_QQ = 'iqq', // QQ内置浏览器
  OTHER = 'other' // 其他浏览器
}

enum PF {
  ANDROID = 'android', // android
  IOS = 'ios',
  OTHER = 'other' // 其他平台
}

const getDevice = () => {
  const ua = navigator.userAgent.toLowerCase()

  // 获取浏览器版本
  const getVersion = (str: string) => {
    const vss = ua.split(str)[1].split('.')

    return parseFloat(`${vss[0]}.${vss[1]}`)
  }

  // 检测平台
  let pf = PF.OTHER
  if (ua.indexOf(PF.ANDROID) !== -1) {
    pf = PF.ANDROID
  } else if (
    ua.indexOf('iphone') !== -1 ||
    ua.indexOf('ipad') !== -1 ||
    ua.indexOf('ipod') !== -1
  ) {
    pf = PF.IOS
  }

  // 检测浏览器
  let bw = BW.OTHER
  // 浏览器版本
  let vs = 0
  if (ua.indexOf('ucbrowser') !== -1) {
    bw = BW.UC
    vs = getVersion('ucbrowser/')
  }
  if (ua.indexOf('mqqbrowser') !== -1) {
    bw = BW.QQ
    vs = getVersion('mqqbrowser/')

    // 微信 内置浏览器
    if (ua.indexOf('micromessenger') !== -1) {
      bw = BW.WX
    } else {
      // QQ 内置浏览器
      if (ua.indexOf('nettype') !== -1) {
        bw = BW.I_QQ
      }
    }
  }

  if (ua.indexOf('weibo') !== -1) {
    bw = BW.SINA
  }

  return { pf, bw, vs }
}

const device = getDevice()

// 通过scheme
const openAppByScheme = (scheme: string) => {
  const { pf } = device
  // ios
  if (pf === PF.IOS) {
    window.location.href = scheme
  }

  // android
  if (pf === PF.ANDROID) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = scheme
    document.body.appendChild(iframe)
    setTimeout(() => {
      iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe)
    },         2000)
  }
}

// web 分享
const WShare = (type: E_SHARE_TYPE, params: IShareParam) => {
  const win: any = window
  const share = win.mobShare

  if (!share) {
    return loadScript('http://f1.webshare.mob.com/code/mob-share.js', () =>
      WShare(type, params)
    )
  }

  share.config({
    params,
    debug: false,
    appkey: '2ae02a7a2d260'
  })

  // 处理微信朋友圈分享
  share(
    type === E_SHARE_TYPE.WEIXIN_TIMELINE ? E_SHARE_TYPE.WEIXIN : type
  ).send()
}

// UC 原生分享
const UCNShare = (app: string, type: E_SHARE_TYPE, params: IShareParam) => {
  const win: any = window
  const { ucweb, ucbrowser } = win
  const shareInfo = [
    params.title,
    params.description,
    params.url,
    app,
    '',
    '@',
    ''
  ]
  // android
  if (ucweb && ucweb.startRequest) {
    ucweb.startRequest('shell.page_share', shareInfo)
    // ios
  } else if (ucbrowser && ucbrowser.web_share) {
    ucbrowser.web_share.apply(null, shareInfo)
    // 不满足时，使用scheme分享
  } else {
    NSchemeShare(type, params)
  }
}

// QQ 原生分享
const QQNShare = (app: string, type: E_SHARE_TYPE, params: IShareParam) => {
  const win: any = window
  const { browser, qb } = win
  const { vs } = device
  const url =
    vs < 5.4
      ? '//3gimg.qq.com/html5/js/qb.js'
      : '//jsapi.qq.com/get?api=app.share'
  if (!browser && !qb) {
    return loadScript(url, () => QQNShare(app, type, params))
  }

  let share
  if (qb) {
    share = qb.share
  }
  if (browser && browser.app) {
    share = browser.app.share
  }

  const shareInfo = {
    url: params.url,
    title: params.title,
    description: params.description,
    img_url: params.pic,
    img_title: params.title,
    to_app: app,
    cus_txt: params.reason
  }

  if (!share) {
    NSchemeShare(type, params)
  } else {
    share(shareInfo)
  }
}

// QQ内置浏览器分享
const QQNIShare = (type: E_SHARE_TYPE, params: IShareParam) => {
  const win: any = window
  const { setShareInfo } = win
  if (!setShareInfo) {
    loadScript('//qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js', () =>
      QQNIShare(type, params)
    )
  }

  // URL PIC 资源需要在同一域名下， 点击QQ自带的分享进行分享
  setShareInfo({
    title: params.title,
    summary: params.description,
    pic: 'http://ams.frpgz1.idcfengye.com/images/test.e6d7d408.png',
    url: 'http://ams.frpgz1.idcfengye.com/home'
  })

  addGuidePage()
}

// 微信内置分享
const WXNIShare = (type: E_SHARE_TYPE, params: IShareParam) => {
  // Todo 添加微信内置分享
  addGuidePage()
}

// sina 内置分享
const SINANIShare = (type: E_SHARE_TYPE, params: IShareParam) => {
  // Todo 新浪内置分享
  addGuidePage()
}

// 添加引导页
const addGuidePage = () => {
  let elem: any = document.querySelector('.cb-guide-page')
  if (elem) {
    return (elem.style.display = 'block')
  }

  elem = document.createElement('div')
  elem.className = 'cb-guide-page'
  elem.onclick = removeGuidePage
  elem.innerHTML = '<p>点击右上角(打开浏览器)分享</p>'

  document.body.appendChild(elem)
}

// 移除引导页
const removeGuidePage = (event: any) => {
  const elem: any = document.querySelector('.cb-guide-page')
  if (!elem) {
    return
  }

  elem.style.display = 'none'
}

const NSchemeShare = (type: E_SHARE_TYPE, params: IShareParam) => {
  let scheme: string = shareConfig[type].scheme

  let shareInfo: string[] = []

  if (type === E_SHARE_TYPE.QQ || type === E_SHARE_TYPE.Q_ZONE) {
    shareInfo = shareInfo.concat([
      `share_id=${shareConfig[type].appid}`,
      `url=${base64.encode(params.url)}`,
      `title=${base64.encode(params.title)}`,
      `description=${base64.encode(params.description)}`,
      `previewimageUrl=${base64.encode(params.pic)}`, // For IOS
      `image_url=${base64.encode(params.pic)}` // For Android
    ])
  }

  if (!scheme) {
    WShare(type, params)
  } else {
    // 拼接参数
    scheme += (scheme.indexOf('?') !== -1 ? '&' : '?') + shareInfo.join('&')
    // 唤醒app
    openAppByScheme(scheme)
  }
}

// native share
const NShare = (type: E_SHARE_TYPE, params: IShareParam) => {
  const { pf, bw } = device

  // QQ 内置浏览器分享
  if (bw === BW.I_QQ) {
    return QQNIShare(type, params)
  }

  // WX 内置分享
  if (bw === BW.WX) {
    return WXNIShare(type, params)
  }

  // 新浪内置分享
  if (bw === BW.SINA) {
    return SINANIShare(type, params)
  }

  const apps = shareConfig[type].apps || []
  // QQ 浏览器
  if (bw === BW.QQ && apps[2]) {
    return QQNShare(apps[2], type, params)
  }

  // UC 浏览器
  if (bw === BW.UC && pf === PF.IOS && apps[0]) {
    return UCNShare(apps[0], type, params)
  }
  if (bw === BW.UC && pf === PF.ANDROID && apps[1]) {
    return UCNShare(apps[1], type, params)
  }

  // scheme
  NSchemeShare(type, params)
}

export const JShare = (type: E_SHARE_TYPE, params: IShareParam) => {
  const { pf } = device

  if (pf === PF.IOS || pf === PF.ANDROID) {
    NShare(type, params)
  } else {
    WShare(type, params)
  }
}
