'use strict';

import camelCase from 'lodash.camelcase';
import capitalize from 'lodash.capitalize';
import kebabCase from 'lodash.kebabcase';

export default function (name) {
  const controllerName = `${capitalize(camelCase(name))}Controller`;
  const tagName = kebabCase(name);


  return `
    if (module.hot) {
      module.hot.accept();
      // get controller instance
      const name = ${controllerName}.name;
      // don't do anything if the directive is not printed
      const angularElement = angular.element(document).find('${tagName}');
      if (angularElement.length) {
        const origin = angularElement.isolateScope().vm;
        const target = ${controllerName}.prototype;
        const enumAndNonenum = Object.getOwnPropertyNames(target);
        const enumOnly = Object.keys(target);
        // not found in enumOnly keys mean the key is non-enumerable,
        // so return true so we keep this in the filter if it's not the constructor
        const nonenumOnly = enumAndNonenum.filter(key => enumOnly.indexOf(key) === -1 && key !== 'constructor');
        nonenumOnly.forEach(val => origin.__proto__[val] = target[val]);

        // trigger rootscope update
        angular.element(document).find('html').scope().$apply();
        console.info('Hot Swapped ' + name);
      }
    }
  `;

  return input;
};
