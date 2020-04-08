import * as React from 'react'
import { Switch, BrowserRouter, HashRouter, withRouter } from 'react-router-dom'

import baseApp from 'global@component/app'
import { CRoutesMapping, ICRoutesMapping } from 'global@component/route'

export interface ICRouter {
  children: React.ReactNode
}
/**
 * 根据打包路径切换hash、history Router
 * @param props React Props
 * @returns {JSX.Element} React Element
 */
export const CRouter = (props: ICRouter): JSX.Element => {
  let Router = BrowserRouter
  if (process.env.IS_REL_BUILD) {
    Router = HashRouter
  }

  return <Router>{props.children}</Router>
}

export interface ICLRouter {
  children: React.ReactNode
  loading?: () => JSX.Element // page loading
}
/**
 * 懒加载Router
 * @param props react Props
 * @returns {JSX.Element} react Element
 */
export const CLRouter = (props: ICLRouter): JSX.Element => {
  const Loading = props.loading

  return (
    <CRouter>
      <React.Suspense fallback={<Loading />}>{props.children}</React.Suspense>
    </CRouter>
  )
}

export interface IRouterMapping extends ICRoutesMapping {
  App?: any
  Loading: any // 页loading
}
/**
 * 创建router 映射
 * @param routerConfig router config
 */
export const RouterMapping = (routerConfig: IRouterMapping) => {
  const { App, lazy = false, Loading } = routerConfig
  const BaseApp: any = withRouter(App || baseApp)
  // 获取routes
  const routes = CRoutesMapping({
    lazy,
    isLogin: BaseApp.isLogin,
    ...routerConfig
  })
  // 获取Router
  const Router: any = routes.lazy ? CLRouter : CRouter

  return () => (
    // <Router loading={Loading}>
    //   <BaseApp>
    //     <Switch>{routes.routes}</Switch>
    //   </BaseApp>
    // </Router>
    <CRouter>
      <BaseApp>
        <Switch>{routes.routes}</Switch>
      </BaseApp>
    </CRouter>
  )
}
