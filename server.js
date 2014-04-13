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
  if(api.nbPlayers === 0){
    api.sendLocation('Cultural');
  }
  api.nbPlayers++;
  require('./lib/controllers/chat')(socket);
  require('./lib/controllers/map')(socket, api);
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