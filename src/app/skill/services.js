/* global _ */
(function(_) {
	'use strict';

	var module = angular.module('htmlResume.skill.services', []);
	
	module.service('SkillService', [ '$http', '$q', '$logger', function SkillService($http, $q, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var levelsPromise, skillsPromise, groupsPromise, typesPromise;

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

		function getSkillGroups() {
			if (groupsPromise) {
				return groupsPromise;
			}
			groupsPromise = $http({
				method : 'GET',
				url : 'assets/data/skill_groups.json'
			}).then(function(response) {
				return response.data;
			});
			return groupsPromise;
		}

		function getSkillTypes() {
			if (typesPromise) {
				return typesPromise;
			}
			typesPromise = $http({
				method : 'GET',
				url : 'assets/data/skill_types.json'
			}).then(function(response) {
				return response.data;
			});
			return typesPromise;
		}
		
		service.skills = function() {
			if (skillsPromise) {
				return skillsPromise;
			}
			skillsPromise = $q.all([ getSkills(), getLevels(), getSkillGroups(), getSkillTypes() ]).then(function(result) {
				var skills = result[0];
				var levels = _.indexBy(result[1], 'id');
				var groups = _.indexBy(result[2], 'id');
				var types = _.indexBy(result[3], 'id');
				angular.forEach(skills, function(skill) {
					skill.level = levels[skill.level]; 
					skill.group = groups[skill.group];
					skill.type = types[skill.type];
				});
				return skills;
			});
			return skillsPromise;
		};
		
		service.levels = function() {
			return getLevels();
		};

		service.groups = function() {
			return getSkillGroups();
		};

		service.types = function() {
			return getSkillTypes();
		};
		
		return service;
	} ]);
	
	
})(_);
