'use strict';

angular.module('woeApp')
.controller('MapChoiceCtrl', function ($scope, socket) {
  var timer;
  socket.on('new', function() {
    clearInterval(timer);
    var time = 100;
    timer = setInterval(function(){
      time--;
      NProgress.set(time/100);
    },100);
  });
  socket.on('ask_results', function(){
    var data = {
      latitude: $scope.map.clickedMarker.latitude,
      longitude: $scope.map.clickedMarker.longitude
    };
    socket.emit('send_results', data);
  });
  socket.on('end_of_round', function(){
    
  });
 $scope.map = {
  center: {
    latitude: 34,
    longitude: -94
  },
  zoom: 1,
  control: {},
  options: {
    minZoom: 1,
    scrollwheel: true,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  },
  clickedMarker: {
    options: {
      animation: google.maps.Animation.DROP,
      draggable: true
    },
    latitude: 0,
    longitude: 0
  },
  events: {
    tilesloaded: function(){
      var map = $scope.map.control.getGMap(),
      width = $('.choice-map-container').width();
      $('.choice-map-container').css('height', width);
      $('.infoBox').css('height', width);
      $('.infoBox').css('width', (width*1.5) + 'px');
      google.maps.event.trigger(map, "resize");
    },
    bounds_changed: function(map){
      var map = $scope.map.control.getGMap(),
      width = $('.choice-map-container').width();
      $('.choice-map-container').css('height', width);
      $('.infoBox').css('height', width);
      $('.infoBox').css('width', (width*1.5) + 'px');
      google.maps.event.trigger(map, "resize");
    },
    click: function(map, eventName, eventArgs){
      var e = eventArgs[0];
      $scope.$apply(function(){
        $scope.map.clickedMarker.latitude = e.latLng.lat();
        $scope.map.clickedMarker.longitude = e.latLng.lng();
        console.log("ok");
      });
      $scope.$apply();
    }
  }
};

});
