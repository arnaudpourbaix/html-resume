(function() {
	'use strict';

	var module = angular.module('htmlResume.experience.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('experience', {
			url : '/experiences',
			controller : 'ExperienceController',
			templateUrl : 'experience/experience.tpl.html',
			resolve : {
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
