'use strict';

angular.module('woeApp')
  .controller('ChatCtrl', function ($scope, $http, socket) {
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
     	var message = $scope.inputMessage;
     	if(message !== '') {
     		if(pseudo == null) {
     			pseudo = message;
                color = getRandomFlatColor();
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

     function getRandomFlatColor() {
     	var tabColor = ['#1abc9c', '#16a085', '#2ecc71', '#27ae60', 
     	'#3498db', '#2980b9', '#9b59b6', '#8e44ad', '#34495e', '#2c3e50', 
     	'#f39c12', '#d35400', '#e74c3c', '#95a5a6'];

     	return tabColor[(Math.round(Math.random() * 256 )) % tabColor.length];
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
