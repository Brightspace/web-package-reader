'use strict';

var fs = require('q-io/fs'),
	instanceRootFinder = require('instance-root-finder'),
	path = require('path');

module.exports = function( dirname ) {

	var webPackagePath = process.env.WEB_PACKAGE_PATH;
	if( webPackagePath === undefined || webPackagePath === null || webPackagePath.length === 0 ) {
		return instanceRootFinder( dirname )
			.then( function( instanceRoot ) {
				return path.join( instanceRoot, 'packages' );
			} );
	}

	return fs.exists( webPackagePath )
		.then( function( exists ) {
			if( !exists ) {
				throw new Error( 'WEB_PACKAGE_PATH does not exist:' + webPackagePath );
			}
			return webPackagePath;
		} );

};
