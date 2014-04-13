'use strict';

module.exports = function(socket, io) {
  var pseudo,
  color;
  socket.on('message', function (message) {
    if(message === '!top10'){
      var clients = io.sockets.clients().slice(0),
      mes = "";

      clients.sort(function(a ,b){
        return b.store.data.score - a.store.data.score;
      });

      clients.slice(0, 10);
      clients.forEach(function(val, ind, arr){
        mes = '#'+ parseInt(ind+1) + ' '+val.store.data.pseudo + ' ('+val.store.data.score+')';
        socket.emit('message',{
          pseudo: "**Server**",
          message: mes, 
          color: "#E74C3C0"
        });
      });
    }
    socket.get('pseudo', function (error, pseudo) {
      socket.get('color', function(error, color) {
        message = message;
        console.log("mess envoye :" + pseudo + color);
        socket.broadcast.emit('message', {pseudo: pseudo, message: message, color: color});
      });
    });
  }); 
};