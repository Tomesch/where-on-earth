'use strict';
var distances = require('../util/distances');

module.exports = function(socket, api) {
  socket.on('send_results', function(data){
    api.guesses.push(data); 
    if(api.guesses.length == api.nbPlayers){
      api.sendLocation('Cultural');
    }
  });
};