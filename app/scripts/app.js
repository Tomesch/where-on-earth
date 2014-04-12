'use strict';

angular.module('woeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  
  'google-maps'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MapCtrl'
      })
      .when('/chat', {
        templateUrl: 'partials/chat',
        controller: 'ChatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });