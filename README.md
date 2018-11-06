# `install-group`

[![License][license-image]][license-url] [![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> Dependency grouping for `npm install`

## Motivation

- npm no longer auto installs `peerDependencies`
- npm only recognizes `dependencies`, `devDependencies` and `optionalDependencies` 
- your workflow might require declaring a new type of `Dependencies` that doesn't fit any of the above
- zero dependencies

## How it works

`install-group` simply takes an argument `dependencies`, compares it against your `package.json` and runs `npm install` for any dependency listed under that group using `npm install`

### Example

```bash
install-group [dependencies] --package [name] <options>
```

```bash
install-group peer --package @ahmadnassri/build-essential --global
```

###### executed result

```bash
npm install --global @ahmadnassri/eslint-config@^1.1.1 @ahmadnassri/remark-config@^1.0.0 @ahmadnassri/semantic-release-config@^1.0.6 editorconfig-checker@^1.3.3 eslint@^5.7.0 install-peerdeps@^1.9.0 node-release-lines@^1.3.1 npm-run-all@^4.1.3 remark-cli@^6.0.0 semantic-release@^15.10.5 updated@^1.1.0
```

## Install

```bash
npm install install-group
```

## CLI

> use as a CLI

### Usage

```bash
install-group [dependencies] --package [name] <options>
```

| parameter      | required | default | description                                     |
| -------------- | -------- | ------- | ----------------------------------------------- |
| `dependencies` | ✔        | `-`     | `dependencies` to install from target package   |
| `package`      | ✖        | `-`     | package name to pull from npm registry          |
| `options`      | ✖        | `-`     | list of CLI parameters to pass to `npm install` |

> **Notes**: 
> - if no `--package` parameter is provided, `install-group` will scan local `package.json` file for dependencies
> - `dependencies` can be **any** value in `package.json` regardless of what `npm` officially supports

## API

> use as a module

### scan({ dependencies, package, cwd })

| argument       | required | default         | description                                   |
| -------------- | -------- | --------------- | --------------------------------------------- |
| `dependencies` | ✔        | `prod`          | `dependencies` to install from target package |
| `package`      | ✖        | `-`             | package name to pull from npm registry        |
| `cwd`          | ✖        | `process.cwd()` | working directory, path to `package.json`     |

> **Notes**: 
> - if no `package` is provided, `install-group` will scan local `package.json` file at `cwd` for dependencies
> - `dependencies` can be **any** value in `package.json` regardless of what `npm` officially supports

```js
const scan = require('install-group')

// scan local package.json
scan({ dependencies: 'foo' })

// scan a package from npm registry
scan({ dependencies: 'peer', package: '@ahmadnassri/build-essential' })
```

###### result example

```json
[
  "@ahmadnassri/eslint-config@^1.1.1",
  "@ahmadnassri/remark-config@^1.0.0",
  "@ahmadnassri/semantic-release-config@^1.0.6",
  "editorconfig-checker@^1.3.3",
  "eslint@^5.7.0",
  "install-peerdeps@^1.9.0",
  "node-release-lines@^1.3.1",
  "npm-run-all@^4.1.3",
  "remark-cli@^6.0.0",
  "semantic-release@^15.10.5",
  "updated@^1.1.0"
]
```

---
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-image]: https://img.shields.io/github/license/ahmadnassri/node-install-group.svg?style=for-the-badge&logo=circleci

[circle-url]: https://circleci.com/gh/ahmadnassri/workflows/node-install-group
[circle-image]: https://img.shields.io/circleci/project/github/ahmadnassri/node-install-group/master.svg?style=for-the-badge&logo=circleci

[npm-url]: https://www.npmjs.com/package/install-group
[npm-image]: https://img.shields.io/npm/v/install-group.svg?style=for-the-badge&logo=npm
