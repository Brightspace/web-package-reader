'use strict';

var webPackageReader = require('../'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Load By Name', function() {

	it( 'should load 4 files across 2 package files', function( done ) {
		webPackageReader.loadByName( dataPath, 'definition1' )
			.then( function( files ) {
				expect( files.length ).toBe( 4 );
				expect( files[0] ).toBe( path.join( dataPath, 'file1.js' ) );
				expect( files[1] ).toBe( path.join( dataPath, 'file2.js' ) );
				expect( files[2] ).toBe( path.join( dataPath, 'file3.js' ) );
				expect( files[3] ).toBe( path.join( dataPath, 'file4.js' ) );
				done();
			} );
	} );

} );
