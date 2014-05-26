(function(window) {
	'use strict';

	/**
	 * @ngdoc module
	 * @name an-isotope
	 * @module an-isotope
	 * @description
	 *
	 * # an-isotope
	 * This module is a wrapper for isotope library.
	 *
	 */
	var module = angular.module('apx-isotope', []);
	
	/**
	 * @ngdoc provider
	 * @name $apxIsotope
	 * @module an-isotope
	 * @description
	 *
	 * # $apxIsotope
	 * This provider contains all core functions.
	 * 
	 * Configuration:
	 *
	 */
	module.provider('$apxIsotope', function() {
		var options = {
		};

		this.$get = [ '$interpolate', function($interpolate) {
			var service = {};
					
			return service;
		} ];
	});
	
	/**
	 * @ngdoc directive
	 * @name anIsotopeContainer
	 * @module an-isotope
	 * @directive
	 * 
	 * @description This directive activates isotope plugin on DOM element.
	 * 
	 * 		<div data-ng-cloak class="isotope-panel" 
	 *			data-an-isotope-container 
	 *	 		data-an-isotope-options="tuilesConfig"
	 *	 		data-an-isotope-sort-by="sort.id"
	 *	 		data-an-isotope-item-selector=".isotope-item" 
	 *	 		data-an-isotope-layout-mode="masonry" data-an-isotope-layout-gutter="10">
	 *			<div data-ng-repeat="d in data" class="isotope-item mini">
	 *				<div class="isotope-title">{{d.label}}</div>
	 *				<div class="main-indicators">{{d.id}}</div>
	 *				<div class="icons"></div>
	 *				<div class="click-zone-top" data-ng-click="selectItem(d.id)"></div>
	 *				<div class="click-zone-bottom"></div>
	 *			</div>
	 *		</div>
	 * 
	 */
	module.directive('apxIsotopeContainer', ['$apxIsotope', '$timeout', '$parse', function($apxIsotope, $timeout, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller) {
            	var sortItems = function() {
            		element.isotope({
            			sortBy: sortBy(scope),
            			sortAscending: sortAscending(scope)
            		});            		
            	};
            	var setWatchers = function() {
                	scope.$watch(function() {
                		return sortBy(scope);
                	}, function(newValue, oldValue) {
                		if (angular.isUndefined(newValue)) {
                			return;
                		}
                		sortItems();
                	});
                	scope.$watch(function() {
                		return sortAscending(scope);
                	}, function(newValue, oldValue) {
                		if (angular.isUndefined(newValue)) {
                			return;
                		}
                		sortItems();
                	});
            	};
            	
            	var createComponent = function() {
                	var params = angular.extend({}, options, {
        				itemSelector: itemSelector,
        				layoutMode: layout,
        				masonry: {
        					gutter: gutter
        				}
                	});
            		$timeout(function() {
            			//element.isotope(params);
            			element.packery({ itemSelector: itemSelector, gutter: gutter });            			
//            			setWatchers(); 
//						
//            			$("img").load(function () {
//            				element.isotope('reLayout');
//            			});
						//jQuery(itemSelector).show();
            		}, 1000);
            	};
            	
            	var itemSelector = attrs.apxIsotopeItemSelector || 'div';
            	var layout = attrs.apxIsotopeLayoutMode || 'masonry';
            	var gutter = parseInt(attrs.apxIsotopeLayoutGutter, 10) || 0;
            	var options = scope.$eval(attrs.apxIsotopeOptions) || {};
            	var sortBy = $parse(attrs.apxIsotopeSortBy);
            	var sortAscending = $parse(attrs.apxIsotopeSortAscending);
            	
            	createComponent();
            }
        };
        
    }]);
	
})(window);