/* global _ */
(function(_) {
	'use strict';

	var module = angular.module('htmlResume.experience.services', []);
	
	module.service('ExperienceService', [ '$http', '$q', '$logger', 'SkillService', 'ClientService', function ExperienceService($http, $q, $logger, SkillService, ClientService) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var projectsPromise;
		
		function buildProjects(projects, clients) {
			angular.forEach(projects, function(project) {
				if (project.client) {
					project.client = ClientService.client(project.client);
				}
				
			});
			return projects;
		}

		function getProjects() {
			return $http({
				method : 'GET',
				url : 'assets/data/projects.json'
			}).then(function(response) {
				return response.data;
			});
		}
	
		service.projects = function() {
			if (projectsPromise) {
				return projectsPromise;
			}
			projectsPromise = $q.all([ getProjects(), ClientService.clients() ]).then(function(result) {
				return buildProjects(result[0], result[1]);
			});
			return projectsPromise;
		};
		
		return service;
	} ]);
	
})(_);
