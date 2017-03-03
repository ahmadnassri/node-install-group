#!/usr/bin/env node

'use strict'

const list = require('./index')
const spawn = require('@ahmadnassri/spawn-promise')

let packages

try {
  packages = list(process.cwd(), process.argv[2])
} catch (err) {
  console.log(err.message)
  process.exit()
}

if (packages.length === 0) {
  console.log('no packages')
  process.exit()
}

spawn('npm', ['install', packages.join(' ')], { encoding: 'utf8' })
  .then(streams => console.log(streams.stdout))
  .catch(err => console.log(err.stderr))
