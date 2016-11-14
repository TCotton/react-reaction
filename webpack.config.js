let path = require('path');
let sassLintPlugin = require('sasslint-webpack-plugin');
let autoprefixer = require('autoprefixer');
let postcssBase64 = require('postcss-base64');

let sassParams = [
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
    sourceMapFilename: "[file].map",
  },
  debug: true,
  devtool: 'inline-source-map',
  plugins: [
    new sassLintPlugin({
      configFile: '.scss-lint.yml',
      context: './app/scss/',
      ignoreFiles: [
        './app/scss/_reset.scss'
      ]
    }),
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
        loader: 'eslint-loader!jscs-loader'
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
        test: /\.(png|jpg|jpeg)$/,
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