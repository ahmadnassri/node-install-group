#!/usr/bin/env node

const scan = require('./lib/scan')
const { spawn } = require('child_process')

let packages

// gather cli arguments
const argv = process.argv.slice(2)

// first argument is the install group
const group = argv.shift()

// exit early
if (!group) {
  console.error('ERROR\t install group required')
  process.exit(1)
}

// catch and throw exc eption messages from scan function
try {
  packages = scan(process.cwd(), group)
} catch (err) {
  console.error(`ERROR\t${err.message}`)
  process.exit(1)
}

// construct npm install command
let args = ['install']

// attach cli arguments
args = args.concat(argv)

// list all packages
args = args.concat(packages)

// display the command we're gonna run
console.log('npm', args.join(' '))

// run
spawn('npm', args, { stdio: 'inherit' })
