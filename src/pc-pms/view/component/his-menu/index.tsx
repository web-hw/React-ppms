import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Icon } from 'antd'

import { local } from 'global@util/storage'
const style = require('./style')

interface IPropsHisMenu extends RouteComponentProps {
  menus: { title: string; path: string }[]
  onDelMenu: (path: string) => void
}

interface IStateHisMenu {
  mWidth: number // 菜单项宽度
  mLeft: number
  oLeft: boolean
  oRight: boolean
  cmPaddingLeft: number
  cmPaddingRight: number
}

export default withRouter(
  class HisMenu extends React.PureComponent<IPropsHisMenu, IStateHisMenu> {
    private HIS_MENU_META = 'HIS_MENU_META'
    private _cbMenu: HTMLDivElement = null
    private resizeTimer: any = null

    private getMoveOffset() {
      const { mWidth } = this.state
      if (mWidth) {
        return mWidth
      }

      const elem: any = this._cbMenu.querySelector('span')
      const elemW =
        elem.offsetWidth +
        parseInt(window.getComputedStyle(elem, null).marginRight, 10)

      this.setState({ mWidth: elemW })
      local.set(this.HIS_MENU_META, {
        ...local.get(this.HIS_MENU_META),
        mWidth: elemW
      })
    }

    private initPaddingLeftRight() {
      clearTimeout(this.resizeTimer)

      this.resizeTimer = setTimeout(() => {
        if (!this._cbMenu) {
          return
        }

        const meta = local.get(this.HIS_MENU_META) || {}
        if (meta[window.innerWidth]) {
          this.setState(meta[window.innerWidth])
        } else {
          const cmWidth = +this._cbMenu.offsetWidth
          const mWidth = this.getMoveOffset()

          // 有效展示数
          const menus = Math.floor(cmWidth / mWidth)
          // 设置容器padding
          const remainW = cmWidth - menus * mWidth
          const addPD = remainW / 2
          const state = {
            cmPaddingLeft: addPD,
            cmPaddingRight: remainW - addPD
          }
          this.setState(state)
          local.set(this.HIS_MENU_META, { ...meta, [window.innerWidth]: state })
        }

        this.checkOLeftRight(this.state.mLeft)
      },                            600)
    }

    private checkOLeftRight(mLeft: number) {
      if (!this._cbMenu) {
        return
      }

      const elem: any = this._cbMenu.querySelector('.his-menu-ct')
      const sclElem: any = this._cbMenu.querySelector('.his-menu-items')
      const ofstW = +elem.offsetWidth
      const sclW = +sclElem.offsetWidth
      this.setState({
        oLeft: mLeft < 0,
        oRight: ofstW + Math.abs(mLeft) < sclW
      })
    }

    private onClickLeftRight(event: any) {
      const target = event.currentTarget
      const className = target.className || ''
      // 无溢出历史菜单
      if (!className.includes('active')) {
        return
      }

      const elemW = this.getMoveOffset()
      let { mLeft } = this.state
      mLeft = className.includes('prev') ? mLeft + elemW : mLeft - elemW

      this.setState({ mLeft })
      this.checkOLeftRight(mLeft)
    }

    constructor(props: IPropsHisMenu) {
      super(props)

      const meta = local.get(this.HIS_MENU_META) || {}
      const cmMeta = meta[window.innerWidth] || {}
      this.state = {
        mLeft: 0,
        oLeft: false,
        oRight: false,
        mWidth: meta.mWidth || 0,
        cmPaddingLeft: cmMeta.cmPaddingLeft || 0,
        cmPaddingRight: cmMeta.cmPaddingRight || 0
      }

      this.onClickLeftRight = this.onClickLeftRight.bind(this)
      this.initPaddingLeftRight = this.initPaddingLeftRight.bind(this)
    }

    componentDidMount() {
      this.initPaddingLeftRight()
      window.addEventListener('resize', this.initPaddingLeftRight)
    }

    componentWillReceiveProps(nextProps: IPropsHisMenu) {
      if (nextProps.menus !== this.props.menus) {
        setTimeout(() => this.checkOLeftRight(this.state.mLeft))
      }
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.initPaddingLeftRight)
    }

    render() {
      const { oLeft, oRight, mLeft, cmPaddingLeft, cmPaddingRight } = this.state
      const { menus, onDelMenu, location, history } = this.props

      return (
        <div className={`${style.hisMenu} wp100 palt bsb`}>
          <div className="content wp100 hp100 bsb">
            <span
              onClick={this.onClickLeftRight}
              className={`${oLeft ? 'active' : ''} prev cp`}
            >
              <Icon type="left" />
            </span>
            <div
              ref={el => (this._cbMenu = el)}
              className="his-menu-cb wp100 hp100 bsb"
              style={{
                paddingLeft: `${cmPaddingLeft}px`,
                paddingRight: `${cmPaddingRight}px`
              }}
            >
              <div className="his-menu-ct wp100 hp100 pr oh">
                <div
                  className="his-menu-items palt hp100"
                  style={{ left: `${mLeft}px` }}
                >
                  {menus.map((m: any) => {
                    const isAct = location.pathname === m.path

                    return (
                      <span
                        key={m.path}
                        className={isAct ? 'active' : ''}
                        onClick={() => !isAct && history.push(m.path)}
                      >
                        <div>{m.title}</div>
                        {!isAct && (
                          <Icon
                            type="close-circle"
                            onClick={(e: any) => {
                              e.stopPropagation()
                              onDelMenu(m.path)
                            }}
                          />
                        )}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
            <span
              onClick={this.onClickLeftRight}
              className={`${oRight ? 'active' : ''} next cp`}
            >
              <Icon type="right" />
            </span>
          </div>
        </div>
      )
    }
  }
)
