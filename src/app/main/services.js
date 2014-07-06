angular.module('onlineResume.main.services', []).service('ClientService', [ '$http', '$q', '$logger', function ClientService($http, $q, $logger) {
	'use strict';
	var LOGGER_NAME = module.name + '.' + this.constructor.name, log = $logger.logger(LOGGER_NAME);

	var service = {};
	var clientsPromise, clients;

	function getClients() {
		if (clientsPromise) {
			return clientsPromise;
		}
		clientsPromise = $http({
			method : 'GET',
			url : 'assets/data/clients.json'
		}).then(function(response) {
			clients = response.data;
			return clients;
		});
		return clientsPromise;
	}

	service.clients = function() {
		return getClients();
	};

	service.client = function(id) {
		if (!clients) {
			throw new Error('clients are not initialized');
		}
		var result = _.find(clients, function(client) {
			return client.id === id;
		});
		return result;
	};

	return service;
} ]);
