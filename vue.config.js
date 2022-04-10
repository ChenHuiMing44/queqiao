const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const serveProxy = require('./config/serve.proxy')

module.exports = defineConfig({
  publicPath: '/',
  devServer: serveProxy,
  lintOnSave: 'warning',
  configureWebpack: config => {
    config.devtool = 'inline-source-map'
    config.output.filename = 'js/[name].[hash].js'
    config.output.chunkFilename = 'js/[name].[hash].js'
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [path.resolve('./src/style/variable.scss')]
        })
    })
  }
})
