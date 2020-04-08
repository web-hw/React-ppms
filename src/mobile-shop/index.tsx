import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'

import Router from './router'
import * as store from './store'
import 'antd-mobile/dist/antd-mobile.min.css'
import './assets/style'

// 处理viewport延迟问题
require('react-fastclick')()

// 开启mobx严格模式
configure({
  enforceActions: 'observed'
})

const render = (Comp: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...store}>
        <Comp />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}
render(Router)

// react hot loader
if (module.hot) {
  module.hot.accept('./router', () => {
    const NextApp = require('./router').default
    render(NextApp)
  })
}
