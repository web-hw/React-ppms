const webpackMerge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackBaseCfg = require('./webpack.config.base')

const customEnv = JSON.parse(process.env.CUSTOM_ENV)

// 删除目标目录 customEnv.BUILD_DIR
webpackBaseCfg.plugins.unshift(
  new CleanWebpackPlugin({
    dry: false,
    verbose: true,
    cleanOnceBeforeBuildPatterns: [customEnv.BUILD_DIR]
  })
)

module.exports = webpackMerge(webpackBaseCfg, {
  output: {
    chunkFilename: `js/[name].[hash:${customEnv.HASH_CN}].js`
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3
    },
    runtimeChunk: {
      name: 'runtime-main'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].[hash:${customEnv.HASH_CN}].css`,
      chunkFilename: `css/[name].[hash:${customEnv.HASH_CN}].css`
      // filename: `css/[hash:${customEnv.HASH_CN}].css`,
      // chunkFilename: `css/[hash:${customEnv.HASH_CN}].css`
    })
  ]
})
