(function() {
	'use strict';

	var module = angular.module('htmlResume.about.config', []);

	module.config([ '$stateProvider', function($stateProvider) {
		$stateProvider.state('about', {
			url : '/about',
			controller : 'AboutController',
			templateUrl : 'about/about.tpl.html',
			resolve : {
			},
			onEnter: function($stateParams) {
			}
		});
		
	} ]);
	
})();
