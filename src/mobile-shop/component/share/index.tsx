import * as React from 'react'
import {} from 'react-router-dom'
import { Modal, Button, Grid } from 'antd-mobile'

const style = require('./style')

enum EShareType {
  WEIXIN = 'weixin', // 微信好友
  QQ = 'qq', // QQ好友
  WEIXINTIMELINE = 'weixintimeline', // 微信朋友圈
  MY_FRIEND = 'myfriend' // 我的商友
}

interface IShare {
  title: string // title
  icon: string // 图标
  type?: EShareType // 类型
}

interface IShares {
  [EShareType.WEIXIN]?: IShare
  [EShareType.QQ]?: IShare
  [EShareType.WEIXINTIMELINE]?: IShare
  [EShareType.MY_FRIEND]?: IShare
}

const defShares: IShares = {
  [EShareType.WEIXIN]: {
    title: '微信好友',
    icon: require('./images/share-weixin.png')
  },
  [EShareType.QQ]: {
    title: 'QQ好友',
    icon: require('./images/share-qq.png')
  },
  [EShareType.WEIXINTIMELINE]: {
    title: '微信朋友圈',
    icon: require('./images/share-weixintimeline.png')
  },
  [EShareType.MY_FRIEND]: {
    title: '我的商友',
    icon: require('./images/share-myfriend.png')
  }
}

interface IPropsShare {
  col?: number // 列
  shares?: IShares | EShareType[] // 需要分享的类型
  onSelect: (type: string) => void
}

interface IStateShare {}

export default class Share extends React.PureComponent<
  IPropsShare,
  IStateShare
> {
  // 分享平台
  private _shares: IShare[] = []

  // 初始化分享平台
  private getShares(): IShare[] {
    const { shares } = this.props

    // default | array
    if (shares === undefined || shares instanceof Array) {
      return (shares instanceof Array ? shares : Object.keys(defShares)).map(
        (type: EShareType) => {
          const item = defShares[type]

          item.type = item.type || type

          return item
        }
      )
    }

    // is object
    return Object.keys(shares).map((type: EShareType) => {
      const item = shares[type]

      item.type = item.type || type

      return item
    })
  }

  constructor(props: IPropsShare) {
    super(props)

    this._shares = this.getShares()
  }

  render() {
    const { onSelect, col = 4 } = this.props

    return (
      <Grid
        data={this._shares}
        columnNum={col}
        square={false}
        hasLine={false}
        activeStyle={false}
        onClick={itm => onSelect(itm.type)}
        className={`${style.share} pt10`}
        renderItem={item => (
          <div className="wp100 pb10">
            <img src={item.icon} title={item.title} />
            <span className="fs13 db tes plr10 mt10">{item.title}</span>
          </div>
        )}
      />
    )
  }
}

interface IPropsSharePopup {
  isShow: boolean // 是否显示
  onClose: () => void // 关闭
  col?: number // 列数
  shares?: IShares | EShareType[] // 分享项
  title?: string // title
}

interface IStateSharePopup {}
// 分享popup
export class SharePopup extends React.PureComponent<
  IPropsSharePopup,
  IStateSharePopup
> {
  // 关闭
  private onClose() {
    this.props.onClose()
  }

  // 分享
  private onSelect(type: EShareType) {
    console.log(type)
  }

  constructor(props: IPropsSharePopup) {
    super(props)

    this.onClose = this.onClose.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  render() {
    const { isShow, col, shares, title = '分享到' } = this.props
    return (
      <Modal
        visible={isShow}
        onClose={this.onClose}
        title={title}
        popup={true}
        maskClosable={true}
        animationType="slide-up"
        className={style.sharePopup}
      >
        <Share col={col} shares={shares} onSelect={this.onSelect} />
        <Button onClick={this.onClose} className="mt10">
          取消
        </Button>
      </Modal>
    )
  }
}
