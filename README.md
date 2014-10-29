# d2l-web-package-reader
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]

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

[npm-url]: https://npmjs.org/package/web-package-reader
[npm-image]: https://badge.fury.io/js/web-package-reader.png
[ci-image]: https://travis-ci.org/Desire2Learn-Valence/web-package-reader.svg?branch=master
[ci-url]: https://travis-ci.org/Desire2Learn-Valence/web-package-reader
