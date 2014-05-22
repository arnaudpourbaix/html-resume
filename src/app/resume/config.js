(function() {
	'use strict';

	var module = angular.module('htmlResume.resume.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('resume', {
			url : '/resume',
			controller : 'ResumeController',
			templateUrl : 'resume/resume.tpl.html',
			resolve : {
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
