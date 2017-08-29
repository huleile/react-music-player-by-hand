"use strict";

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8090",
    "webpack/hot/only-dev-server",
    "react-hot-loader/patch",// react-hot-loader要使用 beta 版本，npm install react-hot-loader@next
    `${__dirname}/app/index.js`
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.BannerPlugin('版权所有, 翻版必究'),
    new HtmlWebpackPlugin({
      template: './app/index.tpl.html',
      inject: 'body',
      filename: './index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  }
}
