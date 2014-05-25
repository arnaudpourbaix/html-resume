(function() {
	'use strict';

	var module = angular.module('htmlResume.client.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('client', {
			url : '/clients',
			controller : 'ClientController',
			templateUrl : 'client/client.tpl.html',
			resolve : {
				clients : [ 'ClientService', function(ClientService) {
					return ClientService.clients();
				} ]
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
