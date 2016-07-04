'use strict';

angular.module('symbolsApp.auth', ['symbolsApp.constants', 'symbolsApp.util', 'ngCookies',
    'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
