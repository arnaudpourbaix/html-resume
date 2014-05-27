/* global _ */
(function(_) {
	'use strict';

	var module = angular.module('htmlResume.experience.services', []);
	
	module.service('ExperienceService', [ '$http', '$q', '$logger', function ExperienceService($http, $q, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var projectsPromise;

		function getProjects() {
			if (projectsPromise) {
				return projectsPromise;
			}
			projectsPromise = $http({
				method : 'GET',
				url : 'assets/data/projects.json'
			}).then(function(response) {
				return response.data;
			});
			return projectsPromise;
		}
	
		service.projects = function() {
			return getProjects();
		};
		
		return service;
	} ]);
	
})(_);
