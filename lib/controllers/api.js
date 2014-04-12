'use strict';

module.exports = function(io) {

  var guesses = [],
  nbClients = 0;

  getRandomPlaceByCategory('Cultural');

  io.sockets.on('connection',function(socket){
    nbClients++;

    socket.on('send_results', function(data){
      guesses.push(data);
      if(guesses.length == nbClients){
        compareGuesses();
      }
      else{

      }
    });
  });

  io.sockets.on('disconnect',function(){
    nbClients++;
  });

  function compareGuesses(){
    getRandomPlaceByCategory('Cultural');
  }

  function getRandomPlaceByCategory(givenCateg) {

    var fs = require('fs'),
    xml2js = require('xml2js'),
    util = require('util');

    var parser = new xml2js.Parser(),
    resCateg = new Array(),
    extractedData,
    nrRows,
    categQuest;


  // a changer le path vers le fishir xml
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
      console.log(randCateg);
      categQuest = resCateg[randCateg];
      categQuest.long_description = null;
      io.sockets.emit('new', categQuest);
      setTimeout(function(){
        io.sockets.emit('ask_results', {});
      }, 5000);
    });
  });
}
};
