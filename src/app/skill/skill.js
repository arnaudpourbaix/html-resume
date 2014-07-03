/* global Chart */
angular.module('onlineResume.skill', []);

angular.module('onlineResume.skill').controller('SkillController', [ '$scope', function SkillController($scope) {
   	"use strict";
   	
   	$scope.skills = [
   	              {
   	               "label": "Java",
   	               "start": 2008,
   	               "end": null,
   	               "level": 90
   	             },
   	             {
   	               "label": "Spring",
   	               "start": 2010,
   	               "end": null,
   	               "level": 60
   	             },
   	             {
	               "label": "Hibernate",
   	               "start": 2008,
   	               "end": null,
	               "level": 70
   	             },
   	             {
	               "label": "Maven",
   	               "start": 2008,
   	               "end": null,
	               "level": 70
   	             },
   	             {
   	               "label": "Struts",
   	               "start": 2010,
   	               "end": 2014,
   	               "level": 80
   	             },
   	             {
   	               "label": "Javascript",
   	               "start": 2010,
   	               "end": null,
   	               "level": 80
   	             },
   	             {
   	               "label": "jQuery",
   	               "start": 2010,
   	               "end": null,
   	               "level": 90
   	             },
   	             {
	               "label": "Angular JS",
   	               "start": 2013,
   	               "end": null,
	               "level": 60
   	             },
   	             {
   	               "label": "HTML 5",
   	               "start": 2013,
   	               "end": null,
   	               "level": 50
   	             },
   	             {
   	               "label": "CSS 3",
   	               "start": 2013,
   	               "end": null,
   	               "level": 50
   	             },
   	             {
	               "label": "Node JS",
   	               "start": 2013,
   	               "end": null,
	               "level": 70
   	             },
   	             {
   	               "label": "Grunt JS",
   	               "start": 2013,
   	               "end": null,
   	               "level": 70
   	             },
   	             {
   	               "label": "SQL",
   	               "start": 2000,
   	               "end": null,
   	               "level": 80
   	             }  
   	     ];
   	 
} ]);		

angular.module('onlineResume.skill').directive('skill', [ '$compile', '$parse', '$timeout', function($compile, $parse, $timeout) {
	'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
        	var skill = scope.$eval(attrs.skill);
        	var html = [{value : skill.level, color : "#aed57c"}, {value : 100 - skill.level, color : "#eff7e5"}];
        	new Chart(element[0].getContext("2d")).Doughnut(html);
        }
    };
} ]);	
