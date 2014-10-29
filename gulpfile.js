'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task( 'jshint', function() {
	return gulp.src( ['gulpfile.js', 'index.js'] )
		.pipe( jshint() )
		.pipe( jshint.reporter('default') );
} );

gulp.task( 'test', function() {
	gulp.start( 'jshint' );
} );
