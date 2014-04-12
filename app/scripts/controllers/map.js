'use strict';

angular.module('woeApp')
.controller('MapCtrl', function ($scope, $http, socket) {
  socket.on('new', function(data){
    $scope.map.center = {
      latitude: data.latitude,
      longitude: data.longitude
    }
  });
  $scope.map = {
    center: {
        latitude: -28.5433333300,
        longitude: -54.2658333300
    },
    zoom: 10,
    draggable: false,
    control: {},
    options: {
      maxZoom: 10,
      scrollwheel: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    },
    events: {
      tilesloaded: function(){
        // c'est pas beau ça ?
      },
      bounds_changed: function(map){
        map.setCenter(new google.maps.LatLng(this.center.latitude, this.center.longitude));
      }
    }
  };
});
