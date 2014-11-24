'use strict';

var fs = require( 'fs' ),
	path = require( 'path' ),
	libxmljs = require('libxmljs');

module.exports = function( packagePath ) {

	var dir = path.dirname( packagePath );

	var xml = libxmljs.parseXmlString(
					fs.readFileSync(
							packagePath,
							{ encoding: "UTF-8" }
						),
					{ 'noblanks' : true }
				);

	var filePaths = { };

	var jsFiles = xml.get(
						'//xmlns:JavaScript',
						'http://schemas.desire2learn.com/xml/schemas/package.xsd'
					).childNodes();
	filePaths.JavaScript = [];
	jsFiles.forEach(function( jsFile ) {
		var filePath = jsFile.attr("Path");
		if( filePath ) {
			filePath = path.join( dir, filePath.value() );
			filePaths.JavaScript.push( filePath );
		}
	});

	var cssFiles = xml.get(
						'//xmlns:CSS',
						'http://schemas.desire2learn.com/xml/schemas/package.xsd'
					).childNodes();
	filePaths.CSS = [];
	cssFiles.forEach(function( jsFile ) {
		var filePath = jsFile.attr("Path");
		if( filePath ) {
			filePath = path.join( dir, filePath.value() );
			filePaths.CSS.push( filePath );
		}
	});

	return filePaths;

};
