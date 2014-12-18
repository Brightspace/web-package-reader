'use strict';

var fs = require( 'fs' ),
	path = require( 'path' ),
	xmlParser = require('node-xml-lite');

module.exports = function( packagePath ) {

	var dir = path.dirname( packagePath );
	var filePaths = { JavaScript: [], Css: [] };

	var xml = xmlParser.parseFileSync( packagePath );
	xml.childs.forEach(function( type ) {
		var readFiles;
		switch(type.name) {
			case 'Css':
				readFiles = filePaths.Css;
				break;
			case 'JavaScript':
				readFiles = filePaths.JavaScript;
				break;
			default:
				return;
		}

		type.childs.forEach( function( filePath ) {
			if( filePath.name == "File" && filePath.attrib && filePath.attrib.Path ) {
				readFiles.push( path.join( dir, filePath.attrib.Path ) );
			}
		});
	});

	return filePaths;

};
