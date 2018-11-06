#!/usr/bin/env node

const list = require('./index')
const spawn = require('@ahmadnassri/spawn-promise')

let packages

const argv = process.argv.slice(2)
const group = argv.shift()

// exit early
if (!group) {
  console.error('group required')
  process.exit(1)
}

try {
  packages = list(process.cwd(), group)
} catch (err) {
  console.error(err.message)
  process.exit(1)
}

if (packages.length === 0) {
  console.log('no packages')
  process.exit(0)
}

const args = ['install', packages.join(' ')].concat(argv)

spawn('npm', args, { encoding: 'utf8' })
  .then(streams => console.log(streams.stdout))
  .catch(err => console.error(err.stderr))
