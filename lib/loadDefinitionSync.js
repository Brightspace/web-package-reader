'use strict';

var fs = require('fs'),
	path = require('path'),
	et = require('elementtree');

module.exports = function( definitionPath ) {

	var dir = path.dirname( definitionPath );

	var xml = et.parse(
					fs.readFileSync(
							definitionPath,
							{ encoding: "UTF-8" }
						).toString()
				);

	var pathsFiles = xml.findall('.//Paths/*');

	var filePaths = [];
	pathsFiles.forEach( function( pFile ) {
		var filePath = pFile.get('Path');
		if( filePath ) {
			if(path.resolve( filePath ) !== filePath ) {
				filePath = path.join( dir, filePath );
			}
			filePaths.push( filePath );
		}
	});

	return filePaths;
};
