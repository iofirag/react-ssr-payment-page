require("babel-polyfill");
var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const common = {
  rules: [
    { 
      test: /\.(js|jsx)$/,
      // exclude: /node_modules/,
      use: 'babel-loader'
    },
    // // Image Loader
    // {
    //   test: /\.(jpg|png|svg|gif)$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         publicPath: '/',
    //         outputPath: 'img/',
    //         name: '[name].[ext]',
    //       }
    //     }
    //   ]
    // },
    // Font Loader
    // {
    //   test: /\.(eot|ttf|woff)$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         publicPath: '/',
    //         outputPath: 'fonts/',
    //         name: '[name].[ext]'
    //       }
    //     }
    //   ]
    // },
    {
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        // use: [
        //   'css-loader',
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       plugins: (loader) => [require('autoprefixer')()]
        //     }
        //   },
        //   'sass-loader'
        // ]
        use: [
          {
            loader: 'css-loader',
            // options: {
            //   // If you are having trouble with urls not resolving add this setting.
            //   // See https://github.com/webpack-contrib/css-loader#url
            //   url: false,
            //   minimize: true,
            //   sourceMap: true
            // }
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
  entry: ["babel-polyfill", './src/browser/index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: common.rules.concat([
      // Can add more here
      // Image Loader
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/img', // Insert this value in the prefix of url('...')  of generated file
              outputPath: 'img/', // real folder structure path
              name: '[hash].[ext]', 
            }
          }
        ]
      },
      {
      test: /\.(eot|ttf|woff)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/',
            outputPath: 'fonts/',
            name: '[hash].[ext]'
          }
        }
      ]
    },
    ])
  },
  plugins: common.plugins.concat([
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
  ])
}

var serverConfig = {
  entry: ["babel-polyfill", './src/server/index.js'],
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
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              outputPath: 'public/img/',
              name: '[hash].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              outputPath: 'public/fonts/',
              name: '[hash].[ext]'
            }
          }
        ]
      },
    ])
  },
  plugins: common.plugins.concat([
    new ExtractTextPlugin('./public/serverStyles-not-used.css'),
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
  ])
}

module.exports = [browserConfig, serverConfig]