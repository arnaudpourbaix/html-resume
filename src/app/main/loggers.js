(function() {
	'use strict';

	var module = angular.module('htmlResume.main.loggers', []);

	module.config([ '$loggerProvider', function($loggerProvider) {
		$loggerProvider.rootLevel('ALL');
	} ]);

	module.run([ '$logger', 'appSettings', function($logger, appSettings) {
		$logger.addAppender('BrowserConsoleAppender', 'ALL');
	} ]);

	module.config([ '$provide', function($provide) {
		$provide.decorator("$exceptionHandler", function($delegate, $injector) {
			return function(exception, cause){
				var $rootScope = $injector.get("$rootScope");
				var $logger = $injector.get("$logger");
				var logger = exception.name ? $logger.logger(exception.name) : $logger.rootLogger();
				logger.fatal(exception.message);
//				$delegate(exception, cause);
			};
		});
	}]);

	function CustomError(location, message) {
	    this.name = location;
	    this.message = message || "";
	}
	CustomError.prototype = Error.prototype;
	window.CustomError = CustomError;
	
})();
