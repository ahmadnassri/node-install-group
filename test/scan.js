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
  const result = await scan({ package: '@ahmadnassri/build-essential', dependencies: 'peer' })

  assert.deepEqual(result, [
    '@ahmadnassri/eslint-config@^1.1.4',
    '@ahmadnassri/remark-config@^1.0.2',
    '@ahmadnassri/semantic-release-config@^1.0.8',
    'editorconfig-checker@^1.3.3',
    'eslint@^5.8.0',
    'install-group@^3.0.0',
    'node-release-lines@^1.3.2',
    'npm-run-all@^4.1.3',
    'remark-cli@^6.0.0',
    'semantic-release@^15.10.8',
    'updated@^1.2.2'
  ])
})
