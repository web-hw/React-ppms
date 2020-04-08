import * as React from 'react'
import {} from 'react-router-dom'
import { Grid } from 'antd-mobile'

import config from './config'
const style = require('./style')

interface IPropsEmoji {
  row?: number // 表情行数
  col?: number // 表情列数
  className?: string // 样式
  onSelect: (item: { id: string; html: string }) => void
}

interface IStateEmoji {}

export default class Emoji extends React.PureComponent<
  IPropsEmoji,
  IStateEmoji
> {
  // 表情数据
  private _emojis: {
    obj: {
      [propName: string]: IImg
    }
    arr: IImg[]
  }

  constructor(props: IPropsEmoji) {
    super(props)

    // 初始化表情数据
    this._emojis = emojis

    this.onClickEmoji = this.onClickEmoji.bind(this)
  }

  // 选择表情
  onClickEmoji(item: any) {
    this.props.onSelect({ id: item.id, html: item.html })
  }

  render() {
    const { row = 4, col = 10, className = '' } = this.props

    return (
      <div
        className={`${style.cbEmoji} ${className} cb-emoji cb-grid-no-dec wp100 hp100 fs0 oh`}
        // onClickCapture={event => event.preventDefault()}
        onClick={event => event.preventDefault()}
      >
        <Grid
          data={this._emojis.arr}
          hasLine={false}
          isCarousel={true}
          carouselMaxRow={row}
          columnNum={col}
          square={false}
          activeStyle={false}
          renderItem={Itm => <Itm.HTML />}
          onClick={this.onClickEmoji}
        />
      </div>
    )
  }
}

interface IImg {
  id: string
  src: string
  HTML: () => JSX.Element
  html: string
}
// 获取emojis数据
export const getEmojiImgs = () => {
  const obj: { [propName: string]: IImg } = {}
  const arr: IImg[] = []

  // 组装表情
  config.forEach((item: string) => {
    const id = `[${item}]`
    const src = require(`./images/emoji_${item}.png`)

    const data = {
      id,
      src,
      HTML: () => <img id={id} src={src} className={style.emojiImg} />,
      html: `<img id="${id}" src="${src}" class="${style.emojiImg}" />`
    }

    obj[id] = data
    arr.push(data)
  })

  return { obj, arr }
}
// 初始化emojis数据
export const emojis = getEmojiImgs()

// 转义msg
export const encodeMsg = (msg: string): string =>
  msg.replace(
    /(<img\sid="(\[[a-zA-Z0-9]{4}\])".*?(?:>|\/>))/gi,
    (match: string, $1: string, $2: string, index: number, msg: string) => {
      if ($1 && $2) {
        return $2
      }

      return match
    }
  )

// 解析msg
export const decodeMsg = (msg: string): string =>
  msg.replace(
    /(\[[a-zA-Z0-9]{4}\])/gi,
    (match: string, $1: string, index: number, msg: string) => {
      const emoji = emojis.obj[$1]
      if ($1 && emoji) {
        return emoji.html
      }

      return match
    }
  )
