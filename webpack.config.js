var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const common = {
  rules: [
    { test: /\.(js)$/, use: 'babel-loader' },
    {
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              // If you are having trouble with urls not resolving add this setting.
              // See https://github.com/webpack-contrib/css-loader#url
              url: false,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    },
  ],
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ]
}

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: common.rules.concat([
      // Can add more here
    ])
  },
  plugins: common.plugins.concat([
    new ExtractTextPlugin('styles.css'),
    // new webpack.DefinePlugin({
    //   __isBrowser__: "true"
    // }),
  ])
}

var serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: common.rules.concat([
      // Can add more here
    ])
  },
  plugins: common.plugins.concat([
    new ExtractTextPlugin('./public/serverStyles-not-used.css'),
    // new webpack.DefinePlugin({
    //   __isBrowser__: "false"
    // }),
  ])
}

module.exports = [browserConfig, serverConfig]