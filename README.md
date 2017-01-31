# angular-hot-reloader
Hot Reload templates, controller and services in Angular1.X!!

The angular hot reloader is a suite of webpack loaders that enable hot reloading for templates, controller and services in Angular 1.X, leveraging the power of Webpack's Hot Module Reloader, with a minimal contract.

## What does it do ?
For now, it enables hot module reloading for templates, controller methods (except constructors), and services.
NEW: Update with an typescript example !

## What do I need to make it work ?
These loaders were written to work with a project using Webpack, ES6+Babel, Angular 1.X and best practices from @johnpapa and @scottmoss from AngularClass. Needless to say, it was largely inspired by the great work of @danabramov.

The main requirements are :
  - One file, one **ES6** module, one purpose.
  - A strong convention on naming your files. The loaders are inferring controllerNames and serviceNames based on the name of the file.
  - An ES6-component style of writting angular applications

## How do I make it work ?
If your code respects the minimal contract, you just need to npm install or fork this project, and add preloaders for controller and services and post loaders for your templates:

```javascript
var componentHotLoader = require.resolve('../loaders/component-loader');
var serviceHotLoader = require.resolve('../loaders/service-loader');
var jadeHotLoader = require.resolve('../loaders/jade-loader');


// add componentHotLoader and serviceLoader
(webpackConf.module.preLoaders = webpackConf.module.preLoaders || []).push(
  { test: /\.component\.js$/, loader: componentHotLoader, exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
);
(webpackConf.module.preLoaders = webpackConf.module.preLoaders || []).push(
  { test: /\.service\.js$/, loader: serviceHotLoader, exclude: [/client\/lib/, /node_modules/, /\.spec\.js/] }
);
(webpackConf.module.postLoaders = webpackConf.module.postLoaders || []).push(
  { test: /\.html/, loader: jadeHotLoader }
);
```
And ... you're done. You can add or remove html in your templates, add scope bindings, change controller methods, change service methods (currently only supports Services and not factories)

## Requirements in detail:
### Component Loader
  - You must have one file per controller and export the controller or the angular.module with the controller invoked.
  - You must use functions that have a `name` property (e.g. `class HomeController {` or `function HomeController(`)
  - You must have a distinct filenaming strategy. Currently our loader looks for the folder name of the file, adds `Controller` to it, and then finds a reference to the old controller thanks to angular's injector, and then updates its methods one by one with the ones from nameController in your new module. So for instance if you have a file named `home.controller.js` under `components/home`, the loader will look for `<home></home>` directives and updates  the `HomeController` reference in angular's scope with HomeController's new methods`
  - Currently, we use isolateScope on every components (which is also the default with the new Angular Component method), if not, you'll have to change the way you get the controller reference. We also use `controller as vm` for all our component, so we get our instances with this line:

`angular.element(document).find('directiveName').isolateScope().vm`

### Template Loader
 - You must have one file per template (although this may not be mandatory to achieve hot reloading, it's just the way it is written)
 - The template file should be named according to the same startegy, i.e. `home.html` for `<home></home>` directive

## How does it work ?
The loaders are just adding a little piece of code to each file that can be hot loaded to declare themselves as hot-reloadable to webpack, and then to do some hacky magic to make angular aware of the changes, recompiling the templates against the scope, and change the methods of the controller prototype.

## Does it really work ?
Well our current app uses angular 1.X with es6, so it was written to ease our developement experience and it's been a great addition to our tooling ! It works really good for what we need but there are edge-cases where it doesn't. Feel free to post an issue to pinpoint failing cases

## It's 2017, how about angular2 ?
The methodology applied here could be easily ported to angular2
