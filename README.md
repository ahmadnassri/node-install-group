# `install-group`

[![License][license-image]][license-url] [![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> Dependency grouping for `npm install`

## Motivation

- npm no longer auto installs `peerDependencies`
- npm only recognizes `dependencies`, `devDependencies` and `optionalDependencies` 
- your workflow might require declaring a new type of `Dependencies` that doesn't fit any of the above

## How it works

`install-group [group] <options>` simply takes a `group` name, compares it against your `package.json` and runs `npm install` for any dependency listed under that group: `npm install <options> [list of group packages]`

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
install-group foo --global
```

###### will result in

```bash
npm install --global xyz@~3.1.5 abc@^2.2.1
```

## Install

```bash
npm install install-group
```

## CLI

> use as a CLI

### Usage

```bash
install-group [group] <options>
```

| argument  | required | default | description                                  |
| --------- | -------- | ------- | -------------------------------------------- |
| `group`   | ✔        | `-`     | `*Dependencies` prefix in `package.json`     |
| `options` | ✖        | `-`     | list of CLI options to pass to `npm install` |

## API

> use as a module

### packages(cwd, group)

| argument  | required | default         | description                                  |
| --------- | -------- | --------------- | -------------------------------------------- |
| `cwd`     | ✖        | `process.cwd()` | working directory                            |
| `group`   | ✖        | `prod`          | `*Dependencies` prefix in `package.json`     |

```js
const packages = require('install-group')

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
[license-image]: https://img.shields.io/github/license/ahmadnassri/node-install-group.svg?style=for-the-badge&logo=circleci

[circle-url]: https://circleci.com/gh/ahmadnassri/workflows/node-install-group
[circle-image]: https://img.shields.io/circleci/project/github/ahmadnassri/node-install-group/master.svg?style=for-the-badge&logo=circleci

[npm-url]: https://www.npmjs.com/package/install-group
[npm-image]: https://img.shields.io/npm/v/install-group.svg?style=for-the-badge&logo=npm
