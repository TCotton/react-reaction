let path = require('path');

module.exports = {
  // having an array means that there can be multiple entry points
  entry: [
    './app/index.jsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: "[file].map",
  },
  debug: true,
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$|\.js?$/,
        loader: 'eslint-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.jsx?$|\.js?$/,
        loader: 'jscs-loader'
      }
    ],
    loaders: [
      // for loaders, always include the exclude, test and loader property
      {
        exclude: /node_modules/,
        test: /\.jsx?$|\.js?$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    // resolve extensions in the ES6 modules import/export
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './app/'
  }
};