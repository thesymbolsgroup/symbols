'use strict';

angular.module('symbolsApp', ['symbolsApp.auth', 'symbolsApp.admin', 'symbolsApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
