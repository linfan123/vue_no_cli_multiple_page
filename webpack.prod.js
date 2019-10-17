/**
 * method kxmagic
 * author Lkx
 * website https://github.com/Lkx2217/kxmagic
 */

let webpack = require('webpack')
let config = require('./webpack.config')

// 生产环境默认配置
let DefinePlugin = new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true)
})

// 构建前移除目录
// 将会在每次 build 之前将 dist 目录进行清理
let CleanWebpackPlugin = require('clean-webpack-plugin')
CleanWebpackPlugin = new CleanWebpackPlugin(['dist'])

// 获取 css 构建变化
// 解决 extract-text-webpack-plugin 重复问题
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
OptimizeCSSPlugin = new OptimizeCSSPlugin({
  cssProcessorOptions: {
    safe: true
  }
})

// 将需要参与 prod 的加入 config 集合中
config['plugins'].push(DefinePlugin)
config['plugins'].push(CleanWebpackPlugin)
config['plugins'].push(OptimizeCSSPlugin)

// 移除重复的依赖模块，减轻大小，生成全局文件将重复代码进行统一打包引入
// 在 Webpack4 中，我们不再使用 CommonChunkPlugin，它被 splitChunks 和 runtimeChunk 这两个新 API 所取代
config['optimization'] = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        name: 'public/vendor',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all',
        priority: 10
      },
      common: {
        name: 'public/common',
        chunks: 'all',
        minSize: 1,
        priority: 0
      }
    }
  }
}

module.exports = config