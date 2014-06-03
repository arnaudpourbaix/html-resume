(function() {
	'use strict';

	var module = angular.module('htmlResume.main.config', []);

	module.config([	'$urlRouterProvider', '$locationProvider', function MainConfig($urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/projects');
	} ]);
	
	module.config([ '$provide',	function($provide) {
			// should be implemented in Angular 1.3.0, see
			// https://github.com/angular/angular.js/issues/4574
			$provide.decorator('$rootScope', [ '$delegate',	function($delegate) {
				$delegate.constructor.prototype.$onRootScope = function(name, listener) {
					var unsubscribe = $delegate.$on(name, listener);
					this.$on('$destroy', unsubscribe);
				};
				return $delegate;
			} ]);
	} ]);

	module.run([ '$rootScope', '$state', '$stateParams', function MainRun($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	} ]);
	
})();
