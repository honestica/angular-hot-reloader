/*
config for webpack. Will be used in
the Gulpfile for building our app.
Does not need gulp in order to do so,
but we use gulp to orchestrate
 */
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var argv = require('yargs').argv;
// Copy common webpack config
var standardWebpackConf = require('./webpack.common.config.js');
var webpackConf = Object.assign({}, standardWebpackConf);
// var componentHot = require.resolve('./loaders/component-loader');
// var serviceHot = require.resolve('./loaders/service-loader');
// var jadeHot = require.resolve('./loaders/jade-loader');


// // add componentHotLoader and serviceLoader
// (webpackConf.module.preLoaders = webpackConf.module.preLoaders || []).push(
//   { test: /\.js$/, loader: `${componentHot}!${serviceHot}`, exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
// );
// (webpackConf.module.postLoaders = webpackConf.module.postLoaders || []).push(
//   { test: /\.jade$/, loader: jadeHot }
// );

webpackConf.devtool = 'eval';
webpackConf.entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/dev-server',
  './app.js'
];
// for css source maps support
webpackConf.output.publicPath = 'http://localhost:3000/static/';
webpackConf.module.loaders.forEach(function(value) {
  value.loader = value.loader.replace('css-loader', 'css-loader?sourceMap');
});

webpackConf.plugins = [
  new webpack.HotModuleReplacementPlugin()
];

module.exports = webpackConf;
