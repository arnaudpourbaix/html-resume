/* global jQuery */
(function(window, $) {
	'use strict';

	var module = angular.module('jquery-mobile.collapsible', []);

	module.provider('$jqmCollapsible', function JqmCollapsibleProvider() {
		var options = {
			display: 'overlay'
		};

		this.$get = [ '$jqmCommon', '$compile',	function jqmCollapsibleService($jqmCommon, $compile) {
			var service = {
				options : function() {
					return options;
				}
			};
			return service;
		} ];
	});

	module.directive('jqmCollapsible', [ '$compile', '$parse', '$jqmCommon', '$jqmCollapsible', '$timeout', function JqmCollapsibleDirective($compile, $parse, $jqmCommon, $jqmCollapsible, $timeout) {
		return {
			restrict : 'AE',
			link : function(scope, element, attributes) {
				var params = $jqmCommon.getParams(scope.$eval(attributes.jqmCollapsible), [], []);
				//element.panel(options);
				$timeout(function() {
					element.appendTo(".ui-page").trigger("create");
				});
			}
		};
	} ]);

}(window, jQuery));