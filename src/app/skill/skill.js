/* global Chart */
angular.module('onlineResume.skill', [])

.controller('SkillController', function($scope) {
   	"use strict";
   	 
})

.directive('skill', function($compile, $parse, $timeout) {
	'use strict';
    return {
        restrict: 'A',
        template: '<span>{{skill.label}}</span><input value="{{skill.level / 20}}" class="rating">',
        link: function(scope, element, attrs, controller) {
        	var skill = scope.$eval(attrs.skill);
        	var input = $(element.children()[1]);
        	$timeout(function() {
            	input.rating({
            		stars: 5,
            		size: 'xs',
            		readonly: true,
            		showClear: false,
            		showCaption: false
            	});
        	});
        }
    };
})

;	
