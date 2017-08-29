"use stict";

let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // It suppres error shown in console, so it has to be set to false
  quiet: false,
  // It suppress everything except error, so it has to be set to false as we can
  // to see success build
  noInfo: false,
  stats: {
    // Config for minimal console.log mess
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
}).listen(8090, 'localhost', (err) => {
  if(err) console.log(err);
  console.log('Listening at localhost:8090');
});
