(function() {
	'use strict';

	var module = angular.module('htmlResume.project.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('project', {
			url : '/projects',
			controller : 'ProjectController',
			templateUrl : 'project/project.tpl.html',
			resolve : {
				projects : function(ProjectService) {
					return ProjectService.projects();
				}
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
