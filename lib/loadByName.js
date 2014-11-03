'use strict';

var fs = require('q-io/fs'),
	loadDefinition = require('./loadDefinition'),
	loadByFile = require('./loadByFile'),
	path = require('path'),
	Q = require('q');

module.exports = function( packageName, opts ) {

	opts = opts || {};
	opts.webPackagePath = opts.webPackagePath || process.env.WEB_PACKAGE_PATH;

	return fs.exists( opts.webPackagePath )
		.then( function( exists ) {
			if( !exists ) {
				throw new Error( 'web package path does not exist:' + opts.webPackagePath );
			}
			return opts.webPackagePath;
		} )
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
