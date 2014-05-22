(function(window) {
	'use strict';

	var module = angular.module('toolbox', [ 'toolbox.directives', 'toolbox.services', 'toolbox.filters' ]);

	/**
	 * @ngdoc directive
	 * @name ngScopeElement
	 * @module toolbox
	 * @directive
	 * 
	 * @description Assign a DOM element to a scope.
	 * 
	 */
	module.directive("ngScopeElement", function() {
		return {
			restrict : "A",
			compile : function compile() {
				return {
					pre : function preLink(scope, iElement, iAttrs, controller) {
						scope[iAttrs.ngScopeElement] = iElement;
					}
				};
			}
		};

	});
	
}(window));
