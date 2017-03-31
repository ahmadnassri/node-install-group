'use strict'

const list = require('..')
const tap = require('tap')
const path = require('path')

const fixture = path.join(__dirname, 'fixture')

tap.test('should list group by name', (assert) => {
  assert.plan(1)

  const packages = list(fixture, 'foo')

  assert.deepEqual(packages, ['a@*', 'b@*'])
})

tap.test('should fail if no matching group', (assert) => {
  assert.plan(1)

  assert.throws(() => list(fixture, 'bar'))
})

tap.test('should return an empty result', (assert) => {
  assert.plan(1)

  const packages = list(fixture, 'dev')

  assert.same(packages, [])
})

tap.test('should allow for "prod" install', (assert) => {
  assert.plan(1)

  const packages = list(fixture, 'prod')

  assert.same(packages, ['abc@1.2.3'])
})
