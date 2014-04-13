'use strict';

angular.module('woeApp')
.controller('InfoboxCtrl', function ($scope, $http, socket) {
	$scope.location = [];
	$scope.display = 'display: none';
	$scope.desc = '';
	$scope.site = '';

	var timer;
	socket.on('information', function(data){
		console.log(data);
		$scope.location = data.location;
		$scope.display = 'display: block';

		$scope.desc = replaceHtml(data.location.short_description[0]);
		$scope.site = replaceHtml(data.location.site[0]);

		timer = setTimeout(function() {
			console.log("interval")
			$scope.display = 'display:none';
			$scope.$apply();
		}, 10000);


		function replaceHtml(text) {

			text = text.replace('<p>', '');
			text = text.replace('</p>','');

			text = text.replace('<em>', '');
			text = text.replace('</em>','');

			text = text.replace('&eacute;', 'é');
			text = text.replace('&amp;', '&');
			text = text.replace('&ndash;', '-');
			text = text.replace('<span>;', '');
			text = text.replace('</span>;', '');
			text = text.replace('&nbsp;', ' ');
			text = text.replace('&ldquo;', '"');
			text = text.replace('&rdquo;', '"');


			return text;
		}
	});
});
