var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var argv = require('yargs').argv;
var config = require('./webpack.config');
var compileConfig = require('./webpack.compile.config');

if (argv.jenkins) {
  webpack(compileConfig, function (err, stats) {
    if (err) {
      console.log(err);
    }
  });
} else {
  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(3000, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3000');
  });
}
