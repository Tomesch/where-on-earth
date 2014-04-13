'use strict';

module.exports = function(socket, pseudo, color) {

    
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