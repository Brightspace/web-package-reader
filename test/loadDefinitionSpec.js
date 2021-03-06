'use strict';

var loadDefinition = require('../lib/loadDefinition'),
	loadDefinitionSync = require('../lib/loadDefinitionSync'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'Load Definition (Asynchronous)', function() {

	it( 'Should resolve relative paths', function( done ) {
		loadDefinition( path.join( dataPath, 'packages', 'definition1.definition.xml' ) )
			.then( function( files ) {
				expect( files.length ).toBe( 2 );
				expect( files[0] ).toBe( path.join( dataPath, 'test1.package.xml' ) );
				expect( files[1] ).toBe( path.join( dataPath, 'test2.package.xml' ) );
				done();
			} );
	} );

	it( 'Should leave absolute paths alone', function( done ) {
		loadDefinition( path.join( dataPath, 'packages', 'definition2.definition.xml' ) )
			.then( function( files ) {
				expect( files.length ).toBe( 2 );
				if( path.sep === '/' ) {
					expect( files[1] ).toBe( '/abc/test1.package.xml' );
				} else {
					expect( files[0] ).toBe( 'c:\\abc\\test1.package.xml' );
				}
				done();
			} );
	} );

	it( 'Should throw an exception on invalid XML', function( done ) {
		loadDefinition( path.join( dataPath, 'packages', 'invalidxml.definition.xml' ) )
			.fail( function( err ) {
				expect( err ).not.toBeNull();
				done();
			} );
	} );

} );

describe( 'Load Definition (Synchronous)', function() {

	it( 'Should resolve relative paths', function() {
		var files = loadDefinitionSync( path.join( dataPath, 'packages', 'definition1.definition.xml' ) );
		expect( files.length ).toBe( 2 );
		expect( files[0] ).toBe( path.join( dataPath, 'test1.package.xml' ) );
		expect( files[1] ).toBe( path.join( dataPath, 'test2.package.xml' ) );
	} );

	it( 'Should leave absolute paths alone', function() {
		var files = loadDefinitionSync( path.join( dataPath, 'packages', 'definition2.definition.xml' ) );
		expect( files.length ).toBe( 2 );
		if( path.sep === '/' ) {
			expect( files[1] ).toBe( '/abc/test1.package.xml' );
		} else {
			expect( files[0] ).toBe( 'c:\\abc\\test1.package.xml' );
		}
	} );

	it( 'Parses a file with noise without failing.', function() {
		var files = loadDefinitionSync( path.join( dataPath, 'packages', 'definition3.definition.xml' ) );
		expect( files.length ).toBe( 0 );
	} );

} );
