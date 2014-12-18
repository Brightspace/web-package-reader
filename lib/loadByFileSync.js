'use strict';

var fs = require( 'fs' ),
	path = require( 'path' ),
	et = require('elementtree');

module.exports = function( packagePath ) {

	var dir = path.dirname( packagePath );

	var xml = et.parse(
					fs.readFileSync(
							packagePath,
							{ encoding: "UTF-8" }
						)
				);

	var filePaths = { JavaScript: [], Css: [] };

	xml.findall('.//JavaScript/*').forEach( function( jsFile ) {
		var filePath = jsFile.get('Path');
		if( filePath ) {
			filePath = path.join( dir, filePath );
			filePaths.JavaScript.push( filePath );
		}
	});

	xml.findall('.//Css/*').forEach( function( cssFile ) {
		var filePath = cssFile.get('Path');
		if( filePath ) {
			filePath = path.join( dir, filePath );
			filePaths.Css.push( filePath );
		}
	});

	return filePaths;

};
