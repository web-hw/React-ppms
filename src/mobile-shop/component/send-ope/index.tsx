import * as React from 'react'
import {} from 'react-router-dom'
import { Grid } from 'antd-mobile'

const style = require('./style')

export enum EOpeType {
  ALBUM = 'album', // 相册
  SHOT = 'shot', // 录像
  SHOT_IMG = 'shotImg', // 拍照
  CALL = 'call', // 通话
  POSITION = 'position', // 位置
  BUS_CARD = 'busCard', // 名片
  FILE = 'file' // 文件
}

interface IOpe {
  type?: EOpeType
  icon: string
  title: string
}

interface IOpes {
  [EOpeType.ALBUM]?: IOpe
  [EOpeType.SHOT_IMG]?: IOpe
  [EOpeType.SHOT]?: IOpe
  [EOpeType.CALL]?: IOpe
  [EOpeType.POSITION]?: IOpe
  [EOpeType.BUS_CARD]?: IOpe
  [EOpeType.FILE]?: IOpe
}

const configs: IOpes = {
  [EOpeType.ALBUM]: {
    icon: require('./images/send-album.png'),
    title: '相册' // 相册 图片(放大) | 视频 mp3(播放)
  },
  [EOpeType.SHOT_IMG]: {
    icon: require('./images/send-shot.png'),
    title: '拍照' // 视频(播放)
  },
  [EOpeType.SHOT]: {
    icon: require('./images/send-shot.png'),
    title: '录像' // 视频(播放)
  },
  [EOpeType.CALL]: {
    icon: require('./images/send-call.png'),
    title: '通话'
  },
  [EOpeType.POSITION]: {
    icon: require('./images/send-position.png'),
    title: '位置'
  },
  [EOpeType.BUS_CARD]: {
    icon: require('./images/send-bus-card.png'),
    title: '名片' // 进入msg-info-detail
  },
  [EOpeType.FILE]: {
    icon: require('./images/send-file.png'),
    title: '文件' // 下载
  }
}

interface IPropsSendOpe {
  className?: string
  row?: number // 行数
  col?: number // 列数
  opes?: EOpeType[] | IOpes
  onSelect: (type: EOpeType) => void
}

interface IStateSendOpe {}

export default class SendOpe extends React.PureComponent<
  IPropsSendOpe,
  IStateSendOpe
> {
  // 操作项
  private _opes: any[] = []

  // 获取操作项
  private getOpes(): IOpe[] {
    const { opes } = this.props

    // default | array
    if (opes === undefined || opes instanceof Array) {
      return (opes instanceof Array ? opes : Object.keys(configs)).map(
        (type: EOpeType) => {
          const item = configs[type]

          item.type = item.type || type

          return item
        }
      )
    }

    // is object
    return Object.keys(opes).map((type: EOpeType) => {
      const item = opes[type]

      item.type = item.type || type

      return item
    })
  }

  // 点击操作项
  private onClick(item: any) {
    this.props.onSelect(item.type)
  }

  constructor(props: IPropsSendOpe) {
    super(props)

    this._opes = this.getOpes()

    this.onClick = this.onClick.bind(this)
  }

  render() {
    const { className = '', row = 2, col = 4 } = this.props
    return (
      <div
        className={`${style.cbSendOpe} ${className} cb-grid-no-dec wp100 hp100 fs0 oh`}
      >
        <Grid
          data={this._opes}
          hasLine={false}
          isCarousel={true}
          carouselMaxRow={row}
          columnNum={col}
          square={false}
          activeStyle={false}
          renderItem={item => (
            <div className="wp100 hp100 bsb">
              <img src={item.icon} title={item.title} />
              <span className="fs12 db tes plr10">{item.title}</span>
            </div>
          )}
          onClick={this.onClick}
        />
      </div>
    )
  }
}
