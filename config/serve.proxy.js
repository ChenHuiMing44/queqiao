
const target = 'http://localhost:3000'
//
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
    }
  }
}
