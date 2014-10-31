'use strict';

var coveralls = require('gulp-coveralls'),
	gulp = require('gulp'),
	istanbul = require('gulp-istanbul'),
	jasmine = require('gulp-jasmine'),
	jshint = require('gulp-jshint');

gulp.task( 'lint', function() {
	return gulp.src( ['gulpfile.js', 'lib/*.js', 'test/*.js'] )
		.pipe( jshint() )
		.pipe( jshint.reporter('default') );
} );

gulp.task( 'coverage', function() {
	return gulp.src( 'coverage/**/lcov.info' )
		.pipe( coveralls() );
} );

gulp.task( 'default', ['lint'], function( cb ) {
	gulp.src( ['lib/**/*.js'] )
		.pipe( istanbul() )
		.on( 'finish', function() {
			gulp.src( ['test/**/*Spec.js'] )
				.pipe( jasmine() )
				.pipe( istanbul.writeReports() )
				.on( 'end', cb );
		} );
} );
