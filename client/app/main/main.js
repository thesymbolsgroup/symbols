'use strict';

angular.module('symbolsApp')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      template: '<main></main>'
    });
  });
