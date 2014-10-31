'use strict';

var instanceRootFinder = require('instance-root-finder'),
	loadDefinition = require('./loadDefinition'),
	loadByFile = require('./loadByFile'),
	path = require('path'),
	Q = require('q');

module.exports = function( dirname, packageName ) {

	return instanceRootFinder( dirname )
		.then( function( instanceRoot ) {
			var definitionPath = path.join(
					instanceRoot,
					'packages',
					packageName + '.definition.xml'
				);
			return loadDefinition( definitionPath );
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
