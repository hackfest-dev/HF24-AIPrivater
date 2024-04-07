const { createProxyMiddleware } = require('http-proxy-middleware');
import express from "express";

module.exports = function (app) {
  app.use(
    '/translate',
    createProxyMiddleware({
      target: 'https://b583-115-243-167-82.ngrok-free.app',
      changeOrigin: true,
    })
  );
};
const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
