'use strict';

var fs = require('q-io/fs'),
	path = require('path');

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

module.exports = findInstanceRoot;
