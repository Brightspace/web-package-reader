'use strict';

var webPackageReader = require('../'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Load By File', function() {

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
