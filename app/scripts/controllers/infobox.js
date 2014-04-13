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

		$('.infoBox').show('fast');

		var width = $('.choice-map-container').width();
		console.log('largeur ' + width);
        $('.infoBox').css('height', width + 'px');
        $('.infoBox').css('width', (width*1.5) + 'px');

		$scope.desc = replaceHtml(data.location.short_description[0]);
		$scope.site = replaceHtml(data.location.site[0]);



		timer = setTimeout(function() {
			$('.infoBox').hide('fast');
		}, 10000);


		function replaceHtml(text) {

		/*	text = text.replace('<p>', '');
			text = text.replace('</p>','');

			text = text.replace('<em>', '');
			text = text.replace('</em>',''); */

			text = text.replace('&eacute;', 'é');
			text = text.replace('&amp;', '&');
			text = text.replace('&ndash;', '-');
			text = text.replace('<span>;', '');
			text = text.replace('</span>;', '');
			text = text.replace('&nbsp;', ' ');
			text = text.replace('&ldquo;', '"');
			text = text.replace('&rdquo;', '"');

			text = text.replace(/<(?:.|\n)*?>/gm, '');

			return text;
		}
	});
});
