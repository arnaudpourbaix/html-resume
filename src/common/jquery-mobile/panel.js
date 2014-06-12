/* global jQuery */
(function(window, $) {
	'use strict';

	var module = angular.module('jquery-mobile.panel', []);

	module.provider('$jqmPanel', function JqmPanelProvider() {
		var options = {
			display: 'overlay'
		};

		this.$get = [ '$jqmCommon', '$compile',	function jqmPanelService($jqmCommon, $compile) {
			var service = {
				options : function() {
					return options;
				}
			};
			return service;
		} ];
	});

	module.directive('jqmPanel', [ '$compile', '$parse', '$jqmCommon', '$jqmPanel', function JqmPanelDirective($compile, $parse, $jqmCommon, $jqmPanel) {
		return {
			restrict : 'AE',
			link : function(scope, element, attributes) {
				var params = $jqmCommon.getParams(scope.$eval(attributes.jqmPanel), [ 'id' ], [ 'options', 'instance' ]);
				var options = angular.extend({}, $jqmCommon.options(), $jqmPanel.options(), params.options, {
					close: function(event, ui) {
						element.css('overflow-y', 'hidden');
					},			
					open: function(event, ui) {
						element.css('overflow-y', 'auto');
					}			
				});
				element.panel(options);

				scope.$on('jqm-panel-open', function(event, args) {
					if (args && args.id === params.id) {
						element.panel('open');
					}
				});
				
				scope.$on('jqm-panel-close', function(event, args) {
					if (args && args.id === params.id) {
						element.panel('close');
					}
				});
				
			}
		};
	} ]);

}(window, jQuery));