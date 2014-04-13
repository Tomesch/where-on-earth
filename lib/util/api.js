module.exports = function (io) {
   var delay = 5 * 1000, 
   api = {
    nbPlayers: 0,
    guesses: [],
    sendLocation: function(categ){
      this.guesses = [];
      this.getLocation(categ, function(data){
        io.sockets.emit('new', data);
        setTimeout(function(){
          io.sockets.emit('ask_results', {});
        }, delay);
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
