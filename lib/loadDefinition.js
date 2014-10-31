'use strict';

var fs = require('q-io/fs'),
	path = require('path'),
	Q = require('q'),
	parseString = require('xml2js').parseString;

module.exports = function( definitionPath ) {

	console.log('def path', definitionPath );
	var deferred = Q.defer();

	var dir = path.dirname( definitionPath );

	fs
		.read( definitionPath )
		.then( function( value ) {
			parseString( value, function( err, result ) {
				if( err ) {
					deferred.reject( new Error( err ) );
				} else {
					var files = [];
					for( var i=0; i<=result.Package.Paths[0].File.length; i++ ) {
						var file = result.Package.Paths[0].File[i];
						if( file !== undefined ) {
							files.push( path.join( dir, file.$.Path ) );
						}
					}
					deferred.resolve( files );
				}

		} );
	} );

	return deferred.promise;

};
