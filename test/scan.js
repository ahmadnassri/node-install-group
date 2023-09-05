const test = require('node:test')
const assert = require('node:assert')

const { join } = require('path')

const scan = require('..')

const cwd = join(__dirname, 'fixture')

test('should scan group by name', async () => {
  const packages = await scan({ cwd, dependencies: 'foo' })

  assert.deepStrictEqual(packages, ['a@*', 'b@*'])
})

test('fail if no matching group', () => {
  assert.rejects(() => scan({ cwd, dependencies: 'bar' }))
})

test('devDependencies & alias', () => {
  assert.rejects(() => scan({ cwd, dependencies: 'dev' }), { message: 'no packages found' })
  assert.rejects(() => scan({ cwd, dependencies: 'development' }), { message: 'no packages found' })
})

test('dependencies & aliases', async () => {

  const nogroup = await scan({ cwd })
  const prod = await scan({ cwd, dependencies: 'prod' })
  const production = await scan({ cwd, dependencies: 'production' })

  assert.deepEqual(nogroup, ['abc@1.2.3'])
  assert.deepEqual(prod, ['abc@1.2.3'])
  assert.deepEqual(production, ['abc@1.2.3'])
})

test('throws if missing package.json', () => {
  assert.rejects(() => scan({ cwd: __dirname, dependencies: 'prod' }), 'Cannot find module')
})

test('scan remote package', async () => {
  const result = await scan({ package: 'angular2', dependencies: 'peer' })

  assert.deepEqual(result, [
    "es6-shim@^0.35.0",
    "reflect-metadata@0.1.2",
    "rxjs@5.0.0-beta.6",
    "zone.js@^0.6.12"
  ])
})
