# 爱米盛

### 项目架构 -- 爱米盛SPA项目集
+ 技术栈：TypeScript + React + React Router + mobx + mobx-react的SPA
+ 打包：Webpack
+ UI库：Antd
+ mock: express + mockjs
+ lint
  - 检查类型：jsonlint + stylelint + eslint + tslint
  - 检查环境： dev + commit

### 安装教程
```bash
# 安装依赖
npm | cnpm i

# mock服务
npm run mock

# 内网穿透
npm run ngrok (http://www.ngrok.cc/申请clientid)

# 开发环境
npm start | npm run dev

# 生产环境
npm run build

# 开发环境 | 生产环境参数
  --tgt 打包的项目，驼峰命名
  --isrel 全局是否采用相对路径，相对路径的路由 -- hash ,绝对路径的路由 -- history
  --api api环境，取值mock, dev, test, pro
```

### 项目结构
+ .vscode
  - sftp.json 项目上传配置
+ config
  - public webpack自定义配置
  - base webpack基础配置
  - dev webpack开发环境配置
  - pro wepback生产环境配置
+ *-dist 打包目录
+ mock mock环境
  - api mock API
  - index mock路由映射
+ node_modules
+ public 项目集公共部分
  - template.html 公共的模板
+ script npm 脚本入口
  - bin
    * sunny.ext sunny脚本
  - index 自定义webpack脚本入口
+ src 项目源码
  - global 全局源码
    * component 公共组件
    * constant 常量
    * style 样式
    * util 工具库
  - 其他，对于单个项目，如mobile-shop
    * assets 需要webpack的静态资源
    * component 公共组件
    * connect 请求封装
    * router 路由配置
    * static 不需要webpack处理的静态资源
    * store 状态管理
    * validate 验证
    * view 视图
    * index 项目入口
+ .babelrc babel配置
+ .editorconfig 编辑器格式统一配置
+ .eslintignore eslint忽略
+ .eslintrc eslint配置
+ .gitignore git忽略
+ nodemon nodemon配置
+ package 项目依赖
+ prettier.config 代码格式化配置
+ README 文档
+ tsconfig ts配置
+ tslint tslint配置

### 项目介绍
+ mobile-shop 爱米盛h5商城

### 其他
+ babel-polyfill将在每个项目自动注入，用于处理ES6等的兼容性
+ lib-flexible将在mobile项目自动注入，用于适配问题
+ react-fastclick用于处理viewport 300ms延迟问题，需要在项目入口手动引入
+ mobile项目适配，设计尺寸 / 2, 单位px


### Todo视图组件
+
