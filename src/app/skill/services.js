/* global _ */
(function(_) {
	'use strict';

	var module = angular.module('htmlResume.skill.services', []);
	
	module.service('SkillService', [ '$http', '$q', '$logger', function SkillService($http, $q, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var levelsPromise, skillsPromise, groupsPromise, typesPromise;
		var levels, skills, groups, types;

		function buildSkills(data) {
			angular.forEach(data, function(skill) {
				skill.level = levels[skill.level]; 
				skill.group = groups[skill.group];
				skill.type = types[skill.type];
			});
			skills = _.chain(data).sortBy('group').indexBy('id').value();
		}
		
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
				levels = _.indexBy(response.data, 'id');
				return levels;
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
				groups = _.indexBy(response.data, 'id');
				return groups;
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
				types = _.indexBy(response.data, 'id');
				return types;
			});
			return typesPromise;
		}
		
		service.skills = function() {
			if (skillsPromise) {
				return skillsPromise;
			}
			skillsPromise = $q.all([ getSkills(), getLevels(), getSkillGroups(), getSkillTypes() ]).then(function(result) {
				buildSkills(result[0]);
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
		
		service.projectSkills = function(ids) {
			if (!skills) {
				throw new CustomError(LOGGER_NAME, 'skills are not initialized');
			}
			var result = [];
			angular.forEach(ids, function(id) {
				var item = skills[id] || groups[id];
				if (!item) {
					throw new CustomError(LOGGER_NAME, 'unknown skill or group: ' + id);
				}
				result.push(item);
			});
			return result;
		};
		
		return service;
	} ]);
	
	
})(_);
