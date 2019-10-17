/**
 * method kxmagic
 * author Lkx
 * website https://github.com/Lkx2217/kxmagic
 */

const path = require('path')

// 源码文件路径获取
// 通过引入外部文件 utils 进行动态 html与 javascript 文件路径获取
const utils = require('./utils')
const entries = utils.getMultiEntry('./src/pages/**/*.js')
const pages = utils.getMultiHtml('./src/pages/**/*.html')

// 获取配置文件版本号
// 当版本更新是，打包文件自动追加版本号来更新资源文件
const version = require('./package.json').version

// 插件集合数组
// 将所有公共插件进行 push
let plugins = []

// 抽离 css 样式,防止将样式打包在 javascript 中引起页面样式加载错乱的现象
let ExtractTextPlugin = require("extract-text-webpack-plugin")
ExtractTextPlugin = new ExtractTextPlugin({
  filename: 'statics/css/[name].[hash].' + version + '.css',
  // 是否禁用插件
  disable: false,
  // 从所有附加块中提取（默认情况下，它只从初始块中提取）
  allChunks: true
})

// 打包编译时，显示进度条
let ProgressBarPlugin = require('progress-bar-webpack-plugin')
ProgressBarPlugin = new ProgressBarPlugin()

// 静态文件拷贝
// 将静态文件原封不动拷贝至dist文件夹内
let CopyWebpackPlugin = require('copy-webpack-plugin')
CopyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, 'statics'),
    to: path.resolve(__dirname, 'dist/statics'),
    ignore: ['.*']
  }
])

// 插件整合
// 所有公共插件进行合并
plugins = [ExtractTextPlugin, ProgressBarPlugin, CopyWebpackPlugin]

// 生成入口公共文件
// 入口文件为总文件，所有页面将全部引入
entries['main'] = ['./src/main.js']

// 生成 html 文件
// 提取所有 src/pages/* 下的 html 文件编译进 ./dist 根目录
let HtmlWebpackPlugin = require('html-webpack-plugin')
pages.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    // 源码文件路径
    template: page.template,
    // 编译输出路径
    filename: page.filename,
    // 压缩细节化配置
    minify: {
      // 删除Html注释
      removeComments: true,
      // 去除空格
      collapseWhitespace: true,
      // 去除属性引号
      removeAttributeQuotes: true
    },
    // 引入唯一文件及引入开发中的公共文件
    // 确保页面对应自己独立的依赖文件
    chunks: ['public/vendor', 'public/common', 'main', page.chuckName],
    // 进行手动排序
    // 确保 chunks 输出文件顺序正常
    chunksSortMode: 'manual',
    // 是否需要符合 xhtml 的标准
    xhtml: true
  })
  plugins.push(htmlPlugin)
})

let config = {
  plugins: plugins,
  entry: entries,
  output: {
    filename: 'statics/js/[name].[hash].' + version + '.js',
    path: path.resolve(__dirname, 'dist')
  },

  // 配置项通过别名来把原导入路径映射成一个新的导入路径
  // 默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则
  resolve: {
    extensions: ['.html', '.js', 'scss', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@vue': 'vue/dist/vue.esm.js'
    }
  },

  // 模块打包规则
  // 现阶段支持 css 与 scss 文件
  // 若是需要增加新的规则，再次追加即可
  module: {
    rules: [
      {test: /\.css$/, use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract({use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'], publicPath: './../../'}), exclude: /node_modules/},
      {test: /\.js$/, loader: 'es3ify-loader!babel-loader?presets[]=es2015', exclude: /node_modules/},
      {test: /\.(png|jpe?g|gif)$/, use: [{loader: 'url-loader', options: {limit: 50000, name: 'statics/img/[name].[hash].[ext]'}}], exclude: /node_modules/},
      {test: /\.(htm|html)$/i, use: ['html-withimg-loader']},
      {test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/, loader: 'url-loader', options: {limit: 10000, name: 'statics/fonts/[name].[ext]'}}
    ]
  }
}

module.exports = config