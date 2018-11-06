const { join } = require('path')

module.exports = function (cwd, group) {
  group = group || 'prod'

  // can we find a package?
  const pkg = require(join(cwd, 'package.json'))

  // fix long alias for devDependencies
  group = group === 'development' ? 'dev' : group

  // fix prod / production dependencies prefix
  group = ~['prod', 'production'].indexOf(group) ? 'dependencies' : group + 'Dependencies'

  // exit early
  if (!pkg[group]) {
    throw new Error('no matching dependencies')
  }

  // return install format
  const packages = Object.entries(pkg[group]).map(([name, version]) => `${name}@${version}`)

  if (packages.length === 0) {
    throw new Error('no packages found')
  }

  return packages
}
