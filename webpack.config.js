let path = require('path');
var sassLintPlugin = require('sasslint-webpack-plugin');

let sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, './app/scss')
  //'excludePaths[]=' + path.resolve(__dirname, './node_modules')
];

sassParams.push('sourceMap', 'sourceMapContents=true');

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
  plugins: [
    new sassLintPlugin({
      configFile: '.scss-lint.yml',
      context: './app/scss/',
      ignoreFiles: [
        './app/scss/_reset.scss'
      ]
  /*    ignorePlugins: [
        'sass-lint',
        'sasslint-webpack-plugin'
      ]*/
     /* glob: '**!/!*.s?(a|c)ss'*/
    }),
  ],
  module: {
    preLoaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$|\.js$/,
        loader: 'eslint-loader!jscs-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader?' + sassParams.join('&')
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