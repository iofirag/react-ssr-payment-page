var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var browserConfig = {
  entry: './src/browser/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      // { test: /\.scss$/, use: ['style-loader', 'css-loader'] }
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }) },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    // new ExtractTextPlugin({
    //   filename: '[name].css',
    //   allChunks: true
    // })
  ]
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
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      // { test: /\.scss$/, use: ['style-loader', 'css-loader'] }
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }) },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    // new ExtractTextPlugin({
    //   filename: '[name].css',
    //   allChunks: true
    // })
  ]
}
// const cssConfig = {
//   entry: './style.scss',
//   output: {
//     // This is necessary for webpack to compile
//     // But we never use style-bundle.js
//     filename: 'style-bundle.js'
//   },
//   module: {
//     rules: [{
//       test: /\.scss$/,
//       use: [
//         {
//           loader: 'file-loader',
//           options: {
//             name: 'bundle.css'
//           }
//         },
//         'extract-loader',
//         'css-loader',
//         'postcss-loader',
//         {
//           loader: 'sass-loader',
//           options: {
//             includePaths: ['./node_modules']
//           }
//         }
//       ]
//     }, {
//       test: /\.(png|jpg|gif|svg)$/,
//       loader: 'file-loader',
//       options: {
//         name: '[name].[ext]',
//         publicPath: '/',
//         outputPath: 'public/',
//         objectAssign: 'Object.assign'
//       }
//     }]
//   }
// }

module.exports = [browserConfig, serverConfig, /* cssConfig */]