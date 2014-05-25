/* global _ */
(function(_) {
	'use strict';

	var module = angular.module('htmlResume.client.services', []);
	
	module.service('ClientService', [ '$http', '$q', '$logger', function ClientService($http, $q, $logger) {
		var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);
		
		var service = {};
		var clientsPromise;

		function getClients() {
			if (clientsPromise) {
				return clientsPromise;
			}
			clientsPromise = $http({
				method : 'GET',
				url : 'assets/data/clients.json'
			}).then(function(response) {
				return response.data;
			});
			return clientsPromise;
		}
	
		service.clients = function() {
			return getClients();
		};
		
		return service;
	} ]);
	
	
})(_);
