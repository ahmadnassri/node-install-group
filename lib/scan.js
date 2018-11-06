const { join } = require('path')
const { execFile } = require('child_process')
const { promisify } = require('util')
const spawn = promisify(execFile)

module.exports = async function (options) {
  let { dependencies, cwd } = options

  dependencies = options.dependencies || 'prod'

  let pkg

  if (options.package) {
    // spawn npm command and capture output
    const { stdout } = await spawn('npm', ['--json', 'show', options.package], { env: process.env })

    pkg = JSON.parse(stdout)
  } else {
    pkg = require(join(cwd, 'package.json'))
  }

  // fix long alias for devDependencies
  dependencies = dependencies === 'development' ? 'dev' : dependencies

  // fix prod / production dependencies prefix
  dependencies = ~['prod', 'production'].indexOf(dependencies) ? 'dependencies' : dependencies + 'Dependencies'

  // exit early
  if (!pkg[dependencies]) {
    throw new Error(`no matching dependencies: ${dependencies}`)
  }

  // return install format
  const packages = Object.keys(pkg[dependencies]).map(name => `${name}@${pkg[dependencies][name]}`)

  if (packages.length === 0) {
    throw new Error('no packages found')
  }

  return packages
}
