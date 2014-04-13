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
        io.sockets.socket(winner.name).emit('won', {});
        api.sendLocation('Cultural');
      }
    });
  });
};