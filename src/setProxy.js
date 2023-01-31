const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://208.67.222.222:8080',	
    //   # 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};