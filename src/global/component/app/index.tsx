import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { ams } from 'global@util/init'
import { session } from 'global@util/storage'
import { LOGIN_MSG, ERROR_ROUTE_PATH, HISTORY_STATE } from 'global@constant'

/**
 * 应用统一的主入口
 */
export default class extends React.Component<any> {
  // 验证是否登录
  static isLogin(): boolean {
    const userMsg = (session.get(LOGIN_MSG) || {}).access_token
    return !!userMsg
  }

  // 全局的错误捕获hook
  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.log(err, info)
    // 出现error，跳转error页
    this.props.history.replace(ERROR_ROUTE_PATH)
  }

  componentWillMount() {
    const history = this.props.history
    // 初始化window全局属性
    ams.set({
      history // 用于react组件之外，需要跳转的场景
    })
  }

  componentWillReceiveProps(nextProps: RouteComponentProps) {
    // const { pathname, key = null } = nextProps.location
    // console.log(nextProps.location, this.props)
    // // 路由改变
    // if (pathname !== this.props.location.pathname) {
    //   // 维护自己的history 状态
    //   // if (nextProps.history.action === 'PUSH') {
    //   //   console.log(`${HISTORY_STATE}_${key}`, pathname)
    //   //   setTimeout(() => history.pushState(
    //   //     { key: `${HISTORY_STATE}_${key}`, state: { key } },
    //   //     null,
    //   //     pathname
    //   //   ))
    //   // }
    // }
  }

  render() {
    return this.props.children
  }
}
