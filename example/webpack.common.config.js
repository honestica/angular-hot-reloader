var path = require('path');
var nodeModulesPath = path.join(__dirname, 'node_modules');
// var cssTemplate = require.resolve('./loaders/css-template');

module.exports = {
  context: path.resolve(__dirname + "/app"),
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
      extensions: [ '', '.ts', '.js', '.html' ]
  },
  resolveLoader: {
      root: nodeModulesPath
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.ts$/, exclude: [/app\/lib/, /node_modules/], loader: 'ts' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.less$/, loader: 'style!css!less' },
       { test: /\.css$/, loader: 'style!css' }
    ]
  }
};