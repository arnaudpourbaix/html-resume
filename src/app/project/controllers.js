(function() {
	'use strict';

	var module = angular.module('htmlResume.project.controllers', []);

	module.controller('ProjectController', [ '$scope', '$logger', 'projects', function ProjectController($scope, $logger, projects) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		$scope.projects = projects;
		
		$scope.showProject = function(project) {
			console.log(project);
		};
		
	} ]);

	module.controller('ProjectDetailController', [ '$scope', '$logger', 'project', function ProjectDetailController($scope, $logger, project) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		$scope.project = project;
		log.info('project', project);
	} ]);
	
})();
