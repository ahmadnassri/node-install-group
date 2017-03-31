# npm-install-group [![version][npm-version]][npm-url] [![License][license-image]][license-url]

> Dependency grouping for `npm-install`

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --only=production --save @ahmadnassri/npm-install-group
```

###### `package.json`

```json
{
  "dependencies": {
    "abc": "1.2"
  },

  "devDependencies": {},

  "fooDependencies": {
    "a": "*",
    "b": "*"
  }
}
```

## CLI 

```bash
$ npm-install-group dev

$ npm-install-group foo --ignore-scripts 
```

## API

> use as a module

### packages(cwd, group)

```js
const packages = require('@ahmadnassri/npm-install-group')

packages(process.cwd(), 'foo')
```

###### returns

```json
[
  "package-a@^1.3",
  "package-b@^2.0",
  "package-b@^0"
]
```

## TODO

- [ ] stream `stdout`

---
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/)  · 
> License: [ISC][license-url]  · 
> Github: [@ahmadnassri](https://github.com/ahmadnassri)  · 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/npm-install-group.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/npm-install-group
[travis-image]: https://img.shields.io/travis/ahmadnassri/npm-install-group.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@ahmadnassri/npm-install-group
[npm-version]: https://img.shields.io/npm/v/@ahmadnassri/npm-install-group.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/@ahmadnassri/npm-install-group.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/npm-install-group
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/npm-install-group.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/npm-install-group.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/npm-install-group
[david-image]: https://img.shields.io/david/ahmadnassri/npm-install-group.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/npm-install-group
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/npm-install-group/badge?style=flat-square
