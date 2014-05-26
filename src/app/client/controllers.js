(function() {
	'use strict';

	var module = angular.module('htmlResume.client.controllers', []);

	module.controller('ClientController', [ '$scope', '$logger', 'clients', 
	                                       function ClientController($scope, $logger, clients) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);

//		var sortData = function() {
//			var result = {};
//			angular.forEach(PubcaFilterService.sorts(), function(sort) {
//				if (sort.enable) {
//					var value = sort.selector;
//					if (sort.type === 'integer') {
//						value += ' parseInt';
//					} else if (sort.type === 'float') {
//						value += ' parseFloat';
//					} 
//					result[sort.id] = value;
//				}
//			});
//			return result;
//		};
		
		$scope.clients = clients;			
		
		$scope.isotopeConfig = {
			transitionDuration: '0.6s'
			//,getSortData: sortData()
		};
		
	} ]);
	
})();
