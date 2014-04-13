module.exports = function (io) {
   var current = null,
   api = {
    delay: 20000,
    nbPlayers: 0,
    guesses: [],
    getCurrent: function(){
      return current;
    },
    sendCurrent: function(socket){
      socket.emit('new', current);
    },
    sendLocation: function(categ){
      this.guesses = [];
      this.getLocation(categ, function(data){
        data.delay = this.delay;
        current = data;
        io.sockets.emit('new', data);
        setTimeout(function(){
          io.sockets.in('ready').emit('ask_results', {});
        }, 20000);
      });
    },
    getLocation: function(givenCateg, callback){
      var fs = require('fs'),
      xml2js = require('xml2js'),
      util = require('util'),
      parser = new xml2js.Parser(),
      resCateg = [],
      extractedData,
      nrRows,
      categQuest;

      fs.readFile('./lib/data/unesco.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
          extractedData = result.query.row;
          nrRows = result.query.$.rows;
          for(var i = 0; i < nrRows; i++) {
            if (result.query.row[i].category == givenCateg) {
              resCateg.push(result.query.row[i]);
            }
          }
          var randCateg = Math.floor((Math.random()*resCateg.length))+0;
          categQuest = resCateg[randCateg];
          categQuest.long_description = null;
          callback(categQuest);
        });
      });
    }
  };

  return api;
}
