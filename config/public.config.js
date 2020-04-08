const fs = require('fs')
const path = require('path')

/* ****************paths mapping******************* */
// 获取cmd进程目录
const rootPath = fs.realpathSync(process.cwd())
const resolvePath = relativePath => path.resolve(rootPath, relativePath)
// paths mapping
const paths = {
  src: resolvePath('src'),
  tpl: resolvePath('public/template.html'),
  mobileShop: resolvePath('src/mobile-shop'),
  pcPms: resolvePath('src/pc-pms')
}
/* ****************paths mapping******************* */

/* **********************common entry******************* */
const baseEntry = ['babel-polyfill']
const mobileEntry = [].concat(baseEntry, ['lib-flexible'])
const pcEntry = [].concat(baseEntry)
/* **********************common entry******************* */

/* **********************base cfg******************* */
const api = {
  mock: 'http://localhost:3000',
  dev: '开发环境',
  test: '测试环境',
  pro: '生产环境'
}
// templete config
const tplCfg = {
  template: paths.tpl,
  filename: 'index.html'
}
// template 插入数据
const tplData = {
  title: '爱米盛',
  favicon: 'http://www.amisheng.com/favicon.ico'
}
const baseConfig = {
  dev: 'development', // 开发环境常量
  pro: 'production', // 生产环境常量
  host: '0.0.0.0', // 开发环境服务host
  hashCN: 8, // hash 字符数
  defTgt: 'pcPms', // 默认运行项目 mobileShop
  apiDev: '/api', // 开发环境代理标识符
  scssCfg: [
    // 全局scss
    path.resolve(paths.src, 'global/style/mixin-common.scss')
  ],
  target: {
    // 打包项目
    mobileShop: {
      api: {
        ...api,
        // dev: 'http://api.mobile.cc',
        dev: 'http://msg.amisheng.com/api',
        pro: 'http://msg.amisheng.com/api'
      },
      tplCfg,
      tplData: {
        ...tplData,
        title: '爱米哒哒'
      },
      entry: [],
      scssCfg: [
        // 当前项目全局scss
        // path.resolve(paths.src, 'mobile-shop/assets/style/test.scss')
      ]
    },
    pcPms: {
      api, // 必须得
      tplCfg,
      tplData,
      entry: [],
      scssCfg: []
    }
  }
}
/* **********************base cfg******************* */

/* **********************alias********************* */
const alias = {
  'global@component': path.resolve(paths.src, 'global/component'),
  'global@util': path.resolve(paths.src, 'global/util'),
  'global@style': path.resolve(paths.src, 'global/style'),
  'global@constant': path.resolve(paths.src, 'global/constant')
}
/* **********************alias********************* */

/* *****************init process env***************** */
const initEnv = () => {
  const {
    pro, dev, hashCN, host, target, defTgt, scssCfg, apiDev
  } = baseConfig
  // 初始化容器
  const obj = {
    // 是否是生产环境
    IS_PRO: process.env.NODE_ENV === pro,
    // hash 位数
    HASH_CN: hashCN,
    // host
    HOST: host,
    PRO: pro,
    DEV: dev,
    ALIAS: alias
  }

  // 打包的目标项目
  const tgt = process.env.npm_config_tgt || defTgt
  if (tgt === undefined) {
    throw new Error('--tgt is undefined')
  }
  if (target[tgt] === undefined) {
    throw new Error(`Project is not exist of ${tgt}`)
  }
  obj.TARGET = tgt
  obj.TPL_CFG = target[tgt].tplCfg
  obj.TPL_DATA = target[tgt].tplData

  // entry
  const entry = paths[tgt]
  if (!entry) {
    throw new Error(`paths.${tgt} is undefined`)
  }
  obj.PREJECT_ROOT = entry
  let currEntry = []
  if (tgt.includes('mobile')) {
    currEntry = currEntry.concat(mobileEntry)
  } else if (tgt.includes('pc')) {
    currEntry = currEntry.concat(pcEntry)
  } else {
    currEntry = currEntry.concat(baseEntry)
  }
  // react-hot-loader局部更新
  if (!obj.IS_PRO) {
    currEntry.push('react-hot-loader/patch')
  }
  currEntry = currEntry.concat(target[tgt].entry || [], [entry])
  obj.ENTRY = currEntry

  // build dir
  const buildDir = `${tgt}-dist`.replace(/\B([A-Z])/g, '-$1').toLowerCase()
  obj.BUILD_DIR = resolvePath(buildDir)

  // 是否是相对路径打包
  obj.IS_REL_BUILD = !!process.env.npm_config_isrel

  // api URL | ENV
  let apiEnv = process.env.npm_config_api
  let apiUrl = target[tgt].api[apiEnv]
  if (!apiUrl) {
    apiEnv = obj.IS_PRO ? 'pro' : 'dev' // 默认值
    apiUrl = target[tgt].api[apiEnv]
  }
  obj.API_URL = apiUrl
  obj.API_ENV = apiEnv
  obj.API_DEV = apiDev

  // 全局scss路径配置
  obj.SCSS_CFG = scssCfg.concat(target[tgt].scssCfg || [])

  process.env.CUSTOM_ENV = JSON.stringify(obj)
}
/* *****************init process env***************** */

module.exports = initEnv
