import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { AppContainer } from 'react-hot-loader'

import Router from './router'
import * as store from './store'
import 'antd/dist/antd.css'
import './assets/style'

// 开启mobx严格模式
configure({
  enforceActions: 'observed'
})

const render = (Comp: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...store}>
        <ConfigProvider locale={zhCN}>
          <Comp />
        </ConfigProvider>
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
