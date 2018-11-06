const { test } = require('tap')
const { join } = require('path')

const list = require('..')

const cwd = join(__dirname, 'fixture')

test('should list group by name', assert => {
  assert.plan(1)

  const packages = list(cwd, 'foo')

  assert.deepEqual(packages, ['a@*', 'b@*'])
})

test('fail if no matching group', assert => {
  assert.plan(1)

  assert.throws(() => list(cwd, 'bar'))
})

test('devDependencies & alias', assert => {
  assert.plan(2)

  assert.throws(() => list(cwd, 'dev'), 'no packages found')
  assert.throws(() => list(cwd, 'development'), 'no packages found')
})

test('dependencies & aliases', assert => {
  assert.plan(3)

  const nogroup = list(cwd)
  const prod = list(cwd, 'prod')
  const production = list(cwd, 'production')

  assert.same(nogroup, ['abc@1.2.3'])
  assert.same(prod, ['abc@1.2.3'])
  assert.same(production, ['abc@1.2.3'])
})

test('should throw error if missing package.json', assert => {
  assert.plan(1)

  assert.throws(() => list(__dirname, 'prod'), 'Cannot find module')
})
