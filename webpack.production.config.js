'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // The entry file. All your app roots fromn here.
    devtool: 'eval-source-map',
    entry: [
        `${__dirname}/app/index.js`
    ],
    // Where you want the output to go
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].min.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".less"]
    },
    plugins: [
        // webpack gives your modules and chunks ids to identify them. Webpack can vary the
        // distribution of the ids to get the smallest id length for often used ids with
        // this plugin
        new webpack.optimize.OccurrenceOrderPlugin(),

        // handles creating an index.html file and injecting assets. necessary because assets
        // change name because the hash part changes. We want hash name changes to bust cache
        // on client browsers.
        new webpack.BannerPlugin('版权所有, 翻版必究'),
        new HtmlWebpackPlugin({
          template: './app/index.tpl.html',
          inject: 'body',
          filename: './index.html'
        }),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            },
            minimize: true
        }),
        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
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
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                loader: "url-loader",
                options: {
                    limit: 8192   // 小于8K 使用 base64格式图片
                }
            }
        ]
    }
};
