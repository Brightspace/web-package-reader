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

	var jsFiles = xml.get(
						'//xmlns:JavaScript',
						'http://schemas.desire2learn.com/xml/schemas/package.xsd'
					).childNodes();

	var filePaths = [];
	jsFiles.forEach(function( jsFile ) {
		var filePath = jsFile.attr("Path");
		if( filePath ) {
			filePath = path.join( dir, filePath.value() );
			filePaths.push( filePath );
		}
	});

	return filePaths;

};
