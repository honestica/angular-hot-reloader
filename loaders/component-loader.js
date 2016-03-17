'use strict';

const path = require('path');
const camelCase = require('lodash.camelcase');
const capitalize = require('./capitalize');

module.exports = function (input) {
  this.cacheable();
  const fileName = path.basename(this.resourcePath, '.component.js');
  const controllerName = `${capitalize(camelCase(fileName))}Controller`;
  const directiveName = camelCase(fileName);

  return input + `
    if (module.hot) {
      module.hot.accept();
      // get controller instance
      const name = ${controllerName}.name;
      // don't do anything if the directive is not printed
      const doc = angular.element(document.body);
      const injector = doc.injector();
      if (injector) {
        const directive = injector.get('${directiveName}Directive')[0];
        console.log(directive);
        if (directive) {
          const origin = directive.controller;
          const target = ${controllerName}.prototype;
          const enumAndNonenum = Object.getOwnPropertyNames(target);
          const enumOnly = Object.keys(target);
          // not found in enumOnly keys mean the key is non-enumerable,
          // so return true so we keep this in the filter if it's not the constructor
          const nonenumOnly = enumAndNonenum.filter(key => enumOnly.indexOf(key) === -1 && key !== 'constructor');
          nonenumOnly.forEach(val => origin.prototype[val] = target[val]);

          // trigger rootscope update
          angular.element(document).find('html').scope().$apply();
          console.info('Hot Swapped ' + name);
        }
      }
    }
  `;
};
