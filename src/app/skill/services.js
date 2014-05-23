/* global _ */
(function(_) {
	'use strict';

	var module = angular.module('htmlResume.skill.services', []);
	
	module.service('SkillService', [ '$http', '$q', '$logger', function SkillService($http, $q, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var levelsPromise, skillsPromise;

		function getSkills() {
			if (skillsPromise) {
				return skillsPromise;
			}
			skillsPromise = $http({
				method : 'GET',
				url : 'assets/data/skills.json'
			}).then(function(response) {
				return response.data;
			});
			return skillsPromise;
		}
		
		function getLevels() {
			if (levelsPromise) {
				return levelsPromise;
			}
			levelsPromise = $http({
				method : 'GET',
				url : 'assets/data/levels.json'
			}).then(function(response) {
				return response.data;
			});
			return levelsPromise;
		}
		
		service.skills = function() {
			return $q.all([ getSkills(), getLevels() ]).then(function(result) {
				var skills = result[0];
				var levels = _.indexBy(result[1], 'id');
				angular.forEach(skills, function(skill) {
					skill.level = levels[skill.level]; 
				});
				log.trace('skills', skills);
				return skills;
			});
		};
		
		service.levels = function() {
			return getLevels();
		};
		
		return service;
	} ]);
	
	
})(_);
