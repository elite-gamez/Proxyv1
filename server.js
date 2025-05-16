// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use('/proxy', (req, res, next) => {
  const url = req.url.slice(1); // Strip /proxy/
  if (!url.startsWith('http')) return res.status(400).send('Invalid URL');

  createProxyMiddleware({
    target: url,
    changeOrigin: true,
    selfHandleResponse: false,
    pathRewrite: () => '',
    router: () => url,
    onProxyReq(proxyReq) {
      proxyReq.setHeader('origin', url);
    },
    onError(err, req, res) {
      res.status(500).send('Proxy Error: ' + err.message);
    }
  })(req, res, next);
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy running at http://localhost:${3000}`);
});
