(function() {
	'use strict';

	var module = angular.module('htmlResume.main.loggers', []);

	module.config([ '$loggerProvider', function($loggerProvider) {
		$loggerProvider.rootLevel('ALL');
	} ]);

	module.run([ '$logger', 'appSettings', function($logger, appSettings) {
		$logger.addAppender('BrowserConsoleAppender', 'ALL');
	} ]);
	
})();
