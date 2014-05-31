/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
	/**
	 * The `build_dir` folder is where our projects are compiled during
	 * development and the `compile_dir` folder is where our app resides once
	 * it's completely built.
	 */
	build_dir : 'target/build',
	compile_dir : 'target/bin',

	/**
	 * This is a collection of file patterns that refer to our app code (the
	 * stuff in `src/`). These file paths are used in the configuration of build
	 * tasks. `js` is all project javascript (except tests). `ctpl` contains our
	 * reusable components `src/common` template HTML files `atpl` contains the
	 * same, but for our app's code. `html` is just our main HTML file, `less`
	 * is our main stylesheet `unit` contains our app's unit tests.
	 */
	app_files : {
		js : [ 'src/**/*.js', '!src/assets/**/*.js' ],
		json : [ 'src/**/*.json', '!src/assets/**/*.json' ],

		atpl : [ 'src/app/**/*.tpl.html' ],
		ctpl : [ 'src/common/**/*.tpl.html' ],

		html : [ 'src/index.html' ],
		css : [ 'src/**/*.css', '!src/assets/**/*.css' ],
		less : 'src/app/app.less'
	},

	/**
	 * This is the same as `app_files`, except it contains patterns that
	 * reference vendor code (`vendor/`) that we need to place into the build
	 * process somewhere. While the `app_files` property ensures all
	 * standardized files are collected for compilation, it is the user's job to
	 * ensure non-standardized (i.e. vendor-related) files are handled
	 * appropriately in `vendor_files.js`. The `vendor_files.js` property holds
	 * files to be automatically concatenated and minified with our project
	 * source files. The `vendor_files.css` property holds any CSS files to be
	 * automatically included in our app.
	 */
	vendor_files : {
		js : [  'vendor/modernizr/modernizr.js', 'vendor/html5shiv/dist/html5shiv.js', 'vendor/html5shiv/dist/html5shiv-printshiv.js', 'vendor/jquery/dist/jquery.min.js',
				'vendor/angular/angular.js', 'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js', 'vendor/angular-animate/angular-animate.min.js', 
				'vendor/angular-ui-router/release/angular-ui-router.min.js', 'vendor/lodash/dist/lodash.min.js', 'vendor/jquery-mobile/jquery.mobile.custom.js',
				'vendor/log4javascript/log4javascript.js', 'vendor/isotope/dist/isotope.pkgd.min.js', 'vendor/packery/js/packery.pkgd.min.js', 
				'src/assets/angular-locale_fr-fr.js'
		],
		css : [ 'vendor/jquery-mobile/jquery.mobile.custom.structure.min.css', 'vendor/font-awesome/css/font-awesome.min.css', 'vendor/animate.css/animate.min.css' ],
		assets : [ 'bootstrap/dist/fonts/*', 'bootstrap/dist/css/bootstrap.min.css', 'bootstrap/dist/css/bootstrap-theme.min.css', 'roboto-fontface/*.css', 'roboto-fontface/fonts/*' ]
	}
};
