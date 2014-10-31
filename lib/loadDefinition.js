'use strict';

var fs = require('q-io/fs'),
	path = require('path'),
	Q = require('q'),
	parseString = require('xml2js').parseString;

module.exports = function( definitionPath ) {

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
							var filePath = file.$.Path;
							if( path.resolve( filePath ) !== filePath ) {
								filePath = path.join( dir, filePath );
							}
							files.push( filePath );
						}
					}
					deferred.resolve( files );
				}

		} );
	} );

	return deferred.promise;

};
