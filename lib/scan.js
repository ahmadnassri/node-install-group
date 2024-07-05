const { join } = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const spawn = promisify(execFile);

module.exports = async function (options) {
  let { cwd, dependencies, package: pkgName } = options;
  
  // Retrieve package data from either an npm package or a local package.json
  let pkg = pkgName
    ? JSON.parse((await spawn('npm', ['--json', 'show', pkgName], { env: process.env })).stdout)
    : require(join(cwd, 'package.json'));

  // Collect and filter dependency groups
  let dependencyGroups = Object.keys(pkg).filter(key => key.endsWith('Dependencies'));
  if (dependencies && !dependencies.trim()) {
    const requestedGroups = dependencies.split(',').map(dep => `${dep.trim()}Dependencies`);
    dependencyGroups = dependencyGroups.filter(group => requestedGroups.includes(group));
  }

  // Aggregate packages from the selected groups using map and filter
  let packages = dependencyGroups
    .filter(group => pkg[group]) // Filter out groups that are not in the package.json
    .flatMap(group => Object.keys(pkg[group]) // Map over each group's keys and flatten
        .map(name => `${name}@${pkg[group][name]}`)); // Create the package strings

  // Throw an error if no packages found
  if (packages.length === 0) {
    throw new Error('no packages found');
  }

  return packages;
}
