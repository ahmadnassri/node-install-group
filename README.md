# npm-install-group

[![License][license-image]][license-url] [![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> Dependency grouping for `npm install`

## Install

```bash
npm install @ahmadnassri/npm-install-group
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
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-image]: https://img.shields.io/github/license/ahmadnassri/node-npm-install-group.svg?style=for-the-badge&logo=circleci

[circle-url]: https://circleci.com/gh/ahmadnassri/workflows/node-npm-install-group
[circle-image]: https://img.shields.io/circleci/project/github/ahmadnassri/node-npm-install-group/master.svg?style=for-the-badge&logo=circleci

[npm-url]: https://www.npmjs.com/package/@ahmadnassri/npm-install-group
[npm-image]: https://img.shields.io/npm/v/@ahmadnassri/npm-install-group.svg?style=for-the-badge&logo=npm
