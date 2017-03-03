'use strict'

const path = require('path')
const assert = require('assert')

module.exports = function (cwd, group) {
  let pkg = {}

  // exit early
  assert(group, 'group required')

  // can we get a package?
  try {
    pkg = require(path.join(cwd, 'package.json'))
  } catch (err) {
    assert.ifError(err)
  }

  // set suffix
  group = group + 'Dependencies'

  // exit early
  assert(pkg[group], 'no matching dependencies')

  // return install format
  return Object.keys(pkg[group]).map(name => `${name}@${pkg[group][name]}`)
}
