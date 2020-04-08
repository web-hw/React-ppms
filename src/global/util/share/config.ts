interface IShareConfig {
  [propName: string]: {
    apps?: any[] // 用于QQ UC浏览器的原生分享
    scheme?: string // 用于通过scheme唤起分享
    plusID?: string // plus的id
    plusScene?: string // plus 场景 目前仅微信有效
    appid?: string // plus 微信 扣扣
    appkey?: string // plus 新浪微博
    appsecret?: string // plus 微信 新浪微博
    redirect_url?: string // plus 新浪微博
  }
}

export enum E_SHARE_TYPE {
  QQ = 'qq', // QQ好友
  Q_ZONE = 'qzone', // QQ空间
  WEIXIN = 'weixin', // 微信好友
  WEIXIN_TIMELINE = 'weixintimeline', // 微信朋友圈
  SINA_WEIBO = 'weibo' // 新浪微博
}

export interface IShareParam {
  url: string // 分享连接
  title: string // 标题
  description: string // 描述
  pic: string // 分享图片 多个使用,分割
  reason: string // 自定义评论内容
}

export const shareConfig: IShareConfig = {
  [E_SHARE_TYPE.WEIXIN]: {
    apps: ['kWeixin', 'WechatFriends', 1],
    plusID: 'weixin',
    appid: 'wx4868b35061f87885',
    appsecret: '64020361b8ec4c99936c0e3999a9f249',
    plusScene: 'WXSceneSession'
  },
  [E_SHARE_TYPE.WEIXIN_TIMELINE]: {
    apps: ['kWeixinFriend', 'WechatTimeline', 8],
    plusID: 'weixin',
    appid: 'wx4868b35061f87885',
    appsecret: '64020361b8ec4c99936c0e3999a9f249',
    plusScene: 'WXSceneTimeline'
  },
  [E_SHARE_TYPE.QQ]: {
    apps: ['kQQ', 'QQ', 4],
    plusID: 'qq',
    // appid: '100371282', // 1101685683
    appid: '101839324',
    scheme: 'mqqapi://share/to_fri?src_type=web&version=1&file_type=news'
  },
  [E_SHARE_TYPE.Q_ZONE]: {
    apps: ['kQZone', 'Qzone', 3],
    appid: '101839324',
    // ios scheme mqqapi://share/to_fri?file_type=news&src_type=web&version=1&generalpastboard=1&
    // shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A
    scheme:
      'mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1'
  },
  // 微博
  [E_SHARE_TYPE.SINA_WEIBO]: {
    apps: ['kSinaWeibo', 'SinaWeibo', 11],
    plusID: 'sinaweibo',
    appkey: '568898243',
    appsecret: '38a4f8204cc784f81f9f0daaf31e02e3',
    redirect_url: 'http://www.sharesdk.cn'
  }
}
