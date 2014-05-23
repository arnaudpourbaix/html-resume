(function() {
	'use strict';

	var module = angular.module('htmlResume.skill.controllers', []);

	module.controller('SkillController', [ '$scope', '$logger', 'SkillService', 'skills', 'levels', 
	                                       function SkillController($scope, $logger, SkillService, skills, levels) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		$scope.skills = skills;			
		$scope.levels = levels;			
		
	} ]);
	
})();
