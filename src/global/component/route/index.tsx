import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { NOT_FOUND_PATH } from 'global@constant'
import Auth from 'global@component/auth'

export interface ICRoutesMapping {
  lazy?: boolean // 是否懒加载
  base?: string // 视图基路径,
  isLogin?: () => boolean // 检查是否登录
  Loading: () => JSX.Element
  routes: string[] | { [propName: string]: any }[] // routes 配置
}
export interface ICRoutesMappingResult {
  lazy: boolean
  routes: React.ReactNodeArray
}
/**
 * 创建Routes映射
 * @param mappingConfig routes映射配置
 * @returns {ICRoutesMappingResult} routes maping result
 */
export const CRoutesMapping = (
  mappingConfig: ICRoutesMapping
): ICRoutesMappingResult => {
  const { routes, isLogin, base = '', lazy = false, Loading } = mappingConfig

  const handleRoute = (
    routes: string[] | { [propName: string]: any }[],
    routePath: string = '',
    compPath: string = base
  ) => {
    // routes array
    const routesArr: React.ReactNodeArray = []
    // redirect array
    const redirectArr: React.ReactNodeArray = []
    // mapping result
    const result: ICRoutesMappingResult = { lazy: false, routes: [] }
    // 处理 mapping
    routes.forEach((route: any) => {
      const { from, to, push, path, comp, meta } = routeInit(route, lazy)

      // 处理 redirect
      if (from && to) {
        return redirectArr[from === '*' ? 'push' : 'unshift'](
          <Redirect
            key={`${from}-${to}`}
            from={from}
            to={to}
            push={push}
            exact={true}
            strict={true}
          />
        )
      }

      // 处理 routes
      let CompItem: any
      let cpt: string = compPath
      // 处理当前组件是否需要懒加载
      if (!meta.lazy) {
        CompItem = comp
        // Comp = require(`${process.env.PREJECT_ROOT}/${compPath}`).default
      } else {
        // const compPath = base ? `${base}/${comp}` : comp
        cpt = Array.from(new Set(`${compPath}/${comp}`.split('/'))).join('/')
        CompItem = React.lazy(() =>
          import(
            /* webpackChunkName: "[request]" */
            `${process.env.PREJECT_ROOT}/${cpt}`
          )
        )
        result.lazy = true
      }

      // 为当前组件添加认证拦截
      CompItem = Auth(CompItem, Loading, isLogin)

      // 递归处理嵌套路由
      const pt = Array.from(new Set(`${routePath}${path}`.split('/'))).join('/')
      let children: any = route.children
        ? handleRoute(
            route.children.concat({ from: '*', to: NOT_FOUND_PATH }),
            pt,
            cpt
          )
        : null

      children && (children = <Switch>{children.routes}</Switch>)
      // 添加 route
      routesArr.push(
        <Route
          key={pt}
          path={pt}
          component={(props: any) => (
            <CompItem {...props} childrenRoute={children} meta={meta} />
          )}
          exact={!children}
          strict={true}
        />
      )
    })

    result.routes = routesArr.concat(redirectArr)

    return result
  }

  return handleRoute(routes)
}

export interface IRoute {
  path?: string // comp为string时，可以不传, 为JSX.Element必须传入
  comp?: any // lazy为true时 -string lazy为false - JSX.Element
  meta?: {
    auth?: boolean
    lazy?: boolean
  }
}
export interface IRedirect {
  from?: string
  push?: boolean
  to?: string
}
/**
 * route项初始化默认值
 * @param routeConfig route config
 * @param lazy 是否懒加载
 * @returns {object} route值
 */
export const routeInit = (
  routeConfig: string | (IRoute & IRedirect),
  lazy: boolean = false
) => {
  // 默认元数据
  const defMeta = { lazy, auth: true }

  // param string -> route
  if (typeof routeConfig === 'string') {
    return {
      path: `/${routeConfig.toLowerCase()}`,
      comp: routeConfig,
      meta: defMeta
    }
  }

  // redirect
  const { from, to, push, comp, meta } = routeConfig
  if (from && to) {
    return { from, to, push: !!push }
  }

  // route
  const pmeta = Object.assign({}, defMeta, meta)
  let path = routeConfig.path

  // 检查类型是否正确
  if (pmeta.lazy) {
    if (typeof comp !== 'string') {
      throw new TypeError(`comp: ${comp} --> string`)
    }
  } else {
    if (typeof comp === 'string') {
      throw new TypeError(`comp: ${comp} --> JSX.Element`)
    }
    if (!path) {
      throw new Error('path is Expected')
    }
  }

  // comp - string 处理path的默认值
  if (typeof comp === 'string') {
    path = path || `/${comp.toLowerCase()}`
  }

  return { path, comp, meta: pmeta }
}
