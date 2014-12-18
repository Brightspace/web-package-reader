'use strict';

var fs = require('fs'),
	path = require('path'),
	xmlParser = require('node-xml-lite');

module.exports = function( definitionPath ) {

	var dir = path.dirname( definitionPath );
	var filePaths = [];

	var xml = xmlParser.parseFileSync( definitionPath );

	xml.childs.forEach( function( paths ) {
		if( paths.name == "Paths" && paths.childs ) {
			paths.childs.forEach( function( pathsFile ) {
				if( pathsFile.name == "File" && pathsFile.attrib && pathsFile.attrib.Path ) {
					if( path.resolve( pathsFile.attrib.Path ) !== pathsFile.attrib.Path ) {
						pathsFile.attrib.Path = path.join( dir, pathsFile.attrib.Path );
					}
					filePaths.push( pathsFile.attrib.Path );
				}
			});
		}
	});

	return filePaths;
};
