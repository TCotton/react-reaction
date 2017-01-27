const path = require('path');
const sassLintPlugin = require('sasslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require('cheerio');

const postCSSMqKeyframes = require('postcss-mq-keyframes');
const postCSSFocus = require('postcss-focus');
const postCSSFakeId = require('postcss-fakeid');
const postcssBase64 = require('postcss-base64');

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

/**
 * We dynamically generate the HTML content in development so that the different
 * DLL Javascript files are loaded in script tags and available to our application.
 */
function templateContent() {

  const html = fs.readFileSync(
    path.resolve(process.cwd(), 'app/index.html')
  ).toString();

  if (!dllPlugin) {
    return html;
  }

  const doc = cheerio(html);
  const body = doc.find('body');
  const dllNames = !dllPlugin.dlls ? ['reactBoilerplateDeps'] : Object.keys(dllPlugin.dlls);

  dllNames.forEach((dllName) => body.append(`<script data-dll='true' src='/${dllName}.dll.js'></script>`));

  return doc.toString();
}

module.exports = (options) => {

  /**
   * Environment type
   * BUILD is for generating minified builds
   * TEST is for generating test builds
   */
  const BUILD = !!options.BUILD;
  const TEST = !!options.TEST;

  const config = {};

  config.entry = [
    'index.jsx'
  ];

  config.output = {

    // Absolute output directory
    path: path.join(__dirname, '/build/'),

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: BUILD ? '' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: BUILD ? '[name].[hash].js' : 'bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
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
        loader: 'babel-loader',
        options: {
          presets: ['react', ['es2015', { 'modules': false }], 'stage-1']
        }
      },
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
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
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
           postCSSFakeId()
           ];
           }
           }
           } */

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

  config.resolve = {
    // resolve extensions in the ES6 modules import/export
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'app'), 'node_modules']
  };

  config.context = path.resolve(__dirname, 'app');

  config.devtool = 'inline-source-map';

  config.plugins = [

    new sassLintPlugin({
      configFile: '.sass-lint.yml',
      context: './app/scss/',
      ignoreFiles: [
        './app/scss/_reset.scss'
      ]
    }),

    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),

  /*  new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })*/

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

  config.devServer = {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'app')
  };

  return config;

};