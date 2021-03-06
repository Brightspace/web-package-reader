'use strict';

var webPackageReader = require('../'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Load By Name (Asynchronous)', function() {

	var opts = { webPackagePath: path.join( dataPath, 'packages' ) };

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

	it( 'should throw if no web package path is defined', function( done ) {

		webPackageReader.loadByName( 'definition1' )
			.fail( function( err ) {
				expect( err ).not.toBeNull();
				done();
			} );

	} );

} );

describe( 'Load By Name (Synchronous)', function() {

	var opts = { webPackagePath: path.join( dataPath, 'packages' ) };

	it( 'should load 4 files across 2 package files', function() {
		var files = webPackageReader.loadByNameSync( 'definition1', opts );
		expect( files.JavaScript.length ).toBe( 4 );
		expect( files.JavaScript[0] ).toBe( path.join( dataPath, 'file1.js' ) );
		expect( files.JavaScript[1] ).toBe( path.join( dataPath, 'file2.js' ) );
		expect( files.JavaScript[2] ).toBe( path.join( dataPath, 'file3.js' ) );
		expect( files.JavaScript[3] ).toBe( path.join( dataPath, 'file4.js' ) );
	} );

	it( 'should throw if no web package path is defined', function() {
		expect( function() {
			webPackageReader.loadByNameSync( 'definition1' );
		}).toThrow();

	} );

} );
