import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import { LOGIN_ROUTE_PATH, HISTORY_STATE } from 'global@constant'
import { ams } from 'global@util/init'

interface IProps extends RouteComponentProps {
  meta?: { [propName: string]: any }
}
// 路由守卫
const Auth = (
  WrapedComp: any, // 被包裹的组件
  Loading: () => JSX.Element,
  isLogin = () => true // 是否登录验证函数
) =>
  class extends React.Component<IProps> {
    render() {
      const { auth = false, lazy = false } = this.props.meta || {}

      // 不需要认证 | 已经登录
      if (!auth || isLogin()) {
        const Comp = !lazy
          ? WrapedComp
          : (props: any) => (
              <React.Suspense fallback={<Loading />}>
                <WrapedComp {...props} />
              </React.Suspense>
            )
        // return <WrapedComp {...this.props} />
        return <Comp {...this.props} push={false} />
      }

      // 需要认证 & 未登录
      return <Redirect to={LOGIN_ROUTE_PATH} />
    }
  }

export default Auth
