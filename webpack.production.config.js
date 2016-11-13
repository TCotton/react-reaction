let WebpackStrip = require('strip-loader');
let devConfig = require('./webpack.config');

let stripLoader = {
  test: /\.jsx?$|\.js?$/,
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
};

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;
