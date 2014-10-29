'use strict';

var fs = require("q-io/fs"),
	path = require('path'),
	Q = require( 'q' ),
	parseString = require( 'xml2js' ).parseString;

function findInstanceRoot( dirname ) {
	return fs
		.exists( path.join( dirname, 'instance.config' ) )
		.then( function( exists ) {
			if( exists ) {
				return dirname;
			} else {
				var parentDir = path.dirname( dirname );
				if( parentDir !== dirname ) {
					return findInstanceRoot( parentDir );
				}
				throw new Error('instance root could not be found');
			}
		} );
}

function loadDefinition( instanceRoot, packageName ) {

	var deferred = Q.defer();

	var definitionFile = packageName + '.definition.xml';

	fs
		.read( path.join( instanceRoot, 'packages', definitionFile ) )
		.then( function( value ) {

			parseString( value, function( err, result ) {
				if( err ) {
					deferred.reject( new Error( err ) );
				} else {
					var files = [];
					for( var i=0; i<=result.Package.Paths[0].File.length; i++ ) {
						var file = result.Package.Paths[0].File[i];
						if( file !== undefined ) {
							files.push( file.$.Path );
						}
					}
					deferred.resolve( files );
				}

		} );
	} );

	return deferred.promise;

}

function loadPackageFile( packagePath ) {

	var dirName = path.dirname( packagePath );

	return fs
		.read( packagePath )
		.then( function( value ) {
			var deferred = Q.defer();
			parseString( value, function( err, result ) {
				if( err ) {
					deferred.reject( new Error( err ) );
				} else {
					var files = [];
					for( var i=0; i<=result.Package.JavaScript[0].File.length; i++ ) {
						var file = result.Package.JavaScript[0].File[i];
						if( file !== undefined ) {
							var filePath = path.join( dirName, file.$.Path );
							files.push( filePath );
						}
					}
					deferred.resolve( files );
				}
			} );
			return deferred.promise;
		} );

}

function loadByName( dirname, packageName ) {

	return findInstanceRoot( dirname )
		.then( function( instanceRoot ) {
			return loadDefinition( instanceRoot, packageName );
		} )
		.then( function( packagePaths ) {
			var promises = [];
			for( var i=0; i<packagePaths.length; i++ ) {
				promises.push( loadPackageFile( packagePaths[i] ) );
			}
			return Q.all( promises )
				.then( function( filesArr ) {
					var files = [];
					return files.concat.apply( files, filesArr );
				} );
		} );

}

module.exports.loadByName = loadByName;
module.exports.loadByFile = loadPackageFile;
