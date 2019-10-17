/**
 * method kxmagic
 * author Lkx
 * website https://github.com/Lkx2217/kxmagic
 */

let config = require('./webpack.config')

// 服务器基本配置信息
// 开发环境下配置使用
let devServer = {
  // 服务器主机名
  host: 'localhost',
  // 服务器运行端口号
  port: 8080,
  // 代理服务器
  // 常用于前后端分离开发，进行跨域请求
  proxy: {
    '/api': {

      // 需要反向代理到服务器的地址名称
      target: '',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,

      // 是否接受运行在 https 上的服务
      secure: false
    }
  }
}

// 能够更好在终端看到 webapck 运行的警告和错误
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
FriendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin({
  clearConsole: true,
  compilationSuccessInfo: {
    messages: ['You application is running here http://' + devServer['host'] + ':' + devServer['port']],
    notes: ['This is a prompt message indicating that the code has been compiled successfully']
  }
})

// 将需要参与 dev 的加入 config 集合中
config['plugins'].push(FriendlyErrorsWebpackPlugin)

// 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置
// 例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js
// 这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件
config['devtool'] = 'inline-source-map'

// 基于 webpack-dev-server 开启本地服务器调试
// 通过 npm run dev 开启本地服务器进行开发编辑
// 若是开发完毕则需要使用 npm run build 进行代码最终打包
config['devServer'] = {
  contentBase: './dist',

  // 对所有的服务器资源采用 gzip 压缩
  // 优点：对 javascript，css 资源的压缩率很高，可以极大得提高文件传输的速率，从而提升 web 性能
  // 缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载
  compress: true,

  // 是否隐藏控制台提示
  // 将使用 friendly-errors-webpack-plugin 来代替控制台信息输出
  quiet: true,

  // 启动自动刷新和模块热替换
  // 自动刷新：页面会自动刷新，我们所做的修改会直接同步到页面上，而不需要我们刷新页面，或重新开启服务
  // 热替换：不是重载整个页面，HMR程序会只加载被更新的那一部分模块，然后将其注入到运行中的APP中
  inline: true,

  // 是否启动惰性模式
  lazy: false,

  // 是否显示打包进度
  // 将使用 progress-bar-webpack-plugin 来替代进度样式
  progress: false,

  // devServer 变量信息
  // 定义服务器主机名，端口号与代理地址
  host: devServer['host'],
  port: devServer['port'],
  proxy: devServer['proxy']
}

module.exports = config