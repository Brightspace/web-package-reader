'use strict';

var loadDefinition = require('./loadDefinition'),
	loadByFile = require('./loadByFile'),
	path = require('path'),
	Q = require('q'),
	webPackagePathFinder = require('./webPackagePathFinder');

module.exports = function( dirname, packageName ) {

	return webPackagePathFinder( dirname )
		.then( function( webPackagePath ) {
			var definitionPath = path.join(
					webPackagePath,
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
