import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'

import App from '../../view'
const style = require('./style')

interface IPropsHeader extends RouteComponentProps {
  left?: React.ReactNode // 左点内容
  right?: React.ReactNode // 右节点内容
  onClickLeft?: () => void // 左边点击事件
  children?: React.ReactNode
}

interface IStateHeader {}

export const Header: any = withRouter(
  class Header extends React.PureComponent<IPropsHeader, IStateHeader> {
    static goBack() {
      App.goBack()
    }

    constructor(props: IPropsHeader) {
      super(props)

      this.onGoBack = this.onGoBack.bind(this)
    }

    // 返回
    onGoBack() {
      this.props.history.goBack()
    }

    render() {
      const {
        left = <Icon type="left" className="cb-left-lg" size="lg" />,
        right = '',
        onClickLeft = Header.goBack
      } = this.props

      return (
        <NavBar
          mode="light"
          leftContent={
            <span onClick={onClickLeft} className="dib vat cb-left">
              {left}
            </span>}
          rightContent={right}
          className={`${style.header} cb-header palt wp100 bsb zi900`}
        >
          <div className="tes">{this.props.children}</div>
        </NavBar>
      )
    }
  }
)
