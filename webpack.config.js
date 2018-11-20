var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = {
  rules: [
    { test: /\.(js)$/, use: 'babel-loader' },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    },
    // {
    //   test: /\.scss$/,
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: ['css-loader', 'sass-loader']
    //   })
    // }
  ],
  plugins: [
    new ExtractTextPlugin('styles.css')
    // new ExtractTextPlugin({
    //   filename: '[name].css',
    //   allChunks: true
    // })
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

    ])
  },
  plugins: common.plugins.concat([
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
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

    ])
  },
  plugins: common.plugins.concat([
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
  ])
}
const cssConfig = {
//   entry: './src/*',
//   output: {
//     // This is necessary for webpack to compile
//     // But we never use style-bundle.js
//     path: path.join(__dirname, 'public'),
//     publicPath: '/',
//     filename: 'style-bundle.js'
//   },
//   module: {
//     rules: [
//       // { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] }) },
//       {
//         test: /\.scss$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: 'bundle.css'
//             }
//           },
//           'extract-loader',
//           'css-loader',
//           'postcss-loader',
//           {
//             loader: 'sass-loader',
//             options: {
//               includePaths: ['./node_modules']
//             }
//           }
//         ]
//       }, 
//     // {
// //       test: /\.(png|jpg|gif|svg)$/,
// //       loader: 'file-loader',
// //       options: {
// //         name: '[name].[ext]',
// //         publicPath: '/',
// //         outputPath: 'public/',
// //         objectAssign: 'Object.assign'
// //       }
//     ]
//   }
}

module.exports = [browserConfig, serverConfig, /* cssConfig */]