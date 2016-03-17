'use strict';

var component = require('./component-loader');
var service = require('./service-loader');
var jade = require('./jade-loader');

var basename = require('path').basename;

function createLoader(regex, fn) {
  return { regex: regex, fn: fn };
}

var loaders = [];
loaders.push(createLoader(/\.jade/, jade));
loaders.push(createLoader( /\.component\.js/, component));
loaders.push(createLoader( /\.service\.js/, service));

module.exports = function (input) {
  this.cacheable();
  var directoryName = basename(this.context);
  var fileName = basename(this.resourcePath);
  var candidate = loaders.filter(function(data) { return fileName.match(data.regex); });

  if (!candidate.length) {
    return input;
  }

  return input + candidate[0].fn(directoryName);
}
