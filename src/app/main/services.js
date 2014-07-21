angular.module('onlineResume.main.services', []).service('ResumeService', [ '$http', '$q', '$apxTools', function ResumeService($http, $q, $apxTools) {
	'use strict';

	var service = {};

	function general() {
		return $http({
			method : 'GET',
			url : 'assets/data/general.json'
		}).then(function(response) {
			return response.data;
		});
	}
	
	function companies() {
		return $http({
			method : 'GET',
			url : 'assets/data/companies.json'
		}).then(function(response) {
			return _.indexBy(response.data, 'id');
		});
	}

	function educations() {
		return $http({
			method : 'GET',
			url : 'assets/data/educations.json'
		}).then(function(response) {
			var educations = response.data;
			angular.forEach(educations, function(education) {
				education.date = $apxTools.parseDate(education.date);  
			});
			return _.sortBy(educations, function(education) {
				return education.date;
			}).reverse();
		});
	}

	function skills() {
		var promises = [];
		promises.push($http({
			method : 'GET',
			url : 'assets/data/skills.json'
		}));
		promises.push($http({
			method : 'GET',
			url : 'assets/data/skill_groups.json'
		}));
		return $q.all(promises).then(function(result) {
			var groups = _.indexBy(result[1].data, 'id');
			var skills = _.chain(result[0].data)
			.transform(function(result, skill, key) {
				skill.group = groups[skill.group];
				result[key] = skill;
			})
			.sortBy(function(skill) { 
				return skill.level; 
			})
			.reverse()
			.sortBy(function(skill) { 
				return skill.group.priority; 
			})
			.value();
			return skills;
		});
	}

	function projects() {
		return $http({
			method : 'GET',
			url : 'assets/data/projects.json'
		}).then(function(response) {
			var projects = response.data;
			angular.forEach(projects, function(project) {
				project.start = $apxTools.parseDate(project.start);  
				project.end = $apxTools.parseDate(project.end);
			});
			return _.sortBy(projects, function(project) {
				return project.start;
			}).reverse();
		});
	}
	
	function addClients(resume) {
		resume.clients = [];
		angular.forEach(resume.projects, function(project) {
			if (project.client && resume.clients.indexOf(project.client) === -1) {
				resume.clients.push(project.client);
			}
		});
	}
	
	service.resume = function() {
		var promises = [];
		promises.push(general());
		promises.push(companies());
		promises.push(skills());
		promises.push(projects());
		promises.push(educations());
		return $q.all(promises).then(function(result) {
			var resume = result[0];
			resume.companies = result[1];
			resume.orderedSkills = result[2];
			resume.skills = _.indexBy(resume.orderedSkills, 'id');
			resume.projects = result[3];
			resume.educations = result[4];
			addClients(resume);
			return resume;
		});
	};

	return service;
} ]);
