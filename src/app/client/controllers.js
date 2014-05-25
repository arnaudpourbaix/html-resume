(function() {
	'use strict';

	var module = angular.module('htmlResume.client.controllers', []);

	module.controller('ClientController', [ '$scope', '$logger', 'clients', 
	                                       function ClientController($scope, $logger, clients) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		$scope.clients = clients;			
		
	} ]);
	
})();
