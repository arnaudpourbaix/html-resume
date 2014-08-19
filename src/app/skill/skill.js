/* global Chart */
angular.module('onlineResume.skill', []);

angular.module('onlineResume.skill').controller('SkillController', [ '$scope', function SkillController($scope) {
   	"use strict";
   	 
} ]);		

angular.module('onlineResume.skill')

//.directive('skill', [ '$compile', '$parse', '$timeout', function($compile, $parse, $timeout) {
//	'use strict';
//    return {
//        restrict: 'A',
//        link: function(scope, element, attrs, controller) {
//        	var skill = scope.$eval(attrs.skill);
//        	var html = [{value : skill.level, color : "#aed57c"}, {value : 100 - skill.level, color : "#eff7e5"}];
//        	new Chart(element[0].getContext("2d")).Doughnut(html);
//        }
//    };
//} ])

.directive('skill', [ '$compile', '$parse', '$timeout', function($compile, $parse, $timeout) {
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
} ])

;	
