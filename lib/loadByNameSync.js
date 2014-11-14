var fs = require('fs'),
	loadDefinitionSync = require('./loadDefinitionSync'),
	loadByFileSync = require('./loadByFileSync'),
	path = require('path');

module.exports = function( packageName, opts ) {

	opts = opts || {};

	if( !fs.existsSync( opts.webPackagePath )) {
		throw new Error( 'web package path does not exist:' + opts.webPackagePath );
	}

	var definitionPath = path.join(
			opts.webPackagePath,
			packageName + '.definition.xml'
		);

	var files = [];
	loadDefinitionSync( definitionPath ).forEach( function( def ) {
			loadByFileSync( def ).forEach( function( file ) {
				files.push( file );
			});
		});

	return files;

};
