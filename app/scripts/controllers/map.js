'use strict';

angular.module('woeApp')
.controller('MapCtrl', function ($scope, $http) {
  /*$http.get('/api/awesomeThings').success(function(awesomeThings) {
    $scope.awesomeThings = awesomeThings;
  });*/
  $scope.map = {
    center: {
        latitude: -28.5433333300,
        longitude: -54.2658333300
    },
    zoom: 18,
    draggable: false,
    control: {},
    options: {
      scrollwheel: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    },
    events: {
      tilesloaded: function(){
        var map = $scope.map.control.getGMap();
        // c'est pas beau ça ?
      },
      bounds_changed: function(map){
        map.setCenter(new google.maps.LatLng(this.center.latitude, this.center.longitude));
      }
    }
  };
});
