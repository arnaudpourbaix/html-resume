(function() {
	'use strict';

	var module = angular.module('htmlResume.experience.controllers', []);

	module.controller('ExperienceController', [ '$scope', '$logger', function ExperienceController($scope, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
	} ]);
	
})();
