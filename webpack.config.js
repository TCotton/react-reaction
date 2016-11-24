const path = require('path');
const sassLintPlugin = require('sasslint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssBase64 = require('postcss-base64');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, './app/scss')
  //'excludePaths[]=' + path.resolve(__dirname, './node_modules')
];

sassParams.push('sourceMap', 'sourceMapContents=true');

module.exports = {
  context: path.resolve('app'),
  // having an array means that there can be multiple entry points
  entry: [
    './index.jsx'
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: 'build',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
  },
  debug: true,
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
  postcss: [
    autoprefixer({browsers: ['last 2 versions']}),
    postcssBase64({extensions: ['.svg', '.png', '.jpeg', 'jpg']}),
    require('postcss-mq-keyframes'),
    require('postcss-focus'),
    require('postcss-fakeid')
  ],
  module: {
    preLoaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$|\.js$/,
        loader: 'eslint-loader'
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
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader?' + sassParams.join('&')
      },
      {
        test: /\.(png|jpg|jpe?g$|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000'
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