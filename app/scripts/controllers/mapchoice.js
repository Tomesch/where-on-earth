'use strict';

angular.module('woeApp')
.controller('MapChoiceCtrl', function ($scope) {
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
    latitude: null,
    longitude: null
  },
  events: {
    tilesloaded: function(){
      var map = $scope.map.control.getGMap(),
      width = $('.choice-map-container').width();
      $('.choice-map-container').css('height', width);
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
