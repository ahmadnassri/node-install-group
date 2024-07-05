#!/usr/bin/env node

const scan = require('./lib/scan')
const install = require('./lib/install')

// gather cli arguments
const argv = process.argv.slice(2)

// package name placeholder
let name

// check for --package option
const index = argv.indexOf('--package')

// extract package name
if (index !== -1) {
  [ , name ] = argv.splice(index, 2)
}

// first argument is the install group
const dependencies = argv.shift()

// scan and install
scan({ dependencies, package: name, cwd: process.cwd() })
  .then(packages => install(packages, argv))
  .catch(error => {
    console.error(`ERROR\t${error.message}`)
    process.exit(1)
  })
