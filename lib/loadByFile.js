'use strict';

var fs = require('q-io/fs'),
	path = require('path'),
	Q = require('q'),
	parseString = require('xml2js').parseString;

module.exports = function( packagePath ) {

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
						if( file ) {
							var filePath = path.join( dirName, file.$.Path );
							files.push( filePath );
						}
					}
					deferred.resolve( files );
				}
			} );
			return deferred.promise;
		} );

};
