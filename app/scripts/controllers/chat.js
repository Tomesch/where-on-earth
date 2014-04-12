'use strict';

angular.module('woeApp')
  .controller('ChatCtrl', function ($scope, $http) {
  	console.log("bla")
  	var socket = io.connect('/');
    var pseudo = null;
    var color = null;

    var servPseudo = '**Server**';

    //Angular
    $scope.messages = [];
    $scope.messagePlaceHolder = 'Pseudo';
    $scope.sendValue = 'Connection';
    $scope.inputMessage = '';

     socket.on('message', function(data) {
     	var mess = getMessage(data.pseudo, data.message, data.color);
     	console.log(mess);
       	$scope.messages.push(mess);
       	$scope.$apply();
    });

     socket.on('new_player', function(data) {
     	var mess = getMessage(servPseudo, data.pseudo+' enter in chatroom...', data.color);
     	$scope.messages.push(mess);
     	$scope.$apply();
    });

     socket.on('disconnect_player', function(data) {
     	$scope.messages.push(getMessage(servPseudo, data.pseudo+' leave the chatroom...', data.color));
     	$scope.$apply();
    });

     $scope.sendMessage = function() {
     	console.log($scope.inputMessage);
     	var message = $scope.inputMessage;
     	if(message !== '') {
     		if(pseudo == null) {
     			pseudo = message;
                color = getRandomColor();
                socket.emit('new_player', {pseudo: pseudo, color: color});
                var mess = getMessage(servPseudo, "You're connected", color);
                $scope.messagePlaceHolder = 'Enter your message';
                $scope.sendValue = 'Send'
                $scope.messages.push(mess);
     		}
     		else {
     			socket.emit('message', message); 
     			$scope.messages.push(getMessage(pseudo, message, color));
     		}

     		$scope.inputMessage = '';
     	}
     }


     function getMessage(pseudo, message, color) {
     	var mess = {date: new Date().toLocaleTimeString(), pseudo: pseudo, message: message, color: color };
     	return mess;
     }

     function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

  });
