'use strict';

var express = require('express');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

var app = express();

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);


var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var api = require('./lib/util/api')(io);

io.sockets.on('connection', function(socket){
  socket.on('new_player', function(data) {
    if(api.nbPlayers === 0){
      api.sendLocation('Cultural');
    }
    else{
      api.sendCurrent();
    }
    api.nbPlayers++;
    var pseudo = data.pseudo,
    color = data.color;

    socket.set('pseudo', pseudo);
    socket.set('color', color);
    socket.broadcast.emit('new_player', {pseudo: pseudo, color: color});

    socket.on('disconnect', function() {
      socket.get('pseudo', function (error, pseudo) {
        socket.get('color', function(error, color) {
          console.log(pseudo + ' disconnect');
          socket.broadcast.emit('disconnect_player', {pseudo: pseudo, color: color});
        });
      });
    });
  });
  require('./lib/controllers/chat')(socket);
  require('./lib/controllers/map')(socket, api, io);
});

io.sockets.on('disconnect',function(){
  api.nbPlayers--;
});


// Start server
server.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;