# d2l-package-reader

Utilities for reading contents of D2L web package files.

## Installation

Install from NPM:
```shell
npm install d2l-web-package-reader
```

## Usage

To load all JavaScript files from a package by name:

```javascript
var packageReader = require('d2l-web-package-reader');

packageReader.loadByName( __dirname, 'My.Package.Name' )
  then( function( files ) {
	console.log( files );
} );
```

Alternatively, to just load the files defined in a specific package file:

```javascript
packageReader.loadByFile( '../path/to/file.package.xml' )
then( function( files ) {
	console.log( files );
} );
```
