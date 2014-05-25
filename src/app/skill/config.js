(function() {
	'use strict';

	var module = angular.module('htmlResume.skill.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('skill', {
			url : '/skills',
			controller : 'SkillController',
			templateUrl : 'skill/skill.tpl.html',
			resolve : {
				skills : [ 'SkillService', function(SkillService) {
					return SkillService.skills();
				} ],
				types: [ 'SkillService', function(SkillService) {
					return SkillService.types();
				} ],
				groups : [ 'SkillService', function(SkillService) {
					return SkillService.groups();
				} ],
				levels : [ 'SkillService', function(SkillService) {
					return SkillService.levels();
				} ]
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
