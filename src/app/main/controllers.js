(function mainControllersModule() {
	'use strict';

	var module = angular.module('onlineResume.main.controllers', []);

	module.controller('MainController', [ '$q', '$scope', 'ResumeService', function MainController($q, $scope, ResumeService) {
		ResumeService.resume().then(function(resume) {
			$scope.resume = resume;
			console.log(resume);
		});
	} ]);
	
})();
