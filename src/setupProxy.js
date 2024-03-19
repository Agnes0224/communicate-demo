/* eslint-disable no-undef */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ai.sciclubs.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
