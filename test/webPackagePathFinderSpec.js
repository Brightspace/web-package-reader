'use strict';

var webPackagePathFinder = require('../lib/webPackagePathFinder'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Web Package Path Finder', function() {

	describe( 'No ENV variable', function() {

		var oldEnv;

		beforeEach( function() {
			oldEnv = process.env.WEB_PACKAGE_PATH;
			process.env.WEB_PACKAGE_PATH = '';
		} );

		afterEach( function() {
			process.env.WEB_PACKAGE_PATH = oldEnv;
		} );

		it( 'should use instanceRootFinder', function( done ) {
			webPackagePathFinder( dataPath )
				.then( function( webPackagePath ) {
					expect( webPackagePath ).toBe( path.join( dataPath, 'packages' ) );
					done();
				} );
		} );

	} );

	describe( 'ENV variable', function() {

		var oldEnv;

		beforeEach( function() {
			oldEnv = process.env.WEB_PACKAGE_PATH;
		} );

		afterEach( function() {
			process.env.WEB_PACKAGE_PATH = oldEnv;
		} );

		it( 'should use ENV variable as web package path', function( done ) {
			process.env.WEB_PACKAGE_PATH = dataPath;
			webPackagePathFinder( dataPath )
				.then( function( webPackagePath ) {
					expect( webPackagePath ).toBe( path.join( dataPath ) );
					done();
				} );
		} );

		it( 'should throw when ENV variable path does not exist', function( done ) {
			process.env.WEB_PACKAGE_PATH = path.join( dataPath, 'doesnotexist' );
			webPackagePathFinder( dataPath )
				.fail( function( err ) {
					expect( err ).not.toBeNull();
					done();
				} );
		} );

	} );

} );
