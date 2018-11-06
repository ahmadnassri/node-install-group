const { test } = require('tap')
const { join } = require('path')

const scan = require('..')

const cwd = join(__dirname, 'fixture')

test('should scan group by name', async assert => {
  assert.plan(1)

  const packages = await scan({ cwd, dependencies: 'foo' })

  assert.deepEqual(packages, ['a@*', 'b@*'])
})

test('fail if no matching group', assert => {
  assert.plan(1)

  assert.rejects(() => scan({ cwd, dependencies: 'bar' }))
})

test('devDependencies & alias', assert => {
  assert.plan(2)

  assert.rejects(() => scan({ cwd, dependencies: 'dev' }), 'no packages found')
  assert.rejects(() => scan({ cwd, dependencies: 'development' }), 'no packages found')
})

test('dependencies & aliases', async assert => {
  assert.plan(3)

  const nogroup = await scan({ cwd })
  const prod = await scan({ cwd, dependencies: 'prod' })
  const production = await scan({ cwd, dependencies: 'production' })

  assert.same(nogroup, ['abc@1.2.3'])
  assert.same(prod, ['abc@1.2.3'])
  assert.same(production, ['abc@1.2.3'])
})

test('throws if missing package.json', assert => {
  assert.plan(1)

  assert.rejects(() => scan({ cwd: __dirname, dependencies: 'prod' }), 'Cannot find module')
})

test('scan remote package', async assert => {
  assert.plan(1)

  assert.match(await scan({ package: '@ahmadnassri/build-essential', dependencies: 'peer' }), [
    '@ahmadnassri/eslint-config',
    '@ahmadnassri/remark-config',
    '@ahmadnassri/semantic-release-config'
  ])
})
