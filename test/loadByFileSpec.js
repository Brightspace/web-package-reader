'use strict';

var webPackageReader = require('../'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Load By File (Asynchronous)', function() {

	it( 'Should load 2 files', function( done ) {
		webPackageReader.loadByFile( path.join( dataPath, 'test1.package.xml' ) )
			.then( function( files ) {
				expect( files.length ).toBe( 2 );
				expect( files[0] ).toBe( path.join( dataPath, 'file1.js' ) );
				expect( files[1] ).toBe( path.join( dataPath, 'file2.js' ) );
				done();
			} );
	} );

	it( 'Should throw on invalid XML input', function( done ) {
		webPackageReader.loadByFile( path.join( dataPath, 'invalidxml.package.xml' ) )
			.fail( function( err ) {
				expect( err ).not.toBeNull();
				done();
			} );
	} );

} );

describe( 'Load By File (Synchronous)', function() {

	it( 'Should load 2 files', function( ) {
		var files = webPackageReader.loadByFileSync( path.join( dataPath, 'test1.package.xml' ) );
		expect( files.JavaScript.length ).toBe( 2 );
		expect( files.JavaScript[0] ).toBe( path.join( dataPath, 'file1.js' ) );
		expect( files.JavaScript[1] ).toBe( path.join( dataPath, 'file2.js' ) );
	} );

	it( 'Should load 2 files', function( ) {
		var files = webPackageReader.loadByFileSync( path.join( dataPath, 'test1.package.xml' ) );
		expect( files.Css.length ).toBe( 2 );
		expect( files.Css[0] ).toBe( path.join( dataPath, 'file1.css' ) );
		expect( files.Css[1] ).toBe( path.join( dataPath, 'file2.css' ) );
	} );

	it( 'Should throw on invalid XML input', function() {
		expect( function() {
			webPackageReader.loadByFileSync( path.join( dataPath, 'invalidxml.package.xml' ) );
		}).toThrow();
	} );

} );
