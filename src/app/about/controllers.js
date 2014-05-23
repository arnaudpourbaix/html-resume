(function() {
	'use strict';

	var module = angular.module('htmlResume.about.controllers', []);

	module.controller('AboutController', [ '$scope', '$logger', function AboutController($scope, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
	} ]);
	
})();
