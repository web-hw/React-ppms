const HTMLPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const customEnv = JSON.parse(process.env.CUSTOM_ENV)

// 全局scss资源配置
const scssCfg = customEnv.SCSS_CFG

// 图片loader
const imgLoaders = [
  {
    loader: 'url-loader',
    query: {
      limit: 5000,
      name: `images/[name].[hash:${customEnv.HASH_CN}].[ext]`
    }
  }
]
if (customEnv.IS_PRO) {
  imgLoaders.push({
    loader: 'image-webpack-loader',
    options: {
      mozjpeg: {
        progressive: true,
        quality: 65
      },
      optipng: {
        enabled: false
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      gifsicle: {
        interlaced: false
      }
      // webp: { // safari无法显示图片
      //   quality: 75
      // }
    }
  })
}

// css loader
const cssLoaders = [
  !customEnv.IS_PRO
    ? 'style-loader'
    : {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: customEnv.IS_REL_BUILD ? '../' : ''
      }
    },
  {
    loader: 'css-loader',
    // loader: require.resolve('typings-for-css-modules-loader'),
    options: {
      modules: true,
      // namedExport: true,
      camelCase: true,
      // importLoaders: 2,
      localIdentName: customEnv.IS_PRO
        ? `[hash:${customEnv.HASH_CN}]`
        : `[path][name]-[local]-[hash:${customEnv.HASH_CN}]`
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['> 0.01%']
        })
      ]
    }
  }
]

if (customEnv.ENTRY.includes('lib-flexible')) {
  cssLoaders.push({
    loader: 'webpack-px2rem-loader',
    query: {
      min: 1, // 转换大于min的px
      // basePx: 37.5, // 1rem=n px 设计图 / 10 =75  考虑ant UI 的尺寸问题 设计图编写/2
      basePx: 35,
      floatWidth: 4 // 小数位数
    }
  })
}

const cssLoadersNode = [].concat(cssLoaders)
cssLoadersNode[1] = 'css-loader'

module.exports = {
  entry: customEnv.ENTRY,
  mode: customEnv.IS_PRO ? customEnv.PRO : customEnv.DEV,
  output: {
    filename: `js/[name].[hash:${customEnv.HASH_CN}].js`,
    path: customEnv.BUILD_DIR,
    publicPath: customEnv.IS_REL_BUILD ? './' : '/'
  },
  resolve: {
    alias: customEnv.ALIAS,
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss', '.less']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /src\/*\/static/,
        options: {
          emitError: true,
          failOnError: true
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css?$/,
        include: /node_modules/,
        use: cssLoadersNode
      },
      {
        test: /\.css?$/,
        exclude: /(node_modules)|(src\/*\/static)/,
        use: cssLoaders
      },
      {
        test: /\.scss?$/,
        use: cssLoaders.concat([
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: scssCfg
            }
          }
        ])
      },
      {
        test: /\.less?$/,
        use: cssLoaders.concat('less-loader')
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          query: {
            limit: 5000,
            name: `fonts/[name].[hash:${customEnv.HASH_CN}].[ext]`
          }
        }
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)?$/,
        exclude: /node_modules/,
        use: imgLoaders
      }
    ]
  },
  plugins: [
    new HTMLPlugin(customEnv.TPL_CFG),
    new InterpolateHtmlPlugin(customEnv.TPL_DATA),
    new webpack.DefinePlugin({
      'process.env': {
        IS_PRO: customEnv.IS_PRO,
        SEP: JSON.stringify(path.sep),
        TARGET: `"${customEnv.TARGET}"`,
        API_URL: `"${customEnv.API_URL}"`,
        API_ENV: `"${customEnv.API_ENV}"`,
        API_DEV: `"${customEnv.API_DEV}"`,
        IS_REL_BUILD: customEnv.IS_REL_BUILD,
        PREJECT_ROOT: JSON.stringify(customEnv.PREJECT_ROOT),
        NODE_ENV: customEnv.IS_PRO ? `"${customEnv.PRO}"` : `"${customEnv.DEV}"`
      }
    }),
    new CopyWebpackPlugin([
      {
        from: `${customEnv.PREJECT_ROOT}/static`,
        to: customEnv.BUILD_DIR,
        ignore: ['.*']
      }
    ])
  ],
  performance: {
    hints: false
  }
}
