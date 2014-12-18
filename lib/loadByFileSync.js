'use strict';

var fs = require( 'fs' ),
	path = require( 'path' ),
	et = require('elementtree'),
	stripBom = require('strip-bom');

module.exports = function( packagePath ) {

	var dir = path.dirname( packagePath );

	var xml = et.parse(
					stripBom(fs.readFileSync(
							packagePath,
							{ encoding: "utf8" }
						))
				);

	var filePaths = { JavaScript: [], Css: [] };

	var js = xml.find('.//JavaScript');
	if( js ) {
		js.getchildren().forEach( function( jsFile ) {
			var filePath = jsFile.get('Path');
			if( filePath ) {
				filePath = path.join( dir, filePath );
				filePaths.JavaScript.push( filePath );
			}
		});
	}

	var css = xml.find('.//Css');
	if( css ) {
		css.getchildren().forEach( function( cssFile ) {
			var filePath = cssFile.get('Path');
			if( filePath ) {
				filePath = path.join( dir, filePath );
				filePaths.Css.push( filePath );
			}
		});
	}

	return filePaths;

};
