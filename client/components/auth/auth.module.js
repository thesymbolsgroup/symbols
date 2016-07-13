'use strict';

angular.module('test3App.auth', ['test3App.constants', 'test3App.util', 'ngCookies', 'ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
