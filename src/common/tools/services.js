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
			if (/^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(strDate)) {
				return new Date(RegExp.$1, parseInt(RegExp.$2, 10) - 1, RegExp.$3);
			} else if (/^(\d{4})-(\d{1,2})$/.test(strDate)) {
				return new Date(RegExp.$1, parseInt(RegExp.$2, 10) - 1);
			} else if (/^(\d{4})$/.test(strDate)) {
				return new Date(RegExp.$1);
			} else {
				throw new Error("invalid date format: " + strDate);
			}
		};
		
		return service;
	} ]);

}());
