(function() {
	'use strict';

	/**
	 * @ngdoc module
	 * @name an-breadcrumb
	 * @module an-breadcrumb
	 * @description
	 *
	 * # an-breadcrumb
	 * This module adds a directive to display a breadcrumb based on ui-router states. Each config state can get a breadcrumb 
	 * object and if omitted, it will not be included in breadcrumb. Below an example of a config state:
	 * 
	 * 		$stateProvider.state('pubca.axe', {
	 * 			url : '/:regionId/:siteId',
	 * 			resolve : {
	 *				region: function(AxeService, $stateParams) {
	 *					return AxeService.region($stateParams.regionId);
	 *				},
	 *				site: function(AxeService, $stateParams) {
	 *					return AxeService.site($stateParams.siteId);
	 *				}
	 *			},
	 *			breadcrumb: {
	 *				label: '{{ site ? site.labelSite : (region ? region.labelRegion : "France") }}',
	 *				truncate: false,
	 *				selected: '{{ site || region }}',
	 *				selectEvent : 'selectAxeGeographique',
	 *				closeEvent: 'resetAxeGeographique'
	 *			}
	 *		});
	 *
	 *		- label is an angular expression that will be interpolated with resolve objects.
	 *		- truncate can be used to truncate label. By default, it is set to false. 
	 *				Otherwise, it will use this property value (number) to truncate label. 
	 *		- selected is an angular expression to determine if this element must be selected.
	 *				Selected is just a visual indication that can eventually add a close button, it is not related to anything else.
	 *				Expression will be evaluated as a boolean.
	 *		- selectEvent can be used to broadcast an event to all children scopes.
	 *				This event occurs on a click on breadcrumb's label.
	 * 				Its value contains event's name.
	 *		- closeEvent can be used to broadcast an event to all children scopes.
	 *				This event occurs on a click on breadcrumb's close button which only appears if selected.
	 * 				Its value contains event's name.
	 *
	 *
	 */
	var module = angular.module('an-breadcrumb', [ 'ui.router' ]);
	
	/**
	 * @ngdoc provider
	 * @name $anBreadcrumb
	 * @module an-breadcrumb
	 * @description
	 *
	 * # $anBreadcrumb
	 * This provider (used by a directive) contains all core functions.
	 * 
	 * Configuration:
	 * - truncate : false by default, can be set to any number within a config block.
	 * 			module.config([	'$anBreadcrumbProvider', function BreadcrumbConfig($anBreadcrumbProvider) {
	 * 				$anBreadcrumbProvider.truncate(15);
	 * 			} ]);
	 *
	 */
	module.provider('$anBreadcrumb', function() {
		var options = {
			truncate: false
		};
		this.truncate = function(value) {
			options.truncate = value;
		};

		this.$get = [ '$interpolate', function($interpolate) {
			var service = {};
			
			/**
			 * @ngdoc function
			 * @name $anBreadcrumb.getDisplayedLabel
			 * @module an-breadcrumb
			 * @function
			 * 
			 * @description returns an object containing display label (with an optional truncated label).
			 * @param {object}
			 *           state (path's item of $state object).
			 * @param {boolean}
			 *           truncate truncated label indicator.
			 * @returns {object} an object with 2 properties: label and short (truncated label).
			 */
			service.getDisplayedLabel = function(state, truncate) {
            	if (!state.breadcrumb || !state.breadcrumb.label) {
            		return null;
            	}
                var result = {
                	label: $interpolate(state.breadcrumb.label)(state.locals.globals),
                	isTruncated: false
                };
                if (truncate) {
                	truncate = options.truncate;
                }
                if (angular.isDefined(state.breadcrumb.truncate)) {
                	truncate = state.breadcrumb.truncate;
                }
                if (truncate && result.label.length > truncate) {
                	result.short = result.label.substr(0, truncate) + '...';
                }
                return result;
            };

			/**
			 * @ngdoc function
			 * @name $anBreadcrumb.isCurrentState
			 * @module an-breadcrumb
			 * @function
			 * 
			 * @description returns true if both states are the same, equality is based on their name.
			 * @param {object}
			 *           $state ui-router $state object.
			 * @param {object}
			 *           state (path's item of $state object).
			 * @returns {boolean} returns true if both states are the same.
			 */
            service.isCurrentState = function($state, state) {
            	var current = $state.$current.name === state.name;
                return current;
            };
           
			/**
			 * @ngdoc function
			 * @name $anBreadcrumb.getNavigationState
			 * @module an-breadcrumb
			 * @function
			 * 
			 * @description return a navigation object based on current state.
			 * @param {object}
			 *           $scope breadcrumb controller's scope.
			 * @param {object}
			 *           $state ui-router $state object.
			 * @param {object}
			 *           $stateParams ui-router $stateParams object.
			 * @returns {object} navigation object.
			 */
            service.getNavigationState = function($scope, $state, $stateParams) {
            	/**
            	 * @description
            	 *
            	 * This object is built around $state object along with breadcrumb config properties to provide every needed information to generate a breadcrumb.
            	 *
            	 */
            	var nav = {
                    currentState: $state.$current,
                    params: $stateParams,
        			/**
        			 * @ngdoc function
        			 * @name isDisplayed
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description returns true if state contains a valid display label (not null and not empty).
					 * @param {object}
					 *           state (path's item of $state object).
        			 * @returns {boolean} boolean value.
        			 */
                    isDisplayed: function(state) {
                    	var display = service.getDisplayedLabel(state);
                    	return display != null && display.label.length;
                    },
        			/**
        			 * @ngdoc function
        			 * @name showCloseButton
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description returns true if state should display a close button. Set in breadcrumb's state config, state should have selected and closeEvent properties.
					 * @param {object}
					 *           state (path's item of $state object).
        			 * @returns {boolean} boolean value.
        			 */
                    showCloseButton: function(state) {
                    	return state.breadcrumb && nav.isSelected(state) && state.breadcrumb.closeEvent;
                    },
        			/**
        			 * @ngdoc function
        			 * @name hasAction
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description returns true if state has a select action.
					 * @param {object}
					 *           state (path's item of $state object).
        			 * @returns {boolean} boolean value.
        			 */
                    hasAction: function(state) {
                    	return state.breadcrumb && state.breadcrumb.selectEvent;
                    },
        			/**
        			 * @ngdoc function
        			 * @name selectAction
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description broadcast select event if state has a select action.
					 * @param {object}
					 *           state (path's item of $state object).
        			 */
                    selectAction: function(state) {
                    	if (!state.breadcrumb || !state.breadcrumb.selectEvent) {
                    		return;
                    	}
                   		$scope.$broadcast(state.breadcrumb.selectEvent);
                    },
        			/**
        			 * @ngdoc function
        			 * @name closeAction
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description broadcast close event if state has a close action.
					 * @param {object}
					 *           state (path's item of $state object).
        			 */
                    closeAction: function(state) {
                    	if (!state.breadcrumb || !state.breadcrumb.closeEvent) {
                    		return;
                    	}
                   		$scope.$broadcast(state.breadcrumb.closeEvent);
                    },
        			/**
        			 * @ngdoc function
        			 * @name getDisplayName
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description return state full label (no truncate).
					 * @param {object}
					 *           state (path's item of $state object).
        			 * @returns {string} label.
        			 */
                    getDisplayName: function(state) {
                    	return service.getDisplayedLabel(state).label;
                    },
        			/**
        			 * @ngdoc function
        			 * @name getShortDisplayName
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description return state short label (truncate if needed).
					 * @param {object}
					 *           state (path's item of $state object).
        			 * @returns {string} short label.
        			 */
                    getShortDisplayName: function(state) {
                    	return service.getDisplayedLabel(state).short;
                    },
        			/**
        			 * @ngdoc function
        			 * @name isCurrent
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description return true if state is the current one (compared to $state.$current). 
					 * @param {object}
					 *           state (path's item of $state object).
        			 * @returns {boolean} boolean value.
        			 */
                    isCurrent: function(state) {
                    	return service.isCurrentState(state);
                    },
        			/**
        			 * @ngdoc function
        			 * @name isSelected
        			 * @module an-breadcrumb
        			 * @function
        			 * 
        			 * @description return true if state is selected. It is determined by interpolating selected expression set in config section if provided.
					 * @param {object}
					 *           state (path's item of $state object).
        			 * @returns {boolean} boolean value.
        			 */
                    isSelected: function(state) {
                    	if (!state.breadcrumb || !state.breadcrumb.selected) {
                    		return false;
                    	}
                    	var selected = $interpolate(state.breadcrumb.selected)(state.locals.globals);
                    	return selected;
                    }
                };
            	return nav;
            };
					
			return service;
		} ];
	});
	
	/**
	 * @ngdoc directive
	 * @name anBreadcrumb
	 * @module an-breadcrumb
	 * @directive
	 * 
	 * @description This directive displays a breadcrumb based on angular-ui states.
	 * Breadcrumb is updated on state changed (based on events).
	 * 
	 * 		<an-breadcrumb />
	 * 
	 * Template and css can eventually be modified locally.
	 * 
	 */
	module.directive('anBreadcrumb', ['$anBreadcrumb', function($anBreadcrumb) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'breadcrumb/breadcrumb.tpl.html',
            controller: ['$scope', '$state', '$stateParams', '$anBreadcrumb', function($scope, $state, $stateParams, $anBreadcrumb) {
                var setNavigationState = function() {
                    $scope.$navigationState = $anBreadcrumb.getNavigationState($scope, $state, $stateParams);
                };

                $scope.$on('$stateChangeSuccess', function() {
                    setNavigationState();
                });

                setNavigationState();
            }],
            link: function(scope, element, attrs, controller) {
            }
        };
        
    }]);

})();