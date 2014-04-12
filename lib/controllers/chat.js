'use strict';

module.exports = function(socket, pseudo, color) {
    // Player connection
    socket.on('new_player', function(data) {
        console.log(pseudo);
        pseudo = data.pseudo;
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

    // Message post
    socket.on('message', function (message) {
        socket.get('pseudo', function (error, pseudo) {
            socket.get('color', function(error, color) {
                message = message;
                console.log("mess envoye :" + pseudo + color);
                socket.broadcast.emit('message', {pseudo: pseudo, message: message, color: color});
            });
        });
    }); 
};