'use strict';

import component from './component-loader';
import service from './service-loader';
import jade from './jade-loader';

import { basename } from 'path';

function createLoader(regex, fn) { 
  return { regex, fn };
}

const loaders = [];
loaders.push(createLoader(/\.jade/, jade));
loaders.push(createLoader( /\.controller\.js/, controller));
loaders.push(createLoader( /\.service\.js/, service));

export default function (input) {
  this.cacheable();

  const directoryName = basename(this.context);
  const fileName = basename(this.resourcePath);
  const candidate = loaders.filter(({ regex }) => fileName.match(regex));

  if (!candidate.length) {
    return input;
  }
  
  return input + candidate[0].fn(directoryName);
}
