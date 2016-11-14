const WebpackStrip = require('strip-loader');
const devConfig = require('./webpack.config');

const stripLoader = {
  test: /\.jsx?$|\.js?$/,
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
};

devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;
