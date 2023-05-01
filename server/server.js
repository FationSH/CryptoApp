const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config()

const app = express()
app.use(morgan("angle"))
app.use(cors())

const { API_BASE_URL } = process.env;

const updateUrlStringParameter = (path, key, value) => {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = path.indexOf('?') !== -1 ? '&' : '?';
  if (path.match(re)) {
    return path.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return path + separator + key + '=' + value;
  }
};

// Get market
const marketsProxy = createProxyMiddleware({
  target: `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`,
  proxyTimeout: 5000,
  changeOrigin: true,
  pathRewrite: function(path, req) {
    let newPath = path;
    newPath = updateUrlStringParameter(newPath, 'per_page',  req.params.per_page);
    newPath = updateUrlStringParameter(newPath, 'page',  req.params.page);
    return newPath;
  },
});

// Get specific
const infoProxy = createProxyMiddleware({
  target: `${API_BASE_URL}`,
  proxyTimeout: 5000,
  changeOrigin: true,
  pathRewrite: function(path, req) {
    return `coins/${req.params.id}?market_data=true`;
  }
});

// Not Found
function routesNotFound(req, res, next){
  res.status(404)
  const error = new Error('Not Found')
  next(error)
}

// Error Handler Middlaware
function errorHandler(err, req, res, next){
  if (res.headersSent) {
    return res.status(res.statusCode || 500)
  }
  res.json({message: err.message})
}

app.use('/coins/markets/:per_page/:page', marketsProxy );
app.use('/coins/:id', infoProxy );
app.use(routesNotFound)
app.use(errorHandler)

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on Port ${port}`)
})
