require('../config/public.config')() // 初始化process env
const webpackDevCfg = require('../config/webpack.config.dev')
const webpackProCfg = require('../config/webpack.config.pro')

const customEnv = JSON.parse(process.env.CUSTOM_ENV)

module.exports = customEnv.IS_PRO ? webpackProCfg : webpackDevCfg
