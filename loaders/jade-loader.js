'use strict';

const path = require('path');
const kebabCase = require('lodash.kebabcase');
const camelCase = require('lodash.camelcase');

module.exports = function (input) {
  this.cacheable();
  const fileName = path.basename(this.resourcePath,  '.html');
  const tagName = kebabCase(fileName);
  const directiveName = camelCase(fileName);

  return input + `
    if (module.hot) {
      module.hot.accept(console.log.bind(console));
      const newTpl = module.exports;
      const doc = angular.element(document);
      const injector = doc.injector();
      if(injector) {
        const $compile = injector.get('$compile');
        const oldTemplate = injector.get('${directiveName}Directive')[0];
        if (oldTemplate.template !== newTpl) {
          oldTemplate.template = newTpl;
          // doc.find has to be cast to an Array
          const elems = Array.prototype.slice.call(doc.find('${tagName}'));
          elems.forEach(elt => {
            const angularElement = angular.element(elt);
            const scope = angularElement.isolateScope();
            angularElement.html(newTpl);
            $compile(angularElement.contents())(scope);
          });
        }

        // trigger rootscope update
        angular.element(document).find('html').scope().$apply();
        console.info('Hot Swapped template ' + name);
      }
    }
  `;
};
