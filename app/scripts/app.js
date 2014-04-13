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
      .when('/play', {
        templateUrl: 'partials/main',
        controller: 'MapCtrl'
      })
      .when('/chat', {
        templateUrl: 'partials/chat',
        controller: 'ChatCtrl'
      })
      .when('/',{
        templateUrl:'partials/start',
        controller: 'StartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });

NProgress.configure({ trickle: false });