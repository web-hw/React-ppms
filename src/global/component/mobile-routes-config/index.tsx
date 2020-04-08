import * as React from 'react'
import { Icon } from 'antd-mobile'

import Empty from '../empty'
import { ERROR_ROUTE_PATH, NOT_FOUND_PATH } from 'global@constant'
const style = require('./style')

// 移动端404
const NotFound = () => (
  <div className={`${style.notFound} wp100 hp100`}>
    <Empty description="走丢啦~~~" />
  </div>
)

// 移动端错误页
const ErrorPage = () => (
  <div className={`${style.errPage} wp100 hp100`}>
    <Empty description="出错啦~~~" />
  </div>
)

// 移动端 页Loading
export const LoadingPage = () => (
  <div className={`${style.loadingPage} wp100 hp100 pl`}>
    <span className="mc">
      <Icon type="loading" size="lg" />
    </span>
  </div>
)

// mobile common routes
export const routesConfig = [
  {
    path: ERROR_ROUTE_PATH,
    comp: ErrorPage,
    meta: { auth: false, lazy: false }
  },
  { path: NOT_FOUND_PATH, comp: NotFound, meta: { auth: false, lazy: false } },
  { from: '*', to: NOT_FOUND_PATH }
]
