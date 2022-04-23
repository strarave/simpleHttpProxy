var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var { createProxyMiddleware } = require('http-proxy-middleware');
var cookieSession = require("cookie-session");

var app = express();

app.set('trust proxy', 1)
app.use(
    cookieSession({
      name: "__session",
      keys: ["key1"],
        maxAge: 24 * 60 * 60 * 100,
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    })
);

app.use(cors(
  {
    credentials:true,
    origin: "https://white-sky-04a01bf03.azurestaticapps.net",
    origin: "http://20.113.77.53"
  }
));

app.use(logger('dev'));

// proxy all requests to backend
app.use(
  "",
  createProxyMiddleware({
    target: 'http://20.113.77.53:8000', // target host
    changeOrigin: true
  })
);

module.exports = app;