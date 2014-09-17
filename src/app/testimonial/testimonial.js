/* global Chart */
angular.module('onlineResume.testimonial', [])

.controller('TestimonialController', function($scope) {
   	"use strict";
   	 
})		

.directive('testimonials', function($compile, $parse, $timeout, $interpolate) {
	'use strict';
    return {
        restrict: 'A',
        templateUrl: 'testimonial/testimonial.tpl.html',
        replace: true,
        scope: {
        	testimonials : '=',
        	companies : '='
        },
        link: function(scope, element, attrs, controller) {
        	$timeout(function() {
            	element.owlCarousel({
            		autoPlay : 3000,
            		stopOnHover : true,
            		slideSpeed  :  1000,
            		paginationSpeed : 500,
            		goToFirstSpeed : 2000,
            		singleItem : true,
            		responsive : true,
            		addClassActive : true,
            		transitionStyle: 'fadeUp',
            	});
            	
            	angular.forEach(scope.testimonials, function(testimonial, index) { // replace carousel navigation icons by photos
            		var photo = $interpolate('<img src="assets/img/testimonial/{{filename}}">')({ filename: testimonial.photo || 'default.png' });
            		$('#testimonial .owl-page span').eq(index).html(photo);
            	});
        	});
        }
    };
})

;	
