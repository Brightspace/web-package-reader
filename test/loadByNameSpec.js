'use strict';

var webPackageReader = require('../'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Load By Name', function() {

	var opts = { webPackagePath: path.join( dataPath, 'packages' ) };
	var oldEnv;

	beforeEach( function() {
		oldEnv = process.env.WEB_PACKAGE_PATH;
	} );
	afterEach( function() {
		process.env.WEB_PACKAGE_PATH = oldEnv;
	} );

	it( 'should load 4 files across 2 package files', function( done ) {
		webPackageReader.loadByName( 'definition1', opts )
			.then( function( files ) {
				expect( files.length ).toBe( 4 );
				expect( files[0] ).toBe( path.join( dataPath, 'file1.js' ) );
				expect( files[1] ).toBe( path.join( dataPath, 'file2.js' ) );
				expect( files[2] ).toBe( path.join( dataPath, 'file3.js' ) );
				expect( files[3] ).toBe( path.join( dataPath, 'file4.js' ) );
				done();
			} );
	} );

	it( 'should default to WEB_PACKAGE_PATH env variable if option is missing', function( done ) {

		process.env.WEB_PACKAGE_PATH = opts.webPackagePath;

		webPackageReader.loadByName( 'definition1' )
			.then( function( files ) {
				expect( files.length ).toBe( 4 );
				done();
			} );

	} );

	it( 'should throw if no web package path is defined', function( done ) {

		process.env.WEB_PACKAGE_PATH = '';

		webPackageReader.loadByName( 'definition1' )
			.fail( function( err ) {
				expect( err ).not.toBeNull();
				done();
			} );

	} );

} );
