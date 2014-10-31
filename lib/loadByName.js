'use strict';

var Q = require('q'),
	loadDefinition = require('./loadDefinition'),
	loadByFile = require('./loadByFile'),
	instanceRootFinder = require('instance-root-finder');

module.exports = function( dirname, packageName ) {

	return instanceRootFinder( dirname )
		.then( function( instanceRoot ) {
			return loadDefinition( instanceRoot, packageName );
		} )
		.then( function( packagePaths ) {
			var promises = [];
			for( var i=0; i<packagePaths.length; i++ ) {
				promises.push( loadByFile( packagePaths[i] ) );
			}
			return Q.all( promises )
				.then( function( filesArr ) {
					var files = [];
					return files.concat.apply( files, filesArr );
				} );
		} );

};
