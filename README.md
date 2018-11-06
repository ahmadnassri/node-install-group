# npm-install-group

[![License][license-image]][license-url] [![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> Dependency grouping for `npm install`

## Motivation

- npm no longer installs `peerDependencies`
- npm only recognizes `dependencies`, `devDependencies` and `optionalDependencies` 
- your workflow might require declaring a new type of `Dependencies` that doesn't fit any of the above

## How it works

`npm-install-group [group] <options>` simply takes a `group` name, compares it against your `package.json` and runs `npm install` for any dependency listed under that group: `npm install <options> [list of group packages]`

### Example

###### `package.json`

```json
{
  "dependencies": {
    "baz": "1.2"
  },

  "fooDependencies": {
    "xyz": "~3.1.5",
    "abc": "^2.2.1"
  }
}
```

###### command

```bash
npm-install-group foo --global
```

###### will result in

```bash
npm install --global xyz@~3.1.5 abc@^2.2.1
```

## Install

> use as a CLI

```bash
npm install @ahmadnassri/npm-install-group
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
