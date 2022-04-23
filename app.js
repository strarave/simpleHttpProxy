var cors = require("cors");
var express = require("express");
var logger = require("morgan");
var { createProxyMiddleware } = require("http-proxy-middleware");

var app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://white-sky-04a01bf03.azurestaticapps.net",
    origin: "http://20.113.77.53",
  })
);

app.use(logger("dev"));

// proxy all requests to backend
app.use(
  "",
  createProxyMiddleware({
    target: "http://20.113.77.53:8000", // target host
    changeOrigin: true,
    onProxyRes(proxyRes, req, res) {
      // change set-cookie into SameSite: None
      if (proxyRes.headers["set-cookie"]) {
        proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map(
          (cookie) => cookie + "; SameSite=None"
        );
      }
    },
  })
);

module.exports = app;
