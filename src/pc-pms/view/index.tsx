import * as React from 'react'

import BaseApp from 'global@component/app'

export default class App extends BaseApp {
  static isAuth() {
    return 1 // -1未登录 0没有权限 1有权限
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount()
  }
}
