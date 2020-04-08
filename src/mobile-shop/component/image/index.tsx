import * as React from 'react'
import {} from 'react-router-dom'

const styles = require('./style')

interface IPropsImage {
  url: string
  className?: string
  defImg?: string
  style?: { [propName: string]: any }
  onClick?: Function
  fit?: 'fixed' | 'auto' | 'autoOfHidden'
}

interface IStateImage {}

export default class Image extends React.PureComponent<
  IPropsImage,
  IStateImage
> {
  private _defImg = require('../../assets/images/img-404.png')

  private onLoadImg(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    const { fit = 'autoOfHidden' } = this.props

    const target: any = event.target
    let w = '100%'
    let h = '100%'
    let l = '0'
    let t = '0'
    if (fit === 'auto' || fit === 'autoOfHidden') {
      const rw = parseFloat(target.naturalWidth)
      const rh = parseFloat(target.naturalHeight)
      const s = window.getComputedStyle(target.parentElement, null)
      const cw = parseFloat(s.width)
      const ch = parseFloat(s.height)

      if (!(isNaN(rw) || isNaN(rh) || isNaN(cw) || isNaN(ch))) {
        const sc = rw / rh
        const srw = sc * ch
        const srh = cw / sc
        if (srw !== srh) {
          const isWAuto = fit === 'auto' ? srw < srh : srw > srh
          if (isWAuto) {
            w = 'auto'
            l = `${(cw - srw) / 2}px`
          } else {
            h = 'auto'
            t = `${(ch - srh) / 2}px`
          }
        }
      }
    }

    target.style.width = w
    target.style.height = h
    target.style.marginTop = t
    target.style.marginLeft = l
  }

  constructor(props: IPropsImage) {
    super(props)

    this.onLoadImg = this.onLoadImg.bind(this)
  }

  render() {
    const {
      url,
      onClick,
      defImg = this._defImg,
      className = '',
      style = {}
    } = this.props

    return (
      <div
        style={{ ...style }}
        className={`${styles.image} ${className}`}
        onClick={onClick ? () => onClick() : null}
      >
        <img
          src={url || defImg}
          onLoad={this.onLoadImg}
          onError={(e: any) => (e.target.src = defImg)}
        />
      </div>
    )
  }
}
