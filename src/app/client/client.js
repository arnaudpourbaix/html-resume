angular.module('onlineResume.client', [])

.controller('ClientController', function($scope) {
   	"use strict";

	$scope.viewAll = false;

	$scope.showAll = function() {
		$scope.viewAll = true;
		$('.container > .show-hide').delay('600').slideDown();
		var x = 800;
		$('#short').nextAll('.c-logo').each(function() {
			$(this).delay(x).fadeIn(600);
			x += 20;
		});
	};

	$scope.hideAll = function() {
		$scope.viewAll = false;
		$('.container > .show-hide').slideUp('slow');
		$('#short').nextAll('.c-logo').fadeOut(200);
	};
   	
})

;		
