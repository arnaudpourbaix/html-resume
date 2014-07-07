angular.module('onlineResume.main.services', []).service('ResumeService', [ '$http', '$q', function ResumeService($http, $q) {
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

	function skills() {
		return $http({
			method : 'GET',
			url : 'assets/data/skills.json'
		}).then(function(response) {
			return _.indexBy(response.data, 'id');
		});
	}

	function projects() {
		return $http({
			method : 'GET',
			url : 'assets/data/projects.json'
		}).then(function(response) {
			return response.data;
		});
	}
	
	service.resume = function() {
		var promises = [];
		promises.push(general());
		promises.push(companies());
		promises.push(skills());
		promises.push(projects());
		return $q.all(promises).then(function(result) {
			var resume = result[0];
			resume.companies = result[1];
			resume.skills = result[2];
			resume.projects = result[3];
			return resume;
		});
	};

	return service;
} ]);
