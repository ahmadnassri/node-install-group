
# install-group

Dependency grouping for `npm install`

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![semantic][semantic-img]][semantic-url]

## Motivation

- npm no longer auto installs `peerDependencies`
- With `install-group`, you can define and install from custom dependency groups beyond the standard `dependencies`, `devDependencies`, and `optionalDependencies`
- Supports dynamic dependency groups directly from your `package.json`
- Zero dependencies

## How it works

`install-group` reads your `package.json`, identifies all *Dependencies groups, and can selectively install any combination of these groups or all if no specific group is mentioned.

### Example

```bash
install-group [dependencies] --package [name] <options>
```

```bash
install-group dev,peer --package @ahmadnassri/build-essential --global
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
|----------------|----------|---------|-------------------------------------------------|
| `dependencies` | ✅       | `-`     | Comma-separated list or single `dependencies` group to install from target package   |
| `package`      | ❌       | `-`     | package name to pull from npm registry          |
| `options`      | ❌       | `-`     | list of CLI parameters to pass to `npm install` |

> **Notes**:
>
> - if no `--package` parameter is provided, `install-group` will scan the local `package.json` file for all *Dependencies groups
> - `dependencies` can be **any** value in `package.json` that ends with 'Dependencies', regardless of what `npm` officially supports

## API

> use as a module

### scan({ dependencies, package, cwd })

| argument       | required | default         | description                                   |
|----------------|----------|-----------------|-----------------------------------------------|
| `dependencies` | ✅       | `prod`          | Comma-separated list or single `dependencies` group to scan from the target package |
| `package`      | ❌       | `-`             | package name to pull from npm registry        |
| `cwd`          | ❌       | `process.cwd()` | working directory, path to `package.json`     |

> **Notes**:
>
> - if no `package` is provided, `install-group` will scan the local `package.json` for all *Dependencies groups
> - `dependencies` can be **any** value in `package.json` that ends with 'Dependencies', regardless of what `npm` officially supports

```js
const scan = require("install-group");

// scan local package.json for all *Dependencies
scan({ dependencies: "dev,optional" });

// scan a package from npm registry for specified dependencies
scan({ dependencies: "peer", package: "@ahmadnassri/build-essential" });
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

## Contributors

- [Ahmad Nassri](https://www.ahmadnassri.com/)
- [Marius Guščius](marius.guscius1@gmail.com)

> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-install-group

[release-url]: https://github.com/ahmadnassri/node-install-group/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/node-install-group

[semantic-url]: https://github.com/ahmadnassri/node-install-group/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue