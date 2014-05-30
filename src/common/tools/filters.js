(function(window) {
	'use strict';

	var module = angular.module('apx-tools.filters', []);

	module.filter('range', function RangeFilter() {
		return function(input, total) {
			total = parseInt(total, 10);
			for (var i = 0; i < total; i++) {
				input.push(i);
			}
			return input;
		};
	});

	module.filter('padNumber', function padNumberFilter() {
		return function (number, len) {
			len = parseInt(len, 10);
			number = parseInt(number, 10);
			if (isNaN(number) || isNaN(len)) {
				return number;
			}
			var N = Math.pow(10, len);
			return number < N ? ("" + (N + number)).slice(1) : "" + number;
        };
    });	
	
}(window));
