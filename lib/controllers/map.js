'use strict';
var distances = require('../util/distances');

module.exports = function(socket, api, io) {
  socket.on('send_results', function(data){
    socket.get('pseudo', function(err, name){
      data.player = socket.id;
      api.guesses.push(data);
      if(api.guesses.length == api.nbPlayers){
        var currentPoints = {
          latitude: +api.getCurrent().latitude,
          longitude: +api.getCurrent().longitude
        };
        var winner = distances.sortByDistance(currentPoints,api.guesses)[0];
        var winnerName = io.sockets.socket(winner.name).store.data.pseudo;
        var winnerDistance = Math.round(winner.distance);
        var n;
        if(winner.distance < 100){
          n = 10;
          io.sockets.socket(winner.name).store.data.score += 10;
        }
        else if(winner.distance < 500){
          n = 5;
          io.sockets.socket(winner.name).store.data.score += 5;
        }
        else{
          n = 1;
          io.sockets.socket(winner.name).store.data.score += 1;
        }
        var winnerScore = io.sockets.socket(winner.name).store.data.score;
        io.sockets.socket(winner.name).emit('you_won', {
          score: io.sockets.socket(winner.name).store.data.score
        });
        io.sockets.emit('message', {
          pseudo: "**Server**",
          score: winnerScore,
          message: winnerName + ' gets '+n+' points for placing his marker '+winnerDistance+ 'km away from the viewed position!', 
          color: "#E74C3C0"
        });
        api.sendLocation('Cultural');
      }
    });
  });
};