var path = require('path');
var commonModulesPath = path.join(__dirname, 'client', 'app', 'common');
var componentsModulesPath = path.join(__dirname, 'client', 'app', 'components');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var publicAssetsPath = path.join(__dirname, 'client', 'assets');
var cssTemplate = require.resolve('./loaders/css-template');

module.exports = {
  context: path.resolve(__dirname + "/client"),
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
      root: [nodeModulesPath, commonModulesPath, publicAssetsPath],

      alias: {
        common: commonModulesPath,
        components: componentsModulesPath,
        assets: publicAssetsPath
      }
  },
  resolveLoader: {
      root: nodeModulesPath
  },

  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      { test: /\.jade$/, loader: 'jade-loader!' + cssTemplate },
      { test: /\.styl$/, loader: 'style-loader!css-loader!postcss-loader!stylus-loader' },
      { test: /\.css/, loader: 'style!css' },
      { test: /\.(png|jpg|jpeg|svg|woff2|woff|eot|eot?#iefix)$/, loader: 'file' },
      { test: /\.pdf$|pdf\.worker\.js$|mp3$/, loader: "url-loader?limit=10000" },
      { test: /\.js$/, loader: 'babel', exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
    ]
  }
};