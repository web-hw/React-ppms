import * as React from 'react'
import { Icon } from 'antd'

import Empty from '../empty'
import { ERROR_ROUTE_PATH, NOT_FOUND_PATH } from 'global@constant'
const style = require('./style')

// 404
export const NotFound = () => (
  <div className={`${style.notFound} wp100 hp100`}>
    <Empty description="走丢啦~~~" />
  </div>
)

// 错误页
export const ErrorPage = () => (
  <div className={`${style.errPage} wp100 hp100`}>
    <Empty description="出错啦~~~" />
  </div>
)

// 页Loading
export const LoadingPage = () => (
  <div className={`${style.loadingPage} wp100 hp100 pl`}>
    <span className="mc">
      <Icon type="loading" style={{ color: '#1890ff', fontSize: '30px' }} />
    </span>
  </div>
)

// common routes
export const routesConfig = [
  {
    path: ERROR_ROUTE_PATH,
    comp: ErrorPage,
    meta: { auth: false, lazy: false }
  },
  { path: NOT_FOUND_PATH, comp: NotFound, meta: { auth: false, lazy: false } },
  { from: '*', to: NOT_FOUND_PATH }
]
