const VConsolePlugin = require('vconsole-webpack-plugin')
module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://47.104.189.49:8008',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }, // 设置代理
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
  // ...
  },
  configureWebpack: {
    plugins: [
      new VConsolePlugin({
        enable: process.env.NODE_ENV === '暂时不用'
      })
    ]
  }
}
