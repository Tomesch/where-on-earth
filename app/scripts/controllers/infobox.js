'use strict';

angular.module('woeApp')
  .controller('InfoboxCtrl', function ($scope, $http, socket) {
  	$scope.location = [];
  	$scope.display = 'display: none';
  	var timer;
  	socket.on('information', function(data){
  		console.log(data);
  		$scope.location = data.location;
  		$scope.display = 'display: block';

  		timer = setTimeout(function() {
  			console.log("interval")
  			$scope.display = 'display:none';
  			$scope.$apply();
  		}, 10000);
    });
  });
