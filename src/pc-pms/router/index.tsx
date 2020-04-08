import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CRouter } from 'global@component/router'
import {
  NOT_FOUND_PATH,
  LOGIN_ROUTE_PATH,
  ERROR_ROUTE_PATH
} from 'global@constant'
import {
  LoadingPage,
  ErrorPage,
  NotFound
} from 'global@component/pc-routes-config'
import {
  routeMapping,
  E_CREATE_ROUTE_PARENT,
  PARENT_MENUS,
  CREATE_ROUTE_REDIRECT
} from './mapping'
import App from '../view'

const Auth = (Comp: any) => (props: any) => {
  // -1未登录 0没有权限 1有权限
  const status = App.isAuth()

  if (status === 1) {
    return <Comp {...props} />
  }

  return (
    <Redirect
      push={false}
      exact={true}
      strict={true}
      to={status === -1 ? LOGIN_ROUTE_PATH : NOT_FOUND_PATH}
    />
  )
}

const lazy = (path: string) => {
  return React.lazy(() =>
    import(
      /* webpackChunkName: "[request]" */
      `${process.env.PREJECT_ROOT}/view${path}`
    )
  )
}

const RouteComp = (Comp: any, isAuth: boolean = true) => {
  let CurrComp: any = Comp
  if (typeof Comp === 'string') {
    CurrComp = lazy(Comp)
  }

  if (isAuth) {
    CurrComp = Auth(CurrComp)
  }

  return (props: any) => <CurrComp {...props} />
}

const LazyLoading = (props: any) => (
  <React.Suspense fallback={<LoadingPage />}>
    <Switch>
      {props.children}
      <Redirect from="*" to={NOT_FOUND_PATH} strict={true} />
    </Switch>
  </React.Suspense>
)

const CreateRoutes = (function () {
  const hisRoutes: any = {}
  const hisNodes: any = {}

  return ({
    parentRoute,
    redirect = []
  }: {
    parentRoute: E_CREATE_ROUTE_PARENT
    redirect?: {
      to: string
      from?: string
      strict?: boolean
      exact?: boolean
      push?: boolean
    }[]
  }) => {
    // 使用缓存
    if (hisRoutes[parentRoute]) {
      return hisRoutes[parentRoute]
    }

    // 初始化routes path
    const rts = hisNodes[parentRoute] || []
    if (rts.length === 0) {
      for (const key in routeMapping) {
        const mapping = routeMapping[key]
        if (`${mapping.parent}` === parentRoute) {
          rts.push(key)
        }
      }

      hisNodes[parentRoute] = rts
    }

    return (hisRoutes[parentRoute] = (
      <LazyLoading>
        {rts.map((r: string) => {
          const {
            strict = true,
            exact = false,
            isAuth = true,
            path = r
          } = routeMapping[r]

          return (
            <Route
              key={r}
              path={r}
              component={RouteComp(path, isAuth)}
              strict={strict}
              exact={exact}
            />
          )
        })}
        {redirect.map(
          ({ to, from = '*', strict = true, exact = true, push = false }) => (
            <Redirect
              key={`${from}-${to}`}
              from={from}
              to={to}
              strict={strict}
              exact={exact}
              push={push}
            />
          )
        )}
      </LazyLoading>
    ))
  }
})()

const Routes = ({ parent }: { parent: E_CREATE_ROUTE_PARENT }) => (
  <CreateRoutes
    parentRoute={parent}
    redirect={CREATE_ROUTE_REDIRECT[parent] || []}
  />
)

const getMenusByPath = (function () {
  const hisMenus: any = {}

  return function (path: string) {
    // 获取parent
    let parent: E_CREATE_ROUTE_PARENT
    PARENT_MENUS.forEach(p => path.startsWith(p) && (parent = p))

    if (!parent) {
      return null
    }

    if (hisMenus[parent]) {
      return hisMenus[parent]
    }

    const menus: any = {
      ...routeMapping[parent],
      path: parent,
      root: parent,
      children: []
    }
    const getChildren = (mn: any, parents: string[]) => {
      // 是否是菜单
      if (mn.isMenu === false) {
        return null
      }

      // Todo检查是否有权限 无权限 null

      for (const key in routeMapping) {
        const menu = routeMapping[key]
        if (menu.parent === mn.path) {
          const cm: any = getChildren(
            { ...menu, path: key, root: parent, children: [] },
            [...parents, menu.parent]
          )
          cm && mn.children.push(cm)
        }
      }

      return { ...mn, parents }
    }

    return (hisMenus[parent] = getChildren(menus, []))
  }
})()

/****************** app 入口 ********************/
export default () => (
  <CRouter>
    <App>
      <Routes parent={E_CREATE_ROUTE_PARENT.PARENT_NULL} />
    </App>
  </CRouter>
)

export { E_CREATE_ROUTE_PARENT, Routes, getMenusByPath }
