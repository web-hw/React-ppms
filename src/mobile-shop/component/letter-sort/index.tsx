import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

import { throttle } from 'global@util/throttle'
const style = require('./style')

interface IPropsLetterSort {
  letters: string[]
  icon?: string
}

interface IStateLetterSort {
  currLetter: string
}

export default class LetterSort extends React.PureComponent<
  IPropsLetterSort,
  IStateLetterSort
> {
  // 滚动容器
  private timer: any = null
  private _scrollElem: HTMLDivElement = null

  // scroll event
  private onScroll(event: React.UIEvent<HTMLDivElement>) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      // 滚动容器
      const scrollEl: any = this._scrollElem
      if (!scrollEl) {
        return
      }
      // 滚动容器的高度
      const scrollElHd = scrollEl.offsetHeight

      // 获取窗口中心元素
      const mdEl = Array.prototype.find.call(
        scrollEl.querySelectorAll('[data-anchor]'),
        (el: any) => {
          const ofstTop = el.offsetTop - scrollEl.scrollTop
          const elHd = el.offsetHeight
          const baseLine = 0 // scrollElHd / 2

          return baseLine >= ofstTop && baseLine <= ofstTop + elHd
        }
      )

      // 添加激活样式
      const currLetter = mdEl ? mdEl.getAttribute('data-anchor') || '' : ''

      this.setState({ currLetter: currLetter.toLowerCase() })
    },                      100)
  }

  // 选中字母
  private onSelectLetter(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target: any = event.target
    if (!target || target.nodeName !== 'SPAN') {
      return
    }

    // 锚点
    const anchor = (target.getAttribute('data-anchor') || '').toLowerCase()
    if (!anchor) {
      return
    }

    // 滚动容器
    const scrollEl = this._scrollElem
    if (!scrollEl) {
      return
    }
    // 滚动容器的高度
    const scrollElHd = scrollEl.offsetHeight

    // 锚点目标元素
    const anchorTgtEl: any = scrollEl.querySelector(`[data-anchor="${anchor}"]`)
    if (!anchorTgtEl) {
      return
    }

    // 锚点目标元素相对于父容器的位置
    const anchorTgtTop = anchorTgtEl.offsetTop
    // 基线
    const baseLine = 0 // scrollElHd / 2
    // 滚动到中心的位置
    const top = anchorTgtTop - baseLine + 1

    scrollEl.scrollTo({ top: top > 0 ? top : 0 })
  }

  constructor(props: IPropsLetterSort) {
    super(props)

    const { letters = [] } = props
    this.state = {
      currLetter: letters.includes('#')
        ? '#'
        : (letters[0] || '#').toLowerCase()
    }

    // this.onScroll = throttle(this.onScroll.bind(this))
    this.onScroll = this.onScroll.bind(this)
    this.onSelectLetter = this.onSelectLetter.bind(this)
  }

  componentWillReceiveProps(nextProps: IPropsLetterSort) {
    // letter默认值修改
    const nletters = nextProps.letters || []
    const oletters = this.props.letters || []
    if (nletters.join('') !== oletters.join('')) {
      this.setState({
        currLetter: nletters.includes('#')
          ? '#'
          : (nletters[0] || '#').toLowerCase()
      })
    }
  }

  render() {
    const {
      letters = [],
      icon = require('../../assets/images/phn-ctt-my-icon.png')
    } = this.props
    // letters.length > 0 && !letters.includes('#') && letters.push('#')

    return (
      <div className="wp100 hp100 pr">
        <div
          ref={el => (this._scrollElem = el)}
          onScrollCapture={this.onScroll}
          className="wp100 hp100 oay sb"
        >
          {this.props.children}
        </div>
        {letters.length > 0 && (
          <div className={style.letters}>
            <span
              className="cb-icon"
              style={{
                backgroundImage: icon ? `url(${icon})` : 'none'
              }}
            />
            <div
              onClickCapture={this.onSelectLetter}
              className="wp100 hp100 pr"
            >
              <div className="wp100 sb oay">
                {letters.map(letter => (
                  <span
                    key={letter}
                    className={
                      this.state.currLetter === letter.toLowerCase()
                        ? 'active'
                        : ''
                    }
                    // onClick={this.onScrollByAnchor}
                    data-anchor={letter.toLowerCase()}
                  >
                    {letter.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
