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
        io.sockets.socket(winner.name).store.data.score += 1;
        var winnerScore = io.sockets.socket(winner.name).store.data.score;
        io.sockets.emit('message', {
          pseudo: "**Server**",
          score: winnerScore,
          message: winnerName + ' won this round and has now a score of '+winnerScore, 
          color: "#E74C3C0"
        });
        api.sendLocation('Cultural');
      }
    });
  });
};