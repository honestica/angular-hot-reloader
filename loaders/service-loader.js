'use strict';

const path = require('path');
const camelCase = require('lodash.camelcase');
const capitalize = require('./capitalize');

module.exports = function (input) {
  this.cacheable();
  const fileName = path.basename(this.resourcePath, '.service.js');
  const classToInject = capitalize(camelCase(fileName));

  return input + `
    if (module.hot) {
      module.hot.accept(console.log.bind(console));
      // get service instance
      const name = ${classToInject}.name;
      const doc = angular.element(document);
      const injector = doc.injector();
      if (injector) {
        const origin = injector.get(name);
        const target = ${classToInject}.prototype;
        const enumAndNonenum = Object.getOwnPropertyNames(target);
        const enumOnly = Object.keys(target);
        // not found in enumOnly keys mean the key is non-enumerable,
        // so return true so we keep this in the filter if it's not the constructor
        const nonenumOnly = enumAndNonenum.filter(key => enumOnly.indexOf(key) === -1 && key !== 'constructor');
        nonenumOnly.forEach(val => origin.__proto__[val] = target[val]);

        // trigger rootscope update
        doc.find('html').scope().$apply();
        console.info('Hot Swapped ' + name);
      }
    }
  `;
};
