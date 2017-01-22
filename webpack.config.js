const path = require('path');
const sassLintPlugin = require('sasslint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssBase64 = require('postcss-base64');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const postCSSMqKeyframes = require('postcss-mq-keyframes');
const postCSSFocus = require('postcss-focus');
const postCSSFakeId = require('postcss-fakeid');

const sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, './app/scss')
];

sassParams.push('sourceMap', 'sourceMapContents=true');

function getPostcssPlugins() {
  return [
    autoprefixer({
      cascade: false,
      browser: ['last 2 versions']
    }),
    postcssBase64({
      extensions: ['.svg', '.png', '.jpeg', 'jpg']
    }),
    postCSSMqKeyframes(),
    postCSSFocus(),
    postCSSFakeId()
  ];
}

module.exports = {

  entry: [
    './index.jsx'
  ],

  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: 'build',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },

  module: {

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
            loader: 'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: getPostcssPlugins
            }
          },
          {
            loader: 'sass-loader?' + sassParams.join('&')
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
  },

  resolve: {
    // resolve extensions in the ES6 modules import/export
    extensions: ['.js', '.jsx']
  },

  context: path.resolve(__dirname, './app'),
  devtool: 'inline-source-map',

  plugins: [

    new sassLintPlugin({
      configFile: '.sass-lint.yml',
      context: './app/scss/',
      ignoreFiles: [
        './app/scss/_reset.scss'
      ]
    }),

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

  ],

  devServer: {
    historyApiFallback: true,
    contentBase: './app/'
  }

};
