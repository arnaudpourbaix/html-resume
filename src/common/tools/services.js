(function() {
	'use strict';

	var module = angular.module('apx-tools.services', []);
	
	module.service('$apxTools', [ '$q', function $apxTools($q) {
		var service = {};
		
		function buildProjects(projects, clients) {
		}

		service.parseDate = function(strDate) {
			if (!strDate) {
				return null;
			}
			if (!/^(\d{4})-(\d{1,2})$/.test(strDate)) {
				throw new Error("invalid date format: " + strDate);
			}
			var d = new Date(RegExp.$1, parseInt(RegExp.$2, 10) - 1);
			return d;
		};
		
		return service;
	} ]);

}());
