
// const target = 'http://panda.jcxxy.cn'

const target = 'http://47.101.40.115:7077'
//

// const target = 'http://192.170.98.79:7077'

module.exports = {
  host: '0.0.0.0',
  port: 8301,
  proxy: {
    '/api': {
      target: target,
      changeOrigin: true,
      ws: false, // 资源
      pathRewrite: {
        '^/api': ''
      }
    },
    '/tool': {
      target: target,
      changeOrigin: true,
      ws: false, // 资源
      pathRewrite: {
        '^/tool': ''
      }
    }
  }
}
