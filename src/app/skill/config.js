(function() {
	'use strict';

	var module = angular.module('htmlResume.skill.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('skill', {
			url : '/skills',
			controller : 'SkillController',
			templateUrl : 'skill/skill.tpl.html',
			resolve : {
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
