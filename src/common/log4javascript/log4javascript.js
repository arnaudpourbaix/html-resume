/* global log4javascript */
(function(log4javascript) {
	'use strict';

	/**
	 * @ngdoc module
	 * @name apx-log4javascript
	 * @module apx-log4javascript
	 * @description
	 *
	 * # apx-log4javascript
	 * This module is a wrapper for log4javascript library.
	 *
	 */
	var module = angular.module('apx-log4javascript', []);
	
	/**
	 * @ngdoc provider
	 * @name $logger
	 * @module apx-log4javascript
	 * @description
	 *
	 * # $logger
	 * This provider contains all core functions.
	 * 
	 * Configuration:
	 *
	 */
	module.provider('$logger', function() {
		var options = {
			rootLevel: log4javascript.Level.ERROR,
			defaultLayout: new log4javascript.PatternLayout("%d{HH:mm:ss} - %-5p - %c{1} - %m{4}%n"),
			consoleOverride: false
		};
		
		var levels = { 
			'ALL': log4javascript.Level.ALL,
			'TRACE': log4javascript.Level.TRACE,
			'DEBUG': log4javascript.Level.DEBUG,
			'INFO': log4javascript.Level.INFO,
			'WARN': log4javascript.Level.WARN,
			'ERROR': log4javascript.Level.ERROR,
			'FATAL': log4javascript.Level.FATAL,
			'OFF': log4javascript.Level.OFF
		};
		
		var getLevel = function(level) {
			level = level ? level.toUpperCase() : 'ALL';
			return levels[level];
		};
		
		var getAppender = function(appender) {
			if (appender === 'Appender') {
				return new log4javascript.Appender();
			} else if (appender === 'AlertAppender') {
				return new log4javascript.AlertAppender();
			} else if (appender === 'AjaxAppender') {
				return new log4javascript.AjaxAppender();
			} else if (appender === 'PopUpAppender') {
				return new log4javascript.PopUpAppender();
			} else if (appender === 'InPageAppender') {
				return new log4javascript.InPageAppender();
			} else if (appender === 'BrowserConsoleAppender') {
				return new log4javascript.BrowserConsoleAppender();
			} else {
				throw new Error("Unknown appender: " + appender);
			} 
		};
		
		this.rootLevel = function(value) {
			options.rootLevel = getLevel(value);
		};

		this.defaultLayout = function(value) {
			options.defaultLayout = value;
		};

		this.consoleOverride = function(value) {
			options.consoleOverride = value;
		};
		
		this.$get = [ function() {
			var loggers = [];

			var getLogger = function(name) {
				if (!name) {
					throw "invalid logger name";
				}
				if (!loggers[name]) {
					loggers[name] = log4javascript.getLogger(name);
				}
				return loggers[name];
			};
			
			var addAppender = function(logger, appender, level) {
				appender = getAppender(appender);
				appender.setLayout(options.defaultLayout);
				appender.setThreshold(level);
				logger.addAppender(appender);
			};
			
			var service = {};
			
			service.logger = function(name) {
				return options.consoleOverride ? console : getLogger(name);
			};

			service.rootLogger = function() {
				return log4javascript.getRootLogger();
			};
			
			service.setLogger = function(name, level, appenders) {
				loggers[name] = log4javascript.getLogger(name);
				level = level ? getLevel(level) : options.rootLevel;
				if (appenders) {
					appenders = angular.isArray(appenders) ? appenders : [ appenders ];
					angular.forEach(appenders, function(appender) {
						addAppender(loggers[name], appender, level);
					});
				}
				loggers[name].setLevel(level);
			};

			service.setAjaxAppender = function(level, url, credentials, logger) {
				logger = logger ? getLogger(logger) : log4javascript.getRootLogger();
				level = level ? getLevel(level) : options.rootLevel;
				var appender = new log4javascript.AjaxAppender(url, credentials);
				appender.setLayout(new log4javascript.HttpPostDataLayout());
				appender.setThreshold(level);
				appender.setFailCallback(angular.noop);
				appender.addHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
				logger.addAppender(appender);
			};
			
			service.setLevel = function(level, logger) {
				logger = logger ? getLogger(logger) : log4javascript.getRootLogger();
				logger.setLevel(getLevel(level));
			};

			service.addAppender = function(appender, level, logger) {
				logger = logger ? getLogger(logger) : log4javascript.getRootLogger();
				level = level ? getLevel(level) : options.rootLevel;
				addAppender(logger, appender, level);
			};
			
			(function init() {
				log4javascript.logLog.setQuietMode(true);
				log4javascript.getRootLogger().setLevel(options.rootLevel);
				if (!console.fatal) {
					console.fatal = console.error;
				}
				if (!console.trace) {
					console.trace = console.debug;
				}
			})();
					
			return service;
		} ];
	});
	
})(log4javascript);