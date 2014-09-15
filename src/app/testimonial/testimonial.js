/* global Chart */
angular.module('onlineResume.testimonial', [])

.controller('TestimonialController', function($scope) {
   	"use strict";
   	 
})		

.directive('testimonial', function($compile, $parse, $timeout) {
	'use strict';
    return {
        restrict: 'A',
        //template: '<span>{{skill.label}}</span><input value="{{skill.level / 20}}" class="rating">',
        link: function(scope, element, attrs, controller) {
        	var isPause = false;
        	var pauseOnDragging = function() {
        		isPause = true;
        	};

        	$timeout(function() {
            	element.owlCarousel({
            		autoPlay : 3000,
            		stopOnHover : true,
            		startDragging : pauseOnDragging,
            		slideSpeed  :  1000,
            		paginationSpeed : 500,
            		goToFirstSpeed : 2000,
            		singleItem : true,
            		responsive : true,
            		// touchDrag : false,
            		// mouseDrag : false,
            		addClassActive : true,
            		transitionStyle: 'fadeUp',
            	});
            	
            	$('#testimonial .owl-page span').eq(0).html('<img src="assets/img/testimonial/01.png">');
            	$('#testimonial .owl-page span').eq(1).html('<img src="assets/img/testimonial/02.png">');
            	$('#testimonial .owl-page span').eq(2).html('<img src="assets/img/testimonial/03.png">');
            	$('#testimonial .owl-page span').eq(3).html('<img src="assets/img/testimonial/04.png">');
        	});
        }
    };
})

;	
