'use strict';

var loadDefinition = require('../lib/loadDefinition'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Load Definition', function() {

	it( 'Should load 2 files', function( done ) {
		loadDefinition( dataPath, 'definition1' )
			.then( function( files ) {
				expect( files.length ).toBe( 2 );
				expect( files[0] ).toBe( path.join( dataPath, 'test1.package.xml' ) );
				expect( files[1] ).toBe( path.join( dataPath, 'test2.package.xml' ) );
				done();
			} );
	} );

	it( 'Should throw an exception on invalid XML', function( done ) {
		loadDefinition( dataPath, 'invalidxml' )
			.fail( function( err ) {
				expect( err ).not.toBeNull();
				done();
			} );
	} );

} );
