(function(window) {
	'use strict';

	var module = angular.module('apx-tools', [ 'apx-tools.directives', 'apx-tools.services', 'apx-tools.filters' ]);

	/**
	 * @ngdoc directive
	 * @name apxScopeElement
	 * @module apx-toolbox
	 * @directive
	 * 
	 * @description Assign a DOM element to a scope.
	 * 
	 */
	module.directive("apxScopeElement", function() {
		return {
			restrict : "A",
			compile : function compile() {
				return {
					pre : function preLink(scope, iElement, iAttrs, controller) {
						scope[iAttrs.apxScopeElement] = iElement;
					}
				};
			}
		};

	});
	
}(window));
