'use strict';

var fs = require('fs'),
	path = require('path'),
	libxmljs = require('libxmljs');

module.exports = function( definitionPath ) {

	var dir = path.dirname( definitionPath );

	var xml = libxmljs.parseXmlString(
					fs.readFileSync(
							definitionPath,
							{ encoding: "UTF-8" }
						),
					{ 'noblanks' : true }
				);

	var pathsFiles = xml.get('//Paths').childNodes();

	var filePaths = [];
	pathsFiles.forEach( function( pFile ) {
		var filePath = pFile.attr("Path").value();
		if(path.resolve( filePath ) !== filePath ) {
			filePath = path.join( dir, filePath );
		}
		filePaths.push( filePath );
	});

	return filePaths;
};
