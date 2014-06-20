/* global _ */
(function(_) {
	'use strict';

	var module = angular.module('htmlResume.project.services', []);
	
	module.service('ProjectService', [ '$http', '$q', '$logger', '$apxTools', 'SkillService', 'CompanyService',
	                                      function ProjectService($http, $q, $logger, $apxTools, SkillService, CompanyService) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var projectsPromise, projects;
		
		function buildProjects(data) {
			var now = new Date();
			angular.forEach(data, function(project) {
				//project.expand = true;
				if (project.client) {
					project.client = CompanyService.company(project.client);
				}
				if (angular.isArray(project.company)) {
					var companies = project.company; 
					project.company = [];
					angular.forEach(companies, function(company) {
						project.company.push(CompanyService.company(company));
					});
				} else if (project.company) {
					project.company = [ CompanyService.company(project.company) ];
				}
				project.start = $apxTools.parseDate(project.start);  
				project.end = $apxTools.parseDate(project.end);
				var endDate = project.end || now;
				project.length = endDate.getMonth() - project.start.getMonth() + 1 + (12 * (endDate.getFullYear() - project.start.getFullYear()));
				project.skills = SkillService.projectSkills(project.skills);
			});
			projects = _.chain(data).sortBy('start').reverse().value();
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
			projectsPromise = $q.all([ getProjects(), CompanyService.companies(), SkillService.skills() ]).then(function(result) {
				buildProjects(result[0]);
				return projects;
			});
			return projectsPromise;
		};

		service.project = function(id) {
			return projectsPromise.then(function() {
				return projects[id];
			});
		};
		
		return service;
	} ]);

	module.service('CompanyService', [ '$http', '$q', '$logger', function CompanyService($http, $q, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var companiesPromise, companies;

		function getCompanies() {
			if (companiesPromise) {
				return companiesPromise;
			}
			companiesPromise = $http({
				method : 'GET',
				url : 'assets/data/companies.json'
			}).then(function(response) {
				companies = response.data;
				return companies;
			});
			return companiesPromise;
		}
	
		service.companies = function() {
			return getCompanies();
		};

		service.company = function(id) {
			if (!companies) {
				throw new Error('companies are not initialized');
			}
			//console.log('companies', id);
			var result = _.find(companies, function(company) {
				return company.id === id;
			});
			return result;
		};
		
		return service;
	} ]);
	
})(_);
