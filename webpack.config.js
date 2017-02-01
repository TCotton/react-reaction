const path = require('path');
const sassLintPlugin = require('sasslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require('cheerio');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const postCSSMqKeyframes = require('postcss-mq-keyframes');
const postCSSFocus = require('postcss-focus');
const postCSSFakeId = require('postcss-fakeid');
const postcssBase64 = require('postcss-base64');
const postcssReporter = require('postcss-reporter');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

/*
 const WebpackStrip = require('strip-loader');
 const devConfig = require('./webpack.config');

 const stripLoader = {
 test: /\.jsx?$|\.js?$/,
 exclude: /node_modules/,
 loader: WebpackStrip.loader('console.log', 'console.dir')
 };

 devConfig.module.loaders.push(stripLoader);
 */
console.dir(process.env.NODE_ENV);

ExtractTextPlugin.extract = (before, loader, options) => {
  if (typeof loader === 'string') {
    return [
      ExtractTextPlugin.loader(Object.assign({ omit: before.split('!').length, extract: true, remove: true }, options)),
      before,
      loader
    ].join('!');
  } else {
    options = loader;
    loader = before;
    return [
      ExtractTextPlugin.loader(Object.assign({ remove: true }, options)),
      loader
    ].join('!');
  }
};

module.exports = () => {

  const config = {};

  config.entry = [
    'index.jsx'
  ];

  config.output = {

    // Absolute output directory
    path: path.join(__dirname, '/build/'),

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: isProduction ? '' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProduction ? '[name].[hash].js' : 'bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProduction ? '[name].[hash].js' : '[name].bundle.js'
  };

  config.module = {

    rules: [
      {
        test: /\.jsx?$|\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$|\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(png|jpg|jpe?g$|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  };

  if (!isProduction) {

    config.module.rules.push(
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [

          {
            loader: 'style-loader'
          },

          {
            loader: 'css-loader',
            query: {
              sourceMap: true,
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'resolve-url-loader'
          },

          /* {
           loader: 'postcss-loader',
           options: {
           plugins: () => {
           return [
           autoprefixer({
           browsers: ['last 2 versions']
           }),
           postcssBase64({
           extensions: ['.svg', '.png', '.jpeg', 'jpg']
           }),
           postCSSMqKeyframes(),
           postCSSFocus(),
           postCSSFakeId(),
           postcssReporter({
           clearMessages: true
           })
           ];
           }
           }
           },*/

          {
            loader: 'sass-loader',
            query: {
              outputStyle: 'expanded',
              includePaths: './app/scss',
              sourceMap: true,
              sourceMapContents: true
            }
          }

        ]
      }
    );

  }

  if (isProduction) {

    config.module.rules.push(
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]', 'css-loader', 'resolve-url-loader', 'sass-loader?outputStyle=compressed&includePaths=\'./app/scss\'&sourceMap=true')
      }
    );

  }

  config.resolve = {
    // resolve extensions in the ES6 modules import/export
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'app'), 'node_modules']
  };

  config.context = path.resolve(__dirname, 'app');

  config.devtool = isProduction ? '' : 'inline-source-map';

  config.plugins = [

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor-[hash].js'
    }),

    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new webpack.NamedModulesPlugin(),

    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'disabled',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.html',
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null
    })

  ];

  if (isProduction) {

    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      }),

      new ExtractTextPlugin('style-[hash].css')
    );

  }

  if (!isProduction) {

    config.plugins.push(
      new sassLintPlugin({
        configFile: '.sass-lint.yml',
        context: './app/scss/',
        ignoreFiles: [
          './app/scss/_reset.scss'
        ]
      })
    );

  }

  config.devServer = {
    historyApiFallback: true,
    compress: isProduction,
    inline: !isProduction,
    /*    hot: !isProduction,*/
    contentBase: isProduction ? path.resolve(__dirname, 'build') : path.resolve(__dirname, 'app'),
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  };

  config.target = 'web';

  return config;

};