const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')

const webpackBaseCfg = require('./webpack.config.base')

const customEnv = JSON.parse(process.env.CUSTOM_ENV)
const { API_DEV, API_URL } = customEnv

module.exports = webpackMerge(webpackBaseCfg, {
  devServer: {
    host: customEnv.HOST,
    inline: true,
    disableHostCheck: true,
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/',
    historyApiFallback: {
      index: `/${customEnv.TPL_CFG.filename}`
    },
    proxy: {
      [API_DEV]: {
        target: API_URL, // 不能对象点属性 取值， 需要先取值
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before(app) {
      // 避免port冲突
      app.use(noopServiceWorkerMiddleware())
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
