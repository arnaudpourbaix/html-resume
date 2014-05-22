(function() {
	'use strict';

	var module = angular.module('htmlResume.formation.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('formation', {
			url : '/formations',
			controller : 'FormationController',
			templateUrl : 'formation/formation.tpl.html',
			resolve : {
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
