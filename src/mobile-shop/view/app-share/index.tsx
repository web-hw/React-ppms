import * as React from 'react'
import {} from 'react-router-dom'
import {} from 'antd-mobile'

import { downloadJS } from 'global@util/download'
import { toast } from 'global@util/toast/mobile'
const style = require('./style')

interface IPropsAppShare {}

interface IStateAppShare {
  isWx: boolean
}

export default class AppShare extends React.PureComponent<
  IPropsAppShare,
  IStateAppShare
> {
  private download() {
    const u = navigator.userAgent
    const isWx = !!u.match(/MicroMessenger/i)
    if (isWx) {
      this.setState({ isWx })
    } else {
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isIOS) {
        location.href = 'https://apps.apple.com/cn/app/id1491295770'
      } else {
        const name = '爱米哒哒.apk'
        const url = 'https://www.amisheng.com/app/amdd.apk'
        if (!!u.match(/(vivo)|(huawei)/i)) {
          const a = document.createElement('a')
          a.setAttribute('href', url)
          a.setAttribute('download', name)
          a.click()
        } else {
          downloadJS(url, name, (type: any, data: any) => {
            if (type === 'error') {
              toast.info(data.message || '未知错误')
            }
          })
        }
      }
    }
  }

  constructor(props: IPropsAppShare) {
    super(props)

    this.state = {
      isWx: false
    }

    this.download = this.download.bind(this)
  }

  render() {
    const { isWx } = this.state

    return (
      <div className={`${style.appShare} wp100 hp100 bg-fff oh pr`}>
        {isWx && (
          <div className="wx-info wp100 hp100 palt zi100">
            <div className="wx-info-icon part">
              在微信中无法完成APP下载，请在右上角选择<span>浏览器中打开</span>
            </div>
          </div>
        )}
        <span
          onClick={this.download}
          className="download-btn fs15 tac palb bsb"
        >
          立即下载
        </span>
      </div>
    )
  }
}
