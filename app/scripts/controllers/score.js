'use strict';

angular.module('woeApp')
  .controller('ScoreCtrl', function ($scope, $http, socket) {
    $scope.score = 0;
    socket.on('you_won', function(data){
      $scope.score = data.score;
    });
  });
