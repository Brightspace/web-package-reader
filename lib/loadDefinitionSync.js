'use strict';

var fs = require('fs'),
	path = require('path'),
	et = require('elementtree'),
	stripBom = require('strip-bom');

module.exports = function( definitionPath ) {

	var dir = path.dirname( definitionPath );

	var xml = et.parse(
					stripBom(fs.readFileSync(
							definitionPath,
							{ encoding: "utf8" }
						))
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
